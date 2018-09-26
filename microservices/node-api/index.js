const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const publicweb = "./publicweb";
const app = express();

app.use(
  cors({
    exposedHeaders: ["x-total-count"]
    // origin: ''
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);

app.use("/api", routes);

app.get("/info", (req, resp) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send({ fullUrl: fullUrl });
});

app.get("*", (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`API running on port:${port}`));
