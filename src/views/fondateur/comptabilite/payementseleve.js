import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Form, Image, Row, Table } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate, useParams } from "react-router-dom";
//img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";

import http from "../../../http";
import AuthUser from "../../../components/AuthUser";
import Axios from 'axios';

import { useReactToPrint } from "react-to-print";


const PayementsListEleve = (props) => {
    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "employee data",
        onafterprint: () => alert("print success"),
    });
    const [imagedata, setImagedata] = useState("");
    const { niveau, classe, ideleve, idpension } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const { user } = AuthUser();

    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});

    const etab = user.etablissement;




    const [infopayement, setinfopayement] = useState([]);

    useEffect(() => {
        fetchAllinfopayement()
    }, []);

    const fetchAllinfopayement = () => {
        http.get('/info/payement/classe/' + etab + '/' + classe).then((res) => {
            setinfopayement(res.data);
        });
    }

    const [eleveinfo, seteleveinfo] = useState([]);

    useEffect(() => {
        fetchAlleleveinfo()
    }, []);

    const fetchAlleleveinfo = () => {
        http.get('/get_eleve_info/' + ideleve).then((res) => {
            seteleveinfo(res.data);
        });
    }


        console.log(eleveinfo)
     console.log(ideleve)
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, classe, ideleve, idpension }))
    }


    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitForm = () => {

        http.post('/payement/save', inputs).then((res) => {
            navigate('/Payements/List/Eleve/Classes/' + niveau + '/' + classe + '/' + ideleve + '/' + idpension)
            window.location.reload(false);

        })

        console.log(inputs);

    }







    const [detailpayement, setdetailpayement] = useState([]);

    useEffect(() => {
        fetchAlldetailpayement()
    }, []);

    const fetchAlldetailpayement = () => {
        http.get('/list/payements/classe/' + etab + '/' + classe).then((res) => {
            setdetailpayement(res.data);
        });
    }



    const [payementsum, setpayementsum] = useState([]);

    useEffect(() => {
        fetchAllpayementsum()
    }, []);

    const fetchAllpayementsum = () => {
        http.get('/info/payement/sum/eleve/' + etab + '/' + classe + '/' + ideleve).then((res) => {
            setpayementsum(res.data);
        });
    }









    const [image, setImage] = useState("");
    const imageRef = useRef(null);

    const fetchProductImage = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef.current) {
            imageRef.current.cancel();
        }
        // créer un token d'annulation
        imageRef.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + user.profile_photo_path,
            {
                cancelToken: imageRef.current.token,
                responseType: "arraybuffer",
            }
        )
            .then((response) => {
                // convertir l'image en base64
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                // mettre à jour l'état de l'image
                setImage(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée

            });
    }, []);

    useEffect(() => {
        fetchProductImage();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef.current = null;
        };
    }, [fetchProductImage]);


    const [listpayements, setlistpayements] = useState([]);

    useEffect(() => {
        fetchAlllistpayements()
    }, []);

    const fetchAlllistpayements = () => {
        http.get("/info/payement/details/eleve/" + etab + "/" + classe + "/" + ideleve).then((res) => {
            setlistpayements(res.data);
        });
    }



    const detelepayementeleve = (id) => {
        http.delete('delete_payement_eleve/' + id).then(res => {
            fetchAlllistpayements();
            fetchAllpayementsum();
        })
    }



    return (
        <>
            <div>
                <Row>
                    <Col xl="12" lg="12" className="">
                        <Row>
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title"></h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Col xl="12" lg="12" className="">
                                        <Row>
                                            <Col sm="4" lg="4">
                                                <Form>



                                                    <button
                                                        type="button"
                                                        onClick={handleShow}
                                                        className="btn btn-info mt-2"
                                                    >
                                                            {user.langue === "en" ? (<div>Add payment</div>):(<div>  Ajouter un payement</div>)}
                                                       
                                                    </button>
                                                     {" "}
                                                    <Button variant="primary mt-2" onClick={printData}>
                                                        
                                                        Imprimer
                                                    </Button>



                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title as="h5"> {user.langue === "en" ? (<div>Add payment</div>):(<div>  Ajouter un payement</div>)}</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Entitled</div>):(<div> Intitulé</div>)}</Form.Label>
                                                                                <Form.Control type="text" defaultValue="" name="int" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Amount</div>):(<div> Montant</div>)} </Form.Label>
                                                                                <Form.Control type="number" defaultValue="" name="montant" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1"> {user.langue === "en" ? (<div>Date de payement</div>):(<div> Date de payement</div>)} </Form.Label>
                                                                                <Form.Control type="date" defaultValue="" name="date" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>

                                                                </Row>







                                                                <div className="text-center">
                                                                    <Button type="button" variant="primary" onClick={submitForm} >{user.langue === "en" ? (<div>Confirm</div>):(<div>Confirmer</div>)} </Button>
                                                                </div>
                                                            </Form>
                                                        </Modal.Body>

                                                    </Modal>

                                                </Form>

                                            </Col>
                                            <Col sm="4" lg="4">
                                                <h3>{user.langue === "en" ? (<div>Tuition fees</div>):(<div>Frais de scolarités</div>)} </h3>
                                                <h5 className="mb-4">{infopayement.montant_pension} XAF</h5>
                                              
                                                <h4 className="mb-3">Détails </h4>
                                                {detailpayement.map((item) => (
                                                    <div className="mt-2" key={item.id}>
                                                        <h6 className="mb-0">{item.montant_detailpayement} XAF</h6>
                                                        <p>{item.intitule_detailpayement} <br />
                                                            ({item.debut_detailpayement} / {item.fin_detailpayement})
                                                        </p>
                                                    </div>
                                                ))}

                                            </Col>
                                            <Col Col sm="4" lg="4">
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
                                                                <th>Intitulé</th>
                                                                <th>Montant</th>
                                                                <th>Date</th>
                                                                <th>Action</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listpayements.map((item) => ( 
                                                                <tr key={item.id}>
                                                                    <td>{item.intitule_payementsave}</td>
                                                                    <td>{item.montant_payementsave} XAF</td>
                                                                    <td>{item.date_payementsave}</td>
                                                                    <td>
                                                                        <div className="flex align-items-center list-user-action">

                                                                            <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { detelepayementeleve(item.id) }}>
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
                                                        <tfoot>

                                                        </tfoot>
                                                    </Table>

                                                </div>
                                            </Col>

                                        </Row>
                                        
                                        <Row>
                                            <Col sm="12" lg="12">
                                                    
                                                    <br/>
                                            <div ref={componentRef}
                                                style={{ width: "90%", paddingTop:"15px", MarginTop: "10px" ,paddingRight:"150px" , height: window.innerHeight }} className="flex flex-column justify-content-center align-items-center">

                                                



                                                    
                                                   <div className="">
                                                <Col sm="12" className="d-flex align-items-center justify-content-center mt-2 mb-3">
                                                    <Row>
                                                       <Col sm="3" className="flex flex-column justify-content-center align-items-center">
                        
                                                          <div className="flex flex-column justify-content-center align-items-center">
                                                                {"     "}
                                                                <Image
                                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                                    style={{
                                                                      
                                                                        width: "100px",
                                                                        height: "100px",
                                                                        borderRadius: "50%",
                                                                        objectFit: "cover",
                                                                        border: "2px solid black",
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col sm="6" className="mt-4">
                                                            {" "}
                                                            <div className="col-sm-12 justify-content-center">
                                                                <h5 className="text-center">
                                                                    SAINT JULIE BILINGUAL SCHOOL COMPLEX
                                                                </h5>
                                                                <h6 className="text-center"> Complexe Scolaire Bilingue Intégrale Saint Julie <br/> (SIS Nouvelle route Tam Tam Week-end) </h6>
                                                                <h6 className="text-center">B.P: Yaoundé, MOTTO: DISCIPLINE-PROGRESS-SUCCESS </h6>
                                                                 <h6 className="text-center">ARRETE NO: 280/JI/7/A/MINEDUB/SG/DSEPB/SDAAP Du 19 Septembre 2016 </h6>
                                                            </div>
                                                            <div className="col-sm-12 justify-content-center">
                                                                <h6 className="text-center">
                                                                    
                                                                </h6>
                                                            </div>
                                                            {" "}
                                                        </Col>
                                                        <Col sm="3">
                                                            {" "}
                                                            <div className="flex flex-column justify-content-center align-items-center">
                                                                <Image
                                                                    src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}
                                                                    style={{
                                                                        width: "100px",
                                                                        height: "100px",
                                                                        borderRadius: "50%",
                                                                        objectFit: "cover",
                                                                        border: "2px solid black",
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                
                                                    </Row>
                                                </Col>
                                                        <div style={{ paddingLeft:"25px" }}>


                                                                

                                                                <h3>{user.langue === "en" ? (<div>Payements </div>):(<div>Payements </div>)}</h3>
                                                                    <h5 className="mb-4" style={{ color: "blue" }}>{payementsum.montant_payementsum} XAF</h5>
                                                                      <p>Nom : {eleveinfo.nom}</p>                                                 
                                                                      <p>Prenom : {eleveinfo.prenom}</p>                                                 
                                                                      <p>Classe: {eleveinfo.other_in_user}</p> 
                                                                    {listpayements.map((item2) => (
                                                                        <div className="mt-2" key={item2.id}>
                                                                            <h6 className="mb-0">{item2.montant_payementsave} XAF</h6>
                                                                            <p>{item2.intitule_payementsave} <br />
                                                                                ({item2.date_payementsave})
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                    }

                                                    
                                                        </div>
                                                        <div style={{ paddingRight:"35px" }}>


                                                                        <br/> <br/>
                                                                        <h3>Signature</h3>
                                                                        
                                                                        
                                                                        
                                                       </div>



                                                                        
                                                    </div>
                                                


                                            </div>
                                            </Col>
                                         

                                        </Row>


                                    </Col>
                                </Card.Body>
                            </Card>
                        </Row>

                    </Col>

                </Row>
            </div >
        </>
    );
};

export default PayementsListEleve;
