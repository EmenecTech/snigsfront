import React, { Fragment, useState, us, useEffect, memo, useRef} from 'react'

import { createPath, useNavigate, useParams } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';

import { Row, Col, Image, Form, Nav, Dropdown, Tab, Modal, Button, Table } from 'react-bootstrap'
import Card from '../../../components/Card'
import { useReactToPrint } from "react-to-print";

import { Link } from 'react-router-dom'
import AuthUser from '../../../components/AuthUser'; 
// img

import avatars11 from '../../../assets/images/avatars/01.png'
import avatars22 from '../../../assets/images/avatars/avtar_1.png' 
import avatars33 from '../../../assets/images/avatars/avtar_2.png'
import avatars44 from '../../../assets/images/avatars/avtar_3.png'
import avatars55 from '../../../assets/images/avatars/avtar_4.png'
import avatars66 from '../../../assets/images/avatars/avtar_5.png'
import avatars2 from '../../../assets/images/avatars/02.png'
import avatars3 from '../../../assets/images/avatars/03.png'
import avatars4 from '../../../assets/images/avatars/04.png'
import avatars5 from '../../../assets/images/avatars/05.png'


import icon1 from '../../../assets/images/icons/01.png'
import icon2 from '../../../assets/images/icons/02.png'
import icon3 from '../../../assets/images/icons/03.png'
import icon4 from '../../../assets/images/icons/04.png'
import icon8 from '../../../assets/images/icons/08.png'
import icon6 from '../../../assets/images/icons/06.png'
import icon7 from '../../../assets/images/icons/07.png'

import icon5 from '../../../assets/images/icons/05.png'
import shap2 from '../../../assets/images/shapes/02.png'
import shap4 from '../../../assets/images/shapes/04.png'
import shap6 from '../../../assets/images/shapes/06.png'
import pages2 from '../../../assets/images/pages/02-page.png'

import ShareOffcanvas from '../../../components/partials/components/shareoffcanvas'

const PrimClasse = () => {
    const [toggler, setToggler] = useState();
    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const [show2, setShow2] = useState(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { niveau, classe } = useParams();
    const etab = user.etablissement;
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, classe }))
    }

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "employee data",
        onafterprint: () => alert("print success"),
    });


    const submitForm = () => {
        http.post('/classesmatieres', inputs).then((res) => {
            alert("Matière ajoutée avec succès !")
            navigate('/Details/classe/' + niveau + '/' + classe)
            window.location.reload(false);

        })



        console.log(inputs);

    }

    const submitFormG = () => {
        http.post('/classesgroupes', inputs).then((res) => {
            alert("Groupe ajoutée avec succès !")

            window.location.reload(false);

        })



        console.log(inputs);

    }

    const submitForm2 = () => {
        http.post('/add_enseignant_classe', inputs).then((res) => {
            alert("L'enseignant a été ajouté avec succès !")
            navigate('/Details/classe/' + niveau + '/' + classe)
            window.location.reload(false);

        })
        console.log(inputs);

    }
 const [groupes, setgroupes] = useState([]);
  useEffect(() => {
    fetchAllGroupes();
  }, []);

  const fetchAllGroupes = () => {
    http.get("/get_groupes/" + etab).then((res) => {
      setgroupes(res.data);
    });
  };
     const [info_etab, setinfo_etab] = useState([]);

    useEffect(() => {
        fetchAllinfo_etab()
    }, []);

    const fetchAllinfo_etab = () => {
        http.get('/get_name_logo/' + etab).then((res) => {
            setinfo_etab(res.data);
        });
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


    const [matieres, setmatieres] = useState([]);
    useEffect(() => {
        fetchAllmatieres();
    }, []);

    const fetchAllmatieres = () => {
        http.get('/get_all_matieres_for_classe/' + etab).then(res => {
            setmatieres(res.data);
        })
    }

    const [matieres_classe, setmatieres_classe] = useState([]);
    useEffect(() => {
        fetchAllmatieres_classe();
    }, []);

    const fetchAllmatieres_classe = () => {
        http.get('/get_matieres_for_classe/' + etab + '/' + niveau + '/' + classe).then(res => {
            setmatieres_classe(res.data);
        })
    }


    const [enseignant_in_classe, setenseignant_in_classe] = useState([]);
    useEffect(() => {
        fetchAllenseignant_in_classe();
    }, []);

    const fetchAllenseignant_in_classe = () => {
        http.get('/get_enseignant_in_classe/' + etab + '/' + classe).then(res => {
            setenseignant_in_classe(res.data);
        })
    }



    const [enseignants_classe, setenseignants_classe] = useState([]);
    useEffect(() => {
        fetchAllenseignants_classe();
    }, []);

    const fetchAllenseignants_classe = () => {
        http.get('/fetch_enseignants_for_classe/' + etab).then(res => {
            setenseignants_classe(res.data);
        })
    }

    //24/07/2023

    const deleteEnseignants_in_classe = (id, mat) => {
         if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/delete_enseignants_for_classe/' + id + '/' + classe + '/' + mat).then(res => {
            fetchAllenseignant_in_classe();
        })
             alert('Supprimé!');
    }
    }

    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }


     const deleteMatieres_classe = (id) => {
          if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/delete_all_matieres_for_classe/' + id).then(res => {
            fetchAllmatieres_classe();
        })
              alert('Supprimé!');
    }
     }
    //20/07/2023
    const deleteEleves_classe = (id) => {
          if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.put('/delete_eleves_in_classe/' + id).then(res => {
            window.location.reload(false);
        })
             alert('Supprimé!'); 
    }
    }

    const deleteGroupe_classe = (id) => {
          if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/delete_groupe_in_classe/' + id).then(res => {
            window.location.reload(false);
        })
             alert('Supprimé!'); 
    }
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
                                            <Nav.Link eventKey="first">{user.langue === "en" ? (<div>Students</div>):(<div> Elèves </div>)}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="second">{user.langue === "en" ? (<div>Teachers</div>):(<div> Enseignant </div>)}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="third">{user.langue === "en" ? (<div>Courses</div>):(<div> Matières </div>)}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="fourth">{user.langue === "en" ? (<div>Group</div>):(<div> Groupe </div>)}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="fifth">Parents</Nav.Link>
                                        </Nav.Item>
                                        
                                    </Nav>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className="col-lg-3">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title"> {user.langue === "en" ? (<div>About</div>):(<div> A propos </div>)}</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                
                                <div className="mt-2">
                                    <h6 className="mb-1">{user.langue === "en" ? (<div>Head teacher</div>):(<div> Professeur principal </div>)}:</h6>
                                    <p></p>
                                </div>
                               
                            </Card.Body>
                        </Card>


                    </Col>
                    <Col lg="9">
                        <Tab.Content className="profile-content">
                            <Tab.Pane eventKey="first" id="profile-feed">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                        <Button variant="primary mt-2" onClick={printData}> {user.langue === "en" ? (<div>Print</div>):(<div> Imprimer  </div>)} </Button>

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", height: window.innerHeight }}>

                                <Col sm="12" className="d-flex align-items-center justify-content-center mt-1 mb-2">
                                    <Row>
                                        <Col sm="3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Image
                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid black",
                                                        display: "block",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm="6" className="mt-4">
                                            {" "}

                                            <div>
                                                <h5 className="text-center" style={{ fontSize: "14px" }}> {info_etab.nom_etablissement}</h5>
                                            </div>

                                            <div className="col-sm-12 justify-content-center">
                                                <h5 className="text-center">

                                                </h5>
                                            </div>
                                            {" "}
                                        </Col>
                                        <Col sm="3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Image
                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid black",
                                                        display: "block",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }}
                                                />
                                            </div>
                                        </Col>


                                    </Row>
                                </Col>

                                <div className="header-title mb-2">
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Class</div>):(<div> Classe  </div>)} : {classe}</h4>
                                </div>

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
                                                        <th>{user.langue === "en" ? (<div>Registration number</div>):(<div> Matricule </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Prename</div>):(<div> Prénom  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Gender </div>):(<div> Genre  </div>)}</th>
                                                        <th> {user.langue === "en" ? (<div>Date of birth </div>):(<div> Date de naissance  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Place of birth </div>):(<div> Lieu de naissance   </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Parent name</div>):(<div> Nom du parent  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Parent contact</div>):(<div> Contact du parent  </div>)}</th>
                                                        <th>Email</th>
                                                        <th> {user.langue === "en" ? (<div>Phone </div>):(<div> Téléphone   </div>)}</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {eleves_classe.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.matricule}</td>
                                                            <td>{item.nom}</td>
                                                            <td>{item.prenom}</td>
                                                            <td>{item.sexe}</td>
                                                            <td>{item.date_naissance}</td>
                                                            <td>{item.lieu_naissance}</td>
                                                            <td>{item.nom_parent}</td>
                                                            <td>{item.numero_parent}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.telephone}</td>
                                                            <td>
                                                                <div className="flex align-items-center list-user-action">
                                                                    <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Edit/" + niveau + "/" + item.id}>
                                                                        <span className="btn-inner">
                                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </Link>{' '}
                                                                     <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => {deleteEleves_classe(item.id) }} >
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
                                                <tfoot>

                                                </tfoot>
                                            </Table>
                                         </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second" id="profile-activity">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title"></h4>
                                        </div>
                                        <Button variant="primary mt-2" onClick={handleShow1}>
                                            <span className="btn-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </span>
                                            {user.langue === "en" ? (<div>Add</div>):(<div> AJOUTER  </div>)}
                                        </Button>
                                        {/* <!-- Modal --> */}
                                        <Modal show={show1} onHide={handleClose1} backdrop="static"
                                            keyboard={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title as="h5">{user.langue === "en" ? (<div>Add a teacher to the class</div>):(<div> Ajouter un enseignant à la classe  </div>)}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div>Course</div>):(<div> Matière  </div>)}</Form.Label>
                                                                    <select className="form-select mb-3 shadow-none" name="int" onChange={handleChange} required>
                                                                        <option></option>
                                                                        <option value="Toutes les matières">Toutes les matières</option>
                                                                        {matieres.map((item) => (
                                                                            <option key={item.id} value={item.intitule_matiere}>{item.intitule_matiere}</option>

                                                                        ))}
                                                                        {groupesclasse.map((item) => (
                                                                            <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}</option>

                                                                        ))}

                                                                    </select>
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1">{user.langue === "en" ? (<div> Teacher </div>):(<div> Enseignant  </div>)}</Form.Label>
                                                                    <select className="form-select mb-3 shadow-none" name="ens" onChange={handleChange} required>
                                                                        <option></option>
                                                                        {enseignants_classe.map((item) => (
                                                                            <option key={item.id} value={item.id}>{item.nom} {item.prenom} </option>

                                                                        ))}


                                                                    </select>
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div> Head Teacher </div>):(<div> Principal </div>)}</Form.Label>
                                                                    <select className="form-select mb-3 shadow-none" name="groupe" onChange={handleChange} required>
                                                                        <option> {user.langue === "en" ? (<div> No </div>):(<div> Non </div>)}</option>
                                                                        <option value="Oui">{user.langue === "en" ? (<div> Yes </div>):(<div> Oui </div>)}</option>
                                                                    </select>
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>







                                                    <div className="text-center">
                                                        <Button type="button" variant="primary" onClick={submitForm2} >{user.langue === "en" ? (<div>Confirm</div>):(<div> Confirmer  </div>)}</Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>

                                        </Modal>
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
                                                        <th>{user.langue === "en" ? (<div> Name </div>):(<div> Nom  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div> Surame </div>):(<div> Prénom  </div>)}</th>
                                                        <th> {user.langue === "en" ? (<div> Main course </div>):(<div> Matière principale </div>)}</th>
                                                        <th> {user.langue === "en" ? (<div> Subject Taught</div>):(<div> Matière Enseigné </div>)}</th>
                                                        <th>Email</th>
                                                        <th>{user.langue === "en" ? (<div> Phone</div>):(<div> Téléphone  </div>)}</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {enseignant_in_classe.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.nom}</td>
                                                            <td>{item.prenom}</td>
                                                            <td>{item.fonction_user}</td>
                                                            <td>{item.matiere_cp}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.telephone}</td>

                                                            <td>
                                                                <div className="flex align-items-center list-user-action">

                                                                    
                                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#"  onClick={() => { deleteEnseignants_in_classe(item.professeur_cp, item.matiere_cp) }}>
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
                                                <tfoot>

                                                </tfoot>
                                            </Table>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="third" id="profile-friends">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title"></h4>
                                        </div>
                                        <Button variant="primary mt-2" onClick={handleShow2}>
                                            <span className="btn-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </span>
                                            {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter  </div>)}
                                        </Button>
                                        {/* <!-- Modal --> */}
                                        <Modal show={show2} onHide={handleClose2}>
                                            <Modal.Header closeButton>
                                                <Modal.Title as="h5"> {user.langue === "en" ? (<div> Add course to class </div>):(<div> Ajouter une matière à la classe </div>)}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div> Course </div>):(<div>Matière</div>)}</Form.Label>
                                                                    <select className="form-select mb-3 shadow-none" name="int" onChange={handleChange} required>
                                                                        <option></option>
                                                                        {matieres.map((item) => (
                                                                            <option key={item.id} value={item.intitule_matiere}>{item.intitule_matiere}</option>

                                                                        ))}

                                                                    </select>
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div> Group </div>):(<div>Groupe</div>)} </Form.Label>
                                                                    

                                                                        <select className="form-select mb-3 shadow-none" name="groupe" onChange={handleChange} required>
                                                                            <option></option>

                                                                            {groupes.map((item) => (
                                                                            <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
        
                                                                        ))}
                                                                        </select>
    
                                                                        
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>







                                                    <div className="text-center">
                                                        <Button type="button" variant="primary" onClick={submitForm} >{user.langue === "en" ? (<div>Confirm</div>):(<div> confirmer  </div>)}</Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>

                                        </Modal>
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
                                                        <th>{user.langue === "en" ? (<div>Course</div>):(<div>Matiere </div>)} </th>
                                                        <th>{user.langue === "en" ? (<div>Group</div>):(<div>Groupe </div>)} </th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {matieres_classe.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.matiere_cm}</td>
                                                            <td>{item.groupe_cm}</td>
                                                            <td>
                                                                <div className="flex align-items-center list-user-action">

                                                                   
                                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteMatieres_classe(item.id) }}>
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
                                                <tfoot>

                                                </tfoot>
                                            </Table>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="fourth" id="profile-friends">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title"></h4>
                                        </div>
                                        <Button variant="primary mt-2" onClick={handleShow}>
                                            <span className="btn-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </span>
                                            {user.langue === "en" ? (<div>Add</div>):(<div> Ajouter  </div>)}
                                        </Button>
                                        {/* <!-- Modal --> */}
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title as="h5"> {user.langue === "en" ? (<div> Add course to class </div>):(<div> Ajouter une matière à la classe </div>)}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    
                                                    
                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div> Group </div>):(<div>Groupe</div>)} </Form.Label>
                                                                    
    {etab === 25 ? <div>
    <select className="form-select mb-3 shadow-none" name="groupe" onChange={handleChange} required>
                                                                        <option></option>
                                                                         {groupes.map((item) => (
                                                                        <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
    
                                                                       ))}
    </select>
    </div> : <div>
    <select className="form-select mb-3 shadow-none" name="int" onChange={handleChange} required>
                                                                        <option></option>
                                                                         {groupes.map((item) => (
                                                                                <option key={item.id} value={item.intitule_groupe}>{item.intitule_groupe}</option>
                
                                                                            ))}
                                                                        </select>
    </div>}
                                                                        
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <Form.Group as={Row} className="form-group">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="exampleInputText1">Valeur Note </Form.Label>
                                                                    <Form.Control type="number" defaultValue="20" name="coef" onChange={handleChange} required />
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>







                                                    <div className="text-center">
                                                        <Button type="button" variant="primary" onClick={submitFormG} >{user.langue === "en" ? (<div>Confirm</div>):(<div> confirmer  </div>)}</Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>

                                        </Modal>
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
                                                        <th>{user.langue === "en" ? (<div>Group</div>):(<div>Groupe </div>)} </th>
                                                        <th> </th>
                                                        
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groupesclasse.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.groupe_cg}</td>
                                                            <td>{user.langue === "en" ? (<div>{item.marks_cg} Marks</div>):(<div>{item.marks_cg} Points </div>)} </td>
                                                            
                                                            <td>
                                                                <div className="flex align-items-center list-user-action">

                                                                   
                                                                    <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" to="#" onClick={() => { deleteGroupe_classe(item.id) }}>
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
                                                <tfoot>

                                                </tfoot>
                                            </Table>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="fifth" id="profile-profile">
                                <Card>
                                    <Card.Header>
                                        <div className="header-title">
                                            <h4 className="card-title">{user.langue === "en" ? (<div>Profile</div>):(<div> Profil  </div>)}</h4>
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
                                                        <th>{user.langue === "en" ? (<div>Name</div>):(<div> Nom  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Prename</div>):(<div> Prénom  </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Student</div>):(<div> Elève </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div>Parent contact</div>):(<div> Contact du parent  </div>)}</th>
                                                     
                                                        <th>{user.langue === "en" ? (<div>Action</div>):(<div> Action  </div>)}</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {eleves_classe.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.nom_parent}</td>
                                                            <td>{item.prenom_parent}</td>
                                                            <td>{item.nom} {item.prenom}</td>
                                           
                                                            <td>{item.numero_parent}</td>
                                                            <td>
                                                                <div className="flex align-items-center list-user-action">

                                                                    <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Edit/" + niveau + "/" + item.id}>
                                                                        <span className="btn-inner">
                                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </Link>{' '}
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>

                                                </tfoot>
                                            </Table>

                                        </div>
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

export default PrimClasse;
