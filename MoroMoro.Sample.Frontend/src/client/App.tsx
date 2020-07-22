import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";

import * as styles from "./App.styl";
import Home from "./Home";
import HomeWork from "./HomeWork";

const App = () => {
    return (
        <>
            <Link className={styles.menuButton} to="/">Home</Link>
            <Link className={styles.menuButton} to="/homework">Home Work</Link>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/homework" component={HomeWork} />
            </Switch>
        </>
    );
};

export default App;
