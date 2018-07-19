import React, { Component } from "react";
import "./css/main.css";
import "./css/responsiveness.css";

import TaskLineItem from "./TaskLineItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ateCookies: false,
      cookieStyle: "main-bg cookies container-flex",
      taskCounter: 5,
      deleteCounter: 0,
      completedCounter: 1,
      cookieCounter: 0,
      tasksList: [
        {
          id: 0,
          task: "Eat Cookies 😎🍪",
          isDone: false
        },
        {
          id: 1,
          task: "Run 🏃‍♀",
          isDone: false
        },
        {
          id: 2,
          task: "Make a Millie💸",
          isDone: false
        },
        {
          id: 3,
          task: "Make a Billie 🤑",
          isDone: false
        },
        {
          id: 3,
          task: "To-Do App, better Done than Pefect",
          isDone: true
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };

    this.eachTaskItem = this.eachTaskItem.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.eatCookies = this.eatCookies.bind(this);
    this.completedTasksCounter = this.completedTasksCounter.bind(this);
    this.taskCounter = this.taskCounter.bind(this);
  }
  componentDidUpdate() {}

  update(updatedTask, i) {
    console.log(updatedTask, i);
    let tasksArray = this.state.tasksList;
    tasksArray[i].task = updatedTask;
    this.setState({ tasksList: tasksArray });
    this.taskCounter();
  }

  // delete(i) {
  //   console.log("delete() called");
  //   console.log("state.tasks.tasksList before splice", this.state.tasksList);

  //   this.state.tasksList.splice(i, 1);
  //   this.state.tasksList.push({});
  //   this.setState({ tasksList: this.state.tasksList });
  //   console.log(
  //     "state.tasks.tasksList AFTER splice & setState",
  //     this.state.tasksList
  //   );
  // }
  delete(i) {
    let currentTaskList = this.state.tasksList;
    currentTaskList[i] = {};

    this.setState({
      deleteCounter: this.state.deleteCounter + 1,
      tasksList: currentTaskList
    });
    this.taskCounter();
  }

  eatCookies(ateCookies) {
    if (!this.state.ateCookies && ateCookies) {
      this.setState({
        ateCookies: true,
        cookieStyle: "main-bg cookies container-flex"
      });
    } else {
      this.setState({
        cookieCounter: this.state.cookieCounter + 1,
        ateCookies: false,
        cookieStyle: "main-bg no-cookies container-flex"
      });
    }
  }

  completedTasksCounter(isChecked) {
    if (isChecked) {
      this.setState({ completedCounter: this.state.completedCounter + 1 });
    } else {
      this.setState({ completedCounter: this.state.completedCounter - 1 });
    }
  }
  taskCounter() {
    let totalTaskCounter = 0;

    this.state.tasksList.forEach(function(taskObject) {
      if (taskObject.task) {
        totalTaskCounter += 1;
      }
      totalTaskCounter -= 0;
    });

    this.setState({ taskCounter: totalTaskCounter });
  }

  eachTaskItem(taskObject, i) {
    let checkMarkStyle;
    let textDoneStyle;
    if (taskObject.isDone) {
      checkMarkStyle = "checkmark complete";
      textDoneStyle = "item-text done";
    } else {
      checkMarkStyle = "checkmark";
      textDoneStyle = "item-text";
    }

    return (
      <TaskLineItem
        index={i}
        key={i}
        onUpdate={this.update}
        onDelete={this.delete}
        taskValue={taskObject.task}
        eatCookies={this.eatCookies}
        isDone={taskObject.isDone}
        addCompletedCounter={this.completedTasksCounter}
        checkMarkStyle={checkMarkStyle}
        textDoneStyle={textDoneStyle}
        totalTaskCounter={this.taskCounter}
      />
    );
  }
  render() {
    return (
      <div className={this.state.cookieStyle}>
        <span id="preload-cookies" />
        <span id="preload-cookies-mobile" />

        <div className="sticky-note">
          <div className="row">
            <div className="col-8">
              <p>Current Tasks:</p>
              <p>Completed:</p>
              <p>Deleted:</p>
              <p>Cookies:</p>
            </div>
            <div className="col">
              <p>{this.state.taskCounter}</p>
              <p>{this.state.completedCounter}</p>
              <p>{this.state.deleteCounter}</p>
              <p>{this.state.cookieCounter}</p>
            </div>
          </div>
        </div>
        <div className="paper-container row">
          <div className="paper-left-section col-1" />
          <div className="paper-right-section col">
            <div className="paper-top-section">
              <div className="paper-title">
                <h1>A React To-Do-List</h1>
                <h2>By @AlanThinks</h2>
              </div>
            </div>
            <div className="list-of-to-do">
              {this.state.tasksList.map(this.eachTaskItem)}
            </div>
          </div>
          <div className="paper-footer" />
        </div>
      </div>
    );
  }
}

export default App;
