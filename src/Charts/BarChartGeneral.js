import React from 'react';
import { useState, useEffect } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
)

const labels = ['Strategy', 'Structure', 'Processes', 'Management Style', 'People', 'Skills & Competences'];

const BarChartGeneral = () => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getBarData();
    }, []);

    async function getBarData() {
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();

        for (let i = 0; i < data.bar.length; i++) {
            arr.push(Number(data.bar[i].Value));
        }
        setBarData(arr);
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'Q1 2020',
            data: barData.slice(0, 6),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q2 2020',
            data: barData.slice(6, 12),
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q3 2020',
            data: barData.slice(12, 18),
            backgroundColor: [
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q4 2020',
            data: barData.slice(18, 24),
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q1 2021',
            data: barData.slice(24, 30),
            backgroundColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q2 2021',
            data: barData.slice(30, 36),
            backgroundColor: [
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'Q3 2021',
            data: barData.slice(36, 42),
            backgroundColor: [
                'rgba(0,255,255,1)',
            ],
            borderColor: [

                'rgba(0,255,255,1)',
            ],
            borderWidth: 1
        }, {
            label: 'Q4 2021',
            data: barData.slice(42, 48),
            backgroundColor: [
                'rgba(0,0,0,1)',
            ],
            borderColor: [

                'rgba(0,0,0,1)',
            ],
            borderWidth: 1
        }]
    }

    const options = {
        title: {
            display: true,
            text: "Some title"
        },

        scales: {
            y: {
                beginAtZero: true
            }
        },

        legend: {
            display: true,
            labels: {
                fontSize: 26
            }
        }
    }

    return (
        <div>
            <Bar height={150} data={data} options={options} />
        </div>
    )
}

export default BarChartGeneral
