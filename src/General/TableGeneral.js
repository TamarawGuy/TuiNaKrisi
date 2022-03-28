import React, { useState, useEffect } from 'react'

const quarterSelections = ['Q1', 'Q2', 'Q3', 'Q4'];
const yearSelections = ['2020', '2021'];

const TableGeneral = () => {
    const styleForm = { display: "flex", justifyContent: "space-around" };
    const styleTable = { overflow: "scroll", maxHeight: "300px" };
    const [quarter, setQuarter] = useState('');
    const [year, setYear] = useState('');
    const [topic, setTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        getData();
    }, [quarter, year, topic]);


    async function getData() {
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();
        data.select.forEach((el) => {
            if (el.Year === year && el.Quarter === quarter) {
                arr.push(`${el.topic_name} - ${el.Perc}%`);
            }
        });
        setTopics(arr);
    }

    async function getTopicData() {
        let arr = [];
        const res = await fetch(`segments.json`);
        const data = await res.json();

        data.answers.forEach((el) => {
            if (el.Quarter === quarter && el.Year == year && el.Topic_name === topic.split(' - ')[0]) {
                arr.push(el.Text);
            }
        });
        setAnswers(arr);
    }

    return (
        <div>
            <div>
                <form style={styleForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        getTopicData();
                    }}>

                    <label htmlFor='quarter'> Select Quarter
                        <select
                            className="mb-4 form-control form-select"
                            aria-label="Default select example"
                            id="quarter" value={quarter}
                            onChange={(e) => setQuarter(e.target.value)}
                            onBlur={(e) => setQuarter(e.target.value)}>
                            <option>Select Quarter</option>
                            {quarterSelections.map((quarter) => (
                                <option value={quarter}>{quarter}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor='year'> Select Year
                        <select
                            className="mb-4 form-control form-select"
                            aria-label="Default select example"
                            id="year" value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onBlur={(e) => setYear(e.target.value)}>
                            <option>Select Year</option>
                            {yearSelections.map((year) => (
                                <option value={year}>{year}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor='topic'>Select Topic
                        <select
                            className="mb-4 form-control form-select"
                            aria-label="Default select example"
                            id="topic" value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onBlur={(e) => setTopic(e.target.value)}>
                            {topics.map((topic) => (
                                <option value={topic.split(' - ')[0]}>{topic}</option>
                            ))}
                        </select>
                    </label>
                    <div className='text-center'>
                        <button className='btn btn-primary mt-4'>Submit</button>
                    </div>
                </form>
            </div >
            <div style={styleTable}>
                <table className="table bg-white">
                    <thead className="bg-info">
                        <tr className="text-white">
                            <th scope="col">id</th>
                            <th scope="col">Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answers.map((answer, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{answer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default TableGeneral
