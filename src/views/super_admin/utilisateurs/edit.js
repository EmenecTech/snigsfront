import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import AuthUser from "../../../components/AuthUser";
import Card from "../../../components/Card";
import http from "../../../http";

const AddUtilisateurs = () => {
  const [inputs, setInputs] = useState({});
  const { user } = AuthUser();
  const { id }= useParams();
  const navigate = useNavigate();

  console.log(inputs);

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = () => {
    http.get("/user/" + id + "/edit").then((res) => {
      setInputs({
        tel: res.data.telephone,
        nom: res.data.nom,
        prenom: res.data.prenom,
        email: res.data.email,
        genre: res.data.sexe,
        date_n: res.data.date_naissance,
        lieu_n: res.data.lieu_naissance,
        nation: res.data.nationalite,
        cni: res.data.num_cni,
        role: res.data.role,
        etab_fondateur: res.data.etablissement
      });
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.put("/edituser/" + id, inputs).then((res) => {
      alert("utilisateur modifié avec succès !");
      navigate('/utilisateurs/list/super/admin');
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
                  <h4 className="card-title">{user.langue === "en" ? (<div>Modify a user</div>):(<div>Modifier un utilisateur</div>)}</h4>
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
                            {user.langue === "en" ? (<div>Name</div>):(<div>Nom</div>)}
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
                            {user.langue === "en" ? (<div>First name</div>):(<div>Prénom</div>)}
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
                            {user.langue === "en" ? (<div>Gender</div>):(<div>Genre</div>)}
                          </Form.Label>
                          <select
                            className="form-select mb-3 shadow-none"
                            name="genre"
                            value={inputs.genre || ""}
                            onChange={handleChange}
                          >
                            <option value={inputs.genre || ""}>{inputs.genre}</option>
                            <option value="Masculin">{user.langue === "en" ? (<div>Male</div>):(<div>Masculin</div>)}</option>
                            <option value="Feminin">{user.langue === "en" ? (<div>Female</div>):(<div>Féminin</div>)}</option>
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
                            {user.langue === "en" ? (<div>Date of birth</div>):(<div>Date de naissance</div>)}
                          </Form.Label>
                          <Form.Control
                            type="date_n"
                            defaultValue=""
                            name="date_naissance"
                            value={inputs.date_n || ""}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group as={Row} className="form-group">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="exampleInputText1">
                            {user.langue === "en" ? (<div>Place of birth</div>):(<div>Lieu de naissance</div>)}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="lieu_n"
                            value={inputs.lieu_n || ""}
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
                            {user.langue === "en" ? (<div>Nationality</div>):(<div>Nationalité</div>)}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="nation"
                            value={inputs.nation || ""}
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
                            {user.langue === "en" ? (<div>Email</div>):(<div>Email</div>)}
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
                           {user.langue === "en" ? (<div>Phone</div>):(<div>Téléphone</div>)}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="tel"
                            value={inputs.tel || ""}
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
                            {user.langue === "en" ? (<div>Identy card / passport number</div>):(<div>Numéro CNI / Passeport</div>)}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue=""
                            name="cni"
                            value={inputs.cni || ""}
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
                            {user.langue === "en" ? (<div>Role</div>):(<div>Role</div>)}
                          </Form.Label>
                          <select
                            className="form-select mb-3 shadow-none"
                            name="role"
                            value={inputs.role || ""}
                            onChange={handleChange}
                          >
                            <option value={inputs.role || ""}>{inputs.role}</option>
                            <option value="Super adminstrateur">
                              Super administrateur
                            </option>
                            <option value="Fondateur">{user.langue === "en" ? (<div>Founder</div>):(<div>Fondateur</div>)}</option>
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
                      {user.langue === "en" ? (<div>Modify</div>):(<div>Modifier</div>)}
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
