

import  { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Link } from 'preact-router/match';
import axios from 'axios';
import './style';
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  Icon, Label, Table,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import AppMap from '../AppMap';
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        color:'green'
      }}
    />
   <Container  >
   <AppMap style={{width:'10px'}} />
   </Container>
  
   
  </Container>
  
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}
function LoginButton(props) {
  return (
    <Menu.Item position='right'>
    <Button as='a' >
    <Link  href="/signin">Log In</Link>
    </Button>
    <Button as='a'   style={{ marginLeft: '0.5em' }}>
    <Link  href="/signup">Sign Up</Link>
    </Button>
  </Menu.Item>
  );
}

function LogoutButton(props) {
  return (
    <Menu.Item position='right'>
    <Button as='a' onClick={props.onClick}  style={{ marginLeft: '0.5em' }}>
   Logout
    </Button>
    </Menu.Item>
  );
}
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
 
  
  state = {
    tableData :[],
    getData:[]
  }
  
  componentDidMount() {
    axios.get("http://116.203.95.95:1234/api/pollution/airdata/")
    .then(res => {
      
      const getData = res.data;
      this.setState({getData});
      console.log("blogs:....");
      console.log(getData);
      // for (let index = 0; index < this.state.parentdevice.length; index++) {
      //   this.state.markers[index].name = this.state.parentdevice[index].areaname;
      //   this.state.markers[index].position = {lat:parseFloat(this.state.parentdevice[index].latitude),lng: parseFloat(this.state.parentdevice[index].longitude)}

      // }
    })
  }
  constructor(props) {
    
    
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    let comments = localStorage.getItem('JWT_TOKEN');
    console.log(comments);
    if (comments) {
      this.state = {isLoggedIn: true};
    } else {
      this.state = {isLoggedIn: false};
    }
    
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    localStorage.removeItem("JWT_TOKEN")
    this.setState({isLoggedIn: false});
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: false })
DateChange(date)
{
  console.log(date);
  axios.get("http://116.203.95.95:1234/api/pollution/airdata/",{params: {
    dataDate: date
  }})
  .then(res => {
    
    const getData = res.data;
    this.setState({getData});
    console.log("blogs:....");
    console.log(getData);
    // for (let index = 0; index < this.state.parentdevice.length; index++) {
    //   this.state.markers[index].name = this.state.parentdevice[index].areaname;
    //   this.state.markers[index].position = {lat:parseFloat(this.state.parentdevice[index].latitude),lng: parseFloat(this.state.parentdevice[index].longitude)}

    // }
  })
}
  render() {
this.state.tableData =[ 
  

   
   
 
];
try {
  for (let index = 0; index < this.state.getData.length; index++) {
    this.state.tableData.push( {
      name: "Prking Lot1",
      position: { lat: 54.33666843424961, lng: 10.122042618360124 }
    })
    console.log(index);
    this.state.tableData[index] = this.state.getData[index];
  
    
  }
} catch (error) {
  
}
console.log(this.state.tableData);
    const { children } = this.props
    const { fixed } = this.state
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton  />;
    }
    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, width: '100%' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                {/* <Menu.Item as='a'><Link style={{ color:'white' }} href="/addblog"><h1>Buy A Blog</h1></Link></Menu.Item> */}
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                {button}
              </Container>
            </Menu>
            <AppMap/>
           
          </Segment>
          
        </Visibility>
        <Segment style={{ padding: '10em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
     
        <Grid.Row style={{textAlign:'center'}}>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
          <DatePicker  onChange={date => this.DateChange(date)} />
          <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Last Measurement of CO2 in ppm</Table.HeaderCell>
        <Table.HeaderCell>last measurement of Temperature in °C</Table.HeaderCell>
        <Table.HeaderCell>last measurement of humidity in %</Table.HeaderCell>
        <Table.HeaderCell>last measurement of air pollution in µg/m³ from the measured air
</Table.HeaderCell>
        <Table.HeaderCell>daily rating from 1 -10 </Table.HeaderCell>
        <Table.HeaderCell>weekly rating from 1- 10</Table.HeaderCell>
        <Table.HeaderCell>monthly rating from 1 - 10</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
   
     
    {this.state.tableData.map((data, index) => (
         <Table.Row>
         <Table.Cell>{data.location}</Table.Cell>
         <Table.Cell>{data.co2ppm}</Table.Cell>
         <Table.Cell>{data.temperature}</Table.Cell>
         <Table.Cell>{data.humidity}</Table.Cell>
         <Table.Cell>{data.airpollution}</Table.Cell>
         <Table.Cell>{data.dailyrating}</Table.Cell>
         <Table.Cell>{data.weeklyrating}</Table.Cell>
         <Table.Cell>{data.monthlyrating}</Table.Cell>
         
       </Table.Row>
          ))} 
     
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    </Segment>
        {children}
        
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    let comments = localStorage.getItem('JWT_TOKEN');
    console.log(comments);
    if (comments) {
      this.state = {isLoggedIn: true};
    } else {
      this.state = {isLoggedIn: false};
    }
    
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    localStorage.removeItem("JWT_TOKEN")
    this.setState({isLoggedIn: false});
  }
  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton  />;
    }
    const { children } = this.props
    const { sidebarOpened } = this.state


    
    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'><Link style={{ color:'white' }} href="/addblog"><h1>Buy</h1></Link></Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' , width: '100%'}}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <AppMap/>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Mainpage = () => (
  <ResponsiveContainer>
   

    <Segment style={{ padding: '10em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row style={{textAlign:'center'}}>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
          <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Last Measurement of CO2 in ppm</Table.HeaderCell>
        <Table.HeaderCell>last measurement of Temperature in °C</Table.HeaderCell>
        <Table.HeaderCell>last measurement of humidity in %</Table.HeaderCell>
        <Table.HeaderCell>last measurement of air pollution in µg/m³ from the measured air
</Table.HeaderCell>
        <Table.HeaderCell>daily rating from 1 -10 </Table.HeaderCell>
        <Table.HeaderCell>weekly rating from 1- 10</Table.HeaderCell>
        <Table.HeaderCell>monthly rating from 1 - 10</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {
      console.log("ffff")
     
    /* {this.state.markers.map((marker, index) => (
            <Marker
            title="Location"
              key={index} // Need to be unique
              onClick={this.onMarkerClick}
              name={marker.name }
              position={marker.position}
              icon={marker.type == 'parent' ? { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" } : marker.available  ? { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" } : { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
            />
          ))} */}
      <Table.Row>
        <Table.Cell>Westring 324</Table.Cell>
        <Table.Cell>458 ppm</Table.Cell>
        <Table.Cell>13°C</Table.Cell>
        <Table.Cell>47%</Table.Cell>
        <Table.Cell>8%</Table.Cell>
        <Table.Cell>6</Table.Cell>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>4</Table.Cell>
        
      </Table.Row>
      <Table.Row>
      <Table.Cell>Road 324</Table.Cell>
        <Table.Cell>550 ppm</Table.Cell>
        <Table.Cell>17°C</Table.Cell>
        <Table.Cell>50%</Table.Cell>
        <Table.Cell>10%</Table.Cell>
        <Table.Cell>8</Table.Cell>
        <Table.Cell>6</Table.Cell>
        <Table.Cell>4</Table.Cell>
      
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
        Warum sind CO2 Werte und Luftverschmutzungen so bedeutsam für unseren Alltag?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        In unserem Alltag umgibt uns nahezu jederzeit CO2. Dies ist eine Gasförmige Verbindung, 
        welche unsere Lungen nicht aufnehmen können und welche somit bei höheren Konzentrationen
         gesundheitsschädlich wirken kann. Um dem gegenüber vorzusorgen,
          haben wir beschlossen über die Stadt CO2 Sensoren zu verteilen,
           um interessierte Anwohner und Bürger über ihre Luftqualität zu informieren.
            Diese Sensoren messen zusätzlich auch andere Daten, wie Luftfeuchtigkeit,
             Temperaturen oder Feinstaubbelastungen, um ein möglichst aufschlussreiches Gesamtbild zu projezieren.
        </p>
       

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
        Wer sind wir und warum machen wir das?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        Dieses Projekt ist von dem Verein “OHIOH.de” in Kooperation mit Clarify Data und 
        den Stadtwerken Kiel entwickelt und umgesetzt worden. Gemeinsam möchten wir uns 
        für das gesundheitliche Wohlbefinden unserer Mitbürger einsetzen und gegebenenfalls 
        über Risiken aufklären und bei der Vorsorge helfen. Wir stellen die dabei von uns 
        gesammelten Daten zu Klima und Luftqualität kostenfrei zur Verfügung, so dass sich 
        eine jede Person, jederzeit über mittel und langfristige Veränderungen informieren kann, 
        oder die Daten für eigene Projekte in Schule und Hobbys einzusetzen vermag.
        </p>
        {/* <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button> */}
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default Mainpage