import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const AddCategory = ({ baseURL }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // add category
  const addCategory = async () => {
    console.log("addCategory clicked");

    // const res = await fetch('http://localhost:5000/products', {
    //     method : 'POST',
    //     headers : {
    //         'content-type' : 'application/JSON',
    //     },
    //     body : JSON.stringify(category)
    // })

    // console.log(await res.json());

    await axios
      .post(`${baseURL}category/create`, {
        categoryName,
        description,
        imageUrl,
      })
      .then((res) => {
        console.log(res);
        swal({
          text: "Category Added Successfully!",
          icon: "success",
          closeOnClickOutside: false,
        });

        setCategoryName("");
        setDescription("");
        setImageUrl("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Add new Category</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6 px-5 px-md-0">
          <form>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setCategoryName(e.target.value)}
                required
                value={categoryName}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
                value={description}
              />
            </div>
            <div className="form-group">
              <label>ImageURL</label>
              <input
                type="url"
                className="form-control"
                onChange={(e) => setImageUrl(e.target.value)}
                required
                value={imageUrl}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addCategory}
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

export default AddCategory;
