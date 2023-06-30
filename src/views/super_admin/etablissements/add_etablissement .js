import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';


const AddEtablissement = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.post('/etablissements', inputs).then((res) => {
            alert("tablissement ajouté avec succès !")
            navigate('/etablissement/list/super/admin')
        })


        console.log(inputs);
    }


    const [fondateurs, setFondateurs] = useState([]);
    useEffect(() => {
        fetchAllFondateurs();
    }, []);

    const fetchAllFondateurs = () => {
        http.get('/get_fondateurs').then(res => {
            setFondateurs(res.data);
        })
    }
    const [configurations, setConfigurations] = useState([]);
    useEffect(() => {
        fetchAllConfigurations();
    }, []);

    const fetchAllConfigurations = () => {
        http.get('/get_configuration').then(res => {
            setConfigurations(res.data);
        })
    }
    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Ajouter un nouvel établissement</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nom </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Cygle </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cygle" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="email" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="tel" defaultValue="" placeholder="+237" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Boite postal </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="bp" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Site web </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="site" placeholder="https://www." onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Pays </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="pays" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Cameroun">Cameroun</option>
                                                        <option value="RCA">RCA</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Ville </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="ville" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Département </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="dep" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Adresse </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="adresse" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Logo </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="logo" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Fondateur </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="fondateur" onChange={handleChange}>
                                                        <option></option>
                                                        {fondateurs.map((item) =>
                                                            <option key={item.id} value={item.id}> {item.nom} {item.prenom}</option>
                                                        )}


                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Facturation </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="fact" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Par élève">Par élève</option>
                                                        <option value="Par taux">Par taux</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Configuration </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="conf" onChange={handleChange}>
                                                        <option></option>
                                                        <option></option>
                                                        {configurations.map((item2) =>
                                                            <option key={item2.intitule_configuration} value={item2.intitule_configuration}> {item2.intitule_configuration} </option>
                                                        )}
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Payer la préinscription </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="preins" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Oui">Oui</option>
                                                        <option value="Non">Non</option>
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

export default AddEtablissement
