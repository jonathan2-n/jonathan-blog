// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add animation when sections come into view
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.querySelector('.cart-count');
const buyButtons = document.querySelectorAll('.buy-button');

// Update cart count on page load
cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src;

        // Add to cart
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Change button text and style temporarily
        const originalText = this.textContent;
        this.textContent = 'Added to Cart!';
        this.style.backgroundColor = '#4CAF50';
        this.style.color = 'white';

        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
            this.style.color = '';
        }, 2000);

        // Add animation to cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('bounce');
        setTimeout(() => {
            cartIcon.classList.remove('bounce');
        }, 500);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = 'Message sent successfully!';
    formStatus.style.color = '#4CAF50';
    this.reset();
    
    setTimeout(() => {
        formStatus.textContent = '';
    }, 3000);
}); 