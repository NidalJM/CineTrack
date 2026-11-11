export function createCard(item)    {
    return `<div data-id="${item.id}"class= "bg-gray-800 rounded-xl overflow-hidden  transition-all">
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