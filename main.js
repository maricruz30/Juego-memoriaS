/**
 * NOTAS
 * 
 * Flaticon --- iconoc
 * chiptone --- sonido
 */

//-------------------------------------------inicializacion de variables-------------------------
let tarjetasDestapadas =0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos= 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//vriables para audio
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//---------------------------------apuntando a documento HTML-----------------------------------
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//---------------------------------------Generacion de números aletorios ------------------------
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
//el -0.5 para que devuelva valores entre -0.5 y 0.5 ... ya que por default solo lo haria en entre 0 y 1
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//------------------------------------------------- funciones --------------------------------------------------------

//funcion que lleva control del tiempo
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        //código que se ejecutara cuando el temporizador llegue a 0
        if(timer==0){
            clearInterval(tiempoRegresivoId); //detener el timer
            //llamamos la funcion que bloquea las tarjetas y muestra los resultados
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}


//funcion que muestra todos los valores
function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./Images/${numeros[i]}.png" alt="">`;;
        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas==1){
        //Mostrar el primer número
        tarjeta1 = document.getElementById(id); // selecciono el elemento html que tiene el id enviado
        primerResultado = numeros[id]; //asociamos arreglo con botones y guardamos el resultado de la seleccion en una variable
        tarjeta1.innerHTML = `<img src="./Images/${primerResultado}.png" alt="">`;

        clickAudio.play();
        //Deshabilitar el primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./Images/${segundoResultado}.png" alt="">`;

        //deshabilitar boton 2
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++; // los movimientos son cada vez que destapas 2 tarjetas
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        //en el caso de que las tarjetas coincidan
        if(primerResultado == segundoResultado){
            //encerar el contador de tarjetas destapadas (inicializar en 0)
            tarjetasDestapadas = 0;
    
            //aumentar e imprimir variable aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos==8){
                //detener temporizador
                clearInterval(tiempoRegresivoId);

                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
                mostrarTiempo.innerHTML = `Fantástico! 🎉 Sólo demoraste ${timerInicial - timer} segundos`;
                winAudio.play();
            }
            
        }else{
            //mostrar momentaneamente los valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
    
                //encerar contador de tarjetas destapadas
                tarjetasDestapadas = 0;
                wrongAudio.play();
            },800);
        }

    }
}