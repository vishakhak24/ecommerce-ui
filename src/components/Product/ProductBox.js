import { Link } from "react-router-dom";

const ProductBox = ({ product }) => {
  return (
    <div className="product card h-100">
      <div className="embed-responsive embed-responsive-16by9">
        <img
          className="card-img-top embed-responsive-item"
          src={product && product.imageURL}
          alt="Product Image"
        />
      </div>
      <div className="card-body">
        <Link to={`/product/show/${product && product.id}`}>
          <h5 className="card-title">{product && product.name}</h5>
        </Link>
        <p className="card-text">
          <sup>$</sup>
          {product && product.price}
        </p>
        <p className="card-text font-italic">
          {product &&
            product.description &&
            product.description.substring(0, 65)}
          ...
        </p>
        <Link to={`/admin/product/${product && product.id}`} id="edit-product">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProductBox;
