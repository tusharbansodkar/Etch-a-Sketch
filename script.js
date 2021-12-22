
// function to settingup the grid
function createGrid(num) {

    for (let i = 0; i < num; i++) {
        let row = document.createElement('div');
        container.appendChild(row).className = 'row';
        row.style.height = `${500 / num}px`;
    }

    const rows = document.querySelectorAll('.row');

    for (let j = 0; j < num; j++) {

        rows.forEach(item => {
            let column = document.createElement('div');
            item.appendChild(column).className = "cell";
            column.style.width = `${500 / num}px`;
        })
    }


}





// function to clear the grid 
function clearGrid() {

    const theRows = document.querySelectorAll('.row');
    theRows.forEach(item => container.removeChild(item));

}


// adding color to cells based on current mode
function coloringCells(color) {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(item => item.addEventListener('mouseover', function () {
        if (currentMode === 'color') {
            item.style.background = color;
        }
        else if (currentMode === 'rainbow') {
            let randomClr = clrGenerator();
            item.style.background = randomClr;
        }
        else if (currentMode === 'eraser') {
            item.style.background = 'none';
        }
    }))

}

// generates random color
function clrGenerator() {
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);

    return `rgb(${R}, ${G}, ${B})`;
}

// setting the active button
function activeBtn(newMode) {
    if (newMode === 'color') {
        colorBtn.classList.add('active');
    }
    else if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    }
    else if (newMode === 'eraser') {
        eraser.classList.add('active');
    }
}

// removing the previous active button
function removeCurrentMode(currentMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    }
    else if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    }
    else if (currentMode === 'eraser') {
        eraser.classList.remove('active');
    }
}



// naming default values
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;

// grabbing the grid container
const container = document.querySelector('.container');


// setting current mode
let currentMode = DEFAULT_MODE;
function setMode(newMode) {
    currentMode = newMode;
}

// grabbig the buttons
const colorBtn = document.querySelector('#colorMode');
const rainbowBtn = document.querySelector('#rainbowMode')
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');

// getting the color value from color picker
const colorPicker = document.querySelector('#colorPicker');
let colorValue = `${DEFAULT_COLOR}`;
colorPicker.addEventListener('input', () => {
    colorValue = colorPicker.value;
    removeCurrentMode(currentMode);
    activeBtn('color');
    setMode('color');
    coloringCells(colorValue);
})




colorBtn.addEventListener('click', () => {
    removeCurrentMode(currentMode);
    activeBtn('color');
    setMode('color');
    coloringCells(colorValue);
});

rainbowBtn.addEventListener('click', () => {
    removeCurrentMode(currentMode);
    activeBtn('rainbow');
    setMode('rainbow');
    coloringCells();

});

eraserBtn.addEventListener('click', () => {
    removeCurrentMode(currentMode);
    activeBtn('eraser');
    setMode('eraser');
    coloringCells();
});

clearBtn.addEventListener('click', () => {
    clearGrid();
    createGrid(slider.value);
    coloringCells(colorValue);
})


// funtionality for range slider
const slider = document.querySelector('.slider');
const value = document.querySelector('#value');
value.textContent = slider.value;


slider.addEventListener('input', function () {
    value.textContent = this.value;
    clearGrid();
    createGrid(this.value);
    coloringCells(colorValue)

})


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activeBtn(DEFAULT_MODE);
    coloringCells(DEFAULT_COLOR);
};

