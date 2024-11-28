import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../utils/productSlice";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import ProductItem from "./ProductItem";
import {
  ascending,
  descending,
  updateStock,
  updateFastDelivery,
  filterByRating,
  clearFilter,
} from "../../utils/filterSlice";

function Home() {
  const products = useSelector((state) => state.products.products);

  let { byStock, byFastDelivery, byRating, searchQuery, sort } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  function transformProduct() {
    let filteredProducts = products;
    if (sort) {
      filteredProducts = filteredProducts.slice().sort((a, b) => {
      

        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    }

    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
     

      filteredProducts = filteredProducts.filter((prod) => prod.byFastDelivery);
     
    }

    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.newRating >= byRating
      );
    }

    if (searchQuery) {
      searchQuery = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }

    return filteredProducts;
  }

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    data = data.map((item) => {
      const stockValue = Math.floor(Math.random() * 6);
        const fastDelivery = stockValue > 3 ? true : false;
        const rating = Math.floor(item.rating.rate)
      return { ...item, inStock: stockValue, byFastDelivery: fastDelivery,newRating:rating };
    });
    dispatch(setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRating = (rate) => {
    dispatch(filterByRating(rate));
  };

  return (
    <div className="home-cont">
      <div className="filters">
        <h1>Filter Products</h1>

        <div>
          <input
            type="radio"
            id="asc"
            name="group1"
            value="lowToHigh"
            checked={sort === "lowToHigh" ? true : false}
            onChange={(e) => dispatch(ascending(e.target.value))}
          />
          <label for="asc">Ascending</label>
        </div>

        <div>
          <input
            type="radio"
            id="dsc"
            name="group1"
            value="highToLow"
            checked={sort === "highToLow" ? true : false}
            onChange={(e) => dispatch(descending(e.target.value))}
          />
          <label for="dsc">Descending</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="stock"
            name="group1"
            checked={byStock}
            onChange={() => dispatch(updateStock())}
          />
          <label for="stock">Include Out of Stock</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="delivery"
            name="group1"
            checked={byFastDelivery}
            onChange={() => dispatch(updateFastDelivery())}
          />
          <label for="delivery">Fast Delivery Only</label>
        </div>

        <div className="rating-cont">
          <span>Rating :</span>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="rating"
              onClick={() => handleRating(index + 1)}
            >
              {index < byRating ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>

        <div className="btn-wrapper">
          <button onClick={() => dispatch(clearFilter())}>Clear Filters</button>
        </div>
      </div>

      <div className="product-cont">
        <h1>Products</h1>
        <div className="products">
          {transformProduct().length > 0 ? (
            transformProduct().map((item) => (
              <ProductItem key={item.id} item={item} />
            ))
          ) : (
            <h1>No Such Products</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
