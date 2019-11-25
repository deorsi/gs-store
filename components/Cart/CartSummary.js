import { Button, Segment, Divider } from "semantic-ui-react";

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> R$0.00
        <Button icon="cart" color="violet" floated="right" content="Checkout" />
      </Segment>
    </>
  );
}

export default CartSummary;
