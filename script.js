const cartCount = document.getElementById('cartCount');
const modal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const selectedMethod = document.getElementById('selectedMethod');
const paymentOptions = document.querySelectorAll('.payment-option');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let count = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    count += 1;
    cartCount.textContent = String(count);
    button.textContent = 'Added';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.disabled = false;
    }, 1000);
  });
});

paymentOptions.forEach((option) => {
  option.addEventListener('click', () => {
    paymentOptions.forEach((item) => item.classList.remove('active'));
    option.classList.add('active');
    selectedMethod.textContent = option.dataset.method;
  });
});

function openCheckout() {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeCheckout() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

checkoutBtn.addEventListener('click', openCheckout);
closeModal.addEventListener('click', closeCheckout);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeCheckout();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeCheckout();
  }
});
