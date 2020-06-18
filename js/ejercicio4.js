var cantidad = 8;

var marcadorTotal;
var marcadorUltima;

var aciertos = 0;
var puntos = 0;
var puntosUltima = 0;
var negativoAcumulado = 1;

const ACIERTO = 50;
const FALLO = -10;

var provincias = new Array();
var comunidades = new Array();
var opSeleccionadas = new Array();
let contenedor;
const url = 'js/provincias.json';


function init() {


    // Petición al JSON con una promesa
    
        fetch(url).then(response => response.json())
            .then(data => {
               console.log(data)
                for (let i = 0; i < 5; i++) {
    
    
                    //Creamos un div por cada bandera 
                    contenedor = document.getElementById("contenedorProvincias");
                    let subcontenedor = document.createElement("div");
                    let contenedorTexto = document.createElement("div");

                    contenedorTexto.className = "contenedorTexto";
                    let contenedorSelect = document.createElement("div");
                    contenedorSelect.className = "contenedorSelect";
                    let select = document.createElement("select");

                    let opcion = document.createElement("option");
                    opcion.innerText = "Selecciona una Autonomía";
                    

                    select.appendChild(opcion);
                    select.className = "cajaTexto";

                    contenedorSelect.appendChild(select);
                    contenedorTexto.id = "ct" + i;
                    contenedorTexto.className = "texto";
                    contenedorTexto.innerText = data.comunidades[i].provincias[0].nombre;

                    subcontenedor.appendChild(contenedorTexto);
                    subcontenedor.appendChild(contenedorSelect);
                    contenedor.appendChild(subcontenedor);

                    select.dataset.comunidad = data.comunidades[i].nombre;
                    select.addEventListener("change", comprobarResultado);
                    

                    data.comunidades.forEach(provincia => {
                        option = document.createElement('option');
    
                        option.innerText += provincia.nombre
    
    
                        select.appendChild(option);
    
                    })

    
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
    if(aciertos == 5){
       
        final.classList.add('mostrar');

        final.innerHTML= "<h2>" + "Has completado todas las banderas" + "</h2>" +   
                            "<p>" + "Tu puntuacion ha sido: "+ puntos + "</p>" ;
        
        reiniciar.innerText = "Volver a empezar";
        reiniciar.addEventListener('click',recargar)

        final.appendChild(reiniciar);

        
    }
}
    
    
    
    
    window.onload = init;