// Declaración de variables

const url = 'js/provincias.json';

let banderaDiv;
var marcadorTotal;
var marcadorUltima;
var aciertos = 0;

var puntos = 0;
var puntosUltima = 0;
var negativoAcumulado = 1;

const ACIERTO = 50;
const FALLO = -10

var cantidad = 9;


// Funcion al iniciar la pagina web

function init() {


// Petición al JSON con una promesa

    fetch(url).then(response => response.json())
        .then(data => {
           console.log(data)
            for (let i = 0; i < 9; i++) {


                //Creamos un div por cada bandera 
                banderaDiv = document.createElement('div');
                banderaDiv.classList.add('bandera');

                // Creamos las imagenes de las banderas
                let img = document.createElement('img');
                img.setAttribute("src", data.comunidades[i].bandera);

                //Creamos los select por cada bandera
                let select = document.createElement('select');
                select.dataset.comunidad = data.comunidades[i].nombre;
                select.addEventListener('change', comprobarResultado);

                //Creamos los option de cada select
                let option = document.createElement('option');
                option.innerText = 'Selecciona una opcion';

                select.appendChild(option);

                data.comunidades.forEach(comunidad => {
                    option = document.createElement('option');

                    option.innerText += comunidad.nombre


                    select.appendChild(option);

                })

                //Añadimos los elementos al div
                banderaDiv.appendChild(img);

                banderaDiv.appendChild(select);

                document.querySelector(".contenedor").appendChild(banderaDiv);




            }
        })






}

// Funcion para calcular el resultado y comprobarlo
function recargar(){
    location.reload();
}

// Funcion para calcular el resultado y comprobarlo

function comprobarResultado() {
    total = document.getElementById('total');
    puntosUltima = document.getElementById('ultima')
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

    console.log("Acertados: " + puntos );
    console.log(aciertos);
    total.innerText = puntos;

    
    let final = document.getElementById('resultado');
    let reiniciar = document.createElement('button');
    if(aciertos == 9){
       
        final.classList.add('mostrar');

        final.innerHTML= "<h2>" + "Has completado todas las banderas" + "</h2>" +   
                            "<p>" + "Tu puntuacion ha sido: "+ puntos + "</p>" ;
        
        reiniciar.innerText = "Volver a empezar";
        reiniciar.addEventListener('click',recargar)

        final.appendChild(reiniciar);

        
    }
}





window.onload = init;