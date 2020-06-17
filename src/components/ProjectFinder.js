import React from 'react';
import {Container, Modal, Row, Col, InputGroup, Button, FormControl, ThemeProvider} from 'react-bootstrap';
import GithubProjectList from './GithubProjectList';
var jsonResponse = require("../fakeData.json");

class ProjectFinder extends React.Component{
    
    render(){
        var label = "Enter a Project Name";
        if(this.props.type === "user")
            label = "Enter a User"
        return (
            <Modal show = {this.props.show} onHide = {this.props.onHide} dialogClassName = "modal-80w">
                <Modal.Header closeButton>
                    <Modal.Title>Find Projects To Follow:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder= {label}
                                    aria-label={label}
                                    aria-describedby="basic-addon2"
                                    onChange = {this.onSearchChange}
                                    />
                                    <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick = {this.createAndRunQuery}>Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <GithubProjectList 
                                cookieHandler = {this.props.cookieHandler} 
                                userData = {this.props.userData} 
                                onCookieChange = {this.props.onCookieChange} 
                                listItems = {this.state.list}
                                type = {this.props.type}
                            >

                            </GithubProjectList>
                        </Row>
                        <Row className = "justify-content-around">
                            {this.state.prevLink && this.state.prevLink.length &&
                                <Button variant = "primary" className = "w-30" onClick = {() => this.createAndRunQuery("last")}>Last Page</Button>
                            }
                            {this.state.nextLink && this.state.nextLink.length &&
                                <Button variant = "primary" className = "w-30" onClick = {() => this.createAndRunQuery("next")}>Next Page</Button>
                            }
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }

    constructor(props){
        super(props);

        //Every time we change the input, we're gonna queue
        //a function to call and wait a couple milliseconds to trigger it
        //This prevents us from hammering the api with queries on every mistype
        this.state = {currentCallback : null}

        this.onSearchChange = this.onSearchChange.bind(this);
        this.createAndRunQuery = this.createAndRunQuery.bind(this);
    }

    //Creates and runs a query for github project names
    //If a link exists in this.state.nextLink, it uses that, otherwise
    //it uses the this.state.currentQuery data
    createAndRunQuery(type){
        //Redundant for a change in the list triggered from
        //On search change but I really want the loading gif to
        //show up to signify we're doing something when the person types
        //so yeah... redundant code abound
        this.setState({list: "querying"})

        var queryString = null;
        //Handle case for users/project
        if(this.props.type === "project"){
            queryString = 'https://api.github.com/search/repositories?q=' + this.state.currentQuery + '+in:name'
            if(type === "next"){
            
                queryString = this.state.nextLink;
            }else if(type === "last"){
                queryString = this.state.prevLink;
            }
        }else if(this.props.type === "user"){
            queryString = "https://api.github.com/search/users?q=user:" + this.state.currentQuery;
        }

        fetch(queryString)
        .then(response => {
            if(response.headers.has("link"))
                this.extractLinkFromHeader(response.headers);

            
            return response.json();
        })
        .then(data =>{
            this.setState({list: data})
        })
        .catch((error) =>{
            this.setState({list: "error"})
        })

        //Debugging
        // setTimeout(() => {
        //     this.setState({list: jsonResponse.listItems});
        // },10);
        //this.setState({list: "lakjdflsakjd"});
    }

    onSearchChange(input){
        this.setState({currentQuery: input.target.value});
        this.setState({list: "querying"})
        var timeout = setTimeout(this.createAndRunQuery, 300);

        if(this.state.currentCallback != null){
            clearTimeout(this.state.currentCallback);
        }
        this.setState({currentCallback : timeout});

    }

    //Extract the link to the next page of projets from the header
    extractLinkFromHeader(header){
        var head_string = header.get("link");
        //Convert the string to an array
        var arr = head_string.split(',').map(e => e.split(';'));
        var next_request = null;
        var last_request = null;
        //Find the one that has the 'next' key
        for(var i = 0; i < arr.length; i++){
            var first_index = -1;
            var last_index = -1;
            if(arr[i][1].indexOf("next") > -1){
                first_index = arr[i][0].indexOf("<");
                last_index = arr[i][0].indexOf(">");

                next_request = arr[i][0].slice(first_index + 1, last_index);
            }else if(arr[i][1].indexOf("prev") > -1){
                first_index = arr[i][0].indexOf("<");
                last_index = arr[i][0].indexOf(">");

                last_request = arr[i][0].slice(first_index + 1, last_index);
            }

            
        }
        this.setState({nextLink: next_request});
        this.setState({prevLink: last_request});

    }
}

export default ProjectFinder;
