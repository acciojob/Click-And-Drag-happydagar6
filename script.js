const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

// When the user clicks down on the container
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  // Triggers the CSS class the test runner is waiting for
  slider.classList.add('active'); 
  
  // Capture the starting position
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

// When the mouse leaves the container area
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// When the user releases the click
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// When the user moves the mouse while clicking
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; 
  
  e.preventDefault(); 
  
  // Calculate how far the mouse has moved
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; 
  
  // Apply the movement to the scrollbar
  slider.scrollLeft = scrollLeft - walk;
});