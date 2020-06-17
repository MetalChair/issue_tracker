import React from 'react';
import {Button, Col, Row, Container, Alert, Card} from 'react-bootstrap'
import {BsFillGearFill} from 'react-icons/bs';
import {FaMinusSquare} from 'react-icons/fa'
import ProjectFinder from './ProjectFinder'
import GitHubProject from './GitHubProject';
import {BsTriangleFill} from 'react-icons/bs';


class ProjectList extends React.Component{

    render() {        
        return (
            <Card className = "max-h-50">
                <Container className = "header-bar" fluid>
                    <Col>
                        <Row className = "header-row">
                            <div className = "align-middle">
                                <b>
                                Projects You Track:
                                </b>
                            </div>
                            <ProjectFinder 
                                userData = {this.props.userData} 
                                cookieHandler = {this.props.cookieHandler} 
                                onCookieChange = {this.props.onCookieChange} 
                                show = {this.state.show} 
                                onHide = {this.onModalHide}
                                type = {"project"}
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
                        {this.props.userData.subs == null || this.props.userData.subs.length === 0 ?
                            <Row>
                                <Alert variant = "primary" className = "fluid w-100">You need to follow some projects</Alert>
                            </Row>
                            :
                            this.props.userData.subs.map((data, key) => {
                                var tri_style = {
                                    color: data.color
                                }
                                return(
                                    <Row key = {key} className = " vert-center justify-content-center">
                                        <Card className = "w-100 h-100-px">
                                            <Container>
                                                <Row>
                                                    <Col lg = {2} className = "vert-center">
                                                        <BsTriangleFill
                                                            style = {tri_style}
                                                        ></BsTriangleFill>
                                                    </Col>
                                                    <Col lg = {7}>
                                                        <Row>
                                                            <b>{data.name}</b>
                                                        </Row>
                                                        <Row>
                                                            {data.description}
                                                        </Row>
                                                    </Col>
                                                    <Col lg = {2} className = "vert-center">
                                                        <Button variant = "danger" onClick = {() => this.props.cookieHandler.removeFromCookie(data)}>
                                                            <FaMinusSquare></FaMinusSquare>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card>
                                    </Row>
                                    )
                                }
                            )
                        }
                    </Col>
                </Container>
            </Card>
        )
    }

    constructor(props){
        super(props);
        this.state = {show: false};

        //Bind the function to toggle the modal
        this.toggleModal = this.toggleModal.bind(this);
        this.onModalHide = this.onModalHide.bind(this);
    }

    toggleModal(){
        this.setState({show : !this.state.show});
    }

    onModalHide(){
        this.setState({show :  false});
    }


}

export default ProjectList;