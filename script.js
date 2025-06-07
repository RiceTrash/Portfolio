// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Add staggered animation for grid items
      if (
        entry.target.parentElement.classList.contains("highlights-grid") ||
        entry.target.parentElement.classList.contains("projects-grid") ||
        entry.target.parentElement.classList.contains("skills-grid")
      ) {
        const siblings = Array.from(entry.target.parentElement.children)
        const index = siblings.indexOf(entry.target)
        entry.target.style.animationDelay = `${index * 0.1}s`
      }
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(".highlight-card, .project-card, .skill-category, .contact-card")
animateElements.forEach((el) => observer.observe(el))

// Add loading animation to page
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Enhanced hover effects for project cards
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Enhanced hover effects for skill categories
const skillCategories = document.querySelectorAll(".skill-category")
skillCategories.forEach((category) => {
  category.addEventListener("mouseenter", () => {
    category.style.transform = "translateY(-5px) scale(1.02)"
  })

  category.addEventListener("mouseleave", () => {
    category.style.transform = "translateY(0) scale(1)"
  })
})

// Add click effect for buttons with enhanced ripple
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    this.appendChild(ripple)

    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add enhanced ripple effect CSS
const styleElement = document.createElement("style")
styleElement.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(8);
            opacity: 0;
        }
    }
    
    /* Enhanced fade in animation */
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    /* Parallax effect for hero section */
    .hero-container {
        transform: translateY(0);
        transition: transform 0.1s ease-out;
    }
    
    /* Theme transition styles */
    body.theme-transition * {
        transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease !important;
    }
    
    .theme-toggle {
        overflow: hidden;
    }
`
document.head.appendChild(styleElement)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContainer = document.querySelector(".hero-container")
  if (heroContainer && scrolled < window.innerHeight) {
    heroContainer.style.transform = `translateY(${scrolled * 0.1}px)`
  }
})

// Add glow effect on hover for interactive elements
const interactiveElements = document.querySelectorAll(".highlight-card, .project-card, .skill-category, .btn")
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.filter = "brightness(1.1)"
  })

  element.addEventListener("mouseleave", () => {
    element.style.filter = "brightness(1)"
  })
})

// Typing effect for hero title (enhanced)
function typeWriter(element, text, speed = 80) {
  let i = 0
  element.innerHTML = ""
  element.style.borderRight = "2px solid #3b82f6"

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = "none"
      }, 1000)
    }
  }

  type()
}

// Uncomment to enable enhanced typing effect
// const heroTitle = document.querySelector('.hero-title');
// const originalText = heroTitle.textContent;
// setTimeout(() => {
//   typeWriter(heroTitle, originalText, 100);
// }, 500);

// Add smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll(".section-title")
const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
      }
    })
  },
  { threshold: 0.5 },
)

sectionTitles.forEach((title) => titleObserver.observe(title))

// Remove the existing theme switcher code to avoid conflicts with debug.js
// Theme functionality is now handled by debug.js

// --------- Navigation highlight on scroll ---------
// Utility function to limit how often a function runs during frequent events
function debounce(func, wait = 20, immediate = false) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Get all sections that should be tracked in navigation
const navSections = document.querySelectorAll('section[id]');

// Create a map of section IDs to their respective navigation links for quicker lookup
const sectionToNavMap = {};
navLinks.forEach(link => {
  const sectionId = link.getAttribute('href').substring(1); // Remove # from href
  if (sectionId) {
    sectionToNavMap[sectionId] = link;
  }
});

// Create Intersection Observer for navigation highlighting
const navObserver = new IntersectionObserver((entries, observer) => {
  // Update our internal state of which sections are currently visible
  entries.forEach(entry => {
    const targetSection = entry.target;
    // Mark the section with its visibility status
    if (entry.isIntersecting) {
      targetSection.dataset.visible = "true";
    } else {
      targetSection.dataset.visible = "false";
    }
  });

  // Get all sections that have links in the navigation
  const allNavSections = Array.from(
    document.querySelectorAll('section[id]')
  ).filter(section => 
    sectionToNavMap[section.id]
  );
  
  // Get all visible sections based on our dataset
  const visibleSections = allNavSections.filter(
    section => section.dataset.visible === "true"
  );

  // Only update navigation if we have visible sections
  if (visibleSections.length > 0) {
    // Calculate which section takes up most of the viewport
    const bestSection = visibleSections.reduce((best, current) => {
      const currentRect = current.getBoundingClientRect();
      const bestRect = best.getBoundingClientRect();
      
      // Calculate how much of each section is in the viewport
      const currentVisible = Math.min(currentRect.bottom, window.innerHeight) - 
                            Math.max(currentRect.top, 0);
      const bestVisible = Math.min(bestRect.bottom, window.innerHeight) - 
                         Math.max(bestRect.top, 0);
      
      // Adjust for section position - prefer sections closer to the top
      // This creates better UX as users typically read from top to bottom
      const viewportThird = window.innerHeight / 3;
      
      let currentScore = currentVisible;
      let bestScore = bestVisible;
      
      // Bonus for sections in the first third of the screen
      if (currentRect.top < viewportThird) {
        currentScore *= 1.5;
      }
      
      if (bestRect.top < viewportThird) {
        bestScore *= 1.5;
      }
      
      return currentScore > bestScore ? current : best;
    });
    
    const id = bestSection.id;
    
    // Only update the active link if needed
    const currentActive = document.querySelector('.nav-link.active');
    const newActive = sectionToNavMap[id];
    
    if (!currentActive || currentActive !== newActive) {
      // Remove active class from all navigation links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to the corresponding link
      if (newActive) {
        newActive.classList.add('active');
      }
    }
  }
}, {
  // Check more threshold points for better accuracy
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
  // Focus on the top 70% of the viewport for better user experience
  rootMargin: "-10% 0px -70% 0px"
});

// Observe all sections that have corresponding navigation links
navSections.forEach(section => {
  const sectionId = section.getAttribute('id');
  
  // Initialize dataset for tracking visibility
  section.dataset.visible = "false";
  
  // Only observe sections that have navigation links
  if (sectionToNavMap[sectionId]) {
    // Mark that this section is being observed
    section.dataset.observed = "true";
    navObserver.observe(section);
  }
});

// Handle hero section and top of page scrolling
function activateDefaultLink() {
  const scrollPosition = window.scrollY;
  
  // Only trigger when at the very top of page
  if (scrollPosition < 20) {
    // At the top of page, we want to highlight the first link in the nav
    // This is typically "Projects" based on your menu structure
    
    // Remove active class from all links first
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Activate the first link (Projects section)
    if (navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  }
  
  // At the bottom of page, ensure the last section is highlighted
  const bottomThreshold = document.body.scrollHeight - window.innerHeight - 20;
  if (scrollPosition > bottomThreshold) {
    // We're at the bottom of the page, highlight the last nav link (Contact)
    const lastNavLink = navLinks[navLinks.length - 1];
    
    // Only update if needed
    if (!lastNavLink.classList.contains('active')) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      lastNavLink.classList.add('active');
    }
  }
}

// Initialize navigation highlighting on page load
function initNavHighlighting() {
  // Set initial active link based on scroll position
  activateDefaultLink();
  
  // Add smooth scroll class to body for smoother animations
  document.body.classList.add('smooth-scroll');
  
  // Listen for scroll events to handle edge cases
  window.addEventListener('scroll', debounce(activateDefaultLink, 100));
}

// Initialize when page is loaded
window.addEventListener('load', initNavHighlighting);

// Debug utility function to help diagnose any issues with highlighting
function debugNavHighlight() {
  // Get the currently active link
  const activeLink = document.querySelector('.nav-link.active');
  console.log('🔍 Active nav link:', activeLink ? activeLink.textContent : 'None');
  
  // Check all sections and their positions relative to viewport
  const sections = Array.from(document.querySelectorAll('section[id]'));
  console.log('📊 Section positions:');
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const topPercent = Math.round((rect.top / window.innerHeight) * 100);
    const bottomPercent = Math.round((rect.bottom / window.innerHeight) * 100);
    const inMiddle = rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2;
    
    console.log(
      `${section.id}: ${inMiddle ? '✅' : '❌'} ` +
      `Top: ${topPercent}%, Bottom: ${bottomPercent}%, ` +
      `Height: ${Math.round(rect.height)}px`
    );
  });
  
  // Visual marker of where we are on the page
  console.log(`📍 Scroll position: ${window.scrollY}px`);
}

// Debug mode (enable as needed)
// window.addEventListener('scroll', debounce(debugNavHighlight, 150));
