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




const ParentsBulletinPrimaire = memo((props) => {

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
    const { evaluation } = useParams();
    const etab = user.etablissement;
    const userid = user.id;
    const niveau = user.fonction_user;
    const classe = user.other_in_user;




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

    const [enseign, setenseign] = useState();
    useEffect(() => {
        fetchAllenseign();
    }, []);

    const fetchAllenseign = () => {
        http.get('/get_ens_prim/' + etab + '/' + classe).then(res => {
            setenseign(res.data);
        })
    }

    const [elevesinclass, setelevesinclass] = useState();
    useEffect(() => {
        fetchAllelevesinclass();
    }, []);

    const fetchAllelevesinclass = () => {
        http.get('/get_eleve_in_class/' + etab + '/' + classe + '/' + userid).then(res => {
            setelevesinclass(res.data);
        })
    };


    ////////////////////////////////

   

    const [allnoteprim_1, setAllNoteprim_1] = useState({});
    useEffect(() => {
        fetchAllNoteprim_1();
    }, []);

    const fetchAllNoteprim_1 = () => {
        http.get('/all/prim/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_1(res.data);
        })
    };


     ////////////////////////////////////////////
    const [allnoteprim_2, setAllNoteprim_2] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_2();
    }, []);

    const fetchAllNoteprim_2 = () => {
        http.get('/all/prim/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_2(res.data);
        })
    };


    //////////////////////////////////////////////

   

    const [allnoteprim_3, setAllNoteprim_3] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_3();
    }, []);

    const fetchAllNoteprim_3 = () => {
        http.get('/all/prim/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_3(res.data);
        })
    };


    ///////////////////////////////////////////////

    
    const [allnoteprim_4, setAllNoteprim_4] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_4();
    }, []);

    const fetchAllNoteprim_4 = () => {
        http.get('/all/prim/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_4(res.data);
        })
    };


    //////////////////////////////////////////////

    const [allnoteprim_5, setAllNoteprim_5] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_5();
    }, []);

    const fetchAllNoteprim_5 = () => {
        http.get('/all/prim/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_5(res.data);
        })
    };

    //////////////////////////////////////////////

    const [allnoteprim_6, setAllNoteprim_6] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_6();
    }, []);

    const fetchAllNoteprim_6 = () => {
        http.get('/all/prim/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_6(res.data);
        })
    };

    //////////////////////////////////////////////


    const [allnoteprim_7, setAllNoteprim_7] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_7();
    }, []);

    const fetchAllNoteprim_7 = () => {
        http.get('/all/prim/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_7(res.data);
        })
    };



    //////////////////////////////////////////////

    const [allnoteprim_8, setAllNoteprim_8] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_8();
    }, []);

    const fetchAllNoteprim_8 = () => {
        http.get('/all/prim/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_8(res.data);
        })
    };


    //////////////////////////////////////////////


   
    const [allnoteprim_9, setAllNoteprim_9] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_9();
    }, []);

    const fetchAllNoteprim_9 = () => {
        http.get('/all/prim/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_9(res.data);
        })
    };

    //////////////////////////////////////////////

 
    const [allnoteprim_10, setAllNoteprim_10] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_10();
    }, []);

    const fetchAllNoteprim_10 = () => {
        http.get('/all/prim/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_10(res.data);
        })
    };

    //////////////////////////////////////////////


    const [allnoteprim_11, setAllNoteprim_11] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_11();
    }, []);

    const fetchAllNoteprim_11 = () => {
        http.get('/all/prim/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_1(res.data);
        })
    };


    //////////////////////////////////////////////

  
    const [allnoteprim_12, setAllNoteprim_12] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_12();
    }, []);

    const fetchAllNoteprim_12 = () => {
        http.get('/all/prim/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_12(res.data);
        })
    };

    //////////////////////////////////////////////

    const [allnoteprim_13, setAllNoteprim_13] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_13();
    }, []);

    const fetchAllNoteprim_13 = () => {
        http.get('/all/prim/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_13(res.data);
        })
    };

    //////////////////////////////////////////////

    
    const [allnoteprim_14, setAllNoteprim_14] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_14();
    }, []);

    const fetchAllNoteprim_14 = () => {
        http.get('/all/prim/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_14(res.data);
        })
    };

    //////////////////////////////////////////////


    const [allnoteprim_15, setAllNoteprim_15] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_15();
    }, []);

    const fetchAllNoteprim_15 = () => {
        http.get('/all/prim/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_15(res.data);
        })
    };

    //////////////////////////////////////////////


   
   

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
    const [allnotes, setAllNotes] = useState([]);
    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = () => {
        http.get('/all_notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNotes(res.data);
        })
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

    return(
        <Fragment>
              {classes.cycle_niveau === 'Primaire'? <div>

                 {/* Bulletin standard du primaire francophone  */}
               
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
                                                                            MINISTERE DE L'EDUCATION DE BASE<br />
                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
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
                                            



                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                            Peace - Work - Fatherland <br />
                                                                            MINISTRY OF BASIC EDUCATION<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
                                                                        </p>


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mt-1">
                                                                    <Col sm="4" lg="4">


                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">
                                                                            <span style={{ fontSize: "10px" }}> Bulletin De Notes {evaluation}</span>
                                                                            <br />
                                                                            2022 - 2023
                                                                        </p>


                                                                    </Col>
                                                                    <Col sm="4" lg="4">


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mb-1">

                                                                    <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                              Nom et Prénom : {elevesinclass.nom} {elevesinclass.prenom} <br />
                                                                              Date et Lieu de naissance : {elevesinclass.date_naissance} à {elevesinclass.lieu_naissance} <br />
                                                                              Sexe :  {elevesinclass.sexe} <br />
                                                                             
                                                                        </div>
                                                                    </Col>
                                                                     <Col sm="4" lg="4">
                                                                         <div className="mt-1">
                                                                            <p>Nom de l'enseignant: {enseign} <br />
                                                                            Classe : {classe} 
                                                                            </p>
                                                                        </div>
                                                                    </Col>

                                                                     <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Matricule :  {elevesinclass.matricule} <br />
                                                                            Redoublant : <br />
                                                                            </p>
                                                                        </div>

                                                                    </Col>
                                                                </Row>
                                                                <Row>

                                                                    <Table
                                                                        responsive
                                                                       
                                                                         id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th >Disciplines</th>
                                                                                <th >Notes</th>
                                                                                <th >Appréciation</th>
                                                                            </tr>
                                                                        </thead>
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                                                    <tr key={grp_1}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_1.groupe}</th>
                                                                                    <th>{allnoteprim_1.sumnote}/{allnoteprim_1.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                                                    <tr key={grp_2}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_2.groupe} </th>
                                                                                    <th>{allnoteprim_2.sumnote}/{allnoteprim_2.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_3.listnotes && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                                                    <tr key={grp_3}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_3.groupe} </th>
                                                                                    <th>{allnoteprim_3.sumnote}/{allnoteprim_3.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_4.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                                                    <tr key={grp_4}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_4.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_4.groupe}  </th>
                                                                                    <th>{allnoteprim_4.sumnote}/{allnoteprim_4.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_5.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_5.listnotes && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                                                    <tr key={grp_5}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_5.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_5.groupe}  </th>
                                                                                    <th>{allnoteprim_5.sumnote}/{allnoteprim_5.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>
                                                                        )}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                                    <tr key={grp_6}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_6.groupe} </th>
                                                                                    <th>{allnoteprim_6.sumnote}/{allnoteprim_6.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_7.listnotes && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                                                    <tr key={grp_7}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_7.groupe} </th>
                                                                                    <th>{allnoteprim_7.sumnote}/{allnoteprim_7.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                                    <tr key={grp_8}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_8.groupe} </th>
                                                                                    <th>{allnoteprim_8.sumnote}/{allnoteprim_8.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                                    <tr key={grp_9}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_9.groupe} </th>
                                                                                    <th>{allnoteprim_9.sumnote}/{allnoteprim_9.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                                    <tr key={grp_10}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                                    <th>{allnoteprim_10.sumnote} /{allnoteprim_10.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                                                    <tr key={grp_11}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_11.groupe} </th>
                                                                                    <th>{allnoteprim_11.sumnote} /{allnoteprim_11.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_12.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_12.listnotes && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                                    <tr key={grp_12}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_12.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                                    <th>{allnoteprim_12.sumnote} /{allnoteprim_12.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_13.listnotes && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                                    <tr key={grp_13}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                                    <th>{allnoteprim_13.sumnote} /{allnoteprim_13.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <tbody>

                                                                                {allnoteprim_14.listnotes && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                                    <tr key={grp_14}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_14.groupe}  </th>
                                                                                    <th>{allnoteprim_14.sumnote}/{allnoteprim_14.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                                                    <tr key={grp_15}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_15.groupe} </th>
                                                                                    <th>{allnoteprim_15.sumnote} /{allnoteprim_15.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                       
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>RECAPITULATIFS</td>
                                                                                <td>{sumnotes}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </tbody>
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
                                                                                <th>MOYENNE: {rang_eleve.moyen} </th>
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

                                                                                            Avertissement travail:
                                                                                            <br />
                                                                                            Blame travail:
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
                                                                                        </p>

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                <div className="mt-1">
                                                                                          <p> Rang:{rang_eleve.rang}
                                                                                          <br />M.Gle:
                                                                                          <br />Effectif: {total_eleves.Total_eleveclasse}
                                                                                          </p>
                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        </tbody>
                                                                    </Table>
                                                                    <Table
                                                                        responsive
                                                                       
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th>REMARQUES GENERALES</th>
                                                                                <th>ENSEIGNANT(E)</th>
                                                                                <th>DIRECTRICE(TEUR)</th>
                                                                                <th>PARENT</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </Table>


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

            </div> : <div></div>}

            {classes.cycle_niveau === 'Primary' ? <div>

                {/* Bulletin standard du primaire anglophone  */}
  
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
                                                                            MINISTERE DE L'EDUCATION DE BASE<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
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

                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                            Peace - Work - Fatherland <br />
                                                                            MINISTRY OF BASIC EDUCATION<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
                                                                        </p>


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mt-2">
                                                                    <Col sm="4" lg="4">


                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">
                                                                            <span style={{ fontSize: "15px" }}> Report Card {evaluation}</span>
                                                                            <br />
                                                                            2022 - 2023
                                                                        </p>


                                                                    </Col>
                                                                    <Col sm="4" lg="4">


                                                                    </Col>

                                                                </Row>
                                                                        <Row>

                                                                        <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Name : {elevesinclass.nom} {elevesinclass.prenom} <br />
                                                                                Date and place of birth :  {elevesinclass.date_naissance} at {elevesinclass.lieu_naissance} <br />
                                                                                Sex :  {elevesinclass.sexe} <br />
                                                                              </p>
                                                                        </div>
                                                                    </Col>
                                                                     <Col sm="4" lg="4">
                                                                         <div className="mt-1">
                                                                            <p>Teacher's name: {enseign} <br />
                                                                            Class : {classe} 
                                                                            </p>
                                                                        </div>
                                                                    </Col>

                                                                     <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Registration number:  {elevesinclass.matricule} <br />
                                                                                Repeating : <br />
                                                                            </p>
                                                                        </div>

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

                                                                                            <th>Disciplines</th>
                                                                                            <th>Mark</th>
                                                                                            <th>Appreciation</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    {allnoteprim_1.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                                                    <tr key={grp_1}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_1.groupe}</th>
                                                                                    <th>{allnoteprim_1.sumnote}/{allnoteprim_1.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                                                    <tr key={grp_2}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_2.groupe} </th>
                                                                                    <th>{allnoteprim_2.sumnote}/{allnoteprim_2.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_3.listnotes && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                                                    <tr key={grp_3}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_3.groupe} </th>
                                                                                    <th>{allnoteprim_3.sumnote}/{allnoteprim_3.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_4.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                                                    <tr key={grp_4}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_4.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_4.groupe}  </th>
                                                                                    <th>{allnoteprim_4.sumnote}/{allnoteprim_4.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_5.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_5.listnotes && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                                                    <tr key={grp_5}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_5.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_5.groupe}  </th>
                                                                                    <th>{allnoteprim_5.sumnote}/{allnoteprim_5.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>
                                                                        )}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                                    <tr key={grp_6}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_6.groupe} </th>
                                                                                    <th>{allnoteprim_6.sumnote}/{allnoteprim_6.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_7.listnotes && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                                                    <tr key={grp_7}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_7.groupe} </th>
                                                                                    <th>{allnoteprim_7.sumnote}/{allnoteprim_7.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                                    <tr key={grp_8}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_8.groupe} </th>
                                                                                    <th>{allnoteprim_8.sumnote}/{allnoteprim_8.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                                    <tr key={grp_9}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_9.groupe} </th>
                                                                                    <th>{allnoteprim_9.sumnote} /{allnoteprim_9.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                                    <tr key={grp_10}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                                    <th>{allnoteprim_10.sumnote} /{allnoteprim_10.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                                                    <tr key={grp_11}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_11.groupe} </th>
                                                                                    <th>{allnoteprim_11.sumnote} /{allnoteprim_11.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_12.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_12.listnotes && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                                    <tr key={grp_12}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_12.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                                    <th>{allnoteprim_12.sumnote} /{allnoteprim_12.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_13.listnotes && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                                    <tr key={grp_13}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                                    <th>{allnoteprim_13.sumnote} /{allnoteprim_13.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <tbody>

                                                                                {allnoteprim_14.listnotes && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                                    <tr key={grp_14}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_14.groupe}  </th>
                                                                                    <th>{allnoteprim_14.sumnote}/{allnoteprim_14.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                                                    <tr key={grp_15}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_15.groupe} </th>
                                                                                    <th>{allnoteprim_15.sumnote} /{allnoteprim_15.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                       
                                                                                    <tbody>

                                                                                        <tr>
                                                                                            <td>SUMMARY</td>
                                                                                            <td>{sumnotes}</td>
                                                                                            <td></td>
                                                                                            <td></td>

                                                                                        </tr>
                                                                                    </tbody>

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
                                                                                            <th>AVERAGE: {moyenneleve}   </th>
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

                                                                                                        Work warning:
                                                                                                        <br />
                                                                                                        Blame work:
                                                                                                    </p>

                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="mt-1">
                                                                                                    <p>Roll of honor:
                                                                                                        <br />
                                                                                                        Encouragment:
                                                                                                        <br />
                                                                                                        congratulations:
                                                                                                    </p>

                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="mt-1">
                                                                                                    <p> Rank:{rang_eleve.rang}</p>
                                                                                                    <br />G.Average:
                                                                                                    <br />Effective: {total_eleves.Total_eleveclasse}
                                                                                                </div>
                                                                                </td>
                                                                                        </tr>

                                                                                    </tbody>
                                                                                </Table>
                                                                                <Table
                                                                                    responsive
                                                                                   
                                                                                    id="datatable"
                                                                                    className=""
                                                                                    data-toggle="data-table"
                                                                                >
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>GENERAL REMARKS</th>
                                                                                            <th>TEACHER</th>
                                                                                            <th>DIRECTOR</th>
                                                                                            <th>PARENT</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
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


        </div> : <div></div>}

        </Fragment>

        );
    })
    
    export default ParentsBulletinPrimaire
