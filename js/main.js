import { fetchCatalog } from "./api.js";
import { createCard } from "./dom.js";

let allItems = []
document.addEventListener('DOMContentLoaded', async () => {
    // console.log(fetchCatalog());
    allItems = await fetchCatalog()
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = allItems.map(createCard).join('')

})