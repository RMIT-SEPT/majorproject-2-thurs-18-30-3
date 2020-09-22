import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

//Default home page for site
const Home = () => {
    const [content, setContent] = useState("");

    //Regulate displayed content based on whether user is logged in
    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;