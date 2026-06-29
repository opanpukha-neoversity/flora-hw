import { apiClient } from './apiClient.js';

const detailModal = document.getElementById('detail-modal');
const orderModal = document.getElementById('order-modal');
const subscribeForm = document.querySelector('.js-subscribe-form');

let selectedProduct = {
  bouquetTitle: '',
  bouquetPrice: null,
  quantity: 1,
};

function parsePrice(value) {
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function isModalOpen(modal) {
  return modal?.classList.contains('is-open');
}

function updateBodyLock() {
  document.body.classList.toggle('modal-open', isModalOpen(detailModal) || isModalOpen(orderModal));
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('is-open');
  updateBodyLock();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
  updateBodyLock();
}

function closeAllModals() {
  closeModal(detailModal);
  closeModal(orderModal);
}

function openDetailModalFromCard(card) {
  if (!detailModal || !card) return;

  const img = card.querySelector('img');
  const title = card.querySelector('.bestsellers-item-title, .catalogue-item-title')?.textContent.trim() || 'Beautiful bouquet';
  const price = card.querySelector('.bestsellers-item-price, .catalogue-item-price')?.textContent.trim() || '$0';
  const description = card.querySelector('.bestsellers-item-text, .catalogue-item-text')?.textContent.trim() || 'Fresh seasonal bouquet.';

  detailModal.querySelector('.modal-title').textContent = title;
  detailModal.querySelector('.modal-price').textContent = price;
  detailModal.querySelector('.modal-description').textContent = description;

  selectedProduct = {
    bouquetTitle: title,
    bouquetPrice: parsePrice(price),
    quantity: 1,
  };

  const modalImg = detailModal.querySelector('.modal-product-img');
  if (img && modalImg) {
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || title;
  }

  const quantityInput = detailModal.querySelector('.modal-quantity-input');
  if (quantityInput) quantityInput.value = 1;

  openModal(detailModal);
}

document.addEventListener('click', event => {
  const closeBtn = event.target.closest('[data-modal-close]');
  if (closeBtn) {
    closeModal(closeBtn.closest('.modal-background'));
    return;
  }

  if (event.target.classList.contains('modal-background')) {
    closeModal(event.target);
    return;
  }

  const buyBtn = event.target.closest('.modal-buy-btn');
  if (buyBtn) {
    const quantityInput = detailModal?.querySelector('.modal-quantity-input');
    selectedProduct.quantity = Math.max(Number(quantityInput?.value) || 1, 1);

    closeModal(detailModal);
    openModal(orderModal);
    return;
  }

  const card = event.target.closest('.bestsellers-item, .catalogue-item');
  if (card) {
    openDetailModalFromCard(card);
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});

const orderForm = orderModal?.querySelector('.order-form');
if (orderForm) {
  orderForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const payload = {
      customerName: formData.get('customer_name'),
      customerPhone: formData.get('customer_phone'),
      customerEmail: formData.get('customer_email'),
      customerMessage: formData.get('customer_message') || '',
      bouquetTitle: selectedProduct.bouquetTitle,
      bouquetPrice: selectedProduct.bouquetPrice,
      quantity: selectedProduct.quantity,
    };

    try {
      await apiClient.post('/orders', payload);
      alert(`Thank you for your order, ${payload.customerName || 'friend'}! Our manager will contact you shortly.`);
      orderForm.reset();
      closeAllModals();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create order. Please try again.';
      alert(message);
    }
  });
}

if (subscribeForm) {
  subscribeForm.addEventListener('submit', event => {
    event.preventDefault();
    alert('Thank you for subscribing!');
    subscribeForm.reset();
  });
}
