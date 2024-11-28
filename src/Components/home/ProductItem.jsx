import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../utils/productSlice";

function ProductItem({ item }) {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.products);

 
  return (
    <div className="product">
      <img src={item.image} alt="" />
      <div>
        <h3>{item.title}</h3>
        <div className="price">₹ {Math.floor(item.price)}</div>
        <div className="fast">
          {item.byFastDelivery ? "Fast Delivery" : "4 Days Delivery"}
        </div>
        <div>
          {item &&
            [...Array(5)].map((i, index) => {
              if (index < item.newRating) {
                return <AiFillStar className="fill-star" />;
              } else {
                return <AiOutlineStar className="out-line-star" />;
              }
            })}
        </div>
        <div>
          {cartProducts.some((val) => val.id === item.id) ? (
            <button id="danger" onClick={() => dispatch(removeFromCart(item.id))}>
              Remove From Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => dispatch(addToCart(item))}
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
