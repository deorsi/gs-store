import React from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

function ProductAttributes({ description, _id }) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();

  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  }

  return (
    <>
      <Header as="h3">Sobre o produto</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Excluir Produto"
        onClick={() => setModal(true)}
      />
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirmar Ação</Modal.Header>
        <Modal.Content>
          <p>Você tem certeza que deseja excluir/deletar este produto?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModal(false)} content="Cancelar" />
          <Button
            Negative
            color="red"
            icon="trash"
            labelPosition="right"
            content="Excluir"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
