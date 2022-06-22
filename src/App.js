import AddCategory from "./views/Category/AddCategory";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./views/Category/Category";
import { useEffect, useState } from "react";
import Header from "./views/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import EditCategory from "./views/Category/EditCategory";
import AddProduct from "./views/Product/AddProduct";
import Product from "./views/Product/Product";
import EditProduct from "./views/Product/EditProduct";
import Home from "./views/Home";
import ShowDetails from "./views/Product/ShowDetails";
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import WishList from "./views/Product/WishList";
import Cart from "./views/Cart/Cart";

function App() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  // const baseURL = "https://limitless-lake-55070.herokuapp.com/";
  const baseURL = "http://localhost:8080/";

  useEffect(() => {
    const getCategories = async () => {
      const categoriesFromSever = await fetchCategories();
      setCategories(categoriesFromSever);
    };

    const getProducts = async () => {
      const productsFromServer = await fetchProducts();
      setProducts(productsFromServer);
    };

    getCategories();
    getProducts();
  }, []);

  // Get categories
  const fetchCategories = async () => {
    console.log("fetchCategories:");
    const res = await fetch(`${baseURL}category/`);
    return res.json();

    // await axios.get(baseURL + "category/")
    // .then(res =>  {
    //   console.log("res.data:",res.data)
    //   setCategories(res.data)
    //   return res.data
    // })
    // .catch(err => console.log(err))
  };

  // Get products
  const fetchProducts = async () => {
    console.log("fetchProducts:");
    const res = await fetch(`${baseURL}product/`);
    return res.json();

    // await axios.get(baseURL + "category/")
    // .then(res =>  {
    //   console.log("res.data:",res.data)
    //   setCategories(res.data)
    //   return res.data
    // })
    // .catch(err => console.log(err))
  };

  return (
    <Router>
      <div className="App">
        <div id="nav">
          <Navbar />
        </div>
        {/* <Header/> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {categories && categories.length > 0 && (
                  <Home
                    baseURL={baseURL}
                    products={products}
                    categories={categories}
                  />
                )}
              </>
            }
          ></Route>
          {/* <Route
            path="/admin/category"
            element={
              <>
                {categories && categories.length > 0 && (
                  <Category categories={categories} />
                )}
              </>
            }
          /> */}

          <Route
            path="/admin/category/add"
            element={<AddCategory baseURL={baseURL} />}
          />
          <Route
            path="/admin/category"
            element={<Category categories={categories} />}
          />
          <Route
            path="/admin/category/:categoryId"
            element={<EditCategory categories={categories} baseURL={baseURL} />}
          />
          <Route
            path="/admin/product/add"
            element={<AddProduct categories={categories} baseURL={baseURL} />}
          />
          <Route
            path="/admin/product"
            element={<Product products={products} />}
          />
          <Route
            path="/admin/product/:productId"
            element={
              <EditProduct
                baseURL={baseURL}
                products={products}
                categories={categories}
              />
            }
          />
          <Route
            path="/product/show/:productId"
            element={
              <ShowDetails
                baseURL={baseURL}
                products={products}
                categories={categories}
              />
            }
          />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/signin" element={<Signin baseURL={baseURL} />} />
          <Route path="/wishlist" element={<WishList baseURL={baseURL} />} />
          <Route path="/cart" element={<Cart baseURL={baseURL} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
