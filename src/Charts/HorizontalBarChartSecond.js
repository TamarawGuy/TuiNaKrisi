import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import AuthContext from "../context/AuthContext";

Chart.register(CategoryScale, LinearScale, BarElement);

const quarterSelections = ["Q1", "Q2", "Q3", "Q4"];
const yearSelections = ["2020", "2021"];

const HorizontalBarChartSecond = () => {
  const { user } = useContext(AuthContext);
  const username = user.username;

  const [team, setTeam] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  const [score, setScore] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [teams, setTeams] = useState([]);
  const uniqueQuestions = [...new Set(questions)];
  const [question, setQuestion] = useState("");

  useEffect(() => {
    getTeamsData();
  }, [quarter, year]);

  async function getTeamsData() {
    let arr = [];

    const res = await fetch(`segments.json`);
    const data = await res.json();

    data[username].lowest.forEach((el) => {
      if (!arr.includes(el.Team)) {
        arr.push(el.Team);
      }
    });
    setTeams(arr);
  }

  async function getData(e) {
    e.preventDefault();
    let arr = [];
    let q = [];

    const res = await fetch(`segments.json`);
    const data = await res.json();

    data[username].lowest.forEach((el) => {
      if (el.Team === team && el.Quarter === quarter && el.Year === year) {
        arr.push(el.Number);
        q.push(el.Question);
      }
    });
    setScore(arr);
    setQuestions(q);
  }

  //   async function getQuestionData(question) {
  //     const res = await fetch(`segments.json`);
  //     const data = await res.json();

  //     data[username].lowest.forEach((el) => {
  //       if () {
  //       }
  //     });
  //   }

  const data = {
    labels: uniqueQuestions,
    datasets: [
      {
        label: "Agree",
        data: score.slice(0, 5),
        backgroundColor: ["rgba(255, 99, 132, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: "Disagree",
        data: score.slice(5, 10),
        backgroundColor: ["rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Fully Agree",
        data: score.slice(10, 15),
        backgroundColor: ["rgba(0, 255, 128, 1)"],
        borderColor: ["rgba(0, 255, 128, 1)"],
        borderWidth: 1,
      },
      {
        label: "Fully Disagree",
        data: score.slice(15, 20),
        backgroundColor: ["rgba(255, 0, 255, 1)"],
        borderColor: ["rgba(255, 0, 255, 1)"],
        borderWidth: 1,
      },
      {
        label: "Neutral",
        data: score.slice(20, 25),
        backgroundColor: ["rgba(51, 51, 255, 1)"],
        borderColor: ["rgba(51, 51, 255, 1)"],
        borderWidth: 1,
      },
      {
        label: "Not Answered",
        data: score.slice(20, 25),
        backgroundColor: ["rgba(238, 238, 238, 1)"],
        borderColor: ["rgba(238, 238, 238, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // indexAxis: "y",
    // scales: {
    //     x: {
    //         stacked: true
    //     },
    //     y: {
    //         stacked: true
    //     }
    // },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="increase mb-5">
        <div className="card my-card shadow text-center p-3">
          <h4>Lowest</h4>
        </div>
      </div>
      <Form onSubmit={getData}>
        <div>
          <Form.Select
            className="mb-4 form-control form-select"
            aria-label="Default select example"
            id="quarter"
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            onBlur={(e) => setQuarter(e.target.value)}
          >
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
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onBlur={(e) => setYear(e.target.value)}
          >
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
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            onBlur={(e) => setTeam(e.target.value)}
          >
            <option>---Select team</option>
            {teams.map((team) => (
              <option value={team}>{team}</option>
            ))}
          </Form.Select>
        </div>
        <div className="text-center mb-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <Bar data={data} options={options} width={400} height={300} />
    </div>
  );
};

export default HorizontalBarChartSecond;
