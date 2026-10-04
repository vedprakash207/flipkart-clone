document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('productList');
  const productModal = document.getElementById('productModal');
  const closeProductModalBtn = document.getElementById('closeProductModal');
  const openAddProductModalBtn = document.getElementById('openAddProductModal');
  const productForm = document.getElementById('productForm');
  const refreshProductsBtn = document.getElementById('refreshProductsBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const exportButton = document.querySelector('.ghost-btn');

  const products = [
    {
      name: 'Noise Buds',
      category: 'Electronics',
      price: 2490,
      stock: 48,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Urban Sneakers',
      category: 'Fashion',
      price: 1990,
      stock: 31,
      image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Smart Speaker',
      category: 'Home',
      price: 3699,
      stock: 22,
      image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=500&q=80'
    }
  ];

  function renderProducts() {
    if (!productList) return;

    productList.innerHTML = products
      .map(
        (product) => `
          <div class="product-item">
            <div class="thumb" style="background-image:url('${product.image}')"></div>
            <div>
              <h4>${product.name}</h4>
              <p>${product.category} · ${product.stock} in stock</p>
            </div>
            <strong>₹${product.price.toLocaleString('en-IN')}</strong>
          </div>
        `
      )
      .join('');
  }

  function openProductModal() {
    if (!productModal) return;
    productModal.classList.remove('hidden');
    productModal.setAttribute('aria-hidden', 'false');
  }

  function closeProductModalHandler() {
    if (!productModal) return;
    productModal.classList.add('hidden');
    productModal.setAttribute('aria-hidden', 'true');
    if (productForm) {
      productForm.reset();
    }
  }

  if (openAddProductModalBtn) {
    openAddProductModalBtn.addEventListener('click', openProductModal);
  }

  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', closeProductModalHandler);
  }

  if (productModal) {
    productModal.addEventListener('click', (event) => {
      if (event.target === productModal) closeProductModalHandler();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && productModal && !productModal.classList.contains('hidden')) {
      closeProductModalHandler();
    }
  });

  if (productForm) {
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(productForm);
      const newProduct = {
        name: String(formData.get('name') || '').trim(),
        category: String(formData.get('category') || '').trim(),
        price: Number(formData.get('price') || 0),
        stock: Number(formData.get('stock') || 0),
        image: String(formData.get('image') || '').trim()
      };

      if (!newProduct.name || !newProduct.category || newProduct.price <= 0 || !newProduct.image) {
        alert('Please fill all product details correctly.');
        return;
      }

      products.unshift(newProduct);
      renderProducts();
      closeProductModalHandler();
    });
  }

  if (refreshProductsBtn) {
    refreshProductsBtn.addEventListener('click', () => {
      renderProducts();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      exportButton.textContent = 'Exported';
      setTimeout(() => {
        exportButton.textContent = 'Export Report';
      }, 1200);
    });
  }

  renderProducts();
});
