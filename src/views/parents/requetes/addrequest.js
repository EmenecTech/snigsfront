import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthUser from "../../../components/AuthUser";
import Card from "../../../components/Card";

const ParentsAddRequest = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { user, http } = AuthUser();
  const etab = user.etablissement;
  const usersecond_id = user.second_id;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value, etab, usersecond_id }));
  };

  const submitForm = () => {
    http.post("/eleve_requetes", inputs).then((res) => {
      alert("Message envoyé avec succès !");
      navigate("/Eleve/Request/List/");
    });
    console.log(inputs);
  };
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">{user.langue === "en" ? (<div> Messaging </div>):(<div> Messagerie </div>)}</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="form-group">
            <Form.Label htmlFor="objet">{user.langue === "en" ? (<div> Object </div>):(<div> Objet </div>)}:</Form.Label>
            <Form.Control
              type="text"
              name="objet"
              className="form-control mb-3"
              value={inputs.objet || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="fichier">{user.langue === "en" ? (<div> File </div>):(<div> Fichier </div>)}:</Form.Label>
            <Form.Control
              type="text"
              name="fichier"
              className="form-control mb-3"
              value={inputs.fichier || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label htmlFor="contenu">{user.langue === "en" ? (<div> Content </div>):(<div> Contenu </div>)}:</Form.Label>
            <Form.Control
              as="textarea"
              id="exampleFormControlTextarea1"
              rows="5"
              name="contenu"
              value={inputs.contenu}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="button" onClick={submitForm} variant="btn btn-primary">
            {user.langue === "en" ? (<div> Send to </div>):(<div> Envoyer </div>)}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ParentsAddRequest;
