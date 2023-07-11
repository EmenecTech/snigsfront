import { Fragment, memo, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";

import http from "../../../http.js";

//swiper
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import Card from "../../../components/Card.js";
import * as SettingSelector from "../../../store/setting/selectors";

// install Swiper modules
SwiperCore.use([Navigation]);

const EditFilieres = memo((props) => {
  const { user } = AuthUser();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const etab = user.etablissement;
  const { id } = useParams();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value, etab }));
  };

  const submitForm = () => {
    http.put("/filieres/" + id, inputs).then((res) => {
      alert("Filière modifiée avec succès !");
    });

    console.log(inputs);
  };
  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    fetchfilieres();
  }, []);

  const fetchfilieres = () => {
    http.get("/filieres/" + id + "/edit").then((res) => {
      setInputs({
        int: res.data.intitule_filiere,
      });
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

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Modifier la Filière</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="form-group">
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputText1">
                          Intitulé{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue=""
                          name="int"
                          value={inputs.int || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button type="button" variant="primary" onClick={submitForm}>
                    Confirmer
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

export default EditFilieres;
