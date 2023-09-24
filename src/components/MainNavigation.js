//Import css module
import classes from './MainNavigation.module.css';

//Import from react-router-dom
import { NavLink, Form } from 'react-router-dom';

//Import from react-redux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const MainNavigation = () => {
  //dispatch
  const dispatch = useDispatch();

  //get user and isLogin state from redux store
  const user = useSelector((state) => state.auth.user);
  const isLogin = useSelector((state) => state.auth.isLogin);

  //Handle logout
  const logoutHandler = () => {
    //Check user  and isLogin
    if (user) {
      //remove user from localStorage
      localStorage.removeItem('user');
      //dispatch set user and isLogin state from redux store
      dispatch(authActions.onLogout());
    }
  };

  return (
    <div className={classes.nav}>
      <div>
        <nav>
          <div>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to='/'
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to='/shop'
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <h1>BOUTIQUE</h1>
          <div>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to='/cart'
                >
                  <i className='fa-sharp fa-solid fa-cart-flatbed'></i> Cart
                </NavLink>
              </li>

              {!isLogin && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to='/login'
                  >
                    <i className='fa-solid fa-user'></i>Login
                    {/* <i className='fa-solid fa-caret-down'></i> */}
                  </NavLink>
                </li>
              )}

              {isLogin && (
                <li>
                  <p>
                    <i className='fa-solid fa-user'></i>
                    {user.name}{' '}
                    <i
                      className={`fa-solid fa-caret-down ${classes.black}`}
                    ></i>
                  </p>
                </li>
              )}

              {isLogin && (
                <li onClick={logoutHandler} className={classes.logout}>
                  <p>(Logout)</p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavigation;
