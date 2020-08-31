import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const Header = () => {

    // create history
    const history = useHistory();

    // traer context
    const authContext = useContext(AuthContext);
    const { authUser,logOutFn } = authContext;

    useEffect(() => {
       if(!authUser) history.push('/')
    }, [authUser]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    MEARN <span className="thin"> Todo </span>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    Projects
                </Typography>
                <IconButton onClick={ ()=> logOutFn() } edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;