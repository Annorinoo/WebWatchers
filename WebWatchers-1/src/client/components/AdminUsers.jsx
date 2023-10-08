import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchAllUsers } from "../API/ajaxHelper"

export default function Websites(adminLoggedIn) {
    const [users, setUsers] = useState([]);
    const [userReviews, setUserReviews] = useState([]);



    function renderAllUsers() {
        return users.map((user) => {
            return (
                <div key={user?.id}>
                    <h1> Name: {user?.name}</h1>
                    <h2> Username: {user?.username}</h2>
                    {/*add in smt to count the number of reviews each user has*/}
                    <ul>
                        {userReviews.map((review, index) => (
                        <li key={index}>{review}</li>))}
                    </ul>
                    <p>Total Reviews: {userReviews.length}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allUsersHandler() {
            const result = await fetchAllUsers();
            setUsers(result.users);
            console.log("websites", result.users);
        } allUsersHandler();
    }, [])

    return (
        <>
        {adminLoggedIn ? (
            <div>{renderAllUsers()}</div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}