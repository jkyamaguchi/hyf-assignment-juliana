// Get the container where the list will be added
const container = document.getElementById("podcasts-container");

// Create a ul element
const ul = document.createElement("ul");

// Create li elements
const podcasts = [
  {
    name: "The mystery om of Johan Klausen Varbourg",
    imageUrl: "https://picsum.photos/536/354?random=1",
  },
  {
    name: "Tips about dogs with small legs",
    imageUrl: "https://picsum.photos/536/354?random=2",
  },
  {
    name: "You, me, we and us",
    imageUrl: "https://picsum.photos/536/354?random=3",
  },
  {
    name: "Breakfast news - Dinner edition",
  },
];

function createAndAppendImage(imageUrl, elementToAppendImageTo) {
  const img = document.createElement("img");
  img.src = imageUrl;
  elementToAppendImageTo.appendChild(img);
}

podcasts.forEach((podcast) => {
  const li = document.createElement("li");

  const title = document.createElement("h1");
  title.innerHTML = podcast.name;

  if (podcast.imageUrl) {
    li.appendChild(title);
    createAndAppendImage(podcast.imageUrl, li);
  }

  ul.appendChild(li);
});

container.appendChild(ul);
