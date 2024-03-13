import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import Image from "next/image";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    sku,
    img,
    title,
    imageURLs,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();
  let subProduct = productItem.subProducts[0];
  console.log("Sub", subProduct);
  let prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);
  let colors = productItem.subProducts.map((p) => p.color);
  const priceRange = subProduct.discount
    ? `${(prices[0] - (prices[0] * subProduct.discount) / 100).toLocaleString(
        "it-IT",
        {
          style: "currency",
          currency: "VND",
        }
      )}`
    : `${prices[0].toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}`;
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{productItem?.category?.name || category.name}</span>
      </div>
      <h3 className="tp-product-details-title">{productItem?.name || title}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}Còn Hàng</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={productItem?.rating || ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-details-reviews">
            <span>
              ({reviews && reviews.length > 0 ? reviews.length : 0} Đánh Giá)
            </span>
          </div>
        </div>
      </div>
      <p>
        {textMore
          ? productItem?.description || description
          : `${
              productItem?.description.substring(0, 100) ||
              description.substring(0, 100)
            }...`}
        <span onClick={() => setTextMore(!textMore)}>
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">${price}</span>
            <span className="tp-product-details-price new-price">
              {" "}
              $
              {(
                Number(price) -
                (Number(price) * Number(discount)) / 100
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            {priceRange || price.toFixed(2)}
          </span>
        )}
      </div>

      {/* variations */}
      {/* {imageURLs.some((item) => item?.color && item?.color?.name) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
              {imageURLs.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={`${item.color.clrCode}`}
                    style={{ backgroundColor: `${item.color.clrCode}` }}
                  ></span>
                  {item.color && item.color.name && (
                    <span className="tp-color-variation-tootltip">
                      {item.color.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {subProduct.sizes.length > 0 && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Kích Thước :</h4>
            <div className="tp-product-details-variation-list">
              {subProduct.sizes.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                  // className={`color tp-color-variation-btn ${"active"}`}
                >
                  <span
                    data-bg-color={`#DFF5FF`}
                    style={{
                      backgroundColor: `#DFF5FF`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.size}
                  </span>
                  {item.size && (
                    <span className="tp-color-variation-tootltip">
                      {item.size}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Màu sắc :</h4>
            <div className="tp-product-details-variation-list">
              {colors.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                    // "active"
                  }`}
                  // className={`color tp-color-variation-btn ${"active"}`}
                >
                  <span
                    data-bg-color={`#fff`}
                    style={{ backgroundColor: `#fff` }}
                  >
                    <img
                      src={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </span>
                  {item.size && (
                    <span className="tp-color-variation-tootltip">asd</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Số Lượng</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {/* product quantity */}
          <ProductQuantity />
          {/* product quantity */}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            Mua Ngay
          </button>
        </Link>
      </div>
      {/* product-details-action-sm start */}
      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompareProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          So Sánh
        </button>
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlistProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          Thêm vào danh sách yêu thích
        </button>
        <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Đặt câu hỏi
        </button>
      </div>
      {/* product-details-action-sm end */}

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tag={tags[0]} />
      )}
    </div>
  );
};

export default DetailsWrapper;
