import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ElectronicCategory from "@/components/categories/electronic-category";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import FeatureArea from "@/components/features/feature-area";
import ProductArea from "@/components/products/electronics/product-area";
import BannerArea from "@/components/banner/banner-area";
import OfferProducts from "@/components/products/electronics/offer-products";
import ProductGadgetArea from "@/components/products/electronics/product-gadget-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import ProductSmArea from "@/components/products/electronics/product-sm-area";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import BlogArea from "@/components/blog/electronic/blog-area";
import InstagramArea from "@/components/instagram/instagram-area";
import CtaArea from "@/components/cta/cta-area";
import Footer from "@/layout/footers/footer";
import db from "@/utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";

export default function Home({ products }) {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <HomeHeroSlider />
      <ElectronicCategory />
      <FeatureArea />
      <ProductArea products={products} />
      <BannerArea />
      <OfferProducts products={products} />
      <ProductGadgetArea />
      <ProductBanner />
      <NewArrivals />
      <ProductSmArea />
      <BlogArea />
      <InstagramArea />
      <CtaArea />
      <Footer />
    </Wrapper>
  );
}

export const getServerSideProps = async () => {
  db.connectDB();
  let products = await Product.find().sort({ createdAt: -1 }).lean().populate({
    path: "category",
    model: Category,
  });
  let productMenFashion = await Product.find({
    category: "62cfeb1e119f0cd432b478d6",
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      productMenFashion: JSON.parse(JSON.stringify(productMenFashion)),
    },
  };
};
