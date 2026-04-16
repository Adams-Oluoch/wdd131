// script.js - My Little Library Main JavaScript

// ==================== BOOK DATA (Objects & Arrays) ====================
const libraryBooks = [
    {
        id: 1,
        title: "The Book of Mormon",
        author: "Latter-day Saints",
        genre: "Religious",
        year: 1830,
        summary: "Sacred scripture of The Church of Jesus Christ of Latter-day Saints, recounting the history of God's dealings with ancient peoples in the Americas.",
        personalNotes: "The foundation of my faith. This book has brought me closer to Christ and provided guidance and comfort through every season of life. I read from it daily.",
        coverImage: "https://covers.openlibrary.org/b/isbn/3865976556-M.jpg"
    },
    {
        id: 2,
        title: "The Shack",
        author: "William P. Young",
        genre: "Religious Fiction",
        year: 2007,
        summary: "A transformative story about a man who encounters God in an unexpected place, exploring deep theological questions about faith, suffering, and redemption through dialogue and spiritual awakening.",
        personalNotes: "This book challenges my thinking about God's nature and His love. Young presents profound theological concepts in an accessible, thought-provoking narrative that stays with me.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780964729247-L.jpg"
    },
    {
        id: 3,
        title: "The Great Divorce",
        author: "C.S. Lewis",
        genre: "Religious Fiction",
        year: 1945,
        summary: "An allegorical novella depicting a journey from Hell to Heaven, exploring themes of grace, redemption, and spiritual transformation through imaginative storytelling.",
        personalNotes: "Lewis's imaginative allegory opens my eyes to spiritual truths. The depiction of heaven and hell feels more real than factual description, and the dialogue is profoundly moving.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061765254-L.jpg"
    },
    {
        id: 4,
        title: "God's Smuggler",
        author: "Brother Andrew",
        genre: "Religious Biography",
        year: 1967,
        summary: "An inspiring true story of a Christian missionary's dangerous work smuggling Bibles into communist countries, demonstrating faith, courage, and devotion to spreading God's Word.",
        personalNotes: "Brother Andrew's courage and faith are extraordinary. His true accounts of God's protection and provision strengthen my own faith and challenge me to be more bold in witnessing.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780800717735-L.jpg"
    },
    {
        id: 5,
        title: "Jesus the Christ",
        author: "James E. Talmage",
        genre: "Religious",
        year: 1915,
        summary: "A comprehensive study of the life, teachings, ministry, and atonement of Jesus Christ from the perspective of Latter-day Saint theology, integrating scriptural, historical, and spiritual insights.",
        personalNotes: "This scholarly yet spiritual work has deepened my understanding of Christ's life and mission. Talmage's reverent treatment of sacred subject matter is truly inspiring.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780884945383-M.jpg"
    },
    {
        id: 6,
        title: "The God Who Weeps",
        author: "Terryl Givens",
        genre: "Religious Philosophy",
        year: 2011,
        summary: "An exploration of how God's love and concern for humanity are reflected in sacred texts, examining the nature of divine compassion and the relationship between God and His children.",
        personalNotes: "Givens writes with such eloquence about divine love. This book has helped me see God not as distant but as intimately invested in our happiness and growth.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9781609079512-M.jpg"
    },
    {
        id: 7,
        title: "Mere Christianity",
        author: "C.S. Lewis",
        genre: "Religious",
        year: 1952,
        summary: "A powerful defense and explanation of Christian belief, exploring the nature of God, morality, virtue, and the transformative power of faith in accessible, relatable language.",
        personalNotes: "C.S. Lewis has an amazing gift for making complex theological truths understandable and deeply moving. This book strengthens my faith every time I read it.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061471322-M.jpg"
    },
    {
        id: 8,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        year: 1960,
        summary: "A classic novel about racial injustice and the loss of innocence in the American South, told through the eyes of young Scout Finch, exploring themes of morality and courage.",
        personalNotes: "One of the most moving books I've ever read. Atticus Finch's moral integrity and courage inspire me. The way Harper Lee addresses justice and compassion remains profoundly relevant.",
        coverImage: "https://covers.openlibrary.org/b/isbn/0061120081-M.jpg"
    }
];

// ==================== ARRAY METHODS ====================
// Get all genres (using map and Set)
const getAllGenres = () => {
    const genres = libraryBooks.map(book => book.genre);
    return [...new Set(genres)];
};

// Filter books by genre (using filter)
const filterBooksByGenre = (genre) => {
    if (genre === 'all') return libraryBooks;
    return libraryBooks.filter(book => book.genre === genre);
};

// Get genre counts (using reduce)
const getGenreCounts = () => {
    return libraryBooks.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});
};

// Get most common genre (using Object.entries and reduce)
const getMostCommonGenre = () => {
    const counts = getGenreCounts();
    const entries = Object.entries(counts);
    if (entries.length === 0) return 'None';
    const mostCommon = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    return mostCommon[0];
};

// ==================== DOM INTERACTION & EVENT LISTENING ====================
// Function to display book grid (template literals used)
const displayBookGrid = (books) => {
    const gridContainer = document.getElementById('book-grid');
    if (!gridContainer) return;
    
    if (books.length === 0) {
        gridContainer.innerHTML = `<div class="loading">No books found in this genre.</div>`;
        return;
    }
    
    // Using template literals for string building
    let gridHTML = '';
    for (const book of books) {
        gridHTML += `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-cover">
                    <img src="${book.coverImage}" alt="${book.title} by ${book.author}" class="cover-image" loading="lazy" width="200" height="300">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <span class="book-genre">${book.genre}</span>
                </div>
            </div>
        `;
    }
    gridContainer.innerHTML = gridHTML;
    
    // Add click event listeners to book cards
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
            const bookId = parseInt(card.dataset.bookId);
            const selectedBook = libraryBooks.find(book => book.id === bookId);
            if (selectedBook) {
                // Store selected book in localStorage
                localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
                window.location.href = 'book-detail.html';
            }
        });
    });
};

// Function to update stats display (using template literals)
const updateStatsDisplay = () => {
    const totalBooksSpan = document.getElementById('total-books');
    const totalGenresSpan = document.getElementById('total-genres');
    const mostCommonSpan = document.getElementById('most-common-genre');
    
    if (totalBooksSpan) totalBooksSpan.textContent = libraryBooks.length;
    if (totalGenresSpan) totalGenresSpan.textContent = getAllGenres().length;
    if (mostCommonSpan) mostCommonSpan.textContent = getMostCommonGenre();
};

// Function to populate genre filter dropdown
const populateGenreFilter = () => {
    const filterSelect = document.getElementById('genre-filter');
    if (!filterSelect) return;
    
    const genres = getAllGenres();
    let optionsHTML = '<option value="all">All Genres</option>';
    for (const genre of genres) {
        optionsHTML += `<option value="${genre}">${genre}</option>`;
    }
    filterSelect.innerHTML = optionsHTML;
};

// Function to handle genre filter change (conditional branching)
const handleGenreFilter = () => {
    const filterSelect = document.getElementById('genre-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', (event) => {
        const selectedGenre = event.target.value;
        const filteredBooks = filterBooksByGenre(selectedGenre);
        displayBookGrid(filteredBooks);
    });
};

// ==================== RANDOM RECOMMENDATION FUNCTION ====================
// Multiple functions
const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * libraryBooks.length);
    return libraryBooks[randomIndex];
};

const displayRandomRecommendation = () => {
    const randomBook = getRandomBook();
    // Using template literal
    const message = `📚 My recommendation for you is: "${randomBook.title}" by ${randomBook.author} (${randomBook.genre}). ${randomBook.summary.substring(0, 100)}...`;
    
    // Using alert for simplicity (also demonstrates DOM interaction)
    alert(message);
    
    // Store in localStorage (array of recommendations)
    let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
    recommendations.push({
        bookTitle: randomBook.title,
        bookAuthor: randomBook.author,
        genre: randomBook.genre,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
    
    updateRecommendationHistory();
};

// ==================== BOOK DETAIL PAGE FUNCTIONS ====================
const populateBookSelect = () => {
    const select = document.getElementById('book-select');
    if (!select) return;
    
    let optionsHTML = '<option value="">-- Select a Book --</option>';
    for (const book of libraryBooks) {
        optionsHTML += `<option value="${book.id}">${book.title} by ${book.author}</option>`;
    }
    select.innerHTML = optionsHTML;
};

const displayBookDetail = (bookId) => {
    const book = libraryBooks.find(b => b.id === parseInt(bookId));
    const detailContainer = document.getElementById('book-detail-card');
    const notesContainer = document.getElementById('notes-display');
    
    if (!book) {
        if (detailContainer) {
            detailContainer.innerHTML = `<div class="detail-placeholder">👆 Select a book from the dropdown above to see its details.</div>`;
        }
        return;
    }
    
    // Using template literals for detail display
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="detail-content">
                <div class="detail-cover">
                    <img src="${book.coverImage}" alt="${book.title} book cover" class="detail-cover-image" loading="lazy" width="250" height="375">
                </div>
                <div class="detail-info">
                    <h3>${book.title}</h3>
                    <p><strong>by ${book.author}</strong></p>
                    <div class="detail-meta">
                        <span>${book.genre}</span>
                        <span>Published: ${book.year}</span>
                    </div>
                    <div class="detail-summary">
                        <h4>Summary</h4>
                        <p>${book.summary}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (notesContainer) {
        notesContainer.innerHTML = `
            <div class="personal-notes">
                <h4>📝 Personal Reading Notes</h4>
                <p>${book.personalNotes}</p>
            </div>
        `;
    }
};

const handleBookSelect = () => {
    const select = document.getElementById('book-select');
    if (!select) return;
    
    select.addEventListener('change', (event) => {
        if (event.target.value) {
            displayBookDetail(event.target.value);
        } else {
            const detailContainer = document.getElementById('book-detail-card');
            if (detailContainer) {
                detailContainer.innerHTML = `<div class="detail-placeholder">👆 Select a book from the dropdown above to see its details.</div>`;
            }
            const notesContainer = document.getElementById('notes-display');
            if (notesContainer) {
                notesContainer.innerHTML = `<p class="notes-placeholder">Select a book to view personal reading notes.</p>`;
            }
        }
    });
};

// ==================== RECOMMENDATION HISTORY (localStorage) ====================
const updateRecommendationHistory = () => {
    const historyContainer = document.getElementById('recommendation-history');
    if (!historyContainer) return;
    
    const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
    
    if (recommendations.length === 0) {
        historyContainer.innerHTML = '<p class="history-placeholder">No recommendations yet. Click "Surprise Me!" on the catalog page or fill out the form!</p>';
        return;
    }
    
    // Using template literals and array method (map, join)
    let historyHTML = '';
    for (const rec of recommendations) {
        historyHTML += `
            <div class="recommendation-item">
                <strong>📖 ${rec.bookTitle}</strong> by ${rec.bookAuthor}<br>
                <small>Genre: ${rec.genre} | Recommended on: ${rec.date}</small>
            </div>
        `;
    }
    historyContainer.innerHTML = historyHTML;
};

const clearRecommendationHistory = () => {
    localStorage.removeItem('recommendations');
    updateRecommendationHistory();
    alert('✨ Recommendation history has been cleared!');
};

// ==================== FORM HANDLING (Conditional Branching, localStorage) ====================
const handleRecommendationForm = () => {
    const form = document.getElementById('recommendation-form');
    if (!form) return;
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('visitor-name')?.value || '';
        const email = document.getElementById('visitor-email')?.value || '';
        const genre = document.getElementById('fav-genre')?.value || '';
        const preference = document.querySelector('input[name="preference"]:checked')?.value || 'Not specified';
        const mood = document.getElementById('mood')?.value || 'Not specified';
        const subscribe = document.querySelector('input[name="subscribe"]:checked')?.value === 'yes';
        
        // Conditional branching for validation
        if (!name || !email || !genre) {
            alert('Please fill out all required fields (Name, Email, and Favorite Genre).');
            return;
        }
        
        // Find a recommendation based on genre preference
        let recommendedBooks = filterBooksByGenre(genre);
        
        // Conditional branching for recommendations
        let recommendation;
        if (recommendedBooks.length > 0) {
            recommendation = getRandomBook();
            // Keep trying to find a book in preferred genre if available
            let genreMatch = false;
            for (const book of recommendedBooks) {
                if (book.genre === genre) {
                    recommendation = book;
                    genreMatch = true;
                    break;
                }
            }
            if (!genreMatch && recommendedBooks.length > 0) {
                recommendation = recommendedBooks[0];
            }
        } else {
            recommendation = getRandomBook();
        }
        
        // Store form submission in localStorage
        let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        submissions.push({
            name: name,
            email: email,
            genre: genre,
            preference: preference,
            mood: mood,
            subscribe: subscribe,
            recommendedBook: `${recommendation.title} by ${recommendation.author}`,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        
        // Store recommendation in history
        let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations.push({
            bookTitle: recommendation.title,
            bookAuthor: recommendation.author,
            genre: recommendation.genre,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        // Redirect to confirmation page with query parameters
        const params = new URLSearchParams({
            name: name,
            genre: genre,
            book: recommendation.title,
            author: recommendation.author
        });
        window.location.href = `confirmation.html?${params.toString()}`;
    });
};

// ==================== CONFIRMATION PAGE DISPLAY ====================
const displayConfirmationSummary = () => {
    const summaryDiv = document.getElementById('request-summary');
    if (!summaryDiv) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const genre = urlParams.get('genre');
    const book = urlParams.get('book');
    const author = urlParams.get('author');
    
    if (name && book) {
        // Using template literal
        summaryDiv.innerHTML = `
            <div class="summary-box" style="background-color: var(--bg-beige); padding: 1rem; border-radius: 12px; margin: 1rem 0;">
                <p><strong>${name}</strong>, based on your interest in <strong>${genre}</strong> fiction...</p>
                <p>🎉 I recommend: <strong>"${book}"</strong> by ${author}</p>
                <p>I'll send more personalized recommendations to your inbox soon!</p>
            </div>
        `;
    } else {
        summaryDiv.innerHTML = '<p>Thank you for your request! Check your email soon for personalized recommendations.</p>';
    }
};

// ==================== HAMBURGER MENU ====================
const initHamburgerMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-mobile');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('show');
        });
    }
};

// ==================== FOOTER DATE UPDATES ====================
const updateFooterDates = () => {
    const currentYearSpans = document.querySelectorAll('.currentyear');
    const lastModifiedSpans = document.querySelectorAll('.lastmodified');
    
    const currentYear = new Date().getFullYear();
    for (const span of currentYearSpans) {
        span.textContent = currentYear;
    }
    
    for (const span of lastModifiedSpans) {
        span.textContent = `Last modified: ${document.lastModified}`;
    }
};

// ==================== NEWSLETTER SIGNUP ====================
const handleNewsletterSignup = (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (email) {
        // Store newsletter signup in localStorage
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        }
        
        // Provide feedback
        alert('Thank you for subscribing! Check your email for confirmation.');
        emailInput.value = '';
    }
};

// ==================== CLEAR RECOMMENDATIONS BUTTONS ====================
const initClearButtons = () => {
    const clearButtons = document.querySelectorAll('#clear-recommendations, #clear-recommendations-detail, #clear-recommendations-footer');
    for (const button of clearButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            clearRecommendationHistory();
        });
    }
};

// ==================== PAGE INITIALIZATION (DOMContentLoaded) ====================
document.addEventListener('DOMContentLoaded', () => {
    // Common initializations
    initHamburgerMenu();
    updateFooterDates();
    initClearButtons();
    updateRecommendationHistory();
    
    // Home page initialization
    if (document.getElementById('home-page') || document.getElementById('book-grid')) {
        displayBookGrid(libraryBooks);
        populateGenreFilter();
        handleGenreFilter();
        updateStatsDisplay();
        
        const randomBtn = document.getElementById('random-recommendation-btn');
        if (randomBtn) {
            randomBtn.addEventListener('click', displayRandomRecommendation);
        }
    }
    
    // Book detail page initialization
    if (document.getElementById('detail-page') || document.getElementById('book-select')) {
        populateBookSelect();
        handleBookSelect();
        
        // Check if a book was selected from the home page
        const savedBook = localStorage.getItem('selectedBook');
        if (savedBook) {
            const book = JSON.parse(savedBook);
            const select = document.getElementById('book-select');
            if (select) {
                select.value = book.id;
                displayBookDetail(book.id);
            }
            localStorage.removeItem('selectedBook');
        }
    }
    
    // Contact page initialization
    if (document.getElementById('contact-page')) {
        handleRecommendationForm();
    }
    
    // Confirmation page initialization
    if (document.getElementById('confirmation-page')) {
        displayConfirmationSummary();
    }
});