const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const { transport } = require("../services/emailService");
const reviewMailOptions = require("../utils/reviewMailOptions");
router.get("/all", async (req, res) => {
  try {
    const data = await Retrieve.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const deleteItem = await Retrieve.findByIdAndDelete(itemId);
    if (deleteItem) {
      res.status(200).json({ success: true, message: "Item Deleted" });
    } else {
      res.status(404).json({ success: false, message: "Item Not Found" });
    }
  } catch (error) {
    console.error("Error deleting item", error);
    res.status(500).json({ success: false, message: "Error While Deleting" });
  }
});
router.post("/review/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const findItem = await Retrieve.findOne({ _id: itemId });

    if (findItem) {
      // console.log("This is findItem", findItem);
      const name = findItem.quote.name;
      const email = findItem.quote.email;
      if (!name || !email) {
        return res
          .status(400)
          .json({ success: false, message: "No Username Or email" });
      }
      const emailOptions = reviewMailOptions(email, name);
      try {
        await transport.sendMail(emailOptions);
        findItem.reviewRequest = true;
        findItem.save();
        res.json({ success: true, message: "Successful send email" });
      } catch (error) {
        console.error("Error When updating Database", error);
        res
          .status(500)
          .json({ success: false, message: "Error while sending email" });
      }
    } else {
      res.status(404).json({ success: false, message: "The List Not Found" });
    }
  } catch (error) {
    console.error("Error dealing on server", error);
    res
      .status(500)
      .json({ success: false, message: "Error while processing review" });
  }
});

module.exports = router;
