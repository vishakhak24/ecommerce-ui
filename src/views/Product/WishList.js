import { useState, useEffect } from "react";
import ProductBox from "../../components/Product/ProductBox";
import axios from "axios";

const WishList = ({ baseURL }) => {
  const [products, setProducts] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    axios
      .get(`${baseURL}wishlist/${token}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Your WishList</h4>
        </div>
      </div>

      <div className="row">
        {products &&
          products.map((product, index) => (
            <ProductBox key={index} product={product}></ProductBox>
          ))}
      </div>
    </div>
  );
};

export default WishList;
