import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';
import AuthUser from '../../../components/AuthUser';

const AddEnseignant = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { user, http } = AuthUser();

    const etab = user.etablissement;

    const [matieres, setmatieres] = useState([]);
    useEffect(() => {
        fetchAllmatieres();
    }, []);

    const fetchAllmatieres = () => {
        http.get('/get_all_matieres_for_enseignant/' + etab).then(res => {
            setmatieres(res.data);
        })
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab }))
    }

    const submitFormadduser = () => {
        http.post('/enseignant', inputs).then((res) => {
            alert("Utilisateur ajouté avec succès !")
            window.location.reload(false);
            navigate('/Add/enseignants/')
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
                                    <h4 className="card-title">Ajouter un enseignant</h4>
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
                                                    <Form.Label htmlFor="exampleInputText1">Prénom </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="prenom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Genre </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Masculin">Masculin</option>
                                                        <option value="Feminin">Feminin</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Date de naissance </Form.Label>
                                                    <Form.Control type="date" defaultValue="" name="date_n" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Lieu de naissance </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="lieu_n" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nationalité </Form.Label>
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
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Numéro CNI / Passeport </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cni" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Matière principale * </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                        <option></option>
                                                        {matieres.map((item) => (
                                                            <option value={item.intitule_matiere}>{item.intitule_matiere}</option>

                                                        ))}

                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Type * </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="type_user" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Permanent">Permanent</option>
                                                        <option value="Vacataire">Vacataire</option>
                                                        <option value="emporaire">Temporaire</option>
                                                        <option value="Saisonnier">Saisonnier</option>
                                                        <option value="Stagiaire">Stagiaire</option>
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

export default AddEnseignant
