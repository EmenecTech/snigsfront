import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import AuthUser from '../../../components/AuthUser';
import http from '../../../http';


const AddConfiguration = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const {user} = AuthUser();

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
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Add configuration</div>):(<div> Ajouter une configuration </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Title</div>):(<div> Intitulé </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="intitule" value={inputs.intitule_configuration} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Section</div>):(<div> Section </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="section" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Francophone">{user.langue === "en" ? (<div>French-speaking</div>):(<div> Francophone </div>)}</option>
                                                        <option value="Anglophone">{user.langue === "en" ? (<div>English-speaking</div>):(<div>Anglophone</div>)}</option>
                                                        <option value="Bilingue">{user.langue === "en" ? (<div>Bilingual</div>):(<div>Bilingue</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Type of teaching</div>):(<div> Type d'enseignement </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="type_enseignement" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Général">{user.langue === "en" ? (<div>General</div>):(<div> Général </div>)}</option>
                                                        <option value="Technique">{user.langue === "en" ? (<div>Technical</div>):(<div> Technique </div>)}</option>
                                                        <option value="Mixte">{user.langue === "en" ? (<div>Mixed</div>):(<div>Mixte</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Administrative status</div>):(<div> Statut administratif </div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="statut_administratif" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Privé">{user.langue === "en" ? (<div>Private</div>):(<div>Privé</div>)}</option>
                                                        <option value="Public">{user.langue === "en" ? (<div>Public</div>):(<div>Public</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Teaching level</div>):(<div>Niveau d'enseignement</div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="niveau_enseignement" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Maternelle">{user.langue === "en" ? (<div>Nursery</div>):(<div> Maternelle </div>)}</option>
                                                        <option value="Primaire">{user.langue === "en" ? (<div>Primary</div>):(<div> Primaire </div>)}</option>
                                                        <option value="Secondaire">{user.langue === "en" ? (<div>Secondary</div>):(<div> Secondaire </div>)}</option>
                                                        <option value="Universitaire">{user.langue === "en" ? (<div>University</div>):(<div>Universitaire</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Réligious status</div>):(<div> Statut réligieux </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="statut_religieux" onChange={handleChange}>

                                                        <option></option>
                                                        <option value="Laic">{user.langue === "en" ? (<div>Laic</div>):(<div> Laic </div>)}</option>
                                                        <option value="Catholique">{user.langue === "en" ? (<div>Catholic</div>):(<div> Catholique </div>)}</option>
                                                        <option value="Protestant">{user.langue === "en" ? (<div>Protestant</div>):(<div> Protestant </div>)}</option>
                                                        <option value="Islamique">{user.langue === "en" ? (<div>Islamic</div>):(<div> Islamique </div>)}</option>
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

export default AddConfiguration
