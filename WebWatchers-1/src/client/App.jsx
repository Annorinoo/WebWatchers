import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import Main from './routes/Main';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user token');
    if (token) {
      // If a token is present, the user is logged in
      setLoggedIn(true);
      // If a token is present, an admin is logged in
      setAdminLoggedIn(true);
      // Get the user's username
      const username = localStorage.getItem('username');
      setUser(username);
    }
    setIsLoading(false);
  }, [user]);

  return (
    <Router>
      <div>
        <Navbar 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn}
          setUser={setUser} 
          adminLoggedIn={adminLoggedIn}
          setAdminLoggedIn={setAdminLoggedIn}
        />
        <Main
          setLoggedIn={setLoggedIn}
          setUser={setUser}
          loggedIn={loggedIn}
          user={user}
          adminLoggedIn={adminLoggedIn}
          setAdminLoggedIn={setAdminLoggedIn}
        />
      </div>
    </Router>
  );
}

export default App;
