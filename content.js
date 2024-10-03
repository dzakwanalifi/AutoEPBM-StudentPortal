// Menampilkan pesan bahwa content script telah dimuat
console.log("Content script loaded.");

function fillEvaluationForm(starRating = 4, message = "Terima kasih atas ilmu dan pengajarannya") {
    console.log("Filling evaluation form...");

    const successMessage = document.querySelector('.card.bg-success.text-white');
    if (successMessage) {
        console.log("Evaluation already completed. Stopping the process.");
        return;
    }

    const nextButton = document.querySelector('button.btn.btn-primary');
    if (!nextButton) {
        console.log("No action buttons found. Stopping the process.");
        return;
    }

    if (nextButton.textContent.includes("Selanjutnya")) {
        console.log("Found 'Selanjutnya' button, filling stars...");
        fillStarsAndProceed(starRating, message);
    } else if (nextButton.textContent.includes("Simpan EPBM")) {
        console.log("Found 'Simpan EPBM' button, checking form...");
        fillFormAndSave(message);
    }
}

function fillStarsAndProceed(starRating, message) {
    const nextButton = document.querySelector('button.btn.btn-primary');
    const ratingElements = document.querySelectorAll('output[role="slider"]');

    if (ratingElements.length > 0) {
        let allStarsFilled = true;

        ratingElements.forEach(rating => {
            const stars = rating.querySelectorAll('span.b-rating-star');
            if (stars.length >= starRating) {
                for (let i = 0; i < starRating; i++) {
                    if (stars[i].classList.contains('b-rating-star-empty')) {
                        stars[i].click();
                        console.log(`Clicked star ${i + 1} for rating element.`);
                    }
                }
            }
        });

        // Periksa apakah semua bintang telah terisi
        ratingElements.forEach(rating => {
            const stars = rating.querySelectorAll('span.b-rating-star');
            if (stars[stars.length - 1].classList.contains('b-rating-star-empty')) {
                allStarsFilled = false;
            }
        });

        if (allStarsFilled) {
            console.log("All stars filled. Proceeding to the next step.");
            nextButton.click();

            setTimeout(() => {
                console.log("Waiting for new page to load...");
                fillEvaluationForm(starRating, message);
            }, 1000);
        } else {
            console.log("Not all stars filled yet. Retrying...");
            setTimeout(() => fillStarsAndProceed(starRating, message), 500);
        }
    } else {
        console.log("No star ratings found. Filling the textarea directly.");
        fillTextareaAndProceed(nextButton, message);
    }
}

function fillTextareaAndProceed(nextButton, message) {
    // Memilih semua textarea dengan class 'form-control'
    const textareas = document.querySelectorAll('textarea.form-control');
    if (textareas.length > 0) {
        textareas.forEach((textarea, index) => {
            console.log(`Filling textarea ${index + 1}`);
            textarea.value = message;

            // Memicu event input
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        });
        console.log("All textareas filled.");
    } else {
        console.log("No textarea found. Stopping the script.");
        return;
    }

    nextButton.click();
    console.log("Clicked 'Selanjutnya' button.");

    setTimeout(() => {
        console.log("Waiting for new page to load...");
        fillEvaluationForm(starRating, message);
    }, 1000);
}

function fillFormAndSave(message) {
    // Cek apakah ada form (textarea)
    const textareas = document.querySelectorAll('textarea.form-control');
    const checkbox = document.querySelector('input[type="checkbox"].mr-3');

    let isFormFilled = false;

    if (textareas.length > 0) {
        textareas.forEach((textarea, index) => {
            // Jika textarea kosong, isi dengan pesan
            if (textarea.value.trim() === "") {
                console.log(`Filling textarea ${index + 1}`);
                textarea.value = message;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Cek apakah textarea sudah terisi
            if (textarea.value.trim() !== "") {
                isFormFilled = true;
            } else {
                isFormFilled = false;
            }
        });
    } else {
        console.log("No textarea found. Cannot save.");
        return;
    }

    // Jika form terisi, centang checkbox; jika tidak, jangan centang
    if (isFormFilled) {
        if (checkbox && !checkbox.checked) {
            checkbox.click();
            console.log("Checkbox checked.");
        } else if (checkbox && checkbox.checked) {
            console.log("Checkbox already checked.");
        } else {
            console.log("No checkbox found.");
        }

        // Klik tombol "Simpan EPBM" jika checkbox sudah dicentang
        if (checkbox && checkbox.checked) {
            const saveButton = document.querySelector('button.btn.btn-primary');
            if (saveButton && saveButton.textContent.includes("Simpan EPBM")) {
                saveButton.click();
                console.log("Clicked 'Simpan EPBM' button.");

                // Memeriksa notifikasi sukses
                setTimeout(() => {
                    const successNotification = document.querySelector('.card.bg-success.text-white');
                    if (successNotification) {
                        console.log("Simpan EPBM successful. Stopping the process.");
                        return;
                    } else {
                        console.log("No success notification found.");
                    }
                }, 1000);
            } else {
                console.log("No 'Simpan EPBM' button found.");
            }
        } else {
            console.log("Checkbox is not checked. Cannot proceed to save.");
        }
    } else {
        console.log("Form is not filled. Checkbox will not be checked.");
    }
}

// Mendengarkan pesan dari popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillForm") {
        fillEvaluationForm(request.starRating, request.message);

        // Mengirim respons kembali ke popup script
        sendResponse({ status: "Form filling initiated" });

        // Kembalikan true untuk menjaga port pesan tetap terbuka
        return true;
    }
});
