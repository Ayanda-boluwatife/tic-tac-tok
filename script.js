
const player1Info = document.querySelector("#player1-info");
const player2Info = document.querySelector("#player2-info");
const statusEl = document.querySelector("#status-el");
const boxes = document.querySelectorAll("[class=box]")
const box1 = document.querySelector("#box-1");
const box2 = document.querySelector("#box-2");
const box3 = document.querySelector("#box-3");
const box4 = document.querySelector("#box-4");
const box5 = document.querySelector("#box-5");
const box6 = document.querySelector("#box-6");
const box7 = document.querySelector("#box-7");
const box8 = document.querySelector("#box-8");
const box9 = document.querySelector("#box-9");
const restartBtn = document.querySelector("#restart-btn");

let symbol = `
    <svg class="icon" id="icon-cross">
        <use xlink:href="images/icons.svg#icon-cross"></use>
    </svg>
`;
let symbol1 = `
    <svg class="icon" id="icon-cross">
        <use xlink:href="images/icons.svg#icon-cross"></use>
    </svg>
`;
let symbol2 = `
    <svg class="icon" id="icon-circle">
        <use xlink:href="images/icons.svg#icon-circle"></use>
    </svg>
`;
let count = 0;
let win = false;
let occupiedBoxes = [];

player1Info.innerHTML += symbol1;
player2Info.innerHTML += symbol2;
renderStatus();


const playerVsPlayer = function(box) {
    // placing the symbol
    placeSymbol(box);

    // checking for matches
    if (count >= 5) {
        checkForMatches();
    }

    // Switching the symbol so it's the other player's turn next
    switchSymbol(box);

    // displaying the status of the game at the current moment in the statusEl
    renderStatus(); 

}

boxes.forEach((box) => {
    box.addEventListener("click", function() {
        playerVsPlayer(box);
    })
})

restartBtn.addEventListener("click", function() {
    boxes.forEach(box => {
        box.innerHTML = "";
    })
    count = 0;
    win = false;
    renderStatus();
})

function placeSymbol(box) {

    if (box.textContent === "" && !win) {
        box.innerHTML = symbol;
        count += 1;
    }
}

function checkForMatches() {

    if ((box1.innerHTML===box5.innerHTML && box5.innerHTML===box9.innerHTML && box9.innerHTML===symbol) 
        || (box3.innerHTML===box5.innerHTML && box5.innerHTML===box7.innerHTML && box7.innerHTML===symbol) 
        || (box1.innerHTML===box2.innerHTML && box2.innerHTML===box3.innerHTML && box3.innerHTML===symbol) 
        || (box1.innerHTML===box4.innerHTML && box4.innerHTML===box7.innerHTML && box7.innerHTML===symbol) 
        || (box7.innerHTML===box8.innerHTML && box8.innerHTML===box9.innerHTML && box9.innerHTML===symbol) 
        || (box3.innerHTML===box6.innerHTML && box6.innerHTML===box9.innerHTML && box9.innerHTML===symbol) 
        || (box2.innerHTML===box5.innerHTML && box5.innerHTML===box8.innerHTML && box8.innerHTML===symbol) 
        || (box4.innerHTML===box5.innerHTML && box5.innerHTML===box6.innerHTML && box6.innerHTML===symbol)) {
            win = true;
        }
}

function switchSymbol(box) {
    switch(box.innerHTML) {
        case symbol1: 
            symbol = symbol2;
            break;
        case symbol2: symbol = symbol1;
    }
}

function renderStatus() {

    if (win) {
        // reswitching the symbol as it was switched after the last move
        if (symbol===symbol1) {
            statusEl.innerHTML = `${symbol2} <span>Won!</span>`;
        } else {
            statusEl.innerHTML = `${symbol1} <span>Won!</span>`;
        }
    } else if (count===9 && !win) {
        statusEl.innerHTML = `It's a Draw`;
    } else {
        statusEl.innerHTML = `${symbol} <span>Turn</span>`;
    }
}

// Computer Plays
function RandomPosition() {
    return Math.floor((Math.random() * 9 + 1));
}

function computerMove(box) {
    let position;
        do {
            position = RandomPosition();
        } while("box-" + position === box.id || occupiedBoxes.indexOf(position) !== -1);
        occupiedBoxes.push(position);
        
        boxes.forEach(box => {
            if (box.id === "box-" + position) {
                placeSymbol(box);
                if (count >= 5) {
                    checkForMatches();
                }
                switchSymbol(box);
                renderStatus();
            }
        })
}


// Color Theme
const colorThemes = document.querySelectorAll("[name=theme]");
const defaultTheme = document.querySelector("#light");

// Retrieve the stored theme
document.onload = retrieveTheme();

colorThemes.forEach((option) => {
    option.addEventListener("click", function() {
        // Store theme
        storeTheme(option.id);
        // Set Theme
        setTheme(option.id);
        
    })
})

function storeTheme(theme) {
    localStorage.setItem("theme", theme);
}

function setTheme(theme) {
    document.documentElement.className = theme;
}

function retrieveTheme() {
    const activeTheme = localStorage.getItem("theme");
    if (activeTheme) {
        colorThemes.forEach((option) => {
            if (option.id === activeTheme) {
                option.checked = true;
            }
        })
        setTheme(activeTheme);
    } else {
        // set the default theme as there is no stored active theme i.e activeTheme === null
        defaultTheme.checked = true;
        setTheme(defaultTheme.id);
    }
}
