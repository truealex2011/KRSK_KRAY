// Main JavaScript for Krasnoyarsk Region Website

// Simple global function for tab switching
window.switchTab = function(tabName, clickedButton) {
    console.log('=== switchTab called ===');
    console.log('Tab name:', tabName);
    console.log('Button:', clickedButton);
    
    // Remove active class from all tab buttons
    const allButtons = document.querySelectorAll('.tabs__btn');
    allButtons.forEach(btn => btn.classList.remove('tabs__btn--active'));
    
    // Remove active class from all tab panels
    const allPanels = document.querySelectorAll('.tabs__panel');
    allPanels.forEach(panel => panel.classList.remove('tabs__panel--active'));
    
    // Add active class to clicked button
    clickedButton.classList.add('tabs__btn--active');
    
    // Add active class to corresponding panel
    const targetPanel = document.querySelector(`[data-panel="${tabName}"]`);
    if (targetPanel) {
        targetPanel.classList.add('tabs__panel--active');
        console.log('Panel activated:', tabName);
        
        // Save the active tab to localStorage
        localStorage.setItem('activeTab', tabName);
        console.log('Saved to localStorage:', tabName);
        
        // If switching to economy tab, initialize economy tabs
        if (tabName === 'economy') {
            console.log('Economy tab activated, initializing economy tabs...');
            if (typeof window.initEconomyTabsOnDemand === 'function') {
                window.initEconomyTabsOnDemand();
            }
        }
    } else {
        console.error('Panel not found:', tabName);
        // List all available panels for debugging
        const availablePanels = document.querySelectorAll('[data-panel]');
        console.log('Available panels:', Array.from(availablePanels).map(p => p.getAttribute('data-panel')));
    }
};

// Restore last active tab from localStorage
function restoreActiveTab() {
    console.log('=== restoreActiveTab function called ===');
    
    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
        console.log('=== Inside setTimeout ===');
        const savedTab = localStorage.getItem('activeTab');
        console.log('Saved tab from localStorage:', savedTab);
        
        if (savedTab) {
            console.log('Attempting to restore tab:', savedTab);
            
            // Find the button for the saved tab
            const savedButton = document.querySelector(`.tabs__btn[data-tab="${savedTab}"]`);
            console.log('Found button:', savedButton);
            
            if (savedButton) {
                // Call switchTab with the button element
                console.log('Calling switchTab...');
                window.switchTab(savedTab, savedButton);
                console.log('Successfully restored tab:', savedTab);
            } else {
                console.error('Saved tab button not found:', savedTab);
                const allButtons = document.querySelectorAll('.tabs__btn');
                console.log('Available buttons:', Array.from(allButtons).map(b => b.getAttribute('data-tab')));
            }
        } else {
            console.log('No saved tab found in localStorage');
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOMContentLoaded fired ===');
    
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Header scroll effects
    initHeaderEffects();
    
    // Animation on scroll
    initScrollAnimations();
    
    // Initialize new interactive components
    initTabs();
    initAccordion();
    initInfoPanel();
    initModals();
    
    // Restore last active tab
    console.log('=== About to call restoreActiveTab ===');
    restoreActiveTab();
    console.log('=== restoreActiveTab called ===');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.classList.toggle('nav__toggle--active');
            navMenu.classList.toggle('nav__menu--active');
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', isExpanded ? 'Открыть меню навигации' : 'Закрыть меню навигации');
            
            // Manage focus
            if (!isExpanded) {
                // Menu is opening, focus first link
                const firstLink = navMenu.querySelector('.nav__link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--active')) {
                navToggle.classList.remove('nav__toggle--active');
                navMenu.classList.remove('nav__menu--active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Открыть меню навигации');
                navToggle.focus();
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('nav__toggle--active');
            navMenu.classList.remove('nav__menu--active');
        });
    });
    
    // Active link highlighting
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('nav__link--active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initHeaderEffects() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateHeader);
}

// Animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('section__header')) {
                    element.style.animation = 'fadeInDown 0.8s ease-out forwards';
                } else if (element.classList.contains('feature-card')) {
                    const delay = Array.from(element.parentNode.children).indexOf(element) * 0.2;
                    element.style.animationDelay = `${delay}s`;
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else if (element.classList.contains('nature-card')) {
                    const delay = Array.from(element.parentNode.children).indexOf(element) * 0.3;
                    element.style.animationDelay = `${delay}s`;
                    element.style.animation = 'scaleIn 0.8s ease-out forwards';
                } else if (element.classList.contains('tourism__content')) {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section__header, .feature-card, .nature-card, .tourism__content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Parallax effect for hero elements
    initParallaxEffects();
    
    // Progress indicator
    initScrollProgress();
}

// Parallax effects
function initParallaxEffects() {
    const heroPattern = document.querySelector('.hero__bg-pattern');
    const heroLeaves = document.querySelector('.hero__leaves');
    const mountainSilhouette = document.querySelector('.hero__mountain-silhouette');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rateLeaves = scrolled * -0.3;
        const rateMountains = scrolled * -0.2;
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroLeaves) {
            heroLeaves.style.transform = `translateY(${rateLeaves}px) rotate(${scrolled * 0.1}deg)`;
        }
        
        if (mountainSilhouette) {
            mountainSilhouette.style.transform = `translateY(${rateMountains}px)`;
        }
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress__bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = scrollPercent + '%';
    });
}

// Add some interactive effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .nature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero background
function initParallaxEffect() {
    const heroPattern = document.querySelector('.hero__bg-pattern');
    
    if (heroPattern) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroPattern.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', initParallaxEffect);

// Final optimizations and enhancements

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handlers
const optimizedScrollHandler = debounce(function() {
    // updateHeader is now handled by initHeaderEffects
    if (window.initParallaxEffects) {
        initParallaxEffects();
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => img.classList.add('loaded'));
    }
}

// Enhanced form handling
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.classList.add('btn--loading');
                submitButton.setAttribute('aria-label', 'Отправка...');
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds (adjust based on your needs)
                setTimeout(() => {
                    submitButton.classList.remove('btn--loading');
                    submitButton.removeAttribute('aria-label');
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
    // Escape key handler for closing menus
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navMenu && navMenu.classList.contains('nav__menu--active')) {
                navToggle.classList.remove('nav__toggle--active');
                navMenu.classList.remove('nav__menu--active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
    });
    
    // Tab trap for mobile menu
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = navMenu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log(`Page load time: ${loadTime}ms`);
                
                // Log Core Web Vitals if available
                if ('web-vitals' in window) {
                    // This would require the web-vitals library
                    // getCLS(console.log);
                    // getFID(console.log);
                    // getLCP(console.log);
                }
            }, 0);
        });
    }
}

// Error boundary for JavaScript errors
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        
        // You could send this to an error reporting service
        // reportError(e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        
        // You could send this to an error reporting service
        // reportError(e.reason);
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initFormEnhancements();
    initKeyboardNavigation();
    initPerformanceMonitoring();
    initErrorHandling();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.footer__newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            console.log('Newsletter signup:', email);
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="icon icon-leaf" aria-hidden="true"></span>Подписан!';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                this.reset();
            }, 2000);
        });
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Enhanced Interactive Components

// Tabs System
function initTabs() {
    console.log('Initializing tabs...');
    
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanels = document.querySelectorAll('.tabs__panel');
    
    console.log('Found', tabButtons.length, 'tab buttons');
    console.log('Found', tabPanels.length, 'tab panels');
    
    if (tabButtons.length === 0) {
        console.warn('No tab buttons found!');
        return;
    }
    
    tabButtons.forEach((button, index) => {
        const tabName = button.getAttribute('data-tab');
        console.log(`Setting up tab ${index}: ${tabName}`);
        
        // Remove any existing event listeners
        button.onclick = null;
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Tab clicked:', tabName);
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => {
                btn.classList.remove('tabs__btn--active');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.remove('tabs__panel--active');
            });
            
            // Add active class to clicked button
            this.classList.add('tabs__btn--active');
            
            // Find and activate corresponding panel
            const targetPanel = document.querySelector(`[data-panel="${tabName}"]`);
            
            if (targetPanel) {
                targetPanel.classList.add('tabs__panel--active');
                console.log('Activated panel:', tabName);
            } else {
                console.error('Panel not found for tab:', tabName);
                // List all available panels
                const allPanels = document.querySelectorAll('[data-panel]');
                console.log('Available panels:', Array.from(allPanels).map(p => p.getAttribute('data-panel')));
            }
        });
    });
    
    console.log('Tabs initialization complete');
}

// Accordion System
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('accordion__item--active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion__item').forEach(item => {
                item.classList.remove('accordion__item--active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('accordion__item--active');
            }
        });
    });
}

// Info Panel System
function initInfoPanel() {
    const infoPanelToggle = document.getElementById('infoPanelToggle');
    const infoPanel = document.getElementById('infoPanel');
    const infoPanelClose = document.getElementById('infoPanelClose');
    
    if (infoPanelToggle && infoPanel) {
        infoPanelToggle.addEventListener('click', function() {
            infoPanel.classList.add('info-panel--active');
        });
    }
    
    if (infoPanelClose && infoPanel) {
        infoPanelClose.addEventListener('click', function() {
            infoPanel.classList.remove('info-panel--active');
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (infoPanel && infoPanel.classList.contains('info-panel--active')) {
            if (!infoPanel.contains(e.target) && !infoPanelToggle.contains(e.target)) {
                infoPanel.classList.remove('info-panel--active');
            }
        }
    });
}

// Modal System
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloses = document.querySelectorAll('.modal__close');
    
    // Open modals
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') + 'Modal';
            const modal = document.getElementById(modalId);
            
            if (modal && modalOverlay) {
                modal.classList.add('modal--active');
                modalOverlay.classList.add('modal-overlay--active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeAllModals();
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('modal--active'));
        if (modalOverlay) {
            modalOverlay.classList.remove('modal-overlay--active');
        }
        document.body.style.overflow = '';
    }
}


// ============================================
// IMAGE VIEWER SYSTEM
// ============================================

// Global function to open image viewer
window.openImageViewer = function(imageId, title, description) {
    console.log('Opening image viewer:', imageId, title, description);
    
    const viewer = document.getElementById('imageViewer');
    if (!viewer) {
        console.error('Image viewer element not found!');
        return;
    }
    
    // Get data from VIEWER_DATABASE
    const imageData = window.VIEWER_DATABASE && window.VIEWER_DATABASE[imageId];
    
    if (!imageData) {
        console.error('Image data not found for:', imageId);
        console.log('Available images:', window.VIEWER_DATABASE ? Object.keys(window.VIEWER_DATABASE) : 'VIEWER_DATABASE not loaded');
        return;
    }
    
    // Update viewer content
    updateImageViewerContent(imageData, title, description);
    
    // Show viewer
    viewer.classList.add('image-viewer--active');
    document.body.style.overflow = 'hidden';
    
    console.log('Image viewer opened successfully');
};

// Update image viewer content
function updateImageViewerContent(imageData, title, description) {
    const viewer = document.getElementById('imageViewer');
    
    // Update image
    const img = document.getElementById('viewerImage');
    if (img && imageData.image) {
        img.src = imageData.image;
        img.alt = title;
    }
    
    // Update title
    const titleElement = document.getElementById('viewerTitle');
    if (titleElement) {
        titleElement.textContent = title || imageData.title;
    }
    
    // Update tabs if they exist
    if (imageData.tabs) {
        updateImageViewerTabs(imageData.tabs);
    }
    
    // Update stats if they exist
    if (imageData.stats) {
        updateImageViewerStats(imageData.stats);
    }
}

// Update image viewer tabs
function updateImageViewerTabs(tabs) {
    const tabsContainer = document.getElementById('viewerTabs');
    const contentContainer = document.getElementById('viewerTabContent');
    const infoPanel = document.getElementById('viewerInfo');
    
    if (!tabsContainer || !contentContainer) {
        console.error('Tab containers not found!');
        return;
    }
    
    // Show info panel
    if (infoPanel) {
        infoPanel.style.display = 'block';
    }
    
    // Clear existing tabs
    tabsContainer.innerHTML = '';
    contentContainer.innerHTML = '';
    
    // Create tabs
    const tabNames = Object.keys(tabs);
    tabNames.forEach((tabName, index) => {
        // Create tab button
        const button = document.createElement('button');
        button.className = 'image-viewer__tab' + (index === 0 ? ' image-viewer__tab--active' : '');
        button.textContent = tabName;
        button.onclick = () => switchImageViewerTab(tabName);
        tabsContainer.appendChild(button);
        
        // Create tab content
        const content = document.createElement('div');
        content.className = 'image-viewer__tab-panel' + (index === 0 ? ' image-viewer__tab-panel--active' : '');
        content.setAttribute('data-tab', tabName);
        
        const tabData = tabs[tabName];
        if (tabData.sections) {
            tabData.sections.forEach(section => {
                if (section.title) {
                    const heading = document.createElement('h4');
                    heading.textContent = section.title;
                    content.appendChild(heading);
                }
                
                if (section.text) {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = section.text;
                    content.appendChild(paragraph);
                }
                
                if (section.list) {
                    const list = document.createElement('ul');
                    section.list.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        list.appendChild(li);
                    });
                    content.appendChild(list);
                }
            });
        }
        
        contentContainer.appendChild(content);
    });
}

// Switch image viewer tab
function switchImageViewerTab(tabName) {
    const buttons = document.querySelectorAll('.image-viewer__tab');
    const panels = document.querySelectorAll('.image-viewer__tab-panel');
    
    buttons.forEach(btn => {
        btn.classList.toggle('image-viewer__tab--active', btn.textContent === tabName);
    });
    
    panels.forEach(panel => {
        panel.classList.toggle('image-viewer__tab-panel--active', panel.getAttribute('data-tab') === tabName);
    });
}

// Update image viewer stats
function updateImageViewerStats(stats) {
    const statsContainer = document.getElementById('viewerStats');
    if (!statsContainer) {
        console.error('Stats container not found!');
        return;
    }
    
    statsContainer.innerHTML = '';
    
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'image-viewer__stat';
        statElement.textContent = stat;
        statsContainer.appendChild(statElement);
    });
}

// Close image viewer
window.closeImageViewer = function() {
    const viewer = document.getElementById('imageViewer');
    if (viewer) {
        viewer.classList.remove('image-viewer--active');
        document.body.style.overflow = '';
    }
};

// Initialize image viewer controls
document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.getElementById('imageViewer');
    if (!viewer) return;
    
    // Close button
    const closeBtn = viewer.querySelector('.image-viewer__btn[onclick*="closeImageViewer"]');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageViewer);
    }
    
    // Close on overlay click
    viewer.addEventListener('click', function(e) {
        if (e.target === viewer) {
            closeImageViewer();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && viewer.classList.contains('image-viewer--active')) {
            closeImageViewer();
        }
    });
    
    // Image zoom and pan
    initImageZoomPan();
});

// Image zoom and pan functionality
function initImageZoomPan() {
    const img = document.querySelector('.image-viewer__image');
    if (!img) return;
    
    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };
    
    // Mouse wheel zoom
    img.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale += delta;
        scale = Math.min(Math.max(0.5, scale), 4);
        
        img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    });
    
    // Mouse drag pan
    img.addEventListener('mousedown', function(e) {
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!panning) return;
        
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        
        img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    });
    
    document.addEventListener('mouseup', function() {
        panning = false;
    });
    
    // Reset on double click
    img.addEventListener('dblclick', function() {
        scale = 1;
        pointX = 0;
        pointY = 0;
        img.style.transform = `translate(0px, 0px) scale(1)`;
    });
}

// Modal tab switching for geography/yenisei modals
window.switchModalTab = function(modalType, tabName, clickedButton) {
    console.log('switchModalTab called:', modalType, tabName);
    
    // Find the modal
    const modal = document.getElementById(modalType + 'Modal');
    if (!modal) {
        console.error('Modal not found:', modalType + 'Modal');
        return;
    }
    
    // Remove active class from all tabs in this modal
    const allTabs = modal.querySelectorAll('.modal__tab');
    allTabs.forEach(tab => tab.classList.remove('modal__tab--active'));
    
    // Remove active class from all panels in this modal
    const allPanels = modal.querySelectorAll('.modal__panel');
    allPanels.forEach(panel => panel.classList.remove('modal__panel--active'));
    
    // Add active class to clicked button
    if (clickedButton) {
        clickedButton.classList.add('modal__tab--active');
    }
    
    // Add active class to corresponding panel
    const targetPanel = modal.querySelector(`[data-panel="${tabName}"]`);
    if (targetPanel) {
        targetPanel.classList.add('modal__panel--active');
        console.log('Panel activated:', tabName);
    } else {
        console.error('Panel not found:', tabName);
    }
};

// Open modal function
window.openModal = function(modalType) {
    console.log('Opening modal:', modalType);
    
    const modal = document.getElementById(modalType + 'Modal');
    const overlay = document.getElementById('modalOverlay');
    
    if (modal && overlay) {
        modal.classList.add('modal--active');
        overlay.classList.add('modal-overlay--active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal or overlay not found:', modalType);
    }
};

// Close modal function
window.closeModal = function() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modalOverlay');
    
    modals.forEach(modal => modal.classList.remove('modal--active'));
    if (overlay) {
        overlay.classList.remove('modal-overlay--active');
    }
    document.body.style.overflow = '';
};

// Toggle accordion
window.toggleAccordion = function(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('accordion__item--active');
    
    // Close all items
    document.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('accordion__item--active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('accordion__item--active');
    }
};

// Toggle info panel
window.toggleInfoPanel = function() {
    const panel = document.getElementById('infoPanel');
    if (panel) {
        panel.classList.toggle('info-panel--active');
    }
};

console.log('Image viewer system loaded');


// Toggle Section Cards
window.toggleSection = function(card) {
    console.log('toggleSection called', card);
    const isActive = card.classList.contains('active');
    
    // Закрыть все другие карточки
    document.querySelectorAll('.section-card').forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
        }
    });
    
    // Переключить текущую карточку
    if (isActive) {
        card.classList.remove('active');
        console.log('Card closed');
    } else {
        card.classList.add('active');
        console.log('Card opened');
        // Плавная прокрутка к карточке
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
};

// Zoom functions for image viewer
let currentZoom = 1;
let currentPanX = 0;
let currentPanY = 0;

window.zoomIn = function() {
    currentZoom = Math.min(currentZoom + 0.25, 4);
    applyZoom();
};

window.zoomOut = function() {
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    applyZoom();
};

window.resetZoom = function() {
    currentZoom = 1;
    currentPanX = 0;
    currentPanY = 0;
    applyZoom();
};

function applyZoom() {
    const img = document.getElementById('viewerImage');
    if (img) {
        img.style.transform = `translate(${currentPanX}px, ${currentPanY}px) scale(${currentZoom})`;
    }
}


// ============================================
// ИСПРАВЛЕНИЕ ДЛЯ ВКЛАДКИ ИСТОРИЯ
// ============================================

// Дополнительная инициализация для вкладки История
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Инициализация исправления для вкладки История ===');
    
    // Находим кнопку и панель истории
    const historyButton = document.querySelector('[data-tab="history"]');
    const historyPanel = document.querySelector('[data-panel="history"]');
    
    if (!historyButton) {
        console.error('❌ Кнопка истории не найдена!');
        return;
    }
    
    if (!historyPanel) {
        console.error('❌ Панель истории не найдена!');
        return;
    }
    
    console.log('✅ Кнопка истории найдена:', historyButton);
    console.log('✅ Панель истории найдена:', historyPanel);
    
    // Добавляем дополнительный обработчик клика
    historyButton.addEventListener('click', function(e) {
        console.log('🖱️ Клик по кнопке История (дополнительный обработчик)');
        
        // Убираем активный класс со всех вкладок
        const allPanels = document.querySelectorAll('.tabs__panel');
        const allButtons = document.querySelectorAll('.tabs__btn');
        
        allPanels.forEach(panel => {
            panel.classList.remove('tabs__panel--active');
        });
        
        allButtons.forEach(btn => {
            btn.classList.remove('tabs__btn--active');
        });
        
        // Активируем вкладку История
        historyPanel.classList.add('tabs__panel--active');
        historyButton.classList.add('tabs__btn--active');
        
        console.log('✅ Вкладка История активирована');
        console.log('Классы панели:', historyPanel.className);
        console.log('Display панели:', window.getComputedStyle(historyPanel).display);
    }, true); // Используем capturing phase
    
    console.log('✅ Исправление для вкладки История применено');
});
