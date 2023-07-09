//It starts the game after DOM is generated correctly
let petButton = document.getElementById('select-pet__select');
petButton.addEventListener('click', selectPlayerPet);

let firePet = document.getElementById('burntrack')
let electricPet = document.getElementById('glitch')
let darknessPet = document.getElementById('mortus')
let fireElectricPet = document.getElementById('inferstorm')
let fireDarknessPet = document.getElementById('blazen')
let electricDarknessPet = document.getElementById('thunderneg')

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
    if (num == 1){
        let petName = document.getElementById('select-attack__my-pet');
        petName.innerHTML = name;
    } else {
        let enemyPetName = document.getElementById('select-attack__enemy-pet');
        enemyPetName.innerHTML = name;
    }
}