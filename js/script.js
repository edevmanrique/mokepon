//It starts the game after DOM is generated correctly
const petButton = document.getElementById('select-pet__fight');
petButton.addEventListener('click', generateMap);

//Setting HTML sections
const startSection = document.getElementById('start');
const petsSection = document.getElementById('select-pet');
petsSection.style.display = 'none';
const mapSection = document.getElementById('map');
mapSection.style.display = 'none';
const movementsSection = document.getElementById('select-attack');
movementsSection.style.display = 'none';
const messagesSection = document.getElementById('messages');
messagesSection.style.display = 'none';
const resetSection = document.getElementById('reset');
resetSection.style.display = 'none';

let playerId;

//Setting canvas
const map = document.getElementById('map__canvas');

//Variables to save selected mokepons
let selectedPlayerMokepon;
let selectedEnemyMokepon;

//Setting pets names
const playerPetName = document.getElementById('select-attack__my-pet');
const enemyPetName = document.getElementById('select-attack__enemy-pet');

//Setting pets buttons to choose
let firePet;
let electricPet;
let darkPet;
let fireElectricPet;
let fireDarkPet;
let electricDarkPet;

//Setting player movements
let playerAttackMovement;
let playerRegenerationMovement;
let playerProtectionMovement;

//Setting enemy movements
let enemyAttackMovement;
let enemyRegenerationMovement;
let enemyProtectionMovement;

//Setting canvas variable
let canvas = map.getContext('2d');
let interval;

//Setting start button
const startButton = document.getElementById('start__button')
startButton.addEventListener('click', start)

//Setting variables to get mokepons image
const imgPlayerPet = document.getElementById('select-attack__images_player-pet');
const imgEnemyPet = document.getElementById('select-attack__images_enemy-pet');

//Setting movements buttons
const attackMovementButton = document.getElementById('select-attack__fire')
attackMovementButton.addEventListener('click', playerPetAttackMovement)

const healingMovementButton = document.getElementById('select-attack__electric')
healingMovementButton.disabled = true;
healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
healingMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
healingMovementButton.addEventListener('click', playerPetHealingMovement)

const protectionMovementButton = document.getElementById('select-attack__darkness')
protectionMovementButton.addEventListener('click', playerPetDefendMovement)

//Setting reset button
const resetButton = document.getElementById('reset__button');
resetButton.addEventListener('click', resetGame)

//Setting the pets' hearts
let playerPetHearts;
let enemyPetHearts;

//Setting limits
let maximumPlayerPetHearts;
let maximumEnemyPetHearts;

//We get the span with the hearts to update them after a movement
const playerPetLife = document.getElementById('select-attack__my-pet-hearts')
const enemyPetLife = document.getElementById('select-attack__enemy-pet-hearts')

//Const
const spanHearts = document.getElementById('select-attack__my-pet-container')

//Blocks to guard movement
const playerGuard = document.getElementById('select-attack__my-mokepon-card_info')
const enemyGuard = document.getElementById('select-attack__enemy-mokepon-card_info')

//Shield images
const playerShield = document.getElementById('select-attack__pet-shield')
const enemyShield = document.getElementById('select-attack__enemy-pet-shield')

//Textareas to display battle messages/history
const playerMessages = document.getElementById('messages__playerPet')
const enemyMessages = document.getElementById('messages__enemyPet')

//Variables to know when a pet uses protection movement
let playerPetProtection;
let enemyPetProtection;

//Variables to save pets elements
let playerPetElement;
let enemyPetElement;

//Variables to save pets stats
let playerPetStrength;
let playerPetMagic;
let enemyPetStrength;
let enemyPetMagic;

//Buttons to Canvas
let moveMokeponTopButton;
let moveMokeponLeftButton;
let moveMokeponRightButton;
let moveMokeponBottomButton;
let backgroundMap = new Image();
backgroundMap.src = './img/mokemap-big.png'
let reverseMokepon;

//Variable to enemies in the map
let enemies = [];
let currentEnemy;

//Setting limits in the map
let leftLimit;
let rightLimit;

//Player coordinates
let upPlayer;
let bottomPlayer;
let leftPlayer;
let rightPlayer;

//Check if it is colliding with objects
let isCollidingLeft = false;
let isCollidingRight = false;
let isCollidingTop = false;
let isCollidingBottom = false;

//Making the map responsive
let currentMapWidth = window.innerWidth - 40;
let currentMapHeight = window.innerHeight;
let mapHeightResponsive = currentMapWidth * 600 / 800;
const mapMaxWidth = 1100;
const mapMaxHeight = 600;

if(currentMapWidth > mapMaxWidth){
    currentMapWidth = mapMaxWidth - 20;
}

if(currentMapHeight > mapMaxHeight){
    mapHeightResponsive = mapMaxHeight;
}

map.width = currentMapWidth;
map.height = mapHeightResponsive;

//To move player 1 icon
let playerOneIcon = {
    icon: new Image(),
    x: map.width / 2 - ((map.width / 2) * .05),
    y: window.innerHeight * .01,
    width: map.width * 0.07,
    height: map.width * 0.07
}

playerOneIcon.icon.src = './img/p1-icon.png'

//Class to create Mokepons
class Mokepon {
    constructor(name, element, image, life, protection, movements, strength, magic, x = (map.width / 2 - (map.width / 2) * .04), y = map.height * .1) {
        this.name = name;
        this.element = element;
        this.image = image;
        this.life = life;
        this.protection = protection;
        this.movements = movements;
        this.strength = strength;
        this.magic = magic;
        this.type = element.length > 1 ? 'Hybrid' : 'Common';
        this.x = x;
        this.y = y;
        this.width = map.width * 0.07;
        this.height = map.width * 0.07;
        this.mapImage = new Image();
        this.mapImage.src = image;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    drawMokepon() {
        canvas.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    drawEnemy() {
        canvas.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

//Creating Mokepons

//Unique element
let burntrack = new Mokepon('Burntrack', ['Fire'], './img/burntrack-no-platform.png', 8, false, ['Magma Storm', 'Overheat', 'Sunny Day'], 2, 1);
let glitch = new Mokepon('Glitch', ['Electric'], './img/glitch-no-platform.png', 5, false, ['Thunder Punch', 'Overdrive', 'Charge Beam'], 1, 1);
let mortus = new Mokepon('Mortus', ['Dark'], './/img/mortus-no-platform.png', 7, false, ['Dark Pulse', 'Crunch', 'False Surrender'], 1, 2);

//Hybrids
let inferstorm = new Mokepon('Inferstorm', ['Fire', 'Electric'], './img/inferstorm-no-platform.png', 15, false, ['Hot Lightning', 'Fast Fireball', 'Magray'], 2, 1);
let blazen = new Mokepon('Blazen', ['Fire', 'Dark'], './/img/blazen-no-platform.png', 17, true, ['Dark Light', 'Negative Eruption', 'Mystical Fire'], 3, 2);
let thunneg = new Mokepon('Thunneg', ['Electric', 'Dark'], './img/thunneg-no-platform.png', 12, false, ['Infinite Storm', 'Electro Darkness', 'Last Flash'], 1, 2);

let mokepons = [burntrack, glitch, mortus, inferstorm, blazen, thunneg]

function start() {
    startSection.style.display = 'none'
    petsSection.style.display = 'flex';
    const commonCardDiv = document.getElementById("cards__common");
    const hybridCardDiv = document.getElementById("cards__hybrid");
    let mokeponCard;
    let counter = 1;

    mokepons.forEach((mokepon) => {

        if (mokepon.type == 'Common') {
            mokeponCard = `
            <input type="radio" name="pets" id="${mokepon.name.toLowerCase()}" value="${mokepon.name}"
            `
            if (counter == 1) {
                mokeponCard += `checked`;
            }

            mokeponCard += `
            />
            <label class="cards__mokepon-card ${mokepon.name.toLowerCase()}" for="${mokepon.name.toLowerCase()}">
                <div class="cards__mokepon-card_info">
                    <p>${mokepon.name}</p>
                    <div class="cards__mokepon-card_element">
                        <img src="./img/${mokepon.element[0].toLowerCase()}.png" alt="Icon of the ${mokepon.name.toLowerCase()} element">
                        <p class="cards__mokepon-card_element-description">${mokepon.element[0]}</p>
                    </div>
                </div>
                <img class="cards__mokepon-card_image" src="./img/${mokepon.name.toLowerCase()}.png" alt="">
            </label>
        `;


            commonCardDiv.innerHTML += mokeponCard;
        } else {
            mokeponCard = `
            <input type="radio" name="pets" id="${mokepon.name.toLowerCase()}" value="${mokepon.name}"/>
            <label class="cards__mokepon-card ${mokepon.name.toLowerCase()}" for="${mokepon.name.toLowerCase()}">
                <div class="cards__mokepon-card_info">
                    <p>${mokepon.name}</p>
                    <div class="cards__mokepon-card_element">
                        <img src="./img/${mokepon.element[0].toLowerCase()}.png" alt="Icon of the ${mokepon.name.toLowerCase()} element">
                        <img src="./img/${mokepon.element[1].toLowerCase()}.png" alt="Icon of the ${mokepon.name.toLowerCase()} second element">
                        <p class="cards__mokepon-card_element-description">${mokepon.element[0]}</p>
                    </div>
                </div>
                <img class="cards__mokepon-card_image" src="./img/${mokepon.name.toLowerCase()}.png" alt="">
            </label>
            `
            hybridCardDiv.innerHTML += mokeponCard;
        }
        counter++;

    })

    firePet = document.getElementById('burntrack')
    electricPet = document.getElementById('glitch')
    darkPet = document.getElementById('mortus')
    fireElectricPet = document.getElementById('inferstorm')
    fireDarkPet = document.getElementById('blazen')
    electricDarkPet = document.getElementById('thunneg')

    joinVideogame()
}

function joinVideogame(){
    fetch("http://127.0.0.1:8080/join")
        .then(function(ans) {
            if(ans.ok){
                ans.text()
                    .then(function (answer){
                        playerId = answer;
                    })
            }
        })
}

//Getting a random number between min and max parameters
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Getting two numbers to choose one depending of the Math.random() function result
function getTwoRandom(first, second) {
    if (Math.random() < 0.5) {
        return first;
    } else {
        return second;
    }
}

function saveMokepon(){
    fetch(`http://127.0.0.1:8080/mokepon/${playerId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mokepon: selectedPlayerMokepon.name
            })
        })
}

//We get the selected pet by the player
function selectPlayerPet() {
    mapSection.style.display = 'none';
    movementsSection.style.display = 'block';
    messagesSection.style.display = 'flex';
    playerMessages.style.display = 'none'
    enemyMessages.style.display = 'none'
    if (firePet.checked) {
        selectedPlayerMokepon = burntrack;
        preparingPet(1);
        updateHearts(1);
        GenerateEnemyPet();
    } else if (electricPet.checked) {
        selectedPlayerMokepon = glitch;
        preparingPet(1);
        updateHearts(1);
        GenerateEnemyPet();
    } else if (darkPet.checked) {
        selectedPlayerMokepon = mortus;
        preparingPet(1);
        updateHearts(1);
        GenerateEnemyPet();
    } else if (fireElectricPet.checked) {
        selectedPlayerMokepon = inferstorm;
        preparingPet(1);
        updateHearts(1);
        GenerateEnemyPet();
    } else if (fireDarkPet.checked) {
        selectedPlayerMokepon = blazen;
        preparingPet(1);
        updateHearts(1);
        updateButtons();
        GenerateEnemyPet();
    } else if (electricDarkPet.checked) {
        selectedPlayerMokepon = thunneg;
        preparingPet(1);
        updateHearts(1);
        GenerateEnemyPet();
    } else {
        alert('You have to select a pet');
    }
    updateButtons()
}

//We get a random pet to fight agains the computer
function GenerateEnemyPet() {
    preparingPet(2);
    updateHearts(2);
    updateHearts(3);
    getImages();
}

function preparingPet(n) {

    if (n == 1) {
        setMovementButtons(selectedPlayerMokepon.movements[0], selectedPlayerMokepon.movements[1], selectedPlayerMokepon.movements[2]);
        setName(selectedPlayerMokepon.name, 1)
        playerPetHearts = selectedPlayerMokepon.life;
        maximumPlayerPetHearts = selectedPlayerMokepon.life;
        playerPetProtection = selectedPlayerMokepon.protection;
        playerPetElement = selectedPlayerMokepon.element[0];
        playerPetStrength = selectedPlayerMokepon.strength;
        playerPetMagic = selectedPlayerMokepon.magic;
    } else if (n == 2) {
        setMovement(selectedEnemyMokepon.movements[0], selectedEnemyMokepon.movements[1], selectedEnemyMokepon.movements[2], 2);
        setName(selectedEnemyMokepon.name, 2);
        enemyPetHearts = selectedEnemyMokepon.life;
        maximumEnemyPetHearts = selectedEnemyMokepon.life;
        enemyPetProtection = selectedEnemyMokepon.protection;
        enemyPetElement = selectedEnemyMokepon.element[0];
        enemyPetStrength = selectedEnemyMokepon.strength;
        enemyPetMagic = selectedEnemyMokepon.magic;
    }
}

function arrowDown(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveMokeponTopButton.style.backgroundColor = '#ff5252'
            moveMokeponTop();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveMokeponBottomButton.style.backgroundColor = '#ffe959'
            moveMokeponBottom();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveMokeponLeftButton.style.backgroundColor = '#7481f7'
            moveMokeponLeft();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveMokeponRightButton.style.backgroundColor = '#00fd54'
            moveMokeponRight();
            break;
    }
}

function arrowUp() {
    stopMokepon();
}

let check = [];
let myMokeponIndex = 0;

function getMyMokeponIndex() {
    let counter = 0;
    let found = false;

    mokepons.forEach(mokepon => {
        if (selectedPlayerMokepon.name == mokepon.name) {
            myMokeponIndex = counter;
            found = true;
        }

        if (!found) {
            counter++;
        }
    });
}

function generateEnemies() {
    let randomIndex;
    let counter = 0;

    getMyMokeponIndex();

    while (true) {
        while (true) {
            while (true) {
                randomIndex = Math.floor(Math.random() * mokepons.length);
                if (randomIndex !== myMokeponIndex) {
                    break;
                }
            }
            check.forEach(index => {
                if ((randomIndex !== index) && (randomIndex !== myMokeponIndex)) {
                    counter++;
                } else if ((randomIndex == index) || (randomIndex == myMokeponIndex)) {
                    counter = 0;
                }
            });

            if (counter == check.length) {
                break;
            } else {
                counter = 0;
            }
        }

        enemies.push(mokepons[randomIndex]);
        check.push(randomIndex);

        if (enemies.length >= 3) {
            break;
        }
    }

    enemies[0].x = map.width * .85;
    enemies[0].y = window.innerHeight * .22;
    enemies[1].x = map.width * .085;
    enemies[1].y = window.innerHeight * .20;
    enemies[2].x = (map.width / 2) * .95;
    enemies[2].y = window.innerHeight * .40;
}

function setCollisions() {
    leftLimit = { des: 'leftLimit', x1: 0, y1: 0, x2: map.width * .07, y2: map.height }
    rightLimit = { des: 'rightLimit', x1: map.width * .94, y1: 0, x2: map.width, y2: map.height }
    topLimitLeft = { des: 'topLimitLeft', x1: 0, y1: 0, x2: map.width / 2 - (map.width * 0.06), y2: map.height * .15 }
    topLimitRight = { des: 'topLimitRight', x1: map.width / 2 + (map.width * 0.06), y1: 0, x2: map.width, y2: 55 }
    bottomLimit = { des: 'bottomLimit', x1: 0, y1: map.height - (map.height * .25), x2: map.width, y2: map.height }
    topStartLimit = { des: 'topStartLimit', x1: map.width / 2 - 30, y1: 0, x2: map.width / 2 + 30, y2: 15 }
    firstHouseRightLimit = { des: 'firstHouseRightLimit', x1: 360, y1: 130, x2: 365, y2: 220 }
    firstHouseLeftLimit = { des: 'firstHouseLeftLimit', x1: 150, y1: 130, x2: 165, y2: 220 }
    firstHouseTopLimit = { des: 'firstHouseTopLimit', x1: 150, y1: 140, x2: 360, y2: 130 }
    firstHouseBottomLimit = { des: 'firstHouseBottomLimit', x1: 150, y1: 230, x2: 360, y2: 230 }
    secondHouseRightLimit = { des: 'secondHouseRightLimit', x1: 660, y1: 130, x2: 660, y2: 220 }
    secondHouseLeftLimit = { des: 'secondHouseLeftLimit', x1: 450, y1: 130, x2: 450, y2: 220 }
    secondHouseTopLimit = { des: 'secondHouseTopLimit', x1: 450, y1: 140, x2: 660, y2: 130 }
    secondHouseBottomLimit = { des: 'secondHouseBottomLimit', x1: 450, y1: 230, x2: 660, y2: 230 }
    laboratoryRightLimit = { des: 'laboratoryRightLimit', x1: 660, y1: 290, x2: 660, y2: 380 }
    laboratoryLeftLimit = { des: 'laboratoryLeftLimit', x1: 450, y1: 290, x2: 450, y2: 380 }
    laboratoryTopLimit = { des: 'laboratoryTopLimit', x1: 450, y1: 290, x2: 660, y2: 290 }
    laboratoryBottomLimit = { des: 'laboratoryBottomLimit', x1: 450, y1: 380, x2: 660, y2: 380 }
    fenceRightLimit = { des: 'fenceRightLimit', x1: 320, y1: 320, x2: 320, y2: 320 }
    fenceLeftLimit = { des: 'fenceLeftLimit', x1: 170, y1: 320, x2: 170, y2: 320 }
    fenceTopLimit = { des: 'fenceTopLimit', x1: 170, y1: 310, x2: 320, y2: 315 }
    fenceBottomLimit = { des: 'fenceBottomLimit', x1: 170, y1: 335, x2: 320, y2: 340 }
}

//We generate the map
function generateMap() {
    if (firePet.checked) {
        selectedPlayerMokepon = burntrack;
    } else if (electricPet.checked) {
        selectedPlayerMokepon = glitch;
    } else if (darkPet.checked) {
        selectedPlayerMokepon = mortus;
    } else if (fireElectricPet.checked) {
        selectedPlayerMokepon = inferstorm;
    } else if (fireDarkPet.checked) {
        selectedPlayerMokepon = blazen;
    } else if (electricDarkPet.checked) {
        selectedPlayerMokepon = thunneg;
    }
    saveMokepon()
    petsSection.style.display = 'none';
    mapSection.style.display = 'flex';

    //map.width = 800;
    //map.height = 600;

    setCollisions();

    interval = setInterval(drawCanvas, 50);
    window.addEventListener('keydown', arrowDown);
    window.addEventListener('keyup', arrowUp);

    generateEnemies();

    moveMokeponTopButton = document.getElementById('map__top-button');
    moveMokeponTopButton.addEventListener('mousedown', moveMokeponTop)
    moveMokeponTopButton.addEventListener('mouseup', stopMokepon)
    hoverButtonBG(1, moveMokeponTopButton, '#ff5252', 'white')
    hoverButtonBG(2, moveMokeponTopButton, '#ff2b2b', 'white')
    hoverButtonTS(1, moveMokeponTopButton, 'none', 'translateX(2px)')
    hoverButtonTS(2, moveMokeponTopButton, '2px 2px 1px rgb(158, 0, 0)', 'translateX(0px)')

    moveMokeponLeftButton = document.getElementById('map__left-button');
    moveMokeponLeftButton.addEventListener('mousedown', moveMokeponLeft)
    moveMokeponLeftButton.addEventListener('mouseup', stopMokepon)
    hoverButtonBG(1, moveMokeponLeftButton, '#7481f7', 'white')
    hoverButtonBG(2, moveMokeponLeftButton, '#2b40ff', 'white')
    hoverButtonTS(1, moveMokeponLeftButton, 'none', 'translateX(2px)')
    hoverButtonTS(2, moveMokeponLeftButton, '2px 2px 1px rgb(0, 45, 179)', 'translateX(0px)')

    moveMokeponRightButton = document.getElementById('map__right-button');
    moveMokeponRightButton.addEventListener('mousedown', moveMokeponRight)
    moveMokeponRightButton.addEventListener('mouseup', stopMokepon)

    hoverButtonBG(1, moveMokeponRightButton, '#00fd54', 'white')
    hoverButtonBG(2, moveMokeponRightButton, '#00a035', 'white')
    hoverButtonTS(1, moveMokeponRightButton, 'none', 'translateX(2px)')
    hoverButtonTS(2, moveMokeponRightButton, '2px 2px 1px rgb(0, 114, 10)', 'translateX(0px)')

    moveMokeponBottomButton = document.getElementById('map__bottom-button');
    moveMokeponBottomButton.addEventListener('mousedown', moveMokeponBottom)
    moveMokeponBottomButton.addEventListener('mouseup', stopMokepon)
    hoverButtonBG(1, moveMokeponBottomButton, '#ffe959', 'white')
    hoverButtonBG(2, moveMokeponBottomButton, '#e8d100', 'white')
    hoverButtonTS(1, moveMokeponBottomButton, 'none', 'translateX(2px)')
    hoverButtonTS(2, moveMokeponBottomButton, '2px 2px 1px rgb(0, 114, 10)', 'translateX(0px)')
}

function checkCollisions() {
    enemies.forEach(enemy => {
        checkCollisionEnemies(enemy);
    });

    checkCollisionObjects(leftLimit, 1);
    checkCollisionObjects(rightLimit, 2);
    checkCollisionObjects(topLimitLeft, 3);
    if (!isCollidingRight) {
        checkCollisionObjects(topLimitRight, 4);
    }
    checkCollisionObjects(bottomLimit, 5);
        checkCollisionObjects(topStartLimit, 6)
    //checkCollisionObjects(firstHouseRightLimit, 1);
    //checkCollisionObjects(secondHouseRightLimit, 1);
    //checkCollisionObjects(laboratoryRightLimit, 1);
    //checkCollisionObjects(fenceRightLimit, 1);
    //checkCollisionObjects(firstHouseLeftLimit, 2);
    //checkCollisionObjects(secondHouseLeftLimit, 2);
    //checkCollisionObjects(laboratoryLeftLimit, 2);
    //checkCollisionObjects(fenceLeftLimit, 2);
    //if (!isCollidingBottom) {
    //    checkCollisionObjects(firstHouseTopLimit, 7);
    //    checkCollisionObjects(secondHouseTopLimit, 7);
    //    checkCollisionObjects(laboratoryTopLimit, 7);
    //    checkCollisionObjects(fenceTopLimit, 7);
    //}
    //if (!isCollidingTop) {
    //    checkCollisionObjects(firstHouseBottomLimit, 8);
    //    checkCollisionObjects(secondHouseBottomLimit, 8);
    //    checkCollisionObjects(laboratoryBottomLimit, 8);
    //    checkCollisionObjects(fenceBottomLimit, 8);
    //}
}

function generatePlayerIcon(){
    canvas.drawImage(
        playerOneIcon.icon,
        playerOneIcon.x,
        playerOneIcon.y,
        playerOneIcon.width,
        playerOneIcon.height
    );
}

function savePosition(x, y){
    fetch(`http://127.0.0.1:8080/mokepon/${playerId}/position`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (ans) {
            if(ans.ok){
                ans.json()
                    .then(function ({ enemies }){
                        console.log(enemies)
                    })
            }
        })
}

function drawCanvas() {
    selectedPlayerMokepon.x += selectedPlayerMokepon.velocityX;
    playerOneIcon.x += selectedPlayerMokepon.velocityX;
    selectedPlayerMokepon.y += selectedPlayerMokepon.velocityY;
    playerOneIcon.y += selectedPlayerMokepon.velocityY;

    savePosition(selectedPlayerMokepon.x, selectedPlayerMokepon.y)

    canvas.clearRect(0, 0, map.width, map.height);

    canvas.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    )

    selectedPlayerMokepon.drawMokepon();
    generatePlayerIcon();

    enemies.forEach(enemy => {
        enemy.drawEnemy();
    });

    if (selectedPlayerMokepon.velocityX !== 0 || selectedPlayerMokepon.velocityY !== 0) {
        checkCollisions();
    }
}

function moveMokeponRight() {
    drawCanvas();
    if (!isCollidingRight) {
        selectedPlayerMokepon.velocityX = 5;
    }
    editStylesCanvas(moveMokeponRightButton, '#00fd54', 'none', '2px')
}

function moveMokeponLeft() {
    reverseMokepon = false;
    drawCanvas();
    if (!isCollidingLeft) {
        selectedPlayerMokepon.velocityX = -5;
    }
    editStylesCanvas(moveMokeponLeftButton, '#7481f7', 'none', '2px')
}

function moveMokeponTop() {
    if (!isCollidingTop) {
        selectedPlayerMokepon.velocityY = -5;
    }
    editStylesCanvas(moveMokeponTopButton, '#ff5252', 'none', '2px')
}

function moveMokeponBottom() {
    if (!isCollidingBottom) {
        selectedPlayerMokepon.velocityY = 5;
    }
    editStylesCanvas(moveMokeponBottomButton, '#ffe959', 'none', '2px')
}

function stopMokepon() {
    selectedPlayerMokepon.velocityX = 0;
    selectedPlayerMokepon.velocityY = 0;
    editStylesCanvas(moveMokeponTopButton, '#ff2b2b', '2px 2px 1px rgb(158, 0, 0)', '0px')
    editStylesCanvas(moveMokeponBottomButton, '#e8d100', '2px 2px 1px rgb(0, 114, 10)', '0px')
    editStylesCanvas(moveMokeponLeftButton, '#2b40ff', '2px 2px 1px rgb(0, 45, 179)', '0px')
    editStylesCanvas(moveMokeponRightButton, '#00a035', '2px 2px 1px rgb(0, 114, 10)', '0px')
}

function editStylesCanvas(btn, bg, bx, ml) {
    btn.style.backgroundColor = bg;
    btn.style.boxShadow = bx;
    btn.style.transform = `translateX(${ml})`;
}

//Checking collision with objects
function checkCollisionObjects(limit, n) {
    if (bottomPlayer < limit.y1 || upPlayer > limit.y2 || rightPlayer < limit.x1 || leftPlayer > limit.x2) {
        if (n == 1) {
            if (leftPlayer > limit.x2) {
                isCollidingLeft = false;
            }
        } else if (n == 2) {
            if (rightPlayer < limit.x1) {
                isCollidingRight = false;
            }
        } else if (n == 3) {
            if (leftPlayer > limit.x2) {
                isCollidingLeft = false;
            } if (upPlayer > limit.y2) {
                isCollidingTop = false;
            }
        } else if (n == 4) {
            if (rightPlayer > limit.x1) {
                isCollidingRight = false;
            } if (upPlayer > limit.y2) {
                isCollidingTop = false;
            }
        } else if (n == 5) {
            if (bottomPlayer < limit.y1) {
                isCollidingBottom = false;
            }
        } else if (n == 6) {
            if (upPlayer > limit.y2) {
                isCollidingTop = false;
            }
        } else if (n == 7) {
            if (bottomPlayer < limit.y2) {
                isCollidingBottom = false;
            }
        } else if (n == 8) {
            if (upPlayer > limit.y2) {
                isCollidingTop = false;
            }
        }
        return;
    } else {
        if (n == 1) {
            if (leftPlayer < limit.x2) {
                isCollidingLeft = true;
            }
        } else if (n == 2) {
            if (rightPlayer > limit.x1) {
                isCollidingRight = true;
            }
        } else if (n == 3) {
            if (leftPlayer < limit.x2) {
                isCollidingLeft = true;
            }
            if (upPlayer < limit.y2) {
                isCollidingTop = true;
            }
        } else if (n == 4) {
            if (rightPlayer > limit.x1) {
                isCollidingRight = true;
            }
            if (upPlayer < limit.y2) {
                isCollidingTop = true;
            }
        } else if (n == 5) {
            if (bottomPlayer >= limit.y1) {
                isCollidingBottom = true;
            }
        } else if (n == 6) {
            if (upPlayer < limit.y2) {
                isCollidingTop = true;
            }
        } else if (n == 7) {
            if (bottomPlayer > limit.y2) {
                isCollidingBottom = true;
            }
        } else if (n == 8) {
            if (upPlayer < limit.y2) {
                isCollidingTop = true;
            }
        }

        stopMokepon();
    }
}

//Checking collision with enemies
function checkCollisionEnemies(enemy) {
    selectedEnemyMokepon = enemy;
    const upEnemy = enemy.y;
    const bottomEnemy = enemy.y + enemy.height;
    const leftEnemy = enemy.x;
    const rightEnemy = enemy.x + enemy.width;

    upPlayer = selectedPlayerMokepon.y;
    bottomPlayer = selectedPlayerMokepon.y + selectedPlayerMokepon.height;
    leftPlayer = selectedPlayerMokepon.x;
    rightPlayer = selectedPlayerMokepon.x + selectedPlayerMokepon.width;

    if (bottomPlayer < upEnemy || upPlayer > bottomEnemy || rightPlayer < leftEnemy || leftPlayer > rightEnemy) {
        return;
    } else {
        stopMokepon();
        currentEnemy = enemy.name;
        alert(`${enemy.name} is your oponent`)
        selectPlayerPet();
    }
}

//Setting the movements buttons content
function setMovementButtons(attack, regeneration, protection) {
    attackMovementButton.value = attack;
    attackMovementButton.innerText = attack;

    healingMovementButton.value = regeneration;
    healingMovementButton.innerText = regeneration;

    protectionMovementButton.value = protection;
    protectionMovementButton.innerText = protection;
}

function getImages() {
    imgPlayerPet.setAttribute('src', './img/' + playerPetName.innerText.toLowerCase() + '.png')
    imgEnemyPet.setAttribute('src', './img/' + enemyPetName.innerText.toLowerCase() + '.png')
}

//We set the value of movements, n is to know if It's player or computer
function setMovement(attack, regeneration, protection, n) {
    if (n == 1) {
        playerAttackMovement = attack;
        playerRegenerationMovement = regeneration;
        playerProtectionMovement = protection;
    } else {
        enemyAttackMovement = attack;
        enemyRegenerationMovement = regeneration;
        enemyProtectionMovement = protection;
    }
}

/*We get the name of selectPlayerPet function to add it dynamically to the battle section
 * n variable is to know if is called by player or enemy
*/
function setName(name, n) {
    if (n == 1) {
        playerPetName.innerText = name;
    } else {
        enemyPetName.innerText = name;
    }
}

//These are the functions to define what happens with the player's movements
function playerPetAttackMovement() {
    playerMessages.style.display = 'flex'
    enemyMessages.style.display = 'flex'
    createMovementes(1, 1, attackMovementButton.value)
    if (enemyPetProtection) {
        enemyPetProtection = false;
    } else {
        enemyPetHearts -= playerPetStrength;
    }
    updateButtons()
    updateHearts(2);
    if (enemyPetHearts <= 0) {
        result();
    } else {
        setPetEnemyAttack();
    }
}

function playerPetHealingMovement() {
    createMovementes(1, 2, healingMovementButton.value)
    playerPetHearts += playerPetMagic;
    updateButtons()
    updateHearts(1);
    setPetEnemyAttack();
}

function playerPetDefendMovement() {
    createMovementes(1, 3, protectionMovementButton.value)
    playerMessages.style.display = 'flex'
    enemyMessages.style.display = 'flex'
    playerPetProtection = true;
    protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
    protectionMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
    updateButtons()
    updateHearts(1);
    setPetEnemyAttack();
}

//These are the functions to define enemy's movements
function setPetEnemyAttack() {
    let enemyAttack;
    if (enemyPetProtection && enemyPetHearts == maximumEnemyPetHearts) {
        enemyAttack = 1;
    } else if (enemyPetProtection) {
        enemyAttack = getRandom(1, 2);
    } else if (enemyPetHearts == maximumEnemyPetHearts) {
        enemyAttack = getTwoRandom(1, 3);
    } else {
        enemyAttack = getRandom(1, 3);
    }
    if (enemyAttack == 1) {
        if (playerPetProtection) {
            playerPetProtection = false;
            hoverButtonBG(1, protectionMovementButton, '#ffd230', '#554200')
            hoverButtonBG(2, protectionMovementButton, '#FFF', 'black')
            protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            protectionMovementButton.style.color = 'rgba(0, 0, 0)'
        } else {
            playerPetHearts -= enemyPetStrength;
            hoverButtonBG(1, healingMovementButton, '#62ff4a', 'rgb(0, 92, 3)')
            hoverButtonBG(2, healingMovementButton, '#FFF', 'black')
        }
        enemyPetAttackMovement();
    } else if (enemyAttack == 2) {
        enemyPetHearts += enemyPetMagic;
        enemyPetHealingMovement();
    } else {
        enemyPetDefendMovement();
    }
}

function enemyPetAttackMovement() {
    createMovementes(2, 1, enemyAttackMovement)
    updateButtons()
    updateHearts(1)
    if (playerPetHearts <= 0) {
        result();
    }
}

function enemyPetHealingMovement() {
    createMovementes(2, 2, enemyRegenerationMovement)
    updateButtons()
    updateHearts(2);
}

function enemyPetDefendMovement() {
    createMovementes(2, 3, enemyProtectionMovement)
    updateButtons()
    enemyPetProtection = true;
    updateHearts(2);
}

/*It works to generate p tags with the history of attacks in the battle
 *n parameter is to know if it's the player or an enemy
*/
function createMovementes(n, type, movement) {
    let action;
    let emoji;
    if (type == 1) {
        action = 'attacks';
        emoji = '⚔️'
    } else if (type == 2) {
        action = 'heals';
        emoji = '❤️‍🩹'
    } else if (type == 3) {
        action = 'defends';
        emoji = '🛡️'
    }
    if (n == 1) {
        playerMessages.textContent += playerPetName.textContent + ' ' + action + ' with ' + movement + emoji + '\n\n';
    } else {
        enemyMessages.textContent += enemyPetName.textContent + ' ' + action + ' with ' + movement + emoji + '\n\n';
    }
}

//It works to update the pets' hearts
function updateHearts(n) {
    if (playerPetHearts < 8) {
        spanHearts.style.marginBottom = '20px'
    }
    if (playerPetHearts == 6) {
        spanHearts.style.marginBottom = '0px'
    }

    if (n == 1) {
        if (playerPetProtection) {
            playerGuard.style.backgroundColor = 'rgb(250, 244, 120)'
            playerShield.style.display = 'inline'
        } else {
            playerShield.style.display = 'none'
            playerGuard.style.backgroundColor = '#FFF'
            enemyPetLife.textContent = enemyPetHearts;
            playerPetLife.textContent = playerPetHearts;
        }
    } else if (n == 2) {
        if (enemyPetProtection) {
            enemyGuard.style.backgroundColor = 'rgb(250, 244, 120)';
            enemyShield.style.display = 'inline';
            playerPetLife.textContent = playerPetHearts;
            enemyPetLife.textContent = enemyPetHearts;
        } else {
            enemyShield.style.display = 'none'
            enemyGuard.style.backgroundColor = '#FFF'
            playerPetLife.textContent = playerPetHearts;
            enemyPetLife.textContent = enemyPetHearts;
        }
    } else if (n == 3) {
        playerPetLife.textContent = playerPetHearts;
        enemyPetLife.textContent = enemyPetHearts;
    }
}

function updateButtons() {
    if (playerPetHearts <= 0 || enemyPetHearts <= 0) {
        healingMovementButton.disabled = true;
        healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
        healingMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        protectionMovementButton.disabled = true;
    } else {
        if (playerPetHearts >= maximumPlayerPetHearts && playerPetProtection) {
            playerPetHearts = maximumPlayerPetHearts;
            healingMovementButton.disabled = true;
            protectionMovementButton.disabled = true;
            protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            protectionMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
            healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            healingMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (playerPetHearts >= maximumPlayerPetHearts && !playerPetProtection) {
            playerPetHearts = maximumPlayerPetHearts;
            healingMovementButton.disabled = true;
            protectionMovementButton.disabled = false;
            healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            healingMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (playerPetProtection) {
            healingMovementButton.disabled = false;
            healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            healingMovementButton.style.color = 'rgba(0, 0, 0)'
            protectionMovementButton.disabled = true;
        } else {
            healingMovementButton.disabled = false;
            healingMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            healingMovementButton.style.color = 'rgba(0, 0, 0)'
            protectionMovementButton.disabled = false;
        }
    }
}

function hoverButtonBG(n, btn, background, color) {
    if (n == 1) {
        btn.addEventListener('mouseover', function () {
            this.style.backgroundColor = background;
            this.style.color = color;
        });
    } else if (n == 2) {
        btn.addEventListener('mouseout', function () {
            this.style.backgroundColor = background;
            this.style.color = color;
        });
    }
}

function hoverButtonTS(n, btn, value1, value2) {
    if (n == 1) {
        btn.addEventListener('mouseover', function () {
            this.style.boxShadow = value1;
            this.style.transform = value2;
        });
    } else if (n == 2) {
        btn.addEventListener('mouseout', function () {
            this.style.boxShadow = value1;
            this.style.transform = value2;
        });
    }
}

function result() {
    let petImage = document.createElement('img');
    petImage.style.width = '285px';
    let textImage = document.createElement('img');
    textImage.style.width = '200px';
    if (enemies.length == 1) {
        if (playerPetHearts <= 0) {
            petImage.setAttribute('src', './img/' + enemyPetName.innerText.toLowerCase() + '.png')
            messagesSection.style.display = 'flex'
            messagesSection.style.flexDirection = 'column'
            messagesSection.style.gap = '20px'
            messagesSection.appendChild(textImage);
            messagesSection.appendChild(petImage);
        } else if (enemyPetHearts <= 0) {
            petImage.setAttribute('src', './img/' + playerPetName.innerText.toLowerCase() + '.png')
            messagesSection.style.display = 'flex'
            messagesSection.style.flexDirection = 'column'
            messagesSection.style.gap = '20px'
            messagesSection.appendChild(textImage);
            messagesSection.appendChild(petImage);
        }
        textImage.setAttribute('src', './img/winner.png')
        resetSection.style.display = 'flex';
        movementsSection.style.display = 'none';
        playerMessages.style.display = 'none'
        enemyMessages.style.display = 'none'
    } else {
        if (playerPetHearts <= 0) {
            petImage.setAttribute('src', './img/' + enemyPetName.innerText.toLowerCase() + '.png')
            messagesSection.style.display = 'flex'
            messagesSection.style.flexDirection = 'column'
            messagesSection.style.gap = '20px'
            messagesSection.appendChild(textImage);
            messagesSection.appendChild(petImage);

            textImage.setAttribute('src', './img/winner.png')
            resetSection.style.display = 'flex';
            movementsSection.style.display = 'none';
            playerMessages.style.display = 'none'
            enemyMessages.style.display = 'none'
        } else {
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].name == currentEnemy) {
                    enemies.splice(i, 1)
                    break;
                }
            }

            movementsSection.style.display = 'none';
            playerMessages.style.display = 'none'
            enemyMessages.style.display = 'none'
            mapSection.style.display = 'flex';
        }
    }
}

function resetGame() {
    location.reload();
}
