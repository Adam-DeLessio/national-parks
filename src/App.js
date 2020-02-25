import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Park from './parkSquare';
import ParkPage from './parkPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    }
    this.setName = this.setName.bind(this)
  }

  setName(name) {
    this.setState({ name: name });
  }
  render() {
    return (
        <div className='container'>
          <nav>
            <Link className='home' to='/'>
              <h2>National Parks List</h2>
            </Link>
          </nav>

          <main className='main'>
            <Route path='/' exact component={Park} />

            <Route 
              path='/parkPage/:parkCode'
              render={props => (
                <ParkPage 
                  {...props} 
                />
              )} 
            />
          </main>

          <footer>
            <div className='nps'>
              <div className='footerText'>
                <h5>National Park Service</h5>
                <h3 className='DofI'>U.S. Department of the Interior</h3>
              </div>
              <img className='logo' src='https://yt3.ggpht.com/a/AGF-l7_b-MhOKWFDv2fAWHkGN6j19DFIpV1OCEnkcA=s900-c-k-c0xffffffff-no-rj-mo' alt='' />
            </div>
          </footer>

        </div>
    );
  }
}

export default App;
