import React, {Component} from 'react';
import axios from 'axios';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };

    console.log('state is ', this.state);
  }

  handleChange(event) {
    this.setState({
      item: Object.assign(this.state.item, {
        completed: event.target.checked
      })
    });

    axios({
      method: 'put',
      url: 'http://localhost:8080/todos/' + this.state.item._id,
      data: this.state.item
    });
  }

  render() {
    return <tr>
      <td>{this.state.item.description}</td>
      <td><input type="checkbox" checked={this.state.item.completed} onChange={(event) => this.handleChange(event)}/></td>
      <td>
      <button className="btn btn-default" onClick={(event) => this.props.removeItem()}>
        <span className="glyphicon glyphicon-trash"></span>&nbsp;
         Delete
      </button>
      </td>
    </tr>
  }
}

export default TodoItem;
