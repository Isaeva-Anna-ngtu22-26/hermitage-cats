// ===== БАЗА ДАННЫХ ТЕСТА =====
const quizDatabase = {
    choiceQuestions: [
        {
            id: 9,
            type: 'choice',
            question: "Сколько лет кошки состоят на государственной службе в Эрмитаже?",
            answers: ["Около 100 лет", "Более 260 лет", "Около 50 лет", "Более 500 лет"],
            correct: 1
        },
        {
            id: 2,
            type: 'choice',
            question: "Как звали богиню-кошку в Древнем Египте?",
            answers: ["Исида", "Бастет", "Нефертити", "Хатхор"],
            correct: 1
        },
        {
            id: 3,
            type: 'choice',
            question: "Какое наказание грозило за убийство кошки в Древнем Египте?",
            answers: ["Штраф", "Изгнание", "Смертная казнь", "Тюремное заключение"],
            correct: 2
        },
        {
            id: 4,
            type: 'choice',
            question: "Как хитроумные греки тайно вывозили кошек из Египта?",
            answers: ["В мешках", "В кувшинах с маковым отваром", "В корзинах", "В ящиках"],
            correct: 1
        },
        {
            id: 5,
            type: 'choice',
            question: "Кто из русских поэтов поместил Кота учёного у входа в сказочное Лукоморье?",
            answers: ["М.Ю. Лермонтов", "Н.А. Некрасов", "А.С. Пушкин", "С.А. Есенин"],
            correct: 2
        },
        {
            id: 6,
            type: 'choice',
            question: "Какая императрица издала указ о доставке 30 котов из Казани в Санкт-Петербург?",
            answers: ["Екатерина II", "Елизавета Петровна", "Анна Иоанновна", "Мария Фёдоровна"],
            correct: 1
        },
        {
            id: 7,
            type: 'choice',
            question: "Что, по преданию, сделал пророк Мохаммед для кошек?",
            answers: ["Научил их падать на четыре лапы", "Придумал им имена", "Построил первый кошачий храм", "Запретил охотиться на мышей"],
            correct: 0
        },
        {
            id: 8,
            type: 'choice',
            question: "Как называется легендарный кот из русских сказок, который видит за семь верст?",
            answers: ["Кот Матроскин", "Кот Баюн", "Кот Котофеевич", "Котонайло"],
            correct: 1
        }
    ],
    matchQuestions: [
        {
            id: 0,
            type: 'match',
            title: "Соотнесите художников с их картинами",
            instruction: "Перетащите названия картин из верхней панели к соответствующим изображениям",
            pairs: [
                { 
                    left: "Давид Рейкарт III", 
                    right: "«Крестьянка с кошкой»", 
                    leftImage: "🎨",
                    rightImage: "🖼️",
                },
                { 
                    left: "Эглон Хендрик ван дер Нер", 
                    right: "«Дети с птичкой и кошкой»", 
                    leftImage: "🎨",
                    rightImage: "🖼️",
                },
                { 
                    left: "Ян Брейгель Старший (Бархатный)", 
                    right: "«Поклонение волхвов»", 
                    leftImage: "🎨",
                    rightImage: "🖼️",
                },
                { 
                    left: "Франс Снейдерс", 
                    right: "«Рыбная лавка»", 
                    leftImage: "🎨",
                    rightImage: "🖼️",
                }    
            ]
        },
        {
            id: 10,
            type: 'choice',
            question: "Из какого города после блокады привезли дымчатых кошек-крысоловов?",
            answers: ["Екатеринбург", "Казань", "Ижевск", "Ярославль"],
            correct: 3
        }
    ]
};

// ===== КАРУСЕЛЬ-ГАЛЕРЕЯ =====
class Carousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = this.carousel.querySelector('.next');
        this.prevButton = this.carousel.querySelector('.prev');
        this.indicators = Array.from(this.carousel.querySelectorAll('.indicator'));
        this.currentSlideIndex = 0;
        
        this.init();
    }
    
    init() {
        this.updateSlidePosition();
        this.nextButton.addEventListener('click', () => this.moveToNextSlide());
        this.prevButton.addEventListener('click', () => this.moveToPrevSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.moveToSlide(index));
        });
        
        this.initSwipe();
    }
    
    updateSlidePosition() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - this.currentSlideIndex) * 100}%)`;
            slide.classList.toggle('current-slide', index === this.currentSlideIndex);
        });
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('current-indicator', index === this.currentSlideIndex);
        });
    }
    
    moveToSlide(index) {
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;
        this.currentSlideIndex = index;
        this.updateSlidePosition();
    }
    
    moveToNextSlide() {
        this.moveToSlide(this.currentSlideIndex + 1);
    }
    
    moveToPrevSlide() {
        this.moveToSlide(this.currentSlideIndex - 1);
    }
    
    initSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        if (startX - endX > threshold) {
            this.moveToNextSlide();
        } else if (endX - startX > threshold) {
            this.moveToPrevSlide();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-gallery');
    carousels.forEach(carousel => new Carousel(carousel));
});

// ===== ЛАЙТБОКС =====
let currentGalleryImages = [];
let currentLightboxIndex = 0;
let currentGalleryId = '';

function collectGalleryImages(galleryId) {
    currentGalleryImages = [];
    currentGalleryId = galleryId;
    
    const gridGallery = document.querySelector(`.image-grid[data-gallery-id="${galleryId}"]`);
    if (gridGallery) {
        gridGallery.querySelectorAll('.grid-item').forEach(item => {
            currentGalleryImages.push({
                caption: item.getAttribute('data-caption'),
                placeholder: item.querySelector('.image-placeholder')?.textContent || '🖼️',
                img: item.querySelector('img')?.src || null
            });
        });
        return;
    }
    
    const carouselGallery = document.querySelector(`.carousel-gallery[data-gallery-id="${galleryId}"]`);
    if (carouselGallery) {
        carouselGallery.querySelectorAll('.carousel-slide').forEach(slide => {
            currentGalleryImages.push({
                caption: slide.querySelector('.carousel-caption')?.textContent || '',
                placeholder: slide.querySelector('.image-placeholder')?.textContent || '🖼️',
                img: slide.querySelector('img')?.src || null
            });
        });
        return;
    }
    
    const quoteSection = document.querySelector(`.quote-section[data-gallery-id="${galleryId}"]`);
    if (quoteSection) {
        quoteSection.querySelectorAll('.quote-image-item').forEach(item => {
            currentGalleryImages.push({
                caption: item.getAttribute('data-caption'),
                placeholder: item.querySelector('.image-placeholder')?.textContent || '🖼️',
                img: item.querySelector('img')?.src || null
            });
        });
    }
}

function openLightbox(element, galleryId) {
    collectGalleryImages(galleryId);
    const gridItems = Array.from(element.parentElement.querySelectorAll('.grid-item, .quote-image-item'));
    currentLightboxIndex = gridItems.indexOf(element);
    showLightbox();
}

function openLightboxFromCarousel(element, galleryId) {
    collectGalleryImages(galleryId);
    const currentSlide = element.closest('.carousel-slide');
    const carouselSlides = Array.from(element.closest('.carousel-gallery').querySelectorAll('.carousel-slide'));
    currentLightboxIndex = carouselSlides.indexOf(currentSlide);
    showLightbox();
}

function showLightbox() {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightboxImage');
    const placeholder = document.getElementById('lightboxPlaceholder');
    const caption = document.getElementById('lightboxCaption');
    
    const currentItem = currentGalleryImages[currentLightboxIndex];
    
    if (currentItem && currentItem.img) {
        image.src = currentItem.img;
        image.style.display = 'block';
        placeholder.style.display = 'none';
    } else if (currentItem) {
        image.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = currentItem.placeholder || '🖼️';
    }
    
    caption.textContent = currentItem ? currentItem.caption : '';
    
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
    
    updateLightboxNav();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function lightboxPrev() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        showLightbox();
    }
}

function lightboxNext() {
    if (currentLightboxIndex < currentGalleryImages.length - 1) {
        currentLightboxIndex++;
        showLightbox();
    }
}

function updateLightboxNav() {
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    
    if (prevBtn && nextBtn) {
        if (currentLightboxIndex === 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        if (currentLightboxIndex >= currentGalleryImages.length - 1) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && document.getElementById('lightbox').classList.contains('active')) lightboxPrev();
    if (e.key === 'ArrowRight' && document.getElementById('lightbox').classList.contains('active')) lightboxNext();
});

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

// ===== ТЕСТ: ПЕРЕМЕННЫЕ СОСТОЯНИЯ =====
let currentQuestionIndex = 0;
let score = 0;
let quizActive = false;
let selectedAnswer = null;
let matchSubmitted = false;
let draggedItem = null;
let draggedFromZone = null;
let touchItem = null;
let touchClone = null;

// Объединяем все вопросы в один массив
let allQuestions = [];

// ===== ТЕСТ: СТАРТ =====
function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    quizActive = true;
    
    // Создаем массив всех вопросов
    allQuestions = [
        ...quizDatabase.choiceQuestions,
        ...quizDatabase.matchQuestions
    ];
    
    showCurrentQuestion();
}

function showCurrentQuestion() {
    const container = document.getElementById('quizQuestionContainer');
    container.innerHTML = '';
    
    // Проверяем, есть ли еще вопросы
    if (currentQuestionIndex >= allQuestions.length) {
        showResult();
        return;
    }
    
    const question = allQuestions[currentQuestionIndex];
    
    if (question.type === 'choice') {
        renderChoiceQuestion(question, container);
    } else if (question.type === 'match') {
        renderMatchQuestion(question, container);
    }
}

// ===== ВОПРОС С ВЫБОРОМ ОТВЕТА =====
function renderChoiceQuestion(question, container) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.id = 'quizQuestionChoice';
    
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    
    questionDiv.innerHTML = `
        <div class="question-number">Вопрос ${currentQuestionIndex + 1} из ${allQuestions.length}</div>
        <h3>${question.question}</h3>
        <div class="answers" id="answersContainerChoice"></div>
        <button class="btn-primary" id="submitChoiceBtn">Отправить</button>
        <div class="quiz-feedback" id="quizFeedbackChoice" style="display: none;">
            <p class="feedback-text" id="feedbackTextChoice"></p>
            <button class="btn-primary" id="nextQuestionBtn">${isLastQuestion ? 'Результаты теста' : 'Далее'}</button>
        </div>
    `;
    
    container.appendChild(questionDiv);
    
    const answersContainer = document.getElementById('answersContainerChoice');
    selectedAnswer = null;
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswerChoice(index, button);
        answersContainer.appendChild(button);
    });
    
    document.getElementById('submitChoiceBtn').onclick = submitAnswerChoice;
    document.getElementById('nextQuestionBtn').onclick = nextQuestion;
}

function selectAnswerChoice(selectedIndex, button) {
    if (!quizActive) return;
    const allButtons = document.querySelectorAll('#answersContainerChoice .answer-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedAnswer = selectedIndex;
}

function submitAnswerChoice() {
    if (selectedAnswer === null) {
        alert('Пожалуйста, выберите вариант ответа!');
        return;
    }
    
    const question = allQuestions[currentQuestionIndex];
    const allButtons = document.querySelectorAll('#answersContainerChoice .answer-btn');
    const submitBtn = document.getElementById('submitChoiceBtn');
    
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.classList.remove('selected');
    });
    submitBtn.style.display = 'none';
    
    if (selectedAnswer === question.correct) {
        allButtons[selectedAnswer].classList.add('correct');
        score++;
    } else {
        allButtons[selectedAnswer].classList.add('wrong');
        allButtons[question.correct].classList.add('correct');
    }
    
    const feedbackDiv = document.getElementById('quizFeedbackChoice');
    const feedbackText = document.getElementById('feedbackTextChoice');
    
    if (selectedAnswer === question.correct) {
        feedbackDiv.className = 'quiz-feedback success';
        feedbackText.className = 'feedback-text success';
        feedbackText.textContent = '✅ Правильно!';
    } else {
        feedbackDiv.className = 'quiz-feedback error';
        feedbackText.className = 'feedback-text error';
        feedbackText.textContent = `❌ Неправильно. Правильный ответ: ${question.answers[question.correct]}`;
    }
    
    feedbackDiv.style.display = 'block';
}

// ===== ВОПРОС НА СОПОСТАВЛЕНИЕ =====
function renderMatchQuestion(question, container) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.id = 'quizQuestionMatch';
    
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    
    // Создаем HTML для пар
    let rowsHTML = '';
    question.pairs.forEach((pair, index) => {
        rowsHTML += `
            <div class="match-row-vertical">
                <div class="match-cell-base image-match" data-id="${index}">
                    <div class="match-cell-image">${pair.leftImage}</div>
                    <div class="match-cell-label">${pair.left}</div>
                </div>
                <div class="match-cell-drop" data-id="${index}" data-expected="${pair.right}">
                    <span class="drop-zone-placeholder">Перетащите сюда</span>
                </div>
            </div>
        `;
    });
    
    questionDiv.innerHTML = `
        <div class="question-number">Вопрос ${currentQuestionIndex + 1} из ${allQuestions.length}</div>
        <h3>${question.title}</h3>
        <p class="match-instruction">${question.instruction}</p>
        
        <div class="match-source-panel">
            <div class="match-source-title">Перетащите в таблицу:</div>
            <div class="match-items-container" id="matchAuthorsContainer"></div>
        </div>
        
        <div class="match-table-vertical">
            <div class="match-table-header">
                <div class="match-col-header">${question.pairs[0].left.includes('Кот') ? 'Литературные коты' : 'Художник'}</div>
                <div class="match-col-header">${question.pairs[0].left.includes('Кот') ? 'Автор' : 'Картина'}</div>
            </div>
            <div class="match-table-body">
                ${rowsHTML}
            </div>
        </div>
        
        <button class="btn-primary" id="submitMatchBtn">Отправить</button>
        <div class="quiz-feedback" id="quizFeedbackMatch" style="display: none;">
            <p class="feedback-text" id="feedbackTextMatch"></p>
            <button class="btn-primary" id="nextQuestionBtn">${isLastQuestion ? 'Результаты теста' : 'Далее'}</button>
        </div>
    `;
    
    container.appendChild(questionDiv);
    
    // Инициализация перетаскиваемых элементов
    const authorsContainer = document.getElementById('matchAuthorsContainer');
    const dropZones = document.querySelectorAll('.match-cell-drop');
    
    matchSubmitted = false;
    
    // Перемешиваем правые элементы (ответы)
    const shuffledPairs = [...question.pairs].sort(() => Math.random() - 0.5);
    
    shuffledPairs.forEach((pair, index) => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.draggable = true;
        div.innerHTML = `
            <span class="match-item-image">${pair.rightImage}</span>
            <span class="match-item-text">${pair.right}</span>
        `;
        div.dataset.value = pair.right;
        div.dataset.id = index;
        
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        div.addEventListener('touchstart', handleTouchStart, { passive: false });
        div.addEventListener('touchmove', handleTouchMove, { passive: false });
        div.addEventListener('touchend', handleTouchEnd);
        
        authorsContainer.appendChild(div);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
    
    document.getElementById('submitMatchBtn').onclick = submitAnswerMatch;
    document.getElementById('nextQuestionBtn').onclick = nextQuestion;
}

function handleDragStart(e) {
    if (matchSubmitted) {
        e.preventDefault();
        return;
    }
    draggedItem = this;
    draggedFromZone = this.parentElement;
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify({
        value: this.dataset.value,
        id: this.dataset.id,
        innerHTML: this.innerHTML
    }));
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd() {
    if (this) this.classList.remove('dragging');
    draggedItem = null;
    draggedFromZone = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!matchSubmitted) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (matchSubmitted) return;
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const targetZone = this;
    const sourceZone = draggedFromZone;
    
    // Если зона уже заполнена - меняем местами
    if (targetZone.classList.contains('filled')) {
        const existingItem = targetZone.querySelector('.match-item.placed');
        
        if (existingItem && sourceZone) {
            const newItem = createMatchItem(data.value, data.innerHTML);
            
            targetZone.innerHTML = '';
            targetZone.appendChild(newItem);
            
            sourceZone.innerHTML = '';
            sourceZone.appendChild(existingItem);
            existingItem.classList.add('placed');
            
            setupItemHandlers(existingItem);
            setupItemHandlers(newItem);
            
            return;
        }
    }
    
    // Если зона пустая - просто перемещаем
    if (!targetZone.classList.contains('filled')) {
        const newItem = createMatchItem(data.value, data.innerHTML);
        targetZone.innerHTML = '';
        targetZone.appendChild(newItem);
        targetZone.classList.add('filled');
        
        setupItemHandlers(newItem);
        
        if (sourceZone && sourceZone.id === 'matchAuthorsContainer') {
            draggedItem.classList.add('used');
            draggedItem.draggable = false;
        }
    }
}

function createMatchItem(value, innerHTML) {
    const div = document.createElement('div');
    div.className = 'match-item placed';
    div.innerHTML = innerHTML;
    div.dataset.value = value;
    return div;
}

function setupItemHandlers(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('touchstart', handleTouchStart, { passive: false });
    item.addEventListener('touchmove', handleTouchMove, { passive: false });
    item.addEventListener('touchend', handleTouchEnd);
}

// Touch support для мобильных
function handleTouchStart(e) {
    if (matchSubmitted) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    touchItem = this;
    draggedFromZone = this.parentElement;
    this.classList.add('dragging');
    
    touchClone = this.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.opacity = '0.8';
    touchClone.style.zIndex = '10000';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.width = this.offsetWidth + 'px';
    touchClone.style.left = '-9999px';
    document.body.appendChild(touchClone);
    
    moveTouchClone(e.touches[0]);
}

function handleTouchMove(e) {
    e.preventDefault();
    if (touchClone) {
        moveTouchClone(e.touches[0]);
        
        const touch = e.touches[0];
        const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
        document.querySelectorAll('.match-cell-drop').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        elements.forEach(el => {
            if (el.classList.contains('match-cell-drop') && !matchSubmitted) {
                el.classList.add('drag-over');
            }
        });
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (touchClone) {
        const touch = e.changedTouches[0];
        const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
        
        let targetZone = null;
        elements.forEach(el => {
            if (el.classList.contains('match-cell-drop') && !matchSubmitted) {
                targetZone = el;
            }
        });
        
        if (targetZone) {
            const sourceZone = draggedFromZone;
            
            if (targetZone.classList.contains('filled')) {
                const existingItem = targetZone.querySelector('.match-item.placed');
                
                if (existingItem && sourceZone) {
                    const newItem = createMatchItem(
                        touchItem.dataset.value,
                        touchItem.innerHTML
                    );
                    
                    targetZone.innerHTML = '';
                    targetZone.appendChild(newItem);
                    setupItemHandlers(newItem);
                    
                    sourceZone.innerHTML = '';
                    sourceZone.appendChild(existingItem);
                    existingItem.classList.add('placed');
                    setupItemHandlers(existingItem);
                }
            } else {
                const newItem = createMatchItem(
                    touchItem.dataset.value,
                    touchItem.innerHTML
                );
                targetZone.innerHTML = '';
                targetZone.appendChild(newItem);
                targetZone.classList.add('filled');
                setupItemHandlers(newItem);
                
                if (sourceZone && sourceZone.id === 'matchAuthorsContainer') {
                    touchItem.classList.add('used');
                    touchItem.draggable = false;
                }
            }
        }
        
        document.body.removeChild(touchClone);
        touchClone = null;
    }
    
    if (touchItem) {
        touchItem.classList.remove('dragging');
        touchItem = null;
    }
    
    document.querySelectorAll('.match-cell-drop').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    draggedFromZone = null;
}

function moveTouchClone(touch) {
    if (touchClone) {
        touchClone.style.left = (touch.clientX - touchClone.offsetWidth / 2) + 'px';
        touchClone.style.top = (touch.clientY - touchClone.offsetHeight / 2) + 'px';
    }
}

function submitAnswerMatch() {
    if (matchSubmitted) return;
    
    const dropZones = document.querySelectorAll('.match-cell-drop');
    let correct = 0;
    let allFilled = true;
    
    dropZones.forEach(zone => {
        const item = zone.querySelector('.match-item.placed');
        if (!item) allFilled = false;
    });
    
    const feedbackDiv = document.getElementById('quizFeedbackMatch');
    const feedbackText = document.getElementById('feedbackTextMatch');
    
    if (!allFilled) {
        feedbackDiv.className = 'quiz-feedback error';
        feedbackText.className = 'feedback-text error';
        feedbackText.textContent = 'Заполните все ячейки!';
        feedbackDiv.style.display = 'block';
        return;
    }
    
    matchSubmitted = true;
    
    // Блокируем все элементы
    dropZones.forEach(zone => {
        zone.classList.add('locked');
        const item = zone.querySelector('.match-item.placed');
        if (item) {
            item.classList.add('locked');
        }
    });
    
    const authorsContainer = document.getElementById('matchAuthorsContainer');
    authorsContainer.querySelectorAll('.match-item').forEach(item => {
        item.classList.add('locked');
        item.draggable = false;
    });
    
    // Проверяем правильность
    dropZones.forEach(zone => {
        const item = zone.querySelector('.match-item.placed');
        if (item) {
            const expectedValue = zone.dataset.expected;
            if (item.dataset.value === expectedValue) {
                correct++;
                zone.classList.add('correct');
                item.classList.add('correct-answer');
            } else {
                zone.classList.add('wrong');
                item.classList.add('wrong-answer');
            }
        }
    });
    
    // Расчет баллов: 1 балл если >= 75% правильно
    const percentage = (correct / dropZones.length) * 100;
    if (percentage >= 75) {
        score += 1;
    }
    
    // Показываем статистику
    const statsDiv = document.createElement('div');
    statsDiv.className = `match-stats ${correct === dropZones.length ? 'correct' : 'error'}`;
    statsDiv.innerHTML = `Правильно: <strong>${correct}</strong> из <strong>${dropZones.length}</strong> пар (${Math.round(percentage)}%)`;
    feedbackDiv.appendChild(statsDiv);
    
    // Если 2 или более ошибок, показываем правильные ответы
    const wrongCount = dropZones.length - correct;
    if (wrongCount >= 2) {
        const question = allQuestions[currentQuestionIndex];
        const correctAnswersDiv = document.createElement('div');
        correctAnswersDiv.className = 'correct-answers-list';
        
        let correctHTML = '<h4>✅ Правильные пары:</h4><ul>';
        question.pairs.forEach(pair => {
            correctHTML += `<li class="correct-pair">${pair.leftImage} ${pair.left} — ${pair.rightImage} ${pair.right}</li>`;
        });
        correctHTML += '</ul>';
        
        correctAnswersDiv.innerHTML = correctHTML;
        feedbackDiv.appendChild(correctAnswersDiv);
    }
    
    // Показываем обратную связь
    if (correct === dropZones.length) {
        feedbackDiv.className = 'quiz-feedback success';
        feedbackText.className = 'feedback-text success';
        feedbackText.textContent = '✅ Все верно! Молодец!';
    } else {
        feedbackDiv.className = 'quiz-feedback error';
        feedbackText.className = 'feedback-text error';
    }
    
    feedbackDiv.style.display = 'block';
    document.getElementById('submitMatchBtn').style.display = 'none';
}

// ===== ПЕРЕХОД К СЛЕДУЮЩЕМУ ВОПРОСУ ИЛИ РЕЗУЛЬТАТАМ =====
function nextQuestion() {
    currentQuestionIndex++;
    showCurrentQuestion();
}

// ===== РЕЗУЛЬТАТЫ =====
function showResult() {
    const totalQuestions = allQuestions.length;
    
    document.getElementById('quizQuestionContainer').innerHTML = '';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('scoreValue').textContent = score;
    document.querySelector('.score-label').textContent = `из ${totalQuestions}`;
    
    const percentage = (score / totalQuestions) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Великолепно! Вы настоящий эксперт по кошкам!';
    } else if (percentage >= 70) {
        message = 'Отличный результат! Вы хорошо разбираетесь в теме!';
    } else if (percentage >= 40) {
        message = 'Неплохо! Но есть куда расти!';
    } else {
        message = 'Стоит ещё почитать о кошках в Эрмитаже!';
    }
    
    document.getElementById('resultMessage').textContent = message;
    quizActive = false;
}

function restartQuiz() {
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    matchSubmitted = false;
}

// ===== Плавная прокрутка =====
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Анимация при скролле =====
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

document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== ГАМБУРГЕР-МЕНЮ =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const navigation = document.getElementById('navigation');

// Показываем/скрываем гамбургер при скролле
window.addEventListener('scroll', () => {
    // Получаем позицию навигации относительно верха экрана
    const navRect = navigation.getBoundingClientRect();
    const navHeight = navigation.offsetHeight;
    
    // Проверяем, ушла ли навигация полностью за верхний край экрана
    if (navRect.bottom < 0) {
        // Навигация скрылась - показываем гамбургер
        navigation.classList.add('scrolled');
        hamburgerBtn.style.display = 'flex';
    } else {
        // Навигация видна - скрываем гамбургер
        navigation.classList.remove('scrolled');
        hamburgerBtn.style.display = 'none';
        dropdownMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
    }
});

// Открытие/закрытие меню
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
    }
});