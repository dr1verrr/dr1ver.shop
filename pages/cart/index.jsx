import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import CartItem from '../../components/CartItem'
import { useAuth } from '../../contexts/auth'
import Link from 'next/link'

export default function Cart() {
  const { cartData } = useAuth()

  return (
    <div className='cart'>
      <div className='cart-container'>
        <div className='cart-items'>
          {!cartData[0] ? (
            <div style={{ fontSize: '2rem' }}>No products were added</div>
          ) : (
            cartData?.map(item => {
              return (
                <div key={uuidv4()} className='cart-item'>
                  <div className='cart-item-left'>
                    <Link href={`product/${item.slug}`} passHref>
                      <div className='cart-item-image'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                          width={200}
                          height={200}
                          alt=''
                        />
                      </div>
                    </Link>

                    <div className='cart-item-info'>
                      <div className='cart-item-info-title'>
                        <Link href={`product/${item.slug}`} passHref>
                          {item.name}
                        </Link>
                      </div>
                      <div className='cart-item-info-options'>{`Size: ${item.options}`}</div>
                      <div className='cart-item-info-price'>{`Total: ${
                        '$' + (item.price * item.count).toFixed(2)
                      }`}</div>
                    </div>
                  </div>

                  <div className='cart-item-right'>
                    <CartItem data={item} />
                    <div className='cart-item-remove'></div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      <style jsx>{`
        .cart {
          min-height: 100vh;
        }
        .cart-item {
          padding: 2rem 0;
        }

        .cart-item-right {
          display: flex;
          flex-direction: column;
        }

        .cart-item-left-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-item-info {
          display: flex;
          flex-direction: column;
        }

        .cart-item-info-title {
          display: flex;
          font-size: 1.5rem;
          letter-spacing: 1.5px;
        }

        .cart-item-image {
          cursor: pointer;
          min-width: 150px;
        }
        .cart-item-info-title:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .cart-item {
          display: flex;
          position: relative;
          flex-wrap: wrap;
        }

        .cart-item::after {
          content: '';
          position: absolute;
          top: 0;
          background: #d3d3d3;
          height: 1px;
          width: 100%;
        }

        .cart-item:first-child {
          margin-top: 1rem;
        }

        .cart-item::before {
          content: '';
          position: absolute;
          top: 0;
          background: #d3d3d3;
          height: 1px;
          width: 100%;
        }

        .cart-item-left {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          margin: 1rem;
        }

        .cart-item-image {
          padding: 1rem;
        }

        .cart-container {
        }
      `}</style>
    </div>
  )
}
