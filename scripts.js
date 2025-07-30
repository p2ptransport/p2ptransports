// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form Handling
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmission);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }

    // Modal functionality
    setupModals();

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

    // Add loading animation to buttons on form submission
    setupFormSubmissionAnimations();

    // Initialize date inputs with minimum date as today
    initializeDateInputs();
});

// Modal Functions
function setupModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Get the close button
        const closeBtn = modal.querySelector('.close');
        
        // Close modal when clicking X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal.id);
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Quote Form Submission Handler
function handleQuoteSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const quoteData = Object.fromEntries(formData.entries());
    
    // Get checkbox values
    const requirements = formData.getAll('requirements');
    quoteData.requirements = requirements;
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Generate reference number
        const referenceNumber = 'P2P-' + Date.now().toString().slice(-6);
        
        // Show success modal
        document.getElementById('referenceNumber').textContent = referenceNumber;
        document.getElementById('confirmEmail').textContent = quoteData.email;
        
        openModal('quote-success-modal');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Quote submitted:', quoteData);
    }, 2000);
}

// Contact Form Submission Handler
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Generate reference number
        const referenceNumber = 'CNT-' + Date.now().toString().slice(-6);
        
        // Show success modal
        document.getElementById('contactReferenceNumber').textContent = referenceNumber;
        
        openModal('contact-success-modal');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Contact form submitted:', contactData);
    }, 1500);
}

// Download File Function
function downloadFile(filename) {
    // Simulate file download
    console.log('Downloading file:', filename);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    
    // Create and show a simple notification
    showNotification(`${filename} download started!`);
}

// Notification Function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Form Submission Animations
function setupFormSubmissionAnimations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.style.position = 'relative';
                submitBtn.style.overflow = 'hidden';
                
                // Add loading spinner
                const spinner = document.createElement('span');
                spinner.innerHTML = '⏳';
                spinner.style.marginRight = '8px';
                submitBtn.insertBefore(spinner, submitBtn.firstChild);
            }
        });
    });
}

// Initialize Date Inputs
function initializeDateInputs() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
        
        // Set default pickup date to tomorrow if it's the pickup date field
        if (input.id === 'pickupDate') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            input.value = tomorrow.toISOString().split('T')[0];
        }
    });
}

// Service Type Change Handler
document.addEventListener('change', function(e) {
    if (e.target.id === 'serviceType') {
        const serviceType = e.target.value;
        const weightField = document.getElementById('weight');
        const piecesField = document.getElementById('pieces');
        
        // Provide helpful hints based on service type
        if (serviceType === 'FTL') {
            weightField.placeholder = 'Typically 10,000+ lbs';
            piecesField.placeholder = 'Any number of pieces';
        } else if (serviceType === 'LTL') {
            weightField.placeholder = '150-10,000 lbs';
            piecesField.placeholder = 'Number of pallets/pieces';
        } else if (serviceType === 'expedited') {
            weightField.placeholder = 'Any weight';
            piecesField.placeholder = 'Number of pieces';
        } else if (serviceType === 'specialized') {
            weightField.placeholder = 'Varies by cargo type';
            piecesField.placeholder = 'Number of items';
        } else {
            weightField.placeholder = '';
            piecesField.placeholder = '';
        }
    }
});

// Cargo Type Change Handler
document.addEventListener('change', function(e) {
    if (e.target.id === 'cargoType') {
        const cargoType = e.target.value;
        const requirementsCheckboxes = document.querySelectorAll('input[name="requirements"]');
        
        // Auto-suggest requirements based on cargo type
        if (cargoType === 'electronics' || cargoType === 'machinery') {
            // Suggest special handling for sensitive items
            requirementsCheckboxes.forEach(checkbox => {
                if (checkbox.value === 'inside-pickup' || checkbox.value === 'inside-delivery') {
                    checkbox.parentElement.style.backgroundColor = '#fef3c7';
                }
            });
        } else if (cargoType === 'food') {
            // Suggest temperature control for food items
            requirementsCheckboxes.forEach(checkbox => {
                if (checkbox.value === 'temperature-controlled') {
                    checkbox.parentElement.style.backgroundColor = '#fef3c7';
                }
            });
        } else {
            // Reset highlighting
            requirementsCheckboxes.forEach(checkbox => {
                checkbox.parentElement.style.backgroundColor = '';
            });
        }
    }
});

// Form Validation Enhancements
function addFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    removeErrorMessage(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // ZIP code validation
    if (fieldName && fieldName.includes('Zip') && value) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
        }
    }
    
    // Weight validation
    if (fieldName === 'weight' && value) {
        const weight = parseFloat(value);
        if (weight <= 0) {
            isValid = false;
            errorMessage = 'Weight must be greater than 0';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // Add error styling to field
    field.style.borderColor = '#dc2626';
}

function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.style.borderColor = '';
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', addFormValidation);

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .team-member, .blog-card, .download-item, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.downloadFile = downloadFile;