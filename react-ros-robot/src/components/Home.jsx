import React, { Component } from 'react';
import Connection from './Connection';
import {Container, Row, Col} from 'react-bootstrap';
import Teleoperation from './Teleoperation';
import Map from './Map';

class Home extends Component {
    render() {
        return (
           
        <div>
         <Container>
            <Row>   
                <Col> 
                    <Connection /> 
                </Col>    
            </Row>
            <Row>      
                <Col> 
                    <Teleoperation />
                </Col>  
                <Col> 
                    <Map />
                </Col>     

            </Row>
        
                
         </Container>
        </div>
        
        );
    }
}

export default Home;