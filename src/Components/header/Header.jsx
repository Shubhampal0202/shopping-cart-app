import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../../utils/filterSlice";

function Header() {
  const { cartProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div className="header">
      <h1 className="logo">Shopping Cart</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => dispatch(filterBySearch(e.target.value))}
        />
      </div>
      <div className="home">
        <Link to="/">Products</Link>
      </div>
      <div className="cart-symbol-cont">
        <Link to="/cart">
          <div className="cart">
            <FaShoppingCart className="cart-img" />
            <span className="cart-value">{cartProducts.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
