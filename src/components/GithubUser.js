import React, { Component } from 'react'
import {Card, Row, Col, Container, Image, Button} from 'react-bootstrap'
import {GoPlus} from 'react-icons/go';
import {FaMinusSquare} from 'react-icons/fa'


export default class GithubUser extends Component {
    render() {
        return (
            <Container>
                <Card className = "w-100">
                    <Row>
                        <Col lg = {2}>
                            <Row>
                                <Image
                                    src = {this.props.user.avatar_url}
                                    className = "icon"
                                >
                                </Image>
                            </Row>
                        </Col>
                        <Col lg = {8} className = "vert-center column">
                            <Row className = "w-100">
                                <Col>
                                    <b>{this.props.user.login.charAt(0).toUpperCase() + this.props.user.login.slice(1)}</b>
                                </Col>
                            </Row>
                            <Row className = "w-100">
                                <Col>
                                    <a href = {this.props.user.html_url}>Profile</a> 
                                </Col>
                            </Row>
                        </Col>
                        <Col lg = {2} className = "vert-center">
                            <Row>
                                {!this.props.cookieHandler.containsItem(this.props.user,'user') ?                              
                                    <Button
                                        onClick = {() =>
                                            this.props.cookieHandler.addToCookie(this.props.user, 'user')
                                        }
                                    >
                                        <GoPlus></GoPlus>
                                    </Button>
                                    :
                                    <Button
                                        onClick = {() =>
                                            this.props.cookieHandler.removeFromCookie(this.props.user, 'user')
                                        }
                                        variant = 'danger'
                                    >
                                        <FaMinusSquare></FaMinusSquare>
                                    </Button>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}
