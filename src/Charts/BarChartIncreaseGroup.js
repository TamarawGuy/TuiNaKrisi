import React, { useState, useEffect, useContext } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import AuthContext from '../context/AuthContext';


Chart.register(
    CategoryScale,
    LinearScale,
    BarElement
)


const quarterSelections = ['Q1', 'Q2', 'Q3', 'Q4'];
const yearSelections = ['2020', '2021'];

const BarChartIncreaseGroup = () => {
    const { user } = useContext(AuthContext);
    const username = user.username;

    const [team, setTeam] = useState('');
    const [teams, setTeams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [quarter1, setQuarter1] = useState('');
    const [year1, setYear1] = useState('');
    const [quarter2, setQuarter2] = useState('');
    const [year2, setYear2] = useState('');
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    async function getData(e) {
        e.preventDefault();
        let arr = [];
        let from = [];
        let current = [];
        let q = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();

        data[username].increase.forEach((el) => {
            if (el.Team === team && el["From Quarter"] === quarter1 && el["From Year"] === year1 && el["Current Quarter"] == quarter2 && el["Current Year"] == year2) {
                q.push(el.Questions);
                from.push(Number(el["From Value"]));
                current.push(Number(el["Current Value"]));
            }
        });
        arr = from.concat(current);
        setBarData(arr);
        setQuestions(q);
    }

    async function getTeams() {
        let arr = [];

        const res = await fetch(`segments.json`);
        const data = await res.json();

        data[username].increase.forEach((el) => {
            if (!arr.includes(el.Team)) {
                arr.push(el.Team);
            }
        });
        setTeams(arr);
    }

    const data = {
        labels: questions,
        datasets: [{
            data: barData.slice(0, 2),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }, {
            data: barData.slice(2, 4),
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },]
    }

    const options = {

        scales: {
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <div>
            <div>
                <Form onSubmit={getData}>
                    {/* <div> */}
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="team" value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        onBlur={(e) => setTeam(e.target.value)}>
                        <option>---Select Team</option>
                        {teams.map((team) => (
                            <option value={team}>{team}</option>
                        ))}
                    </Form.Select>
                    {/* </div> */}
                    {/* <div> */}
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="team" value={quarter1}
                        onChange={(e) => setQuarter1(e.target.value)}
                        onBlur={(e) => setQuarter1(e.target.value)}>
                        <option>---Select first quarter</option>
                        {quarterSelections.map((quarter) => (
                            <option value={quarter}>{quarter}</option>
                        ))}
                    </Form.Select>
                    {/* </div> */}
                    {/* <div> */}
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="team" value={year1}
                        onChange={(e) => setYear1(e.target.value)}
                        onBlur={(e) => setYear1(e.target.value)}>
                        <option>---Select first year</option>

                        {yearSelections.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </Form.Select>
                    {/* </div> */}
                    {/* <div> */}
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="team" value={quarter2}
                        onChange={(e) => setQuarter2(e.target.value)}
                        onBlur={(e) => setQuarter2(e.target.value)}>
                        <option>---Select second quarter</option>

                        {quarterSelections.map((quarter) => (
                            <option value={quarter}>{quarter}</option>
                        ))}
                    </Form.Select>
                    {/* </div> */}
                    {/* <div> */}
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="team" value={year2}
                        onChange={(e) => setYear2(e.target.value)}
                        onBlur={(e) => setYear2(e.target.value)}>
                        <option>---Select second year</option>

                        {yearSelections.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </Form.Select>
                    {/* </div> */}
                    <div className="text-center mb-4">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
            <Bar height={250} data={data} options={options} />

        </div>
    )
}

export default BarChartIncreaseGroup

