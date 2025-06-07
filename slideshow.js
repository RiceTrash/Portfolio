/**
 * Project Slideshow
 * Automatically transitions between project images
 * Features:
 * - Shows one image at a time
 * - Automatic transitions with configurable timing
 * - Smooth animations between slides
 */

document.addEventListener('DOMContentLoaded', () => {
  setupSlideshows();
});

/**
 * Initialize all project slideshows in the document
 */
function setupSlideshows() {
  // Find all project slideshow containers
  const slideshows = document.querySelectorAll('.project-slideshow');
  
  slideshows.forEach(slideshow => {
    // Create a container for horizontal sliding
    const swipeContainer = document.createElement('div');
    swipeContainer.className = 'slideshow-swipe-container';
    
    // Get all images in this slideshow
    const images = Array.from(slideshow.querySelectorAll('img'));
    
    // Skip if no images found
    if (images.length === 0) return;
    
    // Preload images to avoid blurry rendering
    const preloadPromises = images.map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
        }
      });
    });
    
    // Move all images into the swipe container
    images.forEach(img => {
      // Apply additional attributes for better quality
      img.setAttribute('draggable', 'false');
      img.style.width = '100%';
      swipeContainer.appendChild(img);
    });
    
    // Add the swipe container to the slideshow
    slideshow.appendChild(swipeContainer);
    
    // Initialize state for this slideshow
    const totalSlides = images.length;
    let currentSlide = 0;
    let slideInterval = null;
    let isAnimating = false;
    
    // Pause on hover functionality (optional)
    slideshow.addEventListener('mouseenter', () => {
      stopSlideshow();
    });
    
    slideshow.addEventListener('mouseleave', () => {
      startSlideshow();
    });
    
    /**
     * Move to the next slide
     */
    function nextSlide() {
      if (isAnimating || totalSlides <= 1) return;
      
      isAnimating = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlidePosition();
      
      // Reset animating flag after transition completes
      setTimeout(() => {
        isAnimating = false;
      }, 500); // Match the CSS transition duration
    }
    
    /**
     * Update the position of the slides
     */
    function updateSlidePosition() {
      swipeContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    /**
     * Start the automatic slideshow
     */    function startSlideshow() {
      if (slideInterval || totalSlides <= 1) return;
      
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slides every 5 seconds
    }
    
    /**
     * Stop the automatic slideshow
     */
    function stopSlideshow() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }
    
    // Make sure images are loaded before initializing
    Promise.all(preloadPromises).then(() => {
      // Set initial position
      updateSlidePosition();
      
      // Start slideshow automatically
      startSlideshow();
    });
  });
}