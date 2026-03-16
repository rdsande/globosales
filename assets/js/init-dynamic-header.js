// Initialize dynamic header loading for homepage
(function() {
    // Function to load component
    async function loadComponent(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
                
                // Execute scripts in the loaded content
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            }
        } catch (error) {
            console.error(`Error loading component from ${filePath}:`, error);
        }
    }

    // Remove old static header if it exists
    function removeOldHeader() {
        // Find and hide the old static header sections
        const oldHeaders = document.querySelectorAll('.header-top, .header-middle');
        oldHeaders.forEach(header => {
            // Only hide if it's not inside the header-placeholder
            if (!header.closest('#header-placeholder')) {
                header.style.display = 'none';
            }
        });
    }

    // Load header when DOM is ready
    document.addEventListener('DOMContentLoaded', async function() {
        await loadComponent('header-placeholder', 'includes/header-dynamic.html');
        removeOldHeader();
    });
})();
