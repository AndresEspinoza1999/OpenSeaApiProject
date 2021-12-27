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

  generateNFT = async () => {
    // fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    var num = this.generateRandom(1, 50);
    var location = this.generateRandom(1, num) - 1;
    var decription = ""
    var collection = ""
    console.log(location);
    const res = await axios.get(
      "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=" +num
    );
    console.log(res.data.assets[location]);
    // var creator= res.data.assets[location].creator;

    if (
      res.data.assets[location].creator === null  ) {
      this.generateNFT();
    } else if (res.data.assets[location].image_url === null) {
      this.generateNFT();
    } 
     else if (res.data.assets[location].description === null ||res.data.assets[location].description === "" ){
         decription = "This NFT does not have a Decription"
     }
     else if (res.data.assets[location].collection.description === null ||res.data.assets[location].collection.description === "" ){
        collection = "This NFT does not have a Decription"
    }
    else {
        decription = res.data.assets[location].description;
        collection = res.data.assets[location].collection.description
      this.setState({
        img: res.data.assets[location].image_url,
        name: res.data.assets[location].name,
        creator: res.data.assets[location].creator.user.username,
        link: res.data.assets[location].permalink,
        decription: decription,
        collection: res.data.assets[location].collection.description
      });
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
