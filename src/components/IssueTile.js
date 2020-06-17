import React, { Component } from 'react'
import {Card, Container, Column, Row, Col} from "react-bootstrap"
import {BsTriangleFill} from 'react-icons/bs';


export default class IssueTile extends Component {
    render() {
        var tri_style = {
            color: this.props.data.color
        }
        return (
            <Card className = "w-100">
                <Container>
                    <Row>
                        <Col className = "vert-center">
                            <BsTriangleFill
                                style = {tri_style}
                            ></BsTriangleFill>
                        </Col>
                        <Col lg = {11}>
                            <Row>
                                <b>{this.props.data.title}</b>
                            </Row>
                            <Row>
                                {this.props.data.body}
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col>
                                    <Row>
                                        <b>Created</b>
                                    </Row>
                                    <Row>
                                     {this.props.data.created_at}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <b>Comments</b>
                                    </Row>
                                    <Row>
                                        {this.props.data.comments}
                                    </Row>
                                </Col>
                                <Col>
                                    <a href = {this.props.data.html_url}>Go To</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </Card>
        )
    }
}
