// DOM elements
const navigation = document.querySelector('.navigation');
const bannerBtn = document.querySelector('.btn');

// Smooth scrolling to sections when navigation links are clicked
navigation.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// Booking button click event
bannerBtn.addEventListener('click', function (event) {
  event.preventDefault();
  alert('Booking functionality is not implemented yet. This is just a demo.');
});