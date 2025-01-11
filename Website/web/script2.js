document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("upload-form");
    const resultElement = document.getElementById("result");
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const fileInput = document.getElementById("id-card");
      const file = fileInput.files[0];
  
      if (!file) {
        resultElement.textContent = "Please upload a file.";
        return;
      }
  
      try {
        const { data } = await Tesseract.recognize(file, "eng");
        console.log("Extracted Text:", data.text);
  
        const validText = "Krishnammal College for Women KCW";
        if (data.text.includes(validText)) {
          resultElement.textContent = "Access Granted";
          localStorage.setItem("validated", "true");
          window.location.href = "index.html"; // Redirect to main.html
        } else {
          resultElement.textContent = "Access Denied. Text mismatch.";
        }
      } catch (error) {
        resultElement.textContent = "Error processing the image.";
      }
    });
  });
  