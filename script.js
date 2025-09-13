const cardStack = document.getElementById("card-stack");
const summary = document.getElementById("summary");
const resultText = document.getElementById("resultText");
const likedCatsDiv = document.getElementById("likedCats");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

let catUrls = [];
let likedCats = [];

// Load cat images
async function loadCats() {
  for (let i = 0; i < 10; i++) {
    catUrls.push(`https://cataas.com/cat?random=${Math.random()}`);
  }
  createCards();
}

// Create swipeable cards
function createCards() {
  catUrls.forEach((url, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.zIndex = catUrls.length - index;

    const img = document.createElement("img");
    img.src = url;
    card.appendChild(img);

    // Feedback text overlays
    const likeText = document.createElement("div");
    likeText.textContent = "LIKE";
    likeText.classList.add("feedback", "like");

    const dislikeText = document.createElement("div");
    dislikeText.textContent = "NOPE";
    dislikeText.classList.add("feedback", "dislike");

    card.appendChild(likeText);
    card.appendChild(dislikeText);

    cardStack.appendChild(card);

    const hammer = new Hammer(card);
    hammer.on("swipeleft", () => handleSwipe(card, "dislike", url));
    hammer.on("swiperight", () => handleSwipe(card, "like", url));
  });
}

// Handle swipe or button click
function handleSwipe(card, action, url) {
  const likeText = card.querySelector(".like");
  const dislikeText = card.querySelector(".dislike");

  if (action === "like") {
    likeText.style.opacity = 1;
    card.style.transform = "translateX(500px) rotate(20deg)";
    likedCats.push(url);
  } else {
    dislikeText.style.opacity = 1;
    card.style.transform = "translateX(-500px) rotate(-20deg)";
  }

  card.style.transition = "0.5s";

  setTimeout(() => card.remove(), 400);

  if (cardStack.children.length === 1) {
    showSummary();
  }
}

// Show summary
function showSummary() {
  cardStack.style.display = "none";
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

// Button fallback
likeBtn.addEventListener("click", () => {
  const topCard = cardStack.lastElementChild;
  if (topCard) handleSwipe(topCard, "like", topCard.querySelector("img").src);
});

dislikeBtn.addEventListener("click", () => {
  const topCard = cardStack.lastElementChild;
  if (topCard) handleSwipe(topCard, "dislike", topCard.querySelector("img").src);
});

loadCats();
