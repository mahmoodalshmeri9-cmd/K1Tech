/**
 * K1 Tech - Main Client Application Script
 * Implements interactive routing, cart operations, checkout modal steps, 
 * PC diagnostics assistant, Steam games search/filter, and WhatsApp confirmation generators.
 */

// --- DATA DEFINITIONS ---

const WHATSAPP_NUMBER = '966504954741'; // غير الرقم هنا إلى رقمك الحقيقي (بدون + أو أصفار في البداية، مثال: 9665XXXXXXXX)

const TWEAKS_DATA = [
    {
        id: 'tweak-elite',
        name: 'باقة التعديل الاحترافية الشاملة | K1 Tweak Setup',
        desc: 'الباقة الشاملة والوحيدة لزيادة الفريمات (FPS Boost)، وتخفيض اللاق (Input Lag)، وتنظيف واستقرار نظام التشغيل بالكامل لتجربة ألعاب خارقة.',
        price: 39,
        badge: 'الأكثر مبيعاً 🔥',
        icon: 'fa-bolt',
        specs: [
            'تنظيف كلي لملفات النظام وإزالة المخلفات المؤقتة',
            'إيقاف جميع الخدمات والعمليات الخلفية غير الضرورية',
            'تخفيض زمن استجابة الماوس والكيبورد (Input Lag)',
            'تخفيض الـ Ping وتحسين كارت الشبكة للألعاب الأونلاين',
            'ضبط لوحة تحكم NVIDIA / AMD للأداء والسرعة القصوى',
            'دعم فني وتفعيل سريع وآمن 100% ضد الباند'
        ]
    }
];

const IPTV_DATA = [
    {
        id: 'iptv-3m',
        name: 'اشتراك IPTV البرونزي (3 أشهر)',
        price: 49,
        icon: 'fa-tv',
        badge: 'تجربة قصيرة',
        features: [
            'أكثر من 12,000 قناة بجودة HD / FHD',
            'مكتبة ضخمة من الأفلام والمسلسلات العربية والأجنبية',
            'تحديثات يومية مجانية للمحتوى',
            'يدعم التشغيل على جهاز واحد في نفس الوقت',
            'يعمل على الشاشات الذكية، الأندرويد، والآيفون',
            'ثبات عالي أثناء المباريات الهامة'
        ]
    },
    {
        id: 'iptv-6m',
        name: 'اشتراك IPTV الفضي (6 أشهر)',
        price: 89,
        icon: 'fa-star',
        badge: 'العرض المتوازن',
        features: [
            'أكثر من 12,000 قناة بدقة تصل إلى 4K UHD',
            'مكتبة أفلام ومسلسلات ضخمة (نتفليكس، شاهد، OSN)',
            'يدعم التشغيل على جهازين في نفس الوقت',
            'سيرفرات احتياطية فائقة السرعة لمنع التقطيع وقت المباريات',
            'تفعيل سريع ودعم فني متاح خلال اليوم',
            'ضمان كامل طوال مدة الاشتراك'
        ]
    },
    {
        id: 'iptv-12m',
        name: 'اشتراك IPTV الذهبي VIP (12 شهراً)',
        price: 129,
        icon: 'fa-crown',
        badge: 'VIP الأكثر طلباً 👑',
        popular: true,
        features: [
            'أكثر من 12,000 قناة بجودة 4K حقيقية بدون أي ضغط',
            'الوصول الحصري لأقوى سيرفرات البث الرياضي التابعة لـ K1 Tech',
            'مكتبة أفلام ومسلسلات عملاقة متحدثة فورياً (جميع المنصات)',
            'يدعم التشغيل على 3 أجهزة بنفس الوقت',
            'دعم فني VIP فوري عبر الواتساب والديسكورد على مدار الساعة',
            'توفير تطبيق تشغيل مجاني خاص بمتجرنا'
        ]
    }
];

const STEAM_GAMES_DATA = [
    {
        id: 'game-witcher3',
        name: 'The Witcher 3: Wild Hunt',
        genre: 'rpg',
        origPrice: 150,
        price: 49,
        rating: 4.9,
        icon: 'fa-dragon'
    },
    {
        id: 'game-gow',
        name: 'God of War',
        genre: 'action',
        origPrice: 200,
        price: 89,
        rating: 4.9,
        icon: 'fa-gavel'
    },
    {
        id: 'game-rdr2',
        name: 'Red Dead Redemption 2',
        genre: 'action',
        origPrice: 220,
        price: 89,
        rating: 4.9,
        icon: 'fa-horse'
    },
    {
        id: 'game-spider',
        name: "Marvel's Spider-Man Remastered",
        genre: 'action',
        origPrice: 240,
        price: 119,
        rating: 4.8,
        icon: 'fa-spider'
    },
    {
        id: 'game-re4',
        name: 'Resident Evil 4 Remake',
        genre: 'action',
        origPrice: 250,
        price: 149,
        rating: 4.9,
        icon: 'fa-biohazard'
    },
    {
        id: 'game-tlou',
        name: 'The Last of Us Part I',
        genre: 'action',
        origPrice: 250,
        price: 149,
        rating: 4.8,
        icon: 'fa-person-walking'
    },
    {
        id: 'game-hogwarts',
        name: 'Hogwarts Legacy',
        genre: 'rpg',
        origPrice: 250,
        price: 139,
        rating: 4.7,
        icon: 'fa-hat-wizard'
    },
    {
        id: 'game-horizon',
        name: 'Horizon Zero Dawn',
        genre: 'action',
        origPrice: 180,
        price: 69,
        rating: 4.8,
        icon: 'fa-location-arrow'
    }
];

const POPULAR_CHANNELS = [
    'SSC Sports', 'beIN Sports', 'AD Sports', 'Alkass Channels',
    'OSN Movies', 'OSN Series', 'Netflix Premium Channels', 'Shahid VIP Channels',
    'MBC Channels', 'Rotana', 'Sky Cinema', 'HBO Arabic', 'National Geographic Abu Dhabi',
    'Disney Channel Arabic', 'Cartoon Network Arabic'
];

// --- APP STATE ---
let cart = [];
let currentSymptom = null;
let selectedPaymentMethod = 'applepay';

// --- DOM ELEMENTS ---
const tweaksGrid = document.getElementById('tweaks-grid');
const iptvGrid = document.getElementById('iptv-packages-grid');
const steamGamesGrid = document.getElementById('steam-games-grid');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalValue = document.getElementById('cart-total-value');
const cartBadgeCount = document.getElementById('cart-badge-count');
const checkoutStartBtn = document.getElementById('checkout-start-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutOverlay = document.getElementById('checkout-overlay');
const checkoutCloseBtn = document.getElementById('checkout-close-btn');
const checkoutFormStep1 = document.getElementById('checkout-form-step1');
const checkoutBackBtn = document.getElementById('checkout-back-btn');
const checkoutSubmitBtn = document.getElementById('checkout-submit-btn');

const stepTab1 = document.getElementById('step-tab-1');
const stepTab2 = document.getElementById('step-tab-2');
const stepContent1 = document.getElementById('step-content-1');
const stepContent2 = document.getElementById('step-content-2');

const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');

const payFieldsStcPay = document.getElementById('pay-fields-stcpay');
const payFieldsCredit = document.getElementById('pay-fields-credit');

const successModal = document.getElementById('success-modal');
const successCloseBtn = document.getElementById('success-close-btn');
const receiptDetails = document.getElementById('receipt-details');
const whatsappConfirmBtn = document.getElementById('whatsapp-confirm-btn');

const bookingSuccessModal = document.getElementById('booking-success-modal');
const bookingSuccessCloseBtn = document.getElementById('booking-success-close-btn');
const bookingDetails = document.getElementById('booking-details');

// --- 1. SPA ROUTING CONTROLLER ---
function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active-tab');
    });
    // Remove active class from all nav-links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected tab
    const targetSection = document.getElementById(`${tabId}-section`);
    if (targetSection) {
        targetSection.classList.add('active-tab');
    }

    // Set active nav-link
    const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('open');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation Event Listeners
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        switchTab(tab);
    });
});

// Logo Click Routing
document.getElementById('nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('home');
});

// Mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('open');
});

// Make switchTab available globally
window.switchTab = switchTab;


// --- 2. INJECT TWEAKS PRODUCTS ---
function loadTweaks() {
    if (!tweaksGrid) return;
    tweaksGrid.innerHTML = TWEAKS_DATA.map(tweak => `
        <div class="product-card glass-panel" id="card-${tweak.id}">
            <div class="product-badge">${tweak.badge}</div>
            <div class="product-icon"><i class="fa-solid ${tweak.icon}"></i></div>
            <h3 class="product-title">${tweak.name}</h3>
            <p class="product-desc">${tweak.desc}</p>
            <ul class="product-specs">
                ${tweak.specs.map(spec => `<li><i class="fa-solid fa-circle-check text-cyan"></i> ${spec}</li>`).join('')}
            </ul>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-label">السعر لمرة واحدة</span>
                    <span class="price-value">${tweak.price} ر.س</span>
                </div>
                <button class="btn btn-primary" onclick="addToCart('${tweak.id}', '${tweak.name}', ${tweak.price}, 'tweak')">
                    <i class="fa-solid fa-cart-plus"></i> أضف للسلة
                </button>
            </div>
        </div>
    `).join('');
}


// --- 3. INJECT IPTV PACKAGES ---
function loadIptv() {
    if (!iptvGrid) return;
    iptvGrid.innerHTML = IPTV_DATA.map(pkg => `
        <div class="iptv-card glass-panel ${pkg.popular ? 'popular' : ''}" id="card-${pkg.id}">
            ${pkg.popular ? `<div class="popular-badge">${pkg.badge}</div>` : ''}
            <div class="iptv-icon"><i class="fa-solid ${pkg.icon}"></i></div>
            <h3 class="iptv-name">${pkg.name}</h3>
            <div class="iptv-price">${pkg.price} <span>ر.س</span></div>
            <ul class="iptv-features">
                ${pkg.features.map(f => `<li><i class="fa-solid fa-square-check"></i> ${f}</li>`).join('')}
            </ul>
            <button class="btn ${pkg.popular ? 'btn-purple' : 'btn-secondary'} w-100" onclick="addToCart('${pkg.id}', '${pkg.name}', ${pkg.price}, 'iptv')">
                <i class="fa-solid fa-cart-shopping"></i> اشترك الآن
            </button>
        </div>
    `).join('');
}


// --- 4. INJECT STEAM GAMES ---
function loadGames(filterGenre = 'all', searchQuery = '') {
    if (!steamGamesGrid) return;

    let filtered = STEAM_GAMES_DATA;
    if (filterGenre !== 'all') {
        filtered = filtered.filter(g => g.genre === filterGenre);
    }
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(g => g.name.toLowerCase().includes(query));
    }

    if (filtered.length === 0) {
        steamGamesGrid.innerHTML = `
            <div class="empty-cart-msg" style="grid-column: 1 / -1; padding: 60px 0;">
                <i class="fa-solid fa-circle-question"></i>
                <p>عذراً، لم نجد أي ألعاب تطابق بحثك حالياً. تواصل معنا لتوفيرها لك خصيصاً!</p>
            </div>
        `;
        return;
    }

    steamGamesGrid.innerHTML = filtered.map(game => `
        <div class="game-card glass-panel" id="card-${game.id}">
            <div class="game-cover-container">
                <div class="game-cover-placeholder">
                    <i class="fa-solid ${game.icon}"></i>
                    <span>${game.name.substring(0, 10)}...</span>
                </div>
                <div class="game-genre-badge">${game.genre.toUpperCase()}</div>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <div class="game-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${game.rating} | تفعيل أوفلاين أصلي</span>
                </div>
                <div class="game-price-box">
                    <span class="discount-price" style="font-size: 0.95rem; color: var(--primary-purple);"><i class="fa-solid fa-circle-check"></i> مشمولة بالبكج الأضخم</span>
                </div>
            </div>
            <button class="btn btn-purple w-100" onclick="addToCart('steam-mega-bundle', 'البكج الأضخم لألعاب Steam (تفعيل أوفلاين: ${game.name})', 49, 'game-bundle')">
                <i class="fa-solid fa-key"></i> تفعيل بالبكج الأضخم
            </button>
        </div>
    `).join('');

}

// Game Search and Genre Filtering
document.getElementById('game-search')?.addEventListener('input', (e) => {
    const activeGenre = document.querySelector('.filter-tag.active')?.getAttribute('data-genre') || 'all';
    loadGames(activeGenre, e.target.value);
});

document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const genre = tag.getAttribute('data-genre');
        const searchVal = document.getElementById('game-search')?.value || '';
        loadGames(genre, searchVal);
    });
});


// --- 5. IPTV CHANNEL LOOKUP SIMULATOR ---
const channelInput = document.getElementById('channel-search-input');
const channelBtn = document.getElementById('channel-search-btn');
const channelResultsBox = document.getElementById('channel-results-box');

function handleChannelSearch() {
    const query = channelInput.value.trim().toLowerCase();
    if (query === '') {
        channelResultsBox.innerHTML = '<span class="text-red">يرجى كتابة اسم القناة أولاً!</span>';
        return;
    }

    channelResultsBox.innerHTML = '';
    // Find matching channels from our popular array
    const matched = POPULAR_CHANNELS.filter(ch => ch.toLowerCase().includes(query));

    if (matched.length > 0) {
        matched.forEach(ch => {
            const tag = document.createElement('div');
            tag.className = 'channel-tag text-green';
            tag.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${ch} | متوفرة 4K`;
            channelResultsBox.appendChild(tag);
        });
    } else {
        // Create an awesome placeholder result
        const tag = document.createElement('div');
        tag.className = 'channel-tag text-cyan';
        tag.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${channelInput.value} | متوفرة في مكتبة الأفلام والمسلسلات طلبك مجاب! ✅`;
        channelResultsBox.appendChild(tag);
    }
}

channelBtn?.addEventListener('click', handleChannelSearch);
channelInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChannelSearch();
});


// --- 6. PC DIAGNOSTICS & REPAIR ASSISTANT ---
const symptomButtons = document.querySelectorAll('.symptom-btn');
const diagnosticResultPanel = document.getElementById('diagnostic-result-panel');

const SYMPTOMS_DIAGNOSIS = {
    overheat: {
        title: 'ارتفاع حرارة المعالج وكارت الشاشة (Thermal Throttling)',
        desc: 'الحل المقترح: تنظيف مروحة التبريد بالهواء المضغوط، تبديل المعجون الحراري (Thermal Paste) القديم بنوع احترافي مثل MX-6، وتثبيت باقة تويك K1 للتحكم بفولتية المعالج لتقليل درجة الحرارة حتى 15 درجة مئوية.',
        recName: 'تنظيف وتغيير معجون حراري احترافي + تويك حماية',
        recId: 'pc-paste-service',
        recPrice: 150
    },
    bsod: {
        title: 'الشاشة الزرقاء المتكررة (Blue Screen of Death)',
        desc: 'الحل المقترح: فحص كابلات وتوصيلات الرام والهارد ديسك، التحقق من عدم تلف ملفات نظام الويندوز، وتثبيت نسخة ويندوز 10/11 برو أصلية ومستقرة تماماً مع تفعيل التعديل الاحترافي لتفادي أي أخطاء تعريفات مستقبلاً.',
        recName: 'باقة تثبيت ويندوز أصلي مستقر وتويك ذهبي',
        recId: 'pc-windows-service',
        recPrice: 199
    },
    fps_drop: {
        title: 'هبوط الفريمات والتقطيع المفاجئ (FPS Drops & Stuttering)',
        desc: 'الحل المقترح: تنظيف تعريفات كارت الشاشة القديمة بالكامل بأداة DDU وتثبيت التعريف المتوافق مع نسختك، إيقاف خدمات الويندوز الخلفية التي تستهلك المعالج، وتثبيت باقة التعديل الاحترافية لمتجر K1 لتحقيق استقرار الفريمات بنسبة 100%.',
        recName: 'باقة التعديل الاحترافية | Elite Tweak',
        recId: 'tweak-elite',
        recPrice: 39
    },
    slow_boot: {
        title: 'الجهاز بطيء جداً عند التشغيل وفتح البرامج (Slow Loading)',
        desc: 'الحل المقترح: ترقية هارد ديسك النظام القديم إلى هارد SSD حديث (M.2 NVMe)، إلغاء تفعيل البرامج التي تبدأ تلقائياً مع تشغيل الجهاز، وتهيئة الويندوز لاستخدام كافة طاقة معالجك لتسريع زمن الإقلاع لأقل من 10 ثوانٍ.',
        recName: 'خدمة ترقية لـ SSD وضبط سرعة الإقلاع السريع',
        recId: 'pc-ssd-upgrade',
        recPrice: 120
    }
};

symptomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        symptomButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const symptom = btn.getAttribute('data-symptom');
        currentSymptom = symptom;

        const diag = SYMPTOMS_DIAGNOSIS[symptom];
        if (diag) {
            diagnosticResultPanel.innerHTML = `
                <div class="diagnostic-card">
                    <h4><i class="fa-solid fa-stethoscope text-cyan"></i> ${diag.title}</h4>
                    <p>${diag.desc}</p>
                    <span class="rec-title">الخدمة الموصى بها كحل فوري:</span>
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                        <span class="rec-badge"><i class="fa-solid fa-screwdriver-wrench"></i> ${diag.recName}</span>
                        <button class="btn btn-green" onclick="addToCart('${diag.recId}', '${diag.recName}', ${diag.recPrice}, 'service')">
                            <i class="fa-solid fa-cart-plus"></i> إضافة الخدمة للسلة (${diag.recPrice} ر.س)
                        </button>
                    </div>
                </div>
            `;
        }
    });
});

// PC Repair Booking Form Submission Handler
const pcBookingForm = document.getElementById('pc-booking-form');
pcBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const service = document.getElementById('book-service').value;
    const specs = document.getElementById('book-specs').value;

    const serviceMap = {
        repair: 'صيانة جهاز وحل مشكلة برمجية/هاردوير',
        assembly: 'تجميع PC جديد وتركيبه',
        clean_repaste: 'تنظيف كامل وتغيير المعجون الحراري',
        install_windows_tweaks: 'تثبيت ويندوز أصلي مع التويك الاحترافي'
    };

    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

    // Inject into success booking modal
    bookingDetails.innerHTML = `
        <div class="receipt-row"><span>رقم طلب الصيانة:</span><strong class="text-cyan">${bookingId}</strong></div>
        <div class="receipt-row"><span>العميل:</span><span>${name}</span></div>
        <div class="receipt-row"><span>الجوال:</span><span>${phone}</span></div>
        <div class="receipt-row"><span>الخدمة المطلوبة:</span><span>${serviceMap[service] || service}</span></div>
        ${specs ? `<div class="receipt-row"><span>مواصفات الجهاز:</span><span style="font-size:0.8rem; color:var(--text-gray);">${specs}</span></div>` : ''}
    `;

    // Set WhatsApp confirm link
    const bookingSpecs = specs ? specs : 'لا توجد';
    const waBookingText = `مرحباً متجر K1 Tech، أرغب بحجز موعد صيانة/تجميع PC:%0A%0A*تفاصيل الحجز:*%0A- رقم الطلب: *${bookingId}*%0A- الاسم: *${name}*%0A- رقم التواصل: *${phone}*%0A- الخدمة: *${serviceMap[service] || service}*%0A- مواصفات الجهاز: *${bookingSpecs}*%0A%0Aالرجاء التواصل لتأكيد الموعد.`;

    const whatsappBookingConfirmBtn = document.getElementById('whatsapp-booking-confirm-btn');
    if (whatsappBookingConfirmBtn) {
        whatsappBookingConfirmBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waBookingText}`;
    }

    // Open success modal
    bookingSuccessModal.style.display = 'flex';
    pcBookingForm.reset();
});

bookingSuccessCloseBtn?.addEventListener('click', () => {
    bookingSuccessModal.style.display = 'none';
});


// --- 7. CART DRAWER OPERATIONS ---

function toggleCartDrawer(open = true) {
    if (open) {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    } else {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }
}

cartToggleBtn?.addEventListener('click', () => toggleCartDrawer(true));
cartCloseBtn?.addEventListener('click', () => toggleCartDrawer(false));
cartOverlay?.addEventListener('click', () => toggleCartDrawer(false));

function addToCart(id, name, price, type) {
    // Check if item already in cart
    const exists = cart.find(item => item.id === id);
    if (exists) {
        alert('هذا المنتج موجود بالفعل في سلة مشترياتك!');
        toggleCartDrawer(true);
        return;
    }

    cart.push({ id, name, price, type });
    updateCartUI();
    toggleCartDrawer(true);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge count
    cartBadgeCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>سلتك فارغة حالياً. تصفح الموقع وأضف ما ترغب به!</p>
            </div>
        `;
        cartTotalValue.textContent = '0.00 ر.س';
        checkoutStartBtn.disabled = true;
        return;
    }

    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ر.س</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="حذف">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalValue.textContent = `${total.toFixed(2)} ر.س`;
    checkoutStartBtn.disabled = false;
}

// Make cart functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;


// --- 8. CHECKOUT FLOW & PAYMENT ---

checkoutStartBtn?.addEventListener('click', () => {
    toggleCartDrawer(false);

    // Set Totals inside Checkout modal
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    summarySubtotal.textContent = `${total.toFixed(2)} ر.س`;
    summaryTotal.textContent = `${total.toFixed(2)} ر.س`;

    // Show step 1
    goToCheckoutStep(1);
    checkoutModal.style.display = 'flex';
});

function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
}

checkoutCloseBtn?.addEventListener('click', closeCheckoutModal);
checkoutOverlay?.addEventListener('click', closeCheckoutModal);

function goToCheckoutStep(step) {
    if (step === 1) {
        stepTab1.classList.add('active-step');
        stepTab2.classList.remove('active-step');
        stepContent1.classList.add('active-content');
        stepContent2.classList.remove('active-content');
    } else if (step === 2) {
        stepTab1.classList.remove('active-step');
        stepTab2.classList.add('active-step');
        stepContent1.classList.remove('active-content');
        stepContent2.classList.add('active-content');
    }
}

// Step 1 Form Submit -> Goes to Step 2
checkoutFormStep1?.addEventListener('submit', (e) => {
    e.preventDefault();
    goToCheckoutStep(2);
});

// Step 2 Back Button
checkoutBackBtn?.addEventListener('click', () => {
    goToCheckoutStep(1);
});

// Payment Method Selector
document.querySelectorAll('.pay-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');

        const method = option.getAttribute('data-method');
        selectedPaymentMethod = method;

        const payFieldsApplePay = document.getElementById('pay-fields-applepay');

        // Toggle mockup inputs
        if (method === 'stcpay') {
            payFieldsStcPay.style.display = 'block';
            payFieldsCredit.style.display = 'none';
            if (payFieldsApplePay) payFieldsApplePay.style.display = 'none';
        } else if (method === 'credit' || method === 'mada') {
            payFieldsStcPay.style.display = 'none';
            payFieldsCredit.style.display = 'block';
            if (payFieldsApplePay) payFieldsApplePay.style.display = 'none';
        } else if (method === 'applepay') {
            payFieldsStcPay.style.display = 'none';
            payFieldsCredit.style.display = 'none';
            if (payFieldsApplePay) payFieldsApplePay.style.display = 'block';
        }
    });
});

// Apple Pay Flow Simulation
function triggerApplePayFlow() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;

    if (!name || !phone || !email) {
        alert('برجاء ملء بيانات التواصل في الخطوة السابقة!');
        goToCheckoutStep(1);
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('apple-pay-sheet-total').textContent = `${total.toFixed(2)} ر.س`;

    const sheet = document.getElementById('apple-pay-simulation-sheet');
    sheet.classList.add('open');

    // Reset scanner state
    const scanner = document.getElementById('face-id-scanner');
    const textEl = document.getElementById('apple-pay-verification-text');
    scanner.classList.remove('success', 'scanning');
    textEl.textContent = 'انقر على البصمة لمسح الهوية وإتمام الدفع...';
}

document.getElementById('apple-pay-trigger-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    triggerApplePayFlow();
});

document.getElementById('apple-pay-sheet-cancel')?.addEventListener('click', () => {
    document.getElementById('apple-pay-simulation-sheet').classList.remove('open');
});

document.getElementById('face-id-scanner')?.addEventListener('click', () => {
    const scanner = document.getElementById('face-id-scanner');
    const textEl = document.getElementById('apple-pay-verification-text');

    if (scanner.classList.contains('scanning') || scanner.classList.contains('success')) return;

    scanner.classList.add('scanning');
    textEl.textContent = 'جاري مسح البصمة والتحقق...';

    setTimeout(() => {
        scanner.classList.remove('scanning');
        scanner.classList.add('success');
        textEl.textContent = 'تم التحقق والدفع بنجاح! ✅';

        setTimeout(() => {
            // Hide sheet
            document.getElementById('apple-pay-simulation-sheet').classList.remove('open');
            // Complete checkout order
            completeCheckoutOrder();
        }, 1000);
    }, 1500);
});

function completeCheckoutOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;
    const notes = document.getElementById('cust-notes').value || 'لا توجد ملاحظات';

    const orderId = 'K1-' + Math.floor(10000 + Math.random() * 90000);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const paymentLabels = {
        applepay: 'Apple Pay ',
        mada: 'مدى Mada 💳',
        stcpay: 'STC Pay 📱',
        credit: 'بطاقة ائتمانية 💳'
    };

    // Build Receipt content
    receiptDetails.innerHTML = `
        <div class="receipt-row"><span>رقم الفاتورة:</span><strong class="text-cyan">${orderId}</strong></div>
        <div class="receipt-row"><span>العميل:</span><span>${name}</span></div>
        <div class="receipt-row"><span>رقم التواصل:</span><span>${phone}</span></div>
        <hr style="border:0; border-top: 1px dashed rgba(255,255,255,0.1); margin:10px 0;">
        ${cart.map(item => `<div class="receipt-row"><span>- ${item.name}</span><span>${item.price} ر.س</span></div>`).join('')}
        <hr style="border:0; border-top: 1px dashed rgba(255,255,255,0.1); margin:10px 0;">
        <div class="receipt-row"><strong>المجموع الكلي:</strong><strong class="text-cyan">${total} ر.س</strong></div>
        <div class="receipt-row"><span>طريقة الدفع:</span><span>${paymentLabels[selectedPaymentMethod] || selectedPaymentMethod}</span></div>
    `;

    // WhatsApp Message URL Generator
    const itemsListText = cart.map(item => `- ${item.name} (${item.price} ر.س)`).join('%0A');
    const waText = `مرحباً متجر K1 Tech، قمت بطلب شراء من الموقع:%0A%0A*تفاصيل الطلب:*%0A- رقم الفاتورة: *${orderId}*%0A- الاسم: *${name}*%0A- الجوال: *${phone}*%0A- طريقة الدفع: *${(paymentLabels[selectedPaymentMethod] || selectedPaymentMethod).toUpperCase()}*%0A- الملاحظات: *${notes}*%0A%0A*المنتجات:*%0A${itemsListText}%0A%0A*المبلغ الإجمالي:* *${total} ر.س*%0A%0Aالرجاء تفعيل الخدمة لي في أسرع وقت.`;

    // Set WhatsApp link
    whatsappConfirmBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

    // Clear cart
    cart = [];
    updateCartUI();

    // Switch Modals
    closeCheckoutModal();
    successModal.style.display = 'flex';
}

// Final checkout click -> processes order & generates receipt
checkoutSubmitBtn?.addEventListener('click', () => {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;

    if (!name || !phone || !email) {
        alert('برجاء ملء بيانات التواصل في الخطوة السابقة!');
        goToCheckoutStep(1);
        return;
    }

    if (selectedPaymentMethod === 'applepay') {
        triggerApplePayFlow();
    } else {
        completeCheckoutOrder();
    }
});

successCloseBtn?.addEventListener('click', () => {
    successModal.style.display = 'none';
});


// --- 9. FAQ ACCORDION LOGIC ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});

// --- 10. THEME & LANGUAGE TOGGLE ---
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });
}

const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const isEn = document.documentElement.lang === 'en';
        if (isEn) {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            langToggleBtn.textContent = 'EN';
            document.querySelector('.nav-link[data-tab="home"]').innerHTML = '<i class="fa-solid fa-house"></i> الرئيسية';
            document.querySelector('.nav-link[data-tab="tweaks"]').innerHTML = '<i class="fa-solid fa-gauge-high"></i> التويك والتحسين';
            document.querySelector('.nav-link[data-tab="iptv"]').innerHTML = '<i class="fa-solid fa-tv"></i> اشتراكات IPTV';
            document.querySelector('.nav-link[data-tab="repair"]').innerHTML = '<i class="fa-solid fa-screwdriver-wrench"></i> الصيانة والتجميعات';
            document.querySelector('.nav-link[data-tab="steam"]').innerHTML = '<i class="fa-solid fa-gamepad"></i> ألعاب Steam';
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            langToggleBtn.textContent = 'AR';
            document.querySelector('.nav-link[data-tab="home"]').innerHTML = '<i class="fa-solid fa-house"></i> Home';
            document.querySelector('.nav-link[data-tab="tweaks"]').innerHTML = '<i class="fa-solid fa-gauge-high"></i> Tweaks & Boost';
            document.querySelector('.nav-link[data-tab="iptv"]').innerHTML = '<i class="fa-solid fa-tv"></i> IPTV Subscriptions';
            document.querySelector('.nav-link[data-tab="repair"]').innerHTML = '<i class="fa-solid fa-screwdriver-wrench"></i> PC Repair & Builds';
            document.querySelector('.nav-link[data-tab="steam"]').innerHTML = '<i class="fa-solid fa-gamepad"></i> Steam Games';
        }
    });
}

// --- 11. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    loadTweaks();
    loadIptv();
    loadGames();

    // Initialize WhatsApp floating button
    const floatWaBtn = document.getElementById('whatsapp-floating-btn');
    if (floatWaBtn) {
        floatWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
});
