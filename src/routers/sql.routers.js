const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/sql.controllers");

router.get("/alumnoid", userCtrl.getAlum);
router.get("/alumnoids", userCtrl.getAlums);
router.post("/alumnoid", userCtrl.postAlum);
router.put("/alumnoid", userCtrl.putAlum);
router.delete("/alumnoid", userCtrl.deleteAlum);

module.exports = router;