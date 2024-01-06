import {
  ShopCategory,
  HotPrice,
  Carousel,
  BrandNew,
} from '../../Components';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home">
      <Carousel />
      <HotPrice />
      <ShopCategory />
      <BrandNew />
    </div>
  );
};
