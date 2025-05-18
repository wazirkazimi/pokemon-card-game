        var audio = new Audio('./Who’s that Pokémon__ [vsE4H63Mcsg].mp3');
        // Function to get a random Pokémon ID (1 to 151 for Gen 1)
        function getRandomPokemonId() {
            return Math.floor(Math.random() * 151) + 1;
        }

        // Function to fetch a Pokémon (Returns a Promise)
        function getPokemon(id) {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .catch(() => null); // If failed, return null
        }

        // Function to display Pokémon details
        function displayPokemon(pokemon, elementId) {
            if (!pokemon) {
                document.getElementById(elementId).innerHTML = "Failed to load Pokémon.";
                return;
            }

            document.getElementById(elementId).innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
        <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
    `;
        }

        // Function to compare Pokémon and declare the winner
        function determineWinner(pokemon1, pokemon2) {
            if (!pokemon1 || !pokemon2) {
                document.getElementById("battle-result").innerText = "Battle failed!";
                return;
            }

            let attack1 = pokemon1.stats[1].base_stat;
            let attack2 = pokemon2.stats[1].base_stat;
            let resultText = "";

            if (attack1 > attack2) {
                document.getElementById("pokemon1").classList.add("winner");
                document.getElementById("pokemon2").classList.remove("winner");
                resultText = `${pokemon1.name.toUpperCase()} Wins! 🎉`;
            } else if (attack2 > attack1) {
                document.getElementById("pokemon2").classList.add("winner");
                document.getElementById("pokemon1").classList.remove("winner");
                resultText = `${pokemon2.name.toUpperCase()} Wins! 🎉`;
            } else {
                document.getElementById("pokemon1").classList.remove("winner");
                document.getElementById("pokemon2").classList.remove("winner");
                resultText = "It's a Tie! 🤝";
            }

            document.getElementById("battle-result").innerText = resultText;
        }

        // Main function to start a Pokémon battle
        function startBattle() {
            audio.play();
            audio.play(); // Play the battle sound

    // It will Stop the audio after 4 seconds
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to start
        
    }, 4800);
    setTimeout(() => {
        document.getElementById("loading").style.display = "block";
            document.getElementById("battle-result").innerText = "";
            document.getElementById("pokemon1").innerHTML = "";
            document.getElementById("pokemon2").innerHTML = "";

            let id1 = getRandomPokemonId();
            let id2 = getRandomPokemonId();

            Promise.all([getPokemon(id1), getPokemon(id2)])
                .then(([pokemon1, pokemon2]) => {
                    document.getElementById("loading").style.display = "none";

                    displayPokemon(pokemon1, "pokemon1");
                    displayPokemon(pokemon2, "pokemon2");

                    setTimeout(() => determineWinner(pokemon1, pokemon2), 1000);
                });
        
    }, 2500);
            
        }

        // playing BG music
        let play = document.getElementById('bgmusic')
        let bgMusic = document.getElementById('backgroundAudio')
        let isplay = false
        play.addEventListener('click', () => {
            if (!isplay) {
                bgMusic.play()
                play.src = './stop_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
                isplay = true
            }
            else {
                bgMusic.pause()
                play.src = './play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
                isplay = false

            }
        })