    import React, { useState, useEffect } from "react";
    import Modal from "react-modal";
    import Select from "react-select";
    import styles from "./EditProductPopup.module.css";

    Modal.setAppElement("#root");

    function validate(input) {
    const errors = {};
    if (!input.name || input.name.length < 2 || input.name.length > 25) {
        errors.name = "The name must be between 2 and 25 characters";
    }
    if (isNaN(input.price) || input.price <= 0 || input.price.toString().length > 256) {
        errors.price = "Price must be a valid number greater than 0";
    }
    if (isNaN(input.stock) || input.stock < 0 || input.stock.toString().length > 256) {
        errors.stock = "Stock must be a valid number greater than or equal to 0";
    }
    if (input.description.length > 256) {
        errors.description = "Description must not exceed 256 characters";
    }
    if (input.images.length > 5 || input.images.length === 0) {
        errors.images = "Images must been between 1 and 5";
    }
    if (input.categories.length === 0) {
        errors.categories = "You must select at least one category";
    }
    return errors;
    }

    function EditProductPopup({ product, isOpen, onRequestClose, onSave, allCategories }) {
        const [editedProduct, setEditedProduct] = useState({
        ...product,
        });
        const [errors, setErrors] = useState({});
    
        useEffect(() => {
        setErrors(validate(editedProduct));
        }, [editedProduct]);
    
        function handleChange(e) {
        const { name, type, checked, value } = e.target;
    
        const updatedEditedProduct = {
            ...editedProduct,
            [name]: type === "checkbox" ? checked : value,
        };
        setEditedProduct(updatedEditedProduct);
        }
    
        const selectedCategories = editedProduct.categories.map((category) => ({
            label: category.name,
            value: category.id, 
          }));
        
          function handleCategoryChange(selectedOptions) {
            const updatedCategories = [];
            
            selectedOptions.forEach((option) => {
              const matchingCategory = allCategories.find((category) => category.name === option.label);
          
              if (matchingCategory && !updatedCategories.some((cat) => cat.id === matchingCategory.id)) {
                updatedCategories.push({
                  name: option.label,
                  id: matchingCategory.id,
                });
              } else if (!matchingCategory) {
                updatedCategories.push({
                  name: option.label,
                });
              }
            });
          
            setEditedProduct({
              ...editedProduct,
              categories: updatedCategories,
            });
          }
          


        async function handlePhotoChange(event) {
        const files = event.target.files;
        const updatedPhotos = [...editedProduct.images];
    
        for (let i = 0; i < files.length; i++) {
            try {
            const base64 = await convertBase64(files[i]);
            updatedPhotos.push(base64);
            } catch (error) {
            console.error("Error loading image:", error);
            }
        }
    
        setEditedProduct({
            ...editedProduct,
            images: updatedPhotos,
        });
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
        }
    
        function handleImageDelete(index) {
        const updatedImages = [...editedProduct.images];
        updatedImages.splice(index, 1);
        setEditedProduct({
            ...editedProduct,
            images: updatedImages,
        });
        }
    
        const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(editedProduct)
        console.log(editedProduct)
    
        if (Object.keys(validationErrors).length === 0) {
            console.log(editedProduct);
            onSave(editedProduct);
            onRequestClose();
        } else {
            setErrors(validationErrors);
        }
        }

        return (
            <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Product"
            className={styles["edit-modal-content"]}
            overlayClassName={styles["edit-modal-overlay"]}
            >
            <h2 className={styles["edit-modal-title"]}>Edit Product</h2>
            <div className={`${styles["edit-modal-form"]} ${styles["scrollable-content"]}`}>
                <div className={styles["edit-modal-izq"]}>
                <div>
                    <div>Name:</div>
                    <input
                    type="text"
                    value={editedProduct.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    className={styles["edit-modal-inputs"]}
                    />
                    {errors.name && (
                    <div className={styles["edit-modal-error"]}>{errors.name}</div>
                    )}
                </div>
                <div>
                    <div>Price:</div>
                    <input
                    type="number"
                    value={editedProduct.price}
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                    className={styles["edit-modal-inputs"]}
                    />
                    {errors.price && (
                    <div className={styles["edit-modal-error"]}>{errors.price}</div>
                    )}
                </div>
                <div>
            <div>
              <div>Categories:</div>
              <Select
                options={allCategories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                isMulti
                value={selectedCategories}
                onChange={handleCategoryChange}
                className={styles["edit-modal-select"]}
              />
              {errors.categories && (
                <div className={styles["edit-modal-error"]}>{errors.categories}</div>
              )}
            </div>
          </div>
                <div>
                    <div>Stock:</div>
                    <input
                    type="number"
                    value={editedProduct.stock}
                    name="stock"
                    onChange={handleChange}
                    placeholder="Stock"
                    className={styles["edit-modal-inputs"]}
                    />
                    {errors.stock && (
                    <div className={styles["edit-modal-error"]}>{errors.stock}</div>
                    )}
                </div>
                </div>
                <div className={styles["edit-modal-der"]}>
                <div>
                    <div>Description:</div>
                    <textarea
                    name="description"
                    style={{ resize: "none", height: "100px" }}
                    value={editedProduct.description}
                    onChange={handleChange}
                    className={styles["edit-modal-area"]}
                    />
                    {errors.description && (
                    <div className={styles["edit-modal-error"]}>{errors.description}</div>
                    )}
                </div>
                <div>
                    <div>Available:</div>
                    <input
                    type="checkbox"
                    name="available"
                    checked={editedProduct.available}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <div>Is Trending:</div>
                    <input
                    type="checkbox"
                    name="isTrending"
                    checked={editedProduct.isTrending}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <div>Images:</div>
                    <input type="file" name="photo" onChange={handlePhotoChange} multiple />
                    {errors.images && (
                    <div className={styles["edit-modal-error"]}>{errors.images}</div>
                    )}
                </div>
                <div className={styles["edit-modal-imagePreview"]}>
                    {editedProduct.images.map((image, index) => (
                    <div key={index} className={styles["edit-modal-imageContainer"]}>
                        <img
                        src={image}
                        alt={`Preview ${index}`}
                        className={`${styles["edit-modal-previewImage"]} ${styles["edit-modal-imageHoverEffect"]}`}
                        onClick={() => handleImageDelete(index)}
                        />
                    </div>
                    ))}
                </div>
                <div className={styles["edit-modal-button-container"]}>
                      <button
                        className={styles["edit-modal-cancel-button"]}
                        onClick={() => onRequestClose()}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles["edit-modal-button"]}
                        onClick={handleSubmit}
                        disabled={Object.keys(errors).length > 0}
                      >
                        Save
                      </button>
                    </div>
                </div>
                
            </div>
            </Modal>
        );
        }
        
        export default EditProductPopup;