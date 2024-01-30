const error404 = (req, res) => {//Controlador que maneja el error 404.
    res.json({
        message: "error 404 Not found",
        error: true
    });
}

export default {//Se exporta un objeto con el controlador del error.
    error404
};