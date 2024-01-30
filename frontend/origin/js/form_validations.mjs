const $inputs = document.querySelectorAll(".division__input[required]");
//Se obtiene una lista de nodos con todos los elementos que tengan la clase CSS y que tengan el atributo required.

const formValidation = () => {
    if($inputs) {//Valida si existe el elemento para entonces realizar la siguiente programación.
        $inputs.forEach((input) => {//Por cada elemento input se crea un span para la alerta. 
            const $span = document.createElement("span");//Por cada input se crea un span para la alerta en caso de no cumplir las validaciones.
            $span.classList.add("division__alert", "none");//Se agregar las clases correspondientes.
            $span.setAttribute("id", input.getAttribute("name"));//Se agrega un id para identificar la etiqueta.
            $span.textContent = input.getAttribute("title");//Asignación de contenido a la etiqueta.
            input.insertAdjacentElement("afterend", $span);//Inserción de la etiqueta.
        });

        document.addEventListener("keyup", (event) => {//"keyup" evento que se activa cada que deje de presionar una tecla.
            if(event.target.matches(".division__input[required]")) {//Si el elemento que origina el evento es igual a.
                const regEx = new RegExp(event.target.getAttribute("pattern"));//Se crea una expresión regular con el atributo pattern que tiene el input.
                if(regEx.exec(event.target.value) === null && event.target.value !== "") {//Valida solamente cuando no se cumple la expresión regular y cuando el input es diferente de vacío.
                    document.getElementById(event.target.getAttribute("name")).classList.remove("none");//En caso de no cumplirse la expresión regular y que el input tenga caracteres muestra el mensaje de validación.
                }else {
                    document.getElementById(event.target.getAttribute("name")).classList.add("none");//En caso de cumplirse la expresión regular se oculta el mensaje de validación.
                }
            }
        });

    }

} 

export default formValidation;//Se exporta la función que valida los formularios.