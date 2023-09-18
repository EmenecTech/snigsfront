import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form } from "react-bootstrap";
import { createPath, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";


import http from "../../../http.js";

//circular
import Circularprogressbar from "../../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../../node_modules/aos/dist/aos";
import "../../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../../components/progress.js";

//img
import shapes1 from "../../../assets/images/shapes/01.png";
import shapes2 from "../../../assets/images/shapes/02.png";
import shapes3 from "../../../assets/images/shapes/03.png";
import shapes4 from "../../../assets/images/shapes/04.png";
import shapes5 from "../../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
import Card from "../../../components/Card.js";

// install Swiper modules
SwiperCore.use([Navigation]);




const EditEleve = memo((props) => {
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    
    const { niveau, id } = useParams();
    const etab = user.etablissement;






    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, id, etab }))
    }




    const submitForm = () => {
        http.put('/modif_eleve_in_classe', inputs).then((res) => {
            alert("Modification effectuée !")
            window.location.reload(false);

        })
        console.log(inputs);
    }

    const submitNiv = () => {
        http.put('/modif_niveau_eleve', inputs).then((res) => {
            alert("Niveau modifié !")
            window.location.reload(false);
        })
        console.log(inputs);
    }

    const submitClass = () => {
        http.put('eleve_in_classe/', inputs).then((res) => {
            alert("Classe modifiée !")
            window.location.reload(false);
        })
        console.log(inputs);
    }


    const [niveaux, setniveaux] = useState([]);
    useEffect(() => {
        fetchAllniveaux();
    }, []);

    const fetchAllniveaux = () => {
        http.get('/niveaux').then(res => {
            setniveaux(res.data);
        })
    }


    const [eleve, seteleve] = useState([]);
    useEffect(() => {
        fetchAlleleve();
    }, []);

    const fetchAlleleve = () => {
        http.get('/get_eleve_info/' + id).then(res => {
            seteleve(res.data);
        })
    }

    const [classes, setclasses] = useState([]);
    useEffect(() => {
        fetchAllclasses();
    }, []);

    const fetchAllclasses = () => {
        http.get('/get_niveau_classes/' + etab + '/' + niveau).then(res => {
            setclasses(res.data);
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

    useEffect(() => {
        AOS.init({
            startEvent: "DOMContentLoaded",
            disable: function () {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10,
        });
    });
    const chart1 = {
        options: {
            chart: {
                fontFamily:
                    '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: false,
                },
            },
            colors: colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    minWidth: 19,
                    maxWidth: 19,
                    style: {
                        colors: "#8A92A6",
                    },
                    offsetX: -5,
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                labels: {
                    minHeight: 22,
                    maxHeight: 22,
                    show: true,
                    style: {
                        colors: "#8A92A6",
                    },
                },
                lines: {
                    show: false, //or just here to disable only x axis grids
                },
                categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
            },
            grid: {
                show: false,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    shadeIntensity: 0,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 50, 80],
                    colors: colors,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        series: [
            {
                name: "total",
                data: [94, 80, 94, 80, 94, 80, 94],
            },
            {
                name: "pipline",
                data: [72, 60, 84, 60, 74, 60, 78],
            },
        ],
    };

    //chart2
    const chart2 = {
        options: {
            colors: colors,
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 10,
                        size: "50%",
                    },
                    track: {
                        margin: 10,
                        strokeWidth: "50%",
                    },
                    dataLabels: {
                        show: false,
                    },
                },
            },
            labels: ["Apples", "Oranges"],
        },
        series: [55, 75],
    };
    const chart3 = {
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "28%",
                    endingShape: "rounded",
                    borderRadius: 5,
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
                labels: {
                    minHeight: 20,
                    maxHeight: 20,
                    style: {
                        colors: "#8A92A6",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "",
                },
                labels: {
                    minWidth: 19,
                    maxWidth: 19,
                    style: {
                        colors: "#8A92A6",
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands";
                    },
                },
            },
        },
        series: [
            {
                name: "Successful deals",
                data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
            },
            {
                name: "Failed deals",
                data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
            },
        ],
    };










    return (
        <Fragment>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">

                        </Card.Header>
                        <Card.Body>

                        <Form>
                        <Row>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">{user.langue === "en" ? (<div>Level</div>):(<div>Niveau</div>)}</Form.Label>
                                <select className="form-select mb-3 shadow-none" name="niveau" >
                                    <option>{niveau}</option>
                                    {niveaux.map((item) => (
                                        <option key={item.id} value={item.intitule_niveau}>{item.intitule_niveau}</option>
                                    ))}


                                </select>
                            </Form.Group>
                        </Col>

                        <div className="text-center mt-2">
                                <Button type="button" variant="primary" onClick={submitNiv} > {user.langue === "en" ? (<div>Edit</div>):(<div>Modifier</div>)}</Button>
                        </div>
                        </Row>

                        <div className="divider"></div>

                        <Row>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">{user.langue === "en" ? (<div>Choose the class</div>):(<div>Choisissez la classe</div>)}</Form.Label>
                                <select className="form-select mb-3 shadow-none" name="classe" >
                                    <option>{eleve.other_in_user}</option>
                                    {classes.map((item) => (
                                        <option key={item.id} value={item.intitule_classe}>{item.intitule_classe}</option>
                                    ))}


                                </select>
                            </Form.Group>
                        </Col>

                        <div className="text-center mt-2">
                                <Button type="button" variant="primary" onClick={submitClass} > {user.langue === "en" ? (<div>Edit</div>):(<div>Modifier</div>)}</Button>
                        </div>
                        </Row>

                        <div className="divider"></div>

                        <Row>
                        <Col>

                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">{user.langue === "en" ? (<div>Name </div>):(<div> Nom </div>)}</Form.Label>
                                <Form.Control type="text" id="exampleInputReadonly"  defaultValue={eleve.nom} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">{user.langue === "en" ? (<div>Surname</div>):(<div>Prénom </div>)}</Form.Label>
                                <Form.Control type="text" id="exampleInputReadonly"  defaultValue={eleve.prenom} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        
                        </Row>
    <Row>
                        
                        
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">{user.langue === "en" ? (<div>Is the student a repeat student?</div>):(<div>L'élève est-il  redoublant?</div>)}</Form.Label>
                                <select className="form-select mb-3 shadow-none" name="redouble" onChange={handleChange} >
                                    <option></option>
                                    
                                        <option value='oui'>Oui</option>
                                        <option value='non'>Non</option>
    
                                    


                                </select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Health situation</div>):(<div>Situation santé</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="situation"                                 
                                 defaultValue={eleve.situation}
                                  onChange={handleChange}

                                  
                                />
                            </Form.Group>
                        </Col>
    
                                      </Row>
                                      <Row>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Nature of the problem and action to be taken</div>):(<div>Nature du problème et disposition à prendre</div>)}
                                </Form.Label>
                                <Form.Control
                                  as="textarea" id="desc_sante" name="desc_sante" rows="5"
                                  onChange={handleChange}
                                  defaultValue={eleve.desc_sante}
                                />
                            </Form.Group>
                        </Col>
                                      </Row>
                                      
                                      <Row>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>father's name</div>):(<div>  Nom du père</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.nom_parent}
                                  name="nom_parent"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Father's first name</div>):(<div>  Prénom du père</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.prenom_parent}
                                  name="prenom_parent"
                                  onChange={handleChange}

                                />
                       
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Father's contact 1</div>):(<div>Contact du père</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.numero_parent}
                                  name="numero_parent"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                                      
                                      </Row>
                                      <Row>
                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Father's profession</div>):(<div>Profession du père</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.profession_1}
                                  name="profession_1"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>

                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Father's address</div>):(<div>Adresse du père</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.adresse_parent}
                                  name="adresse_parent"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                                      </Row>

                                      <Row>
                                      
                        
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Mother's name</div>):(<div>Nom de la mère</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.nom_parent_2}
                                  name="nom_parent_2"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>

                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Mother's surname 2</div>):(<div>Prénom de la mère</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.prenom_parent_2}
                                  name="prenom_parent_2"
                                  onChange={handleChange}

                                />
                       
                            </Form.Group>
                        </Col>
                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Mother's contact 2</div>):(<div>Contact de la mère</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.numero_parent_2}
                                  name="numero_parent_2"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                                      </Row>
                                      <Row>
                        
                        
                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Mother's profession</div>):(<div>  Profession de la mère</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.profession_2}
                                  name="profession_2"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                                      <Col>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="exampleInputReadonly">
                                {user.langue === "en" ? (<div>Mother's address</div>):(<div>Adresse de la mère</div>)}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={eleve.adresse_parent_2}
                                  name="adresse_parent_2"
                                  onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                                      
                                      </Row>
                                     


                            <div className="text-center mt-2">
                                <Button type="button" variant="primary" onClick={submitForm} > {user.langue === "en" ? (<div>Edit</div>):(<div>Modifier</div>)}</Button>
                            </div>
                        </Form>    
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default EditEleve
