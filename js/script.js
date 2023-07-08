//It starts the game after DOM is generated correctly
function startGame(){
    let petButton = document.getElementById('select-pet__select');
    petButton.addEventListener('click', selectPet);
}

//We get the selected pet by the player
function selectPet(){
    let player = '';

    let firePet = document.getElementById('burntrack')
    let electricPet = document.getElementById('glitch')
    let darknessPet = document.getElementById('mortus')
    let fireElectricPet = document.getElementById('inferstorm')
    let fireDarknessPet = document.getElementById('blazen')
    let electricDarknessPet = document.getElementById('thunderneg')

    if(firePet.checked){
        alert('You have selected to Burntrack 🔥')
        setName('Burntrack 🔥')
    } else if(electricPet.checked){
        alert('You have selected to Glitch ⚡')
        setName('Glitch ⚡')
    } else if(darknessPet.checked){
        alert('You have selected to Mortus 🖤')
        setName('Mortus 🖤')
    } else if(fireElectricPet.checked){
        alert('You have selected to Inferstorm')
    } else if(fireDarknessPet.checked){
        alert('You have selected to Blazen')
    } else if(electricDarknessPet.checked){
        alert('You have selected to Thunderneg')
    } else {
        alert('You have to select a pet');
    }
}

//We get the name of selectPet function to add it dynamically to the battle section
function setName(name){
    let petName = document.getElementById('select-attack__my-pet');
    petName.innerHTML = name;
}

window.addEventListener('load', startGame);