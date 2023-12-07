const container = document.querySelector('.container')
const form = document.querySelector('.js-form')


form.addEventListener('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault()
    fetchPokemon(form.query.value)
    .then(renderPokemon)
    .catch(error => {
        alert('error', error)
    })
    .finally(()=>form.reset())
}


function fetchPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => { return response.json() })
}


function renderPokemon(pokemon) {
            const markup = pokemonCard(pokemon)
        container.innerHTML = markup
}

function pokemonCard({ sprites, name, id, weight, abilities}) {
        return `<div class="card">
        <img src="${sprites.front_default}" alt="${name}">
        <div>
        <p class="name">${name.toUpperCase()}</p>
        <p class="text">Weight: ${weight}</p>
        </div>
        </div>`
    }

