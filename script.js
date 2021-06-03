const app = {};

app.menuButton = document.getElementById('menu-button');
app.navMenu = document.getElementById('navMenu');

app.init = () => {
  app.menuButton.addEventListener('click', () => {
    app.navMenu.classList.toggle('menu-visible');
  });
  
  app.navMenu.addEventListener('click', () => {
    if (app.navMenu.classList.contains('menu-visible')) {
      app.navMenu.classList.remove('menu-visible');
    }
  });

  app.buildIntersectionObserver();
}

app.buildIntersectionObserver = () => {
  // Observer coversv viewport
  app.options = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
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
      // todo delete console log
      console.log('Intersecting!');
      entry.target.classList.add('pop-in');
    }
  })
}

app.init();
