// Map Functionality

let map;
let markers = [];
let currentCity = null;

// Initialize map
function initMap() {
    map = L.map('map').setView(defaultCenter, defaultZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Add custom styles for markers
    addMarkerStyles();

    return map;
}

// Add custom marker styles
function addMarkerStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .marker-good { background-color: #22c55e; }
        .marker-poor { background-color: #eab308; }
        .marker-severe { background-color: #ef4444; }
    `;
    document.head.appendChild(style);
}

// Create custom marker icon
function createCustomIcon(severity) {
    const color = getSeverityColor(severity);
    const className = `marker-${severity.toLowerCase()}`;

    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="custom-marker ${className}"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });
}

// Add marker to map
function addMarker(complaint) {
    const coords = cityCoords[complaint.city];

    if (!coords) {
        console.error('Coordinates not found for city:', complaint.city);
        return;
    }

    const icon = createCustomIcon(complaint.status);
    const marker = L.marker(coords, { icon: icon }).addTo(map);

    const popupContent = createPopupContent(complaint);
    marker.bindPopup(popupContent);

    // Store complaint data with marker
    marker.complaintData = complaint;

    markers.push(marker);
    return marker;
}

// Create popup content
function createPopupContent(complaint) {
    const severityLabel = getSeverityLabel(complaint.status);
    const severityColor = getSeverityColor(complaint.status);

    return `
        <div class="marker-popup">
            <h3>${complaint.city}</h3>
            <p><strong>Status:</strong> <span style="color: ${severityColor}">${severityLabel}</span></p>
            <p><strong>Reported by:</strong> ${complaint.name}</p>
            <p><strong>Email:</strong> ${complaint.email}</p>
            ${complaint.date ? `<p><strong>Date:</strong> ${formatDate(complaint.date)}</p>` : ''}
        </div>
    `;
}

// Clear all markers
function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// Move map to city
function moveToCity(city) {
    const coords = cityCoords[city];
    if (coords) {
        map.setView(coords, 13);
        currentCity = city;
    }
}

// Load complaints on map
async function loadComplaintsOnMap(city = null) {
    clearMarkers();

    const complaints = await fetchComplaints(city);

    if (complaints && complaints.length > 0) {
        complaints.forEach(complaint => {
            addMarker(complaint);
        });
    }
}