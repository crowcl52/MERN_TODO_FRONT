import React, { useContext, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { Grid, Chip, Tooltip } from '@material-ui/core';
import TaskTimer from './TaskTimer';
import taskContext from '../../context/task/taskContext';

const CurrentTask = ({ task }) => {

    // traer context
    const tasksContext = useContext(taskContext);
    const { playIntervalFn, editTaskFn, playInterval } = tasksContext;

    let { duration, remain } = task;

    // estilos
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            borderLeft: '5px solid #03a9f4'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            width: '70%'
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
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

    const completeTask = () => {
        editTaskFn({ ...task, status: true })
    }

    const resetTask = () => {
        editTaskFn({ ...task, remain: task.duration })
    }

    return (
        <Grid item xs={12} >
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {task.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {task.description}
                        </Typography>
                        <Chip className="progress" label="in-progress" />
                    </CardContent>
                </div>
                <div className={classes.details}>

                    <TaskTimer remain={remain} duration={duration} />

                    <div className={classes.controls}>
                        <Tooltip title="Reset task" aria-label="add">
                            <IconButton onClick={() => resetTask()} aria-label="previous">
                                <SkipPreviousIcon />
                            </IconButton>
                        </Tooltip>
                        {playInterval ?
                            <Tooltip title="Pause task" aria-label="add">
                                <IconButton onClick={() => playIntervalFn(false)} aria-label="play/pause">
                                    <PauseIcon className={classes.playIcon} />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Start task" aria-label="add">
                                <IconButton onClick={() => playIntervalFn(true)} aria-label="play/pause">
                                    <PlayArrowIcon className={classes.playIcon} />
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip title="Complete task" aria-label="add">
                            <IconButton onClick={() => completeTask()} aria-label="next">
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

            </Card>
        </Grid>
    );
}

export default CurrentTask;