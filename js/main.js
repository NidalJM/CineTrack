import { fetchCatalog } from "./api.js";
import { createCard } from "./dom.js";

let allItems = [];
let filteredMedia = [];
let currentPage = 1;
const itemsPerspage = 8;
let totalPages = 1;
document.addEventListener('DOMContentLoaded', async () => {
    // console.log(fetchCatalog());
    allItems = await fetchCatalog()
    filteredMedia = [...allItems]
    const grid = document.getElementById('cardGrid');
    const searchInput = document.getElementById('searchInput');
    const filterInput = document.getElementById('filter');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext =  document.getElementById('btn-next');
    const pageCounter = document.getElementById('page-info')

    function handleFilters()    {
        const query = searchInput.value.toLowerCase().trim();
        const filterValue = filterInput.value;

        filteredMedia = allItems.filter((item) => {
            const matchTitle = item.title.toLowerCase().includes(query);

            let matchType = false;
            if (filterValue === "1" || filterValue === "all")   {
                matchType = true;
            }
            else if (filterValue === "series")  {
                matchType = item.type === "series"
            }
            else if (filterValue === "movies" || filterValue === "movie")   {
                matchType = item.type === "movie";
            }
            return matchTitle && matchType;
            
        })
        currentPage = 1;
        afficher()
    }

    function afficher() {
        totalPages = Math.ceil(filteredMedia.length/itemsPerspage) || 1;
        const start = (currentPage - 1) * itemsPerspage;

        const pageItems = filteredMedia.slice(start, start + itemsPerspage)
        grid.innerHTML = pageItems.map(createCard).join('')
        pageCounter.textContent = `Page ${currentPage} sur ${totalPages}`;
    }

    btnNext.addEventListener('click', () => {
        if (currentPage < totalPages)   {
            currentPage+= 1;
            afficher();
        }
    })
    btnPrev.addEventListener('click', () => {
        if (currentPage > 1)    {
            currentPage -= 1;
            afficher();
        }
    })
    searchInput.addEventListener('input', handleFilters);
    filterInput.addEventListener('change', handleFilters);

    afficher()
})