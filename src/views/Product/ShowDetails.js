import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ShowDetails = ({ baseURL, products, categories }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { productId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setId(productId);
    console.log("productId:", productId);

    const productObj = products.filter((product) => product.id == productId)[0];
    setProduct(productObj);

    const categoryObj = categories.filter((category) => {
      return category.id == productObj.categoryId;
    })[0];
    setCategory(categoryObj);
  }, []);

  const addToWishList = async (productId) => {
    console.log("product:", product);
    console.log("token:", token);
    await axios
      .post(`${baseURL}wishlist/add?token=${token}`, product)
      .then((res) => {
        if (res.status == 201) {
          swal({
            text: "Product added to wishlist",
            icon: "success",
            closeOnClickOutside: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          text: "Something wrong with add to wishlist",
          icon: "error",
          closeOnClickOutside: false,
        });
      });
  };

  const addToCart = () => {
    axios
      .post(`${baseURL}cart/add?token=${token}`, { productId, quantity })
      .then((res) => {
        // success
        if (res.status == 201) {
          swal({
            text: "Product Added to the cart!",
            icon: "success",
            closeOnClickOutside: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          text: "Something wrong with add to cart",
          icon: "error",
          closeOnClickOutside: false,
        });
      });
  };

  return (
    <div className="container">
      <div className="row pt-5">
        {/* <!--            Leave some empty space in left--> */}
        <div className="col-md-1"></div>
        {/* <!--                Display the image in left side--> */}
        <div className="col-md-4 col-12">
          <img
            src={product.imageURL}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        {/* <!-- Display product name category name and product description--> */}
        <div className="col-md-6 col-12 pt-3 pt-md-0">
          <h4>{product.name}</h4>

          <h6 className="category font-italic">{category.categoryName}</h6>

          <p>
            <span className="font-weight-bold">Description: -</span> <br />
            {product.description}
          </p>

          <div className="d-flex flex-row justify-content-between">
            <div className="input-group col-md-3 col-4 p-0">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Quantity
                </span>
              </div>
              <input
                className="form-control"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* <!-- wishlist button --> */}
            <button
              id="wishlist-button"
              className="btn mr-3 p-1 py-0"
              style={{ backgroundColor: "#b3a594" }}
              onClick={addToWishList}
            >
              Add to wishlist
            </button>

            {/* <!-- Add to cart button--> */}
            <button
              type="button"
              id="add-to-cart-button"
              className="btn"
              onClick={addToCart}
            >
              Add to Cart
              <ion-icon name="cart-outline"></ion-icon>
            </button>
          </div>

          {/* <!-- Dummy placeholder features --> */}
          <div className="features pt-3">
            <h5>
              <strong>Features</strong>
            </h5>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Officia quas, officiis eius magni error magnam voluptatem</li>
              <li>
                nesciunt quod! Earum voluptatibus quaerat dolorem doloribus
              </li>
              <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
              <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
