import React from 'react';
import './App.css';

import axios from 'axios';

// To add an object
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Objet a ajouter</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Objet à ajouter
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button className="waves-effect waves-light btn">
            Ajouter
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
    };
    this.setState(state => ({
      item: newItem,
      text: ''
    }));

    axios.post('http://appnode:3002/shopping-list', newItem)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
}


// To show the objects
class Show extends React.Component {
  state = {
    objets : []
  }

  componentDidMount() {
    axios.get('http://appnode:3002/shopping-list').then(res => {
        const obj = res.data;
        this.setState({objets : obj});
      })
  }

  render() {
    return (
      <div>
        <h3>Les objets</h3>
          <button onClick={()=>this.componentDidMount()} className="waves-effect waves-light btn">
            Acualiser
          </button>
          <table>
            <tbody>
              {this.state.objets.map(item => (
                <tr key={item.id}><td>{item.text}</td><td>{item.id}</td></tr>
              ))}
            </tbody>
          </table>

      </div>
    );
  }
}


// Modify
class Modify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '', text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Objet a modifier</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="mod">
            ID de l'objet
          </label>
          <input
            id="mod"
            onChange={this.handleChange}
            value={this.state.id}
          />
          <label htmlFor="new">
            Nouveau nom de l'objet
          </label>
          <input
            id="new"
            onChange={this.handleChange1}
            value={this.state.text}
          />
          <button className="waves-effect waves-light btn">
            Modifier
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleChange1(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
    };
    const id = {
      text: this.state.id,
    };
    this.setState(state => ({
      id: '',
      text: ''
    }));

    axios.put('http://appnode:3002/shopping-list/'+id.text, newItem)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
}


// Delete
class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Objet a supprimer</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="mod">
            ID de l'objet
          </label>
          <input
            id="mod"
            onChange={this.handleChange}
            value={this.state.id}
          />
          <button className="waves-effect waves-light btn">
            Supprimer
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.id.length) {
      return;
    }
    const id = {
      text: this.state.id,
    };
    this.setState(state => ({
      id: ''
    }));

    axios.delete('http://appnode:3002/shopping-list/'+id.text)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
}


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col s12">
           <ul className="tabs">
              <li className="tab col s2"><a className="active" href="#test1">Ajouter objet</a></li>
              <li className="tab col s2"><a href="#test2">Voir les objets</a></li>
              <li className="tab col s2 "><a href="#test3">Voir un objet</a></li>
              <li className="tab col s2"><a href="#test4">Modifier un objet</a></li>
              <li className="tab col s2"><a href="#test5">Supprimer un objet</a></li>
            </ul>
          </div>
          <div id="test1" className="col s12"><Add/></div>
          <div id="test2" className="col s12"><Show/></div>
          <div id="test3" className="col s12">Later</div>
          <div id="test4" className="col s12"><Modify/></div>
          <div id="test5" className="col s12"><Delete/></div>
        </div>
      </div>
    </div>
  );
}

export default App;
