import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category = "All" }) => {
  const store = useContext(StoreContext);
  const food_list = Array.isArray(store?.food_list)
    ? store.food_list
    : [];

  const filteredFood = food_list.filter((item) => {
    if (!item) return false;

    return (
      category === "All" ||
      item.category === category
    );
  });

  return (
    <section className="food-display" id="food-display">
      <div className="food-display-heading">
        <div className="food-display-heading-text">
          <span className="food-display-eyebrow">
            GOOD FOOD, GOOD MOOD
          </span>

          <h2>Top dishes near you</h2>

          <p className="food-display-subtitle">
            Explore our menu and find something delicious today.
          </p>
        </div>

        <span className="food-display-count">
          {filteredFood.length}{" "}
          {filteredFood.length === 1 ? "dish" : "dishes"}
        </span>
      </div>

      {filteredFood.length > 0 ? (
        <div className="food-display-list">
          {filteredFood.map((item, index) => (
            <FoodItem
              key={item._id || item.id || `${item.name}-${index}`}
              id={item._id || item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="food-display-empty">
          <div className="food-display-empty-icon" aria-hidden="true">
            {food_list.length === 0 ? "🍽" : "⌕"}
          </div>

          <h3>
            {food_list.length === 0
              ? "Our menu is getting ready"
              : "No dishes in this category"}
          </h3>

          <p>
            {food_list.length === 0
              ? "There are no food items to display right now. Please try again later."
              : "Choose another category to discover more delicious options."}
          </p>
        </div>
      )}
    </section>
  );
};

export default FoodDisplay;