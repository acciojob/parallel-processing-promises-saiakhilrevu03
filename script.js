const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

// Function to download one image
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${image.url}`);
  });
}

// Function to download all images
function downloadImages(images) {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  errorDiv.textContent = "";
  outputDiv.innerHTML = "";

  loadingDiv.style.display = "block";

  Promise.allSettled(images.map(downloadImage))
    .then(results => {
      loadingDiv.style.display = "none";

      results.forEach(result => {
        if (result.status === "fulfilled") {
          outputDiv.appendChild(result.value);
        } else {
          errorDiv.innerHTML += `<div>${result.reason}</div>`;
        }
      });
    });
}

// Start download
downloadImages(images);
