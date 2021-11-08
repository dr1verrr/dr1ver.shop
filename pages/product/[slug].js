import fetch from 'isomorphic-fetch'
import Image from 'next/image'
import { useEffect } from 'react'
import { ContainerStyled } from '../../components/Container.styled'
import isObjTrue from '../../functions/isObjTrue'

export default function Product({ product }) {
  useEffect(() => {
    console.log(product)
  }, [product])

  if (isObjTrue(product))
    return (
      <ContainerStyled>
        <div className='product'>
          <div className='product-title'>{product.title}</div>
          <div className='product-inner'>
            <div className='product-image'>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                alt=''
                width={product.image.width}
                height={product.image.height}
              />
            </div>
            <div className='product-info'>
              <div className='product-info-price'>{product.price}</div>
              <div className='product-info-description'>{product.description}</div>
              <div className='product-info-sizes'>{product.Custom_field[0].title}</div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .product-inner {
              display: flex;
            }

            .product-title {
              font-size: 4rem;
              text-align: center;
              padding: 3rem 0;
            }
          `}
        </style>
      </ContainerStyled>
    )

  return <div style={{ fontSize: '5rem', textAlign: 'center' }}>Loading...</div>
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)
  const data = await res.json()

  return {
    props: {
      product: data,
    },
  }
}
