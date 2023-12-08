import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';


const AddConfiguration = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.post('/configurations', inputs).then((res) => {
            alert("Configuration ajoutée avec succès !")
            navigate('/etablissement/configurations/list/super/admin')
        })


        //console.log(inputs);
    }
    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Ajouter une configuration</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Intitulé </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="intitule" value={inputs.intitule_configuration} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Section </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="section" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Francophone">Francophone</option>
                                                        <option value="Anglophone">Anglophone</option>
                                                        <option value="Bilingue">Bilingue</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Type d'enseignement </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="type_enseignement" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Général">Général</option>
                                                        <option value="Technique">Technique</option>
                                                        <option value="Mixte">Mixte</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Statut administratif </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="statut_administratif" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Privé">Privé</option>
                                                        <option value="Public">Public</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Niveau d'enseignement </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="niveau_enseignement" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Primaire">Primaire</option>
                                                        <option value="Primaire">Maternelle</option>
                                                        <option value="Secondaire">Secondaire</option>
                                                        <option value="Universitaire">Universitaire</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Statut religieux </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="statut_religieux" onChange={handleChange}>

                                                        <option></option>
                                                        <option value="Laic">Laic</option>
                                                        <option value="Catholique">Catholique</option>
                                                        <option value="Protestant">Protestant</option>
                                                        <option value="Islamique">Islamique</option>
                                                    </select>
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

export default AddConfiguration
