!function(){var n=document.querySelector(".container"),t=document.querySelector(".js-form");function e(t){var e=function(n){var t=n.sprites,e=n.name,c=(n.id,n.weight);n.abilities;return'<div class="card">\n        <img src="'.concat(t.front_default,'" alt="').concat(e,'">\n        <div>\n        <p class="name">').concat(e.toUpperCase(),'</p>\n        <p class="text">Weight: ').concat(c,"</p>\n        </div>\n        </div>")}(t);n.innerHTML=e}t.addEventListener("submit",(function(n){n.preventDefault(),(c=t.query.value,fetch("https://pokeapi.co/api/v2/pokemon/".concat(c)).then((function(n){return n.json()}))).then(e).catch((function(n){alert("error",n)})).finally((function(){return t.reset()}));var c}))}();
//# sourceMappingURL=fetch.8be1653a.js.map