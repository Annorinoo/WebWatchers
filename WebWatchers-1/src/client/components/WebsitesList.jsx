import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllWebsites } from "../API/ajaxHelper";
import "../Style/WebsitesList.css";

export default function WebsitesList() {
    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        async function allWebsitesHandler() {
            try {
                const result = await fetchAllWebsites();
                console.log(result); // Add this line to check the API response in the console.
                if (result && result.websites) {
                    setWebsites(result.websites);
                }
            } catch (error) {
                console.error("Error fetching websites:", error);
            }
        }
        allWebsitesHandler();
    }, []);

    return (
        <div className="websites-list">
            {websites.map((website) => (
                <div key={website?.id} className="website-container">
                    {/* Wrap the name and image with a Link */}
                    <Link to={`/websites/${website?.id}`}>
                        <h1 className="website-name">{website?.name}</h1>
                        <img
                            className="website-image"
                            src={website?.image}
                            alt={`Image for ${website?.name}`}
                        />
                    </Link>
                    <p className="website-description">{website?.description}</p>
                    <a
                        className="website-url"
                        href={website?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {website?.url}
                    </a>
                </div>
            ))}
        </div>
    );
}


