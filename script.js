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

// 購物車功能
let cart = [];

// 好評數據庫
const userNames = [
    '王小明', '李小華', '張志強', '陳美玲', '林建國', '黃淑芬', '吳志明', '鄭雅婷',
    '蔡文彬', '許家豪', '周淑惠', '謝志偉', '楊雅雯', '劉建民', '曾美玲', '彭志豪',
    '蘇雅婷', '何建國', '羅淑芬', '葉志明', '江雅雯', '馬志豪', '高美玲', '徐建國',
    '梁雅婷', '宋志明', '方淑惠', '鄧建民', '唐雅雯', '范志豪', '石美玲', '薛建國',
    '呂雅婷', '柯志明', '孫淑惠', '莊建民', '田雅雯', '洪志豪', '白美玲', '盧建國',
    '廖雅婷', '鍾志明', '游淑惠', '簡建民', '胡雅雯', '魏志豪', '潘美玲', '邱建國',
    '郭雅婷', '趙志明', '錢淑惠', '沈建民', '韓雅雯', '馮志豪', '朱美玲', '秦建國',
    '尤雅婷', '許志明', '何淑惠', '施建民', '張雅雯', '孔志豪', '曹美玲', '嚴建國',
    '華雅婷', '金志明', '魏淑惠', '陶建民', '姜雅雯', '戚志豪', '謝美玲', '鄒建國',
    '喻雅婷', '柏志明', '水淑惠', '竇建民', '章雅雯', '雲志豪', '蘇美玲', '潘建國',
    '葛雅婷', '奚志明', '范淑惠', '彭建民', '郎雅雯', '魯志豪', '韋美玲', '昌建國',
    '馬雅婷', '苗志明', '鳳淑惠', '花建民', '方雅雯', '俞志豪', '任美玲', '袁建國',
    '柳雅婷', '鮑志明', '史淑惠', '唐建民', '費雅雯', '廉志豪', '岑美玲', '薛建國',
    '雷雅婷', '賀志明', '倪淑惠', '湯建民', '滕雅雯', '殷志豪', '羅美玲', '畢建國',
    '郝雅婷', '鄔志明', '安淑惠', '常建民', '樂雅雯', '于志豪', '時美玲', '傅建國',
    '皮雅婷', '卞志明', '齊淑惠', '康建民', '伍雅雯', '余志豪', '元美玲', '卜建國',
    '顧雅婷', '孟志明', '平淑惠', '黃建民', '和雅雯', '穆志豪', '蕭美玲', '尹建國'
];

const userAvatars = [
    '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️',
    '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨',
    '👨‍🚀', '👩‍🚀', '👨‍✈️', '👩‍✈️', '👨‍🚒', '👩‍🚒', '👨‍🌾', '👩‍🌾',
    '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫',
    '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻',
    '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '👨‍✈️', '👩‍✈️', '👨‍🚒', '👩‍🚒',
    '👨‍🌾', '👩‍🌾', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓',
    '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧',
    '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '👨‍✈️', '👩‍✈️',
    '👨‍🚒', '👩‍🚒', '👨‍🌾', '👩‍🌾', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼',
    '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳',
    '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀',
    '👨‍✈️', '👩‍✈️', '👨‍🚒', '👩‍🚒', '👨‍🌾', '👩‍🌾', '👨‍🏭', '👩‍🏭',
    '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️',
    '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨'
];

const reviewTemplates = {
    'archery-11-pro': [
        '弓箭11 Pro真的超棒！殺球威力驚人，控制也很精準。',
        '這支球拍讓我從業餘晉升到半專業水平，手感絕佳！',
        '專業選手推薦的球拍就是不一樣，攻擊力爆表！',
        '輕量化設計讓我在場上更靈活，殺球速度明顯提升。',
        '碳纖維材質質感很好，擊球聲音清脆悅耳。',
        '攻守兼備的完美設計，是我打過最棒的球拍！',
        '從新手到現在，這支球拍陪伴我成長，值得推薦！',
        '手感舒適，擊球穩定，專業級的品質無話可說。',
        '殺球威力驚人，對手都說我的球速變快了！',
        '性價比超高，這價位能買到這種品質真的很棒！'
    ],
    'archery': [
        '弓箭系列經典之作，平衡感極佳，適合各種打法。',
        '新手入門首選，容易上手，擊球手感很好。',
        '經典設計歷久不衰，品質穩定可靠。',
        '平衡型球拍的典範，攻守都表現出色。',
        '高彈性碳纖維讓擊球更有力，手感絕佳。',
        '適合各種技術水平的選手，實用性很高。',
        '經典款就是經典款，永遠不會過時！',
        '擊球手感柔軟舒適，長時間使用也不累。',
        '價格合理，品質優秀，性價比很高。',
        '從業餘到專業都能駕馭，萬能型球拍！'
    ],
    '100zz': [
        '100ZZ世界冠軍同款！殺球威力真的超強！',
        '重頭設計讓殺球更有力，攻擊力爆表！',
        '頂級碳纖維材質，耐用性超強，值得投資！',
        '追求極致進攻的選手必備，殺球速度驚人！',
        '這支球拍讓我成為場上的攻擊手！',
        '世界冠軍都在用，品質絕對有保證！',
        '殺球威力強大，讓對手毫無反應時間。',
        '重頭設計剛開始需要適應，但威力驚人！',
        '專業級球拍的頂峰之作，攻擊力無與倫比！',
        '這支球拍讓我的殺球技術大幅提升！'
    ],
    '1000z': [
        '1000Z輕量化設計太棒了！反應速度超快！',
        '新一代科技讓球拍更輕更強，速度型選手首選！',
        '輕量化但威力不減，高科技的完美體現！',
        '超快反應速度讓我在場上如虎添翼！',
        '速度型選手的完美搭檔，輕快有力！',
        '革命性設計，重量輕但攻擊力驚人！',
        '高科技碳纖維複合材料，品質一流！',
        '輕量化設計讓揮拍更流暢，速度更快！',
        '新一代球拍的傑出代表，科技感十足！',
        '這支球拍讓我的球速提升了一個檔次！'
    ],
    '99-pro': [
        '99 Pro重砲手的最愛！殺球威力驚人！',
        '專業級進攻型球拍，攻擊力超強！',
        '重砲手的完美武器，殺球威力爆表！',
        '進攻性能完美平衡，控制性也很好！',
        '高品質碳纖維，經久耐用，值得信賴！',
        '征戰賽場的可靠夥伴，品質穩定！',
        '重砲手的終極選擇，攻擊力無與倫比！',
        '專業級品質，進攻威力驚人！',
        '這支球拍讓我成為場上的重砲手！',
        '99 Pro系列的代表作，攻擊力超強！'
    ],
    'wind-blade': [
        '風刃系列攻擊利器！殺球速度快如閃電！',
        '如風般銳利的進攻，讓對手措手不及！',
        '攻擊型球拍的代表作，進攻威力驚人！',
        '殺球速度快如閃電，攻擊利器！',
        '獨特框型設計減少阻力，速度更快！',
        '專為強力進攻設計，攻擊力爆表！',
        '風刃系列讓我的進攻更有威脅性！',
        '攻擊型選手的完美選擇，威力驚人！',
        '殺球速度快如閃電，讓對手毫無招架之力！',
        '風刃設計讓進攻更犀利，攻擊力超強！'
    ],
    '77-pro': [
        '77 Pro全能型球拍，攻守自如！',
        '一拍在手，攻守兼備，靈活多變！',
        '全能型設計適合各種打法風格！',
        '進攻型還是防守型都能完美駕馭！',
        '靈活多變的設計讓我在場上無所不能！',
        '全能型球拍的傑出代表，實用性很高！',
        '攻守兼備的完美設計，適應性強！',
        '這支球拍讓我成為場上的全能選手！',
        '77 Pro系列的全能型球拍，表現出色！',
        '攻守自如的設計讓比賽更有優勢！'
    ],
    'vtzf2': [
        'VTZF2經典進攻型球拍，傳奇重頭設計！',
        '殺球威力強大無比，讓對手聞風喪膽！',
        '經典框型歷久不衰，傳統進攻打法首選！',
        '重頭設計讓殺球更有力，攻擊威力驚人！',
        '經典進攻型球拍的典範之作！',
        '傳統進攻打法的完美選擇，威力強大！',
        'VTZF2系列的代表作，進攻威力驚人！',
        '經典設計永遠不會過時，品質可靠！',
        '重頭設計讓殺球威力倍增，攻擊力超強！',
        '這支球拍讓我的進攻技術更上一層樓！'
    ],
    '800-pro': [
        '800 Pro性價比之王！強力進攻性能！',
        '專業級攻擊型球拍，價格親民！',
        '殺球威力十足，性價比超高！',
        '高品質碳纖維材質，耐用性超強！',
        '提升技術的絕佳選擇，性價比之王！',
        '專業級品質，平民價格，超值選擇！',
        '800 Pro系列讓進攻更強力，價格實惠！',
        '性價比之王，攻擊威力驚人！',
        '這支球拍讓我在預算內獲得專業級品質！',
        '攻擊型球拍的性價比典範，值得推薦！'
    ],
    '99': [
        '99系列重砲手的終極武器！',
        '經典進攻型球拍，殺球威力驚人！',
        '重砲手的完美選擇，攻擊力爆表！',
        '專為強力進攻設計，威力驚人！',
        '經典框型設計歷經考驗，品質可靠！',
        '征戰賽場的可靠夥伴，進攻威力超強！',
        '99系列讓重砲手的進攻更有威脅性！',
        '經典進攻型球拍的傑出代表！',
        '這支球拍讓我的殺球技術大幅提升！',
        '重砲手的終極武器，攻擊力無與倫比！'
    ]
};

// 生成隨機好評
function generateRandomReviews(productId, count = 150) {
    const reviews = [];
    const templates = reviewTemplates[productId] || reviewTemplates['archery-11-pro'];
    
    for (let i = 0; i < count; i++) {
        const userName = userNames[Math.floor(Math.random() * userNames.length)];
        const userAvatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // 添加一些變化
        const variations = [
            '', '真的很推薦！', '品質超棒！', '值得購買！', '非常滿意！', 
            '手感很好！', '攻擊力驚人！', '性價比很高！', '專業級品質！', '值得信賴！'
        ];
        
        const variation = variations[Math.floor(Math.random() * variations.length)];
        const reviewText = template + variation;
        
        // 隨機評分 (4-5星)
        const rating = Math.random() > 0.1 ? 5 : 4;
        
        reviews.push({
            userName,
            userAvatar,
            reviewText,
            rating,
            date: generateRandomDate()
        });
    }
    
    return reviews;
}

// 生成隨機日期 (最近6個月內)
function generateRandomDate() {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
    const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
    return new Date(randomTime);
}

// 產品好評數據
const productReviews = {
    'archery-11-pro': generateRandomReviews('archery-11-pro', 180),
    'archery': generateRandomReviews('archery', 165),
    '100zz': generateRandomReviews('100zz', 195),
    '1000z': generateRandomReviews('1000z', 175),
    '99-pro': generateRandomReviews('99-pro', 170),
    'wind-blade': generateRandomReviews('wind-blade', 160),
    '77-pro': generateRandomReviews('77-pro', 155),
    'vtzf2': generateRandomReviews('vtzf2', 185),
    '800-pro': generateRandomReviews('800-pro', 145),
    '99': generateRandomReviews('99', 165)
};

// 加入購物車
function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${productName} 已加入購物車！`, 'success');
}

// 更新購物車數量
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// 更新購物車UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>購物車是空的</p>
                <p>快來選擇您喜歡的球拍吧！</p>
            </div>
        `;
        if (totalPrice) totalPrice.textContent = 'NT$ 0';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas fa-table-tennis"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">NT$ ${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (totalPrice) totalPrice.textContent = `NT$ ${total.toLocaleString()}`;
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    
    updateCartCount();
}

// 更新商品數量
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
}

// 從購物車移除商品
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('商品已從購物車移除', 'info');
}

// 切換購物車顯示
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        const isOpen = cartSidebar.classList.contains('open');
        
        if (isOpen) {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('show');
            document.body.style.overflow = '';
        } else {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
}

// 結帳功能
function checkout() {
    if (cart.length === 0) {
        showNotification('購物車是空的', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemList = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    
    // 這裡可以整合實際的支付系統
    const message = `感謝您的購買！\n\n商品清單：\n${itemList}\n\n總計：NT$ ${total.toLocaleString()}\n\n請聯繫我們完成付款：\nLine: spring.moonbeam\nFacebook: 河谷羽球`;
    
    // 複製到剪貼板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            showNotification('訂單資訊已複製到剪貼板！請聯繫我們完成付款。', 'success');
            // 跳轉到facebook並發送剪貼板上的訊息
            window.open('https://www.facebook.com/messages/t/332812596593087', '_blank');
            
        });
    } else {
        showNotification(`總計：NT$ ${total.toLocaleString()}，請聯繫我們完成付款！`, 'success');
    }
    
    // 清空購物車
    cart = [];
    updateCartUI();
    toggleCart();
}

// 初始化好評顯示
function initializeReviews() {
    Object.keys(productReviews).forEach(productId => {
        displayProductReviews(productId);
    });
}

// 顯示產品好評
function displayProductReviews(productId) {
    const reviewsContainer = document.getElementById(`reviews-${productId}`);
    if (!reviewsContainer) return;
    
    const reviews = productReviews[productId];
    if (!reviews || reviews.length === 0) return;
    
    // 顯示前3個好評
    const displayReviews = reviews.slice(0, 3);
    
    let reviewsHTML = `
        <div class="reviews-summary">
            <span class="reviews-count">${reviews.length} 個好評</span>
            <span class="reviews-rating">★★★★★ (${calculateAverageRating(reviews).toFixed(1)})</span>
        </div>
        <div class="reviews-list">
    `;
    
    displayReviews.forEach(review => {
        reviewsHTML += `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-user">
                        <span class="user-avatar">${review.userAvatar}</span>
                        <span class="user-name">${review.userName}</span>
                    </div>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <div class="review-text">${review.reviewText}</div>
                <div class="review-date">${formatDate(review.date)}</div>
            </div>
        `;
    });
    
    reviewsHTML += `
        </div>
        <button class="view-all-reviews-btn" onclick="showAllReviews('${productId}')">
            查看全部 ${reviews.length} 個好評
        </button>
    `;
    
    reviewsContainer.innerHTML = reviewsHTML;
}

// 計算平均評分
function calculateAverageRating(reviews) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}

// 生成星級顯示
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// 格式化日期
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return '昨天';
    } else if (diffDays < 7) {
        return `${diffDays}天前`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks}週前`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months}個月前`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years}年前`;
    }
}

// 顯示所有好評
function showAllReviews(productId) {
    const reviews = productReviews[productId];
    if (!reviews || reviews.length === 0) return;
    
    // 創建好評彈窗
    const modal = document.createElement('div');
    modal.className = 'reviews-modal';
    modal.innerHTML = `
        <div class="reviews-modal-content">
            <div class="reviews-modal-header">
                <h3>${getProductName(productId)} - 全部好評</h3>
                <button class="close-modal" onclick="closeReviewsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="reviews-modal-body">
                <div class="reviews-stats">
                    <div class="stats-item">
                        <span class="stats-number">${reviews.length}</span>
                        <span class="stats-label">總評價</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-number">${calculateAverageRating(reviews).toFixed(1)}</span>
                        <span class="stats-label">平均評分</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-number">${Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100)}%</span>
                        <span class="stats-label">五星好評率</span>
                    </div>
                </div>
                <div class="all-reviews-list">
                    ${reviews.map(review => `
                        <div class="review-item-full">
                            <div class="review-header">
                                <div class="review-user">
                                    <span class="user-avatar">${review.userAvatar}</span>
                                    <span class="user-name">${review.userName}</span>
                                </div>
                                <div class="review-rating">
                                    ${generateStars(review.rating)}
                                </div>
                                <div class="review-date">${formatDate(review.date)}</div>
                            </div>
                            <div class="review-text">${review.reviewText}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加動畫效果
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 獲取產品名稱
function getProductName(productId) {
    const productNames = {
        'archery-11-pro': '弓箭11 Pro 框型',
        'archery': '弓箭框型',
        '100zz': '100ZZ 框型',
        '1000z': '1000Z 框型',
        '99-pro': '99 Pro 框型',
        'wind-blade': '風刃框型',
        '77-pro': '77 Pro 框型',
        'vtzf2': 'VTZF2 框型',
        '800-pro': '800 Pro 框型',
        '99': '99 框型'
    };
    return productNames[productId] || '產品';
}

// 關閉好評彈窗
function closeReviewsModal() {
    const modal = document.querySelector('.reviews-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

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
    
    // 初始化購物車UI
    updateCartUI();
    
    // 初始化好評顯示
    initializeReviews();
});

