function selectPet(){
    alert('Pet selected')
}

let petButton = document.getElementById('select-pet__select');
petButton.addEventListener('click', selectPet);