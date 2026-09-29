import { Link } from "react-router";
import Navbar from "../components/navbar";

function Products() {
  return (
    <div>
      <Navbar />
      <h1>Products</h1>

      <Link to={'/product/1'}> Product 1 </Link>
      <Link to={'/product/2'}> Product 2 </Link>
      <Link to={'/product/3'}> Product 3 </Link>
      <Link to={'/product/shirt'}> Shirt </Link>


    </div>
  );
}

export default Products;
