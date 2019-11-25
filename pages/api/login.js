import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1 check to see if a user exists with email
    const user = await User.findOne({ email }).select("+password");
    // 2 if not, return an error
    if (!user) {
      return res.status(404).send("Não existem usuários com esse email.");
    }
    // 3 check to see if the password matches with the db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4 if it is, generate the token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      // 5 send the token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send("Senha e/ou email não combinam.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao logar.");
  }
};
