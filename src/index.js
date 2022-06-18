const app = require("express")();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const credentials = require("./credentials");
const corsOptions = require("./corsOptions");

app.use(cookieParser());

app.use(credentials);
app.use(cors(corsOptions));

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// routers
app.get('/',(req,res)=>{
  console.log("kkk");
  res.send("service 2 running Succesfully")
})

app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5012;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
