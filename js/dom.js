export function createCard(item)    {
    return `div data-id="${item.id}"class=bg-gray-800 rounded-xl overflow-hidden transition-all">
        <img src= "${item.image}" class="w-full" />
        <div class="p-4 flex flex-col justify-between">
        <h3 class= "text-white font-bold text-lg font-poppins">${item.title}</h3>
    `
}