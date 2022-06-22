import CategoryBox from "../../components/Category/CategoryBox";
import { Link } from "react-router-dom";

const Category = ({ categories }) => {
  console.log("categories:", categories);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3 categoryTitle">Our Categories</h4>
          <Link to="/admin/category/add" id="add-category">
            <button className="btn">Add a new Category</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-md-6 col-xl-4 col-12 pt-3  justify-content-around"> */}
        {categories.map((category) => (
          <CategoryBox key={category.id} category={category} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Category;
