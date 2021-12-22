router = require("express").Router();
apiRoutes = require("./api");
htmlRoutes = require("./html");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

router.get("/exercise", async (req, res) => {
  //   res.status(200).json({ message: "success..." });
  res.status(200).redirect("./exercise.html");
});
module.exports = router;
