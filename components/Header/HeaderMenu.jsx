import Link from 'next/link'
import { useDispatch } from 'react-redux'
import categories from '../../data/categories.json'
import { MENU_HIDE } from '../../redux/types'

export default function HeaderMenu() {
  const dispatch = useDispatch()

  return (
    <div className='header-menu'>
      <div className='header-menu-category' onClick={() => dispatch({ type: MENU_HIDE })}>
        <Link href='/all'>
          <a className='header-menu-link'>
            <span>All</span>
          </a>
        </Link>
      </div>
      {categories?.map(category => (
        <div key={category.id} className='header-menu-category' onClick={() => dispatch({ type: MENU_HIDE })}>
          <Link href='/category/[slug]' as={`/category/${category.slug}`}>
            <a className='header-menu-link'>
              <span>{category.name}</span>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .header-menu {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          flex-wrap: wrap;
          letter-spacing: 1px;
        }

        .header-menu-link span {
          position: relative;
        }

        .header-menu-link {
          padding: 2.25rem 0.5rem;
          display: block;

          text-transform: uppercase;
        }

        .header-menu-link span::before {
          transition: transform 0.4s ease;
          transform: scaleX(0);
          width: 100%;
          content: '';
          position: absolute;
          bottom: -0.25rem;
          height: 1px;
          background-color: #fff;
        }

        .header-menu-link:hover span::before {
          transform: scaleX(1);
          opacity: 1;
        }

        .header-menu-link span::before {
          left: 0%;
        }

        @media (max-width: 1170px) {
          .header-menu {
            width: 100%;
          }
        }

        @media (max-width: 630px) {
          .header-menu {
            flex-direction: column;
            overflow-y: auto;
            background: #fafafa;
            color: #000;
            align-items: start;
            justify-content: start;
          }

          .header-menu-category {
            overflow-x: auto;
          }

          .header-menu-link {
            border-bottom: 1px solid #ebeef1;
            padding-left: 2rem;
          }

          .header-menu-link,
          .header-menu-category {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
