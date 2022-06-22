import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = ({ baseURL }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const token = localStorage.getItem("token");

  const isDisabled = () => {};

  const setQuantity = (updatedQuantity, id) => {
    console.log("cartItem id:", id);
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        console.log();
        return { ...cartItem, quantity: updatedQuantity || 0 };
      }
      return cartItem;
    });

    let totalAmount = 0;
    newCartItems.map((cartItem) => {
      totalAmount = totalAmount + cartItem.product.price * cartItem.quantity;
    });

    console.log("totalAmount:", totalAmount);
    console.log("newCartItems:", newCartItems);
    setCartItems(newCartItems);
    setTotalCost(totalAmount);
  };

  const listCartItems = () => {
    axios
      .get(`${baseURL}cart/?token=${token}`)
      .then((res) => {
        if (res.status == 200) {
          const result = res.data;
          setCartItems(result.cartItems);
          setTotalCost(result.totalCost);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteItemFromCart = (cartItem) => {
    console.log("deleteItemFromCart:", cartItem);

    axios
      .delete(`${baseURL}cart/delete/${cartItem.id}?token=${token}`)
      .then((res) => {
        if (res.status == 200) {
          console.log("res:", res);

          const newCartItems = cartItems.filter((ci) => cartItem.id != ci.id);
          setCartItems(newCartItems);

          const totalAmount =
            totalCost - cartItem.product.price * cartItem.quantity;
          setTotalCost(totalAmount);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listCartItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Shopping cart</h3>
        </div>
      </div>
      {/* <!--    loop over all the cart items and display one by one--> */}
      {cartItems.map((cartItem) => (
        <div
          key={cartItem.product.id}
          className="row mt-2 pt-3 justify-content-around"
        >
          <div className="col-2"></div>
          {/* <!-- display image --> */}
          <div className="col-md-3 embed-responsive embed-responsive-16by9">
            <Link to={`/product/show/${cartItem.product.id}`}>
              <img
                src={cartItem.product.imageUrl}
                className="w-100 card-img-top embed-responsive-item"
              />
            </Link>
          </div>
          {/* <!-- display product name, quantity and price --> */}
          <div className="col-md-5 px-3">
            <div className="card-block px-3">
              <h6 className="card-title">
                <Link to={`/product/show/${cartItem.product.id}`}>
                  {cartItem.product.name}
                </Link>
              </h6>
              <p id="item-price" className="mb-0 font-weight-bold">
                $ {cartItem.product.price} per unit
              </p>
              <p id="item-quantity" className="mb-0">
                Quantity :
                <input
                  size="1"
                  className="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    setQuantity(parseInt(e.target.value), cartItem.id)
                  }
                />
              </p>
              <p id="item-total-price" className="mb-0">
                Total :{" "}
                <span className="font-weight-bold">
                  {" "}
                  $ {cartItem.product.price * cartItem.quantity}
                </span>
              </p>
              <br />
              <a href="#" onClick={() => deleteItemFromCart(cartItem)}>
                Remove From Cart
              </a>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-12">
            <hr />
          </div>
        </div>
      ))}

      {/* <!-- display total price --> */}
      <div className="total-cost pt-2 text-right">
        <h5>Total : $ {totalCost}</h5>
        <button
          //   disabled={isDisabled}
          type="button"
          className="btn btn-primary confirm"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
