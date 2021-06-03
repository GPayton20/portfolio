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
}

app.init();
