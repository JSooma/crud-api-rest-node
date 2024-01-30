const $table = document.querySelector(".division__table");
const $addForm = document.querySelector(".division__form-add");
const $updateForm = document.querySelector(".division__form-update");
const $tbody = document.querySelector(".division__tbody");
const $fragment = document.createDocumentFragment();
let jsonArray = [];

const request = async () => {
    if($table) {//Valida si existe el elemento para entonces realizar la siguiente programación.
        try {//GET.
        
            let request = await fetch("http://localhost:3000/things");
            let json = await request.json();

            if(json.error) throw {status: json.error, statusText: json.message};

            for(let i = 0; i < json.length; i++) {
                jsonArray[i] = Object.values(json[i]);
            }

            for(let i = 0; i < jsonArray.length - 1; i++) {
                const $tr = document.createElement("tr");
                $tr.setAttribute("class", "division__tr");

                for(let j = 0; j < jsonArray[0].length + 1; j++) {
                    const $td = document.createElement("td");
                    $td.setAttribute("class", "division__td");
                    $td.textContent = jsonArray[i][j];

                    if(j === 3) {
                        const $updateBtn = document.createElement("a");
                        $updateBtn.setAttribute("class", "division__btn");
                        $updateBtn.setAttribute("href", `update.html?id=${jsonArray[i][0]}`);
                        $updateBtn.textContent = "Actualizar";

                        const $deleteBtn = document.createElement("button");
                        $deleteBtn.classList.add("division__btn", "division__btn--delete");
                        $deleteBtn.setAttribute("data-id", jsonArray[i][0]);
                        $deleteBtn.textContent = "Eliminar";

                        $td.appendChild($updateBtn);
                        $td.appendChild($deleteBtn);
                    }

                    $tr.appendChild($td);
                }

                $fragment.appendChild($tr);

            }
            $tbody.appendChild($fragment);

    
        }catch(err) {
            const message = err.statusText || "Ocurrió un error 404";
            const $errorp = document.createElement("p");
            $errorp.setAttribute("class", "division__h1");
            $errorp.textContent = message;
            $table.classList.add("none");
            $table.insertAdjacentElement("afterend", $errorp);

        }
    }

    if($addForm) {//Valida si existe el elemento para entonces realizar la siguiente programación.
        document.addEventListener("submit", async (event) => {
            if(event.target.matches(".division__form-add")) {
                event.preventDefault();
                try{//POST.
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({//revisar metodo sringify y json
                            name: $addForm.name.value,
                            description: $addForm.description.value
                        })
                        
                    };
                
                    let request = await fetch("http://localhost:3000/things", options);
                    let json = await request.json();
        
                    if(json.error) throw {status: json.error, statusText: json.message};
                    window.location.href = "home.html";

                }catch(err) {   
                    let message = err.statusText || "Ocurrió un error, no se pudo agregar el registro.";
                    window.alert(message);
                }
            }
        });
    }

    if($updateForm) {//Valida si existe el elemento para entonces realizar la siguiente programación.
        let urlParams = new URLSearchParams(window.location.search);
        try {//Estas peticiones validan si existe el usuario que se va a modificar.
            let request = await fetch(`http://localhost:3000/things/${urlParams.get("id")}`);
            let json = await request.json();

            if(json.error) throw {status: json.error, statusText: json.message};

            $updateForm.name.value = json[0].name;
            $updateForm.description.value = json[0].description;
            
        }catch(err) {//En caso de que el usuario no exista se redirige a home.
            window.location.href = "home.html";
        }

        document.addEventListener("submit", async (event) => {
            if(event.target.matches(".division__form-update")) {
                event.preventDefault();
                try {//PUT.
                    let options = {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                            name: $updateForm.name.value,
                            description: $updateForm.description.value
                        })
                    }

                    let request = await fetch(`http://localhost:3000/things/${urlParams.get("id")}`, options);
                    let json = await request.json();

                    if(json.error) throw {status: json.error, statusText: json.message};

                    window.location.href = "home.html"

                }catch(err) {
                    let message = err.statusText || "Ocurrió un error, no se pudo actualizar el registro.";
                    window.alert(message);
                }
            }
        });

    }

    if(document.querySelector(".division__btn--delete")) {//Valida si existe el elemento para entonces realizar la siguiente programación.
        document.addEventListener("click", async (event) => {
            if(event.target.matches(".division__btn--delete")) {
                let confirm = window.confirm("Estás seeguro de que quieres eliminar este objeto?");//Pregunta si quieres realmente borrar el objeto.

                if(confirm) {//Valida si el usuario realmente quiere eliminar ese objeto.
                    try{//DELETE.  
                        let options = {
                            method: "DELETE",
                            hedaers: {
                                "Content-type": "application/json; charset=utf-8"
                            }
                        }
    
                        let request = await fetch(`http://localhost:3000/things/${event.target.dataset.id}`, options);
                        let json = await request.json();

                        if(json.error) throw {status: json.error, statusText: json.message};
                        
                        window.location.reload();

                    }catch(err) {
                        let message = err.statusText || "Ocurrió un error, no se pudo borrar el registro";
                        window.alert(message);
                    }
                }
            }
        }); 

    }

};

export default request;//Se exporta la función que realiza las peticiones.

