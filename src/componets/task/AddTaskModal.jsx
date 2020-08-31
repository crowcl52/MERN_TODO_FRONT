import React, { useState, useContext, useEffect } from 'react'
import { TextField, InputAdornment, FormControl, Input, Switch, FormControlLabel, ButtonGroup, Button } from '@material-ui/core';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/task/taskContext';


const TaskModal = () => {

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { showtaskModal, showModalTaskFn, currentProject, showToastFn  } = projectsContext;

    // obtener taskcontext
    const tasksContext = useContext(taskContext);
    const { addTaskFn, msg, editTask, editTaskModalFn, editTaskFn } = tasksContext;

    useEffect(() => {
        if (msg) {
            showToastFn({
                severity: "sucess",
                open: true,
                msg: msg
            });
            showModalTaskFn(false)
        }
        if (editTask) {
            setTaskForm({
                _id:editTask._id,
                name: editTask.name,
                description: editTask.description,
                duration: editTask.duration,
                remain: editTask.remain,
                index: editTask.index,
                inprogress: editTask.inprogress,
                status: editTask.status,
                project: editTask.project,
            })
        } else {
            setTaskForm({
                name: 'Task Name is Here',
                description: '',
                duration: '',
                remain: '',
                index: 0,
                project: currentProject._id,
                inprogress: false,
                status: false
            })
        }

    }, [msg, editTask])

    const [taskForm, setTaskForm] = useState({
        name: 'Task Name is Here',
        description: '',
        duration: '',
        remain: '',
        index: 0,
        project: currentProject._id,
        inprogress: false,
        status: false
    });

    const { name, description, duration, remain, index, project, inprogress, status } = taskForm;

    const handleChange = e => {
        setTaskForm({
            ...taskForm,
            [e.target.name]: e.target.value
        })
    }

    const setTime = v => {
        setTaskForm({
            ...taskForm,
            duration: v,
            remain: v
        })
    }
    // Crear task
    const onSubmit = e => {
        e.preventDefault();
        // confirmar que no haya campos vacios
        if (name === '' || description === '' || duration === '' || index === '') {
            showToastFn({
                severity: "error",
                open: true,
                msg: "All fileds are required"
            });
        }
        // validar que la duracion no sea mayor a 2h
        if (duration > 120) {
            showToastFn({
                severity: "error",
                open: true,
                msg: "The max duration time is 120 min"
            });
        }
        // preparar el objeto para mandar
        let task = {
            ...taskForm,
            remain: Math.floor(Number(duration)),
            duration: Math.floor(Number(duration))
        }
        // mandar task
        if (editTask) {
            editTaskFn(task);
        } else {
            addTaskFn(task);
            setTaskForm({
                name: 'Task Name is Here',
                description: '',
                duration: '',
                remain: '',
                index: 0,
                project: currentProject._id,
                inprogress: false,
                status: false
            })
        }
    }

    const closeModal = () => {
        editTaskModalFn(null);
        showModalTaskFn(false);
    }

    return (
        <section className={`modal ${!showtaskModal ? 'none' : ''} `}>
            <form onSubmit={onSubmit} className={`modal-body animate__animated animate__fadeInDown`}>
                <div className="modal-header">
                    <input
                        className="modal-header-input"
                        placeholder="Task Name"
                        type="text"
                        name="name"
                        value={name}
                        disabled={editTask}
                        onChange={handleChange} />
                </div>
                <div className="modal-content">
                    <FormControl className="full-width mt">
                        <Input
                            id="standard-adornment-weight"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <div className="set-flex">
                        <p className="half-w mt" > Set time:  </p>
                        <ButtonGroup color="primary" className="half-w">
                            <Button onClick={() => setTime(30)} >30min</Button>
                            <Button onClick={() => setTime(45)} >45min</Button>
                            <Button onClick={() => setTime(60)} >60min</Button>
                        </ButtonGroup>
                    </div>
                    <div className="set-flex">
                        <FormControl className="half-w mt">
                            <Input
                                id="standard-adornment-weight"
                                placeholder="duration"
                                name="duration"
                                value={duration}
                                type="number"
                                endAdornment={<InputAdornment position="end">min</InputAdornment>}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className="half-w mt">
                            <Input
                                id="standard-adornment-weight"
                                name="index"
                                endAdornment={<InputAdornment position="end">index</InputAdornment>}
                                value={index}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="modal-action set-flex">
                    <Button variant="contained" onClick={() => closeModal()} >Close</Button>
                    <Button type="submit" variant="contained" color="primary">Confirm </Button>
                </div>
            </form>
        </section>
    );
}

export default TaskModal;