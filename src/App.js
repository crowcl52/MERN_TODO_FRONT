import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import NotFound from './componets/layout/NotFound';
import Projects from './componets/project/Projects';
import Tasks from './componets/task/Tasks';
import Results from './componets/layout/Results';
import Toastmsg from './componets/layout/Toastmsg';

import ProjectState from './context/projects/projectState';
import TaskState from './context/task/taskState';
import AuthState from './context/auth/authState';
import CompletedTasks from './componets/task/CompletedTasks';


function App() {
  return (
    <AuthState>
      <ProjectState>
        <TaskState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/charts" component={Results} />
              <Route exact path="/task" component={Tasks} />
              <Route exact path="/history" component={CompletedTasks} />
              <Route path="*" >
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </TaskState>
        <Toastmsg />
      </ProjectState>
    </AuthState>


  );
}

export default App;
