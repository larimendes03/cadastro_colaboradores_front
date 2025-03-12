import  './dashboard.css'
import BotaoDashboard from "../botoes/botaoDashboard.js"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

   const [sumario, setTotal] = useState({
    totalColaboradores: 0,
    totalDependentes: 0
   });

   useEffect(() =>{
    axios.get('http://localhost:3001/colaboradores/sumario').then(response => {
        setTotal(response.data);
    }).catch(error => {
        console.log(error);
    });
   });


    return (
        <body className='bodyDashboard'>
            <section className='dashboard'>
                <h2>Dashboard</h2>
                <h3>Total colaboradores: {sumario.totalColaboradores}</h3>
                <h3>Total dependentes: {sumario.totalDependentes}</h3>
                <BotaoDashboard />
                {/* Adicionarei gráfico em breve */}
            </section>
        </body>
    )

}

export default Dashboard;