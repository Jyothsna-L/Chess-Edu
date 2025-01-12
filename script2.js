document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("upload-form");
  const resultElement = document.getElementById("result");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const fileInput = document.getElementById("id-card");
    const file = fileInput.files[0];

    if (!file) {
      resultElement.textContent = "Please upload a file.";
      resultElement.style.color = "red";
      return;
    }

    try {
      // Perform OCR on the uploaded file using Tesseract.js
      const { data } = await Tesseract.recognize(file, "eng");
      console.log("Extracted Text:", data.text); // Log for debugging

      // Define the required text and roll number pattern
      const validText1 = "PSGRK".toLowerCase();
      const validText2 = "krishnammal".toLowerCase();
      const rollNumberPattern = /\b\d{2}[A-Z]{3}\d{3}\b/; // Regex for roll numbers like "00XYZ000"

      // Check for both the college name and a valid roll number
      if ((data.text.includes(validText1) || data.text.includes(validText2)) && rollNumberPattern.test(data.text)) {
        resultElement.textContent = "Access Granted! Redirecting...";
        resultElement.style.color = "green";

        // Save validation status if "Remember Me" is checked
        const rememberMeCheckbox = document.getElementById("remember-me");
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("validated", "true");
        }

        // Redirect to the main page after a short delay
        setTimeout(() => {
          window.location.href = "index.html"; // Adjust the URL as needed
        }, 1500);
      } else {
        resultElement.textContent = "Access Denied. Please upload a valid ID.";
        resultElement.style.color = "red";
      }
    } catch (error) {
      console.error("Error during OCR processing:", error);
      resultElement.textContent = "An error occurred while processing the image.";
      resultElement.style.color = "red";
    }
  });
});
