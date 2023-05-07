const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

const styles = __dirname + "/assets";

app.use("/assets", express.static(styles));

const pageHTML = __dirname + "/public/index.html";

app.get("/", (req, res) => {
  res.sendFile(pageHTML);
});

app.get("/api/:date", (req, res) => {
  const param = req.params.date;
  const date = new Date(param);
  if (date.toString() === "Invalid Date") {
    const num = new Date(Number(param));
    if (num.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      const utc = num.toUTCString();
      const unix = num.valueOf();
      return res.json({ unix, utc });
    }
  } else {
    const utc = date.toUTCString();
    const unix = date.valueOf();
    return res.json({ unix, utc });
  }
});

app.all("*", (req, res) => {
  const unix = Date.now();
  res.json({ unix, utc: new Date(unix).toUTCString() });
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${listener.address().port}`);
});
