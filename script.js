// Destinations database for search functionality
const destinations = [
    {
        name: "Maldives",
        type: "Beach",
        description: "Crystal clear waters and overwater bungalows make the Maldives a tropical paradise. Perfect for honeymoons and luxury getaways.",
        keywords: ["beach", "tropical", "paradise", "honeymoon", "luxury", "overwater", "bungalows", "crystal", "clear", "waters"]
    },
    {
        name: "Santorini, Greece",
        type: "Beach",
        description: "Iconic white buildings and stunning sunsets over the Aegean Sea. A perfect blend of beach relaxation and cultural exploration.",
        keywords: ["beach", "greece", "santorini", "sunset", "white", "buildings", "aegean", "cultural", "relaxation"]
    },
    {
        name: "Angkor Wat, Cambodia",
        type: "Temple",
        description: "The world's largest religious monument, showcasing magnificent Khmer architecture and centuries of history.",
        keywords: ["temple", "cambodia", "angkor", "wat", "religious", "monument", "khmer", "architecture", "history"]
    },
    {
        name: "Kiyomizu-dera, Japan",
        type: "Temple",
        description: "A UNESCO World Heritage site offering breathtaking views of Kyoto and traditional Japanese architecture.",
        keywords: ["temple", "japan", "kyoto", "unesco", "heritage", "traditional", "architecture", "kiyomizu"]
    },
    {
        name: "Italy",
        type: "Country",
        description: "From the romantic canals of Venice to the ancient ruins of Rome, Italy offers art, history, and incredible cuisine.",
        keywords: ["country", "italy", "venice", "rome", "art", "history", "cuisine", "romantic", "canals", "ruins"]
    },
    {
        name: "Japan",
        type: "Country",
        description: "Experience the perfect harmony of ancient traditions and modern innovation, from bustling Tokyo to serene temples.",
        keywords: ["country", "japan", "tokyo", "traditions", "modern", "innovation", "temples", "harmony"]
    }
];

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const searchInput = document.getElementById('searchInput');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Search input event listeners
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                performSearch();
            } else {
                clearSearch();
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Search button event listener
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            performSearch();
        });
    }

    // Clear button event listener
    const clearBtn = document.querySelector('.clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
            e.preventDefault();
            clearSearch();
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
        const searchResults = document.getElementById('searchResults');
        const searchContainer = document.querySelector('.search-container');

        if (searchResults && searchContainer &&
            !searchContainer.contains(e.target) &&
            !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Animate destination cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all destination cards
    document.querySelectorAll('.destination-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe value cards on about page
    document.querySelectorAll('.value-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        clearSearch();
        return;
    }

    // Filter destinations based on search query
    const filteredDestinations = destinations.filter(destination => {
        return destination.name.toLowerCase().includes(query) ||
            destination.type.toLowerCase().includes(query) ||
            destination.description.toLowerCase().includes(query) ||
            destination.keywords.some(keyword => keyword.toLowerCase().includes(query));
    });

    // Display search results
    displaySearchResults(filteredDestinations, query);
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput) {
        searchInput.value = '';
    }

    if (searchResults) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
    }
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');

    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h4>No destinations found for "${query}"</h4>
                <p>Try searching for beaches, temples, countries, or specific destination names.</p>
            </div>
        `;
    } else {
        const resultsHTML = results.map(destination => `
            <div class="search-result-item" onclick="selectDestination('${destination.name}')">
                <h4>${destination.name} <span style="color: #667eea; font-size: 0.8em;">(${destination.type})</span></h4>
                <p>${destination.description}</p>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    searchResults.classList.add('active');
}

function selectDestination(destinationName) {
    // Close search results
    clearSearch();

    // If we're not on the home page, redirect to home page
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        window.location.href = 'index.html#recommendations';
        return;
    }

    // Scroll to recommendations section
    scrollToRecommendations();

    // Highlight the selected destination (optional enhancement)
    setTimeout(() => {
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            const cardTitle = card.querySelector('h4');
            if (cardTitle && cardTitle.textContent.includes(destinationName)) {
                card.style.border = '3px solid #667eea';
                card.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';

                // Remove highlight after 3 seconds
                setTimeout(() => {
                    card.style.border = '';
                    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }, 3000);
            }
        });
    }, 500);
}

// Scroll to recommendations section
function scrollToRecommendations() {
    const recommendationsSection = document.getElementById('recommendations');
    if (recommendationsSection) {
        recommendationsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form submission handler
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formMessage = document.getElementById('formMessage');

    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add interactive hover effects for destination cards
document.addEventListener('DOMContentLoaded', function () {
    const destinationCards = document.querySelectorAll('.destination-card');

    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});
