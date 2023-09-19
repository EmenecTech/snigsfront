import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button, Image, Card } from 'react-bootstrap'
import { createPath, useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import AuthUser from '../../../components/AuthUser';




const EditEnseignants = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { http, user } = AuthUser();
    const { id } = useParams();
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

    const [ens, setens] = useState([]);
    useEffect(() => {
        fetchenseignants();
    }, []);

    const fetchenseignants = () => {
        http.get("/editens/" + id ).then(res => {
            setens(res.data);
        })

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put("/editenseignant/" + id, inputs).then((res) => {
            alert("Enseignant modifié avec succès !");
            navigate('/List/enseignants');
        })

        console.log(inputs);
    }


    return (
        <>
            <div>
                <Row>

                    <Col sm="10" lg="10">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Modifier un enseignant</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nom </Form.Label>
                                                    <Form.Control type="text" name="nom" defaultValue={ens.nom} value={inputs.nom} onChange={handleChange} disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Prenom </Form.Label>
                                                    <Form.Control type="text" name="prenom" defaultValue={ens.prenom} value={inputs.prenom} onChange={handleChange} required disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Genre </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange} disabled>
                                                        <option value={ens.sexe}>{ens.sexe}</option>
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
                                                    <Form.Control type="date" name="date_n" defaultValue={ens.date_naissance} value={inputs.date_n} onChange={handleChange} disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Lieu de naissance </Form.Label>
                                                    <Form.Control type="text" name="lieu_n" defaultValue={ens.lieu_naissance} value={inputs.lieu_n} onChange={handleChange} required disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nationalité </Form.Label>
                                                    <Form.Control type="text" name="nation" defaultValue={ens.nationalite} value={inputs.nation} onChange={handleChange} required disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email </Form.Label>
                                                    <Form.Control type="email" name="email" defaultValue={ens.email} value={inputs.email} onChange={handleChange} required disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="text" defaultValue={ens.telephone} name="tel" value={inputs.tel} onChange={handleChange} required disabled />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Numéro CNI / Passeport </Form.Label>
                                                    <Form.Control type="text" name="cni" defaultValue={ens.num_cni} value={inputs.cni} onChange={handleChange} required disabled />
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
                                                        <option value={ens.fonction_user}>{ens.fonction_user}</option>
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
                                                        <option valeur={ens.other_in_user || ""}>{ens.other_in_user}</option>
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
                                        <Button type="button" variant="primary" onClick={submitForm}>Modifier</Button>
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

export default EditEnseignants 
