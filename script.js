const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = image.url;

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

  // wait for all downloads to complete
  Promise.all(images.map(downloadImage))
    .then(imgElements => {
      loadingDiv.style.display = "none";
      imgElements.forEach(img => outputDiv.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err;
    });
}

// Only download when button is clicked
document
  .getElementById("download-images-button")
  .addEventListener("click", () => {
    downloadImages(images);
  });
