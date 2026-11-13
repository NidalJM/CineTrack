export function createCard(item, isFav = false) {
    return `<div data-id="${item.id}" class="card relative cursor-pointer bg-gray-800 rounded-xl overflow-hidden hover:-translate-y-3 shadow-md hover:shadow-xl hover:shadow-red-500 transition-all">
        <button data-id="${item.id}" type="button" class="fav-btn absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-gray-900/80 flex items-center justify-center text-lg">
            ${isFav ? '❤️' : '🤍'}
        </button>
        <img src="${item.image}" class="w-full h-60 sm:h-auto  object-cover">
        <div class="p-4 flex flex-col justify-between">
            <h3 class="text-white font-bold text-lg font-poppins">${item.title}</h3>
            <div class="flex justify-between items-center text-sm text-gray-400 mt-2">
                <span>${item.releaseYear}</span>
                <span class="uppercase text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">${item.type}</span>    
            </div>
        </div>
    </div>`;
}

export function renderFavorites(favItems) {
    const list = document.getElementById('favoriteList');
    const moviesCount = document.getElementById('moviesCount');
    const seriesCount = document.getElementById('seriesCount');

    const counts = favItems.reduce((acc, item) => {
        if (item.type === 'movie') acc.movies++
        if (item.type === 'series') acc.series++;
        return acc;
    }, { movies: 0, series: 0 })

    moviesCount.textContent = counts.movies;
    seriesCount.textContent = counts.series;

    list.innerHTML = favItems.length === 0
        ? `<li class="text-gray-500 text-sm text-center py-6">Aucun favori ajouté.</li>`
        : favItems.map(item => `
<li class="flex items-center justify-between gap-2 bg-gray-800 hover:bg-red-100/50 p-2 rounded-lg transition-all">
            <div class="flex items-center gap-3 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-10 h-14 object-cover rounded shrink-0">
                <div class="overflow-hidden">
                    <p class="text-white text-sm font-bold truncate">${item.title}</p>
                    <p class="text-red-400 text-xs font-semibold uppercase">${item.type}</p>
                </div>
            </div>
            <button data-id="${item.id}" type="button" class="remove-fav text-gray-400 hover:text-red-500 font-bold text-lg px-2 shrink-0">&times;</button>
        </li>
        `).join('');
}

export function openModal(item) {
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');

    const extraInfo = item.type === "movie"
        ? `<p class="font-bold"><span class="text-gray-400 font-semibold">Durée :</span> ${item.duration} min</p>`
        : `<p class="font-bold"><span class="text-gray-400 font-semibold">Saisons :</span> ${Array.isArray(item.seasons) ? item.seasons.join(', ') : item.seasons}</p>`;

    modalContent.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="w-full sm:w-2/5 h-72 sm:h-auto object-cover">

<div class="w-full sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
    <div>
        <h2 class="text-3xl font-bebas tracking-wider text-red-500 pr-6">${item.title}</h2>
        <div class="flex items-center gap-2 mt-1">
            <span class="uppercase text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded font-bold">${item.type}</span>
            <span class="text-sm text-gray-400">${item.releaseYear}</span>
        </div>
    </div>

    <div class="space-y-1.5 text-sm">
        ${extraInfo}
        <p class="font-bold"><span class="text-gray-400 font-semibold">Genres: </span>${item.genres}</p>
        <p class="font-bold"><span class="text-gray-400 font-semibold">Realisateurs: </span>${item.directors}</p>
        <p class="font-bold"><span class="text-gray-400 font-semibold">Pays de production: </span>${item.productionCountries}</p>
    </div>

    <p class="text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3">${item.description}</p>
</div>
    `

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex')
}