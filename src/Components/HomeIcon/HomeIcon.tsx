import { Link } from 'react-router-dom';
import homeIcon from '../../img/icon/Home.png';
import arrowRight from '../../img/icon/ArrowRight.png';
import './HomeIcon.scss';

type Props = {
  title: string;
};

export const HomeIcon: React.FC<Props> = ({ title }) => {
  return (
    <div className="homeIcon">
      <Link
        to="/"
      >
        <img className="home__icon" src={homeIcon} alt="homeIcon" />
        <img className="home__icon" src={arrowRight} alt="homeIcon" />
      </Link>
      <Link
        className="page__title"
        to={`/${title.toLocaleLowerCase()}`}
      >
        {title}
      </Link>
    </div>
  );
};
