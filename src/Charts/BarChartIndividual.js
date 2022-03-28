import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Chart, BarElement, CategoryScale, LinearScale, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
)

const yearSelections = ['2020', '2021'];
const quarterSelections = ['Q1', 'Q2', 'Q3', 'Q4'];

const BarChartGeneral = () => {
    const [year1, setYear1] = useState('');
    const [year2, setYear2] = useState('');
    const [quarter1, setQuarter1] = useState('');
    const [quarter2, setQuarter2] = useState('');
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getQuestionsData();
    }, []);

    async function getQuestionsData() {
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();

        // console.log(data.questions);
        data.questions.forEach((el) => {
            if (!arr.includes(el.Specific)) {
                arr.push(el.Specific);
            }
        });
        setQuestions(arr);
    }

    async function getData(e) {
        e.preventDefault();
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();
        data.questions.forEach((el) => {
            if (el.Specific === question && el.Quarter === quarter1 && el.Year === year1) {
                arr.push(el.Score);
            }

            if (el.Specific === question && el.Quarter === quarter2 && el.Year === year2) {
                arr.push(el.Score);
            }
        });
        console.log(barData);
        setBarData(arr);
    }

    const data = {
        labels: [question],
        datasets: [{
            label: `${quarter1} ${year1}`,
            data: barData.slice(0),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
        {
            label: `${quarter2} ${year2}`,
            data: barData.slice(1),
            backgroundColor: [
                'rgba(0,255,255,1)',
            ],
            borderColor: [

                'rgba(0,255,255,1)',
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
            <Form onSubmit={getData}>
                <div>
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="quarter" value={quarter1}
                        onChange={(e) => setQuarter1(e.target.value)}
                        onBlur={(e) => setQuarter1(e.target.value)}>
                        <option>---Select quarter</option>
                        {quarterSelections.map((quarter) => (
                            <option value={quarter}>{quarter}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="year" value={year1}
                        onChange={(e) => setYear1(e.target.value)}
                        onBlur={(e) => setYear1(e.target.value)}>
                        <option>---Select year</option>
                        {yearSelections.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="quarter" value={quarter2}
                        onChange={(e) => setQuarter2(e.target.value)}
                        onBlur={(e) => setQuarter2(e.target.value)}>
                        <option>---Select quarter</option>
                        {quarterSelections.map((quarter) => (
                            <option value={quarter}>{quarter}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="year" value={year2}
                        onChange={(e) => setYear2(e.target.value)}
                        onBlur={(e) => setYear2(e.target.value)}>
                        <option>---Select year</option>
                        {yearSelections.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Form.Select
                        className="mb-4 form-control form-select"
                        aria-label="Default select example"
                        id="question" value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onBlur={(e) => setQuestion(e.target.value)}>
                        <option>---Select question</option>
                        {questions.map((question) => (
                            <option value={question}>{question}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="text-center mb-4">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form >
            <Bar data={data} options={options} width={250} />
        </div>
    )
}

export default BarChartGeneral

