import React, { Component } from "react";
import "./parkPage.css";
import { Link } from 'react-router-dom';

class ParkPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			images: [],
			parkName: null,
			description: null,
			addresses: [],
			directions: null
		}
	}
  	componentDidMount() {
  		let parkCode = this.props.match.params.parkCode
	    let newUrl = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&fields=addresses,images&api_key=JpeRLD88Kje4QzduiQe1faC6SKfFZkpm12YsXH75'
	    fetch(newUrl)
	      .then(res => res.json())
	      .then(res => {
	      	this.setState({ data: res.data })
	      	this.setState({ parkName: res.data[0].name })
	      	this.setState({ description: res.data[0].description })
	      	this.setState({ directions: res.data[0].directionsInfo })
			this.state.data[0].images.map(image => {
				this.setState({ images: [...this.state.images, image.url] })
			})
			this.setState({ addresses: res.data[0].addresses[0] })
	      })
	      .catch(err => {
	        console.error(err)
	      })
  	}
	render() {
		return(
			<div className='main'>
				<div className='headerImage' style={{backgroundImage: `url(${this.state.images[0]})`}}>
					<h1 className='parkName'>{this.state.parkName}</h1>
				</div>
				<div className='description'>
					<p>{this.state.description}</p>
				</div>
				<div className='details'>
					<h3 className='address'>Address</h3>
					<p className='address1'>{this.state.addresses.line1}</p> 
					<p className='address2'>{this.state.addresses.city}, {this.state.addresses.stateCode}, {this.state.addresses.postalCode}</p>
					<h3>Directions</h3>
					<p className='directionsPara'>{this.state.directions}</p>
					<div className='button'>
						<h4>Read More</h4>
					</div>
					<h3 className='images'>Images</h3>
					<div className='imageContainer'>
						<div className='parkImage' style={{backgroundImage: `url(${this.state.images[0]})`}}></div>
						<div className='parkImage' style={{backgroundImage: `url(${this.state.images[1]})`}}></div>
						<div className='parkImage' style={{backgroundImage: `url(${this.state.images[2]})`}}></div>
						<div className='parkImage' style={{backgroundImage: `url(${this.state.images[3]})`}}></div>
						<div className='parkImage' style={{backgroundImage: `url(${this.state.images[4]})`}}></div>
					</div>
					<Link className='returnHome' to='/'>
						<h3>Back to Park List</h3>
					</Link>
				</div>
			</div>
		)
	}
}

export default ParkPage
