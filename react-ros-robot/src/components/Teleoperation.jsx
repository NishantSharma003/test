import React, { Component } from 'react';
import { Joystick } from 'react-joystick-component';
import Config from '../scripts/config';


class Teleoperation extends Component {
    state = {ros: null};
    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () =>{
            console.log("connection established"); 
            this.setState({ connected: true});   
        });

        this.state.ros.on("close", () =>{
            console.log("connection is closed"); 
            this.setState({ connected: false}); 
            //try to reconnect every 2 seconds
            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://0.0.0.0:9090");
                    this.state.ros.connect("WS://" +Config.ROSBRIDGE_SERVER_IP + ":" +Config.ROSBRIDGE_SERVER_PORT + "");
                  } catch (error) {
                    console.log("connection problem");
                  }

            }, Config.RECONNECTION_TIMER);  
        });

        try {
            this.state.ros.connect("ws://0.0.0.0:9090");
            this.state.ros.connect("WS://" +Config.ROSBRIDGE_SERVER_IP + ":" +Config.ROSBRIDGE_SERVER_PORT + "");
          } catch(error) {
            console.log("connection problem");
          }

        
    }



    handleMove(event) {
        console.log("handel move");

        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",

        });
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y / 100,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: -event.x / 80,
            },    
        });

        cmd_vel.publish(twist);

    }
    handleStop(event) {
        console.log("handel stop");

        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",

        });
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
            },    
        });

        cmd_vel.publish(twist);
    }
    render() {
        return (<div>
            
            <Joystick size={100} sticky={false} baseColor="#EEEEEE" stickColor="#BBBBBB" move={this.handleMove} stop={this.handleStop}></Joystick>

        </div>    
        
        
        
        );
    }
}

export default Teleoperation;