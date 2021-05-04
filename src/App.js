import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './App.css';
import Main from "./components/Main/Main";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pathname: '',
        }
        this.notifyPathname = this.notifyPathname.bind(this)
    }

    notifyPathname(pathname) {
        this.setState({
            pathname: pathname,
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main/>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
