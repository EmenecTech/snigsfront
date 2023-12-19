
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




const Editnote = memo((props) => {

    const { user, http } = AuthUser();

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { niveau, idnote } = useParams();
    const etab = user.etablissement;



    const [onenote, setonenote] = useState([]);
    useEffect(() => {
        fetchOnenote();
    }, []);

    const fetchOnenote = () => {
        http.get('/one_note/' + idnote).then(res => {
            setonenote(res.data);
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }




    const submitForm = () => {
        http.put('/update_note/' + idnote, inputs).then((res) => {
            alert("Note modifiée avec succès !")
            
            window.location.reload(false);

        })



        console.log(inputs);

    }

    const coefficient = 1;




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


                        </Card.Header>
                        <Card.Body>

                            <div>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">{user.langue === "en" ? (<div>Modify Note</div>):(<div> Modifier la Note </div>)}</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                            <Form>
                            
                            {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>
 
                                 {etab == 24 ? <div>
                                  <Form.Group className="form-group">
      
                                                 <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div>Select material</div>):(<div> Sélectionner la matière </div>)}</Form.Label>
                                                 <Form.Control type="number" id="matiere" name="matiere"
                                                     defaultValue={onenote.matiere_note}
                                                     onChange={handleChange}

                                                     disabled
                                                 />
                                             </Form.Group>
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Note</div>):(<div> Note  </div>)}</Form.Label>
                                                 <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                     value={inputs.valeur_note || ''}
                                                     onChange={handleChange}
                                                 />
                                             </Form.Group>
  
                                      
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Appreciation</div>):(<div>Appréciation</div>)}</Form.Label>
 
                                           <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                           <option value={onenote.appreciation_note}>{onenote.appreciation_note} </option>
                                                     <option value="Non acquis">{user.langue === "en" ? (<div>Not acquired</div>):(<div> Non acquis  </div>)}</option>
                                                     <option value="En cours d'acquisition">{user.langue === "en" ? (<div>In course of acquisiton</div>):(<div> En cour d'acquisition </div>)}</option>
                                                     <option value="Acquis">{user.langue === "en" ? (<div>Acquired</div>):(<div> Acquis </div>)}</option>
                                                 </select>
                                            </Form.Group>
                                     
                                                <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Target skill</div>):(<div>Compétence visée</div>)}</Form.Label>
                                                 <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                     value={inputs.competence_visee || ''}
                                                     onChange={handleChange}
                                                 />
                                             </Form.Group>
                         </div> : <div>
                                 <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Group</div>):(<div>Groupes</div>)}</Form.Label>
 
                                                 <Form.Control type="number" id="matiere" name="matiere"
                                                     defaultValue={onenote.matiere_note}
                                                     onChange={handleChange}
                                                     disabled
                                                 />
                                            </Form.Group>
                                          <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Note</div>):(<div> Note  </div>)}</Form.Label>
 
                                           <select className="form-select mb-3 shadow-none" id="valeur_note" name="valeur_note" onChange={handleChange}>
                                                     <option> </option>
                                                     <option value="10">☹️</option>
                                                     <option value="15">😐</option>
                                                     <option value="20">😃</option>
                                            
                                                 </select>
                                              </Form.Group>
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Coefficient</div>):(<div> Coefficient  </div>)}</Form.Label>
                                                 <Form.Control type="number" id="coef" name="coef"
                                                     value={coefficient}
                                                     
                                                     disabled
                                                 />
                                             </Form.Group>
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Evaluation index</div>):(<div> Indices d'évaluation  </div>)}</Form.Label>
 
                                                 <Form.Control type="number" id="competence_visee" name="competence_visee"
                                                     defaultValue={onenote.competence_visee_note}
                                                     onChange={handleChange}

                                                     disabled
                                                 />
                                            </Form.Group>
                                                  <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Appreciation</div>):(<div> Appreciation </div>)}</Form.Label>
 
                                           <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                           <option value={onenote.appreciation_note}>{onenote.appreciation_note} </option>
                                                    <option value="Non acquis">{user.langue === "en" ? (<div>Not acquired</div>):(<div> Non acquis  </div>)}</option>
                                                     <option value="En cours d'acquisition">{user.langue === "en" ? (<div>In course of acquisiton</div>):(<div> En cour d'acquisition </div>)}</option>
                                                     <option value="Acquis">{user.langue === "en" ? (<div>Acquired</div>):(<div> Acquis </div>)}</option>
                                                 </select>
                                            </Form.Group>                                
                                 </div>}
                                          
                            
                                     </div>:<div>
                                     {etab == 24 ? <div>
                                             <Form.Group className="form-group">
      
                                                 <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div>Select material</div>):(<div> Sélectionner la matière  </div>)}</Form.Label>
                                                 <Form.Control type="number" id="matiere" name="matiere"
                                                     defaultValue={onenote.matiere_note}
                                                     onChange={handleChange}
                                                     disabled
                                                 />
                                             </Form.Group>
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Note</div>):(<div> Note  </div>)}</Form.Label>
                                                 <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                     value={inputs.valeur_note || ''}
                                                     onChange={handleChange}
                                                 />
                                             </Form.Group>
  
                                          
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Appreciation</div>):(<div> Appreciation  </div>)}</Form.Label>
 
                                           <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                           <option value={onenote.appreciation_note}>{onenote.appreciation_note} </option>
                                                      <option value="Non acquis">{user.langue === "en" ? (<div>Not acquired</div>):(<div> Non acquis  </div>)}</option>
                                                     <option value="En cours d'acquisition">{user.langue === "en" ? (<div>In course of acquisiton</div>):(<div> En cour d'acquisition </div>)}</option>
                                                     <option value="Acquis">{user.langue === "en" ? (<div>Acquired</div>):(<div> Acquis </div>)}</option>
                                                 </select>
                                            </Form.Group>
                                     
                                                <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Target skill</div>):(<div> Compétence visée </div>)}</Form.Label>
                                                 <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                     value={inputs.competence_visee || ''}
                                                     onChange={handleChange}
                                                 />
                                             </Form.Group>
                                         </div> : <div>
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Group</div>):(<div> Groupes </div>)}</Form.Label>
 
                                                 <Form.Control type="number" id="matiere" name="matiere"
                                                     defaultValue={onenote.matiere_note}
                                                     onChange={handleChange}
                                                     disabled
                                                 />
                                            </Form.Group>
 
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Rating index</div>):(<div> Indice d'évaluation </div>)}</Form.Label>
                                                 <Form.Control type="number" id="competence_visee" name="competence_visee"
                                                     defaultValue={onenote.competence_visee_note}
                                                     onChange={handleChange}
                                                     disabled
                                                 />
 
                                           
                                            </Form.Group>
 
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Note</div>):(<div> Note </div>)}</Form.Label>
                                                 <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                     value={inputs.valeur_note || ''}
                                                     onChange={handleChange}
                                                 />
                                             </Form.Group>
                                                 
                                             <Form.Group className='form-group'>
                                                 <Form.Label>{user.langue === "en" ? (<div>Appreciation</div>):(<div> Appréciation </div>)}</Form.Label>
 
                                           <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                     <option value={onenote.appreciation_note}>{onenote.appreciation_note} </option>
                                                     <option value="Non acquis">{user.langue === "en" ? (<div>Not acquired</div>):(<div> Non acquis  </div>)}</option>
                                                     <option value="En cours d'acquisition">{user.langue === "en" ? (<div>In course of acquisiton</div>):(<div> En cour d'acquisition </div>)}</option>
                                                     <option value="Acquis">{user.langue === "en" ? (<div>Acquired</div>):(<div> Acquis </div>)}</option>
                                                 </select>
                                            </Form.Group>
                                         </div>}
 
                                     </div>}
                 
                                     
                                         <Button variant="primary" onClick={submitForm}>
                                             {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                                         </Button>
                                     </Form>
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

export default Editnote
