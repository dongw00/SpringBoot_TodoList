import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import PropTypes from 'prop-types';

const URL = '/api';

class TodoEdit extends Component {
  defaultTodo = {
    title: '',
    content: '',
    sequence: 3,
    dueDate: '',
    done: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.defaultTodo,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const todo = await (await fetch(
        `${URL}/todo/${this.props.match.params.id}`
      )).json();
      this.setState({ item: todo });
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  dateChange(date) {
    let item = { ...this.state.item };
    item.dueDate = date;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    console.dir(item);
    let fetchURL = '';
    item.id
      ? (fetchURL = `${URL}/todo/${item.id}`)
      : (fetchURL = `${URL}/todo`);
    await fetch(fetchURL, {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/');
  }

  render() {
    const { item } = this.state;
    const title = (
      <h2 className="mt-2 mb-4">{item.id ? '🛠Edit todo' : '📝Add todo'}</h2>
    );

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">
                <span role="img" aria-label="emoji">
                  📌
                </span>
                제목
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="제목을 입력해주세요."
                value={item.title || ''}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input
                type="text"
                name="content"
                id="content"
                placeholder="내용을 입력해주세요."
                value={item.content || ''}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sequence">우선순위</Label>
              <Input
                type="select"
                name="sequence"
                id="sequence"
                placeholder="우선순위"
                value={item.sequence || ''}
                onChange={this.handleChange}>
                <option value="1">최우선</option>
                <option value="2">우선</option>
                <option value="3">보통</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="date">
                <span role="img" aria-label="emoji">
                  ⏰
                </span>
                todo 기간
              </Label>
              <DatePicker
                className="date"
                name="date"
                placeholderText="기간을 선택해주세요"
                onChange={this.dateChange}
                selected={
                  this.state.item.dueDate
                    ? new Date(this.state.item.dueDate)
                    : ''
                }
                minDate={new Date()}
                excludeOutOfBoundsTimes
                showTimeSelect
                timeIntervals={30}
                timeFormat="HH:mm"
                dateFormat="yyyy년 M월 d일 h:mm aa"
                timeCaption="시간"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{' '}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

TodoEdit.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  sequence: PropTypes.number,
  dueDate: PropTypes.string,
  done: PropTypes.bool,
};

export default withRouter(TodoEdit);
