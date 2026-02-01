let sidebarCollapsed = false;

// Initialize
function initSidebar() {
    const toggleBtn = document.getElementById(`sidebarToggle`);
    const sidebar = document.querySelector(`.sidebar`);
    const hamburgerBtn = document.getElementById(`hamburgerToggle`);

    // Collapse/expand
    if (toggleBtn) {
        toggleBtn.addEventListener(`click`, () => {
            sidebarCollapsed = !sidebarCollapsed;
            sidebar.classList.toggle(`collapsed`);
        });
    }

    // Mobile
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener(`click`, () => {
            sidebar.classList.toggle(`mobile-open`);
            document.body.classList.toggle(`sidebar-open`);
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener(`click`, (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                sidebar.classList.remove(`mobile-open`);
                document.body.classList.remove(`sidebar-open`);
            }
        }
    });
}

// FOr window resize
window.addEventListener(`resize`, () => {
    const sidebar = document.querySelector(`.sidebar`);
    if (window.innerWidth > 768) {
        sidebar.classList.remove(`mobile-open`);
        document.body.classList.remove(`sidebar-open`);
    }
});

// Initialize on page load
document.addEventListener(`DOMContentLoaded`, initSidebar);