import React, {Component} from 'react';
import TodoItem from './TodoItem.js';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius         : '10px'
  }
};

class ItemManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      displayModal: false,
      newDescription: ''
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.fetchTodos();
  }

  fetchTodos() {
    axios({
      url: 'http://localhost:8080/todos'
    }).then(response => {
      if(response.data) {
        this.setState({
          todos: response.data
        });
      }
    });
  }

  removeItem(item) {
    axios({
      method: 'delete',
      url: `http://localhost:8080/todos/${item._id}`
    }).then(response => {
      this.fetchTodos();
    });
  }

  launchCreateModal(event) {
    this.setState({
      displayModal: true
    });
  }

  closeModal(event) {
    this.setState({
      displayModal: false
    });
  }

  createTodo(event) {
    axios({
      method: 'post',
      url: 'http://localhost:8080/todos',
      data: {
        description: this.state.newDescription,
        completed: false
      }
    }).then((response) => {
      this.fetchTodos();
      this.setState({
        displayModal: false
      });
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      newDescription: event.target.value
    });
  }

  render() {
    var todos = this.state.todos.map((todo, index) => {
      return <TodoItem item={todo} key={index} removeItem={() => this.removeItem(todo)}></TodoItem>
    });

    if(todos.length == 0) {
      todos = <tr><td>No Items</td></tr>
    }

    var displayType = "none";

    if(this.state.displayModal) {
      displayType = "block";
    }

    var body = (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">Todo Items</div>
        <table className="table">
          <tbody>
            <tr><th>Description</th><th>Completed</th><th>Delete</th></tr>
            {todos}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={this.state.displayModal}
        style={customStyles}
        onRequestClose={(event) => this.closeModal(event)}
        contentLabel="Example Modal">
        <div className="create-todo">
          <label className="description-label" for="description">Description:</label>
          <input type="text" id="description" value={this.state.newDescription} onChange={this.handleDescriptionChange}/>
          <button onClick={(event) => this.createTodo(event)}>Create Todo</button>
        </div>
      </Modal>
      <button className="btn btn-default" onClick={(event) => this.launchCreateModal(event)}>Create Todo</button>
    </div>);

    return body;
  }
}

export default ItemManager;
