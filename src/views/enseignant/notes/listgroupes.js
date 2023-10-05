import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../http';
import AuthUser from '../../../components/AuthUser';



const EnseignantListGroupes = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);
    const {niveau, classe, evaluation, userid} = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const id_user = userid;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const coefficient = 1;
    
    console.log(niveau);
 
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

    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
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
    http.get("/get_notes_eleves/" + etab + '/' + classe + '/' + evaluation + '/' + userid ).then((res) => {
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




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, evaluation, coefficient }))

    }

    const submitForm = () => {
        http.post('/notes', inputs).then((res) => {
             window.location.reload(false); 
        })
      
        console.log(inputs)
    }

    const [matieres, setmatieres] = useState([]);
    useEffect(() => {
        fetchAllmatieres();
    }, []);

    const fetchAllmatieres = () => {
        http.get('/get_matieres_enseignant/' + etab + '/' + userid).then(res => {
            setmatieres(res.data);
        })
    }



   

    return (

        <div>
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

                                    <span>Ajouter la Note</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Ajouter une note</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                            
                           {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>

                                {etab == 24 ? <div>
                                <Form.Group className='form-group'>
                                                <Form.Label>Groupes</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                    <option> </option>
                                                   
                                         {groupes.map((item) => (
                                            <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
                                                            ))}
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
                                                <Form.Label>Indices d'évalutation</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Ecrit">Ecrit</option>
                                                    <option value="Oral">Oral</option>
                                                    <option value="Pratique">Pratique</option>>
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
                                                </select>
                                           </Form.Group>
                        </div> : <div>
                                <Form.Group className='form-group'>
                                                <Form.Label>Groupes</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                    <option> </option>
                                                   
                                         {groupes.map((item) => (
                                            <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
                                                            ))}
                                                </select>
                                           </Form.Group>
                                         <Form.Group className='form-group'>
                                                <Form.Label>Note</Form.Label>

                                          <select className="form-select mb-3 shadow-none" id="valeur_note" name="valeur_note" onChange={handleChange}>
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
                                                    <option value="Pratique">Pratique</option>>
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
                                                </select>
                                           </Form.Group>                                
                                </div>}
                                         
                           
                                    </div>:<div>
                                    {etab == 24 ? <div>
                                            <Form.Group className="form-group">
     
                                                <Form.Label htmlFor="exampleFormControlSelect1">Selectionner la matière</Form.Label>
                                                <select className="form-select" id="matiere" name="matiere" onChange={handleChange}>
                                                    <option> </option>
                                                    {matieres.map((item) => ( <option value={item.matiere_cp}>{item.matiere_cp}</option> ))}
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
                                                </select>
                                           </Form.Group>
                                    
                                               <Form.Group className='form-group'>
                                                <Form.Label>Compétence visée</Form.Label>
                                                <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                    value={inputs.competence_visee || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </div> : <div>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Groupes</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                    <option> </option>
                                                   
                                         {groupes.map((item) => (
                                            <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
                                                            ))}
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
                                                <Form.Label>Indices d'évalutation</Form.Label>

                                          <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Ecrit">Ecrit</option>
                                                    <option value="Oral">Oral</option>
                                                    <option value="Pratique">Pratique</option>>
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
                                                </select>
                                           </Form.Group>
                                        </div>}
                                              
                                    
                                               

                                    </div>}
                
                                    
                                        <Button variant="primary" onClick={submitForm}>
                                            Ajouter
                                        </Button>
                                    </Form>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </Card.Header>

                        <Card.Body>
                 
                     {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>

                          {etab == 24 ? <div>
                        <table className="table">
                                    <thead>                  
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Nom(s)</th>
                                        <th>Prénom(s)</th>     
                                        <th>Groupes</th>
                                        <th>Note</th>
                                        <th>Indices</th>
                                        <th>Appreciation</th>
                                          
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
                                            <td>{item.appreciation_note}</td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table>
                        </div> : <div>
                          <table className="table">
                                    <thead>              
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Nom(s)</th>
                                        <th>Prénom(s)</th>     
                                        <th>Groupes</th>
                                        <th>Evaluation</th>
                                        <th>Indices</th>
                                        <th>Appreciation</th>
                                          
                                  </tr>
                                 </thead>
                                    <tbody>
                                    {noteseleves.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.matiere_note}</td> 
                                            <td>{getEmojiForNote(item.valeur_note)}</td>
                                            <td>{item.competence_visee_note}</td>
                                            <td>{item.appreciation_note}</td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table> 
                      </div>}
                       
                                        
                      </div> : <div>
                                              
                            <table className="table">
                                    <thead>                  
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Nom(s)</th>
                                        <th>Prénom(s)</th>     
                                        <th>Groupes</th>
                                        <th>Note</th>
                                        <th>Indices</th>
                                        <th>Appreciation</th>
                                          
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
                                            <td>{item.appreciation_note}</td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table>                
                      </div> }
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>
    )

}

export default EnseignantListGroupes
