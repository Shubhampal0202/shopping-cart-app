import React, { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart, changeQuantity } from "../../utils/productSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.products);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cartProducts]);

  return (
    <div className="cart-products">
      <div className="products-detail">
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => (
            <div className="cart-product">
              <div className="cart-product-image">
                <img src={item.image} alt="" />
              </div>
              <div className="cart-product-name">{item.name}</div>
              <div className="cart-product-price">
                ₹ {Math.floor(item.price)}
              </div>
              <div className="cart-product-rating">
                {[...Array(5)].map((i, index) => {
                  return index < item.newRating ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  );
                })}
              </div>
              <div className="cart-quantity">
                <select
                  className="select"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      changeQuantity({ qty: e.target.value, id: item.id })
                    )
                  }
                >
                  {[...Array(item.inStock)].map((i, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="cart-product-delete">
                <AiFillDelete
                  className="cart-delete-item"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <h1 className="empty">Cart is Empty!</h1>
        )}
      </div>

      <div className="total">
        <h1>Subtotal ({cartProducts.length}) items</h1>
        <h3>Total: ₹ {total}</h3>
        <div className="btn">
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
