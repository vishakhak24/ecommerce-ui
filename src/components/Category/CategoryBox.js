import { Link } from "react-router-dom";

const CategoryBox = ({ category }) => {
  return (
    <div className="card h-100">
      <div className="embed-responsive embed-responsive-16by9">
        <img
          className="card-img-top embed-responsive-item"
          src={category && category.imageUrl}
          alt="Category Image"
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{category && category.categoryName}</h5>
        {
          <p className="card-text font-italic">
            {category &&
              category.description &&
              category.description.substring(0, 65)}
            ...
          </p>
        }
        <Link
          to={`/admin/category/${category && category.id}`}
          id="edit-category"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default CategoryBox;
