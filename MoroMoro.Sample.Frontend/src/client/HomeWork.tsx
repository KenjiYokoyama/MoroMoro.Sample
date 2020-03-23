import * as React from "react";
import { useState, useEffect } from "react";

const HomeWork = () => {
    const [message, setMessage] = useState("Loading...");
    useEffect(() => {
        fetch("/api/hello")
            .then(response => response.json())
            .then(json => setMessage(json.message));
    }, []);
    return (
        <h1>{message}</h1>
    );
};

export default HomeWork;
