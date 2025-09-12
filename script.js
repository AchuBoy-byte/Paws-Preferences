const catImage = document.getElementById("catImage");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const summary = document.getElementById("summary");
const resultText = document.getElementById("resultText");
const likedCatsDiv = document.getElementById("likedCats");

let catUrls = [];
let currentIndex = 0;
let likedCats = [];

// Fetch 10 cat images from Cataas API
async function loadCats() {
  for (let i = 0; i < 10; i++) {
    catUrls.push(`https://cataas.com/cat?random=${Math.random()}`);
  }
  showCat();
}

function showCat() {
  if (currentIndex < catUrls.length) {
    catImage.src = catUrls[currentIndex];
  } else {
    showSummary();
  }
}

function likeCat() {
  likedCats.push(catUrls[currentIndex]);
  currentIndex++;
  showCat();
}

function dislikeCat() {
  currentIndex++;
  showCat();
}

function showSummary() {
  document.getElementById("card").style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  summary.classList.remove("hidden");
  resultText.textContent = `You liked ${likedCats.length} out of ${catUrls.length} cats.`;

  likedCats.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "100px";
    img.style.margin = "5px";
    likedCatsDiv.appendChild(img);
  });
}

likeBtn.addEventListener("click", likeCat);
dislikeBtn.addEventListener("click", dislikeCat);

loadCats();
