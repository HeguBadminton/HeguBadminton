// 簡單輪播功能
function initCarousel() {
    console.log('開始初始化輪播功能');
    
    // 獲取所有需要的元素
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.carousel-container');
    
    console.log('找到的元素:', {
        slides: slides.length,
        dots: dots.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });
    
    if (slides.length === 0) {
        console.log('沒有找到輪播頁面');
        return;
    }
    
    let currentSlide = 0;
    let autoPlayInterval = null;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    // 切換到指定頁面
    function showSlide(index) {
        console.log(`切換到第 ${index + 1} 張圖片`);
        
        // 隱藏所有頁面
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 移除所有圓點的活動狀態
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 顯示當前頁面
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // 設置圓點活動狀態
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // 下一張
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // 上一張
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // 綁定按鈕事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('點擊上一張按鈕');
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('點擊下一張按鈕');
            nextSlide();
        });
    }
    
    // 綁定圓點事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`點擊圓點 ${index}`);
            showSlide(index);
        });
    });
    
    // 自動播放
    function startAutoPlay() {
        console.log('開始自動播放');
        autoPlayInterval = setInterval(() => {
            console.log('自動播放：切換到下一張');
            nextSlide();
        }, 4000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('停止自動播放');
        }
    }
    
    // 滑鼠懸停暫停
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // 觸控事件處理
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // 滑鼠拖拽事件
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mousemove', handleMouseMove);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mouseleave', handleMouseUp);
    }
    
    // 觸控開始
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    }
    
    // 觸控移動
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        endX = e.touches[0].clientX;
    }
    
    // 觸控結束
    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - endX;
        const threshold = 50; // 滑動閾值
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // 向左滑動，下一張
                nextSlide();
            } else {
                // 向右滑動，上一張
                prevSlide();
            }
        }
        
        startAutoPlay();
    }
    
    // 滑鼠按下
    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        stopAutoPlay();
        carousel.style.cursor = 'grabbing';
    }
    
    // 滑鼠移動
    function handleMouseMove(e) {
        if (!isDragging) return;
        endX = e.clientX;
    }
    
    // 滑鼠釋放
    function handleMouseUp(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        
        const diffX = startX - endX;
        const threshold = 50; // 滑動閾值
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // 向左拖拽，下一張
                nextSlide();
            } else {
                // 向右拖拽，上一張
                prevSlide();
            }
        }
        
        startAutoPlay();
    }
    
    // 初始化顯示第一張
    showSlide(0);
    
    // 開始自動播放
    startAutoPlay();
    
    console.log('輪播功能初始化完成');
    
    // 額外調試信息
    setTimeout(() => {
        const activeSlide = document.querySelector('.carousel-slide.active');
        console.log('當前活動頁面:', activeSlide);
        if (activeSlide) {
            console.log('活動頁面樣式:', window.getComputedStyle(activeSlide));
            console.log('活動頁面顯示狀態:', window.getComputedStyle(activeSlide).display);
            console.log('活動頁面透明度:', window.getComputedStyle(activeSlide).opacity);
        }
    }, 1000);
}

// 圖片載入檢測
function checkImageLoad() {
    const images = [
        'images/297991755238519_.pic_hd.jpg',
        'images/297941755238308_.pic_hd.jpg', 
        'images/297951755238311_.pic_hd.jpg',
        'images/297961755238312_.pic_hd.jpg',
        'images/297971755238313_.pic_hd.jpg',
        'images/297981755238314_.pic_hd.jpg',
        'images/297931755238305_.pic_hd.jpg'
    ];
    
    images.forEach((src, index) => {
        const img = new Image();
        img.onload = function() {
            console.log(`圖片 ${src} 載入成功`);
        };
        img.onerror = function() {
            console.log(`圖片 ${src} 載入失敗，使用備用樣式`);
            // 當圖片載入失敗時，使用漸層背景
            const slide = document.querySelector(`.slide-${index + 1}`);
            if (slide) {
                slide.style.backgroundImage = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
                slide.style.backgroundSize = 'cover';
            }
        };
        img.src = src;
    });
}

// 初始化輪播
document.addEventListener('DOMContentLoaded', () => {
    // 檢查輪播元素是否存在
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    console.log('DOM載入完成，檢查輪播元素：');
    console.log('輪播容器:', carouselContainer);
    console.log('輪播頁面數量:', slides.length);
    console.log('圓點數量:', dots.length);
    
    if (carouselContainer) {
        console.log('輪播容器找到，初始化輪播功能');
        initCarousel();
        checkImageLoad();
    } else {
        console.log('輪播容器未找到');
    }
});

// 導航欄功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 點擊導航連結時關閉漢堡選單
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滾動
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

// 導航欄滾動效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 表單提交處理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 獲取表單數據
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // 簡單驗證
        if (!name || !email || !message) {
            showNotification('請填寫所有必填欄位', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('請輸入有效的Email地址', 'error');
            return;
        }
        
        // 模擬發送訊息
        showNotification('訊息已發送！我們會盡快回覆您。', 'success');
        this.reset();
    });
}

// Email驗證函數
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知系統
function showNotification(message, type = 'info') {
    // 移除現有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 創建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // 動畫顯示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 關閉按鈕功能
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 自動關閉
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}



// 滾動動畫
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 觀察需要動畫的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 載入動畫
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 返回頂部按鈕
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 滾動顯示/隱藏按鈕
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 點擊返回頂部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 懸停效果
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(44, 90, 160, 0.3)';
    });
}

// 初始化返回頂部按鈕
createBackToTopButton();

// 產品搜尋功能（未來擴展）
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜尋產品...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 10px 15px;
        border: 2px solid #e9ecef;
        border-radius: 25px;
        font-size: 0.9rem;
        width: 200px;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.width = '250px';
        searchInput.style.borderColor = '#2c5aa0';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.width = '200px';
        searchInput.style.borderColor = '#e9ecef';
    });
    
    document.body.appendChild(searchInput);
}

// 初始化搜尋功能
// initializeSearch(); // 可選功能

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('河谷羽球官網已載入完成！');
    
    // 添加載入動畫
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>載入中...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    
    // 載入完成後移除載入器
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

