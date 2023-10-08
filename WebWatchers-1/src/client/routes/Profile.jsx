// import { useState, useEffect } from "react";
// import { getUserProfile } from "../API/ajaxHelper";

// const Profile = () => {
//     const token = localStorage.getItem('token');
//     const [userProfile, setUserProfile] = useState(null);

//     useEffect(() => {
//         if (token) {
//             // Fetch the user's profile data using the token
//             getUserProfile(token)
//                 .then((data) => {
//                     setUserProfile(data.user);
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching user profile:", error);
//                 });
//         }
//     }, [token]);

//     return (
//         <div className="panel">
//             <h2>My Profile</h2>
//             {userProfile && (
//                 <div>
//                     <h3>Name: {userProfile.username}</h3>
//                     {/* {userProfile.profilePicture && (
//                         <img src={userProfile.profilePicture} alt="Profile" />
//                     )} */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;

import { useState, useEffect } from "react"
import { fetchMyData } from "../API/ajaxHelper";

export default function Profile({loggedIn, user}) {
    const [datas, setDatas] = useState([]);

    function renderMyData() {
        return datas.map((data) => {
          return (
            <div key={data.id}>
                <h1>{data.username}</h1>
            </div>
        )  
        })
        
    }

    useEffect(() => {
        async function myDataHandler() {
            const result = await fetchMyData();
            setDatas(result.data.data);
        } myDataHandler();
    }, [])

    return (
        <div>
            {renderMyData()}
        </div>
    )
}