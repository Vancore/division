window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});




const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}
function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}
if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (menuClose) menuClose.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});