import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import { Toast } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'
const EleveForumDiscussion = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const [inputs, setInputs] = useState({});
    const { matiere } = useParams();

    const etab = user.etablissement;

    return (
        <>
            <div>
                <Row>

                    <Col xl="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between mb-4">
                                <div className="header-title">
                                    <h4 className="card-title">{user.langue === "en" ? (<div> Choice a material </div>):(<div> Choisissez une matière </div>)}e</h4>
                                </div>
                            </Card.Header>

                            <div className="bd-example ">
                                <div className="container">
                                    <div className="bd-example bg-dark p-5 align-items-center">
                                        <Toast className=" fade show align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                                            <div className="d-flex">
                                                <Toast.Body>
                                                    Hello, world! This is a toast message.
                                                </Toast.Body>
                                                <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                                            </div>
                                        </Toast>
                                    </div>
                                </div>
                            </div >
                        </Card >
                    </Col >
                </Row >
            </div >
        </>
    )

}

export default EleveForumDiscussion;
