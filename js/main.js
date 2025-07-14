import { UI } from "./ui.js";
const ui = new UI();

let allgames = [];

function showLoading() {
  document.getElementById("loadingScreen").classList.remove("d-none");
}

function hideLoading() {
  document.getElementById("loadingScreen").classList.add("d-none");
}

async function getgames(category = "shooter") {
  try {
    showLoading();

    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "293505a581mshc0433c60188c8a1p1129a4jsn83e322348ee8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
      }
    });

    const data = await res.json();
    allgames = data;
    displayGames();
  } catch (error) {
    console.error("Error fetching games:", error);
  } finally {
    hideLoading();
  }
}

function displayGames() {
  let content = "";
  for (let game of allgames) {
    content += ui.renderGameCard(game);
  }
  document.getElementById("gameList").innerHTML = content;
}

window.showDetails = async function (id) {
  try {
    showLoading();

    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "293505a581mshc0433c60188c8a1p1129a4jsn83e322348ee8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
      }
    });

    const game = await res.json();

    document.getElementById("gameList").classList.add("d-none");
    const detailsContainer = document.getElementById("gameDetails");
    detailsContainer.classList.remove("d-none");
    detailsContainer.innerHTML = ui.renderGameDetails(game);
  } catch (error) {
    console.error("Error fetching game details:", error);
  } finally {
    hideLoading();
  }
};

window.goBack = function () {
  document.getElementById("gameDetails").classList.add("d-none");
  document.getElementById("gameList").classList.remove("d-none");
};

getgames();

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const category = this.dataset.category;
    getgames(category);
  });
});

const toggleBtn = document.getElementById("toggleMenu");
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    const categoryList = document.getElementById("categoryList");
    categoryList.classList.toggle("d-none");
  });
}
