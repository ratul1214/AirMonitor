import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import React, { useReducer } from 'react';
import {  Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import style from './style.css';
import axios from 'axios';

import Select from 'react-select'
const formReducer = (state, event) => {
	return {
	  ...state,
	  [event.name]: event.value
	}
   }
// Note: `user` comes from the URL, courtesy of our router
const SignUp = ({ user }) => {
	const [formData, setFormData] = useReducer(formReducer, {});
	const [submitting, setSubmitting] = useState(false);
  
	const handleSubmit = event => {
	  event.preventDefault();
	  setSubmitting(true);
	  
  axios({
    method: 'post',
    url: 'http://116.203.95.95:3000/signup',
    data: formData,
   
    })
    .then(function (response) {
        //handle success
        console.log(response);
        localStorage.setItem('JWT_TOKEN', response.data.user);
		window.location = '/';
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
	  setTimeout(() => {
		setSubmitting(false);
	  }, 3000);
	}
  
	const handleChange = event => {
		setFormData({
      name: event.target.name,
			value: event.target.value,
		  });
		 
		  console.log(formData);
	 
	}
	const [time, setTime] = useState(Date.now());
	const [count, setCount] = useState(10);
	const [blog, setoptions] = useState([]);
	 
	useEffect(() => {

		
	}, []);

	return (
	
		

  

    <Grid  style={{ height: '100vh',textAlign:'center' }} verticalAlign='middle' centered>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2'style={{color:'teal', textAlign:'center'}} >
        <Image src='/logo.png' /> Sign-Up  your account
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
    <Form.Field>
      <label>User Name</label>
      <input placeholder='username' name="username" onChange={handleChange}/>
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' name="email"  onChange={handleChange}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' name="password" onChange={handleChange}/>
    </Form.Field>
    <Form.Field>
      <label>Phone Number</label>
      <input placeholder='Phonenumber' name="phonenumber" onChange={handleChange}/>
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <input placeholder='Address' name="address" onChange={handleChange}/>
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit' color='teal' fluid size='large'>
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Message style={{ textAlign:'center' }}>
        Already have account? <a href='/signin'>Log in</a>
      </Message>
    </Grid.Column>
  </Grid>
	);
}

export default SignUp;
