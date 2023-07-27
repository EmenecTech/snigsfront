import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate, useParams } from "react-router-dom";
//img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";

import http from "../../../http";
import AuthUser from "../../../components/AuthUser";
import Axios from 'axios';

const EditPrivilege = (props) => {




    const navigate = useNavigate();
    const { user } = AuthUser();


    const [inputs, setInputs] = useState({});
    const { id } = useParams();


    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        http.get("/privileges/" + id + "/edit").then((res) => {
            setInputs({
                code: res.data.code_privilege,
                int: res.data.intitule_privilege,
                type: res.data.type_privilege,

        });
    });
};

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const submitForm = () => {

        http.put("/editprivilege/" + id, inputs).then((res) => {
            alert("Privilège modifié avec succès !");
            navigate("/list/Edit/Profil/" + id);
        });

        console.log(inputs);
    };


    
    return (
        <>
            <div>
                <Row>
                        
                    <Col xl="9" lg="8">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Modifier un privilège</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <h2></h2>
                                    <div className="row">
                                        <div className="col-sm-10 justify-content-center">
                                            <Card.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <label>Code:</label>
                                                            <input
                                                                type="text"
                                                                name="code"
                                                                className="form-control mb-2"
                                                                value={inputs.code || ""}
                                                                disabled
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        <Col>
                                                            <label>Intitulé:</label>
                                                            <input
                                                                type="text"
                                                                name="int"
                                                                disabled
                                                                className="form-control mb-2"
                                                                value={inputs.int || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>

                                            <Card.Body>
                                                <Form>
                                                    <Row>
                                                        

                                                        <Col>
                                                            <label>Type:</label>
                                                            <input
                                                                type="text"
                                                                name="type"
                                                                className="form-control mb-2"
                                                                value={inputs.type || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>

                                            <button
                                                type="button"
                                                onClick={submitForm}
                                                className="btn btn-info mt-2"
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EditPrivilege;
