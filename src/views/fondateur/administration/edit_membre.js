import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button, Image, Card } from 'react-bootstrap'
import { createPath, useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import AuthUser from '../../../components/AuthUser';
import http from '../../../http';


const EditMembresAdministration = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { user } = AuthUser();
    const { id } = useParams();
    const etab = user.etablissement;

    useEffect(() => {
        fetchmembres();
    }, []);

    const fetchmembres = () => {
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

            });
        });

    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put('/edit_membre_administration/' + id, inputs).then((res) => {
            alert("membre administration modifié avec succès !");
            navigate('/Admin/list');
        })


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

                    <Col sm="10" lg="10">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Edit a member of the administration</div>):(<div> Modifier un membre de l'administration</div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div> Name </div>):(<div> Nom </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" disabled name="nom" value={inputs.nom || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Surname</div>):(<div> Prénom </div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" disabled name="prenom" value={inputs.prenom || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Gender</div>):(<div> Genre  </div>)}</Form.Label>
                                                    <select className="form-select mb-3 shadow-none" disabled name="genre" value={inputs.genre || ""} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="M">M </option>
                                                        <option value="F">F</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Date of birth</div>):(<div> Date de naissance </div>)}</Form.Label>
                                                    <Form.Control type="date" defaultValue="" disabled name="date_n" value={inputs.date_n || ""} onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Place of birth</div>):(<div> Lieu de naissance</div>)}</Form.Label>
                                                    <Form.Control type="text" defaultValue="" disabled name="lieu_n" value={inputs.lieu_n || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Nationality</div>):(<div> Nationalité </div>)} </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nationalite" value={inputs.nationalite || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email</Form.Label>
                                                    <Form.Control type="email" defaultValue="" name="email" value={inputs.email || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="tel" value={inputs.tel || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>



                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Numéro CNI / Passeport </Form.Label>
                                                    <Form.Control type="text" defaultValue="" disabled name="cni" value={inputs.cni || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Fonction </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="role" value={inputs.role || ""} onChange={handleChange}>
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

export default EditMembresAdministration 
