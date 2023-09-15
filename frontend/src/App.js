import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { Provider,useSelector } from "react-redux";
import store from "./redux/store";
import Landing from "./pages/Landing";
import Signin from "./pages/Auth/Signin";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/Auth/SignUp";
import Profile from "./pages/profile/Profile";
import IndividualProfile from "./pages/profile/IndividualProfile";
import Loader from './theme/common/Loader';
import { Suspense, useEffect, useState,lazy } from 'react';
import ECommerce from './theme/pages/Dashboard/ECommerce'
import routes from './theme/routes';
const DefaultLayout = lazy(() => import('./theme/layout/DefaultLayout'));
function App() {
  const [loading, setLoading] = useState(true);

  const [tokenData,setTokenData]=useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const location = useLocation();
  const showNavbarRoutes = ['/', '/profile','/signin','/signup','/individual-profile'];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);
  return loading ? (
    <Loader />
  ) : (
    <Provider store={store}>
      <div>
    
      <div className="mx-auto w-full md:w-1440 px-2 md:px-40">
     
      {shouldShowNavbar && <Navbar />}
      </div>
      <Routes>
       
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/individual-profile" element={<IndividualProfile />} />
          </>
     
          <>
            <Route element={<DefaultLayout />}>
              <Route path="/dashboard" element={<ECommerce />} />
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path} // Add a unique key for each mapped route
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </>
       
      </Routes>
    
      </div>
    </Provider>
  );

  
}

export default App;
