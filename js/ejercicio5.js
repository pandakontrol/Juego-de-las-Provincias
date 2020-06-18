
//Declaracion de las variables

const url = 'js/provincias.json';
let banderaDiv;
var marcadorTotal;
var marcadorUltima;
var aciertos = 0;
let atri;
var puntos = 0;
var puntosUltima = 0;
var negativoAcumulado = 1;

const ACIERTO = 50;
const FALLO = -10

var cantidad = 9;


function init(){

console.log("hola estoy ya empieza a funcionar")

// Peticion al JSON 

fetch(url).then(response => response.json())
    .then(data =>{

        console.log(data)
        for (let i = 0; i < 16; i++) {
        

        let div = document.createElement("div");
        div.className = "contenedor5";

        let texto = document.createElement("span");
        texto.innerText = data.comunidades[i].nombre;

        let cajaTexto = document.createElement("input");
        cajaTexto.className = "cajaTexto";
        cajaTexto.dataset.comunidad = data.comunidades[i].capital;

        let select = document.createElement('h1');
        select.dataset.comunidad = data.comunidades[i].capital;
        cajaTexto.addEventListener('change', comprobarResultado);
       
        div.appendChild(texto);
        div.appendChild(cajaTexto);
        div.appendChild(select);

        contenedorPrincipal.appendChild(div);
            
        }

    })


}

// Funcion para calcular el resultado y comprobarlo
function recargar() {
    location.reload();
}

// Funcion para calcular el resultado y comprobarlo

function comprobarResultado() {
    console.log("entro");
    total = document.getElementById('total');
    puntosUltima = document.getElementById('ultima')
    atri = document.getElementsByClassName('h1')
    console.log();

    if (this.value === this.getAttribute('data-comunidad')) {
        this.disabled = true;
        puntos += ACIERTO;
        this.classList.add('bien');
        puntosUltima.innerText = ACIERTO;
        aciertos++;
    } else {
        puntosUltima.innerText = negativoAcumulado * FALLO;
        puntos += negativoAcumulado * FALLO;
        negativoAcumulado++;
        this.classList.add('mal');

    }

    console.log("Acertados: " + puntos);
    console.log(aciertos);
    total.innerText = puntos;
    

    let final = document.getElementById('resultado');
    let reiniciar = document.createElement('button');
    if (aciertos == 16) {

        final.classList.add('mostrar');

        final.innerHTML = "<h2>" + "Has completado todas las banderas" + "</h2>" +
            "<p>" + "Tu puntuacion ha sido: " + puntos + "</p>";

        reiniciar.innerText = "Volver a empezar";
        reiniciar.addEventListener('click', recargar)

        final.appendChild(reiniciar);


    }
}


window.onload = init;