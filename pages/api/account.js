import user from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
import User from "../../models/User";

connectDb();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send("Sem token de autenticação");
  }

  try {
   const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
   const user = await User.findOne({ _id: userId })
   if (user) {
     res.status(200).json(user);
   } else {
     res.status(404).send("Usuário não encontrado");
   }
  } catch (error) {
    res.status(403).send("Token inválido");
  }
}