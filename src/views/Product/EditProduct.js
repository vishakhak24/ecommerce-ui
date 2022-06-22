import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = ({ baseURL, products, categories }) => {
  const [id, setId] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const { productId } = useParams();

  useEffect(() => {
    const product = products.filter((product) => product.id == productId)[0];
    console.log("product:", product);
    setId(productId);
    setCategoryId(product.categoryId);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductImageUrl(product.imageURL);
    setProductPrice(product.price);
  }, []);

  const editProduct = async () => {
    await axios
      .put(`${baseURL}product/update/${id}`, {
        id: productId,
        categoryId: categoryId,
        name: productName,
        description: productDescription,
        imageURL: productImageUrl,
        price: productPrice,
      })
      .then(() => {
        swal({
          text: "Product has been updated",
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Edit Product</h3>
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
                onChange={(e) => setCategoryId(e.target.value)}
                required
                defaultValue="selected"
              >
                <option value="selected" disabled>
                  -- Select Category --
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>ImageURL</label>
              <input
                type="url"
                className="form-control"
                value={productImageUrl}
                onChange={(e) => setProductImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editProduct}
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

export default EditProduct;
