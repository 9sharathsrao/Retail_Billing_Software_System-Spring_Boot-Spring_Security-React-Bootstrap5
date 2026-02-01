import React, { useContext, useEffect, useState } from "react";
import "./CategoryForm.css";
import { assests } from "../../assets/assest";
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService";
import { AppContext } from "../../context/AppContext";

const CategoryForm = () => {
  const { setCategories, categories } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#f0ad4e", // Changed default to match your yellow theme
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Select Image for Category");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addCategory(formData);
      // Logic fix: Ensure categories array exists before spreading
      if (response.status === 201 || response.status === 200) {
        setCategories([...(categories || []), response.data]);
        toast.success("Category added Successfully.");

        setData({
          name: "",
          description: "",
          bgColor: "#f0ad4e",
        });
        setImage(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="category-form-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#2c3335",
        padding: "20px",
      }}
    >
      <div className="row justify-content-center">
        <div
          className="card col-md-11 shadow-lg border-0"
          style={{ backgroundColor: "#1e2426", borderRadius: "15px" }}
        >
          <div className="card-body p-4">
            <h3 className="text-light mb-4 fw-bold">Add New Category</h3>

            <form onSubmit={onSubmitHandler}>
              {/* Image Upload Section */}
              <div className="mb-4 text-center">
                <label
                  htmlFor="image"
                  className="form-label"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image ? URL.createObjectURL(image) : assests.upload}
                    alt="Upload"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "2px dashed #455a64",
                    }}
                  />
                  <p className="text-muted small mt-2">
                    Click to upload category icon
                  </p>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Category Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-light">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control text-white border-0"
                  style={{ backgroundColor: "#2c3335", padding: "12px" }}
                  placeholder="e.g. Electronics"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label text-light">
                  Description
                </label>
                <textarea
                  rows="3"
                  name="description"
                  id="description"
                  className="form-control text-white border-0"
                  style={{ backgroundColor: "#2c3335", padding: "12px" }}
                  placeholder="What's this category about?"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              {/* Color Picker */}
              <div className="mb-4">
                <label
                  htmlFor="bgcolor"
                  className="form-label text-light d-block"
                >
                  Theme Color
                </label>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="color"
                    name="bgColor"
                    id="bgcolor"
                    className="form-control form-control-color border-0"
                    style={{
                      backgroundColor: "transparent",
                      width: "60px",
                      height: "40px",
                    }}
                    onChange={onChangeHandler}
                    value={data.bgColor}
                    required
                  />
                  <span className="text-muted small">{data.bgColor}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100 fw-bold py-2 shadow-sm"
                style={{ borderRadius: "8px" }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : (
                  "Create Category"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
