//Import from react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Import components
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as productListLoader } from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

//Import check login
import { checkLogin } from './utils/auth';

//Defines  routes via  createBrowerRouter func
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'products',
    loader: productListLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'detail/:productId',
        element: <DetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckOutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        loader: checkLogin,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        loader: checkLogin,
      },
    ],
  },
]);

function App() {
  //Render Router Component Tree
  return <RouterProvider router={router} />;
}

export default App;
