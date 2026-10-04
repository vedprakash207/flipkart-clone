document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const primaryBtn = document.querySelector('.primary-btn');
  if (primaryBtn) {
    primaryBtn.addEventListener('click', () => {
      alert('Add Product flow opened. Connect this to backend later.');
    });
  }

  const payButtons = document.querySelectorAll('.mini-btn, .ghost-btn');
  payButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent.includes('Export') ? 'Exported' : btn.textContent;
      setTimeout(() => {
        if (btn.textContent === 'Exported') btn.textContent = 'Export Report';
      }, 1200);
    });
  });
});
