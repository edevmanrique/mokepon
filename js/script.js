function startGame(){
    let petButton = document.getElementById('select-pet__select');
    petButton.addEventListener('click', selectPet);
}

function selectPet(){
    let player = '';

    let firePet = document.getElementById('burntrack')
    let electricPet = document.getElementById('glitch')
    let darknessPet = document.getElementById('mortus')
    let fireElectricPet = document.getElementById('inferstorm')
    let fireDarknessPet = document.getElementById('blazen')
    let electricDarknessPet = document.getElementById('thunderneg')

    if(firePet.checked){
        alert('You have selected to Burntrack')
    } else if(electricPet.checked){
        alert('You have selected to Glitch')
    } else if(darknessPet.checked){
        alert('You have selected to Mortus')
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

window.addEventListener('load', startGame);