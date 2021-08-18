import './App.css'
import React, { Component } from 'react'
import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box'
const fetch = require('node-fetch')

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monsters: [],
      searchField: '',
			title: 'Monsters Rolodex'
    }
    
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value, title: e.target.value })
  }

  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(users => this.setState({ monsters: users }))
  }
 
  render () {
    const { monsters, searchField, title } = this.state
    const filteredMonsters = monsters.filter(monster =>
     monster.name.toLowerCase().includes(searchField.toLowerCase()) 
    )
    return (
      <div className='App'>
				<h1>{title}</h1>
        <SearchBox placeholder='Search Monsters' handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App
