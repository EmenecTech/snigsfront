import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form } from "react-bootstrap";
import { createPath, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";


import http from "../../../http.js";



//swiper
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";


// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
import Card from "../../../components/Card.js";

// install Swiper modules
SwiperCore.use([Navigation]);




const EditClasses = memo((props) => {
    const { user } = AuthUser();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const etab = user.etablissement;

    const { classe } = useParams();
  


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, classe }))
    }




    const submitForm = () => {
        http.post('/editclasses', inputs).then((res) => {
            alert("Classe modifiée avec succès !");

        })

        console.log(inputs);

    }

    {/*  const [classes, setclasses] = useState([]);

    useEffect(() => {
        fetchfilieres();
    }, []);

    const fetchfilieres = () => {
        http.get('/classes/' + id).then((res) => {
            setInputs({
                niveau: res.data.niveau_classe,

            });
        });
    }; */}

    const [niveaux, setniveaux] = useState([]);
    useEffect(() => {
        fetchAllniveaux(); 
    }, []);

    const fetchAllniveaux = () => {
        http.get('/niveaux').then(res => {
            setniveaux(res.data);
        })
    }



    useSelector(SettingSelector.theme_color);

    const getVariableColor = () => {
        let prefix =
            getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
        if (prefix) {
            prefix = prefix.trim();
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary`
        );
        const color2 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}info`
        );
        const color3 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary-tint-20`
        );
        const color4 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}warning`
        );
        return {
            primary: color1.trim(),
            info: color2.trim(),
            warning: color4.trim(),
            primary_light: color3.trim(),
        };
    };
    const variableColors = getVariableColor();

    const colors = [variableColors.primary, variableColors.info];
    useEffect(() => {
        return () => colors;
    });









    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>Edit Course</div>):(<div> Modifier la Classe </div>)}</h4>
                            </div>


                        </Card.Header>
                        <Card.Body>

                   <Form>
                               <Row>

                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Level</div>):(<div>Niveau</div>)}</Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="niveau" onChange={handleChange} required>
                                                            <option></option>
                                                            {niveaux.map((item) => (
                                                                <option key={item.id} value={item.intitule_niveau}>{item.intitule_niveau}</option>

                                                            ))}

                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                <div className="text-center">
                                    <Button type="button" variant="primary" onClick={submitForm} > {user.langue === "en" ? (<div>Confirm</div>):(<div>Confirmer</div>)}</Button>
                                </div>
                            </Form>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default EditClasses
