import React from 'react';
import { createRef, Component } from 'preact';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Link } from 'preact-router/match';
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";



export class AddBlog extends Component {
  _isMounted = false;
  state = {
    lat: 0.0,
    lng: 0.0

  };

   formData = new FormData();

  componentWillUnmount() {
    this._isMounted = false;
  }
  onMapClicked = (props) => {
    console.log('onmap clicked');
    if (this.state.showingInfoWindow) {
      this.setState({

        activeMarker: null
      })
    }
  };
  componentDidMount() {
     // returns the URL query String
    
    console.log(this.props.matches.id);
    


  }
  i = 0;
  constructor(props) {
    super(props);


    this.handleClick = this.handleClick.bind(this);
  }
  state = {

    activeMarker: {},

    value: 0
  };
  nameid = 0;
  onMarkerClick = (props, marker, e) => {


    this.setState({



    });

  }
  onMarkerDragend = (props, marker, e) => {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    this.setState({ lat });
    this.setState({ lng });
    console.log('drag lat lang' + lat + ' ' + lng);

    console.log('on dragend');
  }

  handleSubmit = event => {
    event.preventDefault();
    

   
    axios.post('http://116.203.95.95:1234/api/spottroup/blog/', {
      latitude: this.state.lat.toString(),
longitude: this.state.lng.toString(),
parentdeviceid: "5fd9055129c999e8b94e902a",
available: true,
type : "A",
classname : "A"
    })
      .then(function (response) {
        //handle success
        console.log(response);

       
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setTimeout(() => {
     
    }, 3000);
  }
  handleChange = event => {
	  
	  try {
		
      this.formData.append(event.target.name, event.target.value);
     
      console.log(this.formData);
      console.log(event.target.name+'  '+event.target.value);
	  } catch (error) {
	
      this.formData.append(event.name, event.value);
      console.log(event.name+'  '+event.value);
	     console.log(this.formData);
		  console.log(this.formData);
	  }
	}
  
  handleClick(event) {
    this.setState({ value: undefined });
  }
  render() {




    return (
      <div>
        <Grid style={{ textAlign: 'center', marginTop: 50 }} horizontalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450, height: 450 }}>
              <Button><Link style={{ color: 'white' }} href="/qrscan"><h1>Scan Blog</h1></Link></Button>
              <Map
                style={{ width: '300px', height: '450px', marginTop: 20 }}
                onClick={this.onMapClicked}
                google={this.props.google}
              >

                <Marker draggable={true}
                  onDragend={this.onMarkerDragend}
                  onClick={this.onMarkerClick} name={'Current Location'} />

              </Map>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <h3>latitude: {this.state.lat}</h3>
              <h3>longitude: {this.state.lng}</h3>
              <input type="datetime-local" id="birthdaytime" name="parkingtime" onChange={this.handleChange}></input>

              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>

                  <Form.Field>

                    <label for="meeting-time">Choose a date and time for your booking:</label>

                    <input type="datetime-local" id="birthdaytime" name="parkingtime" onChange={this.handleChange}></input>
                  </Form.Field>
                
                  <Button type='submit' color='teal' fluid size='large' style={{}}>
                    Book
          </Button>
                </Segment>
              </Form>

            </Grid.Column>
          </Grid.Row>




        </Grid>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWi7va9_VnTpXvszjh5rFLuOPMs9XQcww'
})(AddBlog);