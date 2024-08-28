import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Bad request: Missing username or password" });
  }

  // Simulate authentication (you should replace this with actual authentication logic)
  if (username === "testuser" && password === "testpassword") {
    const token = jwt.sign({ name: username }, "secret-key", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Success Login", token });
  }

  res
    .status(401)
    .json({ message: "Unauthorized: Invalid username or password" });
});

app.get("/api/products", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secret-key", (err, user) => {
    if (err) return res.sendStatus(403);

    // Simulate products data (replace this with actual data from your database)
    const products = [
      { name: "Product 1" },
      { name: "Product 2" },
      { name: "Product 3" },
    ];

    res.status(200).json({ products });
  });
});

app.listen(1099, () => {
  console.log("Server is running on port 1099");
});
