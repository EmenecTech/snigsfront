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


    useEffect(() => {
        fetchenseignants();
    }, []);
    
    const fetchenseignants = () => {
             http.get("/editadmin/" + id + "/edit").then((res) => {
            setInputs({
                tel: res.data.telephone,
                nom: res.data.nom,
                prenom: res.data.prenom,
                email: res.data.email,
                nationalite: res.data.nationalite,
                cni: res.data.num_cni,
                date_n: res.data.date_naissance,
                lieu_n: res.data.lieu_naissance,
                matiere: res.data.fonction_user,
                type_user: res.data.other_in_user,

            });
        });
    };

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
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Edit a teacher</div>):(<div> Modifier un enseignant</div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Name</div>):(<div>Nom</div>)}</Form.Label>
                                                    <Form.Control type="text" name="nom" value={inputs.nom}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>First name</div>):(<div>Prénom</div>)}</Form.Label>
                                                    <Form.Control type="text" name="prenom" value={inputs.prenom}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Gender</div>):(<div>Genre</div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="genre" value={inputs.genre} onChange={handleChange} >
                                                        <option></option>
                                                        <option value="Masculin">{user.langue === "en" ? (<div>Male</div>):(<div> Masculin</div>)}</option>
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
                                                    <Form.Control type="date" name="date_n" value={inputs.date_n}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Place of birth</div>):(<div>Lieu de naissance</div>)}</Form.Label>
                                                    <Form.Control type="text" name="lieu_n" value={inputs.lieu_n}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Nationality</div>):(<div>Nationalité</div>)}</Form.Label>
                                                    <Form.Control type="text" name="nation" value={inputs.nation}  onChange={handleChange}  />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Email</div>):(<div>Email</div>)}</Form.Label>
                                                    <Form.Control type="email" name="email" value={inputs.email}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Phone</div>):(<div>Téléphone</div>)}</Form.Label>
                                                    <Form.Control type="text" value={inputs.tel} name="tel"  onChange={handleChange}  />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>National identity card / Passport number</div>):(<div>Numéro CNI / Passeport</div>)}</Form.Label>
                                                    <Form.Control type="text" name="cni" value={inputs.cni}  onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Main material</div>):(<div> Matière principal </div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="matiere" value={ inputs.matiere} onChange={handleChange}>
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
                                                    <select className="form-select mb-3 shadow-none" name="type_user" value={inputs.type_user} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Permanent">{user.langue === "en" ? (<div>Permanent</div>):(<div>Permanent</div>)}</option>
                                                        <option value="Vacataire">{user.langue === "en" ? (<div>Temporary</div>):(<div>Vacataire</div>)}</option>
                                                        <option value="Temporaire">{user.langue === "en" ? (<div>Seasonal</div>):(<div>Saisonnier</div>)}</option>
                                                        <option value="Saisonnier">{user.langue === "en" ? (<div>Trainee</div>):(<div>Stagiaire</div>)}</option>
                                    
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitForm}>{user.langue === "en" ? (<div>Modify</div>):(<div>Modifier</div>)}</Button>
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
