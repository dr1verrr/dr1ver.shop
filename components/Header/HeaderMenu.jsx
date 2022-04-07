import { useDispatch } from 'react-redux'
import categories from '../../data/categories.json'
import { MENU_HIDE } from '../../redux/types'
import Link from 'next/link'

export default function HeaderMenu() {
  const dispatch = useDispatch()

  return (
    <ul className='header-menu'>
      {categories?.map(category => (
        <li key={category.id} className='header-menu-category' onClick={() => dispatch({ type: MENU_HIDE })}>
          <Link href={`/category/${category.slug}`}>
            <a className='header-menu-link'>
              <span>{category.name}</span>
            </a>
          </Link>
        </li>
      ))}
      <style jsx>{`
        .header-menu {
          display: flex;
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
          background: #fff;
        }

        .header-menu-link:hover span::before {
          transform: scaleX(1);
          opacity: 1;
        }

        .header-menu-link span::before {
          left: 0%;
        }

        @media (max-width: 920px) {
          .header-menu-link:hover span::before {
            transition: none;
            transform: scaleX(0);
          }
        }

        @media (max-width: 1230px) {
          .header-menu {
            width: 100%;
          }
        }

        @media (max-width: 720px) {
          .header-menu {
            flex-direction: column;
            overflow-y: auto;
            background: #fafafa;
            color: #000;
            align-items: start;
            justify-content: start;
            flex-wrap: nowrap;
            height: calc(100% - 75px);
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
    </ul>
  )
}
