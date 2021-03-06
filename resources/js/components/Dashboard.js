import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'
import VehicleOverview from './VehicleOverview'
import UserLogList from './UserLogList'
import Vehicle from './Vehicle'
import VehicleEdit from './VehicleEdit'
import LogEdit from './LogEdit'


class Dashboard extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            vehicles: []
        }
        
        this.logout = this.logout.bind(this);
        this.loadVehicles = this.loadVehicles.bind(this);
    }
    
    logout()
    {
        axios.get('/api/auth/logout').
            then(response => {
                this.props.onLogout();
            })
            .catch(error => {
                alert(error);
            })
    }
    
    
    componentDidMount() 
    {
        this.loadVehicles();
        
    }
    
    loadVehicles()
    {
        axios.get('/api/vehicles')
            .then(response => {
                this.setState({
                    vehicles: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    
    
    render() {
        return (
            <Container className="content-container">
              <Row>
                <Col>
                  <h1><FontAwesomeIcon className="brand-icon" icon={ faStream } /> Logbook</h1>
                  <h5>
                      Hallo {this.props.user.name}{' '}
                      <Button variant="outline-secondary" size="sm" onClick={this.logout}>Ausloggen</Button>
                  </h5>
                </Col>
              </Row>
                  
              <BrowserRouter>
                <Switch>
                  <Route exact path='/' 
                      render={
                          (props) => 
                          <>
                            <VehicleOverview {...props} vehicles={this.state.vehicles} />
                            <br />
                            <UserLogList {...props} vehicles={this.state.vehicles} />
                          </>
                      } 
                  />
                  <Route path='/vehicle/:id' 
                          render={
                              (props) => 
                              <Vehicle {...props} />
                          } 
                      />
                  <Route path='/new'
                      render={
                          (props) => 
                          <VehicleEdit {...props} refreshCallback={this.loadVehicles} />
                      } 
                      />
                  <Route path='/edit/:edit_id'
                      render={
                          (props) => 
                          <VehicleEdit {...props} refreshCallback={this.loadVehicles} />
                      } 
                      />
                  <Route path='/newlog/:vehicle_id'
                      render={
                          (props) => 
                          <LogEdit {...props} refreshCallback={this.loadVehicles} />
                      } 
                      />
                  <Route path='/editlog/:edit_id'
                      render={
                          (props) => 
                          <LogEdit {...props} refreshCallback={this.loadVehicles} />
                      } 
                      />
                  <Route path='/register'
                      render={
                          (props) =>
                          <Redirect to="/" />
                      }
                      />
                </Switch>
              </BrowserRouter>
            </Container>
        )
    }
}

export default Dashboard