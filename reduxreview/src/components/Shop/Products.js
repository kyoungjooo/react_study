import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "PRODUCT1",
    price: 5,
  },
  {
    id: 2,
    title: "PRODUCT2",
    price: 2,
  },
  {
    id: 3,
    title: "PRODUCT3",
    price: 3,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
