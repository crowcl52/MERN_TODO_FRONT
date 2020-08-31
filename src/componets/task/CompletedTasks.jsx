import React, { useContext, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core';
import HeaderTask from '../layout/HeaderTask';
import Skeleton from '@material-ui/lab/Skeleton';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/task/taskContext';
import { useHistory } from 'react-router-dom';
import TaskCompleted from './TaskCompleted';

const CompletedTasks = () => {

    //check if exist current project
    const history = useHistory();

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    // obtener current task y tareas sin terminar
    const tasksContext = useContext(taskContext);
    const { getTasksFn, currentTask, isLoadingTask } = tasksContext;

    useEffect(() => {
        if (currentProject) getTasksFn(currentProject._id)
    }, [])

    // validar si existe un proeycto seleccionado
    if (!currentProject) { history.push('/projects'); return null };


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
                        <TaskCompleted />
                    </Grid>
                </Container>
            }

        </div>
    );
}

export default CompletedTasks;