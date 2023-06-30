import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'

const Admin_list_Chapitre = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const userid = user.id;

    const [inputs, setInputs] = useState({});
    const { niveau, classe, matiere } = useParams();

    const etab = user.etablissement;

    //listChapitres
    const [Chapitres, setChapitres] = useState([]);

    useEffect(() => {
        fetchAllChapitres()
    }, []);

    const fetchAllChapitres = () => {
        http.get('/get_chapitres_classe/' + etab + '/' + classe + '/' + matiere).then((res) => {
            setChapitres(res.data);
        });
    }

    //addLecons

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, matiere }))
    }

    const submitForm = () => {
        http.post('/chapitres', inputs).then((res) => {
            window.location.reload(false);
        })
        console.log(inputs)
    }

    const deleteChapitres = (id) => {
        http.delete('/chapitres/' + id).then(res => {
            fetchAllChapitres();
        })
    }
    return (
        <>
            <div>
                <Row>

                    <Col xl="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Chapitres</h4>
                                </div>
                            </Card.Header>
                            <div className="table-responsive">
                                <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                                    <thead>
                                        <tr className="ligth">
                                            <th>Intitulé</th>
                                            <th>Nombre d'heures</th>
                                            <th>Date de début</th>
                                            <th>Date de fin</th>
                                            <th>Description</th>
                                            <th min-width="100px">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Chapitres.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.intitule_chapitre}</td>
                                                <td>{item.nombre_heure_chapitre} h</td>
                                                <td>{item.date_debut_chapitre}</td>
                                                <td>{item.date_fin_chapitre}</td>
                                                <td>{item.description_chapitre}</td>

                                                <td>
                                                    <div className="flex align-items-center list-user-action">
                                                        <Link className="btn btn-sm btn-icon btn-info" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Admin/List/Lecons/Cours/" + niveau + "/" + classe + "/" + matiere + "/" + item.intitule_chapitre}>
                                                            Consulter
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    )

}

export default Admin_list_Chapitre;