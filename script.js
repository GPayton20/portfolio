const app = {};

// Query elements from DOM
app.menuButton = document.getElementById('menu-button');
app.navMenu = document.getElementById('navMenu');
// Query elements needed to trap focus inside menu when modal is open
app.firstElement = app.menuButton;
app.focusableElements = app.navMenu.querySelectorAll('[href]');
app.lastElement = app.focusableElements[app.focusableElements.length - 1];

app.init = () => {
  app.menuButton.addEventListener('click', () => {
    app.navMenu.classList.toggle('menu-visible');

    if (app.navMenu.classList.contains('menu-visible')) {
      document.addEventListener('keydown', app.trapFocus);
    } else {
      document.removeEventListener('keydown', app.trapFocus);
    }
  });
  
  app.navMenu.addEventListener('click', () => {
    if (app.navMenu.classList.contains('menu-visible')) {
      app.navMenu.classList.remove('menu-visible');
    }
  });

  app.buildIntersectionObserver();
}

// Function to trap focus inside hamburger menu so user cannot tab outside
app.trapFocus = event => {
  const tabPressed = event.key === 'Tab' || event.keyCode === 9;

  // If tab key is not pressed, do nothing
  if (!tabPressed) {
    return;
  }
  // Check if shift key is pressed along with tab
  if (event.shiftKey) {
    // If focus is currently on the first focusable element (menu button), move focus to last focusable element (last link in menu)
    if (document.activeElement === app.firstElement) {
      app.lastElement.focus();
      event.preventDefault();
    }
  } else {
    // If focus is currently on last element and shift is not pressed, move focus back to first focusable element
    if (document.activeElement === app.lastElement) {
      app.firstElement.focus();
      event.preventDefault();
    }
  }
}

// Method to allow skill icons to 'pop' in on scroll
app.buildIntersectionObserver = () => {
  // Observer covers viewport, waits until target has passed 70px from bottom on scroll
  app.options = {
    root: null,
    rootMargin: '0px 0px -70px 0px',
    threshold: 1
  }

  app.observer = new IntersectionObserver(app.popIn, app.options);

  app.skillsIcons = document.querySelectorAll('.section-skills .skills-list li');

  app.skillsIcons.forEach(icon => {
    app.observer.observe(icon);
  })
}

app.popIn = entries => {
  entries.forEach(entry => {
    // Let skills icons "pop" into view as they pass observer threshold
    if (entry.isIntersecting) {
      entry.target.classList.add('pop-in');
      // Stop observing once icon is visible
      app.observer.unobserve(entry.target);
    }
  })
}

app.init();
