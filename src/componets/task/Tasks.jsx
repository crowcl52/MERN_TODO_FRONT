import React, { useState, useContext, useEffect } from 'react'
import { Fab, Container, Grid, ButtonGroup, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskList from './TaskList';
import CurrentTask from './CurrentTask';
import HeaderTask from '../layout/HeaderTask';
import TaskModal from './AddTaskModal';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Skeleton from '@material-ui/lab/Skeleton';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/task/taskContext';
import { useHistory } from 'react-router-dom';


const Tasks = () => {

    //check if exist current project
    const history = useHistory();

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { showModalTaskFn, currentProject } = projectsContext;

    // obtener current task y tareas sin terminar
    const tasksContext = useContext(taskContext);
    const { getTasksFn, currentTask, isLoadingTask,filterTasksFn } = tasksContext;


    useEffect(() => {
        if (currentProject) getTasksFn(currentProject._id)

    }, [])


    // validar si existe un proeycto seleccionado
    if (!currentProject) { history.push('/projects'); return null };


    const setFilter = type => {
        console.log(type)
        filterTasksFn(type)
    }

    return (
        <div className="full" >
            <HeaderTask />
            {isLoadingTask ?
                <div className="loading-task">
                    <Skeleton width={300} height={100} variant="rect" animation="wave" />
                    <Skeleton width={300} animation="wave" />
                    <Skeleton width={300} animation="wave" />
                    <Skeleton width={300} animation="wave" />
                    <Skeleton width={300} animation="wave" />
                </div>
                :
                <Container className="animate__animated animate__fadeIn mt" >

                    <Grid container spacing={3} className="mt" >
                        {currentTask ?
                            <CurrentTask task={currentTask} />
                            :
                            <h3 className="muted-txt"> Press <PlayArrowIcon /> in a task to start one  </h3>
                        }
                        <div className="filter-task-container">
                            <ButtonGroup color="primary">
                                <Button onClick={() => setFilter('all')} >all</Button>
                                <Button onClick={() => setFilter('short')} >short</Button>
                                <Button onClick={() => setFilter('medium')} >medium</Button>
                                <Button onClick={() => setFilter('long')} >long</Button>
                            </ButtonGroup>
                        </div>
                        <TaskList />
                    </Grid>
                </Container>
            }



            <Fab onClick={() => showModalTaskFn(true)} className="animate__animated animate__pulse animate__slow animate__infinite float-btn" color="secondary" aria-label="add">
                <AddIcon />
            </Fab>

            <TaskModal />

        </div>
    );
}

export default Tasks;