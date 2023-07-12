import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
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

const EleveEditProfil = (props) => {
    const [imagedata, setImagedata] = useState("");

    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitData = (e) => {
        e.preventDefault();
        const fData = new FormData();

        fData.append("image", imagedata);

        Axios.post("https://snigsbackend.com/api/postimage/" + id, fData)
            .then((res) => {
                console.log("response", res);
                alert("Photo de profil ajoutée avec succès !")
            })
            .catch((e) => {
                console.error("Faillure", e);
            });
    };

    const navigate = useNavigate();
    const { user } = AuthUser();

    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});
    const { id } = useParams();
    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        http.get("/edituser/" + id + "/edit").then((res) => {
            setInputs({
                telephone: res.data.telephone,
                email: res.data.email,
                lieu_naissance: res.data.lieu_naissance,
                date_naissance: res.data.date_naissance,
                name: res.data.nom,
                prenom: res.data.prenom,
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
            alert("Compte modifié avec succès !");
            navigate("/Eleve/Edit/Profil/" + id);
        });

        console.log(inputs);
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



    console.log()







    const submitFormPassword = (event) => {



        const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-]{10,}$/
        if (inputs.password === "") {
            setMessage("Entrez un mot de passe")
        }
        else if (regExp.test(inputs.password)) {

            /*      http.post('/adduser', inputs).then((res) => {
                      navigate('/');
                  })

                  */
            setMessage("")
            alert("Mot de passe modifié avec succès !")

        }

        else if (!regExp.test(inputs.password)) {
            setMessage("Mot de passe non valide")
        }
        else {
            setMessage("")
        }


        console.log(inputs);
    }
    return (
        <>
            <div>
                <Row>
                    <Col xl="3" lg="4" className="">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title"></h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitData}>
                                    <Form.Group className="form-group">
                                        <div className="profile-img-edit position-relative">
                                            <Image
                                                className="theme-color-default-img  profile-pic rounded avatar-100"
                                                src={"https://snigsbackend.com/avatar/" + user.profile_photo_path}
                                                alt="profile-pic"
                                            />

                                            {/* <Image
                                                className="theme-color-purple-img profile-pic rounded avatar-100"
                                                src={avatars2}
                                                alt="profile-pic"
                                            />
                                            <Image
                                                className="theme-color-blue-img profile-pic rounded avatar-100"
                                                src={avatars3}
                                                alt="profile-pic"
                                            />
                                            <Image
                                                className="theme-color-green-img profile-pic rounded avatar-100"
                                                src={avatars5}
                                                alt="profile-pic"
                                            />
                                            <Image
                                                className="theme-color-yellow-img profile-pic rounded avatar-100"
                                                src={avatars6}
                                                alt="profile-pic"
                                            />
                                            <Image
                                                className="theme-color-pink-img profile-pic rounded avatar-100"
                                                src={avatars4}
                                                alt="profile-pic"
                                            /> */}
                                            {/* <div className="upload-icone bg-primary">
                                                <svg
                                                    className="upload-button"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="#ffffff"
                                                        d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                                                    />
                                                </svg>
                                                <Form.Control
                                                    className="form-control"
                                                    name="profile_photo_path"
                                                    type="file"
                                                    accept="image/*"

                                                />
                                            </div>

                                        </div>
                                        <div className="img-extension mt-3">
                                            <div className="d-inline-block align-items-center">
                                                <span>Only</span> <Link to="#">.jpg</Link>{" "}
                                                <Link to="#">.png</Link> <Link to="#">.jpeg</Link>{" "}
                                                <span>allowed</span>
                                            </div>*/}
                                        </div>
                                    </Form.Group>
                                    <input
                                        className="form-control"
                                        name="profile_photo_path"
                                        type="file"
                                        onChange={e => handleChange2(e.target.files)} />

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="furl">Matricule:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="furl"
                                            disabled
                                            placeholder="F1401"
                                        />
                                    </Form.Group>
                                    <button className="btn btn-info mt-2" type="submit" onClick={submitData} >
                                        Upload Image
                                    </button>


                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="9" lg="8">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Edit User</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <h2></h2>
                                    <div className="row">
                                        <div className="col-sm-10 justify-content-center">
                                            <Card.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <label>name:</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                className="form-control mb-2"
                                                                value={inputs.name || ""}
                                                                disabled
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        <Col>
                                                            <label>prenom:</label>
                                                            <input
                                                                type="text"
                                                                name="prenom"
                                                                disabled
                                                                className="form-control mb-2"
                                                                value={inputs.prenom || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>

                                            <Card.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <label>Date de naissance:</label>
                                                            <input
                                                                type="date"
                                                                name="date_naissance"
                                                                className="form-control mb-2"
                                                                value={inputs.date_naissance || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        <Col>
                                                            <label>Lieu de naissance:</label>
                                                            <input
                                                                type="text"
                                                                name="lieu_naissance"
                                                                className="form-control mb-2"
                                                                value={inputs.lieu_naissance || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>

                                            <Card.Body>
                                                <Form>
                                                    <Row>
                                                        <Col>
                                                            <label>email:</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                className="form-control mb-2"
                                                                value={inputs.email || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        <Col>
                                                            <label>telephone:</label>
                                                            <input
                                                                type="text"
                                                                name="telephone"
                                                                className="form-control mb-2"
                                                                value={inputs.telephone || ""}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>

                                            <button
                                                type="button"
                                                onClick={submitForm}
                                                className="btn btn-info mt-2"
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <h5 className="mb-3">Security</h5>
                                <div className="row">
                                    <Form.Group className="col-md-6 form-group">
                                        <Form.Label htmlFor="pass">Mot de passe:</Form.Label>
                                        <Form.Control
                                            type="password" className="form-control"
                                            value={inputs.password || ''}
                                            onChange={handlechange}
                                            id="password" name="password"
                                        />
                                        <p className="text-danger">{message} </p>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 form-group">
                                        <Form.Label htmlFor="rpass">Confirmer le Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="rpass"
                                            placeholder="Repeat Password "
                                        />
                                    </Form.Group>
                                    <button
                                        type="button"
                                        onClick={submitFormPassword}
                                        className="btn btn-info mt-2"
                                    >
                                        Modifier le mot de passe
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EleveEditProfil;
