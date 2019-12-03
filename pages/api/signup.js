import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1 validate name, email & password
    if (!isLength(name, { min: 2, max: 12 })) {
      return res.status(422).send("Nome precisa ter 2-12 caracteres.");
    } else if (!isLength(password, { min: 8 })) {
      return res.status(422).send("Senha precisa ter pelo menos 8 caracteres.");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email precisa ser válido.");
    }
    // 2 check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`Já existe um usuário com o email ${email}`);
    }
    // 3 if not, hash (encrypt) their password
    const hash = await bcrypt.hash(password, 10);
    // 4 create new user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    // 5 create a cart for neu user
    await new Cart({ user: newUser._id }).save();
    // 6 create token for new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    // 7 send back the token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erro ao logar. Por favor tente novamente daqui a pouco.");
  }
};
