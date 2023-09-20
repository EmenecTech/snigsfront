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




const EleveBulletinNotes = memo((props) => {

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "employee data",
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





    const [image2, setImage2] = useState("");
    const imageRef2 = useRef(null);

    const fetchProductImage2 = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef2.current) {
            imageRef2.current.cancel();
        }
        // créer un token d'annulation
        imageRef2.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + etab + ".png",

            {
                cancelToken: imageRef2.current.token,
                responseType: "arraybuffer",
            }
        )
            .then((response) => {
                // convertir l'image en base64
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                // mettre à jour l'état de l'image
                setImage2(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage2();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef2.current = null;
        };
    }, [fetchProductImage2]);



    const [image, setImage] = useState("");
    const imageRef = useRef(null);

    const fetchProductImage = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef.current) {
            imageRef.current.cancel();
        }
        // créer un token d'annulation
        imageRef.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + user.profile_photo_path,
            {
                cancelToken: imageRef.current.token,
                responseType: "arraybuffer",
            }
        )
            .then((response) => {
                // convertir l'image en base64
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                // mettre à jour l'état de l'image
                setImage(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef.current = null;
        };
    }, [fetchProductImage]);
    const [matiereslevel, setmatiereslevel] = useState([]);
    useEffect(() => {
        fetchAllmatiereslevel();
    }, []);

    const fetchAllmatiereslevel = () => {
        http.get('/get_matieres_niveau_planning/' + niveau + '/' + etab).then(res => {
            setmatiereslevel(res.data);
        })
    }




    const [notesfg, setNotesfg] = useState([]);
    useEffect(() => {
        fetchAllNotesfg();
    }, []);

    const fetchAllNotesfg = () => {
        http.get('/notes_fristgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesfg(res.data);

        })
    }

    const [notessg, setNotessg] = useState([]);
    useEffect(() => {
        fetchAllNotessg();
    }, []);

    const fetchAllNotessg = () => {
        http.get('/notes_secondgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotessg(res.data);

        })
    }

    const [notestg, setNotestg] = useState([]);
    useEffect(() => {
        fetchAllNotestg();
    }, []);

    const fetchAllNotestg = () => {
        http.get('/notes_thirdgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotestg(res.data);

        })
    }

    const [sumnotes, setsumnotes] = useState([]);
    useEffect(() => {
        fetchAllsumnotes();
    }, []);

    const fetchAllsumnotes = () => {
        http.get('/sum/of/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setsumnotes(res.data);

        })
    }

    ////primaire

    const [notesfr, setNotesfr] = useState([]);
    useEffect(() => {
        fetchAllNotesfr();
    }, []);

    const fetchAllNotesfr = () => {
        http.get('/notes_francais/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesfr(res.data);

        })
    }

    const [notesmath, setNotesmath] = useState([]);
    useEffect(() => {
        fetchAllNotesmath();
    }, []);

    const fetchAllNotesmath = () => {
        http.get('/notes_maths/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesmath(res.data);

        })
    }

    const [notesang, setNotesang] = useState([]);
    useEffect(() => {
        fetchAllNotesang();
    }, []);

    const fetchAllNotesang = () => {
        http.get('/notes_ang/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesang(res.data);

        })
    }

    const [notessee, setNotessee] = useState([]);
    useEffect(() => {
        fetchAllNotessee();
    }, []);

    const fetchAllNotessee = () => {
        http.get('/notes_see/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotessee(res.data);

        })
    }


    const [notesshs, setNotesshs] = useState([]);
    useEffect(() => {
        fetchAllNotesshs();
    }, []);

    const fetchAllNotesshs = () => {
        http.get('/notes_shs/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesshs(res.data);

        })
    }


    const [notescg, setNotescg] = useState([]);
    useEffect(() => {
        fetchAllNotescg();
    }, []);

    const fetchAllNotescg = () => {
        http.get('/notes_cg/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotescg(res.data);

        })
    }

    /////Maternelle
    //cef
    const [notescef, setNotescef] = useState([]);
    useEffect(() => {
        fetchAllNotescef();
    }, []);

    const fetchAllNotescef = () => {
        http.get('/notes_cef/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotescef(res.data);

        })
    }
    //cie
const [notescie, setNotescie] = useState([]);
    useEffect(() => {
        fetchAllNotescie();
    }, []);

    const fetchAllNotescie = () => {
        http.get('/notes_cie/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotescie(res.data);

        })
    }
    //pln
    const [notespln, setNotescpln] = useState([]);
    useEffect(() => {
        fetchAllNotescpln();
    }, []);

    const fetchAllNotespln = () => {
        http.get('/notes_pln/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotespln(res.data);

        })
    }
//ubm
    const [notesubm, setNotesubm] = useState([]);
    useEffect(() => {
        fetchAllNotesubm();
    }, []);

    const fetchAllNotesubm = () => {
        http.get('/notes_ubm/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesubm(res.data);

        })
    }
//ubst
    const [notesubst, setNotesubst] = useState([]);
    useEffect(() => {
        fetchAllNotesubst();
    }, []);

    const fetchAllNotesubst = () => {
        http.get('/notes_ubst/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesubst(res.data);

        })
    }
//pvs
    const [notespvs, setNotespvs] = useState([]);
    useEffect(() => {
        fetchAllNotespvs();
    }, []);

    const fetchAllNotespvs = () => {
        http.get('/notes_pvs/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotespvs(res.data);

        })
    }
  //pvc
    const [notespvc, setNotespvc] = useState([]);
    useEffect(() => {
        fetchAllNotespvc();
    }, []);

    const fetchAllNotespvc = () => {
        http.get('/notes_pvc/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotespvc(res.data);

        })
    } 
    //dce
     const [notesdce, setNotesdce] = useState([]);
    useEffect(() => {
        fetchAllNotesdce();
    }, []);

    const fetchAllNotesdce = () => {
        http.get('/notes_dce/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesdce(res.data);

        })
    }
     //tic
     const [notestic, setNotestic] = useState([]);
    useEffect(() => {
        fetchAllNotestic();
    }, []);

    const fetchAllNotestic = () => {
        http.get('/notes_tic/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotestic(res.data);

        })
    }
 //sport
     const [notessport, setNotessport] = useState([]);
    useEffect(() => {
        fetchAllNotessport();
    }, []);

    const fetchAllNotessport = () => {
        http.get('/notes_tic/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotessport(res.data);

        })
    }
    //paa
     const [notespaa, setNotespaa] = useState([]);
    useEffect(() => {
        fetchAllNotespaa();
    }, []);

    const fetchAllNotespaa = () => {
        http.get('/notes_tic/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotespaa(res.data);

        })
    }


    ////primary
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



    console.log(sumnotes);












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
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
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
                                                                        <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col sm="12">
                                                                    <div className="container text-center">
                                                                        <p>Nom de l'établissement
                                                                            <br />
                                                                            <smal>BP: Tel:</smal>
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
                                                                Intitulé du bulletin
                                                                <hr />
                                                                2022 - 2023
                                                            </p>


                                                        </Col>
                                                        <Col sm="4" lg="4">


                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col sm="5" lg="5">
                                                            <Row style={{ fontSize: "10px" }}>
                                                                <Col sm="6" lg="6">
                                                                    <div className="mt-2">
                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0" >Classe: {user.other_in_user}</p>
                                                                        <p>Class</p>
                                                                    </div>

                                                                </Col>
                                                                <Col sm="6" lg="6">
                                                                    <div className="mt-2">
                                                                        <p tyle={{ fontSize: "10px" }} className="mb-0">Effectif:</p>
                                                                        <p>Number</p>
                                                                    </div>
                                                                </Col>

                                                            </Row>

                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Nom et Prénom: {user.nom} {user.prenom}</p>
                                                                <p>Name and Surname</p>
                                                            </div>

                                                            <div className="mt-1">
                                                                <Row>
                                                                    <Col sm="6" lg="6">
                                                                        <div className="mt-1">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-1">Né(e) le: {user.date_naissance}</p>
                                                                            <p>Born on</p>
                                                                        </div>

                                                                    </Col>
                                                                    <Col sm="6" lg="6">
                                                                        <div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">A: {user.lieu_naissance}</p>
                                                                            <p>AT</p>
                                                                        </div>
                                                                    </Col>

                                                                </Row>
                                                            </div>
                                                            <div className="mt-1">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-1">Téléphone du parent ou tuteur:</p>
                                                                <p>Parent's/guardian's Address</p>
                                                            </div>

                                                        </Col>
                                                        <Col sm="5" lg="5">

                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">N° Matricule:</p>
                                                                <p>Registration N°</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Sexe: {user.sexe}</p>
                                                                <p>Sex</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Professeur principal:</p>
                                                                <p>Class Master/Mistress</p>
                                                            </div>


                                                        </Col>
                                                        <Col sm="2" lg="2">
                                                            <div className="bd-example">
                                                                <figure className="figure">
                                                                    <Image
                                                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                        src={image}
                                                                        alt="profile-pic"
                                                                        style={{ width: "100px" }}
                                                                    />
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
                                                                            Discipline /Nom de l'enseignant
                                                                        </p></th>
                                                                        <th>Note</th>
                                                                        <th>Coef</th>
                                                                        <th>NxC</th>
                                                                        <th>Compétence visée</th>
                                                                        <th>Appreciation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {notesfg.map((item, idf) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du premier groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notessg.map((item, ids) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du deuxième groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notestg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Matières du troisième groupe</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
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

                                                        <Col sm="12" lg="12">

                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom :</strong> </p>

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
                                                                            Disciplines
                                                                        </p></th>
                                                                        <th>Matieres</th>
                                                                        <th>Note sur</th>
                                                                        <th>Moyenne</th>
                                                                        <th>Observation et Emargement</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {notesfr.map((item, idf) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Fançais</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notesfr.map((item, ids) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Anglais</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notesang.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Mathématiques</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notesmath.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Sciences et Education à l'Environnement</th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>

                                                                    {notessee.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Sciences Humaines et Sociales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notesshs.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Connaissances Générales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notescg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Connaissances Générales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
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
                                                                                    
     ///bulletin maternelle
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

                                                        <Col sm="12" lg="12">

                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom :</strong> </p>

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
                                                                           Compétences
                                                                        </p></th>
                                                                        <th>Matieres</th>
                                                                        <th>Evaluation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {notescef.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                    
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Communiquer en Français</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notescie.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                    
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Communicate in English</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notespln.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                    

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Pratiquer au moins une Langue Nationale</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notesubm.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                    

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Utiliser les notions de base en Mathématiques</th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>

                                                                    {notesubst.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                          
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Utiliser les notions de base en Sciences et Technologies</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notespvs.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                           

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Pratiquer les valeurs sociales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notespvc.map((item) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Pratiquer les valeurs citoyennes</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
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

                                                        <Col sm="12" lg="12">

                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom :</strong> </p>

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
                                                                            Disciplines
                                                                        </p></th>
                                                                        <th>Matieres</th>
                                                                        <th>Note sur</th>
                                                                        <th>Moyenne</th>
                                                                        <th>Observation et Emargement</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {notesfg.map((item, idf) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>LITERACY AND COMMUNICATION</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notessg.map((item, ids) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>SCIENCE AND TECHNOLOGICAL SKILLS DEVELOPMENT</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notestg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>PRATICAL LIFE SKILLS</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notestg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>ARTS AND CRAFTS</th>

                                                                    </tr>
                                                                </thead>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Mathématiques</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notestg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Sciences Humaines et Sociales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {notestg.map((item, idt) => (

                                                                        <tr>
                                                                            <td>{item.matiere_cp} ( {item.nom} {item.prenom} )</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.coefficient_note}</td>
                                                                            <td>{item.note_finale}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.appreciation_note}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                <thead>
                                                                    <tr>

                                                                        <th>Connaissances Générales</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
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

export default EleveBulletinNotes
