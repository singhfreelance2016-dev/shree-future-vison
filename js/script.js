/* ============================================
   SHREE FUTURE VISION SECONDARY SCHOOL
   Main JavaScript File
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoader();
    initScrollToTop();
    initNavbar();
    initMobileMenu();
    initCounterAnimation();
    initTestimonialSlider();
    initScrollAnimations();
    initGalleryLightbox();
    initGalleryFilters();
    initForms();
    initSmoothScrolling();
});

/* Loading Animation */
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

/* Scroll to Top Button */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* Navbar Scroll Effect */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* Mobile Menu Toggle */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* Counter Animation */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Use Intersection Observer to start counter when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* Testimonial Slider */
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        if (currentIndex >= slides.length) currentIndex = 0;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Start auto sliding
    autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

/* Gallery Lightbox */
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!lightbox || !lightboxImg || galleryItems.length === 0) return;

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);
    document.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

/* Gallery Filters */
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length === 0 || galleryItems.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* Form Validation & Submission */
function initForms() {
    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAdmissionForm()) {
                submitAdmissionForm();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

function validateAdmissionForm() {
    let isValid = true;
    const form = document.getElementById('admissionForm');
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate Student Name
    const name = document.getElementById('studentName');
    if (!name.value.trim()) {
        showError(name, 'Student name is required');
        isValid = false;
    }

    // Validate DOB
    const dob = document.getElementById('dob');
    if (!dob.value) {
        showError(dob, 'Date of birth is required');
        isValid = false;
    }

    // Validate Gender
    const gender = document.getElementById('gender');
    if (!gender.value) {
        showError(gender, 'Please select gender');
        isValid = false;
    }

    // Validate Grade
    const grade = document.getElementById('gradeApplying');
    if (!grade.value) {
        showError(grade, 'Please select grade');
        isValid = false;
    }

    // Validate Parent Name
    const parentName = document.getElementById('parentName');
    if (!parentName.value.trim()) {
        showError(parentName, 'Parent name is required');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    // Validate Phone
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate Address
    const address = document.getElementById('address');
    if (!address.value.trim()) {
        showError(address, 'Address is required');
        isValid = false;
    }

    return isValid;
}

function validateContactForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');

    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate Name
    const name = document.getElementById('contactName');
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('contactEmail');
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    // Validate Message
    const message = document.getElementById('contactMessage');
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    // Allow digits, spaces, +, -, and parentheses
    const re = /^[\d\s+\-()]{7,15}$/;
    return re.test(phone);
}

function submitAdmissionForm() {
    const form = document.getElementById('admissionForm');
    const successMsg = document.getElementById('formSuccess');
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMsg.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        }, 5000);
    }, 1500);
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('contactSuccess');
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMsg.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, 5000);
    }, 1500);
}

/* News Read More Toggle */
function toggleReadMore(newsId) {
    const article = document.getElementById(newsId);
    if (!article) return;
    
    const fullContent = article.querySelector('.news-full-content');
    const btn = article.querySelector('.read-more-btn');
    
    if (fullContent.style.display === 'none' || !fullContent.style.display) {
        fullContent.style.display = 'block';
        btn.innerHTML = 'Read Less <i class="fas fa-arrow-up"></i>';
        article.scrollIntoView({ behavior: 'smooth' });
    } else {
        fullContent.style.display = 'none';
        btn.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
    }
}

/* Download Syllabus */
function downloadSyllabus(level) {
    // Create a simple text file for demo
    const content = `Shree Future Vision Secondary School\n${level.charAt(0).toUpperCase() + level.slice(1)} Level Syllabus\nAcademic Year 2083 (2026-2027)\n\nThis is a placeholder syllabus document.\nIn a production environment, this would contain the actual curriculum details.\n\nFor more information, please contact the school office.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SFV_${level}_syllabus_2083.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show feedback
    alert(`${level.charAt(0).toUpperCase() + level.slice(1)} level syllabus downloaded successfully!`);
}

/* Smooth Scrolling for anchor links */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}