import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import AuthUser from "../../../components/AuthUser"
import http from '../../../http';


const AddEtablissement = () => {
    const navigate = useNavigate();
    const {user} = AuthUser();
    const [inputs, setInputs] = useState({});
    const fondateur = 0;
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, fondateur }))
    }

    const submitForm = () => {
        http.post('/etablissements', inputs).then((res) => {
            alert("établissement ajouté avec succès !")
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
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Add New School</div>):(<div> Ajouter un nouvel établissement </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Name</div>):(<div> Nom </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Cygle</div>):(<div> Cygle </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cygle" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Email</div>):(<div> Email </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="email" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone </div>)} </Form.Label>
                                                    <Form.Control type="tel" defaultValue="" placeholder="+237" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Post Box</div>):(<div> Boite postal </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="bp" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Website</div>):(<div> Site web </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="site" placeholder="https://www." onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Country</div>):(<div> Pays </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="pays" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Cameroun">{user.langue === "en" ? (<div>Cameroon</div>):(<div> Cameroun </div>)}</option>
                                                        <option value="RCA">RCA</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>City</div>):(<div> Ville </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="ville" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Department</div>):(<div> Département </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="dep" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Address</div>):(<div> Adresse </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="adresse" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>


                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Billing</div>):(<div> Facturation </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="fact" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Par élève">{user.langue === "en" ? (<div>By student</div>):(<div> Par élève </div>)}</option>
                                                        <option value="Par taux">{user.langue === "en" ? (<div>By rate</div>):(<div> Par taux </div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Configuration</div>):(<div> Configuration </div>)} </Form.Label>
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
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Pre-registration payment</div>):(<div> Payer la préinscription </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="preins" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Oui">{user.langue === "en" ? (<div>No</div>):(<div> Non </div>)}</option>
                                                        <option value="Non">{user.langue === "en" ? (<div>Yes</div>):(<div> Oui </div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitForm}>{user.langue === "en" ? (<div>Confirm</div>):(<div> Confirmer </div>)}</Button>
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
