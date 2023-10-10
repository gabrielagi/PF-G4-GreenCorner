import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  addProduct,
} from "../../../../Redux/actions/product/action";
import styles from "./Create.module.css";
import Select from "react-select";

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 4 || input.name.length > 256) {
    errors.name = "The name must be between four and 256 characters";
  }
  if (
    isNaN(input.price) ||
    input.price <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.price = "Price must be a valid number greater than 0";
  }
  if (
    isNaN(input.stock) ||
    input.stock <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.stock = "Stock must be a valid number greater than or equal to 0";
  }
  if (input.description.length > 256) {
    errors.description = "Description must not exceed 256 characters";
  }
  return errors;
}

export default function Create() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    available: true,
    isTrending: false,
    categories: [],
    images: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setInput({
        ...input,
        [name]: checked,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  }

  function handleCategoryChange(selectedCategories) {
    setInput({
      ...input,
      categories: selectedCategories.map((c) => c.value),
    });
  }

  async function handlePhotoChange(event) {
    const fileUpload = event.target.files[0];
    try {
      const base64 = await convertBase64(fileUpload);
      const updatedPhotos = [...input.images, base64];
      setInput({ ...input, images: updatedPhotos });
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleImageDelete(index) {
    const updatedImages = [...input.images];
    updatedImages.splice(index, 1);
    setInput({ ...input, images: updatedImages });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        dispatch(addProduct(input));
        alert("Success");
        setInput({
          name: "",
          price: "",
          stock: "",
          description: "",
          available: true,
          isTrending: false,
          categories: [],
          images: [],
        });
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Error: Please insert correct values");
    }
  };

  return (
    <div>
      <div className={styles.contGral}>
        <div className={styles.card}>
          <div className={styles.contTitle}>
            <div className={styles.title}>Create your product</div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className={styles.inputs}
                  />
                  {errors.name && (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                </div>

                <div>
                  <div>Price:</div>
                  <input
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                    className={styles.inputs}
                  />
                  {errors.price && (
                    <div className={styles.error}>{errors.price}</div>
                  )}
                </div>

                <div>
                  <div>Categories:</div>
                  <Select
                    options={categories.map((cate) => ({
                      value: cate.id,
                      label: cate.name,
                    }))}
                    isMulti
                    onChange={(selectedOptions) =>
                      handleCategoryChange(selectedOptions)
                    }
                    className={styles.select}
                  />
                </div>

                <div>
                  <div>Stock:</div>
                  <input
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleChange(e)}
                    placeholder="Stock"
                    className={styles.inputs}
                  />
                  {errors.stock && (
                    <div className={styles.error}>{errors.stock}</div>
                  )}
                </div>
              </div>

              <div className={styles.der}>
                <div>
                  <div>Description:</div>
                  <textarea
                    name="description"
                    style={{ resize: "none", height: "100px" }}
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    className={styles.inputs}
                  />
                  {errors.description && (
                    <div className={styles.error}>{errors.description}</div>
                  )}
                </div>
                <div>
                  <div>Available:</div>
                  <input
                    type="checkbox"
                    name="available"
                    checked={input.available}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <div>Is Trending:</div>
                  <input
                    type="checkbox"
                    name="isTrending"
                    checked={input.isTrending}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <div>Images:</div>
                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => handlePhotoChange(e)}
                    multiple
                  />
                </div>
                <div className={styles.imagePreview}>
                  {input.images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className={`${styles.previewImage} ${styles.imageHoverEffect}`}
                        onClick={() => handleImageDelete(index)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  id="bt"
                  className={styles.button}
                  onClick={(e) => handleSubmit(e)}
                  disabled={Object.keys(errors).length > 0}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
