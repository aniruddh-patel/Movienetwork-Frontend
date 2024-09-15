import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mainbody from './pages/Mainbody';
import Movieinfo from './pages/Movieinfo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Page404 from './pages/Page404';
import Streampage from './pages/Streampage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '.';
import { useContext, useEffect } from 'react';

function App() {
  const { setIsAuthenticated, setUser, isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/user', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            username: data.username,
            email: data.email,
          });
          setIsAuthenticated(true);
        } else {
          setUser({});
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({});
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, [setIsAuthenticated, setUser]);

  const PrivateRoute = ({ children }) => {
    if (!isAuthenticated) {
      if (!toast.isActive('login-toast')) {
        toast.error('Please log in to access this page.', { 
          toastId: 'login-toast',
          autoClose: 2000
        });
      }
      return <Navigate to="/signin" />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      if (!toast.isActive('already-logged-in-toast')) {
        toast.info('You are already logged in.', { 
          toastId: 'already-logged-in-toast',
          autoClose: 2000
        });
      }
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Mainbody />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/stream" element={<Streampage />} />
          <Route 
            path="/movieinfo/:movie_id" 
            element={
              <PrivateRoute>
                <Movieinfo />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
        <ToastContainer 
          position="top-center"
          autoClose={2000}      
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          draggable
          theme="dark" 
        />
      </Router>
    </>
  );
}

export default App;
