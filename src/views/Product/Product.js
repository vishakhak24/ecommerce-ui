import { Link } from "react-router-dom";
import ProductBox from "../../components/Product/ProductBox";

const Product = ({ products }) => {
  console.log("products:", products);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Our Products</h3>
          <Link to="/admin/product/add" id="add-product">
            <button className="btn">Add a new Product</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <ProductBox key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
