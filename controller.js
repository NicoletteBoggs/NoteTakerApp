const router = require("express").Router();
const fs = require("fs");
let dbjson = require("./db/db.json");

// this endpoint fulfills /api/notes
router.get("/notes", (req, res) => {
  res.json(dbjson);
});
router.post("/notes", (req, res) => {
  let newmodel = {
    title: req.body.title,
    text: req.body.text,
    id: Math.random(),
  };
  dbjson.push(newmodel);
  fs.writeFileSync("./db/db.json", JSON.stringify(dbjson));
  res.json(dbjson);
});
router.delete("/notes/:id", (req, res) => {
  let newdb = [];
  // iterate over dbjson array and push current index note into new db array if its id does not match the req.params id of the note we are trying to throw away
  for (var i = 0; i < dbjson.length; i++) {
    if (dbjson[i].id != req.params.id) {
      newdb.push(dbjson[i]);
    }
  }
  dbjson = newdb;
  fs.writeFileSync("./db/db.json", JSON.stringify(dbjson));
  res.json(dbjson);
});
module.exports = router;
