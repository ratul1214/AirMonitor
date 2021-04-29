import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/AppMap';
import Profile from '../routes/PageBooking';
import Mainpage from '../routes/PageHome';
import SignUp from '../routes/PageSignup';
import SignIn from '../routes/PageSignin';
import  AddBlog  from '../routes/PageAddBlog';
import QRScan from '../routes/qrcode';


const App = () => (
	<div id="app">
	
		<Router>
			<Mainpage path="/" />
			<Home path = "/home"/>
			<Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" />
			<SignUp path="/signup" />
			<SignIn path="/signin" />
			<AddBlog path='/addblog'/>
			<QRScan path='/qrscan'/>
		</Router>
		
	</div>
)

export default App;
