import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const handleCategoryClick = (menuName) => {
    setCategory((previousCategory) =>
      previousCategory === menuName ? "All" : menuName
    );
  };

  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu-heading">
        <div>
          <span className="explore-menu-eyebrow">
            FIND YOUR FAVOURITE
          </span>

          <h1>Explore our menu</h1>

          <p className="explore-menu-text">
            From comforting classics to fresh favourites, discover
            something delicious for every craving.
          </p>
        </div>
      </div>

      <div
        className="explore-menu-list"
        role="group"
        aria-label="Filter food by category"
      >
        {menu_list.map((item) => {
          const isActive = category === item.menu_name;

          return (
            <button
              type="button"
              key={item.menu_name}
              className={`explore-menu-list-item ${
                isActive ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(item.menu_name)}
              aria-pressed={isActive}
              aria-label={`Show ${item.menu_name} dishes`}
            >
              <span className="explore-menu-image-wrap">
                <img
                  src={item.menu_image}
                  alt=""
                  className="explore-menu-image"
                  loading="lazy"
                />
              </span>

              <span className="explore-menu-item-name">
                {item.menu_name}
              </span>

              <span className="explore-menu-item-status">
                {isActive ? "Selected" : "Explore"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="explore-menu-divider" />
    </section>
  );
};

export default ExploreMenu;