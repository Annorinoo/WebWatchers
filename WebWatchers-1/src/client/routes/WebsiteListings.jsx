import React from "react";
import WebsitesList from "../components/WebsitesList";
import WebsiteSearch from "../components/WebsiteSearch";

const WebsiteListings = () => {
    return (
        <div>
            <h2> Welcome to the Website List</h2>
            <WebsiteSearch/>
            <WebsitesList/>
        </div>
    );
};

export default WebsiteListings;