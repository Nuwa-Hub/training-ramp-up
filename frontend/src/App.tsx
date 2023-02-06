import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Layout } from './components/layout/Layout'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { HomePage } from './pages/rampUpHome/HomePage'
import { SignInPage } from './pages/signInPage/SignInPage'
// import { routes } from './utils/Routes'

function App(): JSX.Element {

  const allowedRoles = ['admin', 'guest', 'editor']


  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/api/users/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }as any,
      })
        .then((response:any) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<SignInPage />} />
        <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
