import connection from "../model/database.js";//Se importa la conexión con la base de datos.

let endpoints = {//Endpoints de la API.
        things_url: "http://localhost:3000/things",
        thing_url: "http://localhost:3000/things{/id}"
}

const getThings = (req, res) => {//Controlador para obtener todos los registros.
    connection.query("SELECT * FROM things", (error, results, fields) => {
        if(error) {
            console.log("Se haproducido un error");
            res.json({message: "Error, no se pudo obtener los datos", error: true});
        }else {
            results.push(endpoints);
            res.json(results);
        }
    });
}

const addThing = (req, res) => {//Controlador para agregar un nuevo registro a la base de datos.
    let name = req.body.name;
    let description = req.body.description;

    if(name !== "" && description !== "") {//Valida que los datos obtenidos no sean vacíos.
        connection.query("INSERT INTO things(name, description) VALUES (?, ?)", [name, description], (error, results, fields) => {
            if(error) {
                console.log("Se ha producido un error");
                res.json({message: "Error, no se pudieron agregar los datos", error: true});
            }else {
                res.json({message: "Los datos fueron agregados correctamente", ok: true});
            }
        });
    }else {
        res.json({message: "Error, no puedes agregar valores vacíos", ok: false});
    }
}

const updateThing = (req, res) => {//Controlador para actualizar un registro a la base de datos.
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;

    connection.query("UPDATE things SET name= ?, description= ? WHERE thing_id= ?", [name, description, id], (error, results, fields) => {
        if(error || results.affectedRows === 0) {//Valida si hubo un error o si no se afectó ninguna columna en la base de datos.
            console.log("Se ha producido un error");
            res.json({message: "Error, no se pudieron actualizar los datos", error: true});
        }else {
            res.json({message: "Los datos fueron actualizados correctamente", ok: true});
        }
    });
}

const deleteThing = (req, res) => {//Controlador para eliminar un registro de la base de datos.
    let id = req.params.id
    connection.query("DELETE FROM things WHERE thing_id = ?", [id], (error, results, fields) => {
        if(error || results.affectedRows === 0) {//Valida si hubo un error o si no se afectó ninguna columna en la base de datos.
            console.log("Se ha producido un error");
            res.json({message: "Error, no se pudieron eliminar los datos", error: true});
        }else {
            res.json({message: "Los datos fueron eliminados correctamente", ok: true});
        }
    });
}

const getThing = (req, res) => {//Controlador para obtener un registro específico de la base de datos.
    let id = req.params.id;
    connection.query("SELECT * FROM things WHERE thing_id = ?", [id], (error, results, fields) => {
        if(error || results.length === 0) {//Valida si hubo un error o si no se afectó ninguna columna en la base de datos.
            console.log("Se haproducido un error");
            res.json({message: "Error, no se pudieron recuperar los datos", error: true});
        }else {
            results.push(endpoints);
            res.json(results);
        }   
    });
}

export default {//Se exporta un objeto con todos los controladores.
    getThings,
    addThing,
    updateThing,
    deleteThing,
    getThing
};
