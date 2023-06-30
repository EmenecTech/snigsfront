import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button, Image, Card } from 'react-bootstrap'
import { createPath, useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import AuthUser from '../../../components/AuthUser';
import http from '../../../http';


const EditEtablissement = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { user } = AuthUser();
    const idetab = user.etablissement;
    const [logoEtab, setLogoEtab] = useState([]);
    useEffect(() => {
        fetchAllofLogo();
    }, []);

    const fetchAllofLogo = () => {
        http.get('/get_name_logo/' + idetab).then(res => {
            setLogoEtab(res.data);
        })
    }

    console.log(idetab)

    useEffect(() => {
        fetchetablissement();
    }, []);

    const fetchetablissement = () => {
        http.get("/etablissements/" + idetab + "/edit").then((res) => {
            setInputs({
                tel: res.data.telephone,
                nom: res.data.nom_etablissement,
                email: res.data.email_etablissement,
                bp: res.data.bp_etablissement,
                site: res.data.site_web_etablisssement,
                cygle: res.data.cygle,
                pays: res.data.pays_etablissement,
                ville: res.data.ville_etablissement,
                dep: res.data.departement_etablissement,
                adresse: res.data.adresse_etablissement,
                fondateur: res.data.fondateur_etablissement,
                fact: res.data.facturation_etablissement,
                conf: res.data.configuration_etablissement,
                preins: res.data.payement_prinsciption,
            });
        });

    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put('/editetablissement/' + idetab, inputs).then((res) => {
            alert("etablissement modifié avec succès !");
            navigate('etablissement/edit/super/admin/');
        })


    }


    const [fondateurs, setFondateurs] = useState([]);
    useEffect(() => {
        fetchAllFondateurs();
    }, []);

    const fetchAllFondateurs = () => {
        http.get('/get_fondateurs').then(res => {
            setFondateurs(res.data);
        })
    }
    const [configurations, setConfigurations] = useState([]);
    useEffect(() => {
        fetchAllConfigurations();
    }, []);

    const fetchAllConfigurations = () => {
        http.get('/get_configuration').then(res => {
            setConfigurations(res.data);
        })
    }




    //logo
    const [imagedata, setImagedata] = useState("");

    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitData = (e) => {
        e.preventDefault();
        const fData = new FormData();

        fData.append("image", imagedata);

        Axios.post("http://localhost:8000/api/postlogo/" + idetab, fData)
            .then((res) => {
                console.log("response", res);
                alert("Logo ajouté avec succès !")
            })
            .catch((e) => {
                console.error("Faillure", e);
            });
        console.log(fData)
    };






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
            "/avatar/images/" + idetab + ".png",
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
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef.current = null;
        };
    }, [fetchProductImage]);




    return (
        <>
            <div>
                <Row>

                    <Col sm="2" lg="2" className="">
                        <Card>
                            <Card.Header className="d-flex justify-content-center">
                                <div className="header-title">
                                    <h4 className="card-title"></h4>
                                    <Image
                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                        src={image}
                                        alt="profile-pic"
                                    />
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitData}>
                                    <Form.Group className="form-group">

                                    </Form.Group>
                                    <input
                                        className="form-control"
                                        name="profile_photo_path"
                                        type="file"
                                        onChange={e => handleChange2(e.target.files)} />

                                    <button className="btn btn-info mt-2" type="submit" onClick={submitData} >
                                        Ajouter
                                    </button>


                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="10" lg="10">

                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Modifier l'établissement</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p></p>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Nom </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="nom" value={inputs.nom || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Cygle </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="cygle" value={inputs.cygle || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Email </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="email" value={inputs.email || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Téléphone </Form.Label>
                                                    <Form.Control type="tel" defaultValue="" placeholder="+237" name="tel" value={inputs.tel || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Boite postal </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="bp" value={inputs.bp || ""} onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Site web </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="site" placeholder="https://www." value={inputs.site || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Pays </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="pays" value={inputs.pays || ""} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Cameroun">Cameroun</option>
                                                        <option value="RCA">RCA</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Ville </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="ville" value={inputs.ville || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Département </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="dep" value={inputs.dep || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Adresse </Form.Label>
                                                    <Form.Control type="text" defaultValue="" name="adresse" value={inputs.adresse || ""} onChange={handleChange} required />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Fondateur </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="fondateur" value={inputs.fondateur || ""} onChange={handleChange}>
                                                        <option></option>
                                                        {fondateurs.map((item) =>
                                                            <option key={item.id} value={item.id}> {item.nom} {item.prenom}</option>
                                                        )}


                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Facturation </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="fact" value={inputs.fact || ""} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Par élève">Par élève</option>
                                                        <option value="Par taux">Par taux</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Configuration </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="conf" value={inputs.conf || ""} onChange={handleChange}>
                                                        <option></option>
                                                        <option></option>
                                                        {configurations.map((item2) =>
                                                            <option key={item2.intitule_configuration} value={item2.intitule_configuration}> {item2.intitule_configuration} </option>
                                                        )}
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="exampleInputText1">Payer la préinscription </Form.Label>
                                                    <select className="form-select mb-3 shadow-none" name="preins" value={inputs.preins || ""} onChange={handleChange}>
                                                        <option></option>
                                                        <option value="Oui">Oui</option>
                                                        <option value="Non">Non</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <div className="text-center">
                                        <Button type="button" variant="primary" onClick={submitForm}>Confirmer</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EditEtablissement
