import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Método ${req.method} não permitido`);
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Sem token de autenticação.");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Por favor, faça o login novamente.");
  }
}

async function handlePutRequest(req, res) {
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Sem token de autenticação.");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
  } catch (error) {
    console.error(error);
    res.status(403).send("Por favor, faça o login novamente.");
  }
}
