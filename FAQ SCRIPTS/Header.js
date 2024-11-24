// Header
const navbar = document.getElementsByClassName('navbar')[0];  
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('closeButton');
const sidebarLinks = document.querySelectorAll('#sidebar .sidebar-content a');

// Timeout variables
let hideTimeout;
let dropdownTimeout;


function isLargeScreen() {
  return window.innerWidth > 768;
}

// Header behaviors (show/hide)
function showHeader() {
  navbar.classList.remove('hide');
}

function hideHeader() {
  navbar.classList.add('hide');
}


function isAtTop() {
  return window.scrollY === 0;
}

function resetHideTimeout() {
  clearTimeout(hideTimeout);

  showHeader(); 

  if (isLargeScreen() && !isAtTop()) {
    hideTimeout = setTimeout(hideHeader, 2000); 
  }
}

resetHideTimeout();

// Event listeners for user activity
document.addEventListener('mousemove', resetHideTimeout); 
document.addEventListener('scroll', resetHideTimeout);  
window.addEventListener('resize', resetHideTimeout);   

// Sidebar behaviors
function openSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('active');
  }
}

function closeSidebar() {
  sidebar.classList.remove('active');
}

menuButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);

sidebarLinks.forEach(function(link) {
  link.addEventListener('click', closeSidebar);
});

document.addEventListener('click', function(event) {
  if (sidebar.classList.contains('active')) {
    if (!sidebar.contains(event.target) && event.target !== menuButton) {
      closeSidebar();
    }
  }
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});

// User-profile dropdown behavior
const profileButton = document.getElementById('profileButton');
const dropdownMenu = document.querySelector('.profile-dropdown .dropdown-menu');

function hideDropdown() {
  dropdownMenu.classList.remove('show');
}

profileButton.addEventListener('click', function(event) {
  event.preventDefault();
  dropdownMenu.classList.toggle('show');
});

window.addEventListener('scroll', function() {
  if (dropdownMenu.classList.contains('show')) {
    hideDropdown();
  }
});

document.addEventListener('click', function(event) {
  if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove('show');
  }
});

function hideDropdownOnNavbarHide() {
  if (navbar.classList.contains('hide') && dropdownMenu.classList.contains('show')) {
    dropdownMenu.classList.remove('show'); 
  }
}

navbar.addEventListener('transitionend', () => {
  hideDropdownOnNavbarHide();
});


function toggleNavbar() {
  navbar.classList.toggle('hide');
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 100 && isLargeScreen()) { 
    toggleNavbar(); 
  } else {
    navbar.classList.remove('hide'); 
  }
});

window.addEventListener('scroll', function() {
  if (navbar.classList.contains('hide') && dropdownMenu.classList.contains('show')) {
    hideDropdown();
  }
});