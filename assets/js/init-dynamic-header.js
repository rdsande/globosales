// Initialize dynamic header loading for homepage
(function() {
    console.log('[Init] Dynamic header loader starting...');
    
    // Function to load component
    async function loadComponent(elementId, filePath) {
        try {
            console.log('[Init] Fetching', filePath);
            const response = await fetch(filePath);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                console.log('[Init] Inserting HTML into', elementId);
                element.innerHTML = html;
                
                // Wait for StrapiAPI to be available before executing header scripts
                console.log('[Init] Waiting for StrapiAPI...');
                await waitForStrapiAPI();
                
                // Execute scripts in the loaded content
                const scripts = element.querySelectorAll('script');
                console.log('[Init] Found', scripts.length, 'scripts to execute');
                scripts.forEach((script, index) => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                    console.log('[Init] Executed script', index + 1);
                });
            } else {
                console.error('[Init] Element not found:', elementId);
            }
        } catch (error) {
            console.error(`[Init] Error loading component from ${filePath}:`, error);
        }
    }

    // Wait for StrapiAPI to be available
    function waitForStrapiAPI() {
        return new Promise((resolve) => {
            if (typeof StrapiAPI !== 'undefined') {
                console.log('[Init] StrapiAPI is ready');
                resolve();
            } else {
                console.log('[Init] Waiting for StrapiAPI to load...');
                const checkInterval = setInterval(() => {
                    if (typeof StrapiAPI !== 'undefined') {
                        console.log('[Init] StrapiAPI is now ready');
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            }
        });
    }

    // Remove old static header if it exists
    function removeOldHeader() {
        // Find and hide the old static header sections
        const oldHeaders = document.querySelectorAll('.header-top, .header-middle, .header');
        oldHeaders.forEach(header => {
            // Only hide if it's not inside the header-placeholder
            if (!header.closest('#header-placeholder')) {
                header.style.display = 'none';
            }
        });
    }

    // Load header when DOM is ready
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('[Init] DOM ready, loading header...');
        await loadComponent('header-placeholder', 'includes/header-dynamic.html');
        removeOldHeader();
        console.log('[Init] Header loading complete');
    });
})();
