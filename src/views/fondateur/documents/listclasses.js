import { Fragment, memo, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";

//circular

// AOS
import AOS from "aos";
import "../../../../node_modules/aos/dist/aos";
import "../../../../node_modules/aos/dist/aos.css";
//apexcharts

//swiper
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar

//img

//Count-up

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import Card from "../../../components/Card.js";
import * as SettingSelector from "../../../store/setting/selectors";

// install Swiper modules
SwiperCore.use([Navigation]);

const ListClassesFiche = memo((props) => {
  const [show, setShow] = useState(false);
  const { user, http } = AuthUser();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const etab = user.etablissement;
  const id_classe = user.classes;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value, etab }));
  };

  const submitForm = () => {
    http.post("/classes", inputs).then((res) => {
      alert("Classe ajoutée avec succès !");
      navigate("/List/classes/");
      window.location.reload(false);
    });

    console.log(inputs);
  };
  const [niveaux, setniveaux] = useState([]);
  useEffect(() => {
    fetchAllniveaux();
  }, []);

  const fetchAllniveaux = () => {
    http.get("/niveaux").then((res) => {
      setniveaux(res.data);
    });
  };

  const [filieres, setfilieres] = useState([]);
  useEffect(() => {
    fetchAllfilieres();
  }, []);

  const fetchAllfilieres = () => {
    http.get("/get_filieres/" + etab).then((res) => {
      setfilieres(res.data);
    });
  };

  const [classes, setclasses] = useState([]);
  useEffect(() => {
    fetchAllclasses();
  }, []);

  const fetchAllclasses = () => {
    http.get("/get_classes/" + etab).then((res) => {
      setclasses(res.data);
    });
  };

  const deleteClasses = (id) => {
    http.delete("/delete_classes/" + etab + "/" + id).then((res) => {
      fetchAllclasses();
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
                <h4 className="card-title">{user.langue === "en" ? (<div>Class</div>):(<div> Classes </div>)}</h4>
              </div>

              <Button variant="primary mt-2" onClick={handleShow}>
                <span className="btn-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
                {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter  </div>)}
              </Button>
              {/* <!-- Modal --> */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title as="h5">{user.langue === "en" ? (<div>Add a new class</div>):(<div> Ajouter une nouvelle classe  </div>)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group as={Row} className="form-group">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleInputText1">
                              {user.langue === "en" ? (<div>Title</div>):(<div> Intitulé </div>)} *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue=""
                              name="int"
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group as={Row} className="form-group">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleInputText1">
                              {user.langue === "en" ? (<div>Levels</div>):(<div> Niveaux </div>)}*
                            </Form.Label>
                            <select
                              className="form-select mb-3 shadow-none"
                              name="niveau"
                              onChange={handleChange}
                              required
                            >
                              <option></option>
                              {niveaux.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.intitule_niveau}
                                >
                                  {item.intitule_niveau}
                                </option>
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
                            <Form.Label htmlFor="exampleInputText1">
                              {user.langue === "en" ? (<div>Branch</div>):(<div> Filière </div>)}
                            </Form.Label>
                            <select
                              className="form-select mb-3 shadow-none"
                              name="filiere"
                              onChange={handleChange}
                              required
                            >
                              <option></option>
                              {filieres.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.intitule_filiere}
                                >
                                  {item.intitule_filiere}
                                </option>
                              ))}
                            </select>
                          </Form.Group>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={submitForm}
                      >
                        {user.langue === "en" ? (<div>Confirm</div>):(<div> Confirmer </div>)}
                      </Button>
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
                      <th>{user.langue === "en" ? (<div>Title</div>):(<div> Intitulé </div>)}</th>
                      <th>{user.langue === "en" ? (<div>Level</div>):(<div> Niveau </div>)}</th>
                      <th>{user.langue === "en" ? (<div>Branch</div>):(<div> Filière </div>)} </th>
                      <th>{user.langue === "en" ? (<div>Cycle</div>):(<div> Cycle </div>)} </th>
                      <th>{user.langue === "en" ? (<div>Action</div>):(<div> Actions </div>)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((item) => (
                      <tr key={item.id}>
                        <td>{item.intitule_classe}</td>
                        <td>{item.niveau_classe}</td>
                        <td>{item.filiere}</td>
                        <td>{item.cycle_niveau}</td>
                        <td>
                          <div className="flex align-items-center list-user-action">
                            <Link
                              className="btn btn-sm btn-icon btn-warning"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              data-original-title="Edit"
                              to={
                                "/FicheEleve/"+
                                item.intitule_classe
                              }
                            >
                              <span className="btn-inner">
                                <svg
                                  width="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M15.1655 4.60254L19.7315 9.16854"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </span>
                            </Link>{" "}
                            
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

export default ListClassesFiche;
