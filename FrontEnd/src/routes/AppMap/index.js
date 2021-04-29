import React from 'react';
import { createRef, Component } from 'preact';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import MyClass from './GlobalState';
import axios from 'axios';
import CurrentLocation from './Map';
import { Link1 } from 'preact-fluid';
const mapStyles = {
  width: '100%',
  height: '100%'
};
import { store, useGlobalState } from 'state-pool';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://116.203.95.95:4001";



export class Home extends Component {
  _isMounted = false;
  state = {
    parentdevice: [],
    blogs: [],
    markers: [],
    response:''
  }
  
  zoomvaldetect() {
    console.log("Zoom: " + MyClass.zoomval);
    console.log(this.state.blogs);
    try {
      if (MyClass.zoomval > 18) {
        console.log(this.state.blogs);
        for (let index = 0; index < this.state.blogs.length; index++) {
          this.state.markers[index].id = this.state.blogs[index].id;
          this.state.markers[index].name = 'Blog' + index;
          this.state.markers[index].type = 'blog';
          this.state.markers[index].position = { lat: parseFloat(this.state.blogs[index].latitude), lng: parseFloat(this.state.blogs[index].longitude) }
          this.state.markers[index].avaiable = this.state.blogs[index].avaiable;
        }

      } else {
        console.log(this.state.parentdevice.length);
        for (let index = 0; index < this.state.parentdevice.length; index++) {
          this.state.markers[index].id = this.state.parentdevice[index].id;
          this.state.markers[index].name = this.state.parentdevice[index].areaname;
          this.state.markers[index].type = 'parent';
          this.state.markers[index].position = { lat: parseFloat(this.state.parentdevice[index].latitude), lng: parseFloat(this.state.parentdevice[index].longitude) }
          this.state.markers[index].avaiable = parseFloat(this.state.parentdevice[index].blognumber) - parseFloat(this.state.parentdevice[index].totalavailable);
        }
        // this.setState({markers });
      }
    } catch (error) {
      console.error();
    }


  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      this.state.response = data;
      let blogs = data;
      this.setState(blogs);
      console.log('socket'+this.state.response  );
    });
    this._isMounted = true;
    console.log("Zoom: " + MyClass.zoomval);

    axios.get("http://116.203.95.95:1234/api/spottroup/parentdevice/")
      .then(res => {
        const parentdevice = res.data;
        this.setState({ parentdevice });
        console.log("parentdevice:....");
        console.log(parentdevice);
        // for (let index = 0; index < this.state.parentdevice.length; index++) {
        //   this.state.markers[index].name = this.state.parentdevice[index].areaname;
        //   this.state.markers[index].position = {lat:parseFloat(this.state.parentdevice[index].latitude),lng: parseFloat(this.state.parentdevice[index].longitude)}

        // }
      })

    axios.get("http://116.203.95.95:1234/api/spottroup/blog/")
      .then(res => {
        const blogs = res.data;
        this.setState({ blogs });
        console.log("blogs:....");
        console.log(blogs);
        // for (let index = 0; index < this.state.parentdevice.length; index++) {
        //   this.state.markers[index].name = this.state.parentdevice[index].areaname;
        //   this.state.markers[index].position = {lat:parseFloat(this.state.parentdevice[index].latitude),lng: parseFloat(this.state.parentdevice[index].longitude)}

        // }
      })
  }
  i = 0;
  constructor(props) {
    super(props);


    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedplaceid: {},
    selectedplacename: {},
    value: 0
  };
  nameid = 0;
  onMarkerClick = (props, marker, e) => {

    //console.log('marker:..'+marker.id);
    this.nameid = props.name.split("/");
    console.log('props:..' + this.nameid);
    this.setState({
      selectedPlace: props,
      selectedplacename: this.nameid[0],
      selectedplaceid: this.nameid[1],
      activeMarker: marker,
      showingInfoWindow: true

    });

  }


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  handleClick(event) {
    this.setState({ value: undefined });
  }
  render() {
    
    try {
      if (MyClass.zoomval > 18) {
        this.state.markers = [];
        console.log(this.state.blogs.length);
        for (let index = 0; index < this.state.blogs.length; index++) {
          this.state.markers.push( {
            name: "Prking Lot1",
            position: { lat: 54.33666843424961, lng: 10.122042618360124 }
          })
          console.log(index);
          this.state.markers[index].id = this.state.blogs[index].id;
          this.state.markers[index].name = 'Blog' + index;
          this.state.markers[index].type = 'blog';
          this.state.markers[index].position = { lat: parseFloat(this.state.blogs[index].latitude), lng: parseFloat(this.state.blogs[index].longitude) }
          this.state.markers[index].available = this.state.blogs[index].available;
          
        }
      } else {
        this.state.markers = [];
        console.log('in render' + this.state.parentdevice.length);
        for (let index = 0; index < this.state.parentdevice.length; index++) {
          this.state.markers.push( {
            name: "Prking Lot1",
            position: { lat: 54.33666843424961, lng: 10.122042618360124 }
          })
          this.state.markers[index].id = this.state.parentdevice[index].id;
          this.state.markers[index].name = this.state.parentdevice[index].areaname;
          this.state.markers[index].type = 'parent';
          this.state.markers[index].position = { lat: parseFloat(this.state.parentdevice[index].latitude), lng: parseFloat(this.state.parentdevice[index].longitude) }
          this.state.markers[index].available = parseFloat(this.state.parentdevice[index].blognumber) - parseFloat(this.state.parentdevice[index].totalavailable);
        }
      }

      console.log(this.state.markers);
      console.log(this.state.parentdevice);
    } catch (error) {
      console.log(error)
      this.state.markers = [ // Just an example this should probably be in your state or props. 
        {
          title:'The marker`s title will appear as a tooltip.',
          name:'SOMA',
          position: { lat: 54.33666843424961, lng: 10.122042618360124 }
        },
        {
          title:'The marker`s title will appear as a tooltip.',
          name:'SOMA',
          position: { lat: 54.3236877956612, lng: 10.120146467496845 }
        },
        {
          title:'The marker`s title will appear as a tooltip.',
          name:'SOMA',
          position: { lat: 54.321251147910694, lng: 10.12785028619348 }
        }
       
      ];
    }
    console.log("Zoom: " + MyClass.zoomval);
    const { markers, parentdevice, blogs } = this.state;
    return (
      <div>

        <CurrentLocation
          centerAroundCurrentLocation
          zoomvaldetect={this.zoomvaldetect}
          parentdevice={parentdevice}
          blogs={blogs}
          markers={markers}

          google={this.props.google}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
            title="Location"
              key={index} // Need to be unique
              onClick={this.onMarkerClick}
              name={marker.name }
              position={marker.position}
              icon={marker.type == 'parent' ? { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" } : marker.available  ? { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" } : { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
            />
          ))}
          <Marker onClick={this.onMarkerClick} name={'Current Location'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>


              Rating:
            <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <h4>{this.state.selectedPlace.name}</h4>


              
            </div>
          </InfoWindow>

        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWi7va9_VnTpXvszjh5rFLuOPMs9XQcww'
})(Home);