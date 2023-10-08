import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Login from './Login'
import AdminLogin from './AdminLogin'
import AdminWebsites from './AdminWebsites'
import AdminUsers from './AdminUsers'
import Websites from './Websites'
import Reviews from './Reviews'
// import Profile from './Profile'
import Register from '../routes/Register'
import AdminCreateWebsite from './AdminCreateWebsite'
import AdminEditWebsite from './AdminEditWebsite'

export default function Main({ setLoggedIn, setUser, loggedIn, user, adminLoggedIn, setAdminLoggedIn }) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/search' element={<Search />} />

                <Route path='/login' element={<Login 
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/register' element={<Register
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/websites' element={<Websites />} />

                <Route path='/reviews' element={<Reviews />} />
                
                <Route path='/admin/login' element={<AdminLogin
                setAdminLoggedIn={setAdminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/websites' element={<AdminWebsites
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/users' element={<AdminUsers
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/websites/create' element={<AdminCreateWebsite
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/websites/edit' element={<AdminEditWebsite
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />
            </Routes>
        </div>
    )
}