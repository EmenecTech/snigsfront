import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate, Link } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';

import AuthUser from '../../../components/AuthUser';


const AddRole = () => {
    const { user, http } = AuthUser();
    const { userdetail, setUserdetail } = useState();


    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            console.log(res.data);
        })
    }

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const etab = user.etablissement;
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab }))
    }




    const submitForm = () => {
        http.post('/roles', inputs).then((res) => {
            alert("Role ou fonction ajouté avec succès !")
            navigate('/Admin/list/roles')
        })


        console.log(inputs);
    }
    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Ajouter un rôle ou une fonction</h4>
                                </div>

                            </Card.Header>
                            <Card.Body>

                                <Form>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Intitulé *</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="int" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Description </Form.Label>
                                                    <textarea className="form-control" name="desc" rows={7} onChange={handleChange} aria-label="With textarea"></textarea>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>




                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitForm}>Confirmer</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AddRole
