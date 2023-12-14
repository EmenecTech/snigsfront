import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
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


const ListEtablissements = memo((props) => {
    const { http, setToken, user } = AuthUser();
    const [etablissements, setEtablissements] = useState([]);
    useEffect(() => {
        fetchAllEtablissements();
    }, []);

    const fetchAllEtablissements = () => {
        http.get('/etablissements').then(res => {
            setEtablissements(res.data);
        })
    }
    const type = "Universitaire";


    const [etablissementsuni, setEtablissementsuni] = useState([]);
    useEffect(() => {
        fetchAllEtablissementsuni();
    }, []);

    const fetchAllEtablissementsuni = () => {
        http.get('type/etablissements/Universitaire').then(res => {
            setEtablissementsuni(res.data);
        })
    }

    const [etablissementssec, setEtablissementssec] = useState([]);
    useEffect(() => {
        fetchAllEtablissementssec();
    }, []);

    const fetchAllEtablissementssec = () => {
        http.get('/type/etablissements/Secondaire').then(res => {
            setEtablissementssec(res.data);
        })
    }

     const [etablissementsprim, setEtablissementsprim] = useState([]);
    useEffect(() => {
        fetchAllEtablissementsprim();
    }, []);

    const fetchAllEtablissementsprim = () => {
        http.get('/type/etablissements/Primaire').then(res => {
            setEtablissementsprim(res.data);
        })
    }

     const [etablissementsmat, setEtablissementsmat] = useState([]);
    useEffect(() => {
        fetchAllEtablissementsmat();
    }, []);

    const fetchAllEtablissementsmat = () => {
        http.get('/type/etablissements/Maternelle').then(res => {
            setEtablissementsmat(res.data);
        })
    }



    
     const deleteEtablissement = (id) => {
         if(window.confirm("Voulez-vous supprimer cet élément?") == true){ 
        http.delete('/delete_etablissement/' + id).then(res => {
            fetchAllEtablissements();
        })
             alert('Supprimé!');
    }
    }

    const suspendreEtablissement = (nom) => {
        if(window.confirm("Confirmer la suspension") == true){ 
            
            http.get('/suspendre_etablissement/' + nom).then(res => {
            })
            
             alert('Etablissement suspendu !');
        }
        
        
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
                                <h4 className="card-title">{user.langue === "en" ? (<div>List of universities Schools</div>):(<div> Liste des établissements universitaire </div>)}</h4>
                            </div>

                            <Link to="/etablissement/add/super/admin">
                                <Button type="button" variant="primary">
                                    <span className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                    {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                                </Button>
                            </Link>
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
                                            <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Cygle</div>):(<div> Cygle </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Level of teaching</div>):(<div> Niveau d'enseignement </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Email</div>):(<div> Email </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Country</div>):(<div> Pays </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Department</div>):(<div> Département </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>City</div>):(<div> Ville </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Address</div>):(<div> Adresse </div>)}</th> 
                                            <th>{user.langue === "en" ? (<div>Billing type</div>):(<div> Type de facturation </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Pre-registration</div>):(<div> Préinscription </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Actions</div>):(<div> Actions </div>)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {etablissementsuni.map((item, key) => (
                                            <tr key={key}>
                                                <td> <Link to={"/Stats/Etablissments/" +  item.nom_etablissement + "/" +  item.id}  style={{ textDecoration: 'none' }}> {item.nom_etablissement} </Link></td>
                                                <td>{item.cygle}</td>
                                                <td>{item.niveau_enseignement}</td>
                                                <td>{item.email_etablissement}</td>
                                                <td>{item.telephone}</td>
                                                <td>{item.pays_etablissement}</td>
                                                <td>{item.departement_etablissement}</td>
                                                <td>{item.ville_etablissement}</td>
                                                <td>{item.adresse_etablissement}</td>


                                                <td>{item.facturation_etablissement}</td>

                                                <td>{item.payement_prinsciption}</td>
                                                <td>    <div className="flex align-items-center list-user-action">


                                                   
    
                                                    <Link className="btn btn-sm btn-icon btn-info" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Stats/Etablissments/" +  item.nom_etablissement + "/"  + item.id}>
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}

                                                    {item.state === "off" ? (
                                                        <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Restore</div>):(<div> Rétablir </div>)}
                                                        </Link>
                                                        
                                                        ):(

                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Suspend</div>):(<div> Suspendre </div>)}
                                                        </Link>
                                                        
                                                        )}
                                                     
                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete"  onClick={() => { deleteEtablissement(item.id) }} >
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}
                                                </div></td>



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
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>List of secondary schools</div>):(<div> Liste des établissements secondaires </div>)}</h4>
                            </div>

                            <Link to="/etablissement/add/super/admin">
                                <Button type="button" variant="primary">
                                    <span className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                    {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                                </Button>
                            </Link>
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
                                            <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Cygle</div>):(<div> Cygle </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Level of teaching</div>):(<div> Niveau d'enseignement </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Email</div>):(<div> Email </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Country</div>):(<div> Pays </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Department</div>):(<div> Département </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>City</div>):(<div> Ville </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Address</div>):(<div> Adresse </div>)}</th> 
                                            <th>{user.langue === "en" ? (<div>Billing type</div>):(<div> Type de facturation </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Pre-registration</div>):(<div> Préinscription </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Actions</div>):(<div> Actions </div>)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etablissementssec.map((item) => (
                                            <tr key={item.id}>
                                                <td> <Link to={"/Stats/Etablissments/" +  item.nom_etablissement + "/" +  item.id}  style={{ textDecoration: 'none' }}> {item.nom_etablissement} </Link></td>
                                                <td>{item.cygle}</td>
                                                <td>{item.niveau_enseignement}</td>
                                                <td>{item.email_etablissement}</td>
                                                <td>{item.telephone}</td>
                                                <td>{item.pays_etablissement}</td>
                                                <td>{item.departement_etablissement}</td>
                                                <td>{item.ville_etablissement}</td>
                                                <td>{item.adresse_etablissement}</td>


                                                <td>{item.facturation_etablissement}</td>

                                                <td>{item.payement_prinsciption}</td>
                                                <td>    <div className="flex align-items-center list-user-action">


                                                   
    
                                                    <Link className="btn btn-sm btn-icon btn-info" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Stats/Etablissments/" +  item.nom_etablissement + "/"  + item.id}>
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}

                                                    {item.state === "off" ? (
                                                        <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Restore</div>):(<div> Rétablir </div>)}
                                                        </Link>
                                                        
                                                        ):(

                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Suspend</div>):(<div> Suspendre </div>)}
                                                        </Link>
                                                        
                                                        )}
                                                     
                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete"  onClick={() => { deleteEtablissement(item.id) }} >
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}
                                                </div></td>



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

                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>List of primary schools</div>):(<div> Liste des établissements primaires </div>)}</h4>
                            </div>

                            <Link to="/etablissement/add/super/admin">
                                <Button type="button" variant="primary">
                                    <span className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                   {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                                </Button>
                            </Link>
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
                                            <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Cygle</div>):(<div> Cygle </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Level of teaching</div>):(<div> Niveau d'enseignement </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Email</div>):(<div> Email </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Country</div>):(<div> Pays </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Department</div>):(<div> Département </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>City</div>):(<div> Ville </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Address</div>):(<div> Adresse </div>)}</th> 
                                            <th>{user.langue === "en" ? (<div>Billing type</div>):(<div> Type de facturation </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Pre-registration</div>):(<div> Préinscription </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Actions</div>):(<div> Actions </div>)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etablissementsprim.map((item) => (
                                            <tr key={item.id}>
                                                <td> <Link to={"/Stats/Etablissments/" +  item.nom_etablissement + "/" +  item.id}  style={{ textDecoration: 'none' }}> {item.nom_etablissement} </Link></td>
                                                <td>{item.cygle}</td>
                                                <td>{item.niveau_enseignement}</td>
                                                <td>{item.email_etablissement}</td>
                                                <td>{item.telephone}</td>
                                                <td>{item.pays_etablissement}</td>
                                                <td>{item.departement_etablissement}</td>
                                                <td>{item.ville_etablissement}</td>
                                                <td>{item.adresse_etablissement}</td>


                                                <td>{item.facturation_etablissement}</td>

                                                <td>{item.payement_prinsciption}</td>
                                                <td>    <div className="flex align-items-center list-user-action">


                                                   
    
                                                    <Link className="btn btn-sm btn-icon btn-info" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Stats/Etablissments/" +  item.nom_etablissement + "/"  + item.id}>
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}

                                                    {item.state === "off" ? (
                                                        <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Restore</div>):(<div> Rétablir </div>)}
                                                        </Link>
                                                        
                                                        ):(

                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Suspend</div>):(<div> Suspendre </div>)}
                                                        </Link>
                                                        
                                                        )}
                                                     
                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete"  onClick={() => { deleteEtablissement(item.id) }} >
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}
                                                </div></td>



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

                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">{user.langue === "en" ? (<div>List of nursery schools</div>):(<div> Liste des établissements maternelles </div>)}</h4>
                            </div>

                            <Link to="/etablissement/add/super/admin">
                                <Button type="button" variant="primary">
                                    <span className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                    {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter </div>)}
                                </Button>
                            </Link>
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
                                            <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Cygle</div>):(<div> Cygle </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Level of teaching</div>):(<div> Niveau d'enseignement </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Email</div>):(<div> Email </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Phone</div>):(<div> Téléphone </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Country</div>):(<div> Pays </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Department</div>):(<div> Département </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>City</div>):(<div> Ville </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Address</div>):(<div> Adresse </div>)}</th> 
                                            <th>{user.langue === "en" ? (<div>Billing type</div>):(<div> Type de facturation </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Pre-registration</div>):(<div> Préinscription </div>)}</th>
                                            <th>{user.langue === "en" ? (<div>Actions</div>):(<div> Actions </div>)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etablissementsmat.map((item) => (
                                            <tr key={item.id}>
                                                <td> <Link to={"/Stats/Etablissments/" +  item.nom_etablissement + "/" +  item.id}  style={{ textDecoration: 'none' }}> {item.nom_etablissement} </Link></td>
                                                <td>{item.cygle}</td>
                                                <td>{item.niveau_enseignement}</td>
                                                <td>{item.email_etablissement}</td>
                                                <td>{item.telephone}</td>
                                                <td>{item.pays_etablissement}</td>
                                                <td>{item.departement_etablissement}</td>
                                                <td>{item.ville_etablissement}</td>
                                                <td>{item.adresse_etablissement}</td>


                                                <td>{item.facturation_etablissement}</td>

                                                <td>{item.payement_prinsciption}</td>
                                                <td>    <div className="flex align-items-center list-user-action">


                                                   
    
                                                    <Link className="btn btn-sm btn-icon btn-info" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Stats/Etablissments/" +  item.nom_etablissement + "/"  + item.id}>
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}

                                                    {item.state === "off" ? (
                                                        <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Restore</div>):(<div> Rétablir </div>)}
                                                        </Link>
                                                        
                                                        ):(

                                                        <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit"  onClick={() => { suspendreEtablissement(item.nom_etablissement) }} >
                                                            {user.langue === "en" ? (<div>Suspend</div>):(<div> Suspendre </div>)}
                                                        </Link>
                                                        
                                                        )}
                                                     
                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete"  onClick={() => { deleteEtablissement(item.id) }} >
                                                        <span className="btn-inner">
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </span>
                                                    </Link>{' '}
                                                </div></td>



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

export default ListEtablissements
