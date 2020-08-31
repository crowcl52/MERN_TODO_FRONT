import React, { useContext, useEffect } from 'react'
import { Grid, Card, CardHeader, Avatar } from '@material-ui/core';
import projectContext from '../../context/projects/projectContext';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const ProjectList = () => {
    // create history
    const history = useHistory();

    // obtener listado de proyectos
    const projectsContext = useContext(projectContext);
    const { projects, getProjectsFn, setCurrentProjectFn } = projectsContext;

    useEffect(() => {
        getProjectsFn([])
    }, [])

    const setProject = p =>{
        setCurrentProjectFn(p)
        if(p) history.push('/task');
    }

    if (projects.length === 0) return (<h1 className="muted-txt" > No tienes proyectos </h1>)

    return (

        <Grid container spacing={3} className="mt" >
            {projects.map(p => (
                <Grid key={p._id} item xs={12} xl={3} >
                    <Card onClick={ () =>setProject(p) } >
                        <CardHeader className="cursor"
                            avatar={
                                <Avatar aria-label="recipe"> {p.name.substring(0, 1)} </Avatar>
                            }
                            title={p.name}
                            subheader={moment(p.createAt).format('L')} />
                    </Card>
                </Grid>
            ))}

        </Grid>

    );
}

export default ProjectList;