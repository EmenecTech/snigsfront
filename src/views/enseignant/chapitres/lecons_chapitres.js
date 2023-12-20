import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'
const EnseignantLeconChapitre = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const [inputs, setInputs] = useState({});
    const { chapitre, classe, matiere } = useParams();
    const etab = user.etablissement;
    //listLecons
    const [Lecons, setLecons] = useState([]);

    useEffect(() => {
        fetchAllLecons()
    }, []);

    const fetchAllLecons = () => {
        http.get('/lecons_in_chapitre/' + etab + '/' + classe + '/' + matiere + '/' + chapitre).then((res) => {
            setLecons(res.data);
        });
    }

    //addLecons

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, chapitre, classe, matiere }))
    }

    const submitForm = () => {
        http.post('/lecons', inputs).then((res) => {
            window.location.reload(false);
        })

        console.log(inputs)
    }

    const deleteLecons = (id) => {
        if(window.confirm("Voulez-vous supprimer cet élément?")==true){
        http.delete('/lecons/' + id).then(res => {
            fetchAllLecons();
        })
            alert('Supprimé !');
    }
    }
    return (
        <>
            <div>
                <Row>

                    <Col xl="9" lg="8">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title mb-3">{user.langue === "en" ? (<div> Pedagogical follow up sheet - lessons </div>):(<div> Fiche de suivi pédagogique - leçons </div>)}</h4>
                                </div>
                            </Card.Header>
                            <div className="table-responsive">
                                <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                                    <thead>
                                        <tr className="ligth">
                                            <th>{user.langue === "en" ? (<div> Title </div>):(<div> Intitulé </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> Chapter </div>):(<div> Chapitre </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> Number of hours </div>):(<div> Nombre d'heures </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> Start date </div>):(<div> Date de début </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> End date </div>):(<div> Date de fin </div>)}</th>

                                            <th>Description</th>
                                            <th min-width="100px">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Lecons.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.intitule_lecon}</td>
                                                <td>{item.chapitre_lecon}</td>
                                                <td>{item.nombre_heure_lecon}</td>
                                                <td>{item.date_debut_lecon}</td>
                                                <td>{item.date_fin_lecon}</td>
                                                <td>{item.description_lecon}</td>

                                                <td>
                                                    <div className="flex align-items-center list-user-action">

                                                        <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deleteLecons(item.id) }}>
                                                            <span className="btn-inner">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>
                    <Col xl="3" lg="4" className="">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">{user.langue === "en" ? (<div> Add lesson </div>):(<div> Ajouter une leçon </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="intitule_lecon">{user.langue === "en" ? (<div> Title of lesson </div>):(<div> Intitulé de la leçon </div>)}:</Form.Label>
                                        <Form.Control type="text" id="intitule_lecon" name="intitule_lecon"
                                            value={inputs.intitule_lecon || ''}
                                            onChange={handlechange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="nombre_heure">{user.langue === "en" ? (<div> Number of hour </div>):(<div> Nombre d'heure </div>)}:</Form.Label>
                                        <Form.Control type="number" id="nombre_heure" name="nombre_heure"
                                            value={inputs.nombre_heure || ''}
                                            onChange={handlechange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="date_debut_lecon"> {user.langue === "en" ? (<div> Start date </div>):(<div> Date de début </div>)}:</Form.Label>
                                        <Form.Control type="date" id="date_debut_lecon" name="date_debut_lecon"
                                            value={inputs.date_debut_lecon || ''}
                                            onChange={handlechange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="date_fin_lecon">{user.langue === "en" ? (<div> End date </div>):(<div> Date prévu de fin </div>)}:</Form.Label>
                                        <Form.Control type="date" id="date_fin_lecon" name="date_fin_lecon"
                                            value={inputs.date_fin_lecon || ''}
                                            onChange={handlechange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label >{user.langue === "en" ? (<div> Description of lesson </div>):(<div> Description de la leçon </div>)}:</Form.Label>
                                        <Form.Control as="textarea" id="description_lecon" name="description_lecon" rows="5"
                                            value={inputs.description_lecon || ''}
                                            onChange={handlechange}
                                        />
                                    </Form.Group>

                                    <Button type="button" variant="btn btn-primary" onClick={submitForm}>{user.langue === "en" ? (<div> Add </div>):(<div> Ajouter </div>)}</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )

}

export default EnseignantLeconChapitre;
