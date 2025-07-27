// Плавная прокрутка для ссылок навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Мобильное меню
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
}

// Анимации при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Наблюдение за секциями
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Фильтрация галереи
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Обновление активной кнопки
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Фильтрация элементов
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получение данных формы
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message')
    };
    
    // Валидация
    if (!data.name || !data.phone || !data.service) {
      showNotification('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }
    
    // Имитация отправки формы
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Отправляется...';
    submitButton.disabled = true;
    
    // Симуляция задержки отправки
    setTimeout(() => {
      showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
  // Создание элемента уведомления
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Добавление стилей для уведомления
  const style = document.createElement('style');
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification-success {
        background: #4caf50;
        color: white;
      }
      
      .notification-error {
        background: #f44336;
        color: white;
      }
      
      .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .notification-close:hover {
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Добавление уведомления на страницу
  document.body.appendChild(notification);
  
  // Показ уведомления с анимацией
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Обработка закрытия
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    hideNotification(notification);
  });
  
  // Автоматическое скрытие через 5 секунд
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// Анимация счетчиков в секции "О нас"
function animateCounters() {
  const stats = document.querySelectorAll('.stat h3');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const isPercentage = stat.textContent.includes('%');
    const isPlus = stat.textContent.includes('+');
    const duration = 2000; // 2 секунды
    const increment = target / (duration / 16); // 60 FPS
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current);
      if (isPercentage) {
        displayValue += '%';
      } else if (isPlus) {
        displayValue += '+';
      }
      
      stat.textContent = displayValue;
    }, 16);
  });
}

// Запуск анимации счетчиков при появлении секции "О нас"
const aboutSection = document.querySelector('#about');
if (aboutSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  aboutObserver.observe(aboutSection);
}

// Добавление стилей для мобильного меню
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 100%;
      left: 0;
      width: 100%;
      background: var(--dark-blue);
      flex-direction: column;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      transition: transform 0.3s ease;
      z-index: 999;
    }
    
    .nav-links.active {
      transform: translateY(0);
    }
    
    .nav-links li {
      margin: 10px 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;
document.head.appendChild(mobileMenuStyles);

// Ленивая загрузка изображений (для будущих реальных изображений)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// Обработка изменения размера окна
window.addEventListener('resize', () => {
  // Закрытие мобильного меню при увеличении экрана
  if (window.innerWidth > 768) {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});

console.log('🔌 Luxelectro website loaded successfully!');