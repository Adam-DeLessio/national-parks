import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './parkSquare.css';
import Async from 'react-async'

const url = 'https://developer.nps.gov/api/v1/parks?fields=images&api_key=JpeRLD88Kje4QzduiQe1faC6SKfFZkpm12YsXH75'

class Park extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			parkCodes: [],
			images: []
		}
	}
	componentDidMount() {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				this.setState({ data: res.data })
				this.state.data.map(code => {
					this.setState({ parkCodes: [...this.state.parkCodes, code.parkCode] })
					this.setState({ images: [...this.state.images, code.images[0].url] })
				})
			})
	}
	render() {
		let parks = this.state.data.map(item => {
			return(
				<div key={item.parkCode}>
					<Link className='parkLink' to={'/parkPage/' + item.parkCode}>
						<div className='park' style={{backgroundImage: `url(${item.images[0].url})`}}>
							<h4 className='name'>{item.name}</h4>
						</div>
					</Link>
				</div>
			)
		})
		return <div className='parksList'>{parks}</div>
	}
}

export default Park