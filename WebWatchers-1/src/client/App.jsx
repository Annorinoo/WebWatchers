// import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from "./routes/Root.jsx";
// import HomePage from './routes/HomePage.jsx'; 
import WebsiteListings from './routes/WebsiteListings.jsx';
import Profile from './routes/Profile.jsx';
import Register from "./routes/Register.jsx"; 
import Login from "./routes/Login.jsx"; 
import SingleWebsite from './routes/SingleWebsite.jsx';
import AdminLogin from './routes/adminLogin.jsx';
import ReviewList from './routes/Reviews.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // {
      //   path: "HomePage",
      //   element: <HomePage />,
      // },
      {
        path: "WebsiteListings", // Updated path
        element: <WebsiteListings />,
      },
      {
        path: "websites/:id", // Updated path
        element: <SingleWebsite />,
        // children: [
        //   // Add routes for posting and editing reviews here
        //   {
        //     path: "post-review",
        //     element: <PostReviewForm />,
        //   },
        //   {
        //     path: "edit-review",
        //     element: <EditReviewForm />,
        //   },
        // ],
      },
      {
        path: "Profile",
        element: <Profile />,
      }, 
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Reviews",
        element: <ReviewList />,
      },
      {
        path: "AdminLogin",
        element: <AdminLogin />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
