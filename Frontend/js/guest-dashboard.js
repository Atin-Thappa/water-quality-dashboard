let guestMap;
let guestCurrentCity = null;

// Initialize
function initGuestDashboard() {
    // Initialize map
    guestMap = initMap();

    // city selector
    const cityDropdown = document.getElementById(`citySelector`);
    if (cityDropdown) {
        populateCitySelector(cityDropdown);

        cityDropdown.addEventListener(`change`, (e) => {
            const selectedCity = e.target.value;
            if (selectedCity) {
                guestCurrentCity = selectedCity;
                moveToCity(selectedCity);
                loadComplaintsOnMap(selectedCity);
            } else {
                guestCurrentCity = null;
                map.setView(defaultCenter, defaultZoom);
                loadComplaintsOnMap();
            }
        });
    }

    // Load initial complaints
    loadComplaintsOnMap();
}

// Add to city selector
function populateCitySelector(selectElement) {
    selectElement.innerHTML = `<option value="">All Cities</option>`;

    Object.keys(cityCoords).forEach(city => {
        const option = document.createElement(`option`);
        option.value = city;
        option.textContent = city;
        selectElement.appendChild(option);
    });
}

// Initialize on page load
document.addEventListener(`DOMContentLoaded`, initGuestDashboard);