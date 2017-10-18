'use strict';

// Libraries
import * as React from 'react';
import style from 'styled-components';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Search} from "./Search";
import {Author} from "./Author";
import {Evolution} from "./Evolution";

const AppContent = style.div`
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

interface AppProps {
	history?: any;
}

class App extends React.Component<AppProps, {}> {
	render() {
		return (
			<AppContent>
				<Switch>
					<Route path="/evolution" component={Evolution}/>
					<Route path="/search/:domain?/:query?" component={Search}/>
					<Route path="/author/:id" component={Author}/>
					<Redirect path="/" to="/search"/>
					{/*<Route component={NotFound}/>*/}
				</Switch>
			</AppContent>
		);
	}
}

export default App;
