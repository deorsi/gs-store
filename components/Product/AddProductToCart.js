import React from "react";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = React.useState(1);
  const router = useRouter();

  async function handleAddProductToCart() {
    const url = `${baseUrl}/api/cart`;
    const payload = { quantity, productId };
    const token = cookie.get("token");
    const headers = { headers: { Authorization: token } };
    const response = await axios.put(url, payload, headers)
  }

  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantidade"
      value={quantity}
      onChange={e => setQuantity(Number(e.target.value))}
      action={
        user
          ? {
              color: "orange",
              content: "Adicionar",
              icon: "plus cart",
              onClick: handleAddProductToCart()
            }
          : {
              color: "violet",
              content: "Login para Comprar",
              icon: "signup",
              onClick: () => router.push("/signup")
            }
      }
    />
  );
}

export default AddProductToCart;
