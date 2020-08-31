import React, { useContext, useEffect, useState } from 'react'
import HeaderTask from '../layout/HeaderTask';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/task/taskContext';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';



const Results = () => {

    //check if exist current project
    const history = useHistory();

    // obtener state de modal
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;
    const weakDate = moment().subtract(7, 'days').calendar();
    const [daysInWeak, setdaysInWeak] = useState([]);
    const [data, setdata] = useState([]);

    // obtener current task y tareas sin terminar
    const tasksContext = useContext(taskContext);
    const { completeTask, getTasksFn, isLoadingTask } = tasksContext;

    useEffect(() => {
        formatDays()
    }, [])

    // funcion para dar formato a la tabla
    const formatDays = () => {
        let days = [];
        let newData = []
        for (let index = 0; index < 7; index++) {
            let day = moment(weakDate).add(index + 1, 'days').format('DD/MM');
            days[index] = day;
            console.log(completeTask)
            if (completeTask.length > 0) {
                console.log(day);
                console.log((moment(completeTask[0].completeAt).format('DD/MM')));
                let count = completeTask.filter(t => (moment(t.completeAt).format('DD/MM')) == day)
                console.log(count)
                newData[index] = { day: index + 1, complete: count.length }
            }
        }
        setdaysInWeak(days)
        setdata(newData)
    }

    useEffect(() => {
        if (currentProject) getTasksFn(currentProject._id)
    }, [])

    // validar si existe un proeycto seleccionado
    if (!currentProject) { history.push('/projects'); return null };

    return (
        <div className="full" >
            <HeaderTask />
            <h1 className="muted-txt" > Projects from  {weakDate} to {moment().format('MM/D/YYYY')} </h1>

            <div className="chart-container mt">
                <VictoryChart
                    // adding the material theme provided with Victory
                    theme={VictoryTheme.material}
                    domainPadding={10}
                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5, 6, 7]}
                        tickFormat={daysInWeak}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x / 1}`)}
                    />
                    <VictoryBar
                        data={data}
                        x="day"
                        y="complete"
                    />
                </VictoryChart>
            </div>

        </div>
    );
}

export default Results;