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
module.exports = router;
