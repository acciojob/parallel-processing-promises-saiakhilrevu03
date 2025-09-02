const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = image.url;

    // Append immediately so Cypress can detect it
    document.getElementById("output").appendChild(img);

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${image.url}`);
  });
}

function downloadImages(images) {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  errorDiv.textContent = "";
  outputDiv.innerHTML = "";

  loadingDiv.style.display = "block";

  Promise.all(images.map(downloadImage))
    .then(() => {
      loadingDiv.style.display = "none";
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err;
    });
}

document
  .getElementById("download-images-button")
  .addEventListener("click", () => {
    downloadImages(images);
  });
