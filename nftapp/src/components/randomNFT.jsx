import React, { Component } from "react";
import axios from "axios";
import "./randomNFT.css";

export default class randomNFT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      img: "",
      ex: "",
      creator: "",
      link: "",
      decription: "",
      collection: "",
    };
  }
  generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
  componentDidMount() {
    window.addEventListener('load', this.generateNFT());
 }

  generateNFT = async () => {
    // fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    var num = this.generateRandom(1, 50);
    var location = this.generateRandom(1, num) - 1;
    var decription = ""
    var collection = ""
    try{
      const res = await axios.get(
        "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=" +num
      );

      if(!res.data.assets[location].collection.description || !res.data.assets[location].description ){
        console.log("Description is null")
        decription = "This NFT does not have a Decription";
        console.log("Collection is null")
        collection = "This NFT does not have a Collection Description "
        this.setState({ 
          img: res.data.assets[location].image_url,
          name: res.data.assets[location].name,
          creator: res.data.assets[location].creator.user.username,
          link: res.data.assets[location].permalink,
          decription: decription,
          collection: collection
        }, () => {
          console.log(this.state.collection);
        }); 
      }
      // var creator= res.data.assets[location].creator;
       else  if (!res.data.assets[location].description){
          console.log("Description is null")
           decription = "This NFT does not have a Decription";
           this.setState({ 
            img: res.data.assets[location].image_url,
            name: res.data.assets[location].name,
            creator: res.data.assets[location].creator.user.username,
            link: res.data.assets[location].permalink,
            decription: decription,
            collection: res.data.assets[location].collection.description
          }, () => {
            console.log(this.state.decription);
          }); 

       }
       else  if (!res.data.assets[location].collection.description ){
        console.log("Collection is null")
        collection = "This NFT does not have a Collection Description "
        this.setState({ 
          img: res.data.assets[location].image_url,
          name: res.data.assets[location].name,
          creator: res.data.assets[location].creator.user.username,
          link: res.data.assets[location].permalink,
          decription: decription,
          collection: collection
        }, () => {
          console.log(this.state.collection);
        }); 
      }
        else{
          decription = res.data.assets[location].description;
          collection = res.data.assets[location].collection.description
          this.setState({ 
            img: res.data.assets[location].image_url,
            name: res.data.assets[location].name,
            creator: res.data.assets[location].creator.user.username,
            link: res.data.assets[location].permalink,
            decription: decription,
            collection: res.data.assets[location].collection.description
          }, () => {
          }); 
        }
       
      }
    
    catch (e){
      console.log("error",e)
    }
  
  };
  render() {
    return (
      <div>
        <h2>Random NFT Generator</h2>

        <div className="flexcontainer">
          <div className="leftFlex">
            <img
              className="nftImage"
              src={this.state.img}
              alt="This NFT Doesnt have a registered URL"
            />
            <div className="decription">
              <h4 className="description">Description</h4>
              <p className="decriptionText">{this.state.decription}</p>
            </div>
            <div className="collection">
                <h4>About Collection</h4>
              <p className="collectionText">{this.state.collection}</p>
            </div>
          </div>
          <div className="rightside">
            <h3 className="title">
              {this.state.name} by {this.state.creator}
            </h3>
            <div className="linkcontainer">
              
              <a href={this.state.link}>Link to OpenSea</a>
            </div>
            <button className="generateButton" onClick={this.generateNFT}>
              Generate NFT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
