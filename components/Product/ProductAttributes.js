import { Header, Button } from "semantic-ui-react";

function ProductAttributes({ description }) {
  return (
    <>
      <Header as="h3">Sobre o produto</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Deletar Produto"
      />
    </>
  );
}

export default ProductAttributes;
