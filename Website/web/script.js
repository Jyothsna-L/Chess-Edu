document.addEventListener("DOMContentLoaded", function() {
    
  // Function to toggle visibility of sections based on user interaction
  const toggleVisibility = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
          section.classList.toggle("hidden");
      }
  };

  // Event listener for clicking on the 'Learn More' links or buttons
  const learnMoreLinks = document.querySelectorAll('.resource-link');
  learnMoreLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default link action
          alert("You are being redirected to external resources.");
      });
  });

  // Example of adding event listeners to toggle visibility of sections when clicked
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
      aboutSection.addEventListener('click', () => toggleVisibility('about'));
  }

  // Add additional behavior to control any interactive components like a navigation bar
  const navbarToggle = document.querySelector('.navbar-toggle');
  if (navbarToggle) {
      navbarToggle.addEventListener('click', () => {
          const navbar = document.querySelector('.navbar');
          navbar.classList.toggle('active'); // Ensure the 'active' class controls the nav visibility
      });
  }

  // Handle smooth scrolling when clicking navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  // Add a small helper to handle the visibility toggling more dynamically
  // Consider adding a scroll offset for fixed header
  const headerHeight = document.querySelector('header').offsetHeight;
  if (headerHeight > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, // Adjust for header
                    behavior: 'smooth'
                });
            }
        });
    });
  }

});
