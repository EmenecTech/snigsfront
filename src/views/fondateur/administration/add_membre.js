import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';
import AuthUser from '../../../components/AuthUser';

const AddMembreAdministration = () => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const [inputs, setInputs] = useState({});
    const etab = user.etablissement;



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab }))
    }

    const submitFormadduser = () => {
        http.post('/administration_membres', inputs).then((res) => {
            alert("Utilisateur ajouté avec succès !")
            navigate('/Admin/list')
        })


        console.log(inputs);
    }



    const [roles, setroles] = useState([]);
    useEffect(() => {
        fetchAllroles();
    }, []);

    const fetchAllroles = () => {
        http.get('/get_roles/' + etab).then(res => {
            setroles(res.data);
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
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Add a member of the administration</div>):(<div> Ajouter un membre de l'administration </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Name</div>):(<div> Nom  </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Surname</div>):(<div> Prénom </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Gender</div>):(<div> Genre  </div>)} </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="M">{user.langue === "en" ? (<div>Male</div>):(<div> Masculin  </div>)} </option>
                                                        <option value="F">{user.langue === "en" ? (<div>Female</div>):(<div> Féminin </div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Date of birth</div>):(<div> Date de naissance </div>)}</Form.Label>
                                                    <Form.Control type="date" defaultValue="" name="date_n" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Place of birth</div>):(<div> Lieu de naissance</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="lieu_n" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Nationality</div>):(<div> Nationalité </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nation" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email </Form.Label>
                                                    <Form.Control type="email" defaultValue="" name="email" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone</div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Numéro CNI / Passeport </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cni" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Fonction </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="role" onChange={handleChange}>
                                                        <option></option>
                                                        {roles.map((item) => (
                                                            <option key={item.id} value={item.intitule_role}>{item.intitule_role}</option>

                                                        ))}

                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>



                                    </Row>





                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitFormadduser}>Confirmer</Button>
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

export default AddMembreAdministration
