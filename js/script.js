//It starts the game after DOM is generated correctly
const petButton = document.getElementById('select-pet__select');
petButton.addEventListener('click', selectPlayerPet);

//Setting pets name
const petName = document.getElementById('select-attack__my-pet');
const enemyPetName = document.getElementById('select-attack__enemy-pet');

//Setting pets buttons to choose
const firePet = document.getElementById('burntrack')
const electricPet = document.getElementById('glitch')
const darknessPet = document.getElementById('mortus')
const fireElectricPet = document.getElementById('inferstorm')
const fireDarknessPet = document.getElementById('blazen')
const electricDarknessPet = document.getElementById('thunderneg')

let attackMovement;
let regenerationMovement;
let protectionMovement;

//Setting movements buttons
const attackMovementButton = document.getElementById('select-attack__fire')
attackMovementButton.addEventListener('click', fireMovement)
const regenerationMovementButton = document.getElementById('select-attack__electric')
regenerationMovementButton.disabled = true;
regenerationMovementButton.addEventListener('click', electricMovement)
const protectionMovementButton = document.getElementById('select-attack__darkness')
protectionMovementButton.addEventListener('click', darknessMovement)

//Gettin the movements section
const movementsSection = document.getElementById('messages');

//Getting the span in movements section to set name and attack done in the battle
const petFightingName = document.getElementById('messages__player-pet')
const petFightingAttack = document.getElementById('messages__player-attack')

const enemyPetFightingName = document.getElementById('messages__enemy-pet')
const enemyPetFightingAttack = document.getElementById('messages__enemy-attack')

//Setting the pets' hearts
let petHearts = 3;
let enemyPetHearts = 3;

//We get the span with the hearts to update them after a movement
const petLife = document.getElementById('select-attack__my-pet-hearts')
const enemyPetLife = document.getElementById('select-attack__enemy-pet-hearts')

//Variables to know when a pet uses protection movement
let petProtection = false;
let enemyPetProtection = false;

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
    if (firePet.checked) {
        attackMovement = 'Magma Storm';
        regenerationMovement = 'Overheat';
        protectionMovement = 'Sunny Day';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(firePet.value, 1)
    } else if (electricPet.checked) {
        attackMovement = 'Thunder Punch';
        regenerationMovement = 'Overdrive';
        protectionMovement = 'Charge Beam';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(electricPet.value, 1)
    } else if (darknessPet.checked) {
        attackMovement = 'Dark Pulse';
        regenerationMovement = 'Crunch';
        protectionMovement = 'False Surrender';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(darknessPet.value, 1)
    } else if (fireElectricPet.checked) {
        attackMovement = 'Hot Lightning';
        regenerationMovement = 'Fast Fireball';
        protectionMovement = 'Magray';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(fireElectricPet.value, 1)
    } else if (fireDarknessPet.checked) {
        attackMovement = 'Dark light';
        regenerationMovement = 'Negative eruption';
        protectionMovement = 'Mystical Fire';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(fireDarknessPet.value, 1)
    } else if (electricDarknessPet.checked) {
        attackMovement = 'Infinite storm';
        regenerationMovement = 'Electro darkness';
        protectionMovement = 'Last Flash';
        settingMovementButtons(attackMovement, regenerationMovement, protectionMovement);
        setName(electricDarknessPet.value, 1)
    } else {
        alert('You have to select a pet');
    }

    getRandomEnemyPet();
}

//Setting the movements buttons content
function settingMovementButtons(attack, regeneration, protection){
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
            setName(petEnemy, 2);
            break;
        case 2:
            petEnemy = electricPet.value;
            setName(petEnemy, 2);
            break;
        case 3:
            petEnemy = darknessPet.value;
            setName(petEnemy, 2);
            break;
        case 4:
            petEnemy = fireElectricPet.value;
            setName(petEnemy, 2);
            break;
        case 5:
            petEnemy = fireDarknessPet.value;
            setName(petEnemy, 2);
            break;
        case 6:
            petEnemy = electricDarknessPet.value;
            setName(petEnemy, 2);
            break;
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
    setPetEnemyAttack();
}

function electricMovement() {
    createMovementes(1, regenerationMovementButton.value)
    petHearts++;
    updateHearts(1);
    setPetEnemyAttack();
}

function darknessMovement() {
    createMovementes(1, protectionMovementButton.value)
    petProtection = true;
    updateHearts(1);
    setPetEnemyAttack();
}

//These are the functions to define enemy's movements
function setPetEnemyAttack() {
    let enemyAttack;
    if (enemyPetProtection && enemyPetHearts == 3) {
        enemyAttack = 1;
    } else if (enemyPetProtection) {
        enemyAttack = getRandom(1, 2);
    } else if (enemyPetHearts == 3) {
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
        enemyDarknessMovement();
    }
}

function enemyFireMovement() {
    createMovementes(2, attackMovementButton.value)
    updateButtons()
    updateHearts(1)
}

function enemyElectricMovement() {
    createMovementes(2, regenerationMovementButton.value)
    updateButtons()
    updateHearts(2);
}

function enemyDarknessMovement() {
    createMovementes(2, protectionMovementButton.value)
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
        movementsSection.appendChild(paragraph);
    } else {
        paragraph.innerHTML = enemyPetName.textContent + ' attacks with ' + attack;
        movementsSection.appendChild(paragraph);
    }
}

//It works to update the pets' hearts
function updateHearts(n) {
    let hearts = '';
    //Limit the quantity of hearts to be maximum 3
    if (petHearts > 3) {
        petHearts = 3;
    } else if (enemyPetHearts > 3) {
        enemyPetHearts = 3;
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
    } else {
        for (i = 0; i < enemyPetHearts; i++) {
            if (enemyPetProtection && (i == enemyPetHearts - 1)) {
                hearts += '💛';
                break;
            }
            hearts += '❤️';
        }
        enemyPetLife.textContent = hearts;
    }
}

function updateButtons(){
    if(petHearts == 3 && petProtection){
        regenerationMovementButton.disabled = true;
        protectionMovementButton.disabled = true;
    } else if(petHearts == 3 && !petProtection){
        regenerationMovementButton.disabled = true;
        protectionMovementButton.disabled = false;
    } else if(petProtection){
        regenerationMovementButton.disabled = false;
        protectionMovementButton.disabled = true;
    } else {
        regenerationMovementButton.disabled = false;
        protectionMovementButton.disabled = false;
    }
}
