import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createPath, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card'
import http from '../../../http';


const AddUtilisateurs = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitFormadduser = () => {
        http.post('/newusers_add_by_superdadin', inputs).then((res) => {
            alert("Utilisateur ajouté avec succès !")
            navigate('/utilisateurs/list/super/admin')
        })


        console.log(inputs);
    }

    const [etablissements, setEtablissements] = useState([]);
    useEffect(() => {
        fetchAllEtablissements();
    }, []);

    const fetchAllEtablissements = () => {
        http.get('/fetech/list/etab').then(res => {
            setEtablissements(res.data);
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
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Add a user</div>):(<div>Ajouter un utilisateur</div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Name</div>):(<div>Nom</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>First name</div>):(<div>Prénom</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="prenom" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Gender</div>):(<div>Genre</div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Masculin">{user.langue === "en" ? (<div>Male</div>):(<div>Masculin</div>)}</option>
                                                        <option value="Feminin">{user.langue === "en" ? (<div>Female</div>):(<div>Féminin</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Date of birth</div>):(<div>Date de naissance</div>)}</Form.Label>
                                                    <Form.Control type="date" defaultValue="" name="date_n" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Place of birth</div>):(<div>Lieu de naissance</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="lieu_n" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Nationality</div>):(<div>Nationalité</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nation" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Email</div>):(<div>Email</div>)}</Form.Label>
                                                    <Form.Control type="email" defaultValue="" name="email" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Phone</div>):(<div>Téléphone</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="tel" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Identy Card/passport number</div>):(<div>Numéro CNI/Passeport</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cni" onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Role</div>):(<div>Rôle</div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="role" onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Super adminstrateur">{user.langue === "en" ? (<div>Super administrator</div>):(<div>Super administrateur</div>)}</option>
                                                        <option value="Fondateur">{user.langue === "en" ? (<div>Founder</div>):(<div>Fondateur</div>)}</option>
                                                        <option value="Directeur">{user.langue === "en" ? (<div>Director</div>):(<div>Directeur</div>)}</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>




                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>School</div>):(<div>Etablissement</div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="etab_fondateur" onChange={handleChange}>
                                                        <option></option>
                                                        {etablissements.map((item) => (
                                                            <option value={item.id}>{item.nom_etablissement}</option>
                                                        ))}

                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>





                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitFormadduser}>{user.langue === "en" ? (<div>Confirm</div>):(<div>Confirmer</div>)}</Button>
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

export default AddUtilisateurs
