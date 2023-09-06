import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'

const Enseignant_cdtextes_Chapitres = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const { classe } = useParams();
    const etab = user.etablissement;
    const userid = user.id;

    const [inputs, setInputs] = useState({});
    const { matiere, idperiode } = useParams();

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
        if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/chapitres/' + id).then(res => {
            fetchAllChapitres();
        })
            alert('Supprimé!')
    }
    }
    return (
        <>
            <div>
                <Row>

                    <Col xl="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">{user.langue === "en" ? (<div> chapters </div>):(<div> chapitres </div>)}</h4>
                                </div>
                            </Card.Header>
                            <div className="table-responsive">
                                <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                                    <thead>
                                        <tr className="ligth">
                                            <th>{user.langue === "en" ? (<div> title </div>):(<div> intitulé </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> number of hours </div>):(<div> Nombres d'heures </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> start date </div>):(<div> date de début </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> end date </div>):(<div> date de fin </div>)}</th>
                                            <th>{user.langue === "en" ? (<div> description  </div>):(<div> description </div>)}</th>
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
                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Enseignant/Edit/Text/Book/" + classe + "/" + matiere + "/" + item.intitule_chapitre + "/" + idperiode}>
                                                            <span className="btn-inner">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>{' '}

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

export default Enseignant_cdtextes_Chapitres;
