import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DetailsPhone } from '../../Type/DetailsPhone';
import { getPhone } from '../../utils/fetch';
import {
  BuyButtonCart, FavouritesIcon, HomeIcon, Loader, AlsoLike, PhoneContext,
} from '../../Components';

import arrowRight from '../../img/icon/ArrowRight.png';
import './ProductDetalsPage.scss';

export const ColorPallette: Record<string, string> = {
  rosegold: '#F9D2CD',
  gold: '#F3DBC4',
  silver: '#D9DADB',
  black: '#363539',
  green: '#BEE8D5',
  yellow: '#FEE889',
  white: '#FCF7F4',
  purple: '#CCC2D6',
  red: '#CD283F',
  spacegray: '#4E4D4B',
  midnightgreen: '#5F6960',
  coral: '#FD6A56',
};

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setiSLoading] = useState(true);
  const [phone, setPhone] = useState<DetailsPhone | null>(null);
  const { idPhone } = useParams <{ idPhone: string }>();
  const [selected, setSelected] = useState(0);
  const { phones } = useContext(PhoneContext);
  const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

  useEffect(() => {
    if (idPhone) {
      getPhone(idPhone)
        .then(setPhone)
        .finally(() => setiSLoading(false));
    }
  }, [idPhone, phone]);

  function favouritesPhone() {
    const find = phones.find(currentPhone => currentPhone.phoneId === idPhone);

    if (find !== undefined) {
      return find;
    }

    return null;
  }

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="details">
          <div className="container">
            <div className="details__title--main">
              <HomeIcon title="Phones" />
              <img className="details__arrow" src={arrowRight} alt="homeIcon" />
              <p className="details__subtitle">{phone?.name}</p>
            </div>
            <button
              type="button"
              className="back"
              data-cy="backButton"
              onClick={handleGoBack}
            >
              back
            </button>
            <h1 className="details__title--name">{phone?.name}</h1>
            <div className="details__container">
              <div className="photos">
                <div className="photos__side">
                  {phone?.images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className="photos__buttons"
                      onClick={() => setSelected(index)}
                    >
                      <img
                        src={`${URL}${image}`}
                        alt="side_photo"
                        className="photos__sidePhoto"
                      />
                    </button>
                  ))}
                </div>
                <div className="photos__main">
                  <img
                    className="photos__main__img"
                    src={`${URL}${phone?.images[selected]}`}
                    alt="main_photo"
                  />
                </div>
              </div>
              <div className="params__container">
                <div className="params__color">
                  <p className="params__color--heading">Available colors</p>

                  <div className="colors__list">
                    {phone?.colorsAvailable.map(color => (
                      <div
                        key={color}
                        className="colors__item"
                      >
                        <div className={classNames('colors__border', {
                          'colors__border--selected': color === phone.color,
                        })}
                        >
                          <Link
                            to={`/phones/${phone.namespaceId}-${phone.capacity.toLocaleLowerCase()}-${color}`}
                            className="colors__circle"
                            style={{ backgroundColor: `${ColorPallette[color]}` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="params__capacity">
                  <p className="params__capacity--heading">Select capacity</p>
                  <div className="capacities__list">
                    {phone?.capacityAvailable.map(capacity => (
                      <Link
                        to={`/phones/${phone.namespaceId}-${capacity.toLocaleLowerCase()}-${phone.color}`}
                        className={classNames('capacities__link', {
                          'capacities__link--selected':
                        capacity === phone.capacity,
                        })}
                        key={capacity}
                      >
                        {capacity}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="ProductCard__price">
                  <div className="ProductCard__price-normal">{`$${phone?.priceDiscount}`}</div>
                  {phone?.priceDiscount && (
                    <div className="ProductCard__price-discounted">{`$${phone.priceRegular}`}</div>
                  )}
                </div>
                <div className="ProductCard__details">
                  <div className="ProductCard__buttons">
                    <BuyButtonCart phone={favouritesPhone()} />
                    <FavouritesIcon phone={favouritesPhone()} />
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Screen
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.screen || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Resolution
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.resolution || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Processor
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.processor || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">RAM</div>
                    <div className="ProductCard__details-item__value">
                      {phone?.ram || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details__container">
              <div className="details__about">
                <h2 className="details__about-title">About</h2>
                <h3>{phone?.description[0]?.title}</h3>
                <span className="details__description">
                  {phone?.description[0]?.text}
                </span>
                <h3>{phone?.description[1]?.title}</h3>
                <span className="details__description">
                  {phone?.description[1]?.text}
                </span>
                <h3>{phone?.description[2]?.title}</h3>
                <span className="details__description">
                  {phone?.description[2]?.text}
                </span>
              </div>
              <div className="details__tech">
                <h2 className="details__title">Tech specs</h2>
                <div className="ProductCard__details">
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Screen
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.screen || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Resolution
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.resolution || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Processor
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.processor || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">RAM</div>
                    <div className="ProductCard__details-item__value">
                      {phone?.ram || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Built in memory
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.capacity || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">
                      Camera
                    </div>
                    <div className="ProductCard__details-item__value">
                      {phone?.camera || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">Zoom</div>
                    <div className="ProductCard__details-item__value">
                      {phone?.zoom || '-'}
                    </div>
                  </div>
                  <div className="ProductCard__details-item">
                    <div className="ProductCard__details-item__name">Cell</div>
                    <div className="ProductCard__details-item__value">
                      {phone?.cell || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AlsoLike />
          </div>
        </section>
      )}

    </div>
  );
};
