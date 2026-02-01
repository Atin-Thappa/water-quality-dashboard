let reportModal;
let reportForm;

// Initialize
function initReportForm() {
    reportModal = document.getElementById('reportModal');
    reportForm = document.getElementById('reportForm');

    const openBtn = document.getElementById('openReportBtn');
    const closeBtn = document.getElementById('closeReportModal');
    const cancelBtn = document.getElementById('cancelReport');

    // Open
    if (openBtn) {
        openBtn.addEventListener('click', openReportModal);
    }

    // Close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeReportModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeReportModal);
    }

    // Close on outside click
    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            closeReportModal();
        }
    });

    // Handle form submission
    if (reportForm) {
        reportForm.addEventListener('submit', handleFormSubmit);
    }

    // Add to city dropdown
    populateCityDropdown();
}

// Add to city dropdown
function populateCityDropdown() {
    const citySelect = document.getElementById('complaintCity');
    if (!citySelect) return;

    // Clear existing options
    citySelect.innerHTML = '<option value="">Select City</option>';

    // Add cities from coords
    Object.keys(cityCoords).forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city; // City names already formatted correctly
        citySelect.appendChild(option);
    });
}

// Open report
function openReportModal() {
    reportModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close report
function closeReportModal() {
    reportModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    reportForm.reset();
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('complaintName').value.trim(),
        email: document.getElementById('complaintEmail').value.trim(),
        status: document.getElementById('complaintStatus').value,
        city: document.getElementById('complaintCity').value
    };

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.valid) {
        showNotification(validation.message, 'error');
        return;
    }

    // Timestamp
    formData.date = new Date().toISOString();

    // Submit complaint
    const result = await submitComplaint(formData);

    if (result.success) {
        showNotification('Complaint lodged', 'success');
        closeReportModal();

        // Check if filtering by city
        const citySelector = document.getElementById('citySelector');
        const selectedCity = citySelector ? citySelector.value : null;
        loadComplaintsOnMap(selectedCity);
    } else {
        showNotification('Failed to submit complaint. Please try again.', 'error');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reportModal')) {
        initReportForm();
    }
});