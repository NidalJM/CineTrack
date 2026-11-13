import { fetchCatalog } from "./api.js";
import { createCard, openModal, closeModal, renderFavorites } from "./dom.js";

let allItems = [];
let filteredMedia = [];
let favIds = JSON.parse(localStorage.getItem("favorites")) || []
let currentPage = 1;
const itemsPerspage = 8;
let totalPages = 1;
document.addEventListener('DOMContentLoaded', async () => {
    // console.log(fetchCatalog());

    const grid = document.getElementById('cardGrid');
    const searchInput = document.getElementById('searchInput');
    const filterInput = document.getElementById('filter');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageCounter = document.getElementById('page-info')
    const modal = document.getElementById('detailModal');
    const closeModalBtn = document.getElementById('closeModal');
    const favoriteList = document.getElementById('favoriteList')
    try {
        allItems = await fetchCatalog()
        filteredMedia = [...allItems]
    } catch (error) {
        grid.innerHTML = `<div class="col-span-full text-center text-red-500 font-bold py-10">
            Impossible de charger les données. Veuillez réessayer plus tard.
        </div>`;
        return;
    }

    function updateFavorites()  {
        localStorage.setItem("favorites", JSON.stringify(favIds));
        const favItems = allItems.filter(item => favIds.includes(item.id));
        renderFavorites(favItems);
        afficher()
    }

    function handleFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const filterValue = filterInput.value;

        filteredMedia = allItems.filter((item) => {
            const matchTitle = item.title.toLowerCase().includes(query);

            let matchType = false;
            if (filterValue === "1" || filterValue === "Tous") {
                matchType = true;
            }
            else if (filterValue === "series") {
                matchType = item.type === "series"
            }
            else if (filterValue === "movies" || filterValue === "movie") {
                matchType = item.type === "movie";
            }
            return matchTitle && matchType;

        })
        currentPage = 1;
        afficher()
    }

    function afficher() {
        totalPages = Math.ceil(filteredMedia.length / itemsPerspage) || 1;
        const start = (currentPage - 1) * itemsPerspage;

        const pageItems = filteredMedia.slice(start, start + itemsPerspage)
        grid.innerHTML = pageItems.map(item => createCard(item, favIds.includes(item.id))).join('')
        pageCounter.textContent = `Page ${currentPage} sur ${totalPages}`;

        if (filteredMedia.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center text-red-500 font-bold py-10">
            Aucune correspondance trouvée.
        </div>`;
            return;
        }
        if (currentPage === 1) {
            btnPrev.className = 'px-3 py-3 rounded-lg bg-gray-600 text-white transition-all text-sm font-poppins font-medium'
            btnNext.className = 'px-3 py-3 rounded-lg bg-red-600 text-white hover:bg-red-300 transition-all text-sm font-poppins font-medium'
        }
        if (currentPage > 1 && currentPage < totalPages) {
            btnPrev.className = 'px-3 py-3 rounded-lg bg-red-600 text-white hover:bg-red-300 transition-all text-sm font-poppins font-medium'
            btnNext.className = 'px-3 py-3 rounded-lg bg-red-600 text-white hover:bg-red-300 transition-all text-sm font-poppins font-medium'
        }
        if (currentPage === totalPages) {
            btnPrev.className = 'px-3 py-3 rounded-lg bg-red-600 text-white hover:bg-red-300 transition-all text-sm font-poppins font-medium'
            btnNext.className = 'px-3 py-3 rounded-lg bg-gray-600 text-white transition-all text-sm font-poppins font-medium'
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            afficher();
        }
    })
    btnPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            afficher();
        }
    })
    grid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.fav-btn');
        if (favBtn) {
            e.stopPropagation();
            const id = favBtn.dataset.id;
            favIds = favIds.includes(id)
            ? favIds.filter(favId => favId !== id)
            : [...favIds, id]

            updateFavorites()
            return;
        }
        const card = e.target.closest('.card');
        if (!card) return;

        const id = card.dataset.id;
        const item = allItems.find((i) => i.id === id)
        if (item) openModal(item)
    });
    favoriteList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-fav');
        if (!removeBtn) return;

        favIds = favIds.filter(id => id !== removeBtn.dataset.id);
        updateFavorites()
    })

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click',(e) =>   {
        if (e.target.id === 'detailModal')  {
            closeModal();
        }
    })

    searchInput.addEventListener('input', handleFilters);
    filterInput.addEventListener('change', handleFilters);

    afficher()
    updateFavorites()
})