import React, { useContext, useState } from "react";
import { assests } from "./../../assets/assest";
import { AppContext } from "./../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "./../../Service/ItemService";

const ItemForm = () => {
  const { categories, setItemsData, itemsData, setCategories } =
    useContext(AppContext);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addItem(formData);

      // Check for both 200 and 201 just in case
      if (response.status === 201 || response.status === 200) {
        // FIX 1: Use itemsData (the array) NOT setItemsData (the function)
        setItemsData([...itemsData, response.data]);

        // FIX 2: Update category item count correctly
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId === data.categoryId
              ? { ...category, items: (category.items || 0) + 1 }
              : category,
          ),
        );

        // SUCCESS TOAST - Will now fire correctly
        toast.success("Item added successfully!");

        // Reset Form
        setData({
          name: "",
          description: "",
          price: "",
          categoryId: "",
        });
        setImage(false);
      } else {
        toast.error("Unable to add item: Server returned " + response.status);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("An error occurred while adding the item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container bg-dark text-light border-secondary">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3 text-center">
                  <label
                    htmlFor="image"
                    className="form-label"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={image ? URL.createObjectURL(image) : assests.upload}
                      alt="Upload Preview"
                      style={{ maxWidth: "150px", borderRadius: "8px" }}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="category"
                    className="form-select bg-secondary text-white border-0"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                  >
                    <option value="">---Select Category---</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="₹200"
                    onChange={onChangeHandler}
                    value={data.price}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    name="description"
                    id="description"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Write content here"
                    onChange={onChangeHandler}
                    value={data.description}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Item"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
