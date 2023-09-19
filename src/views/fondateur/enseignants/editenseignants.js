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
         http.get("/editens/" + id).then(res=> {
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
                                    <h4 className="card-title">Modifier un enseignant {ens.nom}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nom </Form.Label>
                                                    <Form.Control type="text" name="nom" value={ens.nom || inputs.nom}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Prenom </Form.Label>
                                                    <Form.Control type="text" name="prenom" value={ens.prenom || inputs.prenom}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Genre </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" value={ens.sexe} onChange={handleChange} >
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
                                                    <Form.Control type="date" name="date_n" value={ens.date_naissance || inputs.date_n}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Lieu de naissance </Form.Label>
                                                    <Form.Control type="text" name="lieu_n" value={ens.lieu_naissance || inputs.lieu_n}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nationalité </Form.Label>
                                                    <Form.Control type="text" name="nation" value={ens.nationalite || inputs.nation}  onChange={handleChange}  />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email </Form.Label>
                                                    <Form.Control type="email" name="email" value={ens.email || inputs.email}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="text" value={ens.telephone || inputs.tel} name="tel"  onChange={handleChange}  />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Numéro CNI / Passeport </Form.Label>
                                                    <Form.Control type="text" name="cni" value={ens.num_cni || inputs.cni}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Matière principale * </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="matiere" value={ ens.fonction_user} onChange={handleChange}>
                                                        <option></option>
                                                        {matieres.map((item)=> (
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
                                                    <select className="form-select mb-3 shadow-none" name="type_user" value={ens.other_in_user} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Permanent">Permanent</option>
                                                        <option value="Vacataire">Vacataire</option>
                                                        <option value="Temporaire">Temporaire</option>
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
