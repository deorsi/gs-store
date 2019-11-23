import { Card } from "semantic-ui-react";

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `R$${product.price}`,
      color: "teal",
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }
  return (
    <Card.Group
      itemsPerRow="4"
      npm
      centered
      stackable
      items={mapProductsToItems(products)}
    />
  );
}

export default ProductList;
