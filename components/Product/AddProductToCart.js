import { Input } from "semantic-ui-react";

function AddProductToCart() {
  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantidade"
      value={1}
      action={{
        color: "orange",
        content: "Adicionar",
        icon: "plus cart"
      }}
    />
  );
}

export default AddProductToCart;
