import { useParams } from "react-router";
import Navbar from "../components/navbar";

function ProductDetail() {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <h1 className="font-bold text-center py-3 text-8xl">Product  {id}</h1>
    </div>
  );
}

export default ProductDetail;
