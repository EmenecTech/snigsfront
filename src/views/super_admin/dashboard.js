import React, { useState, useEffect, memo, Fragment } from "react";
import FsLightbox from "fslightbox-react";
import { Card, Row, Col, Dropdown, Button, Image, Nav, Tab, Table, Form, Modal, } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthUser from "../../components/AuthUser.js";

//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import ShareOffcanvas from "../../components/partials/components/shareoffcanvas.js";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";
import avatars11 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/02.png";
import avatars3 from "../../assets/images/avatars/03.png";
import avatars4 from "../../assets/images/avatars/04.png";
import avatars5 from "../../assets/images/avatars/05.png";
import avatars22 from "../../assets/images/avatars/avtar_1.png";
import avatars33 from "../../assets/images/avatars/avtar_2.png";
import avatars44 from "../../assets/images/avatars/avtar_3.png";
import avatars55 from "../../assets/images/avatars/avtar_4.png";
import avatars66 from "../../assets/images/avatars/avtar_5.png";

import icon1 from "../../assets/images/icons/01.png";
import icon2 from "../../assets/images/icons/02.png";
import icon3 from "../../assets/images/icons/03.png";
import icon4 from "../../assets/images/icons/04.png";
import icon6 from "../../assets/images/icons/06.png";
import icon7 from "../../assets/images/icons/07.png";
import icon8 from "../../assets/images/icons/08.png";

import icon5 from "../../assets/images/icons/05.png";
import shap2 from "../../assets/images/shapes/02.png";
import shap4 from "../../assets/images/shapes/04.png";
import shap6 from "../../assets/images/shapes/06.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import userProfileEdit from "../dashboard/app/user-privacy-setting.js";

import QRCode from 'react-qr-code';

// install Swiper modules
SwiperCore.use([Navigation]);

const Dashboard_superadmin = memo((props) => {
  const { user, http } = AuthUser();
  const [toggler, setToggler] = useState();



  const solid = [
    {
      id: '79',
      svg: 'M8.4277 3C8.8477 3 9.1887 3.33438 9.1887 3.74722C9.1887 4.15907 8.8487 4.49345 8.4277 4.49345L6.7987 4.49444C5.4467 4.4964 4.3467 5.57604 4.3467 6.90279V8.76201C4.3467 9.17386 4.0047 9.50923 3.5847 9.50923C3.1647 9.50923 2.8237 9.17386 2.8237 8.76201V6.90279C2.8237 4.75331 4.6067 3.00294 6.7977 3.00098L8.4267 3H8.4277ZM15.6006 3.00029H17.1936C19.3906 3.00029 21.1766 4.75165 21.1766 6.90603V8.7623C21.1766 9.17415 20.8366 9.50952 20.4156 9.50952C19.9956 9.50952 19.6546 9.17415 19.6546 8.7623V6.90603C19.6546 5.57535 18.5506 4.49277 17.1936 4.49277H15.6006C15.1806 4.49277 14.8396 4.15936 14.8396 3.74751C14.8396 3.33468 15.1806 3.00029 15.6006 3.00029ZM14.7625 6.74266H9.2385C7.9745 6.75541 6.9585 7.76837 6.9695 9.00883V10.2542C6.9725 10.3993 7.0915 10.518 7.2395 10.5229H16.7595C16.9085 10.5189 17.0275 10.4003 17.0325 10.2542V9.00883C17.0335 8.40968 16.7975 7.83407 16.3715 7.40554C15.9485 6.98094 15.3675 6.74266 14.7625 6.74266ZM1.762 12.0412H22.239C22.659 12.0412 23 12.3756 23 12.7885C23 13.2003 22.659 13.5337 22.239 13.5337H21.177V17.0933C21.177 19.2486 19.39 21 17.194 21H15.601C15.18 21 14.839 20.6656 14.839 20.2528C14.839 19.8409 15.18 19.5065 15.601 19.5065H17.194C18.551 19.5065 19.655 18.4249 19.655 17.0933V13.5337H17.032V14.5251C17.042 15.7656 16.027 16.7795 14.762 16.7913H9.238C7.974 16.7795 6.959 15.7656 6.969 14.5251V13.5337H4.346V17.0972C4.346 18.424 5.447 19.5036 6.8 19.5056L8.428 19.5065C8.848 19.5065 9.189 19.8409 9.189 20.2528C9.188 20.6656 8.848 21 8.427 21L6.798 20.999C4.607 20.9971 2.823 19.2467 2.823 17.0972V13.5337H1.762C1.342 13.5337 1 13.2003 1 12.7885C1 12.3756 1.342 12.0412 1.762 12.0412Z'
    },];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const etab = user.etablissement;
  const niveau = user.fonction_user;
  const classe = user.other_in_user;




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









  ////07-07-2023

  const [matieres_classe, setmatieres_classe] = useState([]);
  useEffect(() => {
    fetchAllmatieres_classe();
  }, []);
  const fetchAllmatieres_classe = () => {
    http.get('/get_matieres_for_classe/' + etab + '/' + niveau + '/' + classe).then(res => {
      setmatieres_classe(res.data);
    })
  }

  const [enseignant_in_classe, setenseignant_in_classe] = useState([]);
  useEffect(() => {
    fetchAllenseignant_in_classe();
  }, []);

  const fetchAllenseignant_in_classe = () => {
    http.get('/get_enseignant_in_classe/' + etab + '/' + classe).then(res => {
      setenseignant_in_classe(res.data);
    })
  }


  const [allg, setallg] = useState([]);
  useEffect(() => {
    fetchAllallg();
  }, []);

  const fetchAllallg = () => {
    http.get('/sum/payement/' + etab).then(res => {
      setallg(res.data);
    })
  }



  ////////////////

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

      {user.role === "Enseignant" ? (<div>

        <FsLightbox
          toggler={toggler}
          sources={[icon4, shap2, icon8, shap4, icon2, shap6, icon5, shap4, icon1]}
        />
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-wrap align-items-center">
                      <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                        <Image className="theme-color-default-img  img-fluid rounded-pill avatar-100" src={avatars11} alt="profile-pic" />
                        <Image className="theme-color-purple-img img-fluid rounded-pill avatar-100" src={avatars22} alt="profile-pic" />
                        <Image className="theme-color-blue-img img-fluid rounded-pill avatar-100" src={avatars33} alt="profile-pic" />
                        <Image className="theme-color-green-img img-fluid rounded-pill avatar-100" src={avatars55} alt="profile-pic" />
                        <Image className="theme-color-yellow-img img-fluid rounded-pill avatar-100" src={avatars66} alt="profile-pic" />
                        <Image className="theme-color-pink-img img-fluid rounded-pill avatar-100" src={avatars44} alt="profile-pic" />
                      </div>
                      <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                        <h4 className="me-2 h4">{user.name} {user.prenom}</h4>
                        <span> </span>{' '}

                        {
                          solid.map((item) => (
                            <div className="" key={item.id}>
                              <div>

                                <Button variant="btn btn-sm btn-soft-primary" title="" data-original-title="Print" onClick={handleShow}>

                                  <div id={item.id}>
                                    <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d={item.svg} fill="currentColor" />
                                    </svg>
                                  </div>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Mon QR Code</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>

                                    <QRCode value={user.nom} />

                                  </Modal.Body>
                                </Modal>

                              </div>

                            </div>
                          ))}
                      </div>
                    </div>
                    <Nav as="ul" className="d-flex nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">

                      <Nav.Item as="li">
                        <Nav.Link eventKey="first"></Nav.Link>
                      </Nav.Item>

                      <Nav.Item as="li">
                        <Nav.Link eventKey="second">Classes</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="third">Matieres</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="fourth">Notifications</Nav.Link>
                      </Nav.Item>

                    </Nav>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="8">
              <Tab.Content className="profile-content">
                <Tab.Pane eventKey="first" id="profile-profile">

                  <Card>
                    <Card.Header>
                      <div className="header-title">
                        <h4 className="card-title">Informations</h4>
                      </div>
                    </Card.Header>
                    <Card.Body>

                      <Row>
                        <Col sm="6" lg="6" >
                          <div className="mt-2">
                            <h6 className="mb-1">{user.nom}</h6>
                            <p>Nom/Name</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.prenom}</h6>
                            <p>Prenom/Surname</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.date_naissance}</h6>
                            <p>Date de naissance/Date of born</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.lieu_naissance}</h6>
                            <p>Lieu de naissance/ Born at </p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.telephone}</h6>
                            <p>Téléphone/Phone</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.email}</h6>
                            <p>Email</p>
                          </div>
                        </Col>
                        <Col sm="6" lg="6" >
                          <div className="mt-2">
                            <h6 className="mb-1">{user.role}</h6>
                            <p>Rôle</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.fonction_user}</h6>
                            <p>Matière Principale</p>
                          </div>

                        </Col>
                      </Row>


                    </Card.Body>
                  </Card>
                </Tab.Pane >

                <Tab.Pane eventKey="second" id="profile-classes">
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Classes</h4>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                        <ul className="list-inline p-0 m-0">

                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane >
                <Tab.Pane eventKey="third" id="profile-matieres">
                  <Card>
                    <Card.Header>
                      <div className="header-title">
                        <h4 className="card-title">Matières</h4>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <ul className="list-inline m-0 p-0">


                      </ul>
                    </Card.Body>
                  </Card>
                </Tab.Pane >
                <Tab.Pane eventKey="fourth" id="profile-feed">
                  <Card>
                    <Card.Header className="d-flex align-items-center justify-content-between pb-4">
                      <div className="header-title">
                        <div className="d-flex flex-wrap">
                          <div className="media-support-user-img me-3">
                            <Image className="rounded-pill img-fluid avatar-60 bg-soft-danger p-1 ps-2" src={avatars2} alt="" />
                          </div>
                          <div className="media-support-info mt-2">
                            <h5 className="mb-0">Anna Sthesia</h5>
                            <p className="mb-0 text-primary">colleages</p>
                          </div>
                        </div>
                      </div>
                      <Dropdown >
                        <Dropdown.Toggle as="span" id="dropdownMenuButton7" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                          29 mins
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton7">
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="user-post">
                        <Link to="#"><Image src={""} alt="post-image" className="img-fluid" /></Link>
                      </div>
                      <div className="comment-area p-3">
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center message-icon me-3">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                              </svg>
                              <span className="ms-1">140</span>
                            </div>
                            <div className="d-flex align-items-center feather-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" />
                              </svg>
                              <span className="ms-1">140</span>
                            </div>
                          </div>
                          <div className="share-block d-flex align-items-center feather-icon">
                            <ShareOffcanvas />
                          </div>
                        </div>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                        <hr />
                        <ul className="list-inline p-0 m-0">
                          <li className="mb-2">
                            <div className="d-flex">
                              <Image src={avatars3} alt="userimg" className="avatar-50 p-1 pt-2 bg-soft-primary rounded-pill img-fluid" />
                              <div className="ms-3">
                                <h6 className="mb-1">Monty Carlo</h6>
                                <p className="mb-1">Lorem ipsum dolor sit amet</p>
                                <div className="d-flex flex-wrap align-items-center mb-1">
                                  <Link to="#" className="me-3">
                                    <svg width="20" height="20" className="text-body me-1" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                                    </svg>
                                    like
                                  </Link>
                                  <Link to="#" className="me-3">
                                    <svg width="20" height="20" className="me-1" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M8,9.8V10.7L9.7,11C12.3,11.4 14.2,12.4 15.6,13.7C13.9,13.2 12.1,12.9 10,12.9H8V14.2L5.8,12L8,9.8M10,5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9" />
                                    </svg>
                                    reply
                                  </Link>
                                  <Link to="#" className="me-3">translate</Link>
                                  <span> 5 min </span>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex">
                              <Image src={avatars4} alt="userimg" className="avatar-50 p-1 bg-soft-danger rounded-pill img-fluid" />
                              <div className="ms-3">
                                <h6 className="mb-1">Paul Molive</h6>
                                <p className="mb-1">Lorem ipsum dolor sit amet</p>
                                <div className="d-flex flex-wrap align-items-center">
                                  <Link to="#" className="me-3">
                                    <svg width="20" height="20" className="text-body me-1" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                                    </svg>
                                    like
                                  </Link>
                                  <Link to="#" className="me-3">
                                    <svg width="20" height="20" className="me-1" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M8,9.8V10.7L9.7,11C12.3,11.4 14.2,12.4 15.6,13.7C13.9,13.2 12.1,12.9 10,12.9H8V14.2L5.8,12L8,9.8M10,5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9" />
                                    </svg>
                                    reply
                                  </Link>
                                  <Link to="#" className="me-3">translate</Link>
                                  <span> 5 min </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <Form className="comment-text d-flex align-items-center mt-3" action="">
                          <Form.Control type="text" className="rounded" placeholder="Lovely!" />
                          <div className="comment-attagement d-flex">
                            <Link to="#" className="me-2 text-body">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                              </svg>
                            </Link>
                            <Link to="#" className="text-body">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z" />
                              </svg>
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header className="d-flex align-items-center justify-content-between pb-4">
                      <div className="header-title">
                        <div className="d-flex flex-wrap">
                          <div className="media-support-user-img me-3">
                            <Image className="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src={avatars5} alt="" />
                          </div>
                          <div className="media-support-info mt-2">
                            <h5 className="mb-0">Wade Warren</h5>
                            <p className="mb-0 text-primary">colleages</p>
                          </div>
                        </div>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle as="span" id="dropdownMenuButton07" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                          1 Hr
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton07">
                          <Dropdown.Item href="#">Action</Dropdown.Item >
                          <Dropdown.Item href="#">Another action</Dropdown.Item >
                          <Dropdown.Item href="#">Something else here</Dropdown.Item >
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <p className="p-3 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                      <div className="comment-area p-3"><hr className="mt-0" />
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center message-icon me-3">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                              </svg>
                              <span className="ms-1">140</span>
                            </div>
                            <div className="d-flex align-items-center feather-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" />
                              </svg>
                              <span className="ms-1">140</span>
                            </div>
                          </div>
                          <div className="share-block d-flex align-items-center feather-icon">
                            <ShareOffcanvas />
                          </div>
                        </div>
                        <Form className="comment-text d-flex align-items-center mt-3" action="">
                          <Form.Control type="text" className="rounded" placeholder="Lovely!" />
                          <div className="comment-attagement d-flex">
                            <Link to="#" className="me-2 text-body">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                              </svg>
                            </Link>
                            <Link to="#" className="text-body">
                              <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z" />
                              </svg>
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

              </Tab.Content>
            </Col>
            <Col lg="4">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">A Propos</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <p>Lorem ipsum dolor sit amet, contur adipiscing elit.</p>
                  <div className="mb-1">Email: <Link to="#" className="ms-3">{user.email}</Link></div>
                  <div className="mb-1">Phone: <Link to="#" className="ms-3">{user.telephone}</Link></div>
                  <div>Location: <span className="ms-3">{user.lieu_naissance}</span></div>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Tab.Container>


      </div>) : (<div></div>)}

      {user.role === "Elève" ? (<div>

        <FsLightbox
          toggler={toggler}
          sources={[
            icon4,
            shap2,
            icon8,
            shap4,
            icon2,
            shap6,
            icon5,
            shap4,
            icon1,
          ]}
        />
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-wrap align-items-center">
                      <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                        <Image
                          className="theme-color-default-img  img-fluid rounded-pill avatar-100"
                          src={avatars11}
                          alt="profile-pic"
                        />
                        <Image
                          className="theme-color-purple-img img-fluid rounded-pill avatar-100"
                          src={avatars22}
                          alt="profile-pic"
                        />
                        <Image
                          className="theme-color-blue-img img-fluid rounded-pill avatar-100"
                          src={avatars33}
                          alt="profile-pic"
                        />
                        <Image
                          className="theme-color-green-img img-fluid rounded-pill avatar-100"
                          src={avatars55}
                          alt="profile-pic"
                        />
                        <Image
                          className="theme-color-yellow-img img-fluid rounded-pill avatar-100"
                          src={avatars66}
                          alt="profile-pic"
                        />
                        <Image
                          className="theme-color-pink-img img-fluid rounded-pill avatar-100"
                          src={avatars44}
                          alt="profile-pic"
                        />
                      </div>
                      <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                        <h4 className="me-2 h4">
                          {user.nom} {user.prenom}
                        </h4>{' '}

                        {
                          solid.map((item) => (
                            <div className="" key={item.id}>
                              <div>

                                <Button variant="btn btn-sm btn-soft-primary" title="" data-original-title="Print" onClick={handleShow}>

                                  <div id={item.id}>
                                    <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d={item.svg} fill="currentColor" />
                                    </svg>
                                  </div>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Mon QR Code</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>

                                    <QRCode value={user.nom} />

                                  </Modal.Body>
                                </Modal>

                              </div>

                            </div>
                          ))}
                        <span> </span>
                      </div>
                    </div>
                    <Nav
                      as="ul"
                      className="d-flex nav-pills mb-0 text-center profile-tab"
                      data-toggle="slider-tab"
                      id="profile-pills-tab"
                      role="tablist"
                    >

                        {user.langue === "en" ? (<div>


                        <Nav.Item as="li">
                        <Nav.Link eventKey="first">Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="second">Teachers</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="third">Courses</Nav.Link>
                      </Nav.Item>
                     
                    </Nav>
                        
                        
                        </div>):(<div>



                        <Nav.Item as="li">
                        <Nav.Link eventKey="first">Profil</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="second">Enseignants</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="third">Matières</Nav.Link>
                      </Nav.Item>
                     
                    </Nav>
                        
                        </div>)}
                      
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="8">
              <Tab.Content className="profile-content">
                <Tab.Pane eventKey="first" id="profile-profile">

                  <Card>
                    <Card.Header>
                      <div className="header-title">
                        <h4 className="card-title">Informations</h4>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col sm="6" lg="6"><div className="mt-2">
                          <h6 className="mb-0">{user.nom}</h6>
                          <p>Nom / Name</p>
                        </div>
                          <div className="mt-2">
                            <h6 className="mb-0">{user.prenom}</h6>
                            <p>Prenom / Surname</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-0">{user.date_naissance}</h6>
                            <p>Date de naissance / Date of born</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-0">{user.lieu_naissance}</h6>
                            <p>Lieu de naissance / Born at</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-0">{user.telephone}</h6>
                            <p>Téléphone / Phone</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-0">{user.email}</h6>
                            <p>Email</p>
                          </div>

                        </Col>
                        <Col sm="6" lg="6"><div className="mt-2">
                          <h6 className="mb-1">{user.role}</h6>
                          <p>Rôle / Role</p>
                        </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.fonction_user}</h6>
                            <p>Niveau / Level</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">{user.other_in_user}</h6>
                            <p>Classe / Class</p>
                          </div>
                          <div className="mt-2">
                            <h6 className="mb-1">F10923</h6>
                            <p>Matricule / Register</p>
                          </div>


                        </Col>

                      </Row>




                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second" id="profile-activity">
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Enseignants</h4>
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
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Matière principale</th>
                              <th>Matière Enseigné</th>
                              <th>Email</th>

                            </tr>
                          </thead>
                          <tbody>


                            {enseignant_in_classe.map((item) => (
                              <tr key={item.id}>
                                <td>{item.nom}</td>
                                <td>{item.prenom}</td>
                                <td>{item.fonction_user}</td>
                                <td>{item.matiere_cp}</td>
                                <td>{item.email}</td>

                              </tr>
                            ))}

                          </tbody>
                          <tfoot>

                          </tfoot>
                        </Table>

                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="third" id="profile-friends">
                  <Card>
                    <Card.Header>
                      <div className="header-title">
                        <h4 className="card-title">Matières</h4>
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
                              <th>Matiere</th>
                              <th>Coefficient </th>
                              <th>Groupe</th>

                            </tr>
                          </thead>
                          <tbody>
                            {matieres_classe.map((item) => (
                              <tr key={item.id}>
                                <td>{item.matiere_cm}</td>
                                <td>{item.coefficient_cm}</td>
                                <td>{item.groupe_cm}</td>


                              </tr>
                            ))}
                          </tbody>
                          <tfoot>

                          </tfoot>
                        </Table>

                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth" id="profile-feed">

                  <Card>
                    <Card.Header>

                    </Card.Header>
                    <Card.Body>
                      <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                        <ul className="list-inline p-0 m-0">
                          <li>
                            <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                            <h6 className="float-left mb-1">Client Login</h6>
                            <small className="float-right mt-1">
                              24 November 2019
                            </small>
                            <div className="d-inline-block w-100">
                              <p>
                                Bonbon macaroon jelly beans gummi bears jelly
                                lollipop apple
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-dots timeline-dot1 border-success text-success"></div>
                            <h6 className="float-left mb-1">
                              Scheduled Maintenance
                            </h6>
                            <small className="float-right mt-1">
                              23 November 2019
                            </small>
                            <div className="d-inline-block w-100">
                              <p>
                                Bonbon macaroon jelly beans gummi bears jelly
                                lollipop apple
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-dots timeline-dot1 border-danger text-danger"></div>
                            <h6 className="float-left mb-1">Dev Meetup</h6>
                            <small className="float-right mt-1">
                              20 November 2019
                            </small>
                            <div className="d-inline-block w-100">
                              <p>
                                Bonbon macaroon jelly beans{" "}
                                <Link to="#">gummi bears</Link>gummi bears jelly
                                lollipop apple
                              </p>
                              <div className="iq-media-group iq-media-group-1">
                                <Link to="#" className="iq-media-1">
                                  <div className="icon iq-icon-box-3 rounded-pill">
                                    SP
                                  </div>
                                </Link>
                                <Link to="#" className="iq-media-1">
                                  <div className="icon iq-icon-box-3 rounded-pill">
                                    PP
                                  </div>
                                </Link>
                                <Link to="#" className="iq-media-1">
                                  <div className="icon iq-icon-box-3 rounded-pill">
                                    MM
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                            <h6 className="float-left mb-1">Client Call</h6>
                            <small className="float-right mt-1">
                              19 November 2019
                            </small>
                            aus
                            <div className="d-inline-block w-100">
                              <p>
                                Bonbon macaroon jelly beans gummi bears jelly
                                lollipop apple
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-dots timeline-dot1 border-warning text-warning"></div>
                            <h6 className="float-left mb-1">Mega event</h6>
                            <small className="float-right mt-1">
                              15 November 2019
                            </small>
                            <div className="d-inline-block w-100">
                              <p>
                                Bonbon macaroon jelly beans gummi bears jelly
                                lollipop apple
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
            <Col lg="4">
              {/* A Propos */}
              {user.langue === "en" ? (<div>

                  <Card>

                <Card.Body>
                  <p></p>
                  <div className="mb-1">
                    Enseignant principal:{" "}
                    <Link to="#" className="ms-3">
                     Main teacher
                    </Link>
                  </div>
                  <div className="mb-1">
                    Effectif:{" "}
                    <Link to="#" className="ms-3">
                     Number
                    </Link>
                  </div>

                </Card.Body>
              </Card>
                
                </div>):
                (<div>

                  <Card>

                <Card.Body>
                  <p></p>
                  <div className="mb-1">
                    Enseignant principal:{" "}
                    <Link to="#" className="ms-3">
                      Enseignant principal
                    </Link>
                  </div>
                  <div className="mb-1">
                    Effectif:{" "}
                    <Link to="#" className="ms-3">
                      Effectif
                    </Link>
                  </div>

                </Card.Body>
              </Card>
                
                </div>)}
            

              {/* fin a Propos */}

            </Col>
          </Row>
        </Tab.Container>

      </div>) : (<div>


        {user.role === "Fondateur" ? (<div>

          <Row>
            <Col md="12" lg="12">
              <Row className="row-cols-1">
                <div className="overflow-hidden d-slider1 " data-aos="fade-up" data-aos-delay="800">
                  <Swiper
                    className="p-0 m-0 mb-2 list-inline "
                    slidesPerView={5}
                    spaceBetween={32}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      550: { slidesPerView: 2 },
                      991: { slidesPerView: 3 },
                      1400: { slidesPerView: 3 },
                      1500: { slidesPerView: 4 },
                      1920: { slidesPerView: 4 },
                      2040: { slidesPerView: 7 },
                      2440: { slidesPerView: 8 }
                    }}

                  >
                    <SwiperSlide className="card card-slide" >
                      <div className="card-body">
                        <div className="progress-widget">
                          <Circularprogressbar
                            stroke={variableColors.primary}
                            width="60px"
                            height="60px"
                            Linecap="rounded"
                            trailstroke="#ddd"
                            strokewidth="4px"
                            style={{ width: 60, height: 60 }}
                            value={90}
                            id="circle-progress-01"
                          >
                            <svg
                              className=""
                              width="24"
                              height="24px"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                              />
                            </svg>
                          </Circularprogressbar>
                          <div className="progress-detail">
                            <p className="mb-2">Administration</p>
                            <h4 className="counter">
                              <CountUp start={0} end={nbrad} duration={3} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>{' '}

                    {
                      solid.map((item) => (
                        <div className="" key={item.id}>
                          <div>

                            <Button variant="btn btn-sm btn-soft-primary" title="" data-original-title="Print" onClick={handleShow}>

                              <div id={item.id}>
                                <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d={item.svg} fill="currentColor" />
                                </svg>
                              </div>
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Mon QR Code</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>

                                <QRCode value={user.nom} />

                              </Modal.Body>
                            </Modal>

                          </div>

                        </div>
                      ))}
                    <SwiperSlide className=" card card-slide">
                      <div className="card-body">
                        <div className="progress-widget">
                          <Circularprogressbar
                            stroke={variableColors.info}
                            width="60px"
                            height="60px"
                            trailstroke="#ddd"
                            strokewidth="4px"
                            Linecap="rounded"
                            style={{ width: 60, height: 60 }}
                            value={60}
                            id="circle-progress-02"
                          >
                            <svg
                              className=""
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                              />
                            </svg>
                          </Circularprogressbar>
                          <div className="progress-detail">
                            <p className="mb-2">Enseignants</p>
                            <h4 className="counter">
                              <CountUp start={0} end={nbrens} duration={5} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className=" card card-slide">
                      <div className="card-body">
                        <div className="progress-widget">
                          <Circularprogressbar
                            stroke={variableColors.primary}
                            width="60px"
                            height="60px"
                            trailstroke="#ddd"
                            strokewidth="4px"
                            Linecap="rounded"
                            style={{ width: 60, height: 60 }}
                            value={70}
                            id="circle-progress-03"
                          >
                            <svg className="" width="24" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                              />
                            </svg>
                          </Circularprogressbar>
                          <div className="progress-detail">
                            <p className="mb-2">Elèves</p>
                            <h4 className="counter">
                              <CountUp start={0} end={nbreleve} duration={3} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className=" card card-slide">
                      <div className="card-body">
                        <div className="progress-widget">
                          <Circularprogressbar
                            stroke={variableColors.info}
                            width="60px"
                            height="60px"
                            trailstroke="#ddd"
                            strokewidth="4px"
                            Linecap="rounded"
                            style={{ width: 60, height: 60 }}
                            value={60}
                            id="circle-progress-04"
                          >
                            <svg
                              className=""
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                              />
                            </svg>
                          </Circularprogressbar>
                          <div className="progress-detail">
                            <p className="mb-2">Elèves Préinscrits</p>
                            <h4 className="counter">
                              <CountUp start={0} end={nbrpreins} duration={3} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className=" card card-slide">
                      <div className="card-body">
                        <div className="progress-widget">
                          <Circularprogressbar
                            stroke={variableColors.primary}
                            width="60px"
                            height="60px"
                            trailstroke="#ddd"
                            strokewidth="4px"
                            Linecap="rounded"
                            style={{ width: 60, height: 60 }}
                            value={50}
                            id="circle-progress-05"
                          >
                            <svg
                              className=""
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                              />
                            </svg>
                          </Circularprogressbar>
                          <div className="progress-detail">
                            <p className="mb-2">Elèves archivés</p>
                            <h4 className="counter">
                              <CountUp start={0} end={nbrarchv} duration={3} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>


                    <div className="swiper-button swiper-button-next"></div>
                    <div className="swiper-button swiper-button-prev"></div>
                  </Swiper>
                </div>
              </Row>
            </Col >
            <Col md="12" lg="8">
              <Row>
                <Col md="12">
                  <div className="card" data-aos="fade-up" data-aos-delay="800">
                    <div className="flex-wrap card-header d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title"></h4>
                        <p className="mb-0">Statistiques sur les utilisateurs</p>
                      </div>
                      <div className="d-flex align-items-center align-self-center">
                        <div className="d-flex align-items-center text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <g>
                              <circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="currentColor"
                              ></circle>
                            </g>
                          </svg>
                          <div className="ms-2">
                            <span className="text-gray">Inscrits</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center ms-3 text-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <g>
                              <circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="currentColor"
                              ></circle>
                            </g>
                          </svg>
                          <div className="ms-2">
                            <span className="text-gray">Non Inscrits</span>
                          </div>
                        </div>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="text-gray"
                          type="button"
                          id="dropdownMenuButtonSM"
                        >
                          Cette semaine
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Cette semaine</Dropdown.Item>
                          <Dropdown.Item href="#">This Month</Dropdown.Item>
                          <Dropdown.Item href="#">This Year</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="card-body">
                      <Chart
                        options={chart1.options}
                        series={chart1.series}
                        type="area"
                        height="245"
                      />
                    </div>
                  </div>
                </Col>
                <Col md="12" xl="6">
                  <div className="card" data-aos="fade-up" data-aos-delay="900">
                    <div className="flex-wrap card-header d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Absences</h4>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="text-gray"
                          type="button"
                          id="dropdownMenuButtonSM"
                        >
                          Cette semaine
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Cette semaine</Dropdown.Item>
                          <Dropdown.Item href="#">This Month</Dropdown.Item>
                          <Dropdown.Item href="#">This Year</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="card-body">
                      <div className="flex-wrap d-flex align-items-center justify-content-between">
                        <Chart
                          className="col-md-8 col-lg-8"
                          options={chart2.options}
                          series={chart2.series}
                          type="radialBar"
                          height="250"
                        />
                        <div className="d-grid gap col-md-4 col-lg-4">
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill="#3a57e8"
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill="#3a57e8"
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Enseignants</span>
                              <h6>0</h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill="#4bc7d2"
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill="#4bc7d2"
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Elèves</span>
                              <h6>0</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="12" xl="6">
                  <div className="card" data-aos="fade-up" data-aos-delay="1000">
                    <div className="flex-wrap card-header d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Cours</h4>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="text-gray"
                          type="button"
                          id="dropdownMenuButtonSM"
                        >
                          Cette semaine
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Cette semaine</Dropdown.Item>
                          <Dropdown.Item href="#">This Month</Dropdown.Item>
                          <Dropdown.Item href="#">This Year</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="card-body">
                      <Chart
                        className="d-activity"
                        options={chart3.options}
                        series={chart3.series}
                        type="bar"
                        height="230"
                      />
                    </div>
                  </div>
                </Col>

              </Row>
            </Col>
            <Col md="12" lg="4">
              <Row>
                <Col md="12" lg="12">
                  <div
                    className="card credit-card-widget"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="pb-4 border-0 card-header">
                      <div className="p-4 border border-white rounded primary-gradient-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="font-weight-bold">REVENUS</h5>
                            <p className="mb-0">SOLDE</p>
                          </div>
                          <div className="master-card-content">
                            <svg
                              className="master-card-1"
                              width="60"
                              height="60"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ffffff"
                                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                              />
                            </svg>
                            <svg
                              className="master-card-2"
                              width="60"
                              height="60"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ffffff"
                                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="card-number">
                            <span className="fs-5 me-2">{allg}</span>

                            <span className="fs-5 me-2">XAF</span>
                          </div>
                        </div>
                        <div className="mb-2 d-flex align-items-center justify-content-between">

                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6>Nom établissement</h6>
                          <h6 className="ms-5"></h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">

                     
                

                    </div>
                  </div>

                </Col>

              </Row>
            </Col>
          </Row >

        </div>) : (<div></div>)}

      </div >)}
    </Fragment >
  );
})

export default Dashboard_superadmin
