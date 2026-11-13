export function createCard(item) {
    return `<div data-id="${item.id}"class= "card relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-red-500 hover:-translate-y-3 transition-all">
        
    <img src= "${item.image}" class="w-full object-cover">
        <div class="p-4 flex flex-col justify-between">
        <h3 class= "text-white font-bold text-lg font-poppins">${item.title}</h3>
        <div class= "flex justify-between items-center text-sm text-gray-400 mt-2">
            <span>${item.releaseYear}</span>
            <span class="uppercase text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">${item.type}</span>    
        </div>
        </div>
        </div>
    `
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

export function closeModal()   {
    const modal = document.getElementById('detailModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex')
}