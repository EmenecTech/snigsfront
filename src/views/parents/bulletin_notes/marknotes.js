import Axios from "axios";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
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

import { useReactToPrint } from "react-to-print";

// install Swiper modules
SwiperCore.use([Navigation]);

const ParentsBulletinNotes = memo((props) => {
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
    http
      .get(
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
    http
      .get("/avatar/images/" + user.profile_photo_path, {
        cancelToken: imageRef.current.token,
        responseType: "arraybuffer",
      })
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
    http
      .get("/get_matieres_niveau_planning/" + niveau + "/" + etab)
      .then((res) => {
        setmatiereslevel(res.data);
      });
  };

  const [notesfg, setNotesfg] = useState([]);
  useEffect(() => {
    fetchAllNotesfg();
  }, []);

  const fetchAllNotesfg = () => {
    http
      .get(
        "/notes_fristgroupe/" +
          etab +
          "/" +
          classe +
          "/" +
          evaluation +
          "/" +
          userid
      )
      .then((res) => {
        setNotesfg(res.data);
      });
  };

  const [notessg, setNotessg] = useState([]);
  useEffect(() => {
    fetchAllNotessg();
  }, []);

  const fetchAllNotessg = () => {
    http
      .get(
        "/notes_secondgroupe/" +
          etab +
          "/" +
          classe +
          "/" +
          evaluation +
          "/" +
          userid
      )
      .then((res) => {
        setNotessg(res.data);
      });
  };

  const [notestg, setNotestg] = useState([]);
  useEffect(() => {
    fetchAllNotestg();
  }, []);

  const fetchAllNotestg = () => {
    http
      .get(
        "/notes_thirdgroupe/" +
          etab +
          "/" +
          classe +
          "/" +
          evaluation +
          "/" +
          userid
      )
      .then((res) => {
        setNotestg(res.data);
      });
  };

  const [sumnotes, setsumnotes] = useState([]);
  useEffect(() => {
    fetchAllsumnotes();
  }, []);

  const fetchAllsumnotes = () => {
    http
      .get(
        "/sum/of/notes/" + etab + "/" + classe + "/" + evaluation + "/" + userid
      )
      .then((res) => {
        setsumnotes(res.data);
      });
  };
  const [sumcoef, setsumcoef] = useState([]);
  useEffect(() => {
    fetchAllsumcoef();
  }, []);

  const fetchAllsumcoef = () => {
    http
      .get(
        "/sum/of/coef/" + etab + "/" + classe + "/" + evaluation + "/" + userid
      )
      .then((res) => {
        setsumcoef(res.data);
      });
  };
  const [sumnotesfinale, setsumnotesfinale] = useState([]);
  useEffect(() => {
    fetchAllsumnotesfinale();
  }, []);

  const fetchAllsumnotesfinale = () => {
    http
      .get(
        "/sum/of/final/notes/" +
          etab +
          "/" +
          classe +
          "/" +
          evaluation +
          "/" +
          userid
      )
      .then((res) => {
        setsumnotesfinale(res.data);
      });
  };
  const [moyenneleve, setmoyenneleve] = useState([]);
  useEffect(() => {
    fetchAllmoyenneleve();
  }, []);

  const fetchAllmoyenneleve = () => {
    http
      .get(
        "/moyenne/eleve/" +
          etab +
          "/" +
          classe +
          "/" +
          evaluation +
          "/" +
          userid
      )
      .then((res) => {
        setmoyenneleve(res.data);
      });
  };

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
                Imprimer
              </Button>

              {/* <!-- Modal --> */}
            </Card.Header>
            <Card.Body>
              <div
                ref={componentRef}
                style={{ width: "100%", height: window.innerHeight }}
              >
                <Row>
                  <Col sm="12" lg="12">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <div className="header-title"></div>
                      </Card.Header>
                      <Card.Body>
                        <div>
                          <Row>
                            <Col sm="4" lg="4">
                              <p className="text-center">
                                {user.langue === "en" ? (<div> REPUBLIC OF CAMEROON </div>):(<div> REPUBLIQUE DU CAMEROUN </div>)}<br />
                                {user.langue === "en" ? (<div> PEACE-WORK-FATHERLAND </div>):(<div> PAIX-TRAVAIL-PATRIE </div>)} <br />
                                {user.langue === "en" ? (<div> MINISTRY OF SECONDARY EDUCATION </div>):(<div> MINISTERE DES ENSEIGNEMANTS SECONDAIRE </div>)} <br />
                                <smal>BP: Tel:</smal>
                              </p>
                            </Col>
                            <Col
                              sm="4"
                              lg="4"
                              className="d-flex justify-content-center"
                            >
                              <div className="user-profile">
                                <Image
                                  className="theme-color-default-img  rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                                <Image
                                  className="theme-color-purple-img rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                                <Image
                                  className="theme-color-blue-img rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                                <Image
                                  className="theme-color-green-img rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                                <Image
                                  className="theme-color-yellow-img rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                                <Image
                                  className="theme-color-pink-img rounded avatar-130 img-fluid"
                                  src={image2}
                                  alt="profile-pic"
                                />
                              </div>
                            </Col>
                            <Col sm="4" lg="4">
                              <p className="text-center">
                                REPUBLIC OF CAMEROON <br />
                                Peace - Work - Fatherland <br />
                                MINISTRY OF SECONDARY EDUCATION <br />
                                <smal>BP: Tel:</smal>
                              </p>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col sm="4" lg="4"></Col>
                            <Col sm="4" lg="4">
                              <p className="text-center">
                                 {user.langue === "en" ? (<div> bulletin title </div>):(<div> intitulé du bulletion </div>)}
                                <hr />
                                2022 - 2023
                              </p>
                            </Col>
                            <Col sm="4" lg="4"></Col>
                          </Row>
                          <Row>
                            <Col sm="5" lg="5">
                              <Row>
                                <Col sm="6" lg="6">
                                  <div className="mt-2">
                                    <h6 className="mb-0">
                                      Classe: {user.other_in_user}
                                    </h6>
                                    <p>Class</p>
                                  </div>
                                </Col>
                                <Col sm="6" lg="6">
                                  <div className="mt-2">
                                    <h6 className="mb-0">Effectif:</h6>
                                    <p>Number</p>
                                  </div>
                                </Col>
                              </Row>

                              <div className="mt-2">
                                <h6 className="mb-0">
                                  Nom et Prénom: {user.nom} {user.prenom}
                                </h6>
                                <p>Name and Surname</p>
                              </div>

                              <div className="mt-1">
                                <Row>
                                  <Col sm="6" lg="6">
                                    <div className="mt-1">
                                      <h6 className="mb-1">
                                        Né(e) le: {user.date_naissance}
                                      </h6>
                                      <p>Born on</p>
                                    </div>
                                  </Col>
                                  <Col sm="6" lg="6">
                                    <div className="mt-2">
                                      <h6 className="mb-0">
                                        A: {user.lieu_naissance}
                                      </h6>
                                      <p>AT</p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="mt-1">
                                <h6 className="mb-1">
                                   {user.langue === "en" ? (<div> address of parent or guardian: </div>):(<div> adresse du parent ou du tuteur: </div>)}
                                </h6>
                                <p>Parent's/guardian's Address</p>
                              </div>
                            </Col>
                            <Col sm="5" lg="5">
                              <div className="mt-2">
                                <h6 className="mb-0">   {user.langue === "en" ? (<div> number: </div>):(<div> N° Matricule: </div>)}</h6>
                                <p>  {user.langue === "en" ? (<div> registration number: </div>):(<div> registration N°: </div>)} </p>
                              </div>
                              <div className="mt-2">
                                <h6 className="mb-0">{user.langue === "en" ? (<div> repeater: </div>):(<div> redoublant: </div>)}</h6>
                                <p>Repeater</p>
                              </div>
                              <div className="mt-2">
                                <h6 className="mb-0">{user.langue === "en" ? (<div> sex: </div>):(<div> sexe: </div>)}: {user.sexe}</h6>
                                <p>Sex</p>
                              </div>
                              <div className="mt-2">
                                <h6 className="mb-0">{user.langue === "en" ? (<div> Class Master/Mistress: </div>):(<div> professeur principal: </div>)}:</h6>
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
                                    <th>
                                      <p>
                                        {user.langue === "en" ? (<div> discipline </div>):(<div> discipline </div>)}
                                        <br />
                                        {user.langue === "en" ? (<div> name of teacher </div>):(<div> Nom de l'enseignant </div>)}
                                      </p>
                                    </th>
                                    <th>{user.langue === "en" ? (<div> note </div>):(<div> note </div>)}</th>
                                    <th>{user.langue === "en" ? (<div> coefficient </div>):(<div> coefficient </div>)}</th>
                                    <th>{user.langue === "en" ? (<div> N*C </div>):(<div> N*C </div>)}</th>
                                    <th>{user.langue === "en" ? (<div> target competence </div>):(<div> compétence visée </div>)}</th>
                                    <th>{user.langue === "en" ? (<div> assessment </div>):(<div> appréciation </div>)}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {notesfg.map((item, idf) => (
                                    <tr>
                                      <td>
                                        {item.matiere_cp} ( {item.nom}{" "}
                                        {item.prenom} )
                                      </td>
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
                                    <th>{user.langue === "en" ? (<div> first group materials </div>):(<div> matières du premier groupe </div>)}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {notessg.map((item, ids) => (
                                    <tr>
                                      <td>
                                        {item.matiere_cp} ( {item.nom}{" "}
                                        {item.prenom} )
                                      </td>
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
                                    <th>{user.langue === "en" ? (<div> second group materials </div>):(<div> matières du deuxième groupe </div>)}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {notestg.map((item, idt) => (
                                    <tr>
                                      <td>
                                        {item.matiere_cp} ( {item.nom}{" "}
                                        {item.prenom} )
                                      </td>
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
                                    <th> <th>{user.langue === "en" ? (<div> third group materials </div>):(<div> matières du troisième groupe </div>)}</th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td> <th> <th>{user.langue === "en" ? (<div> SUMMARIES </div>):(<div> RECAPITULATIFS </div>)}</th></th></td>
                                    <td>{sumnotes}</td>
                                    <td>{sumcoef}</td>
                                    <td>{sumnotesfinale}</td>
                                    <td>A</td>
                                  </tr>
                                </tbody>

                                <tfoot></tfoot>
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
                                    <th>      <th> <th>{user.langue === "en" ? (<div> discipline </div>):(<div> discipline </div>)}</th></th></th>
                                    <th> <th> <th>{user.langue === "en" ? (<div> work assessment </div>):(<div> appréciation du travail </div>)}</th></th></th>
                                    <th>
                                      <div className="mt-2">
                                        <h6 className="mb-0">
                                                <th> <th>{user.langue === "en" ? (<div> AVERAGE: </div>):(<div> MOYENNE: </div>)}</th></th>: {moyenneleve}
                                        </h6>
                                      </div>
                                      <div className="mt-2">
                                        <h6 className="mb-0">{user.langue === "en" ? (<div> RANK: </div>):(<div> RANG: </div>)}</h6>
                                      </div>
                                      <div className="mt-2">
                                        <h6 className="mb-0">{user.langue === "en" ? (<div> MENTION: </div>):(<div> MENTION: </div>)}</h6>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Col sm="2">
                                        <div>
                                          <QRCode value={user.nom} size={110} />
                                        </div>
                                      </Col>
                                    </td>
                                    <td>
                                      <div className="mt-2">
                                        <p>
                                          {user.langue === "en" ? (<div> unjustified absences: </div>):(<div> absences non justifiées : </div>)}
                                          <br />
                                              {user.langue === "en" ? (<div> unjustified absences: </div>):(<div> absences non justifiées : </div>)}
                                          <br />
                                              {user.langue === "en" ? (<div> unjustified absences: </div>):(<div> absences non justifiées : </div>)}
                                          <br />
                                              {user.langue === "en" ? (<div> conduct warning: </div>):(<div> avertissement conduite : </div>)}
                                          <br />
                                              {user.langue === "en" ? (<div> blame conduct: </div>):(<div> Blame conduite : </div>)}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="mt-2">
                                        <p>
                                             {user.langue === "en" ? (<div> roll of honour: </div>):(<div> Tableau d'honneur : </div>)}
                                          <br />
                                             {user.langue === "en" ? (<div> incentive: </div>):(<div> Encouragement : </div>)}
                                          <br />
                                             {user.langue === "en" ? (<div> congratulations: </div>):(<div> Félicitations : </div>)}
                                          <br />
                                             {user.langue === "en" ? (<div> bonus: </div>):(<div> Prime : </div>)}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="mt-2">
                                        <p>
                                             {user.langue === "en" ? (<div> Class average: </div>):(<div> Moyenne de la classe : </div>)}
                                          <br />
                                             {user.langue === "en" ? (<div> grade average: </div>):(<div> Moyenne du premier : </div>)}
                                          <br />
                                             {user.langue === "en" ? (<div> average of last: </div>):(<div> Moyenne du dernier : </div>)}
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
});

export default ParentsBulletinNotes;
