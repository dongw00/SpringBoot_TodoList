import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

import AlertMessage from './AlertMessage';

import '../assets/css/TodoList.css';

const URL = `api/todo`;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], isLoading: true, expireTodo: [] };
    this.remove = this.remove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getFormatDate = this.getFormatDate.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ todos: data, isLoading: false });

        // 마감기한 지난 todo 등록
        this.state.todos.forEach(todo => {
          if (new Date(todo.dueDate) < new Date() && todo.dueDate !== null) {
            this.setState({
              expireTodo: this.state.expireTodo.concat({ ...todo }),
            });
          }
        });
      })
      .catch(err => {
        console.error(`error! : ${err}`);
        alert('서버에서 불러오는데 실패했습니다.');
      });
  }

  /* Todo 삭제*/
  async remove(id) {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        let updatedTodo = [...this.state.todos].filter(i => i.id !== id);
        this.setState({ todos: updatedTodo });
      })
      .catch(err => {
        console.error(`error! : ${err}`);
        alert('삭제하는데 실패하였습니다.');
      });
  }

  /* 마감기한 날짜 처리 */
  getFormatDate(dateTime) {
    if (dateTime === null) return false;
    const date = new Date(dateTime);
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;

    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    let hours = date.getHours();
    hours = hours >= 10 ? hours : '0' + hours;

    let minutes = date.getMinutes();
    minutes = minutes >= 10 ? minutes : '0' + minutes;

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  }

  /* Done 처리 */
  async handleClick(event, id) {
    event.preventDefault();
    let item = this.state.todos.filter(todo => todo.id === id)[0];

    if (event.target.tagName === 'SPAN') {
      const eventTarget = event.target.parentElement;

      /* 버튼 변경 target */
      const parent = eventTarget.parentElement.parentElement;
      const targetButton =
        parent.lastElementChild.firstElementChild.firstElementChild;

      if (eventTarget.className !== 'done') {
        eventTarget.className = 'done';
        eventTarget.innerText = '⭕️';

        /* 색상 변경 */
        parent.className = 'text-success font-weight-bold mark';

        /* 버튼 변경 */
        if (!targetButton.classList.contains('d-none'))
          targetButton.classList.add('d-none');
      } else {
        eventTarget.className = 'doing';
        eventTarget.innerText = '❌';

        /* 색상 변경 */
        parent.className = '';

        /* 버튼 변경 */
        if (targetButton.classList.contains('d-none'))
          targetButton.classList.remove('d-none');
      }
    }
    if (event.target.className !== 'done' && event.target.tagName === 'A') {
      /* 버튼 변경 target */
      const parent = event.target.parentElement.parentElement;
      const targetButton =
        parent.lastElementChild.firstElementChild.firstElementChild;

      event.target.className = 'done';
      event.target.innerText = '⭕️';

      /* 색상 변경 */
      parent.className = 'text-success font-weight-bold mark';

      /* 버튼 변경 */
      if (!targetButton.classList.contains('d-none'))
        targetButton.classList.add('d-none');
    } else if (event.target.tagName === 'A') {
      /* 버튼 변경 target */
      const parent = event.target.parentElement.parentElement;
      const targetButton =
        parent.lastElementChild.firstElementChild.firstElementChild;

      event.target.className = 'doing';
      event.target.innerText = '❌';

      /* 색상 변경 */
      parent.className = '';

      /* 버튼 변경 */
      if (targetButton.classList.contains('d-none'))
        targetButton.classList.remove('d-none');
    }

    item.done = !item.done;

    await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).catch(err => {
      console.error(`수정하는데 실패하였습니다. ${err}`);
      alert('수정하는데 실패하였습니다.');
    });
  }

  render() {
    const { todos, isLoading, expireTodo } = this.state;

    /* loading page */
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const msg = expireTodo.map(exTodo => {
      return (
        <AlertMessage
          key={exTodo.id}
          message={`"${exTodo.title}"가 만료되었습니다.`}
        />
      );
    });

    /* 우선순위 정렬 */
    todos.sort((o1, o2) => {
      if (o1.sequence > o2.sequence) return 1;
      else if (o1.sequence < o2.sequence) return -1;
      else return 0;
    });

    /* Todo List 내용 처리 */
    const todoList = todos.map(todo => {
      return (
        <tr
          key={todo.id}
          className={todo.done ? 'text-success font-weight-bold mark' : ''}>
          <td>
            <a
              className={todo.done ? 'done' : 'doing'}
              href="#"
              onClick={e => this.handleClick(e, todo.id)}>
              <span role="img" aria-label="emoji">
                {todo.done ? '⭕️' : '❌'}
              </span>
            </a>
          </td>
          <td style={{ whiteSpace: 'nowrap' }}>{todo.title}</td>
          {/* 내용 */}
          <td>{todo.content}</td>
          {/* 마감기한 */}
          <td>{this.getFormatDate(todo.dueDate)}</td>
          {/* 우선순위 */}
          <td>{todo.sequence}</td>
          <td>
            <ButtonGroup>
              <Button
                className={todo.done ? 'd-none' : ''}
                size="sm"
                color="primary"
                tag={Link}
                to={'/todo/' + todo.id}>
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(todo.id)}>
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          {/* Add button*/}
          <div className="float-right">
            <Button color="success" tag={Link} to="/todo/new">
              Add todo{' '}
              <span role="img" aria-label="emoji">
                😎
              </span>
            </Button>
          </div>
          <h2 className="mt-3 mb-5">
            <span role="img" aria-label="emoji">
              🧘‍♂️
            </span>{' '}
            My Todo List
          </h2>
          {/* Table column 이름 */}
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="5%">done</th>
                <th width="20%">제목</th>
                <th width="20%">내용</th>
                <th>마감 기한</th>
                <th>우선순위</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{todoList}</tbody>
          </Table>
          {/* Alert Message */}
          <div className="asd">{msg}</div>
        </Container>
      </div>
    );
  }
}

export default TodoList;
