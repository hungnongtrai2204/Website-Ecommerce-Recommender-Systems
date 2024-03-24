import React from "react";
import Image from "next/image";
import payment_option_img from "@assets/img/product/icons/payment-option.png";

const DetailsBottomInfo = ({ sku, category, tag }) => {
  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Danh mục: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Nhãn: </span>
          <p>{tag}</p>
        </div>
      </div>

      {/*  product-details-social*/}

      <div className="tp-product-details-social">
        <span>Chia Sẻ: </span>
        <a href="#">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-vimeo-v"></i>
        </a>
      </div>

      {/* product-details-msg */}

      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>30 ngày đổi trả dễ dàng</li>
          <li>Đặt hàng trước 2h30 chiều để được giao hàng trong ngày</li>
        </ul>
      </div>
      {/* product-details-payment */}
      <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Guaranteed safe <br /> & thanh toán an toàn
        </p>
        <Image src={payment_option_img} alt="payment_option_img" />
      </div>
    </>
  );
};

export default DetailsBottomInfo;
