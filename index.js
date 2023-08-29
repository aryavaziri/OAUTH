require("dotenv").config();
const express = require("express");
const app = express();

const auth = require("./routes/auth");

app.use(auth);
app.get("/", (req, res) => {
  console.log(process.env.GOOGLE_CLIENT_ID);
  res.send('<a href="/login/google">GOOGLE SIGN IN</a>');
});

app.use((req, res) => {
  res.status(404).send("ERROR 404 - PAGE NOT FOUND");
});

app.listen(3000, () => {
  console.log("Listenning on port 3000");
});
