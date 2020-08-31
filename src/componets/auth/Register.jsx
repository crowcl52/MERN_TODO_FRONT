import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Grid } from '@material-ui/core';
import Particles from 'react-particles-js';
import projectContext from '../../context/projects/projectContext';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';



const Register = () => {

    // create history
    const history = useHistory();

    // obtener context
    const projectsContext = useContext(projectContext);
    const { showToastFn } = projectsContext;

    const authContext = useContext(AuthContext);
    const { registerUSer,msg, authUser, token,userAuthFn } = authContext;


    useEffect(() => {

        if(token) userAuthFn()

        if( authUser ) history.push('/projects');

        if(msg){
            showToastFn({
                severity: msg.severity,
                open: true,
                msg: msg.msg
            });
        }
        
    }, [msg, authUser]);

    // set UuserState
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    // extraer user
    const { name, email, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // send Form
    const onSubmit = e => {
        e.preventDefault();

        // validar campos vacios
        if (email === '' || password === '' || name === '') {
            showToastFn({
                severity: "error",
                open: true,
                msg: "All fileds are required"
            });
        }

        if(password.length <6 ){
            showToastFn({
                severity: "error",
                open: true,
                msg: "The password must contain 6 characters "
            });
        }

        // Pasarlo al action
        registerUSer({ name, email, password, photo:'' })
    }

    return (
        <div className="auth-bg" >
            <div className="particle-container">
                <Particles
                    width="100%"
                    height="100%"
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />
            </div>
            <Box boxShadow={3} className="auth-form animate__animated animate__bounceIn" display="flex" flexDirection="column" >
                <h1> Register </h1>
                <form onSubmit={onSubmit} >
                    <Grid container direction="column" justify="space-between"  >
                        <TextField
                            required
                            id="nameLogin"
                            label="Name"
                            type="text"
                            name="name"
                            value={name}
                            className="mt"
                            onChange={onChange} />
                        <TextField
                            required
                            id="emailLogin"
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            className="mt"
                            onChange={onChange} />
                        <TextField
                            required
                            id="passwordLogin"
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            className="mt"
                            onChange={onChange} />
                        <Button className="mt" variant="contained" color="primary" type="submit"> Register </Button>
                    </Grid>
                </form>
                <Link className="mt" to={'/'} > Login </Link>
            </Box>

        </div>
    );

}

export default Register;