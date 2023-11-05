import React, { useState, useEffect, memo, Fragment, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";

// install Swiper modules
SwiperCore.use([Navigation]);




const NiveauxStat = memo((props) => {

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "employee data",
        onafterprint: () => alert("print success"),
    });

    const { user, http } = AuthUser();
    const {niveau} = useParams();

    const etab = user.etablissement;
    
    const [info_etab, setinfo_etab] = useState([]);
    useEffect(() => {
        fetchAllinfo_etab()
    }, []);

    const fetchAllinfo_etab = () => {
        http.get('/get_name_logo/' + etab).then((res) => {
            setinfo_etab(res.data);
        });
    }

    const [total_eleves, settotal_eleves] = useState([]);
    useEffect(() => {
      fetchAlltotal_eleves();
    }, []);
    const fetchAlltotal_eleves = () => {
        http.get("/nbreleves_niveau/" + etab + '/' + niveau).then((res) => {
          settotal_eleves(res.data);
        });
      };
    const [total_eleves_redoublant, settotal_eleves_redoublants] = useState([]);
    useEffect(() => {
      fetchAlltotal_eleves_redoublants();
    }, []);
    const fetchAlltotal_eleves_redoublants = () => {
        http.get("/nbrredoublant_niveau/" + etab + '/' + niveau).then((res) => {
          settotal_eleves_redoublants(res.data);
        });
      };
    const [total_garcons, settotal_garcons] = useState([]);
      useEffect(() => {
        fetchAlltotal_garcons();
      }, []);
    
      const fetchAlltotal_garcons = () => {
        http.get("/nbreleve_garcon_niveau/" + etab + '/' + niveau).then((res) => {
          settotal_garcons(res.data);
        });
      };
      
      const [total_redoublant, settotal_redoublant] = useState([]);
      useEffect(() => {
        fetchAlltotal_redoublants();
      }, []);
    
      const fetchAlltotal_redoublants = () => {
        http.get("/nbreleve_redoublant_niveau/" + etab + '/' + niveau).then((res) => {
          settotal_redoublant(res.data);
        });
          
      };
        const [total_filles, settotal_filles] = useState([]);
      useEffect(() => {
        fetchAlltotal_filles();
      }, []);
    
      const fetchAlltotal_filles = () => {
        http.get("/nbreleve_fille_niveau/" + etab + "/" + niveau).then((res) => {
          settotal_filles(res.data);
        });
          console.log(etab);
      };
      
      const [total_redoublante, settotal_redoublante] = useState([]);
      useEffect(() => {
        fetchAlltotal_redoublantes();
      }, []);
    
      const fetchAlltotal_redoublantes = () => {
        http.get("/nbreleve_redoublante_niveau/" + etab + '/' + niveau).then((res) => {
          settotal_redoublante(res.data);
        });
      };


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
                                <h4 className="card-title">niveaux</h4>
                            </div>
                         <Button variant="primary mt-2" onClick={printData}>
                                Imprimer
                            </Button>

                        </Card.Header>
                        <Card.Body>

                        <div ref={componentRef}
                            style={{ width: "100%", height: window.innerHeight }}>
                         <div ref={componentRef}
                                style={{ width: "100%", height: window.innerHeight }}>

                                <Col sm="12" className="d-flex align-items-center justify-content-center mt-1 mb-2">
                                    <Row>
                                        <Col sm="3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Image
                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid black",
                                                        display: "block",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm="6" className="mt-4">
                                            {" "}

                                            <div>
                                                <h5 className="text-center" style={{ fontSize: "14px" }}> {info_etab.nom_etablissement}</h5>
                                            </div>

                                            <div className="col-sm-12 justify-content-center">
                                                <h5 className="text-center">

                                                </h5>
                                            </div>
                                            {" "}
                                        </Col>
                                        <Col sm="3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Image
                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid black",
                                                        display: "block",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }}
                                                />
                                            </div>
                                        </Col>


                                    </Row>
                                </Col>

                                <div className="header-title mb-2">
                                    <h4 className="card-title">Classe : {classe}</h4>
                                </div>
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

                                            <th>Intitulé</th>
                                            <th>Résultat</th>
                                            <th>Pourcentage</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr >
                                                <td>Nombre d'élèves</td>
                                                <td>{total_eleves.Total_eleveniveau}</td>
                                                <td>{total_eleves.pourcentage_eleveniveau}% des élèves de l'établissement</td>

                                            </tr>
                                          
                                            <tr>
                                                <td>Nombre de garçons</td>
                                                <td>{total_garcons.Total_garconiveau}</td>
                                                <td>{total_garcons.pourcentage_garconiveau}% des élèves du niveau</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre de filles</td>
                                                <td>{total_filles.Total_filleniveau}</td>
                                                <td>{total_filles.pourcentage_filleniveau}% des élèves du niveau</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre total de redoublant</td>
                                                <td>{total_eleves_redoublant.Total_eleveredoublantniveau}</td>
                                                <td>{total_eleves_redoublant.pourcentage_eleveredoublantniveau}% des élèves du niveau</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre de garçon(s) redoublant(s)</td>
                                                <td>{total_redoublant.Total_redoublantsniveau}</td>
                                                <td>{total_redoublant.pourcentage_redoublantsniveau}% des élèves du niveau</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre de fille(s) redoublante(s)</td>
                                                <td>{total_redoublante.Total_redoublanteniveau}</td>
                                                <td>{total_redoublante.pourcentage_redoublanteniveau}% des élèves du niveau</td>
                                            </tr>

                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </Table>

                            </div>
                        </div>              
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default NiveauxStat
