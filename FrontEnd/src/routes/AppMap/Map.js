
import { createRef , Component} from 'preact';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './index';
import MyClass from './GlobalState';
import axios from 'axios';
const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};
import {store, useGlobalState} from 'state-pool';


store.setState("count", 0);

export class CurrentLocation extends Component {
  
  wrapper = createRef();
    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
    
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        };
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
      }
      recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }
      componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
        }
        this.loadMap();
      }

      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
          
    
    //      const mapRef = this.refs.map;
    
          // reference to the actual DOM element
         const node = this.wrapper.current;
    
          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
    
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
          let { zoomvaldetect, parentdevice ,markers} = this.props;
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
          this.map.addListener("zoom_changed", () => {
       
            MyClass.zoomval = this.map.getZoom();
            console.log("Zoom: " +MyClass.zoomval);
           console.log('map...'+ this.props.parentdevice[1].id)
           this.props.zoomvaldetect;
           

          });
        }
      }

      
  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }
  render() {
    const style = Object.assign({}, mapStyles.map);
    const { zoomvaldetect } = this.props;
    return (
      <div>
        <div style={style} ref={this.wrapper}>
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
  }
  CurrentLocation.defaultProps = {
    zoom: 16,
    initialCenter: {
      lat:54.3236877956612,lng: 10.120146467496845
    },
    centerAroundCurrentLocation: false,
    visible: true
  };
  
  export default CurrentLocation;