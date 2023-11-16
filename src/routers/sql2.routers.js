const {Router} = require ("express")
const routers = Router();
const userCtrl = require("../controller/sql2.controllers")

routers.get("/notasid", userCtrl.getmedia);
routers.get("/notasid", userCtrl.getmediaalum);
routers.get("/notasid", userCtrl.getAll);
routers.get("/notasid", userCtrl.getTeacher);
routers.get("/notasid", userCtrl.getsubj);


module.exports = routers;