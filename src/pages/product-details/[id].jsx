import React from "react";
// internal
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductQuery } from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import { getSession } from "next-auth/react";
import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import User from "../../models/User";
import Order from "../../models/Order";

import db from "@/utils/db";

const ProductDetailsPage = ({ query, product }) => {
  // const { data, isLoading, isError } = useGetProductQuery(query.id);
  console.log("Prd", product);
  let content = null;
  // if (isLoading) {
  //   content = <PrdDetailsLoader loading={isLoading} />;
  // }
  // if (!isLoading && isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  if (product) {
    content = (
      <>
        <ProductDetailsBreadcrumb
          category={product.category.name}
          title={product.name}
        />
        <ProductDetailsArea productItem={product} />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <HeaderTwo style_2={true} />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const { query, req } = context;
  const session = await getSession({ req });

  const slug = query.id;
  const style = query.style || 0;
  const size = query.size || 0;

  let product = await Product.findOne({
    slug,
    "subProducts.isDisabled": false, // Add this condition to filter out disabled products
  })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({
      path: "reviews.reviewBy",
      model: User,
    })
    .lean();
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);
  const newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    priceRange: subProduct.discount
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
        })}`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            (subProduct.sizes[size].price * subProduct.discount) / 100
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        : subProduct.sizes[size].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
    priceBefore: subProduct.sizes[size].price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }),
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => p.sizes)
      .flat()
      .sort((a, b) => a.size - b.size)
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };
  //------------
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }
  let orders = await Order.find({ user: session?.user.id })
    .sort({
      createdAt: -1,
    })
    .lean();
  let isReview = false;
  let orderId;
  for (const order of orders) {
    if (order.status === "Đã Hoàn Thành") {
      for (const product of order.products) {
        // console.log(newProduct._id.toString(), product.product.toString());
        if (newProduct._id.toString() == product.product.toString()) {
          isReview = product.isReview;
          orderId = order._id.toString();
          console.log(orderId);
          break;
        }
      }
    }
  }
  db.disconnectDB();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      isReview: isReview,
      orderId: orderId || null,
      query,
    },
  };
};
