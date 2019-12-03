import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
import Cart from "../../models/Cart";

connectDb();

// GET -> handleGetRequest
// POST -> handlePostRequest
// DELETE -> handleDeleteRequest

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Método ${req.method} não permitido`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handlePostRequest(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res
        .status(422)
        .send("Por favor, preencha todos os campos do produto");
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor ao criar produto");
  }
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  try {
    // delete product by id
    await Product.findOneAndDelete({ _id });
    // remove product from all carts, referenced as 'product'
    await Cart.updateManuy(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar produto");
  }
}
