let adminMap;
let adminCurrentCity = null;
let selectedComplaint = null;

// Initialize
function initAdminDashboard() {
    // Initialize map
    adminMap = initMap();

    // Setup city selector
    const cityDropdown = document.getElementById(`citySelector`);
    if (cityDropdown) {
        populateAdminCitySelector(cityDropdown);

        cityDropdown.addEventListener(`change`, (e) => {
            const selectedCity = e.target.value;
            if (selectedCity) {
                adminCurrentCity = selectedCity;
                moveToCity(selectedCity);
                loadComplaintsOnMap(selectedCity);
                updateComplaintInfo(null); // Clear selected complaint
            } else {
                adminCurrentCity = null;
                map.setView(defaultCenter, defaultZoom);
                loadComplaintsOnMap();
                updateComplaintInfo(null);
            }
        });
    }

    // Setup marker
    map.on(`popupopen`, (e) => {
        const marker = e.popup._source;
        if (marker.complaintData) {
            selectedComplaint = marker.complaintData;
            updateComplaintInfo(marker.complaintData);
        }
    });

    // Resolve button
    const resolveBtn = document.getElementById(`resolveBtn`);
    if (resolveBtn) {
        resolveBtn.addEventListener(`click`, handleResolveComplaint);
    }

    // Load initial complaints
    loadComplaintsOnMap();
}

// Add to city selector
function populateAdminCitySelector(selectElement) {
    selectElement.innerHTML = `<option value="">All Cities</option>`;

    Object.keys(cityCoords).forEach(city => {
        const option = document.createElement(`option`);
        option.value = city;
        option.textContent = city;
        selectElement.appendChild(option);
    });
}

// Update complaint info panel
function updateComplaintInfo(complaint) {
    const infoPanel = document.getElementById(`complaintInfo`);
    const resolveBtn = document.getElementById(`resolveBtn`);

    if (!complaint) {
        infoPanel.innerHTML = `<p class="no-selection">Select a marker on the map to view details</p>`;
        resolveBtn.disabled = true;
        return;
    }

    const severityLabel = getSeverityLabel(complaint.status);
    const severityColor = getSeverityColor(complaint.status);

    infoPanel.innerHTML = `
        <div class="complaint-details">
            <h3>${complaint.city}</h3>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: ${severityColor}; font-weight: bold;">
                    ${severityLabel}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reported by:</span>
                <span class="detail-value">${complaint.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${complaint.email}</span>
            </div>
            ${complaint.date ? `
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${formatDate(complaint.date)}</span>
                </div>
            ` : ``}
        </div>
    `;

    resolveBtn.disabled = false;
}

// Handle resolve complaint
async function handleResolveComplaint() {
    if (!selectedComplaint) {
        showNotification(`Please select a complaint to resolve`, `error`);
        return;
    }

    if (!selectedComplaint.id) {
        showNotification(`Invalid complaint data`, `error`);
        return;
    }

    // Confirm
    if (!confirm(`Are you sure you want to mark this complaint as resolved?`)) {
        return;
    }

    const result = await resolveComplaint(selectedComplaint.id);

    if (result.success) {
        showNotification(`Issue marked as resolved`, `success`);

        // Clear selection
        selectedComplaint = null;
        updateComplaintInfo(null);

        // Close all open popups
        map.closePopup();

        // Reload complaints
        loadComplaintsOnMap(adminCurrentCity);
    } else {
        showNotification(`Failed to resolve complaint. Please try again.`, `error`);
    }
}

// Initialize on page load
document.addEventListener(`DOMContentLoaded`, initAdminDashboard);