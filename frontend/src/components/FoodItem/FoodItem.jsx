import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const store = useContext(StoreContext) || {};

  const {
    cartItems = {},
    addToCart,
    removeFromCart,
    url = "",
  } = store;

  const [imageError, setImageError] = useState(false);

  const quantity = Number(cartItems?.[id] || 0);

  // Support both full image URLs and backend image filenames.
  const imageSrc = image
    ? image.startsWith("http")
      ? image
      : url
        ? `${url.replace(/\/$/, "")}/images/${image.replace(/^\//, "")}`
        : ""
    : "";

  const handleAdd = () => {
    if (typeof addToCart === "function") {
      addToCart(id);
    } else {
      console.error("addToCart is missing from StoreContext.");
    }
  };

  const handleRemove = () => {
    if (typeof removeFromCart === "function") {
      removeFromCart(id);
    } else {
      console.error("removeFromCart is missing from StoreContext.");
    }
  };

  return (
    <article className="food-item">
      <div className="food-item-img-container">
        {imageSrc && !imageError ? (
          <img
            src={imageSrc}
            alt={name || "Food item"}
            className="food-item-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="food-image-placeholder" role="img" aria-label="Food image unavailable">
            <span>Image unavailable</span>
          </div>
        )}

        {quantity === 0 ? (
          <button
            type="button"
            className="food-add-button"
            onClick={handleAdd}
            aria-label={`Add ${name} to cart`}
            title="Add to cart"
          >
            <img src={assets.add_icon_white} alt="" />
            <span>Add</span>
          </button>
        ) : (
          <div className="food-item-counter" aria-label={`${quantity} items in cart`}>
            <button
              type="button"
              className="quantity-button quantity-remove"
              onClick={handleRemove}
              aria-label={`Remove one ${name} from cart`}
            >
              <img src={assets.remove_icon_red} alt="" />
            </button>

            <span className="food-quantity" aria-live="polite">
              {quantity}
            </span>

            <button
              type="button"
              className="quantity-button quantity-add"
              onClick={handleAdd}
              aria-label={`Add one more ${name} to cart`}
            >
              <img src={assets.add_icon_green} alt="" />
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name || "Unnamed food item"}</h3>

          {assets.rating_starts && (
            <img
              src={assets.rating_starts}
              alt="Rated food"
              className="food-rating"
            />
          )}
        </div>

        <p className="food-item-desc">
          {description || "A delicious choice for your next meal."}
        </p>

        <div className="food-item-bottom">
          <p className="food-item-price">
            ₹{Number(price || 0).toFixed(2)}
          </p>

          {quantity > 0 && (
            <span className="food-added-label">
              {quantity} in cart
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default FoodItem;