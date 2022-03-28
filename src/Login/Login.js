import { Row, Col, Form, Button } from 'react-bootstrap';

import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const Login = () => {
    let { loginUser } = useContext(AuthContext);
    return (
        <div>
            <Row className='mt-4'>
                <Col md={12}>
                    <Form onSubmit={loginUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login
