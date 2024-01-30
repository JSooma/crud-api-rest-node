
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import thingsController from "./controllers/things_controller.js";
import errorController from "./controllers/error_controller.js";

const app = express();//Se crea una instancia de express.

//Middlewares.
app.use(cors());//Soluciona el problema del intercambio de recursos de origen cruzado.
app.use(helmet());//Protege la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP en las respuestas.
app.use(morgan("dev"));//Logger, lleva un registro de los códigos de estado de respuesta de las peticiones.
app.use(express.json());//Parsea el cuerpo de las peticiones a un objeto JavaScript.
app.use(express.urlencoded({extended: false}));//Parsea los datos enviados por formularios en un objeto JavaScript.
 
//Rutas.
app.get("/things", thingsController.getThings);
app.post("/things", thingsController.addThing);
app.put("/things/:id", thingsController.updateThing);
app.delete("/things/:id", thingsController.deleteThing);
app.get("/things/:id", thingsController.getThing);

app.use(errorController.error404);//Ruta del error.

//Se levanta el servidor.
app.listen(process.env.PORT, () => {
    console.log(`API de tipo REST ejecutandose en el puerto ${process.env.PORT}`);
});
