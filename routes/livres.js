var express = require("express");
var router = express.Router();


// Controller 
var livre_controller = require("../controllers/livre");

router.get("/", livre_controller.getAll);

router.get("/:id", livre_controller.getById);

router.post("/", livre_controller.create);

router.put("/:id", livre_controller.update);

router.delete("/:id", livre_controller.delete);


module.exports = router;