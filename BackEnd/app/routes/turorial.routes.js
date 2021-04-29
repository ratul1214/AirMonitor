module.exports = app => {
 // const users = require("../controllers/user.controller");
  const airdata = require("../controllers/airdata.controllers");
 // const booking = require("../controllers/booking.controller");
  //const parentdevice = require("../controllers/parentdevice.controller");
const { requireAuth } = require('../middleware/authMiddleware');
  var router = require("express").Router();

  

  router.post("/airdata/", airdata.create);
  //finde by parentdevice
  //router.get("/findbyparentdeviceid/:parentdeviceid", airdata.findbyparentdeviceid);
  // Retrieve all Tutorials
  router.get("/airdata/", airdata.findAll);
  // Retrieve all published Tutorials
  router.get("/dataDate", airdata.findbydate);
  // Retrieve a single Tutorial with id
  router.get("/airdata/:id", airdata.findOne);
  // Update a Tutorial with id
  router.put("/airdata/:id", airdata.update);
  // Delete a Tutorial with id
  router.delete("/airdata/:id", airdata.delete);
  // Create a new Tutorial
  router.delete("/airdata/", airdata.deleteAll);
  router.get("/findbyuserid/:userid", airdata.findbyuserid);

 

  app.use("/api/pollution", router);
};
