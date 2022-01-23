import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import CartItem from '../../components/CartItem'
import { useAuth } from '../../contexts/auth'
import Link from 'next/link'

//TODO: filter, transform, validate data that coming from db(localStorage or Database)

// Conditions: no more than 20 count of one product with the same options(You can add the same product BUT with options difference)

// One object(product) have 5 keys: 1)id, 2)name, 3)price, 4)options: type String, 5)count, 6)image: url, 7)slug

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
                  {/*{item.id}*/}
                </div>
              )
            })
          )}
        </div>
      </div>
      <style jsx>{`
        .cart {
        }

        .cart-item {
          padding: 2rem 0;
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
          flex: 1;
          font-size: 1.5rem;
          letter-spacing: 1.5px;
        }

        .cart-item-image {
          cursor: pointer;
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
          align-items: center;
          position: relative;
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
          align-items: center;
          flex: 1;
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
