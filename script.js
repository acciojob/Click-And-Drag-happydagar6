// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let isDragging = false;
let currentCube = null;

// Variables to store the initial mouse position and cube position
let startX, startY, initialLeft, initialTop;

// Attach mousedown event to each individual cube
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentCube = cube;

    // Convert to absolute positioning on the first click so it can move freely.
    // We capture offsetLeft/Top first so it doesn't jump when position changes.
    if (window.getComputedStyle(cube).position !== 'absolute') {
      const offsetLeft = cube.offsetLeft;
      const offsetTop = cube.offsetTop;
      cube.style.position = 'absolute';
      cube.style.left = offsetLeft + 'px';
      cube.style.top = offsetTop + 'px';
    }

    // Bring the currently clicked cube to the front
    cubes.forEach(c => c.style.zIndex = '1');
    cube.style.zIndex = '100';

    // Record the starting coordinates of the mouse
    startX = e.clientX;
    startY = e.clientY;

    // Record the starting coordinates of the cube
    initialLeft = parseInt(cube.style.left, 10) || 0;
    initialTop = parseInt(cube.style.top, 10) || 0;

    // Update cursor for visual feedback
    cube.style.cursor = 'grabbing';
  });
});

// Attach mousemove to the document so dragging works even if the mouse moves fast
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentCube) return;
  
  // Prevent default text selection or weird browser drag behaviors
  e.preventDefault(); 

  // Calculate the distance the mouse has moved
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  // Calculate the new intended position of the cube
  let newLeft = initialLeft + dx;
  let newTop = initialTop + dy;

  // --- BOUNDARY CONSTRAINTS ---
  // Max allowed X and Y before the cube spills out of the container
  const maxX = container.clientWidth - currentCube.offsetWidth;
  const maxY = container.clientHeight - currentCube.offsetHeight;

  // Snap back logic: restrict the coordinates to within 0 and the max bounds
  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxX) newLeft = maxX;
  if (newTop < 0) newTop = 0;
  if (newTop > maxY) newTop = maxY;

  // Apply the bounded coordinates to the cube
  currentCube.style.left = `${newLeft}px`;
  currentCube.style.top = `${newTop}px`;
});

// Attach mouseup to the document to cleanly drop the cube
document.addEventListener('mouseup', () => {
  if (currentCube) {
    currentCube.style.cursor = 'pointer'; // Reset cursor
    isDragging = false;
    currentCube = null; // Clear the active cube
  }
});