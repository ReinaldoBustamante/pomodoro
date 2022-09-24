
const agregarTarea = () =>{
    if(input.value === ""){
        alert('Agrega una tarea')
    }
    else{
        cronometrar = true;
        tareas = [...tareas, input.value]
        tareaProgres.textContent = tareas.slice(-1)
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
                if(m==1){
                    cronometrar = false;
                    sound.play();
                    tiempo.textContent = "0:00"
                    listTarea.classList.toggle('inactive')
                    agregar.classList.toggle('disable')
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


let tareas = []
let cronometrar;
let timePaused;
let tiempoRef;
let acomulado;
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


agregar.addEventListener('click', agregarTarea);
eliminar.addEventListener('click', eliminarTarea);
pausar.addEventListener('click', pausarCronometro);

