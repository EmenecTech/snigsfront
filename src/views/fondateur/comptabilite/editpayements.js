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
import ClassesProgrammes from "../programme/classes_programme.js";

// install Swiper modules
SwiperCore.use([Navigation]);




const EditPensions = memo((props) => {
    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const { idpension } = useParams();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const etab = user.etablissement;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, idpension }))
    }
    const submitForm = () => {

        http.post('/add/payement/details', inputs).then((res) => {
       
            window.location.reload(false);

        })

        console.log(inputs);

    }

    const submitForm1 = () => {

        http.post('add_classe/payement', inputs).then((res) => {
            navigate('/Admin/Comptabilite/Edit/' + idpension)
  

            alert("Ajouté avec succès!");
                      window.location.reload(false);

        })

        console.log(inputs);

    }
    const [payement, setpayement] = useState([]);
    useEffect(() => {
        fetchAllpayement();
    }, []);

    const fetchAllpayement = () => {
        http.get('/info/payement/' + idpension).then(res => {
            setpayement(res.data);
        })
    }


    const [payementdetails, setpayementdetails] = useState([]);
    useEffect(() => {
        fetchAllpayementdetails();
    }, []);

    const fetchAllpayementdetails = () => {
        http.get('/info/payement/details/' + idpension).then(res => {
            setpayementdetails(res.data);
        })
    }

    const [classes, setclasses] = useState([]);
    useEffect(() => {
        fetchAllclasses();
    }, []);

    const fetchAllclasses = () => {
        http.get('/get_classes/' + etab).then(res => {
            setclasses(res.data);
        })
    }


    const [classespay, setclassespay] = useState([]);
    useEffect(() => {
        fetchAllclassespay();
    }, []);

    const fetchAllclassespay = () => {
        http.get('/list/classe/payement/' + etab + '/' + idpension).then(res => {
            setclassespay(res.data);
        })
    }
//25/07/2023
  const deteleclassepension = (classepens) => {
       if(window.confirm("Voulez-vous supprimer cet élément?") == true){
       http.delete('delete_pension_classe/' + classepens + '/' + idpension).then(res => {
           fetchAllclassespay();
       })
           alert('Supprimé!');
    }
  }

    const deletepensiondetail = (id) => {
         if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('delete_pension_detail/' + id).then(res => {
            fetchAllpayementdetails();
        })
             alert('Supprimé!');
    }
    }

    //27/07/2023
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const submitForm2 = () => {

        http.put('/edit/payement/' + idpension, inputs).then((res) => {
            navigate('/Admin/Comptabilite/Edit/' + idpension)
            window.location.reload(false);

        })

        console.log(inputs);

    }

    useEffect(() => {
        fetchAllpayements();
    }, []);

    const fetchAllpayements = () => {
        http.get('/payements/' + idpension + '/edit').then(res => {
            setInputs({
                int: res.data.intitule_pension,
                tranches: res.data.tranches_pension,
                montant: res.data.montant_pension,
                pdebut: res.data.debut_payement_pension,
                pfin: res.data.fin_payement_pension,
                
        })
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
                <Col sm="7">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>Details</div>):(<div> Détails </div>)}</h4>
                            </div>
                                <Button variant="warning mt-2" onClick={handleShow2}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                                {user.langue === "en" ? (<div>Edit</div>):(<div> Modifier  </div>)}
                            </Button>

                            <Button variant="primary mt-2" onClick={handleShow}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                                {user.langue === "en" ? (<div>Name</div>):(<div> Ajouter </div>)}
                            </Button>
                            {/* <!-- Modal --> */}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title as="h5"> {user.langue === "en" ? (<div>Description of payment</div>):(<div>Description du payement </div>)}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Entitled</div>):(<div>Intitulé</div>)} </Form.Label>
                                                        <Form.Control type="text" defaultValue="" name="int" onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">  {user.langue === "en" ? (<div>Amount</div>):(<div>Montant</div>)}</Form.Label>
                                                        <Form.Control type="number" defaultValue="" name="montant" onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Start of payments</div>):(<div>Debut des payements </div>)}</Form.Label>
                                                        <Form.Control type="date" defaultValue="" name="pdebut" onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Closing of payments</div>):(<div>Clôture des payements </div>)} </Form.Label>
                                                        <Form.Control type="date" defaultValue="" name="pfin" onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>







                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm} >{user.langue === "en" ? (<div>Confirm</div>):(<div> Confirmer </div>)}</Button>
                                        </div>
                                    </Form>
                                </Modal.Body>

                            </Modal>
                        </Card.Header>
                        <Card.Body>
                                
                            
                            {/* <!-- Modal --> */}
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title as="h5">{user.langue === "en" ? (<div>Change of pension</div>):(<div> Modification de la pension </div>)}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Title</div>):(<div> Intitulé </div>)} </Form.Label>
                                                        <Form.Control type="text" defaultValue="" name="int" value={inputs.int || ""} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Amount</div>):(<div> Montant </div>)}</Form.Label>
                                                        <Form.Control type="number" defaultValue="" name="montant" value={inputs.montant || ""} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Number of brackets</div>):(<div> Nombre de tranches </div>)} </Form.Label>
                                                        <Form.Control type="number" defaultValue="" name="tranches" value={inputs.tranches || ""} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Start of payments</div>):(<div> Début des payements </div>)}</Form.Label>
                                                        <Form.Control type="date" defaultValue="" name="pdebut" value={inputs.pdebut || ""} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Closing of payments</div>):(<div> Cloture des payements  </div>)}</Form.Label>
                                                        <Form.Control type="date" defaultValue="" name="pfin" value={inputs.pfin || ""} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm2} >{user.langue === "en" ? (<div>Confirm</div>):(<div> Confirmer </div>)}</Button>
                                        </div>
                                    </Form>
                                </Modal.Body>

                            </Modal>    
                            <h4>Informations</h4>
                            <ul>
                                <li>{user.langue === "en" ? (<div>Entitled</div>):(<div>Intitulé  </div>)} : {payement.intitule_pension}</li>
                                <li>{user.langue === "en" ? (<div>Amount</div>):(<div>Montant </div>)} : {payement.montant_pension}</li>
                                <li>{user.langue === "en" ? (<div>Slice(s)</div>):(<div>Tranche(s)  </div>)} : {payement.tranches_pension}</li>
                                <li>{user.langue === "en" ? (<div>Start of payments</div>):(<div>Début des payements  </div>)}  : {payement.debut_payement_pension}</li>
                                <li> {user.langue === "en" ? (<div>Closing of payments</div>):(<div>Clôture des payements   </div>)}  : {payement.fin_payement_pension}</li>
                            </ul>
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
                                            <th>{user.langue === "en" ? (<div>Entitled</div>):(<div>Intitulé  </div>)} </th>
                                            <th>{user.langue === "en" ? (<div>Amount</div>):(<div>Montant </div>)} </th>
                                            <th>{user.langue === "en" ? (<div>Start of payments</div>):(<div>Début des payements </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Closing of payments</div>):(<div>Clôture des payements</div>)}</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payementdetails.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.intitule_detailpayement}</td>
                                                <td>{item.montant_detailpayement} XAF</td>
                                                <td>{item.debut_detailpayement}</td>
                                                <td>{item.fin_detailpayement}</td>
                                                <td>
                                                    <div className="flex align-items-center list-user-action">

                                                        <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deletepensiondetail(item.id) }} >
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
                <Col sm="5">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>Classes concernées </div>):(<div>Classes concernées  </div>)} </h4>
                            </div>


                            <Button variant="primary mt-2" onClick={handleShow1}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                             {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                            </Button>
                            {/* <!-- Modal --> */}
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title as="h5">{user.langue === "en" ? (<div>Add a new class</div>):(<div>Ajouter une nouvelle classe </div>)}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1">Classes </Form.Label>
                                                        <select className="form-select" name="int" onChange={handleChange}>
                                                            <option></option>
                                                            {classes.map((item) => (
                                                                <option key={item.id} value={item.intitule_classe}>{item.intitule_classe}</option>
                                                            ))}

                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>
                                        </Row>



                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm1} >{user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}</Button>
                                        </div>
                                    </Form>
                                </Modal.Body>

                            </Modal>
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
                                            <th>{user.langue === "en" ? (<div>Class</div>):(<div> Classe </div>)} </th>
                                            <th>{user.langue === "en" ? (<div>Level</div>):(<div>Niveau</div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Action</div>):(<div> Actions </div>)}</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {classespay.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.classe_classepension}</td>
                                                <td>{item.niveau_classe}</td>
                                                <td>
                                                    <div className="flex align-items-center list-user-action">

                                                        <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deteleclassepension(item.classe_classepension) }} >
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
        </Fragment>
    );
})

export default EditPensions
