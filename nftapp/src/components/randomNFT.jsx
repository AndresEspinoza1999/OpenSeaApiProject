import React, { Component } from 'react'

export default class randomNFT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: "",
            age: "",
        }
    }


    generateNFT = () => {
        const options = { method: 'GET' };


        fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div>
                <h2>Random NFT Generator</h2>
                <div class="nftContainer">
                    <button onClick={this.generateNFT}>Generate NFT</button>
                </div>
            </div>
        )
    }
}
