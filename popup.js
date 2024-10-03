document.getElementById("start").addEventListener("click", () => {
    const starRating = parseInt(document.getElementById("starRating").value);
    const message = document.getElementById("message").value;

    console.log("Starting process with star rating:", starRating, "and message:", message);

    // Memeriksa apakah starRating valid
    if (isNaN(starRating) || starRating < 1 || starRating > 4) {
        console.error("Invalid star rating. Please enter a number between 1 and 4.");
        return;
    }

    // Mengirim star rating dan pesan ke content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                action: "fillForm",
                starRating: starRating,
                message: message
            },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Failed to send message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Message sent to content script.");
                    console.log("Response from content script:", response);
                }
            }
        );
    });
});
