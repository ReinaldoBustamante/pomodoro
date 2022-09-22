
const agregarTarea = () =>{
    if(input.value === ""){
        alert('Agrega una tarea')
    }
    else{
        tareas = [...tareas, input.value]
        tareaProgres.textContent = tareas.slice(-1)
        listTarea.classList.toggle('inactive')
        let tiempoRef = Date.now()
        let acomulado = 0
        let ms = 0;
        let St = 0
        let s = 0
        let m = 0
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
                if(m==25){
                    cronometrar = false;
                    sound.play();
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


let tareas = []
let cronometrar = true;
const input = document.querySelector('.input')
const agregar = document.querySelector('.agregar')
const listTarea = document.querySelector('.list-tarea')
const tareaProgres = document.querySelector('.tareaProgres')
const eliminar = document.querySelector('.eliminar')
const tiempo = document.querySelector('.time')


agregar.addEventListener('click', agregarTarea);
eliminar.addEventListener('click', eliminarTarea);


