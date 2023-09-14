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




const EditClasseProgramme = memo((props) => {
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

    const confirmPlanning = () => {
        http.get('/add_programme_classe/' + classe + '/' + idprogramme + '/' + etab).then((res) => {
            alert("Programme confirmé !");
            navigate('/Classes/programmes/' + etab)
        })
        console.log(idprogramme);

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

    const deleteProgramme = (id) => {
         if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/programme/' + id).then(res => {
            fetchAlllundi();
            fetchAllmardi();
            fetchAllmercredi();
            fetchAlljeudi();
            fetchAlljeudi();
            fetchAllsamedi();
            fetchAlldimanche();

        })
             alert('Supprimé!');
    }
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
                            <Button variant="primary mt-2" onClick={confirmPlanning}>

                              {user.langue === "en" ? (<div>Confirm program</div>):(<div>   Confirmer le programme </div>)}
                            </Button>


                            <Button variant="primary mt-2" onClick={handleShow}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                              {user.langue === "en" ? (<div>Add</div>):(<div>     Ajouter </div>)}
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
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Day</div>):(<div>Jour </div>)}*</Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="jour" onChange={handleChange} required>
                                                            <option></option>
                                                            <option value="Lundi">{user.langue === "en" ? (<div>Monday</div>):(<div>Lundi  </div>)}</option>
                                                            <option value="Mardi">{user.langue === "en" ? (<div>Tuesday</div>):(<div>Mardi </div>)}</option>
                                                            <option value="Mercredi">{user.langue === "en" ? (<div>Wednesday</div>):(<div>Mercredi  </div>)}</option>
                                                            <option value="Jeudi">{user.langue === "en" ? (<div>Thursday</div>):(<div>Jeudi </div>)}</option>
                                                            <option value="Vendredi">{user.langue === "en" ? (<div>Friday</div>):(<div>Vendredi </div>)}</option>
                                                            <option value="Samedi">{user.langue === "en" ? (<div>Saturday</div>):(<div>Samedi </div>)}</option>
                                                            <option value="Dimanche">{user.langue === "en" ? (<div>Sunday</div>):(<div>Dimanche  </div>)}</option>
                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row>


                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Course</div>):(<div>Matières  </div>)} *</Form.Label>
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
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Start time</div>):(<div>Heure de début </div>)}*</Form.Label>

                                                        <Form.Control type="time" defaultValue="" name="heured" onChange={handleChange} required />

                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>End time</div>):(<div>Heure de fin </div>)}*</Form.Label>

                                                        <Form.Control type="time" defaultValue="" name="heuref" onChange={handleChange} required />

                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                        </Row>






                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm} > {user.langue === "en" ? (<div>Confirm</div>):(<div>Confirmer </div>)}</Button>
                                        </div>
                                    </Form>
                                </Modal.Body>

                            </Modal>
                        </Card.Header>
                        <Card.Body>

                            <div>
                                <Row>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Monday</div>):(<div>Lundi </div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lundi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">{user.langue === "en" ? (<div>Tuesday</div>):(<div>Mardi  </div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mardi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>


                                    </Col>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">{user.langue === "en" ? (<div>Tuesday</div>):(<div>Mercredi</div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mercredi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>

                                    </Col>


                                </Row>
                                <Row>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">{user.langue === "en" ? (<div>Thursday</div>):(<div>Jeudi  </div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {jeudi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Friday</div>):(<div>Vendredi </div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {vendredi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>


                                    </Col>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Saturday</div>):(<div>Samedi</div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {samedi.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Card.Body>
                                        </Card>

                                    </Col>


                                </Row>
                                <Row>
                                    <Col sm="4" lg="4">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title"> {user.langue === "en" ? (<div>Sunday</div>):(<div>Dimanche</div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
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

                                                                <th> {user.langue === "en" ? (<div>Time slot</div>):(<div>Tranche Horraire </div>)}</th>
                                                                <th> {user.langue === "en" ? (<div>Subject or activity</div>):(<div>Matière ou activité</div>)}</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dimanche.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.heure_d_programme}  - {item.heure_f_programme}</td>
                                                                    <td>{item.matiere_programme}</td>

                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">


                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteProgramme(item.id) }}>
                                                                                <span className="btn-inner">
                                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </Link>{' '}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

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

export default EditClasseProgramme
