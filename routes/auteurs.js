var express = require("express");
var router = express.Router();


// Controller 
var auteur_controller = require("../controllers/auteur");

router.get("/", auteur_controller.getAll);

router.get("/:id", auteur_controller.getById);

router.post("/", auteur_controller.create);

router.put("/:id", auteur_controller.update);

router.delete("/:id", auteur_controller.delete);


module.exports = router;