import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import { getProducts } from "./api/products";

function App() {
  const [products, setProducts] = useState([]);

  // console.log("rendered");
  const handleSearch = async (search, category, sortBy) => {
    const data = await getProducts(search, category, sortBy);
    setProducts(data);
    console.log(data);
  };
  useEffect(() => {
    handleSearch()
  }, []);

  return (
    <div className="App">
      <Search onSearch={handleSearch} />
      <ProductList products={products} />
    </div>
  );
}

export default App;
