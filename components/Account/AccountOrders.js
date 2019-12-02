import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  List,
  Image,
  Button
} from "semantic-ui-react";
import { useRouter } from "next/router";

function AccountOrders({ orders }) {
  const router = useRouter();

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="violet" content={order.createdAt} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3">
              Total: R${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item>
                  <Image avatar src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{p.product.name}</List.Header>
                    <List.Description>
                      {p.quantity} x ${p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="orange" size="tiny">
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  }

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Histórico de Compra
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header>
            <Icon name="copy outline" />
            Sem compras anteriores.
          </Header>
          <div>
            <Button onClick={() => router.push("/")} color="orange">
              Veja os Produtos
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
}

export default AccountOrders;
