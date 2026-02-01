import React from "react";
import "./ManageCategory.css"
import './ManageCategory.css'
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import CategoryList from "../../components/CategoryList/CategoryList";

const ManageCategory = () => {
  return (
    <div className="category-container text-light">

      {/* Responsible for displaying the forms */}
      {/* category_form */}
      <div className="left-column">
        <CategoryForm/>
      </div>

      {/* Responsible for displaying the list of categories */}
      {/* list of categories */}
      <div className="right-column">
        <CategoryList/>
      </div>
    </div>
  );
};
export default ManageCategory;
