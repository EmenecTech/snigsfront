import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Tab, Table, Modal, Nav, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../../http';
import AuthUser from '../../../../components/AuthUser';
import FsLightbox from 'fslightbox-react';

import icon1 from '../../../../assets/images/icons/01.png'
import icon2 from '../../../../assets/images/icons/02.png'
import icon3 from '../../../../assets/images/icons/03.png'
import icon4 from '../../../../assets/images/icons/04.png'
import icon8 from '../../../../assets/images/icons/08.png'
import icon6 from '../../../../assets/images/icons/06.png'
import icon7 from '../../../../assets/images/icons/07.png'

import icon5 from '../../../../assets/images/icons/05.png'
import shap2 from '../../../../assets/images/shapes/02.png'
import shap4 from '../../../../assets/images/shapes/04.png'
import shap6 from '../../../../assets/images/shapes/06.png'


const ProfesseurAddNote = () => {
    const navigate = useNavigate();
    const [toggler, setToggler] = useState();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);

    const [notescc, setNotescc] = useState([]);
    const [notessn, setNotessn] = useState([]);
    const { evaluation, niveau ,classe, matiere } = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    
    console.log(niveau);
    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }

    const [matiere_classe_info, setmatiere_classe_info] = useState([]);
    useEffect(() => {
        fetchAllmatiere_classe_info();
    }, []);

    const fetchAllmatiere_classe_info = () => {
        http.get('/get_info_matiere_classe/' + etab + '/' + niveau + '/' +  classe + '/' + matiere ).then(res => {
            setmatiere_classe_info(res.data);
        })
    }
     const [indices, setindices] = useState([]);
  useEffect(() => {
    fetchAllIndices();
  }, []);

  const fetchAllIndices = () => {
    http.get("/get_indices/" + etab).then((res) => {
      setindices(res.data);
    });
  };

    const coefficient = matiere_classe_info.coefficient_cm;

    // useEffect(()=>{
    //     fetchAllClasses();
    // },[]);

    // const fetchAllClasses = () => {
    //     http.get('/classe').then(res=>{
    //         setClasses(res.data);
    //     })
    // }

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = () => {
        http.get('/notes_eleves/' + etab + '/' + classe + '/' + matiere + '/' + evaluation).then(res => {
            setNotes(res.data);

        })


    }

     useEffect(() => {
        fetchAllNotescc();
    }, []);

    const fetchAllNotescc = () => {
        http.get('/notes_cc_eleves/' + etab + '/' + classe + '/' + matiere + '/' + evaluation).then(res => {
            setNotescc(res.data);

        })


    }

     useEffect(() => {
        fetchAllNotessn();
    }, []);

    const fetchAllNotessn = () => {
        http.get('/notes_sn_eleves/' + etab + '/' + classe + '/' + matiere + '/' + evaluation).then(res => {
            setNotessn(res.data);

        })


    }



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, matiere, evaluation, coefficient }))

    }

    const submitForm = () => {
        http.post('/notes_ui', inputs).then((res) => {
             //window.location.reload(false); 
        })
      
        console.log(inputs)
    }



   



    return (
        <Fragment>
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

                                        <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                                            <h4 className="me-2 h4"></h4>
                                            <span></span>
                                        </div>
                                    </div>
                                    <Nav as="ul" className="d-flex nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="first">{user.langue === "en" ? (<div>Continuous Control</div>):(<div> Controle Continu </div>)}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="second">{user.langue === "en" ? (<div>Normal Session</div>):(<div> Session Normale</div>)}</Nav.Link>
                                        </Nav.Item>
                                       
                                    </Nav>
                                    <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>Ajouter une Note</span>
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="12">
                        <Tab.Content className="profile-content">
                         
                            <Tab.Pane eventKey="first" id="profile-activity">
                                <Card>
                                <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">CC - {matiere}</h4>

                            <div>
                              
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{matiere}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                            
                                            <Form.Group className="form-group">
     
                                                <Form.Label htmlFor="exampleFormControlSelect1">Selectionner l'étudiant(e)</Form.Label>
                                                <select className="form-select" id="id_user" name="id_user" onChange={handleChange}>
                                                    <option> </option>
                                                    {eleves_classe.map((user) => ( <option value={user.id}>{user.nom} {user.prenom}</option> ))}
                                                </select>
                                            </Form.Group>

                                            <Form.Group className='form-group'>
                                            <Form.Label>Type d'evaluation</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Controle Continu">Controle Continu</option>
                                                    <option value="Session Normale">Session Normale</option>
                                                    
                                                   
                                                    
                                                </select>
                                           </Form.Group>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Note /20</Form.Label>
                                                <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                    value={inputs.valeur_note || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
 
                                         <Form.Group className='form-group'>
                                                <Form.Label>crédits</Form.Label>
                                                <Form.Control type="number" id="coef" name="coef"
                                                    value={coefficient}
                                                    
                                                    disabled
                                                />
                                            </Form.Group>
                                           
                                    
                            
                                        <Button variant="primary" onClick={submitForm}>Ajouter </Button>
                                    </Form>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </Card.Header>
                                    <Card.Body>
                            <table className="table">
                  
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Nom(s)</th>
                                            <th>Prénom(s)</th>
                                            <th>Evaluation</th>
                                            <th>Note</th>
                                            <th>Note Finale</th>

                                            
                                            <th> </th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {notescc.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) =>  (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom} </td>
                                            <td>{item.competence_visee_note} </td>
                                            <td>{item.valeur_note}</td>
                                            <td>{item.note_finale}</td>

                                           
                                
                                        </tr>
                                    ))}

                                </tbody>                     
 
                            </table>
                        </Card.Body>

                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="second" id="profile-friends">
                                <Card>
                                <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">SN - {matiere}</h4>
                        </Card.Header>

                        <Card.Body>
                            <table className="table">
                  
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Nom(s)</th>
                                            <th>Prénom(s)</th>
                                            <th>Evaluation</th>
                                            <th>Note</th>
                                            <th>Note finale</th>
                                            
                                            <th> </th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {notessn.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) =>  (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom} </td>
                                            <td>{item.competence_visee_note} </td>
                                            <td>{item.valeur_note}</td>
                                            <td>{item.note_finale}</td>                                           
                                
                                        </tr>
                                    ))}

                                </tbody>                     
 
                            </table>
                        </Card.Body>

                                </Card>
                            </Tab.Pane >
                          
                        </Tab.Content>
                    </Col>

                </Row>
            </Tab.Container>
        </Fragment>
    )

}

export default ProfesseurAddNote
