const db = require("../airdatamodel");
const Airdata = db.airdatas;

// Create and Save a new Airdata
exports.create = (req, res) => {
  // Validate request
 

  // Create a Airdata
  const airdata = new Airdata({
    latitude: req.body.latitude,
      longitude: req.body.longitude,
    location: req.body.location,
      co2ppm: req.body.co2ppm,
      temperature: req.body.temperature,
humidity: req.body.humidity,
airpollution: req.body.airpollution,
dailyrating: req.body.dailyrating,
weeklyrating : req.body.weeklyrating,
monthlyrating : req.body.monthlyrating,
dataDate :  req.body.dataDate
  });

  // Save Airdata in the database
  airdata
    .save(airdata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Airdata."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Airdata.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Airdata with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Airdata.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Airdata with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Airdata with id=" + id });
    });
};
// findby email
exports.findbyavailable = (req, res) => {
  
 Airdata.find({  available : true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });


};

// findby parentdevice id
exports.findbydate = (req, res) => {
  const dataDate = req.params.dataDate;
 Airdata.find({ dataDate : dataDate })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });


};

exports.findbyuserid = (req, res) => {
  const userid = req.params.userid;
 Airdata.find({ userid: userid })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });


};

// Update a Airdata by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Airdata.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Airdata with id=${id}. Maybe Airdata was not found!`
        });
      } else res.send({ message: "Airdata was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Airdata with id=" + id
      });
    });
};

// Delete a Airdata with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Airdata.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Airdata with id=${id}. Maybe Airdata was not found!`
        });
      } else {
        res.send({
          message: "Airdata was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Airdata with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Airdata.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Airdata.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
