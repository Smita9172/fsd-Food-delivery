import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [place, setPlace] = useState(
    () => localStorage.getItem("deliveryPlace") || ""
  );
  const [placeInput, setPlaceInput] = useState(place);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const vegOnly = params.get("veg") === "1";
  const [searchText, setSearchText] = useState(params.get("search") || "");

  const cartCount = Object.values(cartItems || {}).reduce(
    (sum, qty) => sum + (Number(qty) || 0),
    0
  );

  // Dark mode: set attribute on <html> and remember the choice
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Highlight the right link when the page changes
  useEffect(() => {
    if (pathname !== "/") setMenu("");
    else setMenu((m) => (m === "" ? "home" : m));
    setMobileOpen(false);
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  // Works from any page: go home first, then scroll to the section
  const goToSection = (e, id, name) => {
    e.preventDefault();
    setMenu(name);
    setMobileOpen(false);
    if (pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  };

  // Keeps ?search= and ?veg= in the URL so FoodDisplay can read them
  const updateParams = (changes) => {
    const p = new URLSearchParams(pathname === "/" ? params : "");
    Object.entries(changes).forEach(([key, value]) => {
      if (value) p.set(key, value);
      else p.delete(key);
    });
    const qs = p.toString();
    navigate(`/${qs ? "?" + qs : ""}`);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    updateParams({ search: searchText.trim() });
    setTimeout(() => scrollToId("explore-menu"), 150);
  };

  const clearSearch = () => {
    setSearchText("");
    updateParams({ search: "" });
  };

  const toggleVeg = () => updateParams({ veg: vegOnly ? "" : "1" });

  const savePlace = (e) => {
    e.preventDefault();
    const value = placeInput.trim();
    setPlace(value);
    localStorage.setItem("deliveryPlace", value);
    setLocationOpen(false);
    if (value) toast.success("Delivery location saved");
  };

  return (
    <header className="navbar-wrap">
      <div className="navbar">
        <button
          className="navbar-hamburger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link to="/">
          <h1 id="companyName" className="logo">
            RiDER
          </h1>
        </Link>

        <ul className={`navbar-menu ${mobileOpen ? "open" : ""}`}>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              setMobileOpen(false);
            }}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="/#explore-menu"
            onClick={(e) => goToSection(e, "explore-menu", "menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="/#app-download"
            onClick={(e) => goToSection(e, "app-download", "mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="/#footer"
            onClick={(e) => goToSection(e, "footer", "contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </ul>

        <div className="navbar-right">
          <div className="navbar-location">
            <button
              className="navbar-location-btn"
              onClick={() => setLocationOpen((o) => !o)}
            >
              <span className="navbar-pin"></span>
              <span className="navbar-location-text">
                {place || "Set location"}
              </span>
            </button>
            {locationOpen && (
              <form className="navbar-location-pop" onSubmit={savePlace}>
                <label htmlFor="place">Delivery area or pincode</label>
                <input
                  id="place"
                  type="text"
                  value={placeInput}
                  onChange={(e) => setPlaceInput(e.target.value)}
                  placeholder="e.g. 110001"
                  autoFocus
                />
                <button type="submit">Save</button>
              </form>
            )}
          </div>

          <button
            className={`navbar-veg ${vegOnly ? "on" : ""}`}
            onClick={toggleVeg}
            aria-pressed={vegOnly}
            title="Show only vegetarian items"
          >
            <span className="navbar-veg-dot"></span>
            <span className="navbar-veg-label">Veg</span>
          </button>

          <button
            className="navbar-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((o) => !o)}
          >
            <img src={assets.search_icon} alt="" />
          </button>

          <button
            className="navbar-icon-btn navbar-theme"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <div className="navbar-search-icon">
            <Link to="/cart" aria-label="Cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            {cartCount > 0 && (
              <span className="navbar-badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>

          {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {searchOpen && (
        <form className="navbar-searchbar" onSubmit={submitSearch}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for a dish"
            autoFocus
          />
          <button type="submit">Search</button>
          {searchText && (
            <button type="button" className="ghost" onClick={clearSearch}>
              Clear
            </button>
          )}
        </form>
      )}
    </header>
  );
};

export default Navbar;
