import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form, Card } from "react-bootstrap";
import { createPath, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";




const AllNotes = memo((props) => {

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const { classe, matiere } = useParams();
    const [notes1, setNotes1] = useState([]);
    const [notes2, setNotes2] = useState([]);
    const [notes3, setNotes3] = useState([]);
    const [notes4, setNotes4] = useState([]);
    const [notes5, setNotes5] = useState([]);
    const [notes6, setNotes6] = useState([]);


    
    const evaluation2 = "Semestre 2";
    const evaluation1 = "Semestre 1";




    useEffect(() => {
        fetchAllNotes6();
    }, []);

    const fetchAllNotes6 = () => {
        http.get('/notesseq6_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes6(res.data);

        })

    }

    useEffect(() => {
        fetchAllNotes5();
    }, []);

    const fetchAllNotes5 = () => {
        http.get('/notesseq5_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes5(res.data);

        })

    }

    useEffect(() => {
        fetchAllNotes4();
    }, []);

    const fetchAllNotes4 = () => {
        http.get('/notesseq4_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes4(res.data);

        })

    }

    useEffect(() => {
        fetchAllNotes3();
    }, []);

    const fetchAllNotes3 = () => {
        http.get('/notesseq3_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes3(res.data);

        })

    }

    useEffect(() => {
        fetchAllNotes2();
    }, []);

    const fetchAllNotes2 = () => {
        http.get('/notesseq2_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes2(res.data);

        })

    }

    useEffect(() => {
        fetchAllNotes1();
    }, []);

    const fetchAllNotes1 = () => {
        http.get('/notesseq1_eleves/' + etab + '/' + classe + "/" + matiere + "/" + evaluation1).then(res => {
            setNotes1(res.data);

        })

    }

    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }







    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Evaluations</h4>
                            </div>



                        </Card.Header>
                        <Card.Body>


                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Etudiants</th>
                                        <th>Semestre 1</th>
                                        <th>Semestre 2</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {eleves_classe.map((user) => (
                                        <tr>
                                            <td>
                                                {user.nom}{' '}{user.prenom}
                                            </td>

                                            {notes1.map((item1, index) => (

                                                <td>
                                                    {item1.valeur_note}
                                                </td>
                                            ))}

                                            {notes2.map((item2, index) => (

                                                <td>
                                                    {item2.valeur_note}
                                                </td>
                                            ))}

                                            {notes3.map((item3, index) => (

                                                <td>
                                                    {item3.valeur_note}
                                                </td>
                                            ))}

                                            {notes4.map((item4, index) => (

                                                <td>
                                                    {item4.valeur_note}
                                                </td>
                                            ))}

                                            {notes5.map((item5, index) => (
                                                <td>
                                                    {item5.valeur_note}
                                                </td>
                                            ))}

                                            {notes6.map((item6, index) => (
                                                <td>
                                                    {item6.valeur_note}
                                                </td>
                                            ))}

                                        </tr>

                                    ))}

                                </tbody>
                            </table>


                            {/* <div className="table-responsive border-bottom my-3">
                                <Table
                                    responsive
                                    striped
                                    id="datatable"
                                    className=""
                                    data-toggle="data-table"
                                >
                                    <thead>
                                        <tr>
                                            <th>Intitulé</th>
                                            <th>Type d'évaluation</th>
                                            <th>Type de période</th>
                                            <th>Date de début</th>
                                            <th>Date de fin</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluations_list.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.intitule_evaluation}</td>

                                                <td>{item.type_evaluation_evaluation}</td>
                                                <td>{item.reference_evaluation}</td>
                                                <td>/</td>
                                                <td>/</td>

                                                <td>
                                                    <div className="flex align-items-center list-user-action">

                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Enseignant/List/Notes/" + item.intitule_evaluation + "/" + classe + "/" + matiere}>
                                                            <span className="btn-inner">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </Table>

                            </div> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default AllNotes
