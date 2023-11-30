import React, { useEffect, useState, Fragment } from 'react'
import { Row, Col, Form, Button, Card, Modal, Tab, Nav, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom';

import AuthUser from "../../../components/AuthUser.js";



const AdminEditNotes = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);

    const [notescc, setNotescc] = useState([]);
    const [notessn, setNotessn] = useState([]);
    const {niveau, classe, evaluation, matiere, userid} = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const id_user = userid;
    const iduser = user.id;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const coefficient = 1;
    
    
 
     const getEmojiForNote = (note) => {
        if (note == 10) {
            return '☹️';
        } else if (note == 15) {
            return '😐';
        } else if (note == 20) {
            return '😃';
        }
        return '';
    };

     const getAppreciationForNote = (note) => {
        if (note > 0 && note < 10) {
            return 'Non acquis';
        } else if (note >= 11 && note < 14) {
            return "En cours d'acquisition";
        } else if (note >= 15 && note < 20) {
            return 'Acquis';
        }
        return '';
    };


    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }

    const [confnotes, setconfnotes] = useState([]);
    useEffect(() => {
        fetchAllconfnotes();
    }, []);

    const fetchAllconfnotes = () => {
        http.get('/conf_notes/' + etab).then(res => {
            setconfnotes(res.data);
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

 const [noteseleves, setnoteseleves] = useState([]);
  useEffect(() => {
    fetchAllNoteseleves();
  }, []);

  const fetchAllNoteseleves = () => {
    http.get("/get_notes_elevesprim/" + etab + '/' + classe + '/' + evaluation + '/' + userid ).then((res) => {
      setnoteseleves(res.data);
    });
  };
    console.log(noteseleves);
    
     const [groupes, setgroupes] = useState([]);
  useEffect(() => {
    fetchAllGroupes();
  }, []);

  const fetchAllGroupes = () => {
    http.get("/get_groupes/" + etab).then((res) => {
      setgroupes(res.data);
    });
  };

    // useEffect(()=>{
    //     fetchAllClasses();
    // },[]);

    // const fetchAllClasses = () => {
    //     http.get('/classe').then(res=>{
    //         setClasses(res.data);
    //     })
    // }

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
        setInputs(values => ({ ...values, [name]: value, etab, classe, evaluation, coefficient, id_user }))

    }

    const submitForm = () => {
        http.post('/notes/update', inputs).then((res) => {
            window.location.reload(false); 
        })
  
    }

    

    const [matieres, setmatieres] = useState([]);
    useEffect(() => {
        fetchAllmatieres();
    }, []);

    const fetchAllmatieres = () => {
        http.get('/get_matieres_enseignant/' + etab + '/' + iduser).then(res => {
            setmatieres(res.data);
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
    
    const [groupesclasse, setgroupesclasse] = useState([]);
  useEffect(() => {
    fetchAllGroupesClasse();
  }, []);

  const fetchAllGroupesClasse = () => {
    http.get("/get_groupes_for_classe/" + etab + "/" + classe).then((res) => {
      setgroupesclasse(res.data);
    });

      
  };

   {/* const deleteNotes = (id) => {
        http.delete('/delete_note/' + id).then(res => {
            fetchAllNoteseleves();
        })
    } */}
    
    const deleteNotes = (matiere, indice) => {
       if(window.confirm("Voulez-vous supprimer cet élément?") == true){
    http.delete('/delete_note/' + etab + "/" + classe + "/" + matiere + "/" + evaluation + "/" + indice + "/" + userid).then((res) => {
      fetchAllNoteseleves();
    });
      alert('Supprimé!');
  };
  }

    
    return (
        <Fragment>

            {confnotes.niveau_enseignant === 'Universitaire' ? <div>

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

                                    <span>Modifier une note</span>
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
                                            <Form.Group className='form-group'>
                                                <Form.Label>Appreciation</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Non acquis">Non acquis</option>
                                                    <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                    <option value="Acquis">Acquis</option>
                                                        <option value="Expert">Expert</option>
                                                </select>
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
                                            <th>Type d'évaluation</th>
                                            <th>Note</th>
                                            <th>Crédit</th>
                                            <th>NxC</th>
                                            <th>Appreciation</th>
                                            
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
                                            <td>{matiere_classe_info.coefficient_cm}  </td>
                                            <td>{item.note_finale}</td>
                                            <td>{item.appreciation_note}</td>
                                           
                                
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
                                            <th>Type d'évaluation</th>
                                            <th>Note</th>
                                            <th>Crédit</th>
                                            <th>NxC</th>
                                            <th>Appreciation</th>
                                            
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
                                            <td>{matiere_classe_info.coefficient_cm}  </td>
                                            <td>{item.note_finale}</td>
                                            <td>{item.appreciation_note}</td>
                                           
                                
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

            </div>:<div>
               
            
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">Notes</h4>

                            <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>Modifier une note</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modifier une note</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>

                                            {eleves_classe.cycle_niveau === 'Maternelle' || eleves_classe.cycle_niveau === 'Nursery' ? <div>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Groupes</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                            <option> </option>

                                                            {groupesclasse.map((item) => (
                                                                <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}(/ {item.marks_cg})</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                                
                                                 
                                                                
                                                     <Form.Group className='form-group'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Emoji</Form.Label>
                                            
                                                        <select className="form-select mb-3 shadow-none" id="emoji" name="emoji" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="10">☹️</option>
                                                            <option value="15">😐</option>
                                                            <option value="20">😃</option>

                                                        </select>
                                                    </Form.Group>
                                                                
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>coefficient</Form.Label>
                                                        <Form.Control type="number" id="coef" name="coef"
                                                            value={coefficient}

                                                            disabled
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Indices d'évalutation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">Ecrit</option>
                                                            <option value="Oral">Oral</option>
                                                            <option value="Pratique">Pratique</option>
                                                            {indices.map((item) => (
                                                                <option key={item.id} value={item.intitule_indice}>{item.intitule_indice}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                                
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">Non acquis</option>
                                                            <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                            <option value="Acquis">Acquis</option>
                                                                <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                    


                                            </div> : <div></div>}

                                            {eleves_classe.cycle_niveau === 'Primaire' || eleves_classe.cycle_niveau === 'Primary' ? <div>
                                                
                                                <Form.Group className='form-group'>
                                                        <Form.Label>Groupes</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                            <option> </option>

                                                            {groupesclasse.map((item) => (
                                                                <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}(/ {item.marks_cg})</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Indices d'évalutation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">Ecrit</option>
                                                            <option value="Oral">Oral</option>
                                                            <option value="Pratique">Pratique</option>
                                                            {indices.map((item) => (
                                                                <option key={item.id} value={item.intitule_indice}>{item.intitule_indice}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">Non acquis</option>
                                                            <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                            <option value="Acquis">Acquis</option>
                                                        </select>
                                                    </Form.Group>

                                            </div>:<div></div>}
                                              
                                            {eleves_classe.cycle_niveau === 'Secondaire' || eleves_classe.cycle_niveau === 'Secondary' ? <div>
 
                                                <Form.Group className="form-group">

                                                <Form.Label htmlFor="exampleFormControlSelect1">Selectionner l'élève</Form.Label>
                                                <select className="form-select" id="id_user" name="id_user" onChange={handleChange}>
                                                    <option> </option>
                                                    {eleves_classe.map((user) => ( <option value={user.id}>{user.nom} {user.prenom}</option> ))}
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
                                                <Form.Label>coefficient</Form.Label>
                                                <Form.Control type="number" id="coef" name="coef"
                                                    value={coefficient}
                                                    
                                                    disabled
                                                />
                                                </Form.Group>
                                                <Form.Group className='form-group'>
                                                <Form.Label>Appreciation</Form.Label>

                                                <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Non acquis">Non acquis</option>
                                                    <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                    <option value="Acquis">Acquis</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                                </Form.Group>

                                                <Form.Group className='form-group'>
                                                <Form.Label>Compétence visée</Form.Label>
                                                <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                    value={inputs.competence_visee || ''}
                                                    onChange={handleChange}
                                                />
                                                </Form.Group>

                                                </div> : <div></div>}
                                                    
                                                <Button variant="primary" onClick={submitForm}>
                                                Modifier
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>

                            </div>

                            
                        </Card.Header>

                        <Card.Body>
                 
                     {eleves_classe.cycle_niveau === 'Maternelle' || eleves_classe.cycle_niveau === 'Nursery' ? <div>

                         
                          <table className="table">
                                    <thead>              
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Nom(s)</th>
                                        <th>Prénom(s)</th>     
                                        <th>Groupes</th>
                                        <th>Note</th>
                                        <th>Emoji</th>
                                        <th>Indices</th>
                                        <th>Coef</th>
                                        <th>Appreciation</th>
                                        <th>Action</th>
                                          
                                  </tr>
                                 </thead>
                                    <tbody>
                                    {noteseleves.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.matiere_note}</td> 
                                            <td>{item.valeur_note}</td>
                                            <td>{getEmojiForNote(item.emoji)}</td>
                                            <td>{item.competence_visee_note}</td>
                                            <td>{item.coefficient_note}</td>
                                            <td>{item.appreciation_note}</td>
                                            <td>
                                            <div className="flex align-items-center list-user-action">
                                                                

                                                                <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deleteNotes(item.matiere_note , item.competence_visee_note) }} >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                    </td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table> 
                      </div>:<div></div>}
                       
                      {eleves_classe.cycle_niveau === 'Primaire' || eleves_classe.cycle_niveau === 'Primary' ? <div>        
                    
                                              
                            <table className="table">
                                    <thead>                  
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Nom(s)</th>
                                        <th>Prénom(s)</th>     
                                        <th>Groupes</th>
                                        <th>Note</th>
                                        <th>Indices</th>
                                        <th>Coef</th>
                                        <th>Appreciation</th>
                                        <th>Action</th>
                                          
                                  </tr>
                                 </thead>
                                    <tbody>
                                    {noteseleves.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.matiere_note}</td> 
                                            <td>{item.valeur_note}</td>
                                            <td>{item.competence_visee_note}</td>
                                            <td>{item.coefficient_note}</td>
                                            <td>{item.appreciation_note}</td>
                                        <td>
                                            <div className="flex align-items-center list-user-action">

                                                          
                                                                  <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deleteNotes(item.matiere_note , item.competence_visee_note) }} >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                    </td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table>                
                      
                                     </div>:<div></div>}

                                     
                      {eleves_classe.cycle_niveau === 'Secondaire' || eleves_classe.cycle_niveau === 'Secondary' ? <div> 

                                     <table className="table">
                  
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Nom(s)</th>
                                            <th>Prénom(s)</th>
                                            <th>Note</th>
                                            <th>Coefficient</th>
                                            <th>NxC</th>
                                            <th>Appreciation</th>
                                            <th>Compétence visée</th>
                                            <th> </th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {notes.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) =>  (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom} </td>
                                            <td>{item.valeur_note}</td>
                                            <td>{matiere_classe_info.coefficient_cm}  </td>
                                            <td>{item.note_finale}</td>
                                            <td>{item.appreciation_note}</td>
                                            <td>{item.competence_visee_note} </td>
                                
                                        </tr>
                                    ))}

                                </tbody>                     
 
                            </table>

                     </div>:<div></div>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>}

           
        </Fragment>
       
    )

}

export default AdminEditNotes
