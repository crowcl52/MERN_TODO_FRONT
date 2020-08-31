import React, { useState, useContext } from 'react'
import Header from '../layout/Header';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Container, TextField } from '@material-ui/core';
import ProjectList from './ProjectList';
import projectContext from '../../context/projects/projectContext';


const Projects = () => {

    // obtener context
    const projectsContext = useContext(projectContext);
    const { addProyectFn, showToastFn } = projectsContext;

    const [showInput, setshowInput] = useState(false);
    const [project, setproject] = useState({
        name: 'My Awesome Project!!!'
    })

    // set input value
    const { name } = project;

    // show the input to add new project
    const showAddBtn = () => {
        if (!showInput) {
            setshowInput(true);
            document.querySelector("#add-project").focus();
            document.querySelector("#add-project").select();
        }else{
            setshowInput(false); 
        }
    };

    // check input text
    const onchange = e => {
        setproject({
            [e.target.name]: e.target.value
        })
    }

    // add new project
    const addProject = e => {
        e.preventDefault();

        if (name === '') {
            showToastFn({
                severity: "error",
                open: true,
                msg: "Todos los campos son obligatorios"
            })
            return;
        }

        addProyectFn(project)

        setshowInput(false);
        setproject({
            name: 'My Awesome Project!!!'
        });
    }

    return (
        <div className="full" >
            <Header />
            <Container className="animate__animated animate__fadeIn" >
                <ProjectList />
            </Container>

            <form onSubmit={addProject} className={`float-input ${showInput ? "float-input-down" : ""} `} noValidate autoComplete="off">
                <TextField
                    className="float-add"
                    id="add-project"
                    label="New Project name"
                    helperText="Press Enter to add the new project"
                    name="name"
                    value={name}
                    onChange={onchange} />
            </form>

            <Fab onClick={showAddBtn} className="animate__animated animate__pulse animate__slow animate__infinite float-btn" color="secondary" aria-label="add">
                <AddIcon className={`${showInput ? 'rotate' : ''} `} />
            </Fab>
        </div>
    );
}

export default Projects;