//Import from react-router-dom
import { redirect } from 'react-router-dom';

//Check login or not
export const checkLogin = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  if (user) {
    return redirect('/');
  }
  return null;
};
