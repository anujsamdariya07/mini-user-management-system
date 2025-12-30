import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  AdminDashboard,
  HomePage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  Layout,
} from './components';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [authUser]);

  if (isCheckingAuth) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader className='w-10 h-10 text-gray-500 animate-spin' />
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={authUser ? <HomePage /> : <Navigate to='/signin' />}
        />
        <Route
          path='signup'
          element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
        />
        <Route
          path='signin'
          element={!authUser ? <SignInPage /> : <Navigate to='/' />}
        />
        <Route
          path='profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/signin' />}
        />
        <Route
          path='admin'
          element={
            authUser && authUser.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to='/' />
            )
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />

      <Toaster />
    </>
  );
}

export default App;
