import React, { useContext } from 'react'

import { CategoriesContext } from '../../contexts/product.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {

  // const {products} = useContext(CategoriesContext)
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    <>
      {Object.keys(categoriesMap).map((key) => {
        const products = categoriesMap[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </>
  );
};


export default CategoriesPreview