import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import Allproducts from './components/AllProducts/AllProducts.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import AddArtwork from './components/AddArtwork/AddArtwork.jsx';
import MyGallery from './components/myGallery/myGallery.jsx';
import MyFavorites from './components/myFavorites/myFavorites.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      { 
        path: "/explore-artworks", 
        Component: Allproducts 
      },
      { 
        path: "/register", 
        Component: Register 
      },
      { 
        path: "/login", 
        Component: Login 
      },
      {
        path: "/add-artwork",
        element: <PrivateRoute><AddArtwork /></PrivateRoute>
      },
      {
        path: "/my-gallery",
        element: <PrivateRoute><MyGallery /></PrivateRoute>
      },
      {
        path: "/my-favorites",
        element: <PrivateRoute><MyFavorites /></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);