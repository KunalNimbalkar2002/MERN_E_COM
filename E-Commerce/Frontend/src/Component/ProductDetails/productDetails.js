import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { CgCarousel } from "react-icons/cg";
import { getProductDetails } from "../../Redux/Actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { addItemsToCart } from "../../Redux/Actions/cartAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetails);
  console.log("productDetail::::::::::", productDetail);
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert("item added successfully");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const { product, loading } = productDetail;

  const Options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {/* {console.log("product::+++_____:::::", product)} */}
      {loading ? (
        <div className="loader">Loading productDetails...</div>
      ) : (
        <div>
          <div className="productDetails">
            <div>
              <CgCarousel>
                {product &&
                  product.images &&
                  Array.isArray(product.images) &&
                  product.images.map((item, i) => (
                    <img
                      className="crouselImage"
                      key={item.url}
                      src={item.url}
                      alt="Sorrry No Img"
                    />
                  ))}
              </CgCarousel>
            </div>
            <div>
              <div className="details-block-1">
                {product && <h2>{product.name}</h2>}
                {product && <p>Product # {product._id}</p>}
              </div>
              {product && (
                <div className="details-block-2">
                  <ReactStars {...Options} />
                  <span>({product.numOfReviews} Reviews )</span>
                </div>
              )}
              <div className="details-block-3">
                {product && <h1>{`$${product.price}`}</h1>}
                <div className="details-block-3-1">
                  <div className="details-block-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="Number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button className="addtocart" onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>
                {product && (
                  <p>
                    Status:{" "}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                )}
              </div>
              <div className="details-block-4">
                {product && <p>Description : {product.description}</p>}
              </div>
              <button className="submitReview">Submit Review </button>
            </div>
          </div>
          <h3 className="reviews-heading">Reviews</h3>
          {product && product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noreviews"> No Reviews Yet</p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
