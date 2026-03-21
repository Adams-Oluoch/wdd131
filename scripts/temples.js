// temples.js - Hamburger menu, filtering, and dynamic footer

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== FOOTER DYNAMIC CONTENT ==========
    // Copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Last modified date
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
    
    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
            // Change hamburger icon to X when open
            if (nav.classList.contains('show')) {
                hamburger.textContent = '✕';
            } else {
                hamburger.textContent = '☰';
            }
        });
    }
    
    // ========== FILTER FUNCTIONALITY ==========
    const navLinks = document.querySelectorAll('nav a');
    const temples = document.querySelectorAll('.temple');
    
    function filterTemples(filter) {
        let visibleCount = 0;
        
        temples.forEach(temple => {
            if (filter === 'all') {
                temple.style.display = '';
                visibleCount++;
                return;
            }
            
            const era = temple.getAttribute('data-era');
            const size = temple.getAttribute('data-size');
            
            let match = false;
            if (filter === 'old' && era === 'old') match = true;
            if (filter === 'new' && era === 'new') match = true;
            if (filter === 'large' && size === 'large') match = true;
            if (filter === 'small' && size === 'small') match = true;
            
            if (match) {
                temple.style.display = '';
                visibleCount++;
            } else {
                temple.style.display = 'none';
            }
        });
        
        // Update heading text
        const h1 = document.querySelector('h1');
        if (h1) {
            let filterText = '';
            switch(filter) {
                case 'all': filterText = 'Home'; break;
                case 'old': filterText = 'Old Temples'; break;
                case 'new': filterText = 'New Temples'; break;
                case 'large': filterText = 'Large Temples'; break;
                case 'small': filterText = 'Small Temples'; break;
            }
            h1.textContent = filterText;
        }
        
        // Show message if no results
        const gallery = document.getElementById('gallery');
        const existingMsg = document.querySelector('.no-results');
        
        if (visibleCount === 0 && !existingMsg) {
            const msg = document.createElement('div');
            msg.className = 'no-results';
            msg.textContent = 'No temples found for this filter.';
            msg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;';
            gallery.appendChild(msg);
        } else if (visibleCount > 0 && existingMsg) {
            existingMsg.remove();
        }
    }
    
    // Add click handlers to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Get filter value
            const filter = link.getAttribute('data-filter');
            filterTemples(filter);
            
            // Close mobile menu after selection
            if (window.innerWidth < 768 && nav.classList.contains('show')) {
                nav.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && nav.classList.contains('show')) {
            nav.classList.remove('show');
            if (hamburger) hamburger.textContent = '☰';
        }
    });
    
    // Initialize with all temples visible
    filterTemples('all');
});