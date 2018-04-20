import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import asyncComponent from './lib/AsyncComponent';

const News = () => <div>News ...</div>;
const Article = () => <div>Article ...</div>;

const AsyncHome = asyncComponent(() => import('./component/Home'));

export default () => (
    <Router basename={`ReactRouterCodeSplitting`}>
        <div>
            <Switch>
                <Route exact path={`/`} component={AsyncHome}><Link to={`/`}>Home...</Link></Route>
                <Route path={`/news`} component={News}></Route>
                <Route path={`/article`} component={Article}></Route>
                <Route render={props=><div>404 not found</div>}/>
            </Switch>
        </div>
    </Router>
);