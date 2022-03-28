import React from 'react'
import { Row, Col } from 'react-bootstrap';

import Buttons from '../Shared/Buttons';
import BarChartIndividual from '../Charts/BarChartIndividual';
// import QuestionSelection from '../Shared/QuestionSelection';
// import QuarterSelection from '../Shared/QuarterSelection';
import Table from '../General/TableGeneral';
// import ThemeSelector from '../Shared/ThemeSelector';
import OpenAnswers from '../Group/OpenAnswers';

const Individual = () => {
    return (
        <div>
            <Row className='mt-4'>
                <Col>
                    <Buttons />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={12}>
                    <BarChartIndividual />
                </Col>
            </Row>
            {/* <Row className='mt-4'>
                <Col>
                    <OpenAnswers />
                </Col>
            </Row> */}
            {/* <Row className='mt-4'>
                <Col md={12}>
                    <Table />
                </Col>
            </Row> */}
        </div>
    )
}

export default Individual
