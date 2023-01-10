const enviar = document.getElementById('enviar')
const refaz = document.getElementById('reload')
const img = document.querySelector('img')



async function fetchData() {

    try {
        // Make random number of pokemon
        let randomNum = Math.floor(Math.random() * 1154) + 1;

        // Fetching pokemon based on random number
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        const data = await response.json();
        console.log(data);

        // Generate a random picture of the pokemon

        function aleatorio() {
            let numero = 0;
            numero = Math.floor(Math.random() * 1154) + 1;
            console.log(numero);
            img.setAttribute('src', data.sprites.front_default);
        }

        // Reset the pokemon
        resetar()

        function resetar() {
            document.querySelector('span').innerHTML = " ";
            document.getElementById('imgpokemon').className = null
            let pokeSound = new Audio('../audio/pokemon.mp3');
            pokeSound.play();
            aleatorio()
        }


        enviar.onclick = () => {

            let inputField = document.querySelector('input').value.trim();

            if (inputField.length) {
                if (inputField.toLowerCase() == data.species.name.toLowerCase()) {
                    document.querySelector('span').innerHTML = "You got it right, it's a " + data.species.name
                    document.getElementById('imgpokemon').className = "You got it right"
                    document.querySelector('input').value = ""
                    document.getElementById('imgpokemon').style.filter = "contrast(100%)"
                    setTimeout(() => {
                        resetar();
                    }, 6000)
                } else {
                    document.querySelector('span').innerHTML = "You failed! " + data.species.name
                    document.getElementById('imgpokemon').className = "You got it right!"
                    document.querySelector('input').value = ""
                    setTimeout(() => {
                        resetar();
                    }, 2000)
                }
            } else {
                document.querySelector('span').innerHTML = "Write the name"
            }
        }

    } catch (e) {
        console.log(e);
        document.querySelector('span').innerHTML = "FAILED TO LOAD IMAGE, REFRESH ";
    }


}

fetchData()