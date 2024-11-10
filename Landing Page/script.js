function toggleMenu() {
    const menu = document.getElementById('hamburger');
    const navLinks = document.querySelector('nav');
    
    // Toggle the 'active' class on both the hamburger icon and nav links
    menu.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
  