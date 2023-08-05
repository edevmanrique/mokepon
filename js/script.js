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
const petName = document.getElementById('select-attack__my-pet');
const enemyPetName = document.getElementById('select-attack__enemy-pet');

//Setting pets buttons to choose
const firePet = document.getElementById('burntrack')
const electricPet = document.getElementById('glitch')
const darkPet = document.getElementById('mortus')
const fireElectricPet = document.getElementById('inferstorm')
const fireDarkPet = document.getElementById('blazen')
const electricDarkPet = document.getElementById('thunderneg')

//Setting player movements
let attackMovement;
let regenerationMovement;
let protectionMovement;

//Setting enemy movements
let enemyAttackMovement;
let enemyRegenerationMovement;
let enemyProtectionMovement;

//Setting start button
const startButton = document.getElementById('start__button')
startButton.addEventListener('click', start)

//Setting variables to get mokepons image
let playerPetImage;
let enemyPetImage;

//Setting variables to get mokepons image
const imgPlayerPet = document.getElementById('select-attack__images_player-pet');
const imgPlayerPlatform = document.getElementById('select-attack__images_player-platform');
const imgEnemyPet = document.getElementById('select-attack__images_enemy-pet');
const imgEnemyPlatform = 'select-attack__images_enemy-platform';

//Setting movements buttons
const attackMovementButton = document.getElementById('select-attack__fire')
attackMovementButton.addEventListener('click', fireMovement)

const regenerationMovementButton = document.getElementById('select-attack__electric')
regenerationMovementButton.disabled = true;
regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
regenerationMovementButton.addEventListener('click', electricMovement)

const protectionMovementButton = document.getElementById('select-attack__darkness')
protectionMovementButton.addEventListener('click', darkMovement)

//Setting reset button
const resetButton = document.getElementById('reset__button');
resetButton.addEventListener('click', resetGame)

//Getting the span in movements section to set name and attack done in the battle
const petFightingName = document.getElementById('messages__player-pet')
const petFightingAttack = document.getElementById('messages__player-attack')

const enemyPetFightingName = document.getElementById('messages__enemy-pet')
const enemyPetFightingAttack = document.getElementById('messages__enemy-attack')

//Setting the pets' hearts
let petHearts = 8;
let enemyPetHearts = 8;

//We set a limit to know the maximum number of hearts
const maximumHearts = petHearts;

//We get the span with the hearts to update them after a movement
const petLife = document.getElementById('select-attack__my-pet-hearts')
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
let petProtection = false;
let enemyPetProtection = false;

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
        setMovement('Magma Storm', 'Overheat', 'Sunny Day', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(firePet.value, 1)
    } else if (electricPet.checked) {
        setMovement('Thunder Punch', 'Overdrive', 'Charge Beam', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(electricPet.value, 1)
    } else if (darkPet.checked) {
        setMovement('Dark Pulse', 'Crunch', 'False Surrender', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(darkPet.value, 1)
    } else if (fireElectricPet.checked) {
        setMovement('Hot Lightning', 'Fast Fireball', 'Magray', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(fireElectricPet.value, 1)
    } else if (fireDarkPet.checked) {
        setMovement('Dark Light', 'Negative Eruption', 'Mystical Fire', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(fireDarkPet.value, 1)
    } else if (electricDarkPet.checked) {
        setMovement('Infinite Storm', 'Electro Darkness', 'Last Flash', 1);
        setMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(electricDarkPet.value, 1)
    } else {
        alert('You have to select a pet');
    }

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
    let petNumber = getRandom(1, 6);
    let petEnemy = ''
    switch (petNumber) {
        case 1:
            petEnemy = firePet.value;
            setMovement('Magma Storm', 'Overheat', 'Sunny Day', 2);
            setName(petEnemy, 2);
            break;
        case 2:
            petEnemy = electricPet.value;
            setMovement('Thunder Punch', 'Overdrive', 'Charge Beam', 2);
            setName(petEnemy, 2);
            break;
        case 3:
            petEnemy = darkPet.value;
            setMovement('Dark Pulse', 'Crunch', 'False Surrender', 2);
            setName(petEnemy, 2);
            break;
        case 4:
            petEnemy = fireElectricPet.value;
            setMovement('Hot Lightning', 'Fast Fireball', 'Magray', 2);
            setName(petEnemy, 2);
            break;
        case 5:
            petEnemy = fireDarkPet.value;
            setMovement('Dark Light', 'Negative Eruption', 'Mystical Fire', 2);
            setName(petEnemy, 2);
            break;
        case 6:
            petEnemy = electricDarkPet.value;
            setMovement('Infinite Storm', 'Electro Darkness', 'Last Flash', 2);
            setName(petEnemy, 2);
            break;
    }
    getImages();
}

function getImages() {
    imgPlayerPet.setAttribute('src', './img/' + petName.innerHTML.toLowerCase() + '.png')
    imgEnemyPet.setAttribute('src', './img/' + enemyPetName.innerHTML.toLowerCase() + '.png')
}

//We set the value of movements, n is to know if It's player or computer
function setMovement(attack, regeneration, protection, n) {
    if (n == 1) {
        attackMovement = attack;
        regenerationMovement = regeneration;
        protectionMovement = protection;
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
        petName.innerHTML = name;
    } else {
        enemyPetName.innerHTML = name;
    }
}

//These are the functions to define what happens with the player's movements
function fireMovement() {
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

function electricMovement() {
    createMovementes(1, 2, regenerationMovementButton.value)
    petHearts++;
    updateHearts(1);
    setPetEnemyAttack();
}

function darkMovement() {
    createMovementes(1, 3, protectionMovementButton.value)
    playerMessages.style.display = 'flex'
    enemyMessages.style.display = 'flex'
    petProtection = true;
    protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
    protectionMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
    updateHearts(1);
    setPetEnemyAttack();
}

//These are the functions to define enemy's movements
function setPetEnemyAttack() {
    let enemyAttack;
    if (enemyPetProtection && enemyPetHearts == maximumHearts) {
        enemyAttack = 1;
    } else if (enemyPetProtection) {
        enemyAttack = getRandom(1, 2);
    } else if (enemyPetHearts == maximumHearts) {
        enemyAttack = getTwoRandom(1, 3);
    } else {
        enemyAttack = getRandom(1, 3);
    }
    if (enemyAttack == 1) {
        if (petProtection) {
            petProtection = false;
            hoverButton(1, protectionMovementButton, '#ffd230', '#554200')
            hoverButton(2, protectionMovementButton, '#FFF', 'black')
            protectionMovementButton.style.backgroundColor = 'rgba(255, 255, 255)';
            protectionMovementButton.style.color = 'rgba(0, 0, 0)'
        } else {
            petHearts--;
            hoverButton(1, regenerationMovementButton, '#62ff4a', 'rgb(0, 92, 3)')
            hoverButton(2, regenerationMovementButton, '#FFF', 'black')
        }
        enemyFireMovement();
    } else if (enemyAttack == 2) {
        enemyPetHearts++;
        enemyElectricMovement();
    } else {
        enemyDarkMovement();
    }
}

function enemyFireMovement() {
    createMovementes(2, 1, enemyAttackMovement)
    updateButtons()
    updateHearts(1)
    if (petHearts <= 0) {
        result();
    }
}

function enemyElectricMovement() {
    createMovementes(2, 2, enemyRegenerationMovement)
    updateButtons()
    updateHearts(2);
}

function enemyDarkMovement() {
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
        playerMessages.textContent += petName.textContent + ' ' + action + ' with ' + movement + emoji + '\n\n';
    } else {
        enemyMessages.textContent += enemyPetName.textContent + ' ' + action + ' with ' + movement + emoji + '\n\n';
    }
}

//It works to update the pets' hearts
function updateHearts(n) {
    if (petHearts < maximumHearts) {
        spanHearts.style.marginBottom = '20px'
    }
    if (petHearts == 6) {
        spanHearts.style.marginBottom = '0px'
    }

    if (n == 1) {
        if (petProtection) {
            playerGuard.style.backgroundColor = 'rgb(250, 244, 120)'
            playerShield.style.display = 'inline'
        } else {
            playerShield.style.display = 'none'
            playerGuard.style.backgroundColor = '#FFF'
            enemyPetLife.textContent = enemyPetHearts;
            petLife.textContent = petHearts;
        }
    } else if (n == 2) {
        if (enemyPetProtection) {
            enemyGuard.style.backgroundColor = 'rgb(250, 244, 120)'
            enemyShield.style.display = 'inline'
        } else {
            enemyShield.style.display = 'none'
            enemyGuard.style.backgroundColor = '#FFF'
            petLife.textContent = petHearts;
            enemyPetLife.textContent = enemyPetHearts;
        }
    } else if (n == 3) {
        petLife.textContent = petHearts;
        enemyPetLife.textContent = enemyPetHearts;
    }
}

function updateButtons() {
    if (petHearts <= 0 || enemyPetHearts <= 0) {
        attackMovementButton.disabled = true;
        regenerationMovementButton.disabled = true;
        regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
        regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        protectionMovementButton.disabled = true;
    } else {
        if (petHearts == maximumHearts && petProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = true;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (petHearts == maximumHearts && !petProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = false;
            regenerationMovementButton.style.backgroundColor = 'rgba(255, 255, 255, 0.727)';
            regenerationMovementButton.style.color = 'rgba(0, 0, 0, 0.575)'
        } else if (petProtection) {
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

function hoverButton(n, btn, background, color){
    if(n == 1){
        btn.addEventListener('mouseover', function () {
            this.style.backgroundColor = background;
            this.style.color = color;
        });
    } else if(n == 2){
        btn.addEventListener('mouseout', function () {
            this.style.backgroundColor = background;
            this.style.color = color;
        });
    }
}

function result() {
    let paragraph = document.createElement('p');
    let petImage = document.createElement('img');
    petImage.style.width = '285px';
    let textImage = document.createElement('img');
    textImage.style.width = '200px';
    if (petHearts <= 0) {
        paragraph.innerHTML = enemyPetName.textContent + ' wins';
        messagesSection.appendChild(paragraph);
    } else if (enemyPetHearts <= 0) {
        petImage.setAttribute('src', './img/' + petName.innerHTML.toLowerCase() + '.png')
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
