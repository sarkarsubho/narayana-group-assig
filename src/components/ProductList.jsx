import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className='products'>
      {products.map((product) => (
        <div key={product.id} className='card'>
            <h3>{product.title}</h3>
            <img src={product.image}width={"100px"} alt="" />
           - ${product.price}
           <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductList;