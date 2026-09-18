// ===============================
// CLUB REGISTRATION LINK
// ===============================
const REGISTRATION_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=lvhZc-Jxrk24oxXN-X8vECF0D64XCTJKlQ1XcCIfuWxUNldBQUlQVkRGVzY1NzVRSThMOTg2WENaMi4u";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Scroll Effects
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    window.addEventListener('scroll', () => {
        // Navbar background blur and links visibility
        if (window.scrollY > window.innerHeight * 0.6) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Top scroll progress indicator
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // 2. Registration Buttons Integration
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Subtle click animation before redirect
            btn.style.transform = "scale(0.95)";
            setTimeout(() => {
                btn.style.transform = "";
                window.open(REGISTRATION_URL, "_blank");
            }, 150);
        });
    });

    // 3. Cinematic Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once for cinematic feel
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Lightweight Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    let currentImgIndex = 0;

    function openLightbox(index) {
        currentImgIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img').src;
        const category = item.getAttribute('data-category');
        
        lightboxImg.src = img;
        lightboxCaption.textContent = category;
        lightbox.classList.add('active');
        
        // Prevent background scrolling while lightbox is open
        document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
        openLightbox(currentImgIndex);
    }

    function prevImage() {
        currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentImgIndex);
    }

    // Attach click events to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightboxNext.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        nextImage(); 
    });
    
    lightboxPrev.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        prevImage(); 
    });
    
    // Close lightbox on clicking background
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });

    // Sticky Apply Button Logic
    const stickyApplyBtn = document.getElementById('stickyApplyBtn');
    const exploreSection = document.getElementById('explore'); // What We Have Done
    const footerSection = document.querySelector('.footer');

    if (stickyApplyBtn && exploreSection && footerSection) {
        window.addEventListener('scroll', () => {
            const exploreBottom = exploreSection.getBoundingClientRect().bottom;
            const footerTop = footerSection.getBoundingClientRect().top;
            
            // Hide the button if the footer is visible in the viewport
            const isFooterVisible = footerTop < window.innerHeight - 50;

            // Appear with magic transition when scrolling past 'what we have done'
            if (exploreBottom < window.innerHeight / 1.5 && !isFooterVisible) {
                stickyApplyBtn.classList.add('visible');
            } else {
                stickyApplyBtn.classList.remove('visible');
            }
        });
    }

    // Keyboard support for Lightbox accessibility
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
});
