import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import http from "../../../http";
import AuthUser from "../../../components/AuthUser";

const EleveAddRequest = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const userid = user.id;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value, etab, userid }));
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
              
                {user.langue === "en" ? (<div>

                     <div className="header-title">
                        <h4 className="card-title">New request</h4>
                    </div>
                    
                    </div>):(<div>

                     <div className="header-title">
                        <h4 className="card-title">Nouvelle requête</h4>
                    </div>
                    
                    </div>)}
               
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="form-group">
                          {user.langue === "en" ? (<div><Form.Label htmlFor="objet">Title:</Form.Label></div>):(<div><Form.Label htmlFor="objet">Objet:</Form.Label></div>)}
                        
                        <Form.Control
                            type="text"
                            name="objet"
                            className="form-control mb-3"
                            value={inputs.objet || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        {user.langue === "en" ? (<div><Form.Label htmlFor="fichier">File:</Form.Label></div>):(<div><Form.Label htmlFor="fichier">Fichier:</Form.Label></div>)}
                        
                        
                        <Form.Control
                            type="text"
                            name="fichier"
                            className="form-control mb-3"
                            value={inputs.fichier || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                      
                        {user.langue === "en" ? (<div>  <Form.Label htmlFor="contenu">Message:</Form.Label></div>):(<div>  <Form.Label htmlFor="contenu">Contenu:</Form.Label></div>)}
                        
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
                                
                        {user.langue === "en" ? (<div> Send</div>):(<div>     Envoyer</div>)}
                        
                     
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EleveAddRequest;
