import React, { Component } from 'react'
import axios from 'axios'; 

export default class randomNFT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            age: "",
        }
    }
   generateRandom(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return  num;
    }
    

    generateNFT =  async () => {
        


        // fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));
       var num=  this.generateRandom(1,50)
       var location = this.generateRandom(1,num)-1;
       console.log(location)
               const res = await axios.get('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit='+ num)
                this.setState({
                    img: res.data.assets[location].image_url
                     
                })
            }
    render() {
        return (
            <div>
                <h2>Random NFT Generator</h2>
                <button onClick={this.generateNFT}>Generate NFT</button>
                <div className="nftContainer">
                   <img src={this.state.img} alt="This NFT Doesnt have a registered URL" />
                </div>
            </div>
        )
    }
}
