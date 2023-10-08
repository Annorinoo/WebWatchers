import { useState, useEffect } from "react"
import { deleteWebsite, fetchAllAdminWebsites } from "../API/ajaxHelpes"

export default function AdminWebsites(adminLoggedIn) {
    const [websites, setWebsites] = useState([]);

    function renderAllWebsites() {
        return websites.map((website) => {
            return (
                <div key={website?.id}>
                    <h1>{website?.name}</h1>
                    <h2>{website?.description}</h2>
                    <h2>{website?.url}</h2>
                    <h2>{website?.image}</h2>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(website.id)}>Delete</button>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allWebsitesHandler() {
            const result = await fetchAllAdminWebsites();
            setWebsites(result.admin);
        } allWebsitesHandler();
    }, [])

    async function handleDelete(websiteId) {
        try {
            await deleteWebsite(websiteId);
            const updatedWebsites = await fetchAllAdminWebsites();
            setWebsites(updatedWebsites.admin);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        {adminLoggedIn ? (
            <div>{renderAllWebsites()}</div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}