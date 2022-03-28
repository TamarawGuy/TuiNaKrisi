import React from "react";
import { Row, Col } from 'react-bootstrap';

import Buttons from "../Shared/Buttons";
import Info from "./Info";
import BarChartGeneral from '../Charts/BarChartGeneral';
import PieChart from '../Charts/PieChart'
import TableGeneral from "./TableGeneral";
import OpenAnswers from "../Group/OpenAnswers";


const General = () => {

    return (
        <div>
            <Row className="mt-4">
                <Col className="mb-3" md={12}>
                    <Buttons />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col className="mb-3" md={12}>
                    <Info />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col className="mb-3" md={12}>
                    <BarChartGeneral />
                </Col>
                <Col className="mb-3" md={12}>
                    <PieChart />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <OpenAnswers />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col md={12}>
                    <TableGeneral />
                </Col>
            </Row>
        </div>
    );

}

export default General;