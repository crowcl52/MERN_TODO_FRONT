import React, { useContext, Fragment, useEffect } from 'react';

import projectContext from '../../context/projects/projectContext';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Toastmsg = () => {

    // obtener context
    const projectsContext = useContext(projectContext);
    const { showToast, showToastFn } = projectsContext;

    const { severity, open, msg } = showToast;

    useEffect(() => {
        if(open){
            const toastTime = setTimeout(() => {
                showToastFn({ ...showToast, open: false, msg: 'alert msg' });
            }, 4000);
        }
    }, [open])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        showToastFn({ ...showToast, open: false, msg: '' });
    }

    return (
        <div className={`alert ${open ? 'show-alert': ''} ${ severity === 'error' ? 'alert-danger' : 'alert-sucess' } `} >
            <p className="alert-title">
                <span> {msg} </span>    
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </p>
        </div>
    );
}

export default Toastmsg;