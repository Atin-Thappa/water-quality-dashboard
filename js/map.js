import { cityCoords } from "./coords.js";

const map = L.map("map").setView([28.6139, 77.2090], 11); // Delhi default

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById("citySelect").addEventListener("change", e => {
    e.preventDefault();

    // Get city
    const city = e.target.value;
    if (!city) return; // Just in case

    // Get coords + fly to
    const coords = cityCoords[city];
    map.flyTo(coords, 13, { duration: 1.2 });
});