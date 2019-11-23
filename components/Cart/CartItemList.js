import { Header, Segment, Button, Icon } from "semantic-ui-react";

function CartItemList() {
  const user = false;

  return (
    <Segment secondary color="grey" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        Não existem produtos no seu carrinho. <br />
        Adicione alguns!
      </Header>
      <div>
        {user ? (
          <Button color="green">Ir para Produtos</Button>
        ) : (
          <Button color="orange">Login para Comprar</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
