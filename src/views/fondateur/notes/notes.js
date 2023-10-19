import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom';

import AuthUser from "../../../components/AuthUser.js";



const AdminEditNotes = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);
    const {niveau, classe, evaluation, userid} = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const id_user = userid;
    const iduser = user.id;
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




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, evaluation, coefficient, id_user }))

    }

    const submitForm = () => {
        http.post('/notes', inputs).then((res) => {
            
        })
        
        window.location.reload(false); 
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

    const [groupesclasse, setgroupesclasse] = useState([]);
  useEffect(() => {
    fetchAllGroupesClasse();
  }, []);

  const fetchAllGroupesClasse = () => {
    http.get("/get_groupes_for_classe/" + etab + "/" + classe).then((res) => {
      setgroupesclasse(res.data);
    });

      console.log(groupesclasse.id);
  };



   

    return (

        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">Notes</h4>

                            
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
                                            <td>{getEmojiForNote(item.valeur_note)}</td>
                                            <td>{item.competence_visee_note}</td>
                                            <td>{item.appreciation_note}</td>
                                            <td>
                                                <div className="flex align-items-center list-user-action">

                                                               <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Admin/edit/notes/" + item.id}>
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>{' '}
                                                                  <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteMembres(item.id) }}>
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>{' '}
                                                            </div>
                                                    </td>
                                            
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

export default AdminEditNotes
