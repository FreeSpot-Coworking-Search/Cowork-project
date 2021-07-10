import './App.css';
import { React } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import Center from './pages/Center/Center';
import MyCenter from './pages/MyCenter/MyCenter';
import MyCoworking from './pages/MyCoworking/MyCoworking';
import Space from './pages/Space/Space';
import SearchCenter from './pages/SearchCenter/SearchCenter';
import SearchSpaces from './pages/SearchSpaces/SearchSpaces';

function App() {
	return (
		<>
			<BrowserRouter>
				<Link to="/"> Home </Link>
				<Link to="/user"> user </Link>
				<Link to="/admin"> admin </Link>
				<Link to="/space"> space </Link>
				<Link to="/center"> center </Link>
				<Link to="/search/center"> searchCenter </Link>
				<Link to="/search/space"> searchSpace </Link>
				<Link to="/mycoworking"> mycoworking </Link>
				<Link to="/mycenter"> mycenter </Link>
				<Switch>
					<Route path="/user">
						<User />
					</Route>
					<Route path="/admin">
						<Admin />
					</Route>
					<Route path="/space">
						<Space />
					</Route>
					<Route path="/center">
						<Center />
					</Route>
					<Route path="/search/center">
						<SearchCenter />
					</Route>
					<Route path="/search/space">
						<SearchSpaces />
					</Route>
					<Route path="/mycoworking">
						<MyCoworking />
					</Route>
					<Route path="/mycenter">
						<MyCenter />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
