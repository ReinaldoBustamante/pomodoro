
const agregarTarea = () =>{
    if(input.value === ""){
        alert('Agrega una tarea')
    }
    else{
        cronometrar = true;
        tareas = [...tareas, input.value]
        tareaProgres.textContent = `${tareas.slice(-1)}`
        listTarea.classList.toggle('inactive')
        tiempoRef = Date.now()
        acomulado = 0
        ms = 0;
        St = 0
        s = 0
        m = 0
        let sound = new Audio('./sound.mp3')
        setInterval(()=>{
            if(cronometrar){
                acomulado += Date.now() - tiempoRef
                tiempoRef=Date.now()
                ms = acomulado % 1000
                St = Math.floor(((acomulado - ms) / 1000))
                s = Math.floor(((acomulado - ms) / 1000) % 60)
                m = Math.floor((St/60) % 60)
                if(s<10){
                    tiempo.textContent = `${m}:0${s}`
                } else{
                    tiempo.textContent = `${m}:${s}`
                } 
                if(m==20){
                    cronometrar = false;
                    sound.play();
                    tareasCompletadas = [...tareasCompletadas,...tareas]
                    eliminarTarea();
                    const newElement = document.createElement('div');
                    newElement.classList.add('tarea');
                    newElement.textContent = tareasCompletadas.slice(-1);
                    tareasC.appendChild(newElement);
                    ciclos += 1;
                    ciclo.textContent = ciclos
                    if(tareasC.classList.contains('inactive')){
                        tareasC.classList.toggle('inactive')
                    }
                }
            }
        }, 1000/60)

        agregar.disabled = true;
        agregar.classList.toggle('disable')
        input.value = "";
    }
    

}

const eliminarTarea = () => {
    tareas.pop()
    agregar.disabled = false;
    listTarea.classList.toggle('inactive')
    agregar.classList.toggle('disable')
    cronometrar = false
    tiempo.textContent = "0:00"
}

const pausarCronometro = () => {
    if (cronometrar){
        cronometrar = false;
        pausar.textContent = "Resumir";
        
    } else{
        cronometrar = true;
        tiempoRef = Date.now()
        pausar.textContent = "Pausar";
        
        
    }
}

const enter = (e) =>{
    if(e.keyCode === 13){
        agregarTarea()
    }
}

let tareas = []
let tareasCompletadas = []
let cronometrar;
let timePaused;
let tiempoRef;
let acomulado;
let ciclos = 0;
let ms;
let St;
let s;
let m;
const input = document.querySelector('.input')
const agregar = document.querySelector('.agregar')
const listTarea = document.querySelector('.list-tarea')
const tareaProgres = document.querySelector('.tareaProgres')
const eliminar = document.querySelector('.eliminar')
const tiempo = document.querySelector('.time')
const pausar = document.querySelector('.pausar')
const tareasC = document.querySelector('.tareas-completadas');
const ciclo = document.querySelector('.ciclo')

agregar.addEventListener('click', agregarTarea);
eliminar.addEventListener('click', eliminarTarea);
pausar.addEventListener('click', pausarCronometro);
input.addEventListener('keyup', enter);
