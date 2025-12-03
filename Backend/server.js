import express from "express";
import { db } from "./db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/addingorder", async (req, res) => {
  const { productname, quantity, status } = req.body;
  try {
    await db.query(
      "INSERT INTO ORDERS (PRODUCTNAME, QUANTITY,STATUS) VALUES (?,?,?)",
      [productname, quantity, status]
    );

    res.status(200).send("Product added successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Product is not added");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM ORDERS");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to fetch data");
  }
});

app.put("/update", async (req, res) => {
  const { id, status } = req.body;
  try {
    await db.query("UPDATE ORDERS SET STATUS = ? WHERE id = ?", [status, id]);
    res.status(200).send("Order status updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to update");
  }
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await db.query("SELECT * FROM ORDERS WHERE id = ?", [id]);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to find order details");
  }
});

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});
