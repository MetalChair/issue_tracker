import React, { Component } from 'react'
import {Card, Container, Col, Row, Button, Alert} from 'react-bootstrap'
import {BsFillGearFill} from 'react-icons/bs';
import ProjectFinder from './ProjectFinder'
import GithubUser from './GithubUser';

export default class UserList extends Component {
    render() {
        return (
            <Card className = "max-h-50">
                <Container className = "header-bar" fluid>
                    <Col>
                        <Row className = "header-row">
                            <div className = "align-middle">
                                <b>
                                Users You Track:
                                </b>
                            </div>
                            <ProjectFinder 
                                userData = {this.props.userData} 
                                cookieHandler = {this.props.cookieHandler} 
                                onCookieChange = {this.props.onCookieChange} 
                                show = {this.state.show} 
                                onHide = {this.onModalHide}
                                type = {"user"}
                            >
                            </ProjectFinder>
                            <Button className = "ml-auto" onClick = {this.toggleModal}>
                                <BsFillGearFill className = "button-icon"></BsFillGearFill>
                            </Button>
                        </Row>
                    </Col>
                </Container>
                <Container >
                    <Col>
                        {this.props.userData.user_subs == null || this.props.userData.user_subs.length === 0 ?
                            <Row>
                                <Alert variant = "primary" className = "fluid w-100">You need to follow some users</Alert>
                            </Row>
                            :
                            this.props.userData.user_subs.map((item, key) =>
                            <Row 
                            key = {key}
                            >
                                <GithubUser
                                user = {item}
                                cookieHandler = {this.props.cookieHandler}
                                >
                                </GithubUser>
                            </Row>
                            )

                        }
                    </Col>
                </Container>
            </Card>
        )
    }

    toggleModal(){
        this.setState({show : !this.state.show});
        console.log(this.state.show);
    }

    onModalHide(){
        this.setState({show :  false});
    }
    
    constructor(props){
        super(props);
        this.state = {show: false};
        this.onModalHide = this.onModalHide.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
}
