import classNames from 'classnames';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = () => {
  const getLinkClass = ({ isActive }:{ isActive: boolean }) => classNames(
    'header__link', {
      'header__link-active': isActive,
    },
  );

  const favouritesPhones
  = useAppSelector(state => state.favourites.favouritesPhones);
  const cardPhones = useAppSelector(state => state.card.cardPhones);
  const location = useLocation();

  return (
    <header className="header">
      <div className="headercontainer">
        <div className="header__content">
          <nav className="header__nav">
            <Link to="/">
              <div className="header__logo" />
            </Link>
            {!(location.pathname === '/cart') && (
              <div className="header__main">
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/phones" className={getLinkClass}>
                  Phones
                </NavLink>
                <NavLink to="/tablets" className={getLinkClass}>
                  Tablets
                </NavLink>
                <NavLink to="/accessories" className={getLinkClass}>
                  Accessories
                </NavLink>
              </div>
            )}
          </nav>
          <div className="header__container">
            <div className="header__right">
              {(location.pathname === '/phones'
                || location.pathname === '/favourites')
                && (
                  <div className="header__search">
                    <Search />
                  </div>
                )}
              <div className="header__ff">
                <NavLink
                  to="/favourites"
                  className={({ isActive }) => classNames(
                    'header__favourites',
                    {
                      'header__favourites--active': isActive,
                    },
                  )}
                />
                {favouritesPhones.length !== 0 && (
                  <div className="favourites__count">
                    <span className="favourites__count-text">
                      {favouritesPhones.length}
                    </span>
                  </div>
                )}
              </div>
              <div className="header__ff">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => classNames(
                    'header__bag',
                    {
                      'header__bag--active': isActive,
                    },
                  )}
                />
                {cardPhones.length !== 0 && (
                  <div className="card__count">
                    <span className="card__count-text">
                      {cardPhones.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {location.pathname === '/menu'
              ? (
                <Link
                  to=".."
                  className="icon icon__close"
                />
              )
              : (
                <Link
                  to="/menu"
                  className="icon icon__menu"
                />
              )}
          </div>
        </div>
      </div>
    </header>

  );
};
