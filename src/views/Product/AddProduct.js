import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";

const AddProduct = ({ baseURL, categories }) => {
  console.log("addProduct categories:", categories);
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addProduct = async () => {
    console.log("addProduct called");

    await axios
      .post(`${baseURL}product/create`, {
        categoryId: categoryId,
        name: productName,
        description: productDescription,
        imageURL: productImageUrl,
        price: productPrice,
      })
      .then((res) => {
        console.log("addProduct res", res);
        swal({
          text: "Product added",
          icon: "success",
          closeOnClickOutside: false,
        });
        setCategoryId(0);
        setProductName("");
        setProductDescription("");
        setProductImageUrl("");
        setProductPrice("");
      })
      .catch((err) => console.log(err));
  };

  const getCategory = () => {
    return categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Add new Product</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6 px-5 px-md-0">
          <form>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                required
                defaultValue="choose"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {/* <option v-for="category of categories" :key="category.id" :value="category.id">{{category.categoryName}}</option> */}
                {/* {categories.map((category) => {
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                                }) } */}
                <option value="choose" disabled>
                  -- Select Category --
                </option>
                {getCategory()}
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setProductDescription(e.target.value)}
                value={productDescription}
                required
              />
            </div>
            <div className="form-group">
              <label>ImageURL</label>
              <input
                type="url"
                className="form-control"
                onChange={(e) => setProductImageUrl(e.target.value)}
                value={productImageUrl}
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addProduct}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AddProduct;
