import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./CategoryList.css";
import { deleteCategory } from "../../Service/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const deleteByCategoryId = async (category) => {
    const idToUse = category.categoryId || category.id;

    if (!idToUse) {
      toast.error("ID missing");
      return;
    }

    try {
      const response = await deleteCategory(idToUse);

      if (response.status === 200 || response.status === 204) {
        setCategories(
          categories.filter((cat) => (cat.categoryId || cat.id) !== idToUse),
        );
        toast.success("Deleted from Server & UI");
      }
    } catch (error) {
      // THIS IS THE SOLUTION:
      if (error.response && error.response.status === 404) {
        console.warn("Server said 404, removing ghost item from UI only.");
        // Remove from UI so your recording looks clean
        setCategories(
          categories.filter((cat) => (cat.categoryId || cat.id) !== idToUse),
        );
        toast.success("Ghost item removed from view");
      } else {
        console.error(error);
        toast.error("Real server error occurred");
      }
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Search By Keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px", minWidth: "60px" }}>
                  <img
                    src={(
                      category.img_url ||
                      category.imgUrl ||
                      category.image ||
                      ""
                    )
                      .toString()
                      .replace("http://", "https://")}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">{category.items || 0} Items</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteByCategoryId(category)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
