import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';

import Buttons from '../Shared/Buttons';
import IncreaseDecrease from './IncreaseDecrease';
import BarChartIncreaseGroup from '../Charts/BarChartIncreaseGroup';
import BarChartDecreaseGroup from '../Charts/BarChartDecreaseGroup';
import HorizontalBarChartFirst from '../Charts/HorizontalBarChartFirst';
import HorizontalBarChartSecond from '../Charts/HorizontalBarChartSecond';
import OpenAnswers from './OpenAnswers';
import TableGroup from '../Group/TableGroup';


const Group = () => {


    return (
        <div>
            <Row className='mt-4'>
                <Col className="mb-3" md={12}>
                    <Buttons />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <IncreaseDecrease first="Increase" second="Decrease" />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={6}>
                    <BarChartIncreaseGroup />
                </Col>
                <Col md={6}>
                    <BarChartDecreaseGroup />
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={12}>
                    <HorizontalBarChartFirst />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={12}>
                    <HorizontalBarChartSecond />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <OpenAnswers />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={12}>
                    <TableGroup />
                </Col>
            </Row>
        </div>
    )
}

export default Group
