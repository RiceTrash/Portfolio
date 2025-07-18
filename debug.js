// Simple theme toggle implementation
document.addEventListener('DOMContentLoaded', function() {
  console.log('Debug script loaded - with soft black theme');
  
  // Find the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
  }
  
  console.log('Theme toggle button found');
  
  // Simplified theme toggle function
  function simpleToggleTheme() {
    console.log('Theme toggle clicked');
    
    // Check the current theme
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    console.log('Current theme:', currentTheme);
    
    // Switch theme
    if (currentTheme === 'light') {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      console.log('Switched to soft black dark theme');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      console.log('Switched to light theme with 60-30-10 color rule');
    }
    
    // Force a reflow for immediate CSS variable updates
    void document.documentElement.offsetHeight;
  }
  
  // Set initial theme
  function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Clear any existing theme first
    document.documentElement.removeAttribute('data-theme');
    
    // Then set the appropriate theme
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      console.log('Set light theme (60-30-10 color rule)');
    } else if (savedTheme === 'dark' || prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      console.log('Set soft black dark theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      console.log('Default to light theme (60-30-10 color rule)');
    }
  }
  
  // Initialize theme
  setInitialTheme();
  
  // Add direct click event - bypass any other event handlers
  themeToggle.onclick = simpleToggleTheme;
  
  // Log CSS variables to ensure they're being applied
  const computedStyle = getComputedStyle(document.documentElement);
  console.log('--bg-primary:', computedStyle.getPropertyValue('--bg-primary').trim());
  console.log('--text-primary:', computedStyle.getPropertyValue('--text-primary').trim());
});
