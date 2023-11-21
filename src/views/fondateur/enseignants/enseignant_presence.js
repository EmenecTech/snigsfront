import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Image, Button } from 'react-bootstrap'
import { Form, Link } from 'react-router-dom'
import Card from '../../../components/Card'
import AuthUser from '../../../components/AuthUser'




const EnseignantsPresence = () => {

    const { http, setToken } = AuthUser();
    const [users, setUser] = useState([]);
    const { user } = AuthUser();

    const etab = user.etablissement;


    useEffect(() => {
        fetchAllUser();
    }, []);

    const fetchAllUser = () => {
        http.get('/get_enseignants/' + etab).then(res => {
            setUser(res.data);
        })
    }



    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Enseignants</h4>
                                </div>
                                <Form>
                                    <Form.Group as={Row} className="form-group">
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="exampleInputText1">Date</Form.Label>
                                            <Form.Control type="date" defaultValue="" name="date_n"/>           
                                        </Form.Group>
                                    </Form.Group>
                                    <Button type="button" variant="primary">Trier</Button>
                                </Form>
                                
                            </Card.Header>
                            <Card.Body className="px-0">
                                <div className="table-responsive">
                                    <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                                        <thead>
                                            <tr className="ligth">
                                                <th>Profile</th>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>Matière principale</th>
                                                <th>Type</th>
                                                <th>Email</th>
                                                <th>Téléphone</th>
                                                <th min-width="100px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="text-center"><Image className="bg-soft-primary rounded img-fluid avatar-40 me-3" src={item.img} alt="profile" /></td>
                                                        <td>{item.nom}</td>
                                                        <td>{item.prenom}</td>
                                                        <td>{item.fonction_user}</td>
                                                        <td>{item.other_in_user}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.telephone}</td>

                                                        <td>
                                                            <div className="flex align-items-center list-user-action">

                                                                <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to="#">
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )

}

export default EnseignantsPresence;
