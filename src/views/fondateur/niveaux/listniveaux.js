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

const ListNiveaux = memo((props) => {
  const [show, setShow] = useState(false);
  const { user, http } = AuthUser();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const etab = user.etablissement;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value, etab }));
  };

  const submitForm = () => {
    http.post("/niveaux", inputs).then((res) => {
      alert("Niveaux ajouté avec succès !");
      navigate("/List/niveaux/");
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

  const deleteNiveaux = (id) => {
    http.delete("/niveaux/" + id).then((res) => {
      fetchAllniveaux();
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
                <h4 className="card-title">Niveaux</h4>
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
                Ajouter
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title as="h5">Ajouter un niveau</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group as={Row} className="form-group">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="exampleInputText1">
                              Intitulé *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="int_niv"
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
                              type enseignement niveau *
                            </Form.Label>
                            <select
                              className="form-select mb-3 shadow-none"
                              name="typ_ens"
                              onChange={handleChange}
                              required
                            >
                              <option></option>
                              <option value={"General"} onChange={handleChange}>
                                General
                              </option>
                              <option
                                value={"Technique"}
                                onChange={handleChange}
                              >
                                Technique
                              </option>
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
                              Cycle *
                            </Form.Label>
                            <select
                              className="form-select mb-3 shadow-none"
                              name="cycle"
                              onChange={handleChange}
                              required
                            >
                              <option></option>
                              <option
                                value={"1er cycle"}
                                onChange={handleChange}
                              >
                                1er cycle
                              </option>
                              <option
                                value={"second cycle"}
                                onChange={handleChange}
                              >
                                second cycle
                              </option>
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
                              Section
                            </Form.Label>
                            <select
                              className="form-select mb-3 shadow-none"
                              name="section"
                              onChange={handleChange}
                              required
                            >
                              <option></option>
                              <option
                                value={"francophone"}
                                onChange={handleChange}
                              >
                                francophone
                              </option>
                              <option
                                value={"Anglophone"}
                                onChange={handleChange}
                              >
                                Anglophone
                              </option>
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
                        Confirmer
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
                      <th>Intitulé</th>
                      <th>Cycle </th>
                      <th>Section</th>
               
                    </tr>
                  </thead>
                  <tbody>
                    {niveaux.map((item) => (
                      <tr key={item.id}>
                        <td>{item.intitule_niveau}</td>
                      
                        <td>{item.cycle_niveau}</td>
                        <td>{item.section_niveau}</td>
                       
                              
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

export default ListNiveaux;
