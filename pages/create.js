import React from "react";
import {
  Form,
  Input,
  Button,
  Message,
  TextArea,
  Header,
  Image,
  Icon
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
    console.log(product);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add square" color="violet" />
        Cadastrar Produto
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Pronto!"
          content="Seu produto foi criado."
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Nome"
            placeholder="Nome do Produto"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            fluid
            control={Input}
            name="price"
            label="Preço"
            placeholder="Preço"
            min="0.00"
            step="0.10"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Imagem"
            accept="image/*"
            content="Escolha Imagem"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Descrição"
          placeholder="Descrição do Produto"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          inverted
          color="violet"
          icon="pencil alternate"
          content="Cadastrar"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
