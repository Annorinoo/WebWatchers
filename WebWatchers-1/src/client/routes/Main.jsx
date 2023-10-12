import { Routes, Route } from 'react-router-dom';

// Import your components
import Root from './Root';
import Login from '../components/Login';
import Register from './Register';
import WebsiteListings from './WebsiteListings';
import SingleWebsite from './SingleWebsite';
import Reviews from './Reviews';
import AdminLogin from '../components/AdminLogin';
import AdminWebsites from '../components/AdminWebsites';
import AdminUsers from '../components/AdminUsers';
import AdminCreateWebsite from '../components/AdminCreateWebsite';

export default function Main({
  setLoggedIn,
  setUser,
  loggedIn,
  user,
  adminLoggedIn,
  setAdminLoggedIn,
}) {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        {/* Children routes */}
        <Route path="login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="register" element={<Register setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="websites" element={<WebsiteListings />} />
        <Route path="websites/:id" element={<SingleWebsite />} />
        <Route path="reviews" element={<Reviews setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="admin/login" element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} setUser={setUser} />} />
        <Route path="admin/websites" element={<AdminWebsites setAdminLoggedIn={adminLoggedIn} setUser={setUser} />} />
        <Route path="admin/users" element={<AdminUsers setAdminLoggedIn={adminLoggedIn} setUser={setUser} />} />
        <Route path="admin/websites/create" element={<AdminCreateWebsite setAdminLoggedIn={adminLoggedIn} setUser={setUser} />} />
      </Route>
    </Routes>
  );
}
