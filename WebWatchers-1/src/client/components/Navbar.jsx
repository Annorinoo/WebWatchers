import { Link } from "react-router-dom";

export default function Navbar({loggedIn, setUser, setLoggedIn, adminLoggedIn, setAdminLoggedIn}) {
    return (
        <div>
            {loggedIn ? (
                <>
                <Link className="navbar-link" to="/websites">Websites</Link>
                <Link className="navbar-link" to="/reviews">Reviews</Link>
                <Link className="navbar-link" to="/reviews/create">Write a Review</Link>
                <Link className="navbar-link" to="/profile">Profile</Link>
                <Link className="navbar-link" to="/search">Search</Link>
                <Link className="navbar-link" to="/" onClick={() => {
                    localStorage.removeItem('user token')
                    setUser('')
                    setLoggedIn('')
                }}>Log Out</Link>
                </>
            ): adminLoggedIn ? (
                <>
                {/*For admin login navbar*/}
                <Link className="navbar-link" to="/admin/websites">Websites</Link>
                <Link className="navbar-link" to="/admin/users">Users</Link>
                <Link className="navbar-link" to="/admin/websites/create">Create Website</Link>
                <Link className="navbar-link" to="/search">Search</Link>
                <Link className="navbar-link" to="/" onClick={() => {
                    localStorage.removeItem('user token')
                    setUser('')
                    setAdminLoggedIn('')
                }}>Log Out</Link>
                </>
            ) : (
                <>
                {/*if a user is not logged in*/}
                <Link className="navbar-link" to="/websites">Websites</Link>
                <Link className="navbar-link" to="/reviews">Reviews</Link>
                <Link className="navbar-link" to="/login">Login</Link>
                </>
            )}
        </div>
    )
}