const Methods = require("./controller/controller");
const controller = new Methods();
//Requerido en todos
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true })); //se usa para los post
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router); // creacion de ruta para las peticiones de la api

router.route("/personal/getAll/:txtSearch?").get((req, res) => {
  controller.getPersonalAll(req).then((data) => {
    res.json(data);
  });
});

router.route("/personal/insert").post((req, res) => {
  controller.insertPersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/personal/update/:id").put((req, res) => {
  controller.putPersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/personal/delete/:id").delete((req, res) => {
  controller.deletePersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/getChartPie").get((req, res) => {
  controller.getChartPie().then((data) => {
    res.json(data);
  });
});

router.route("/getChartBar").get((req, res) => {
  controller.getChartBar().then((data) => {
    res.json(data);
  });
});

router.route("/autoPersonal/:id").get((req, res) => {
  controller.getAutoPersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/autoPersonal/update/:id").put((req, res) => {
  controller.putAutoPersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/autoPersonal/delete/:id").delete((req, res) => {
  controller.deleteAutoPersonal(req).then((data) => {
    res.json(data);
  });
});

router.route("/autoPersonal/insert").post((req, res) => {
  controller.insertAutoPersonal(req).then((data) => {
    res.json(data);
  });
});

//creacion del puerto para ponerlo en escucha
const port = process.env.PORT || 8090;
app.listen(port);
