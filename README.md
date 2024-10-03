# AutoEPBM StudentPortal 🎓

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

AutoEPBM StudentPortal adalah ekstensi browser yang dirancang untuk membantu mahasiswa IPB University dalam mengisi formulir Evaluasi Pembelajaran Berbasis Mahasiswa (EPBM) secara otomatis di StudentPortal. Ekstensi ini akan mengisi rating bintang ⭐, pesan umpan balik 💬, dan menyimpan evaluasi dengan cepat dan efisien.

## Fitur 🌟

- **Pengisian Rating Otomatis**: Secara otomatis mengisi rating bintang sesuai dengan preferensi Anda.
- **Pesan Umpan Balik Kustom**: Memungkinkan Anda memasukkan pesan umpan balik yang akan diisi ke dalam formulir.
- **Penyimpanan Evaluasi**: Secara otomatis menyimpan evaluasi setelah semua bidang telah diisi.

## Persyaratan 📝

- **Browser**: Google Chrome atau browser lain yang mendukung ekstensi Chrome.
- **Akses ke StudentPortal IPB**: Anda harus memiliki akses ke [StudentPortal IPB](https://studentportal.ipb.ac.id/Akademik/EPBM/Detail).

## Instalasi ⚙️

Ikuti langkah-langkah berikut untuk menginstal ekstensi ini di browser Anda:

1. **Unduh Kode Sumber**

   - Clone repositori ini atau unduh sebagai file ZIP dan ekstrak ke folder yang mudah diakses.
     ```bash
     git clone https://github.com/dzakwanalifi/AutoEPBM-StudentPortal.git
     ```

2. **Unduh Rilis Terbaru**

   - Untuk mengunduh rilis terbaru **AutoEPBM StudentPortal**, klik tautan berikut: [AutoEPBM-v1.0.0.zip](https://github.com/dzakwanalifi/AutoEPBM-StudentPortal/releases/download/v1.0.0/AutoEPBM-v1.0.0.zip)
   - Simpan file ZIP ke lokasi yang mudah diakses di komputer Anda, kemudian ekstrak file tersebut.

3. **Buka Pengaturan Ekstensi di Browser**

   - Buka Google Chrome.
   - Masukkan `chrome://extensions/` di bilah alamat dan tekan `Enter`.

4. **Aktifkan Mode Pengembang**

   - Di pojok kanan atas halaman Ekstensi, aktifkan **Mode Pengembang**.

5. **Muat Ekstensi yang Tidak Dipak**

   - Klik tombol **Load unpacked** atau **Muat yang tidak dikemas**.
   - Arahkan ke folder tempat Anda menyimpan kode sumber ekstensi ini.
   - Pilih folder tersebut dan klik **Select Folder**.

6. **Ekstensi Terpasang**

   - Ekstensi **AutoEPBM StudentPortal** sekarang seharusnya muncul di daftar ekstensi Anda.

## Penggunaan 🛠️

Sebelum menggunakan ekstensi ini, pastikan Anda telah login ke StudentPortal dan berada di halaman detail EPBM untuk memilih mata kuliah yang ingin Anda evaluasi.

1. **Buka Halaman Detail EPBM**

   - Navigasi ke halaman detail EPBM untuk memilih mata kuliah:
     ```
     https://studentportal.ipb.ac.id/Akademik/EPBM/Detail
     ```

2. **Pilih Mata Kuliah yang Akan Dievaluasi**

   - Temukan dan pilih mata kuliah yang ingin dievaluasi. Anda akan dibawa ke halaman formulir EPBM untuk mata kuliah tersebut.

3. **Jalankan Ekstensi**

   - Klik ikon ekstensi **AutoEPBM StudentPortal** di toolbar browser Anda.

4. **Atur Preferensi Pengisian**

   - **Star Rating (1-4)**: Masukkan rating bintang yang ingin Anda berikan (1 sampai 4).
   - **Feedback Message**: Masukkan pesan umpan balik yang ingin Anda sampaikan.

5. **Mulai Mengisi**

   - Klik tombol **Mulai Mengisi**.
   - Ekstensi akan secara otomatis mengisi rating, pesan, mencentang checkbox, dan menyimpan evaluasi.

6. **Ulangi untuk Mata Kuliah Lain**

   - Ulangi langkah di atas untuk setiap mata kuliah yang ingin Anda evaluasi.

## Penggunaan di Console Browser 💻

<details>
  <summary>Lihat cara menggunakan skrip di Console Browser</summary>

   Selain menggunakan ekstensi, Anda juga dapat menjalankan skrip ini secara langsung dari console browser untuk mengisi EPBM secara otomatis. Berikut adalah langkah-langkah penggunaannya:

   1. **Buka Halaman Formulir EPBM**

      - Buka halaman detail EPBM untuk mata kuliah yang akan dievaluasi:
      ```
      https://studentportal.ipb.ac.id/Akademik/EPBM/Detail
      ```

   2. **Buka Developer Tools (Console)**

      - Tekan `F12` atau `Ctrl+Shift+I` untuk membuka Developer Tools di browser Anda, lalu klik tab **Console**.

   3. **Aktifkan Opsi Allow Pasting**

      - Sebelum menempelkan kode, pastikan opsi **"Allow Pasting"** aktif di console browser. Ini bisa diaktifkan dengan klik kanan di area console dan memilih opsi tersebut, atau langsung menempelkan kode jika tidak ada larangan. Anda juga bisa cukup mengetikkan `allow pasting` di console dan tekan `Enter`.

   4. **Salin dan Tempel Kode di Console**

      - Salin blok kode berikut ini dan tempelkan di console browser:
      ```javascript
      (function fillEvaluationForm(starRating = 4, message = "Terima kasih atas ilmu dan pengajarannya") {
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
            const textareas = document.querySelectorAll('textarea.form-control');
            if (textareas.length > 0) {
                  textareas.forEach((textarea, index) => {
                     console.log(`Filling textarea ${index + 1}`);
                     textarea.value = message;
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
            const textareas = document.querySelectorAll('textarea.form-control');
            const checkbox = document.querySelector('input[type="checkbox"].mr-3');

            let isFormFilled = false;

            if (textareas.length > 0) {
                  textareas.forEach((textarea, index) => {
                     if (textarea.value.trim() === "") {
                        console.log(`Filling textarea ${index + 1}`);
                        textarea.value = message;
                        textarea.dispatchEvent(new Event('input', { bubbles: true }));
                     }

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

            if (isFormFilled) {
                  if (checkbox && !checkbox.checked) {
                     checkbox.click();
                     console.log("Checkbox checked.");
                  } else if (checkbox && checkbox.checked) {
                     console.log("Checkbox already checked.");
                  } else {
                     console.log("No checkbox found.");
                  }

                  if (checkbox && checkbox.checked) {
                     const saveButton = document.querySelector('button.btn.btn-primary');
                     if (saveButton && saveButton.textContent.includes("Simpan EPBM")) {
                        saveButton.click();
                        console.log("Clicked 'Simpan EPBM' button.");

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
      })(4, "Terima kasih atas ilmu dan pengajarannya");

      ```
      - Gantilah parameter `starRating` dan `message` sesuai keinginan Anda.

   5. **Tunggu Proses Berjalan**

      - Skrip akan mulai mengisi formulir EPBM secara otomatis, termasuk memilih rating bintang ⭐ dan mengisi pesan umpan balik 💬. Pastikan untuk memeriksa kembali formulir sebelum menyimpannya.

</details>

## Catatan Penting ⚠️

- **Satu Mata Kuliah per Pengisian**: Pastikan Anda berada di halaman formulir EPBM untuk satu mata kuliah sebelum menjalankan ekstensi.
- **Periksa Kembali Evaluasi**: Disarankan untuk memeriksa kembali evaluasi yang telah diisi sebelum menyimpan untuk memastikan semuanya sesuai dengan keinginan Anda.
- **Kepatuhan Akademik**: Pastikan penggunaan ekstensi ini sesuai dengan kebijakan dan peraturan akademik yang berlaku di IPB University.

## Batasan 🚫

- **Tidak Mendukung Multiple Tabs**: Ekstensi ini bekerja pada tab aktif saat ini. Jangan membuka beberapa tab formulir EPBM dan menjalankan ekstensi secara bersamaan.
- **Kesesuaian Halaman**: Ekstensi dirancang khusus untuk halaman formulir EPBM di StudentPortal IPB. Penggunaan di luar halaman tersebut mungkin tidak berfungsi.

## Kontribusi 🤝

Kontribusi terhadap pengembangan ekstensi ini sangat diterima. Silakan ajukan Pull Request atau buka Issue untuk melaporkan bug atau mengusulkan fitur baru.

## Lisensi 📄

Ekstensi ini dilisensikan di bawah [MIT License](LICENSE).

## Penafian ⚖️

Ekstensi ini dibuat untuk membantu mempercepat proses pengisian EPBM. Pengguna bertanggung jawab penuh atas penggunaan ekstensi ini dan konsekuensi yang mungkin timbul. Pengembang tidak bertanggung jawab atas penggunaan yang melanggar kebijakan institusi atau hukum yang berlaku.

---

## FAQ ❓

<details>
  <summary>Apa itu AutoEPBM StudentPortal?</summary>
  AutoEPBM StudentPortal adalah ekstensi yang membantu mahasiswa IPB University untuk mengisi formulir EPBM secara otomatis.
</details>

<details>
  <summary>Bagaimana cara menginstal ekstensi ini?</summary>
  Ikuti langkah-langkah yang tertera di bagian Instalasi untuk menginstal ekstensi di browser Anda.
</details>

<details>
  <summary>Apakah ekstensi ini aman digunakan?</summary>
  Ya, ekstensi ini dirancang untuk mematuhi kebijakan akademik IPB University, tetapi selalu disarankan untuk memeriksa kembali evaluasi yang telah diisi.
</details>

<details>
  <summary>Bisakah saya menggunakan ekstensi ini di browser lain?</summary>
  Ekstensi ini didesain untuk Google Chrome dan browser yang mendukung ekstensi Chrome. 
</details>

---

Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, silakan hubungi [dzakwanalifi@apps.ipb.ac.id](mailto:dzakwanalifi@apps.ipb.ac.id).

**Selamat mengisi EPBM dengan mudah! 🎉**

---

Semoga tambahan badge dan FAQ ini membuat informasi lebih bermanfaat dan menarik! 😊