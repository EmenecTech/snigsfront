import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Button, Form, Table } from "react-bootstrap";
import { Link, useParams, createPath, useNavigate  } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";

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


const StatsEtablissement = memo((props) => {
    const { http, setToken, user } = AuthUser();
    const [activeTab, setActiveTab] = useState('Onglet1');
    const { nometab, etab } = useParams();



    // Une fonction qui formate un nombre avec des virgules
function formatNumberWithCommas(number) {
  // Convertir le nombre en chaîne de caractères
  let numberString = number.toString();
  // Créer un tableau vide pour stocker les parties du nombre
  let parts = [];
  // Tant qu'il y a plus de 3 chiffres dans la chaîne
  while (numberString.length > 3) {
    // Extraire les 3 derniers chiffres de la chaîne
    let part = numberString.slice(-3);
    // Ajouter cette partie au début du tableau
    parts.unshift(part);
    // Supprimer les 3 derniers chiffres de la chaîne
    numberString = numberString.slice(0, -3);
  }
  // Si la chaîne n'est pas vide, ajouter la partie restante au début du tableau
  if (numberString) {
    parts.unshift(numberString);
  }
  // Joindre les parties du tableau avec des virgules et retourner le résultat
  return parts.join(",");
}
    const [nbreleve, setnbreleve] = useState([]);
    useEffect(() => {
        fetchAllnbreleve();
    }, []);

    const fetchAllnbreleve = () => {
        http.get('/nbreleve_c/' + etab).then(res => {
            setnbreleve(res.data);
        })
    }

    const [nbrens, setnbrens] = useState([]);
    useEffect(() => {
        fetchAllnbrens();
    }, []);

    const fetchAllnbrens = () => {
        http.get('/nbrens_c/' + etab).then(res => {
            setnbrens(res.data);
        })
    }


    const [nbrad, setnbrad] = useState([]);
    useEffect(() => {
        fetchAllnbrad();
    }, []);

    const fetchAllnbrad = () => {
        http.get('/nbrad_c/' + etab).then(res => {
            setnbrad(res.data);
        })
    }

    const [nbrpreins, setnbrpreins] = useState([]);
    useEffect(() => {
        fetchAllnbrpreins();
    }, []);

    const fetchAllnbrpreins = () => {
        http.get('/nbreleve_preins/' + etab).then(res => {
            setnbrpreins(res.data);
        })
    }

    const [nbrarchv, setnbrarchv] = useState([]);
    useEffect(() => {
        fetchAllnbrarchv();
    }, []);

    const fetchAllnbrarchv = () => {
        http.get('/nbreleve_arch/' + etab).then(res => {
            setnbrarchv(res.data);
        })
    }


    const [nbrpar, setnbrpar] = useState([]);
    useEffect(() => {
        fetchAllnbrpar();
    }, []);

    const fetchAllnbrpar = () => {
        http.get('/nbreleve_parent/' + etab).then(res => {
            setnbrpar(res.data);
        })
    }


    const [sumpay, setsumpay] = useState([]);
      useEffect(() => {
        fetchAllsumpay();
      }, []);
    
      const fetchAllsumpay = () => {
        http.get('/sum/invest/uniq/' + etab).then(res => {
          setsumpay(res.data);
        })
      }



    




   const nbreins = nbreleve - nbrpreins;



    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.post('/etablissements', inputs).then((res) => {
            alert("établissement ajouté avec succès !")
            navigate('/etablissement/list/super/admin')
        })


        console.log(inputs);
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
                                <h4 className="card-title">{nometab}</h4>
                            </div>

                        </Card.Header>
                        <Card.Body>
                               <div>
                                  <div>
                                    <button className="btn btn-info" onClick={() => setActiveTab('Onglet1')}>Statistiques</button>{" "}
                                    <button className="btn btn-info" onClick={() => setActiveTab('Onglet2')}>Bulletins de notes</button>
                                  </div>
                            
                                  <div>
                                    {activeTab === 'Onglet1' && <div><div className="table-responsive border-bottom my-3">
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
                                                                <th>Valeur</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                    
                                                            <tr>
                                                                <td>Membres d'Administration</td>
                                                                <td>{nbrad}</td>
                    
                                                            </tr>
                                                            <tr>
                                                                <td>Enseignants</td>
                                                                <td>{nbrens}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Eleves</td>
                                                                <td>{nbreleve}</td>
                    
                                                            </tr>
                                                            <tr>
                                                                <td>Inscripts</td>
                                                                <td>{nbreins}</td>
                    
                                                            </tr>
                                                            <tr>
                                                                <td>Préinscription</td>
                                                                <td>{nbrpreins}</td>
                    
                                                            </tr>
                                                            <tr>
                                                                <td>Eleves archivés</td>
                                                                <td>{nbrarchv}</td>
                    
                                                            </tr>
                    
                    
                                                            <tr>
                                                                <td>Parents</td>
                                                                <td>{nbrpar}</td>
                    
                                                            </tr>
                    
                                                           
                    
                                                            <tr>
                                                                <td>Montant de pension enregistré</td>
                                                                <td>XAF {formatNumberWithCommas(sumpay)} </td>
                    
                                                            </tr>
                    
                                                            
                                                            
                    
                                                        </tbody>
                                                        <tfoot>
                    
                                                        </tfoot>
                                                    </Table>
                    
                                                </div>
                                
                                </div>}
                                    {activeTab === 'Onglet2' && <div>


                                        <Form>

                                        
                                        <Row className="mt-4">

                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> Maternelle </Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="filiere" onChange={handleChange} required>
                                                            <option></option>
                                                            <option> Nouvelle Version</option>
                                                            <option> Ancienne Version</option>
                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                            
                                             <Col md="6">
                                                a
                                             </Col>
                                             <Col md="6">
                                                a
                                             </Col>
                                        </Row>

                                        <Row>

                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> Primaire </Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="filiere" onChange={handleChange} required>
                                                             <option></option>
                                                            <option> Nouvelle Version</option>
                                                            <option> Ancienne Version</option>
                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                            <Col md="6">
                                                
                                             </Col>
                                             <Col md="6">
                                                
                                             </Col>

                                        </Row>


                                        <Row>

                                            <Col>
                                                <Form.Group as={Row} className="form-group">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleInputText1"> Secondaire </Form.Label>
                                                        <select className="form-select mb-3 shadow-none" name="filiere" onChange={handleChange} required>
                                                            <option></option>
                                                            <option> Nouvelle Version</option>
                                                            <option> Ancienne Version</option>
                                                        </select>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Col>

                                          <Col md="6">
                                                
                                             </Col>
                                             <Col md="6">
                                                
                                             </Col>
                                        </Row>







                                        <div className="text-center">
                                            <Button type="button" variant="primary" onClick={submitForm} >Confirmer</Button>
                                        </div>
                                    </Form>
                                        
                                        
                                        
                                        </div>}
                                  </div>
                                </div>

                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
})

export default StatsEtablissement
