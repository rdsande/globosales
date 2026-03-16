// Load shared header and footer components
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

// Load header and footer on page load
document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('header-placeholder', 'includes/header.html');
    await loadComponent('footer-placeholder', 'includes/footer.html');
});
