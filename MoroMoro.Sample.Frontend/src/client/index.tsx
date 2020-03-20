import { hot } from "react-hot-loader/root"; // Must be imported before "react" and "react-dom".
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Root = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));

export default hot(Root);
