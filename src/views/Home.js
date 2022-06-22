import React from "react";
import ProductBox from "../components/Product/ProductBox";
import CategoryBox from "../components/Category/CategoryBox";
import { useState, useEffect } from "react";

const Home = ({ baseURL, products, categories }) => {
  console.log("Home:", products, categories);
  const [category_size, setCategorySize] = useState(0);
  const [product_size, setProductSize] = useState(0);

  useEffect(() => {
    setCategorySize(Math.min(6, categories.length));
    setProductSize(Math.min(8, products.length));
  }, []);

  return (
    <div id="home">
      {/* <!-- Page Wrapper --> */}
      <div id="background-div" className="page-holder bg-cover">
        {/* <!-- Home image as background of #background-div--> */}
        <div className="container py-5">
          <header className="text-left text-white py-5">
            <h3 className="mb-4 rounded">
              <a
                href="#start-shopping"
                className="bg-white px-2 py-2 rounded"
                id="heading"
              >
                Start Shopping
              </a>
            </h3>
            <p id="content" className="lead mb-0 bg-dark p-1 rounded">
              Simple Coding Market is for educational purposes only. It can be
              used by developers to learn about developing an ecommerce
              application complete with backend and frontend for Web and Android
            </p>
          </header>
        </div>
      </div>
      {/* <!-- Categories--> */}
      <div id="start-shopping" className="container">
        <div className="row">
          <div className="col-12 text-left">
            <h2 className="pt-3">Top Categories</h2>
          </div>
        </div>
        <div className="row">
          {/* <div v-for="index in this.category_size" :key="index" className="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <CategoryBox :category="categories[index-1]">
          </CategoryBox>
        </div> */}
          {[...Array(category_size)].map((e, index) => (
            <CategoryBox
              key={index}
              category={categories[index - 1]}
            ></CategoryBox>
          ))}
        </div>
      </div>

      <hr />
      {/* <!-- Products--> */}
      <div className="container">
        <div className="row">
          <div className="col-12 text-left">
            <h2 className="pt-3">Top Products</h2>
          </div>
        </div>
        <div className="row">
          {/* <div v-for="index in this.product_size" :key="index" className="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <ProductBox :product="products[index-1]">
          </ProductBox>
        </div> */}
          {[...Array(product_size)].map((e, index) => (
            <ProductBox key={index} product={products[index - 1]}></ProductBox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
