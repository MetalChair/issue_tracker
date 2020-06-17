import React, { Component } from 'react'
import {Card, Row, Col, Image, Button} from 'react-bootstrap'
import {GoPlus} from 'react-icons/go';
import NoImages from '../noimages.png'
import store from 'store';

export default class GitHubProject extends Component {
    render() {
        var pic_src = NoImages;
        
        if(this.props.data.organization != null){
            pic_src = this.props.data.organization.avatar_url
        }else if (this.props.data.owner != null){
            pic_src = this.props.data.owner.avatar_url
        }else if (this.props.data.org_avatar){
            pic_src = this.props.data.org_avatar
        }else if (this.props.data.owner_avatar){
            pic_src = this.props.data.owner_avatar

        }


        //If we have included a project already, we need to change the button
        var button = <Button onClick = {() => this.props.cookieHandler.addToCookie(this.props.data)}><GoPlus></GoPlus></Button>
        var is_contained = this.props.cookieHandler.containsItem(this.props.cookieHandler.trimRepoData(this.props.data))
        if(is_contained){
            button = <Button variant = 'warning' onClick = {() => this.props.cookieHandler.removeFromCookie(this.props.data)}><GoPlus></GoPlus></Button>
        }
        return (
            <Card className = "w-100 github-list">
                <Row >
                    <Col className = "vert-center" lg = {2}>
                        <Image src = {pic_src} className = "icon"></Image>
                    </Col>
                    <Col>
                        <b>{this.props.data.name}</b>
                        <br></br>
                        {this.props.showDesc && 
                            this.props.data.description
                        }
                    </Col>
                    <Col lg = {2}>
                        {button}
                    </Col>
                </Row>
            </Card>
        )
    }

    constructor(props){
        super(props);
    }

}
