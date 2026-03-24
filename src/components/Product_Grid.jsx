import React from "react";
import "./Product_Grid.css";

function ProductGrid({
  image1,
  image2,
  image3,
  image4,
  text1,
  text2,
  text3,
  text4,
}) {
  return (
    <div className="grid-container">
      <figure className="grid_option_1">
        <img src={image1} alt="gifts for her" className="gallery__img" />
        <p>{text1}</p>
      </figure>
      <figure className="grid_option_2">
        <img src={image2} alt="gifts for him" className="gallery__img" />
        <p>{text2}</p>
      </figure>
      <figure className="grid_option_3">
        <img src={image3} alt="gifts for kids" className="gallery__img" />
        <p>{text3}</p>
      </figure>
      <figure className="grid_option_4">
        <img src={image4} alt="gifts for all" className="gallery__img" />
        <p>{text4}</p>
      </figure>
    </div>
  );
}

export default ProductGrid;
