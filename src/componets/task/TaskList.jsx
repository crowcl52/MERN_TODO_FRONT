import React, { useContext, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import DoneIcon from '@material-ui/icons/Done';
import { Grid, Card, CardHeader, Chip, IconButton, LinearProgress, Tooltip } from '@material-ui/core';
import taskContext from '../../context/task/taskContext';
import projectContext from '../../context/projects/projectContext';

const TaskList = ({ task }) => {

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { showModalTaskFn } = projectsContext;

    // obtener tasksContext
    const tasksContext = useContext(taskContext);
    const { tasks, setInprogressTaskFn, editTaskFn, editTaskModalFn } = tasksContext;

    // styles
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            borderLeft: '5px solid gray'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '70%',
            cursor: 'pointer'
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cover: {
            width: '100%'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }));

    const classes = useStyles();

    if (tasks.length === 0) return (<h3 className="task-muted-txt"> This project has no active tasks create one  </h3>)

    const completeTask = task => {
        console.log(task)
        editTaskFn({ ...task, status: true })
    }

    const resetTask = task => {
        editTaskFn({ ...task, remain: task.duration })
    }

    const editTask = task => {
        console.log(task)
        editTaskModalFn(task);
        showModalTaskFn(true)
    }

    return (
        <Fragment>
            {tasks.map(task => (
                <Grid key={task._id} item xs={12} >
                    <Card className={classes.root} >
                        <CardHeader onClick={() => editTask(task)} className={classes.details}
                            title={task.name}
                            subheader={task.description} />
                        <div className={classes.content}>
                            <p> Time: {task.remain}min / {task.duration}min </p>

                            <LinearProgress className={classes.cover} variant="determinate" value={(100 * task.remain) / task.duration} />
                            <div>
                                <Tooltip title="Reset task" aria-label="add">
                                    <IconButton onClick={() => resetTask(task)} aria-label="previous">
                                        <SkipPreviousIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Set current task" aria-label="add">
                                    <IconButton onClick={() => setInprogressTaskFn(task)} aria-label="play/pause">
                                        <PlayArrowIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Complete task" aria-label="add">
                                    <IconButton onClick={() => completeTask(task)} aria-label="next">
                                        <DoneIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Complete task" aria-label="add">
                                    <IconButton onClick={() => completeTask(task)} aria-label="next">
                                        <DoneIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.content}>
                            <Chip className="incomplete" label="incomplete" />
                        </div>
                    </Card>
                </Grid>
            ))}
        </Fragment>

    );
}

export default TaskList;