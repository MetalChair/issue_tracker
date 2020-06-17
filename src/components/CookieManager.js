import React, { Component } from 'react'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import ProjectList from './ProjectList.js'; 
import store from 'store'
import UserList from './UserList.js';
import IssueList from './IssueList.js';


/*This class contains basic functions for dealing with session store
to keep informtion in localstorage. The main issue is that this needs to be
passed down the hirearchy. This could be solved by something like redux
but I don't want to bloat this project */
export default class CookieManager extends Component {
  
  //Handles an isntance of the cookie being updated
  onCookieUpdate(){
    
    //TODO implement cookie changes
    this.setState({userData: store.get('user_data')})

  }
  
  render() {
    return (
      <Container fluid = "true" className = "main-app">
      <Row>
        <Col lg = {4}>
          <ProjectList 
          userData = {this.state.userData} 
          cookieHandler = {this} 
          onCookieChange = {this.onCookieUpdate}
          type = {"project"}
          >
          </ProjectList>
          <UserList
          userData = {this.state.userData} 
          cookieHandler = {this} 
          onCookieChange = {this.onCookieUpdate}
          type = {"user"}
          >
          </UserList>
        </Col>
        <Col lg = {8}>
          <IssueList
            userData = {this.state.userData}
            cookieHandler = {this}
          ></IssueList>
        </Col>
      </Row>
      </Container> 
      )
    }
    
    constructor(props){
      super(props);
      //get the cookie
      var userData = store.get('user_data');
      if(userData == null){
        userData = {};
      }
      this.state = {userData: userData};
      this.onCookieUpdate = this.onCookieUpdate.bind(this);
    }
    
    
    removeFromCookie(data, type = 'project'){
      var cookie = store.get('user_data')

      if(type === 'project'){
        var trimmed_obj = this.trimRepoData(data)
        
        var contains_item = this.containsItem(trimmed_obj)
        if(contains_item){
          var index = this.getIndex(trimmed_obj)
          cookie.subs.splice(index, 1);
        }
      }else if(type === 'user'){
        var contains_item = this.containsItem(data, 'user');
        if(contains_item){
          var index = this.getIndex(data)
          cookie.user_subs.splice(index, 1);
        }
      }
      
      store.set("user_data", cookie);
      this.onCookieUpdate();
      
    }
    
    addToCookie(data, type = 'project'){
      var cookie = store.get('user_data')
      
      if(!cookie){
        cookie = {};
      }
      
      if(type === 'project'){
        
        var trimmedObject = this.trimRepoData(data);
        
        if(cookie.subs){
          cookie.subs.push(trimmedObject);
        }else{
          cookie.subs = [trimmedObject];
        }
        store.set("user_data", cookie);
      }else if(type === 'user'){
        if(cookie.user_subs){
          cookie.user_subs.push(data);
        }else{
          cookie.user_subs = [data]
        }
      }
      
      store.set("user_data", cookie);
      //Fire the cookie update handler
      this.onCookieUpdate();
    }
    
    getIndex(item, type = 'project'){
      if(type === 'project'){
        for(var i = 0; i < this.state.userData.subs.length; i++){
          var element = this.state.userData.subs[i]
          if(
            element.name === item.name                &&
            element.html_url === item.html_url        &&
            element.description === item.description  &&
            element.url === item.url
            ){
              return i;
            }
          }
        }else if (type === 'user'){
          for(var i = 0; i < this.state.userData.user_subs.length; i++){
            var element = this.state.userData.user_subs[i]
            if(JSON.stringify(element) === JSON.stringify(item)){
              return i;
            }
          }
        }
      }
      
      /*Check if the current subs list contains
      the given entry */
      containsItem(item, type = 'project'){
        if(type === 'project'){
          if(this.state.userData.subs == null)
          return false;
          
          for(var i = 0; i < this.state.userData.subs.length; i++){
            var element = this.state.userData.subs[i]
            if(
              element.name === item.name                &&
              element.html_url === item.html_url        &&
              element.description === item.description  &&
              element.url === item.url
              ){
                return true;
              }
            }
            return false;
        }else if (type === 'user'){
            ///We use a fast and limited method of comparing JSON objects here
            //quite frankly, it should work fine. I'm kind of surprised there's no
            //spec for object comparison yet
            if(this.state.userData.user_subs == null){
              return false;
            }
            
            for(var i = 0; i < this.state.userData.user_subs.length; i++){
              var element = this.state.userData.user_subs[i]
              if(JSON.stringify(element) === JSON.stringify(item)){
                return true;
              }
            }
            return false;
          }
        }
        
        /*The initial response from the github repo
        has about 10mb of data. Because of this, we 
        take the data and trim it down. */
        trimRepoData(item){
          //Save the data that we need
          var newItem = {};
          newItem.name = item.name;
          newItem.html_url = item.html_url
          newItem.description = item.description
          newItem.url = item.url;
          newItem.issues_url = item.issues_url.replace("{/number}","")
          if(item.organization)
          newItem.org_avatar = item.organization.avatar_url;
          if(item.owner)
          newItem.owner_avatar = item.owner.avatar_url;
          newItem.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
          
          return newItem;
        }
        
        
      }