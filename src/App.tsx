import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PhoneProvider } from './Components/Context/contex';
import { HomePage } from './Pages/HomePage';
import { MenuBurger, Header, Footer } from './Components';
import { PhonePage } from './Pages/PhonePage';
import { FavouritesPage } from './Pages/FavouritesPage';
import { CardPage } from './Pages/CardPage';
import { AccessoriesPage } from './Pages/AccessoriesPage';
import { ProductDetailsPage } from './Pages/ProductDetalsPage';
import { TabletsPage } from './Pages/TabletsPage';
import { CardBuyPage } from './Pages/CardBuyPage';

const App = () => (
  <PhoneProvider>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/menu" element={<MenuBurger />} />
        <Route path="/phones">
          <Route index element={<PhonePage />} />
          <Route path=":idPhone" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<CardPage />} />
        <Route path="/cartbuy" element={<CardBuyPage />} />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
      <Footer />
    </div>
  </PhoneProvider>
);

export default App;
