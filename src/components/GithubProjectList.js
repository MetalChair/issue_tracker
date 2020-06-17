import React, { Component } from 'react'
import { Container, Row, Image, Alert} from 'react-bootstrap';
import Loading from '../loading.gif';
import GitHubProject from './GitHubProject';
import GithubUser from './GithubUser';


export default class GithubProjectList extends Component {
    render() {
        if(this.props.listItems == null){
            return(
                <Container>
                    <Row className = "justify-content-center">
                    Enter a search query!
                    </Row>
                </Container>
            )
        }else if(this.props.listItems === "querying"){
            return(
                <Container>
                    <Row className = "justify-content-center">
                        <Image src = {Loading}></Image>
                    </Row>
                </Container>
            )
        }else if(this.props.listItems === "error"){
            return(
                <Container>
                    <Row className = "justify-content-center">
                        <Alert variant = "warning">There was an error processing your request</Alert>
                    </Row>
                </Container>
            )
        }else if(this.props.listItems.total_count === 0){
            return(
                <Container>
                    <Row className = "justify-content-center">
                        <Alert variant = "warning">Nothing with this name found!</Alert>
                    </Row>
                </Container>
            )
        }
        else if(this.props.type === "project"){
            return (
                    this.props.listItems.items.map((item,key) =>
                        <GitHubProject 
                            onCookieChange = {this.props.onCookieChange}
                            cookieHandler = {this.props.cookieHandler}
                            data = {item}
                            key = {key}
                            userData = {this.props.userData}
                            showDesc = {true}
                        >
                        </GitHubProject>
                    )
            )
        }else if(this.props.type === "user"){
            if(this.props.listItems.items){
                return(
                    this.props.listItems.items.map((item,key) =>
                        <GithubUser
                            name = {item.login}
                            user = {item}
                            key = {key}
                            cookieHandler = {this.props.cookieHandler}
                        >
    
                        </GithubUser>
                    )
                )
            }else{
                return(
                    <Container>
                        <Row className = "justify-content-center">
                            <Alert variant = "warning">Nothing with this name found!</Alert>
                        </Row>
                    </Container>
                )
            }
        }else{
            return(
                <Container>
                    <Row className = "justify-content-center">
                        <Alert variant = "warning">An error has ocurred, try again later!</Alert>
                    </Row>
                </Container>
            )
        }
    }

    OnComponentDidChange(){
        console.log("List has changed");
    }

    constructor(props){
        super(props);
    }
}
