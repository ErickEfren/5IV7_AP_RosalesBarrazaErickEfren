const numeropokemones = 151;
var pokedex = {};
window.onload = async function(){
    for(let i = 1; i <= numeropokemones; i++){
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["nombre"].toUpperCase();
        pokemon.classList.add("nombre");
        pokemon.addEventListener("click", uPokemon);
        document.getElementById("lista").append(pokemon);
    }
}
async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/"+num.toString()+"/"
    let res = await fetch(url);
    let pokemon = await res.json();
    let nombreP = pokemon["name"];
    let tipoP = pokemon["types"];
    let imgP = pokemon["sprites"]["front_default"];
    res = await fetch(pokemon["species"]["url"]);
    let descP = await res.json();
    descP = descP["flavor_text_entries"][26]["flavor_text"];
    pokedex[num] = {"nombre" : nombreP, "img" : imgP, "tipo" : tipoP, "desc" : descP};
}
function uPokemon(){
    document.getElementById("img").src = pokedex[this.id]["img"];
    let divtipo = document.getElementById("tipos");
    while (divtipo.firstChild) {
        divtipo.firstChild.remove();
    }
    let tipos = pokedex[this.id]["tipo"];
    console.log(tipos);
    for (let i = 0; i < tipos.length; i++) {
        let tipo = document.createElement("span");
        tipo.innerText = tipos[i]["type"]["name"].toUpperCase();
        tipo.classList.add("caja-tipo")
        tipo.classList.add(tipos[i]["type"]["name"]);
        divtipo.append(tipo);
    }
    document.getElementById("desc").innerText = pokedex[this.id]["desc"];
}