//It starts the game after DOM is generated correctly
let petButton = document.getElementById('select-pet__select');
petButton.addEventListener('click', selectPlayerPet);

//Setting pets name
let petName = document.getElementById('select-attack__my-pet');
let enemyPetName = document.getElementById('select-attack__enemy-pet');

//Setting pets buttons to choose
let firePet = document.getElementById('burntrack')
let electricPet = document.getElementById('glitch')
let darknessPet = document.getElementById('mortus')
let fireElectricPet = document.getElementById('inferstorm')
let fireDarknessPet = document.getElementById('blazen')
let electricDarknessPet = document.getElementById('thunderneg')

//Setting attacks buttons
let fireAttack = document.getElementById('select-attack__fire')
fireAttack.addEventListener('click', fireMovement)
let electricAttack = document.getElementById('select-attack__electric')
electricAttack.addEventListener('click', electricMovement)
let darknessAttack = document.getElementById('select-attack__darkness')
darknessAttack.addEventListener('click', darknessMovement)

//Gettin the movements section
let movementsSection = document.getElementById('messages');

//Getting the span in movements section to set name and attack done in the battle
let petFightingName = document.getElementById('messages__player-pet')
let petFightingAttack = document.getElementById('messages__player-attack')

let enemyPetFightingName = document.getElementById('messages__enemy-pet')
let enemyPetFightingAttack = document.getElementById('messages__enemy-attack')

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//We get the selected pet by the player
function selectPlayerPet() {
    let player = '';

    if (firePet.checked) {
        alert('You have selected to ' + firePet.value)
        setName(firePet.value, 1)
    } else if (electricPet.checked) {
        alert('You have selected to ' + electricPet.value)
        setName(electricPet.value, 1)
    } else if (darknessPet.checked) {
        alert('You have selected to ' + darknessPet.value)
        setName(darknessPet.value, 1)
    } else if (fireElectricPet.checked) {
        alert('You have selected to ' + fireElectricPet.value)
        setName(fireElectricPet.value, 1)
    } else if (fireDarknessPet.checked) {
        alert('You have selected to ' + fireDarknessPet.value)
        setName(fireDarknessPet.value, 1)
    } else if (electricDarknessPet.checked) {
        alert('You have selected to ' + electricDarknessPet.value)
        setName(electricDarknessPet.value, 1)
    } else {
        alert('You have to select a pet');
    }

    getRandomEnemyPet();
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
 * num variable is to know if is called by player or enemy
*/
function setName(name, num) {
    if (num == 1) {
        petName.innerHTML = name;
    } else {
        enemyPetName.innerHTML = name;
    }
}

//These are the functions to define what happens with the player's movements
function fireMovement() {
    createMovementes(1, fireAttack.value)
    setPetEnemyAttack();
}

function electricMovement() {
    createMovementes(1, electricAttack.value)
    setPetEnemyAttack();
}

function darknessMovement() {
    createMovementes(1, darknessAttack.value)
    setPetEnemyAttack();
}

//These are the functions to define enemy's movements
function setPetEnemyAttack() {
    let enemyAttack = getRandom(1, 3);
    if (enemyAttack == 1) {
        enemyFireMovement();
    } else if (enemyAttack == 2) {
        enemyElectricMovement();
    } else {
        enemyDarknessMovement();
    }
}

function enemyFireMovement() {
    createMovementes(2, fireAttack.value)
}

function enemyElectricMovement() {
    createMovementes(2, electricAttack.value)
}

function enemyDarknessMovement() {
    createMovementes(2, darknessAttack.value)
}

/*It works to generate p tags with the history of attacks in the battle
 *n parameter is to know if it's the player or an enemy
*/
function createMovementes(n, attack){
    let paragraph = document.createElement('p');
    if(n == 1){
        paragraph.innerHTML = petName.textContent + ' attacks with ' + attack;
        movementsSection.appendChild(paragraph);
    } else {
        paragraph.innerHTML = enemyPetName.textContent + ' attacks with ' + attack;
        movementsSection.appendChild(paragraph);
    }
}
