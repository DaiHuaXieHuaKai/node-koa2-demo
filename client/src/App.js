import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './libs/routes';

class App extends Component {
    render() {
        return (
            <Switch>
                {routes.map(({
                    path,
                    exact = true,
                    name,
                    component
                }) => (
                    <Route key={name} path={path} exact={exact} component={component}></Route>
                ))
}
            </Switch>
        );
    }
}

export default App;
