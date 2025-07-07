
const url = "https://newsdata.io/api/1/latest?";

let currSlectedNav = null;

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}apikey=${API_Key}&q=${query}`);
    const data = await res.json();
    console.log(data);

    if (data.results) {
      bindData(data.results);
    } else {
      console.error("No results found:", data);
    }
  } catch (err) {
    console.error("API fetch error:", err);
  }
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.image_url) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    filldataincard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function filldataincard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image_url;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.pubDate).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source_id} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);

  currSlectedNav?.classList.remove("active");
  currSlectedNav = navItem;
  currSlectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value.trim();
  if (!query) return;

  fetchNews(query);
  currSlectedNav?.classList.remove("active");
  currSlectedNav = null;
  searchText.value = "";
});
