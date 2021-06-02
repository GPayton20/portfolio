const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('menu-visible');
})

navMenu.addEventListener('click', () => {
  if (navMenu.classList.contains('menu-visible')) {
    navMenu.classList.remove('menu-visible');
  }
})