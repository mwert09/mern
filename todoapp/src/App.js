import React from "react";
import "./App.css";

import Todo from "./components/todo/todo.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callApi() {
    // We have to change this when we deploy our application
    fetch("http://localhost:9000/")
      .then(res => res.json())
      .then(todo => this.setState({ todos: todo }))
      .catch(err => err);
    console.log(this.state);
  }

  async componentDidMount() {
    await this.callApi();
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit(e) {
    e.preventDefault();

    const todo = {
      todo: this.state.todo,
      createTime: Date.now()
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'content-type': 'application/json',
      },
    };

    fetch('http://localhost:9000/', options)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err));

    this.callApi();
    this.setState({todo: ""});
    document.getElementById("yazi").value = "";

  }

  render() {
    const Todos = this.state.todos.map(todo => (
      <Todo todo={todo.todo} createTime={todo.createTime} />
    ));

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>Todo App</h1>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                id="yazi"
                type="text"
                name="todo"
                onChange={this.handleChange}
                required
              />
              <input type="submit"/>
            </form>
          </div>
          <div>{Todos}</div>
        </header>
      </div>
    );
  }
}

export default App;
