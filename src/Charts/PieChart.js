// - segment
// - quarter
// - year
// - pieData


import React from 'react'
import { useState, useEffect } from 'react';
import { Chart, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(
    Tooltip, Legend,
    LinearScale,
    ArcElement
)

// Create Pie Chart Component


const PieChart = () => {
    const style = { display: 'flex', justifyContent: 'space-around' };

    // Create constants selections

    const quarterSelections = ['Q1', 'Q2', 'Q3', 'Q4'];
    const segmentSelections = ['Strategy', 'Structure', 'Processes', 'Management Style', 'People', 'Skills & Competences'];
    const yearSelections = ['2020', '2021'];


    // Create dynamic variables with useState for data on pie chart
    const [segment, setSegment] = useState('Strategy');
    const [quarter, setQuarter] = useState('Q1');
    const [year, setYear] = useState('2020');
    const [pieData, setPieData] = useState([]);


    // When page loads or a variable in the list is changed (segment, year, quarter),
    // we use useEffect to trigger async functions to get data
    useEffect(() => {
        getPieData();
    }, [segment, quarter, year]);

    async function getPieData() {
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();

        data.pie.forEach((el) => {
            if (el.Segment === segment && el.Quarter === quarter && el.Year === year) {
                arr.push(Number(el.Score));
            }
        });
        setPieData(arr);
    }


    const data = {
        labels: ['Fully Agree', 'Agree', 'Neutral', 'Disagree', 'Fully Disagree', 'Not applicable'],
        datasets: [{
            data: pieData,
            backgroundColor: [
                'rgba(50, 205, 50, 0.7)',
                'rgba(173, 255, 47, 0.7)',
                'rgba(255, 255, 0, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 0, 0, 0.7)',
                'rgba(0, 0, 255, 0.7)',
            ],
            borderColor: [
                'rgba(50, 205, 50, 1)',
                'rgba(173, 255, 47, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 255, 1)',
            ],
            borderWidth: 1
        },]
    }

    const options = {
        title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
        },
        legend: {
            display: true,
            position: 'right'
        }
    }

    return (
        <div style={style}>
            <div>
                <div className="text-center">
                    <p>Select segment</p>
                </div>
                <div>
                    <select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="segment" value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        onBlur={(e) => setSegment(e.target.value)}>
                        {segmentSelections.map((segment) => (
                            <option key={segment} value={segment}>{segment}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <p>Select quarter</p>
                </div>
                <div>
                    <select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="quarter" value={quarter}
                        onChange={(e) => setQuarter(e.target.value)}
                        onBlur={(e) => setQuarter(e.target.value)}>
                        {quarterSelections.map((quarter) => (
                            <option value={quarter}>{quarter}</option>
                        ))}

                    </select>
                </div>
                <div className="text-center">
                    <p>Select Year</p>
                </div>
                <div>
                    <select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="year" value={year}
                        onChange={(e) => setYear(e.target.value)}
                        onBlur={(e) => setYear(e.target.value)}>
                        {yearSelections.map((year) => (
                            <option value={year}>{year}</option>
                        ))}

                    </select>
                </div>
            </div>
            <div>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default PieChart
