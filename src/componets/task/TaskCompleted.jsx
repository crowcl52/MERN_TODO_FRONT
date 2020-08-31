import React, { useContext, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, Chip, LinearProgress } from '@material-ui/core';
import taskContext from '../../context/task/taskContext';
import moment from 'moment'

const TaskCompleted = () => {

    // obtener tasksContext
    const tasksContext = useContext(taskContext);
    const { completeTask } = tasksContext;

    console.log(completeTask)

    // styles
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            borderLeft: '5px solid gray',
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
    const theme = useTheme();

    if (completeTask.length === 0) return (<h3 className="task-muted-txt"> This project has no completed tasks  </h3>)

    return (
        <Fragment>
            {completeTask.map(task => (
                <Grid key={task._id} item xs={12} >
                    <Card className={classes.root} >
                        <CardHeader className={classes.details}
                            title={task.name}
                            subheader={task.description} />
                        <div className={classes.content}>
                            <p> Time: {task.remain}min / {task.duration}min </p>
                            <LinearProgress className={classes.cover} variant="determinate" value={(100 * task.remain) / task.duration} />
                        </div>
                        <div className={classes.content}>
                            <Chip className="complete" label="complete" />
                            <p> Completed at: {moment(task.completedAt).format('L')} </p>
                        </div>
                    </Card>
                </Grid>
            ))}
        </Fragment>
    );
}

export default TaskCompleted;