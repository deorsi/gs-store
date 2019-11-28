import React from "react";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.legth === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> R${cartAmount}
        <Button
          disabled={isCartEmpty}
          icon="cart"
          color="violet"
          floated="right"
          content="Checkout"
        />
      </Segment>
    </>
  );
}

export default CartSummary;
