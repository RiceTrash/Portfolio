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

// Enhanced ripple effect CSS
const style = document.createElement("style")
style.textContent = `
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
`
document.head.appendChild(style)

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
