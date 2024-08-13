import React, { useEffect } from "react";
import { useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center py-3 gap-3">
        {allProduct.map((product, index) => {
          return (
            <div className="bg-white">
              <img
                src={product?.productImage[0]}
                width={120}
                height={120}
                alt=""
              />
            </div>
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={""}
        />
      )}
    </div>
  );
};

export default AllProducts;
