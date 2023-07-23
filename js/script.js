//It starts the game after DOM is generated correctly
const petButton = document.getElementById('select-pet__select');
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

//Setting pets name
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

//Setting movements buttons
const attackMovementButton = document.getElementById('select-attack__fire')
attackMovementButton.addEventListener('click', fireMovement)
const regenerationMovementButton = document.getElementById('select-attack__electric')
regenerationMovementButton.disabled = true;
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

//Variables to know when a pet uses protection movement
let petProtection = false;
let enemyPetProtection = false;

function start(){
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
    messagesSection.style.display = 'block';
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
    createMovementes(1, attackMovementButton.value)
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
    createMovementes(1, regenerationMovementButton.value)
    petHearts++;
    updateHearts(1);
    setPetEnemyAttack();
}

function darkMovement() {
    createMovementes(1, protectionMovementButton.value)
    petProtection = true;
    updateHearts(1);
    if (result()) {
        result();
    } else {
        setPetEnemyAttack();
    }
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
        } else {
            petHearts--;
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
    createMovementes(2, enemyAttackMovement)
    updateButtons()
    updateHearts(1)
    if (petHearts <= 0) {
        result();
    }
}

function enemyElectricMovement() {
    createMovementes(2, enemyRegenerationMovement)
    updateButtons()
    updateHearts(2);
}

function enemyDarkMovement() {
    createMovementes(2, enemyProtectionMovement)
    updateButtons()
    enemyPetProtection = true;
    updateHearts(2);
}

/*It works to generate p tags with the history of attacks in the battle
 *n parameter is to know if it's the player or an enemy
*/
function createMovementes(n, attack) {
    let paragraph = document.createElement('p');
    if (n == 1) {
        paragraph.innerHTML = petName.textContent + ' attacks with ' + attack;
        messagesSection.appendChild(paragraph);
    } else {
        paragraph.innerHTML = enemyPetName.textContent + ' attacks with ' + attack;
        messagesSection.appendChild(paragraph);
    }
}

//It works to update the pets' hearts
function updateHearts(n) {
    let hearts = '';
    //Limit the quantity of hearts to be maximum 3
    if (petHearts > maximumHearts) {
        petHearts = maximumHearts;
    } else if (enemyPetHearts > maximumHearts) {
        enemyPetHearts = maximumHearts;
    }

    if (n == 1) {
        for (i = 0; i < petHearts; i++) {
            if (petProtection && (i == petHearts - 1)) {
                hearts += '💛';
                break;
            }
            hearts += '❤️';
        }
        petLife.textContent = hearts;
    } else if (n == 2) {
        for (i = 0; i < enemyPetHearts; i++) {
            if (enemyPetProtection && (i == enemyPetHearts - 1)) {
                hearts += '💛';
                break;
            }
            hearts += '❤️';
        }
        enemyPetLife.textContent = hearts;
    } else if (n == 3) {
        for (i = 0; i < maximumHearts; i++) {
            hearts += '❤️';
        }
        petLife.textContent = hearts;
        enemyPetLife.textContent = hearts;
    }
}

function updateButtons() {
    if (petHearts <= 0 || enemyPetHearts <= 0) {
        attackMovementButton.disabled = true;
        regenerationMovementButton.disabled = true;
        protectionMovementButton.disabled = true;
    } else {
        if (petHearts == maximumHearts && petProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = true;
        } else if (petHearts == maximumHearts && !petProtection) {
            regenerationMovementButton.disabled = true;
            protectionMovementButton.disabled = false;
        } else if (petProtection) {
            regenerationMovementButton.disabled = false;
            protectionMovementButton.disabled = true;
        } else {
            regenerationMovementButton.disabled = false;
            protectionMovementButton.disabled = false;
        }
    }
}

function result() {
    let paragraph = document.createElement('p');
    if (petHearts <= 0) {
        paragraph.innerHTML = enemyPetName.textContent + ' wins';
        messagesSection.appendChild(paragraph);
        resetSection.style.display = 'block';
        movementsSection.style.display = 'none';
    } else if (enemyPetHearts <= 0) {
        paragraph.innerHTML = petName.textContent + ' wins';
        messagesSection.appendChild(paragraph);
        resetSection.style.display = 'block';
        movementsSection.style.display = 'none';
    }
    updateButtons();
}

function resetGame() {
    location.reload();
}
