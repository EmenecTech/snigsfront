import { Fragment, memo, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";

//circular

// AOS
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

// Import selectors & action from setting store
import Card from "../../../components/Card.js";

// install Swiper modules
SwiperCore.use([Navigation]);

const InscriptionEleve = memo((props) => {
  const [show, setShow] = useState(false);
  const { user, http } = AuthUser();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { niveau, id } = useParams();
  const etab = user.etablissement;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value, id }));
  };

  const submitForm = () => {
    http.put("/eleve_in_classe/", inputs).then((res) => {
      alert("Inscription effectuée !");
      navigate('/List/princriptions/')
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

  const [eleve, seteleve] = useState([]);
  useEffect(() => {
    fetchAlleleve();
  }, []);

  const fetchAlleleve = () => {
    http.get("/get_eleve_info/" + id).then((res) => {
      seteleve(res.data);
    });
  };

  const [classes, setclasses] = useState([]);
  useEffect(() => {
    fetchAllclasses();
  }, []);

  const fetchAllclasses = () => {
    http.get("/get_niveau_classes/" + etab + "/" + niveau).then((res) => {
      setclasses(res.data);
    });
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleInputReadonly">Nom</Form.Label>
                <Form.Control
                  type="text"
                  id="exampleInputReadonly"
                  disabled
                  defaultValue={eleve.nom}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleInputReadonly">Prénom</Form.Label>
                <Form.Control
                  type="text"
                  id="exampleInputReadonly"
                  disabled
                  defaultValue={eleve.prenom}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleInputReadonly">
                  Contact du parent
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue=""
                  name="numero_parent"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleInputReadonly">
                  Choisissez la classe
                </Form.Label>
                <select
                  className="form-select mb-3 shadow-none"
                  name="classe"
                  onChange={handleChange}
                >
                  <option></option>
                  {classes.map((item) => (
                    <option key={item.id} value={item.intitule_classe}>
                      {item.intitule_classe}
                    </option>
                  ))}
                </select>
              </Form.Group>

              <div className="text-center mt-2">
                <Button type="button" variant="primary" onClick={submitForm}>
                  Inscrire
                </Button>
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
                      <th>Classe</th>
                      <th>Niveau</th>
                      <th>Filière </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((item) => (
                      <tr key={item.id}>
                        <td>{item.intitule_classe}</td>
                        <td>{item.niveau_classe}</td>
                        <td>{item.filiere}</td>
                        <td>{item.numero_parent}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

export default InscriptionEleve;
