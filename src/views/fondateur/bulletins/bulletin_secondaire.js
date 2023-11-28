import React, { useState, useEffect, memo, Fragment, useCallback, useRef } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form, Image } from "react-bootstrap";
import { createPath, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";
import Axios from "axios";
import QRCode from "react-qr-code";

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

import { useReactToPrint } from "react-to-print";


// install Swiper modules
SwiperCore.use([Navigation]);




const BulletinSecondaire = memo((props) => {

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Bulletin",
        onafterprint: () => alert("print success"),
    });

    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { evaluation, niveau, classe, userid } = useParams();
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


    const [rang_eleve, setrang_eleve] = useState([]);

    useEffect(() => {
        fetchrang_eleve()
    }, []);

    const fetchrang_eleve = () => {
        http.get('/get_moyenrang/' + etab + '/' + classe + '/' + evaluation + '/' + userid).then((res) => {
            setrang_eleve(res.data);
        });
    }
     const [total_eleves, settotal_eleves] = useState([]);
    useEffect(() => {
        fetchAlltotal_eleves();
    }, []);
    const fetchAlltotal_eleves = () => {
        http.get("/nbreleves_classe/" + etab + '/' + classe).then((res) => {
            settotal_eleves(res.data);
        });
    };

  
    const [matiereslevel, setmatiereslevel] = useState([]);
    useEffect(() => {
        fetchAllmatiereslevel();
    }, []);

    const fetchAllmatiereslevel = () => {
        http.get('/get_matieres_niveau_planning/' + niveau + '/' + etab).then(res => {
            setmatiereslevel(res.data);
        })
    }


    const [classes, setclasses] = useState([]);
    useEffect(() => {
        fetchAllclasses();
    }, []);

    const fetchAllclasses = () => {
        http.get('/classe_bull/' + classe + '/' + etab).then(res => {
            setclasses(res.data);
        })
    }

    const [elevesinclass, setelevesinclass] = useState();
    useEffect(() => {
        fetchAllelevesinclass();
    }, []);

    const fetchAllelevesinclass = () => {
        http.get('get_eleve_in_class/' + etab + '/' + classe + '/' + userid).then(res => {
            setelevesinclass(res.data);
        })
    };

    /////////////////////////////////////////////
    const [allnote_1, setAllNote_1] = useState({});
    useEffect(() => {
        fetchAllNote_1();
    }, []);

    const fetchAllNote_1 = () => {
        http.get('/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_1(res.data);
        })
    };
      //////////////////////////////////////////////

      const [allnote_2, setAllNote_2] = useState([]);
      useEffect(() => {
          fetchAllNote_2();
      }, []);
  
      const fetchAllNote_2 = () => {
          http.get('/all/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
              setAllNote_2(res.data);
          })
      };

      ///////////////////////////////////////////////

      const [allnote_3, setAllNote_3] = useState([]);
      useEffect(() => {
          fetchAllNote_3();
      }, []);
  
      const fetchAllNote_3 = () => {
          http.get('/all/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
              setAllNote_3(res.data);
          })
      };

      ////////////////////////////////////////////////

      const [allnote_4, setAllNote_4] = useState([]);
    useEffect(() => {
        fetchAllNote_4();
    }, []);

    const fetchAllNote_4 = () => {
        http.get('/all/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_4(res.data);
        })
    };

    ////////////////////////////////////////////////

    
    const [allnote_5, setAllNote_5] = useState([]);
    useEffect(() => {
        fetchAllNote_5();
    }, []);

    const fetchAllNote_5 = () => {
        http.get('/all/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_5(res.data);
        })
    };

    ////////////////////////////////////////////////

    
    const [allnote_6, setAllNote_6] = useState([]);
    useEffect(() => {
        fetchAllNote_6();
    }, []);

    const fetchAllNote_6 = () => {
        http.get('/all/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_6(res.data);
        })
    };

    /////////////////////////////////////////////

    const [allnote_7, setAllNote_7] = useState([]);
    useEffect(() => {
        fetchAllNote_7();
    }, []);

    const fetchAllNote_7 = () => {
        http.get('/all/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_7(res.data);
        })
    };

    //////////////////////
    const [allnote_8, setAllNote_8] = useState([]);
    useEffect(() => {
        fetchAllNote_8();
    }, []);

    const fetchAllNote_8 = () => {
        http.get('/all/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_8(res.data);
        })
    };
    ///////////////////////
    const [allnote_9, setAllNote_9] = useState([]);
    useEffect(() => {
        fetchAllNote_9();
    }, []);

    const fetchAllNote_9 = () => {
        http.get('/all/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_1(res.data);
        })
    };
    //////////////////////////////////
    const [allnote_10, setAllNote_10] = useState([]);
    useEffect(() => {
        fetchAllNote_10();
    }, []);

    const fetchAllNote_10 = () => {
        http.get('/all/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNote_10(res.data);
        })
    };
    //////////////////////////////////
    
   

        /////Somme des notes et moyenne
        const [sumnotes, setsumnotes] = useState([]);
        useEffect(() => {
            fetchAllsumnotes();
        }, []);
    
        const fetchAllsumnotes = () => {
            http.get('/sum/of/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
                setsumnotes(res.data);
            })
        }
    
        const [sumcoef, setsumcoef] = useState([]);
        useEffect(() => {
            fetchAllsumcoef();
        }, []);
    
        const fetchAllsumcoef = () => {
            http.get('/sum/of/coef/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
                setsumcoef(res.data);
    
            })
        }
        const [sumnotesfinale, setsumnotesfinale] = useState([]);
        useEffect(() => {
            fetchAllsumnotesfinale();
        }, []);
    
        const fetchAllsumnotesfinale = () => {
            http.get('/sum/of/final/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
                setsumnotesfinale(res.data);
    
            })
        }
        const [moyenneleve, setmoyenneleve] = useState([]);
        useEffect(() => {
            fetchAllmoyenneleve();
        }, []);
    
        const fetchAllmoyenneleve = () => {
            http.get('/moyenne/eleve/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
                setmoyenneleve(res.data);
    
            })
        }
        /////////////////////////////////////////////

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

    return(
        <Fragment>
             {classes.cycle_niveau === 'Secondaire' || classes.cycle_niveau === 'Secondary' ? <div>

               {classes.section_niveau === 'Francophone' ? <div>

              
            {/* Bulletin du secondaire francophone */}
              
            <Row>
                        <Col sm="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title"></h4>
                                    </div>


                                    <Button variant="primary mt-2" onClick={printData}>
                                        <span className="btn-inner">
                                        
                                        </span>
                                        Imprimer
                                    </Button>

                                    {/* <!-- Modal --> */}

                                </Card.Header>
                                <Card.Body>

                                    <div ref={componentRef}
                                        style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
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

                                                                    </p>


                                                                </Col>
                                                                <Col sm="4" >
                                                                    <Row>
                                                                        <Col sm="12" lg="12" className="d-flex justify-content-center">
                                                                            <div className="user-profile">
                                                                                <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    <br />
                                                                    <Row>
                                                                        <Col sm="12">
                                                                            <div className="container text-center">
                                                                                <p> <strong style={{ fontSize: "18px" }}> {info_etab.nom_etablissement} </strong>

                                                                                    <br />
                                                                                    <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal>
                                                                                </p>

                                                                            </div>
                                                                        </Col>
                                                                    </Row>



                                                                </Col>
                                                                <Col sm="4" lg="4">
                                                                    <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                        Peace - Work - Fatherland <br />
                                                                        MINISTRY OF SECONDARY EDUCATION <br />

                                                                    </p>


                                                                </Col>

                                                            </Row>
                                                            <Row className="mt-2">
                                                                <Col sm="4" lg="4">


                                                                </Col>
                                                                <Col sm="4" lg="4">
                                                                    <p className="text-center">
                                                                        <span style={{ fontSize: "15px" }}> Bulletin De Notes {evaluation}</span>
                                                                        <br />
                                                                        2022 - 2023
                                                                    </p>


                                                                </Col>
                                                                <Col sm="4" lg="4">


                                                                </Col>

                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" lg="12">
                                                                    <Row style={{ fontSize: "10px" }}>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="mt-2">
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Nom et Prénom : {elevesinclass.nom} {elevesinclass.prenom}</p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Né(e) Le :  {elevesinclass.date_naissance} à  {elevesinclass.lieu_naiss} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Sexe :  {elevesinclass.sexe} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Matricule :  {elevesinclass.matricule} </p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="mt-2">
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Classe : {classe} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Redoublant(e) : </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Professeur principal :</p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="bd-example">
                                                                                <figure className="figure">
                                                                                    <Image
                                                                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                                        src=""
                                                                                        alt="profile-pic"
                                                                                        style={{ width: "100px" }}
                                                                                    />
                                                                                </figure>
                                                                            </div>

                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <div className="table-responsive border-bottom my-3">
                                                                    <Table
                                                                        responsive
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th><p>
                                                                                    Disciplines
                                                                                </p></th>
                                                                                <th>Note</th>
                                                                                <th>Coef</th>
                                                                                <th>NxC</th>
                                                                                <th>Appreciation</th>
                                                                            </tr>
                                                                        </thead>
                                                                       
                                                                        {allnote_1.existgrp > 0 && (
                                                                        <tbody>
                                                                            {allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                                <tr key={grp_1}>
                                                                                    <td>{item.matiere_note}</td>
                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody> )}

                                                                    {allnote_1.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>
                                                                                <th>{allnote_1.groupe}</th>
                                                                                <th>{allnote_1.sumnote}</th>
                                                                                <th>{allnote_1.sumcoef}</th>
                                                                                <th>{allnote_1.sumfinalnotes}</th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead>)}

                                                                        {allnote_2.existgrp > 0 && (
                                                                        <tbody>
                                                                            {allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                                <tr key={grp_2}>
                                                                                    <td>{item.matiere_note}</td>
                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>)}

                                                                        {allnote_2.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>

                                                                                <th>{allnote_2.groupe}</th>
                                                                                <th>{allnote_2.sumnote}</th>
                                                                                <th>{allnote_2.sumcoef}</th>
                                                                                <th>{allnote_2.sumfinalnotes}</th>
                                                                                <th></th>

                                                                            </tr>
                                                                        </thead>)}

                                                                        {allnote_3.existgrp > 0 && (
                                                                        <tbody>

                                                                            {allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                                <tr key={grp_3}>
                                                                                    <td>{item.matiere_note}</td>

                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>)}

                                                                        {allnote_3.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>

                                                                                <th>{allnote_3.groupe}</th>
                                                                                <th>{allnote_3.sumnote}</th>
                                                                                <th>{allnote_3.sumcoef}</th>
                                                                                <th>{allnote_3.sumfinalnotes}</th>
                                                                                <th></th>

                                                                            </tr>
                                                                        </thead>)}


                                                                        <tbody>

                                                                            <tr>
                                                                                <td>RECAPITULATIFS</td>

                                                                                <td>{sumnotes}</td>
                                                                                <td>{sumcoef}</td>
                                                                                <td>{sumnotesfinale}</td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </tbody>


                                                                        <tfoot>

                                                                        </tfoot>
                                                                    </Table>
                                                                    <Table
                                                                        responsive
                                                                       
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>DISCIPLINE</th>
                                                                                <th>APPRECIATION DU TRAVAIL</th>
                                                                                <th><div className="mt-2">
                                                                                    <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE: {moyenneleve}</p>
                                                                                </div>
                                                                                    <div className="mt-2">
                                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0">RANG:</p>
                                                                                    </div>
                                                                                    <div className="mt-2">
                                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0">MENTION:</p>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td>
                                                                                    <Col sm="2">
                                                                                        <div>
                                                                                            <QRCode value={user.nom} size={50} />
                                                                                        </div>
                                                                                    </Col>

                                                                                </td>
                                                                                <td>
                                                                                    <div className="mt-1">
                                                                                        <p>

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
                                                                                    <div className="mt-1">
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
                                                                                    <div className="mt-1">
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
           </div> : <div>

            {/* Bulletin du secondaire anglophone  */}

            <Row>
                        <Col sm="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title"></h4>
                                    </div>


                                    <Button variant="primary mt-2" onClick={printData}>
                                        <span className="btn-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                            </svg>
                                        </span>
                                        Print
                                    </Button>

                                    {/* <!-- Modal --> */}

                                </Card.Header>
                                <Card.Body>

                                    <div ref={componentRef}
                                        style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
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
                                                                    <p className="text-center">REPUBLIQUE DU CAMEROUN<br />
                                                                        Paix - Travail - Patrie <br />
                                                                        MINISTERE DES ENSEIGNEMENTS SECONDAIRES <br />

                                                                    </p>


                                                                </Col>
                                                                <Col sm="4" >
                                                                    <Row>
                                                                        <Col sm="12" lg="12" className="d-flex justify-content-center">
                                                                            <div className="user-profile">
                                                                                <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                                <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    <br />
                                                                    <Row>
                                                                        <Col sm="12">
                                                                            <div className="container text-center">
                                                                                <p> <strong style={{ fontSize: "18px" }}> {info_etab.nom_etablissement} </strong>

                                                                                    <br />
                                                                                    <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal>
                                                                                </p>

                                                                            </div>
                                                                        </Col>
                                                                    </Row>



                                                                </Col>
                                                                <Col sm="4" lg="4">
                                                                    <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                        Peace - Work - Fatherland <br />
                                                                        MINISTRY OF SECONDARY EDUCATION <br />

                                                                    </p>


                                                                </Col>

                                                            </Row>
                                                            <Row className="mt-2">
                                                                <Col sm="4" lg="4">


                                                                </Col>
                                                                <Col sm="4" lg="4">
                                                                    <p className="text-center">
                                                                        <span style={{ fontSize: "15px" }}> Gradebook - {evaluation}</span>
                                                                        <br />
                                                                        2022 - 2023
                                                                    </p>



                                                                </Col>
                                                                <Col sm="4" lg="4">


                                                                </Col>

                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" lg="12">
                                                                    <Row style={{ fontSize: "10px" }}>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="mt-2">
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Name : {elevesinclass.nom} {elevesinclass.prenom}</p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Date and place of birth : {elevesinclass.date_naissance} à {elevesinclass.lieu_naissance} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Sexe : {elevesinclass.sexe} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-1">Matricule : {elevesinclass.matricule} </p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="mt-2">
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Classe : {classe} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Redoublant(e) : {elevesinclass.redouble} </p>
                                                                                <p style={{ fontSize: "10px" }} className="mb-0">Professeur principal : </p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col sm="4" lg="4">
                                                                            <div className="bd-example">
                                                                                <figure className="figure">
                                                                                    <Image
                                                                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                                        src=""
                                                                                        alt="profile-pic"
                                                                                        style={{ width: "100px" }}
                                                                                    />
                                                                                </figure>
                                                                            </div>

                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <div className="table-responsive border-bottom my-3">
                                                                    <Table
                                                                        responsive
                                                                       
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>

                                                                                <th><p>
                                                                                    Disciplines
                                                                                </p></th>
                                                                                <th>Note</th>
                                                                                <th>Cote</th>
                                                                                <th>NxC</th>
                                                                                <th>Appreciation</th>
                                                                            </tr>
                                                                        </thead>
                                                                         
                                                                        {allnote_1.existgrp > 0 && (
                                                                        <tbody>

                                                                            {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                                <tr key={grp_1}>
                                                                                    <td>{item.matiere_note}</td>

                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>)}

                                                                        {allnote_2.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>

                                                                                <th>{allnote_1.groupe}</th>
                                                                                <th>{allnote_1.sumnote}</th>
                                                                                <th>{allnote_1.sumcoef}</th>
                                                                                <th>{allnote_1.sumfinalnotes}</th>
                                                                                <th></th>

                                                                            </tr>
                                                                        </thead>)}

                                                                        {allnote_2.existgrp > 0 && (

                                                                        <tbody>

                                                                            {allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                                <tr key={grp_2}>
                                                                                    <td>{item.matiere_note}</td>

                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>)}

                                                                        {allnote_2.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>

                                                                                <th>{allnote_2.groupe}</th>
                                                                                <th>{allnote_2.sumnote}</th>
                                                                                <th>{allnote_2.sumcoef}</th>
                                                                                <th>{allnote_2.sumfinalnotes}</th>
                                                                                <th></th>

                                                                            </tr>
                                                                        </thead>)}

                                                                        {allnote_3.existgrp > 0 && (

                                                                        <tbody>

                                                                            {allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                                <tr key={grp_3}>
                                                                                    <td>{item.matiere_note}</td>

                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>)}

                                                                        {allnote_3.existgrp > 0 && (
                                                                        <thead>
                                                                            <tr>

                                                                                <th>{allnote_3.groupe}</th>
                                                                                <th>{allnote_3.sumnote}</th>
                                                                                <th>{allnote_3.sumnote}</th>
                                                                                <th>{allnote_3.sumcoef}</th>
                                                                                <th>{allnote_3.sumfinalnotes}</th>

                                                                            </tr>
                                                                        </thead>)}

                                                                        <tbody>

                                                                            <tr>
                                                                                <td>SUMMARY</td>

                                                                                <td>{sumnotes}</td>
                                                                                <td>{sumcoef}</td>
                                                                                <td>{sumnotesfinale}</td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </tbody>


                                                                        <tfoot>

                                                                        </tfoot>
                                                                    </Table>
                                                                    <Table
                                                                        responsive
                                                                       
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>DISCIPLINE</th>
                                                                                <th>WORK APPRECIATION</th>
                                                                                <th><div className="mt-2">
                                                                                    <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve}</p>
                                                                                </div>
                                                                                    <div className="mt-2">
                                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                                    </div>
                                                                                    <div className="mt-2">
                                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0">MENTION:</p>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td>
                                                                                    <Col sm="2">
                                                                                        <div>
                                                                                            <QRCode value={user.nom} size={50} />
                                                                                        </div>
                                                                                    </Col>

                                                                                </td>
                                                                                <td>
                                                                                    <div className="mt-1">
                                                                                        <p>

                                                                                            Unjustified absences :
                                                                                            <br />
                                                                                            Justified absences:
                                                                                            <br />
                                                                                            Worn:
                                                                                            <br />
                                                                                            Blame:
                                                                                        </p>

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="mt-1">
                                                                                        <p>Roll of honor:
                                                                                            <br />
                                                                                            Encouragment:
                                                                                            <br />
                                                                                            Congratulations:
                                                                                            <br />
                                                                                            Prime:
                                                                                        </p>

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="mt-1">
                                                                                        <p>Class average:
                                                                                            <br />
                                                                                            Average of the first:
                                                                                            <br />
                                                                                            Average of the last:

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
                
            </div>}
             </div> : <div></div>}
             
             
             </Fragment>
       

        );
    })
    
    export default BulletinSecondaire

