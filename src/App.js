import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Message from './Message'
import './App.css';

const myApiUrl = 'https://my-hindus.firebaseio.com/user'

class App extends Component {
  state = {
    editMode: false,
    name: '',
    surname: '',
    age: '',
    list: [],
    id: ''
  }

  clickHandler = () => {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        age: this.state.age
      })
    }
    fetch(`${myApiUrl}.json`, request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: '',
          surname: '',
          age: '',
        })
        this.loadData()
      })

  }
  updateHandler = () => {
    const request = {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        age: this.state.age
      })
    }
    fetch(`${myApiUrl}/${this.state.id}.json`, request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: '',
          surname: '',
          age: '',
          id: ''
        })
        this.loadData()
      })

  }

  handleChange = (event) => {
    const fieldName = event.target.name
    this.setState({
      [fieldName]: event.target.value
    });
  }

  componentWillMount() {
    this.loadData()
  }

  loadData = () => {
    fetch(`${myApiUrl}.json`)
      .then(response => response.json())
      .then(responseData => {
        const firebaseArray = Object.entries(responseData || {})
        const firebaseData = firebaseArray.map(item => {

          return {
            id: item[0],
            ...item[1]
          }
        })
        this.setState({
          list: firebaseData
        })
      })
  }
  removeHandler = (id) => {
    const request = {
      method: 'DELETE'
    }
    fetch(`${myApiUrl}/${id}.json`, request)
    this.loadData()
  }

  editHandler = (obj) => {
    this.setState({
      editMode: true,
      id: obj.id,
      name: obj.name,
      surname: obj.surname,
      age: obj.age
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
        <div>
          <Route path="/messages/:id" component={Message}/>
        <div>
        wybrany obiekt: {this.state.name}{this.state.surname}
        </div>
        Name:<input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
        Last name:<input type="text" name="surname" onChange={this.handleChange} value={this.state.surname} />
        Age:<input type="text" name='age' onChange={this.handleChange} value={this.state.age} />
        <button onClick={this.clickHandler}>Create</button>
        <button onClick={this.updateHandler}>update</button>
        <div>
          <ul>
            {this.state.list.map((item) => (
              <li key={item.id}>
              <Link to={`/messages/${item.id}`}>
                {item.name}
                {item.surname}
                {item.age}
              </Link>
                <button onClick={() => this.removeHandler(item.id)}>Remove</button>
                <button onClick={() => this.editHandler(item)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
      </Router>
    </div>
    );
  }
}

export default App

