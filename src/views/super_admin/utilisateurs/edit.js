import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import AuthUser from "../../../components/AuthUser";
import Card from "../../../components/Card";
import http from "../../../http";

const AddUtilisateurs = () => {
  const [inputs, setInputs] = useState({});
  const { user } = AuthUser();
  const userid = user.user;

  console.log(inputs);

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = () => {
    http.get("/users/" + userid + "/edit").then((res) => {
      setInputs({
        telephone: res.data.telephone,
        nom: res.data.nom,
        prenom: res.data.prenom,
        email: res.data.email,
        genre: res.data.genre,
        date_naissance: res.data.date_naissance,
        lieu_naissance: res.data.lieu_naissance,
        nationalite: res.data.nation,
        num_cni: res.data.num_cni,
        role: res.data.role,
      });
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.put("/user/" + userid, inputs).then((res) => {
      alert("utilisateur modifié avec succès !");
    });
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Modifier un utilisateur</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <p></p>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Nom
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="nom"
                            value={inputs.nom || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Prénom
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="prenom"
                            value={inputs.prenom || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Genre
                          </Form.Label>
                          <select
                            className="form-select mb-3 shadow-none"
                            name="genre"
                            value={inputs.genre || ""}
                            onChange={handleChange}
                          >
                            <option></option>
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Feminin</option>
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
                            Date de naissance
                          </Form.Label>
                          <Form.Control
                            type="date"
                            defaultValue=""
                            name="date_naissance"
                            value={inputs.date_naissance || ""}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Lieu de naissance
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="lieu_naissance"
                            value={inputs.lieu_naissance || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Nationalité
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="nationalite"
                            value={inputs.nationalite || ""}
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
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue=""
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Téléphone
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="telephone"
                            value={inputs.telephone || ""}
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
                            Numéro CNI / Passeport
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="num_cni"
                            value={inputs.num_cni || ""}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            Rôle
                          </Form.Label>
                          <select
                            className="form-select mb-3 shadow-none"
                            name="role"
                            value={inputs.role || ""}
                            onChange={handleChange}
                          >
                            <option></option>
                            <option value="Super adminstrateur">
                              Super administrateur
                            </option>
                            <option value="Fondateur">Fondateur</option>
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
                      Modifier
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddUtilisateurs;
