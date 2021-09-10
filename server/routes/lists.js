const express = require("express");
const router = express.Router();
const List = require("../models/list");
router.get("/", async (req, res) => {
  try {
    console.log("GET - Try block accessed");
    const list = await List.find({});
    res.status(200).json({ list });
  } catch (error) {
    res.status(505).json({ msg: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });
    res.status(200).json(list);
    if (!list) {
      return res.status(404).json({ msg: `No list with id: ${list}` });
    }
  } catch (error) {
    res.send("GET Error: " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).json({ list });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id: listID } = req.params;
    const list = await List.findOneAndUpdate({ _id: listID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!list) {
      return res.status(404).json({ msg: `No task with id : ${listID}` });
    }
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id: listID } = req.params;
    const list = await List.findOneAndDelete({ _id: listID });
    if (!list) {
      return res.status(404).json({ msg: `No task with id : ${listID}` });
    }
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
module.exports = router;
