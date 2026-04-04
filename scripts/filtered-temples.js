// filtered-temples.js - Hamburger menu, filtering, dynamic temple cards, and dynamic footer

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria-temple.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/albuquerque-temple.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/atlanta-temple.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/apia-samoa-temple.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/belem_brazil.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/bern-switzerland-temple.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/billings-montana-temple.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/boise-idaho-temple.jpg"
  },
  {
    templeName: "Provo Utah",
    location: "Provo, Utah, United States",
    dedicated: "1972, February, 9",
    area: 128325,
    imageUrl: "images/adelaide-australia-temple.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl: "images/aba-nigeria-temple.jpg"
  }
];

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
    
    // ========== DYNAMIC TEMPLE CARDS ==========
    const section = document.querySelector('main section');
    
    function createTempleCard(temple) {
        const figure = document.createElement('figure');
        figure.className = 'temple-card';
        
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = 'lazy';
        img.width = 400;
        img.height = 250;
        
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Area:</strong> ${temple.area} sq ft</p>
        `;
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        return figure;
    }
    
    function displayTemples(filteredTemples) {
        section.innerHTML = '';
        filteredTemples.forEach(temple => {
            const card = createTempleCard(temple);
            section.appendChild(card);
        });
    }
    
    // ========== FILTER FUNCTIONALITY ==========
    const navLinks = document.querySelectorAll('nav a');
    
    function filterTemples(filter) {
        let filtered = [];
        
        if (filter === 'all') {
            filtered = temples;
        } else {
            temples.forEach(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                const area = temple.area;
                
                let include = false;
                if (filter === 'old' && year < 1900) include = true;
                if (filter === 'new' && year > 2000) include = true;
                if (filter === 'large' && area > 90000) include = true;
                if (filter === 'small' && area < 10000) include = true;
                
                if (include) filtered.push(temple);
            });
        }
        
        displayTemples(filtered);
        
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