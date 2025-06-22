const display = document.getElementById('display');

// Основные функции
function addToDisplay(value) {
    if (display.textContent === '0' || display.classList.contains('error')) {
        display.textContent = value;
        display.classList.remove('error');
    } else {
        display.textContent += value;
    }
}

function clearDisplay() {
    display.textContent = '0';
    display.classList.remove('error');
}

function calculate() {
    try {
        let expression = display.textContent
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        if (!expression) return;
        
        const result = new Function('return ' + expression)();
        
        if (!isFinite(result)) {
            throw new Error('Деление на ноль');
        }
        
        display.textContent = result;
    } catch (error) {
        display.textContent = 'Ошибка';
        display.classList.add('error');
    }
}

// Обработка ввода с клавиатуры
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (/[0-9\.\+\-\*\/]/.test(key)) {
        addToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1) || '0';
    }
    
    if (/[0-9\.\+\-\*\/]/.test(key)) {
        e.preventDefault();
    }
});