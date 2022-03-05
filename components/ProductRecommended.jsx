import React from 'react'

export default function ProductRecommended({ categories }) {
  console.log(categories)
  return (
    <div className='product-recommended'>
      <div className='product-recommended-title'>
        recommended to <span>purchase</span>
      </div>

      <div className='recommended-products'>
        {categories?.map(cat =>
          cat.map(product => (
            <div key={product.id} className='recommended-product'>
              {product.title}
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .product-recommended span {
          color: #000;
          background: #fff;
          padding: 1rem 2rem;
          margin-left: 1rem;
        }

        .product-recommended {
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 15rem;
        }

        .product-recommended-title {
          text-transform: uppercase;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 500;
          cursor: default;
        }
      `}</style>
    </div>
  )
}
