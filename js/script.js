//It starts the game after DOM is generated correctly
const petButton = document.getElementById('select-pet__fight');
petButton.addEventListener('click', selectPlayerPet);

//Setting HTML sections
const startSection = document.getElementById('start');
const petsSection = document.getElementById('select-pet');
petsSection.style.display = 'none';
const movementsSection = document.getElementById('select-attack');
movementsSection.style.display = 'none';
const messagesSection = document.getElementById('messages');
messagesSection.style.display = 'none';
const resetSection = document.getElementById('reset');
resetSection.style.display = 'none';

//Setting pets names
const playerPetName = document.getElementById('select-attack__my-pet');
const enemyPetName = document.getElementById('select-attack__enemy-pet');

//Setting pets buttons to choose
const firePet = document.getElementById('burntrack')
const electricPet = document.getElementById('glitch')
const darkPet = document.getElementById('mortus')
const fireElectricPet = document.getElementById('inferstorm')
const fireDarkPet = document.getElementById('blazen')
const electricDarkPet = document.getElementById('thunneg')

//Setting player movements
let playerAttackMovement;
let playerRegenerationMovement;
let playerProtectionMovement;

//Setting enemy movements
let enemyAttackMovement;
let enemyRegenerationMovement;
let enemyProtectionMovement;

//Setting start button
const startButton = document.getElementById('start__button')
startButton.addEventListener('click', start)

//Setting variables to get mokepons image
const imgPlayerPet = document.getElementById('select-attack__images_player-pet');
const imgEnemyPet = document.getElementById('select-attack__images_enemy-pet');

//Setting movements buttons
const attackMovementButton = document.getElementById('select-attack__fire')
attackMovementButton.addEventListener('click', playerPetAttackMovement)

const regenerationMovementButton = document.getElementById('select-attack__electric')
regenerationMovementButton.disabled = true;
regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
regenerationMovementButton.addEventListener('click', playerPetHealingMovement)

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

//Class to create Mokepons
class Mokepon {
    constructor(name, element, image, life, attack, healing, defend, protection) {
        this.name = name;
        this.element = element;
        this.image = image;
        this.life = life;
        this.attack = attack;
        this.healing = healing;
        this.defend = defend;
        this.protection = protection;
    }
}

//Creating Mokepons
let burntrack = new Mokepon('Burntrack', 'Fire', '../img/burntrack.png', 8, 'Magma Storm', 'Overheat', 'Sunny Day', false);
let glitch = new Mokepon('Glitch', 'Electric', '../img/glitch.png', 5, 'Thunder Punch', 'Overdrive', 'Charge Beam', false);
let mortus = new Mokepon('Mortus', 'Dark', '../img/mortus.png', 7, 'Dark Pulse', 'Crunch', 'False Surrender', false);
let inferstorm = new Mokepon('Inferstorm', 'Hybrid', '../img/inferstorm.png', 15, 'Hot Lightning', 'Fast Fireball', 'Magray', false);
let blazen = new Mokepon('Blazen', 'Hybrid', '../img/blazen.png', 17, 'Dark Light', 'Negative Eruption', 'Mystical Fire', true);
let thunneg = new Mokepon('Thunneg', 'Hybrid', '../img/thunneg.png', 12, 'Infinite Storm', 'Electro Darkness', 'Last Flash', false);

function start() {
    startSection.style.display = 'none'
    petsSection.style.display = 'flex';
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

//We get the selected pet by the player
function selectPlayerPet() {
    petsSection.style.display = 'none';
    movementsSection.style.display = 'block';
    messagesSection.style.display = 'flex';
    playerMessages.style.display = 'none'
    enemyMessages.style.display = 'none'
    updateHearts(3);
    if (firePet.checked) {
        preparingPet(1, burntrack);
    } else if (electricPet.checked) {
        preparingPet(1, glitch);
    } else if (darkPet.checked) {
        preparingPet(1, mortus);
    } else if (fireElectricPet.checked) {
        preparingPet(1, inferstorm);
    } else if (fireDarkPet.checked) {
        preparingPet(1, blazen);
    } else if (electricDarkPet.checked) {
        preparingPet(1, thunneg);
    } else {
        alert('You have to select a pet');
    }
    updateHearts(1);
    getRandomEnemyPet();
}

//Setting the movements buttons content
function setMovementButtons(attack, regeneration, protection) {
    attackMovementButton.value = attack;
    attackMovementButton.innerHTML = attack;

    regenerationMovementButton.value = regeneration;
    regenerationMovementButton.innerHTML = regeneration;

    protectionMovementButton.value = protection;
    protectionMovementButton.innerHTML = protection;
}

//We get a random pet to fight agains the computer
function getRandomEnemyPet() {
    let n = getRandom(1, 6);
    switch (n) {
        case 1:
            preparingPet(2, burntrack);
            break;
        case 2:
            preparingPet(2, glitch);
            break;
        case 3:
            preparingPet(2, mortus);
            break;
        case 4:
            preparingPet(2, inferstorm);
            break;
        case 5:
            preparingPet(2, blazen);
            break;
        case 6:
            preparingPet(2, thunneg);
            break;
    }
    updateHearts(2);
    getImages();
}

function preparingPet(n, mokepon) {
    if (n == 1) {
        setMovementButtons(mokepon.attack, mokepon.healing, mokepon.defend);
        setName(mokepon.name, 1)
        playerPetHearts = mokepon.life;
        playerPetProtection = mokepon.protection;
    } else if (n == 2) {
        setMovement(mokepon.attack, mokepon.healing, mokepon.defend, 2);
        setName(mokepon.name, 2);
        enemyPetHearts = mokepon.life;
        enemyPetProtection = mokepon.protection;
    }
}

function getImages() {
    imgPlayerPet.setAttribute('src', './img/' + playerPetName.innerHTML.toLowerCase() + '.png')
    imgEnemyPet.setAttribute('src', './img/' + enemyPetName.innerHTML.toLowerCase() + '.png')
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
        playerPetName.innerHTML = name;
    } else {
        enemyPetName.innerHTML = name;
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
        enemyPetHearts--;
    }
    updateHearts(2);
    if (enemyPetHearts <= 0) {
        result();
    } else {
        setPetEnemyAttack();
    }
}

function playerPetHealingMovement() {
    createMovementes(1, 2, regenerationMovementButton.value)
    playerPetHearts++;
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
            hoverButton(1, protectionMovementButton, '#ffd230', '#554200')
            hoverButton(2, protectionMovementButton, '#FFF', 'black')
            protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            protectionMovementButton.style.color = 'rgba(0, 0, 0)'
        } else {
            playerPetHearts--;
            hoverButton(1, regenerationMovementButton, '#62ff4a', 'rgb(0, 92, 3)')
            hoverButton(2, regenerationMovementButton, '#FFF', 'black')
        }
        enemyPetAttackMovement();
    } else if (enemyAttack == 2) {
        enemyPetHearts++;
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
            enemyGuard.style.backgroundColor = 'rgb(250, 244, 120)'
            enemyShield.style.display = 'inline'
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
        attackMovementButton.disabled = true;
        regenerationMovementButton.disabled = true;
        regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
        regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        protectionMovementButton.disabled = true;
    } else {
        if (playerPetHearts == maximumPlayerPetHearts && playerPetProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = true;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (playerPetHearts == maximumPlayerPetHearts && !playerPetProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = false;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (playerPetProtection) {
            regenerationMovementButton.disabled = false;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0)'
            protectionMovementButton.disabled = true;
        } else {
            regenerationMovementButton.disabled = false;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0)'
            protectionMovementButton.disabled = false;
        }
    }
}

function hoverButton(n, btn, background, color) {
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

function result() {
    let petImage = document.createElement('img');
    petImage.style.width = '285px';
    let textImage = document.createElement('img');
    textImage.style.width = '200px';
    if (playerPetHearts <= 0) {
        petImage.setAttribute('src', './img/' + enemyPetName.innerHTML.toLowerCase() + '.png')
        messagesSection.style.display = 'flex'
        messagesSection.style.flexDirection = 'column'
        messagesSection.style.gap = '20px'
        messagesSection.appendChild(textImage);
        messagesSection.appendChild(petImage);
    } else if (enemyPetHearts <= 0) {
        petImage.setAttribute('src', './img/' + playerPetName.innerHTML.toLowerCase() + '.png')
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
    updateButtons();
}

function resetGame() {
    location.reload();
}
