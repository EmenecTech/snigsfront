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
                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Add a teacher</div>):(<div>  Ajouter un enseignant  </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Name</div>):(<div> Nom   </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Surname</div>):(<div> Prénom </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="prenom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Gender</div>):(<div> Genre</div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="M"> {user.langue === "en" ? (<div>Male</div>):(<div> Masculin</div>)}</option>
                                                        <option value="F">{user.langue === "en" ? (<div>Female</div>):(<div> Féminin</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Date of birth</div>):(<div>Date de naissance </div>)}</Form.Label>
                                                    <Form.Control type="date" defaultValue="" name="date_n" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Place of birth</div>):(<div>Lieu de naissance </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="lieu_n" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Nationality</div>):(<div>Nationalité </div>)}</Form.Label>
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
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Phone</div>):(<div>Téléphone </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>CNI Number/ Passeport</div>):(<div>Numéro CNI / Passeport</div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cni" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Main material</div>):(<div>Matière principale</div>)}* </Form.Label>
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
                                                        <option value="Permanent">Permanent </option>
                                                        {user.langue === "en" ? (<div><option value="individual">individual </option></div>):(<div><option value="Vacataire">Vacataire </option></div>)}
                                                        {user.langue === "en" ? (<div><option value="Temporary">Temporary</option></div>):(<div><option value="Temporaire">Temporaire </option></div>)}
                                                        {user.langue === "en" ? (<div><option value="Seasonal">Seasonal</option></div>):(<div><option value="Saisonnier">Saisonnier </option></div>)}
                                                        {user.langue === "en" ? (<div><option value="Intern">Intern</option></div>):(<div><option value="Stagiaire">Stagiaire </option></div>)}
                                                     
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>



                                    </Row>





                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitFormadduser}>{user.langue === "en" ? (<div>Confirm </div>):(<div>Confirmer </div>)}</Button>
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
