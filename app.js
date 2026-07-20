/**
 * K1 Tech - Main Client Application Script
 * Implements interactive routing, cart operations, checkout modal steps, 
 * PC diagnostics assistant, and WhatsApp confirmation generators.
 * Fully supports complete translation to English/Arabic.
 */

// --- DATA DEFINITIONS ---

const WHATSAPP_NUMBER = '966504954741'; // K1 Tech Support Number

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
            'ضمان كامل طوال مدة الاشتراك',
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
            'ضمان كامل طوال مدة الاشتراك',
            'سيرفرات احتياطية فائقة السرعة لمنع التقطيع وقت المباريات',
            'تفعيل سريع ودعم فني متاح خلال اليوم',
            'دعم وتحديثات مستمرة'
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
            'ضمان كامل طوال مدة الاشتراك',
            'دعم فني VIP فوري عبر الواتساب والديسكورد على مدار الساعة',
            'توفير تطبيق تشغيل مجاني خاص بمتجرنا'
        ]
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
let selectedPaymentMethod = 'whatsapp';

// --- DOM ELEMENTS ---
const tweaksGrid = document.getElementById('tweaks-grid');
const iptvGrid = document.getElementById('iptv-packages-grid');
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
const payFieldsWhatsapp = document.getElementById('pay-fields-whatsapp');

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
    if (navMenu) navMenu.classList.remove('open');

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
document.getElementById('nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('home');
});

// Mobile menu toggle
document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.toggle('open');
});

// Make switchTab available globally
window.switchTab = switchTab;


// --- 2. INJECT TWEAKS PRODUCTS ---
function loadTweaks() {
    if (!tweaksGrid) return;
    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';
    const priceLabel = isEn ? 'One-time price' : 'السعر لمرة واحدة';
    const addCartText = TRANSLATIONS[lang]['btn_add_cart'] || 'أضف للسلة';
    const addedText = TRANSLATIONS[lang]['btn_added'] || 'تمت الإضافة';

    tweaksGrid.innerHTML = TWEAKS_DATA.map(tweak => {
        const name = TRANSLATIONS[lang][tweak.id] || tweak.name;
        const desc = TRANSLATIONS[lang][tweak.id + '-desc'] || tweak.desc;
        const specs = tweak.specs.map((spec, i) => TRANSLATIONS[lang][tweak.id + '-spec-' + i] || spec);
        const badge = TRANSLATIONS[lang]['best_seller'] || tweak.badge;
        const isInCart = cart.some(item => item.id === tweak.id);

        return `
            <div class="product-card glass-panel" id="card-${tweak.id}">
                <div class="product-badge">${badge}</div>
                <div class="product-icon"><i class="fa-solid ${tweak.icon}"></i></div>
                <h3 class="product-title">${name}</h3>
                <p class="product-desc">${desc}</p>
                <ul class="product-specs">
                    ${specs.map(spec => `<li><i class="fa-solid fa-circle-check text-cyan"></i> ${spec}</li>`).join('')}
                </ul>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="price-label">${priceLabel}</span>
                        <span class="price-value">${tweak.price} ${currency}</span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart('${tweak.id}', '${tweak.name}', ${tweak.price}, 'tweak')">
                        <i class="fa-solid fa-cart-plus"></i> ${isInCart ? addedText : addCartText}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}


// --- 3. INJECT IPTV PACKAGES ---
function loadIptv() {
    if (!iptvGrid) return;
    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';
    const subscribeText = isEn ? 'Subscribe Now' : 'اشترك الآن';

    iptvGrid.innerHTML = IPTV_DATA.map(pkg => {
        const name = TRANSLATIONS[lang][pkg.id] || pkg.name;
        const badge = TRANSLATIONS[lang][pkg.id + '-badge'] || pkg.badge;
        const features = pkg.features.map((feat, i) => TRANSLATIONS[lang][pkg.id + '-feat-' + i] || feat);
        return `
            <div class="iptv-card glass-panel ${pkg.popular ? 'popular' : ''}" id="card-${pkg.id}">
                ${pkg.popular ? `<div class="popular-badge">${badge}</div>` : ''}
                <div class="iptv-icon"><i class="fa-solid ${pkg.icon}"></i></div>
                <h3 class="iptv-name">${name}</h3>
                <div class="iptv-price">${pkg.price} <span>${currency}</span></div>
                <ul class="iptv-features">
                    ${features.map(f => `<li><i class="fa-solid fa-square-check"></i> ${f}</li>`).join('')}
                </ul>
                <button class="btn ${pkg.popular ? 'btn-purple' : 'btn-secondary'} w-100" onclick="addToCart('${pkg.id}', '${pkg.name}', ${pkg.price}, 'iptv')">
                    <i class="fa-solid fa-cart-shopping"></i> ${subscribeText}
                </button>
            </div>
        `;
    }).join('');
}


// --- 5. IPTV CHANNEL LOOKUP SIMULATOR ---
const channelInput = document.getElementById('channel-search-input');
const channelBtn = document.getElementById('channel-search-btn');
const channelResultsBox = document.getElementById('channel-results-box');

function handleChannelSearch() {
    const isEn = document.documentElement.lang === 'en';
    const query = channelInput.value.trim().toLowerCase();
    
    if (query === '') {
        channelResultsBox.innerHTML = isEn 
            ? '<span class="text-red">Please type a channel name first!</span>' 
            : '<span class="text-red">يرجى كتابة اسم القناة أولاً!</span>';
        return;
    }

    channelResultsBox.innerHTML = '';
    // Find matching channels from our popular array
    const matched = POPULAR_CHANNELS.filter(ch => ch.toLowerCase().includes(query));

    if (matched.length > 0) {
        matched.forEach(ch => {
            const tag = document.createElement('div');
            tag.className = 'channel-tag text-green';
            tag.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${ch} | ${isEn ? 'Available in 4K' : 'متوفرة 4K'}`;
            channelResultsBox.appendChild(tag);
        });
    } else {
        // Create an awesome placeholder result
        const tag = document.createElement('div');
        tag.className = 'channel-tag text-cyan';
        tag.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${channelInput.value} | ${isEn ? 'Available in movies & series library, your request is granted! ✅' : 'متوفرة في مكتبة الأفلام والمسلسلات طلبك مجاب! ✅'}`;
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
        recId: 'pc-paste-service',
        recPrice: 150
    },
    bsod: {
        recId: 'pc-windows-service',
        recPrice: 199
    },
    fps_drop: {
        recId: 'tweak-elite',
        recPrice: 39
    },
    slow_boot: {
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
            const isEn = document.documentElement.lang === 'en';
            const lang = isEn ? 'en' : 'ar';
            const title = TRANSLATIONS[lang][symptom + '_title'];
            const desc = TRANSLATIONS[lang][symptom + '_desc'];
            const recName = TRANSLATIONS[lang][diag.recId];
            const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';
            const solutionLabel = isEn ? 'Recommended Service:' : 'الخدمة الموصى بها كحل فوري:';
            const addCartLabel = isEn ? 'Add Service to Cart' : 'إضافة الخدمة للسلة';

            diagnosticResultPanel.innerHTML = `
                <div class="diagnostic-card">
                    <h4><i class="fa-solid fa-stethoscope text-cyan"></i> ${title}</h4>
                    <p>${desc}</p>
                    <span class="rec-title">${solutionLabel}</span>
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                        <span class="rec-badge"><i class="fa-solid fa-screwdriver-wrench"></i> ${recName}</span>
                        <button class="btn btn-green" onclick="addToCart('${diag.recId}', '${recName}', ${diag.recPrice}, 'service')">
                            <i class="fa-solid fa-cart-plus"></i> ${addCartLabel} (${diag.recPrice} ${currency})
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
    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const service = document.getElementById('book-service').value;
    const specs = document.getElementById('book-specs').value;

    const serviceMap = {
        repair: TRANSLATIONS[lang]['opt_repair'] || 'صيانة جهاز وحل مشكلة برمجية/هاردوير',
        assembly: TRANSLATIONS[lang]['opt_assembly'] || 'تجميع PC جديد وتركيبه',
        clean_repaste: TRANSLATIONS[lang]['opt_clean_repaste'] || 'تنظيف كامل وتغيير المعجون الحراري',
        install_windows_tweaks: TRANSLATIONS[lang]['opt_install_windows_tweaks'] || 'تثبيت ويندوز أصلي مع التويك الاحترافي'
    };

    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

    const ticketLabel = isEn ? 'Ticket ID:' : 'رقم طلب الصيانة:';
    const clientLabel = isEn ? 'Client:' : 'العميل:';
    const phoneLabel = isEn ? 'Phone:' : 'الجوال:';
    const serviceLabel = isEn ? 'Required Service:' : 'الخدمة المطلوبة:';
    const specsLabel = isEn ? 'Device Specs:' : 'مواصفات الجهاز:';

    // Inject into success booking modal
    bookingDetails.innerHTML = `
        <div class="receipt-row"><span>${ticketLabel}</span><strong class="text-cyan">${bookingId}</strong></div>
        <div class="receipt-row"><span>${clientLabel}</span><span>${name}</span></div>
        <div class="receipt-row"><span>${phoneLabel}</span><span>${phone}</span></div>
        <div class="receipt-row"><span>${serviceLabel}</span><span>${serviceMap[service] || service}</span></div>
        ${specs ? `<div class="receipt-row"><span>${specsLabel}</span><span style="font-size:0.8rem; color:var(--text-gray);">${specs}</span></div>` : ''}
    `;

    // Set WhatsApp confirm link
    const bookingSpecs = specs ? specs : (isEn ? 'None' : 'لا توجد');
    const waBookingText = isEn 
        ? `Hello K1 Tech, I want to book a PC maintenance/assembly appointment:%0A%0A*Booking Details:*%0A- Ticket ID: *${bookingId}*%0A- Name: *${name}*%0A- Phone: *${phone}*%0A- Service: *${serviceMap[service] || service}*%0A- Specs: *${bookingSpecs}*%0A%0APlease contact me to confirm the appointment.`
        : `مرحباً متجر K1 Tech، أرغب بحجز موعد صيانة/تجميع PC:%0A%0A*تفاصيل الحجز:*%0A- رقم الطلب: *${bookingId}*%0A- الاسم: *${name}*%0A- رقم التواصل: *${phone}*%0A- الخدمة: *${serviceMap[service] || service}*%0A- مواصفات الجهاز: *${bookingSpecs}*%0A%0Aالرجاء التواصل لتأكيد الموعد.`;

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
        cartDrawer?.classList.add('open');
        cartOverlay?.classList.add('open');
    } else {
        cartDrawer?.classList.remove('open');
        cartOverlay?.classList.remove('open');
    }
}

cartToggleBtn?.addEventListener('click', () => toggleCartDrawer(true));
cartCloseBtn?.addEventListener('click', () => toggleCartDrawer(false));
cartOverlay?.addEventListener('click', () => toggleCartDrawer(false));

function addToCart(id, name, price, type) {
    // Check if item already in cart
    const exists = cart.find(item => item.id === id);
    const isEn = document.documentElement.lang === 'en';
    
    if (exists) {
        alert(isEn ? 'This product is already in your cart!' : 'هذا المنتج موجود بالفعل في سلة مشترياتك!');
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
    if (cartBadgeCount) cartBadgeCount.textContent = cart.length;

    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';

    if (cart.length === 0) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = TRANSLATIONS[lang]['cart_empty'] || `
                <div class="empty-cart-msg">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>سلتك فارغة حالياً. تصفح الموقع وأضف ما ترغب به!</p>
                </div>
            `;
        }
        if (cartTotalValue) cartTotalValue.textContent = `0.00 ${currency}`;
        if (checkoutStartBtn) checkoutStartBtn.disabled = true;
        return;
    }

    // Render cart items with translation lookup
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => {
            const displayName = TRANSLATIONS[lang][item.id] || item.name;
            return `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${displayName}</div>
                        <div class="cart-item-price">${item.price} ${currency}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="حذف">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalValue) cartTotalValue.textContent = `${total.toFixed(2)} ${currency}`;
    if (checkoutStartBtn) checkoutStartBtn.disabled = false;
}

// Make cart functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;


// --- 8. CHECKOUT FLOW & PAYMENT ---

checkoutStartBtn?.addEventListener('click', () => {
    toggleCartDrawer(false);

    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (summarySubtotal) summarySubtotal.textContent = `${total.toFixed(2)} ${currency}`;
    if (summaryTotal) summaryTotal.textContent = `${total.toFixed(2)} ${currency}`;

    // Show step 1
    goToCheckoutStep(1);
    if (checkoutModal) checkoutModal.style.display = 'flex';
});

function closeCheckoutModal() {
    if (checkoutModal) checkoutModal.style.display = 'none';
}

checkoutCloseBtn?.addEventListener('click', closeCheckoutModal);
checkoutOverlay?.addEventListener('click', closeCheckoutModal);

function goToCheckoutStep(step) {
    if (step === 1) {
        stepTab1?.classList.add('active-step');
        stepTab2?.classList.remove('active-step');
        stepContent1?.classList.add('active-content');
        stepContent2?.classList.remove('active-content');
    } else if (step === 2) {
        stepTab1?.classList.remove('active-step');
        stepTab2?.classList.add('active-step');
        stepContent1?.classList.remove('active-content');
        stepContent2?.classList.add('active-content');
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

        // Toggle mockup inputs
        if (payFieldsStcPay) payFieldsStcPay.style.display = (method === 'stcpay') ? 'block' : 'none';
        if (payFieldsCredit) payFieldsCredit.style.display = (method === 'credit' || method === 'mada') ? 'block' : 'none';
        if (payFieldsWhatsapp) payFieldsWhatsapp.style.display = (method === 'whatsapp') ? 'block' : 'none';
    });
});

function completeCheckoutOrder() {
    const isEn = document.documentElement.lang === 'en';
    const lang = isEn ? 'en' : 'ar';
    const currency = TRANSLATIONS[lang]['currency'] || 'ر.س';

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;
    const notes = document.getElementById('cust-notes').value || (isEn ? 'None' : 'لا توجد ملاحظات');

    const orderId = 'K1-' + Math.floor(10000 + Math.random() * 90000);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const paymentLabels = {
        whatsapp: TRANSLATIONS[lang]['pay_whatsapp'] || 'استكمال الدفع عن طريق الواتساب',
        mada: TRANSLATIONS[lang]['pay_mada'] || 'مدى',
        stcpay: TRANSLATIONS[lang]['pay_stcpay'] || 'STC Pay',
        credit: TRANSLATIONS[lang]['pay_credit'] || 'بطاقة ائتمانية'
    };

    const invoiceLabel = isEn ? 'Invoice ID:' : 'رقم الفاتورة:';
    const clientLabel = isEn ? 'Client:' : 'العميل:';
    const phoneLabel = isEn ? 'Contact Phone:' : 'رقم التواصل:';
    const totalLabel = isEn ? 'Grand Total:' : 'المجموع الكلي:';
    const methodLabel = isEn ? 'Payment Method:' : 'طريقة الدفع:';

    // Strip HTML icons from payment labels for checkout summary text
    let methodText = paymentLabels[selectedPaymentMethod] || selectedPaymentMethod;
    methodText = methodText.replace(/<[^>]*>/g, '').trim();

    // Build Receipt content
    receiptDetails.innerHTML = `
        <div class="receipt-row"><span>${invoiceLabel}</span><strong class="text-cyan">${orderId}</strong></div>
        <div class="receipt-row"><span>${clientLabel}</span><span>${name}</span></div>
        <div class="receipt-row"><span>${phoneLabel}</span><span>${phone}</span></div>
        <hr style="border:0; border-top: 1px dashed rgba(255,255,255,0.1); margin:10px 0;">
        ${cart.map(item => {
            const displayName = TRANSLATIONS[lang][item.id] || item.name;
            return `<div class="receipt-row"><span>- ${displayName}</span><span>${item.price} ${currency}</span></div>`;
        }).join('')}
        <hr style="border:0; border-top: 1px dashed rgba(255,255,255,0.1); margin:10px 0;">
        <div class="receipt-row"><strong>${totalLabel}</strong><strong class="text-cyan">${total} ${currency}</strong></div>
        <div class="receipt-row"><span>${methodLabel}</span><span>${methodText}</span></div>
    `;

    // WhatsApp Message URL Generator
    const itemsListText = cart.map(item => {
        const displayName = TRANSLATIONS[lang][item.id] || item.name;
        return `- ${displayName} (${item.price} ${currency})`;
    }).join('%0A');
    
    const waText = isEn 
        ? `Hello K1 Tech, I have placed an order on the website:%0A%0A*Order Details:*%0A- Invoice ID: *${orderId}*%0A- Name: *${name}*%0A- Phone: *${phone}*%0A- Payment Method: *${methodText.toUpperCase()}*%0A- Notes: *${notes}*%0A%0A*Products:*%0A${itemsListText}%0A%0A*Total Amount:* *${total} ${currency}*%0A%0APlease activate the service for me as soon as possible.`
        : `مرحباً متجر K1 Tech، قمت بطلب شراء من الموقع:%0A%0A*تفاصيل الطلب:*%0A- رقم الفاتورة: *${orderId}*%0A- الاسم: *${name}*%0A- الجوال: *${phone}*%0A- طريقة الدفع: *${methodText.toUpperCase()}*%0A- الملاحظات: *${notes}*%0A%0A*المنتجات:*%0A${itemsListText}%0A%0A*المبلغ الإجمالي:* *${total} ر.س*%0A%0Aالرجاء تفعيل الخدمة لي في أسرع وقت.`;

    // Set WhatsApp link
    if (whatsappConfirmBtn) {
        whatsappConfirmBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
    }

    // Clear cart
    cart = [];
    updateCartUI();

    // Switch Modals
    closeCheckoutModal();
    if (successModal) successModal.style.display = 'flex';
}

// Final checkout click -> processes order & generates receipt
checkoutSubmitBtn?.addEventListener('click', () => {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const email = document.getElementById('cust-email').value;

    if (!name || !phone || !email) {
        const isEn = document.documentElement.lang === 'en';
        alert(isEn ? 'Please fill out the contact details in the previous step!' : 'برجاء ملء بيانات التواصل في الخطوة السابقة!');
        goToCheckoutStep(1);
        return;
    }

    completeCheckoutOrder();
});

successCloseBtn?.addEventListener('click', () => {
    if (successModal) successModal.style.display = 'none';
});


// --- 9. FAQ ACCORDION LOGIC ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item?.classList.toggle('active');
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

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    localStorage.setItem('k1-lang', lang);

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'en' ? 'AR' : 'EN';
    }

    // Translate statically tagged elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.placeholder = TRANSLATIONS[lang][key];
        }
    });

    // Update dynamically loaded elements
    loadTweaks();
    loadIptv();

    // Re-translate Booking dropdown selector
    const serviceSelect = document.getElementById('book-service');
    if (serviceSelect) {
        const optSelect = serviceSelect.querySelector('option[value=""]');
        if (optSelect) optSelect.textContent = TRANSLATIONS[lang]['opt_select'] || 'اختر الخدمة';
        const optRepair = serviceSelect.querySelector('option[value="repair"]');
        if (optRepair) optRepair.textContent = TRANSLATIONS[lang]['opt_repair'] || 'صيانة جهاز وحل مشكلة برمجية/هاردوير';
        const optAssembly = serviceSelect.querySelector('option[value="assembly"]');
        if (optAssembly) optAssembly.textContent = TRANSLATIONS[lang]['opt_assembly'] || 'تجميع PC جديد وتركيبه';
        const optClean = serviceSelect.querySelector('option[value="clean_repaste"]');
        if (optClean) optClean.textContent = TRANSLATIONS[lang]['opt_clean_repaste'] || 'تنظيف كامل وتغيير المعجون الحراري';
        const optTweak = serviceSelect.querySelector('option[value="install_windows_tweaks"]');
        if (optTweak) optTweak.textContent = TRANSLATIONS[lang]['opt_install_windows_tweaks'] || 'تثبيت ويندوز أصلي مع التويك الاحترافي';
    }

    // Re-diagnose active symptom or set defaults
    if (currentSymptom) {
        const activeBtn = document.querySelector(`.symptom-btn[data-symptom="${currentSymptom}"]`);
        if (activeBtn) {
            // Trigger click simulation to refresh text
            const isBtnActive = activeBtn.classList.contains('active');
            activeBtn.click();
            if (isBtnActive) activeBtn.classList.add('active'); // Maintain state styling
        }
    } else {
        if (diagnosticResultPanel) {
            diagnosticResultPanel.innerHTML = TRANSLATIONS[lang]['diag_placeholder'] || `
                <div class="result-placeholder">
                    <i class="fa-solid fa-magnifying-glass-chart"></i>
                    <p>اضغط على أحد الأعراض بالأعلى لتشغيل الفحص التلقائي...</p>
                </div>
            `;
        }
    }

    // Refresh shopping cart items translations
    updateCartUI();
}

const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const isEn = document.documentElement.lang === 'en';
        applyLanguage(isEn ? 'ar' : 'en');
    });
}

// --- 11. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('k1-lang') || 'ar';
    applyLanguage(savedLang);

    // Initialize WhatsApp floating button
    const floatWaBtn = document.getElementById('whatsapp-floating-btn');
    if (floatWaBtn) {
        floatWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
});
