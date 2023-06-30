import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'
const AdminLeconsChapitre = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const [inputs, setInputs] = useState({});
    const { niveau, classe, chapitre, matiere } = useParams();
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
        http.delete('/lecons/' + id).then(res => {
            fetchAllLecons();
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
                                    <h4 className="card-title">Leçons</h4>
                                </div>
                            </Card.Header>
                            <div className="table-responsive">
                                <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                                    <thead>
                                        <tr className="ligth">
                                            <th>Intitulé</th>
                                            <th>Chapitre</th>
                                            <th>Nombre d'heures</th>
                                            <th>Date de début</th>
                                            <th>Date de fin</th>

                                            <th>Description</th>
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

export default AdminLeconsChapitre;