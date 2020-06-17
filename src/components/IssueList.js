import React, { Component } from 'react'
import {Card, Container, Col, Row,Image} from 'react-bootstrap'
import IssueTile from './IssueTile'
import Loading from '../loading.gif';


export default class IssueList extends Component {
    render() {
        return (
            <Card>
                <Container className = "header-bar" fluid>
                    <Col>
                        <Row className = "header-row">
                            <div className = "align-middle">
                                <b>
                                    Issues from tracked projects and users:
                                </b>
                            </div>
                        </Row>
                    </Col>
                </Container>
                <Container>
                    <Col>
                    {this.state.queryRunning &&
                        <Row className = "w-100">
                            <Image src = {Loading}>
                            </Image>
                        </Row>
                    }
                    {this.state.issues && this.state.queryRunning !== true &&
                        this.state.issues.map((item,key) =>                    
                            <Row
                            key = {key}
                            >
                                <IssueTile
                                    data = {item}
                                    
                                >
                                </IssueTile>
                            </Row>
                        )
                    }
                    </Col>
                </Container>
            </Card>
        )
    }

    constructor(props){
        super(props);
        this.fetchAllIssues = this.fetchAllIssues.bind(this);
        this.state = {issues: []};

    }

    componentDidMount(){
        this.fetchAllIssues();
    }

    fetchAllIssues(){
        this.setState({queryRunning: true });
        this.props.userData.subs.forEach(element => {
            console.log(element);
            fetch(element.issues_url)
            .then(response =>{
                return response.json()
            })
            .then(data => {
                for(var i = 0; i < data.length; i++)
                    data[i].color = element.color
                console.log(data)
                return data;
            }).then(data =>{
                var temp = this.state.issues;
                this.setState({issues: temp.concat(data), queryRunning: false});
            })
        });


        console.log(this.state);
    }
}
