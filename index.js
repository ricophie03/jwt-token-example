const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Users } = require("./src/entities//user");
const { connectToDatabase } = require("./src/database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    //   console.log("ini dari middleware : ",decoded.user);
    req.user = decoded.user;
    next();
  });
}

async function initializeDatabase() {
  const connDB = await connectToDatabase();
  if (connDB) {
    console.log("connected to DB.");
  }
}

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("server run on port ", port);
    });
  })
  .catch((error) => {
    console.log(`Error running server on port ${port} ::: `, error);
  });

app.post("/login", async (req, res) => {
  try {
    // Verify user credentials
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.log("error route login ::: ", error);
    return res.status(500).json({error : error});
  }
});

app.get("/verify", verifyToken, async (req, res) => {
    try {
        console.log("dari route get : ", req.user);
        return res.json(req.user);   
    } catch (error) {
        console.log("error route verify ::: ",error);
        return res.status(500).json({error : error});
    }
});
