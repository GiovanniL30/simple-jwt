import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({
      message: "Please provide username and password on the request body",
    });

  const isAuthenticated = true;
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(username);
  res.status(200).json({ token });
});

app.get("/api/info", validateToken, (req, res) => {
  res
    .status(200)
    .json({ data: `Hello ${req.username} this is the secret data` });
});

app.listen(1099, () => console.log("Server is running on port 1099"));

function generateToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: "1h" });
}

function validateToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acces token is not found, please log in again" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid token, , please log in again" });
    }
    req.username = decoded.username;
    next();
  });
}
