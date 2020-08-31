import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import projectContext from '../../context/projects/projectContext';
import { Menu, MenuItem } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PieChartIcon from '@material-ui/icons/PieChart';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const HeaderTask = () => {

    // create history
    const history = useHistory();

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    // traer context
    const authContext = useContext(AuthContext);
    const { authUser, logOutFn } = authContext;

    const [anchorEl, setAnchorEl] = useState(null);

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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    MEARN <span className="thin"> Todo </span>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    {currentProject.name}
                </Typography>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}> <Link className="link" to={'/projects'} ><BusinessCenterIcon />   Projects </Link>  </MenuItem>
                    <MenuItem onClick={handleClose}> <Link className="link" to={'/task'} ><BusinessCenterIcon />   Tasks </Link>  </MenuItem>
                    <MenuItem onClick={handleClose}> <Link className="link" to={'/history'} ><TimelineIcon />  History </Link> </MenuItem>
                    <MenuItem onClick={handleClose}> <Link className="link" to={'/charts'} ><PieChartIcon />  Charts </Link> </MenuItem>
                    <MenuItem onClick={()=>logOutFn()}> <span className="link" > <ExitToAppIcon /> Logout </span> </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderTask;