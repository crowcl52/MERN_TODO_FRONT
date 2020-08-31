import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import taskContext from '../../context/task/taskContext';

var timeInterval = null;

const TaskTimer = ({ remain, duration }) => {

    const tasksContext = useContext(taskContext);
    const { playInterval, playIntervalFn, currentTask, editTaskSilentFn, editTaskFn } = tasksContext;

    const [progress, setProgress] = useState({
        time: 100,
        remain: remain
    });


    useEffect(() => {
        setProgress({ ...progress, time: (100 * progress.remain) / duration });
        let newTask = { ...currentTask, remain: progress.remain };
        if (playInterval) {
            timeInterval = setInterval(() => {
                setProgress({ ...progress, remain: progress.remain-- });
                setProgress({ ...progress, time: (100 * progress.remain) / duration });
                newTask = { ...currentTask, remain: progress.remain };
                console.log(newTask)
                editTaskSilentFn(newTask);
                if (remain === 0) {
                    playIntervalFn(false);
                    clearInterval(timeInterval);
                    editTaskFn({ ...newTask, status: true })
                }
            }, (1000 * 60));

        } else {
            playIntervalFn(false);
            clearInterval(timeInterval);
            console.log(newTask)
            editTaskSilentFn(newTask);

        }

    }, [playInterval])

    return (
        <Box display="flex" alignItems="center"
            justifyContent="center">
            <CircularProgress variant="static" size={90} value={progress.time} />
            <Box
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">
                    <b className="time-big"> {` ${progress.remain}min`} </b> <br />
                    <small> {`${duration}min`} </small>
                </Typography>
            </Box>
        </Box>
    );
}

export default TaskTimer;