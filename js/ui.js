export class UI {
  renderGameCard(game) {
    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="game-card" onclick="showDetails(${game.id})">
          <img src="${game.thumbnail}" alt="${game.title}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h5>${game.title}</h5>
              <span class="free-badge">Free</span>
            </div>
            <p>${game.short_description.split(" ").slice(0, 12).join(" ")}...</p>
            <div class="d-flex flex-wrap">
              <span class="tag">${game.genre}</span>
              <span class="tag">${game.platform}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderGameDetails(game) {
    return `
      <div class="position-relative">
        <button onclick="goBack()" class="btn btn-dark btn-sm position-absolute top-0 end-0 m-2" title="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="row g-4 text-white">
          <div class="col-md-5">
            <img src="${game.thumbnail}" class="w-100 rounded" alt="${game.title}">
          </div>
          <div class="col-md-7">
            <h2>${game.title}</h2>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Platform:</strong> ${game.platform}</p>
            <p><strong>Status:</strong> ${game.status}</p>
            <p>${game.description}</p>
            <a class="btn btn-primary" href="${game.game_url}" target="_blank">Play Now</a>
          </div>
        </div>
      </div>
    `;
  }
}
