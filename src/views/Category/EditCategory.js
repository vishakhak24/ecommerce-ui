import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCategory = ({ categories, baseURL }) => {
  const { categoryId } = useParams();
  console.log("categoryId:", categoryId);
  // const locaion = useLocation()
  // const categoryId = location.state;

  const [id, setId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageURL] = useState("");
  // const [categoryIndex,setCategoryIndex] = useState('')

  useEffect(() => {
    const category = categories.filter(
      (category) => category.id == categoryId
    )[0];
    console.log("edit category:", category);
    setId(categoryId);
    setCategoryName(category.categoryName);
    setDescription(category.description);
    setImageURL(category.imageUrl);
    setCategoryName(category.categoryName);
  }, []);

  const editCategory = async () => {
    console.log("editCategory called");

    await axios
      .put(`${baseURL}category/update/${categoryId}`, {
        id,
        categoryName,
        description,
        imageUrl,
      })
      .then((res) => {
        console.log(res);
        swal({
          text: "Category Updated Successfully!",
          icon: "success",
          closeOnClickOutside: false,
        });
      })
      .catch((err) => console.log(err));

    // const res = await fetch(`${baseURL}category/update/${categoryId}`, {
    //     method : 'POST',
    //     headers :{
    //         'Content-type' : 'application/json'
    //     },
    //     body : JSON.stringify({id,categoryName,description,imageUrl})
    // })

    // const data = await res.json()
    // console.log("updaed data:", data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="pt-3">Edit Category</h3>
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
                value={categoryName}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className="form-group">
              <label>ImageURL</label>
              <input
                type="url"
                className="form-control"
                onChange={(e) => setImageURL(e.target.value)}
                value={imageUrl}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editCategory}
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

export default EditCategory;
