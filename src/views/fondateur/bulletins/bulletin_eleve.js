import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form, Image } from "react-bootstrap";
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

import avatars11 from '../../../assets/images/avatars/01.png'
import avatars22 from '../../../assets/images/avatars/avtar_1.png'
import avatars33 from '../../../assets/images/avatars/avtar_2.png'
import avatars44 from '../../../assets/images/avatars/avtar_3.png'
import avatars55 from '../../../assets/images/avatars/avtar_4.png'
import avatars66 from '../../../assets/images/avatars/avtar_5.png'
import avatars2 from '../../../assets/images/avatars/02.png'
import avatars3 from '../../../assets/images/avatars/03.png'
import avatars4 from '../../../assets/images/avatars/04.png'
import avatars5 from '../../../assets/images/avatars/05.png'

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
import Card from "../../../components/Card.js";

// install Swiper modules
SwiperCore.use([Navigation]);




const BulletinEleve = memo((props) => {
    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { niveau, classe, idprogramme } = useParams();
    const etab = user.etablissement;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, classe, idprogramme }))
    }


    const submitForm = () => {
        http.post('/add_detail_programme_classe', inputs).then((res) => {
            alert("Programme édité avec succès !")
            navigate('/Edit/programmes/' + niveau + '/' + classe + '/' + idprogramme)
            window.location.reload(false);
        })
        console.log(inputs);

    }

    const [matiereslevel, setmatiereslevel] = useState([]);
    useEffect(() => {
        fetchAllmatiereslevel();
    }, []);

    const fetchAllmatiereslevel = () => {
        http.get('/get_matieres_niveau_planning/' + niveau + '/' + etab).then(res => {
            setmatiereslevel(res.data);
        })
    }

    const [matieresclasse, setmatieresclasse] = useState([]);
    useEffect(() => {
        fetchAllmatieresclasse();
    }, []);

    const fetchAllmatieresclasse = () => {
        http.get('/get_matieres_classe_planning/' + classe + '/' + etab).then(res => {
            setmatieresclasse(res.data);
        })
    }

    const [lundi, setlundi] = useState([]);
    useEffect(() => {
        fetchAlllundi();
    }, []);

    const fetchAlllundi = () => {
        http.get('/get_lundi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setlundi(res.data);
        })
    }

    const [mardi, setmardi] = useState([]);
    useEffect(() => {
        fetchAllmardi();
    }, []);

    const fetchAllmardi = () => {
        http.get('/get_mardi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setmardi(res.data);
        })
    }

    const [mercredi, setmercredi] = useState([]);
    useEffect(() => {
        fetchAllmercredi();
    }, []);

    const fetchAllmercredi = () => {
        http.get('/get_mercredi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setmercredi(res.data);
        })
    }

    const [jeudi, setjeudi] = useState([]);
    useEffect(() => {
        fetchAlljeudi();
    }, []);

    const fetchAlljeudi = () => {
        http.get('/get_jeudi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setjeudi(res.data);
        })
    }
    const [vendredi, setvendredi] = useState([]);
    useEffect(() => {
        fetchAllvendredi();
    }, []);

    const fetchAllvendredi = () => {
        http.get('/get_vendredi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setvendredi(res.data);
        })
    }
    const [samedi, setsamedi] = useState([]);
    useEffect(() => {
        fetchAllsamedi();
    }, []);

    const fetchAllsamedi = () => {
        http.get('/get_samedi/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setsamedi(res.data);
        })
    }

    const [dimanche, setdimanche] = useState([]);
    useEffect(() => {
        fetchAlldimanche();
    }, []);

    const fetchAlldimanche = () => {
        http.get('/get_dimanche/' + classe + '/' + etab + '/' + idprogramme).then(res => {
            setdimanche(res.data);
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
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Classes</h4>
                            </div>


                            <Button variant="primary mt-2" onClick={handleShow}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                                Ajouter
                            </Button>
                            {/* <!-- Modal --> */}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title as="h5">Edition du programme</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>

                                        <Row>


                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">Jour *</Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="jour" onChange={handleChange} required>
                                                            <option></option>
                                                            <option value="Lundi">Lundi</option>
                                                            <option value="Mardi">Mardi</option>
                                                            <option value="Mercredi">Mecredi</option>
                                                            <option value="Jeudi">Jeudi</option>
                                                            <option value="Vendredi">Vendredi</option>
                                                            <option value="Samedi">Samedi</option>
                                                            <option value="Dimanche">Dimanche</option>
                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row>


                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">Matières *</Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange} required>
                                                            <option></option>
                                                            {matiereslevel.map((item) => (
                                                                <option key={item.id} value={item.matiere_cm}>{item.matiere_cm}</option>

                                                            ))}
                                                            {matieresclasse.map((item) => (
                                                                <option key={item.id} value={item.matiere_cm}>{item.matiere_cm}</option>

                                                            ))}

                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">Heure de début *</Form.Label>

                                                        <Form.Control type="time" defaultValue="" name="heured" onChange={handleChange} required />

                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">Heure de fin *</Form.Label>

                                                        <Form.Control type="time" defaultValue="" name="heuref" onChange={handleChange} required />

                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>






                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm} >Confirmer</Button>
                                        </div>
                                    </Form>
                                </Modal.Body>

                            </Modal>
                        </Card.Header>
                        <Card.Body>

                            <div>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    <Row>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIQUE DU CAMEROUN <br />
                                                                Paix - Travail - Patrie <br />
                                                                MINISTERE DES ENSEIGNEMENTS SECONDAIRES <br />
                                                                <smal>BP: Tel:</smal>
                                                            </p>


                                                        </Col>
                                                        <Col sm="4" lg="4" className="d-flex justify-content-center">
                                                            <div className="user-profile">
                                                                <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={avatars11} alt="profile-pic" />
                                                                <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src={avatars22} alt="profile-pic" />
                                                                <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src={avatars33} alt="profile-pic" />
                                                                <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src={avatars55} alt="profile-pic" />
                                                                <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src={avatars66} alt="profile-pic" />
                                                                <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src={avatars44} alt="profile-pic" />
                                                            </div>


                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                Peace - Work - Fatherland <br />
                                                                MINISTRY OF SECONDARY EDUCATION <br />
                                                                <smal>BP: Tel:</smal>
                                                            </p>


                                                        </Col>

                                                    </Row>
                                                    <Row className="mt-4">
                                                        <Col sm="4" lg="4">


                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">
                                                                Intitulé du bulletin
                                                                <hr />
                                                                ANNEE SCOLAIRE
                                                            </p>


                                                        </Col>
                                                        <Col sm="4" lg="4">


                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col sm="4" lg="4">
                                                            <Row>
                                                                <Col sm="6" lg="6">
                                                                    <div className="mt-2">
                                                                        <h6 className="mb-0">Classe:</h6>
                                                                        <p>Class</p>
                                                                    </div>

                                                                </Col>
                                                                <Col sm="6" lg="6">
                                                                    <div className="mt-2">
                                                                        <h6 className="mb-0">Effectif:</h6>
                                                                        <p>Number</p>
                                                                    </div>
                                                                </Col>

                                                            </Row>

                                                            <div className="mt-2">
                                                                <h6 className="mb-0">Nom et Prénom:</h6>
                                                                <p>Name and Surname</p>
                                                            </div>

                                                            <div className="mt-1">
                                                                <Row>
                                                                    <Col sm="6" lg="6">
                                                                        <div className="mt-1">
                                                                            <h6 className="mb-1">Né(e) le:</h6>
                                                                            <p>Born on</p>
                                                                        </div>

                                                                    </Col>
                                                                    <Col sm="6" lg="6">
                                                                        <div className="mt-2">
                                                                            <h6 className="mb-0">A:</h6>
                                                                            <p>AT</p>
                                                                        </div>
                                                                    </Col>

                                                                </Row>
                                                            </div>
                                                            <div className="mt-1">
                                                                <h6 className="mb-1">Adresse du parent ou tuteur:</h6>
                                                                <p>Parent's/guardian's Address</p>
                                                            </div>

                                                        </Col>
                                                        <Col sm="4" lg="4">

                                                            <div className="mt-2">
                                                                <h6 className="mb-0">N° Matricule:</h6>
                                                                <p>Registration N°</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <h6 className="mb-0">Redoublant:</h6>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <h6 className="mb-0">Sexe:</h6>
                                                                <p>Sex</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <h6 className="mb-0">Professeur princiapal:</h6>
                                                                <p>Class Master/Mistress</p>
                                                            </div>


                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <div className="bd-example">
                                                                <figure className="figure">
                                                                    <svg className="bd-placeholder-img figure-img img-fluid rounded" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 400x300" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="42%" y="50%" fill="#dee2e6" dy=".3em">400x300</text></svg>
                                                                    <figcaption className="figure-caption">A caption for the above image.</figcaption>
                                                                </figure>
                                                            </div>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <div className="table-responsive border-bottom my-3">
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>

                                                                        <th><p>
                                                                            Discipline
                                                                            <br />Nom de l'enseignant
                                                                        </p></th>
                                                                        <th>Note</th>
                                                                        <th>Coef</th>
                                                                        <th>NxC</th>
                                                                        <th>Compétence visée</th>
                                                                        <th>Appreciation</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                    </tr>
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du premier groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                    </tr>
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du deuxième groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                        <td>A</td>
                                                                    </tr>
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du troisième groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>T</td>
                                                                        <td>T</td>
                                                                        <td>T</td>
                                                                        <td>A</td>
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>

                                                                        <th>DISCIPLINE</th>
                                                                        <th>APPRECIATION DU TRAVAIL</th>
                                                                        <th><div className="mt-2">
                                                                            <h6 className="mb-0">MOYENNE:</h6>
                                                                        </div>
                                                                            <div className="mt-2">
                                                                                <h6 className="mb-0">MOYENNE:</h6>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <h6 className="mb-0">MENTION:</h6>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <div className="mt-2">
                                                                                <p>Abscences non justifiées :
                                                                                    <br />
                                                                                    Abscences non justifiées :
                                                                                    <br />
                                                                                    Abscences justifiées:
                                                                                    <br />
                                                                                    Avertissement conduite:
                                                                                    <br />
                                                                                    Blame conduite:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-2">
                                                                                <p>Tableau d'honneur:
                                                                                    <br />
                                                                                    Encouragement:
                                                                                    <br />
                                                                                    Félicitations:
                                                                                    <br />
                                                                                    Prime:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-2">
                                                                                <p>Moyenne de la classe:
                                                                                    <br />
                                                                                    Moyenne du premier:
                                                                                    <br />
                                                                                    Moyenne du dernier:

                                                                                </p>

                                                                            </div>
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>


                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>


                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default BulletinEleve
