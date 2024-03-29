import {
  useState, useMemo, useContext, useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PaginationButton, PaginationPhone, ProductCard, SortInput,
  Search, HomeIcon, PhoneContext,
} from '../../Components';
import { SortCategories } from '../../Type/sortCategory';
import './PhonePage.scss';

export const PhonePage :React.FC = () => {
  const { phones } = useContext(PhoneContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemOnPage, setItemOnPage]
  = useState(+(searchParams.get('itemOnPage') || 16));
  const [currentPage, setCurrentPage]
  = useState(+(searchParams.get('currentPage') || 1));
  const [sortValue, setSortValue]
  = useState((searchParams.get('sortValue') || SortCategories.newest));
  const query
  = searchParams.get('query') || '';
  const lastTotalIndex = currentPage * (itemOnPage);
  const firstTotalIndex = lastTotalIndex - itemOnPage;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', '1');
    setSearchParams(params);
    setCurrentPage(1);
  }, [sortValue, itemOnPage]);

  const visiblePhone = useMemo(() => {
    let preparedPhone = phones;

    if (query) {
      preparedPhone = preparedPhone.filter(
        phone => phone.name.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    if (sortValue) {
      preparedPhone = [...preparedPhone].sort((phone1, phone2) => {
        switch (sortValue) {
          case SortCategories.alphabetically:
            return (phone2.name.localeCompare(phone1.name));
            break;
          case SortCategories.cheapest:
            return phone1.fullPrice - phone2.fullPrice;
            break;
          case SortCategories.newest:
            return phone2.fullPrice - phone1.fullPrice;
            break;
          default:
            return 0;
        }
      });
    }

    return preparedPhone.slice(firstTotalIndex, lastTotalIndex);
  }, [phones, sortValue, currentPage, itemOnPage, query]);

  return (
    <main>
      <section className="phones">
        <div className="container">
          {!query ? (
            <>
              <HomeIcon title="Phones" />
              <h1>Mobile phones</h1>
            </>
          )
            : <p className="phones__text1">{`Result ${visiblePhone.length}`}</p>}
          {visiblePhone.length === 0 && (
            <p className="phones__text"> There are not  models</p>
          )}
          {!query && (
            <p className="phones__text1">{`${phones.length}  models`}</p>
          )}
          <div className="phones__search">
            <Search />

          </div>
          {!query && (
            <div className="phones__input">
              <SortInput
                sortValue={sortValue}
                setSortValue={setSortValue}
              />
              <PaginationPhone
                itemOnPage={itemOnPage}
                setItemOnPage={setItemOnPage}
              />
            </div>
          )}
          <ul className="phones__list">
            {visiblePhone.map((phone) => (
              <li
                className="phones__item"
                data-cy="item"
                key={phone.id}
              >
                <ProductCard phone={phone} />
              </li>
            ))}
          </ul>

          {!query && (
            <PaginationButton
              total={phones.length}
              itemOnPage={itemOnPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </main>
  );
};
