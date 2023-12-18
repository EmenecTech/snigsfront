import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Table, Col, Form, Image, Row } from "react-bootstrap";
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

const DisciplineEleveInfo = (props) => {
    const [imagedata, setImagedata] = useState("");

    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitData = (e) => {
        e.preventDefault();
        const fData = new FormData();

        fData.append("image", imagedata);

        Axios.post("http://127.0.0.1:8000/api/postimage/" + id, fData)
            .then((res) => {
                console.log("response", res);
                alert("Photo de profil ajoutée avec succès !")
            })
            .catch((e) => {
                console.error("Faillure", e);
            });
    };
    
    const { user } = AuthUser();

    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});
    const { id, classe } = useParams();
    const etab = user.etablissement;
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

    const [userinfo, setuserinfo] = useState([]);
    useEffect(() => {
        fetchAlluserinfo();
    }, []);

    const fetchAlluserinfo = () => {
        http.get('/get_userinfo/' + id).then(res => {
            setuserinfo(res.data);
        })
    }
    const [discipline, setdiscipline] = useState([]);
    useEffect(() => {
        fetchAlldiscipline();
    }, []);

    const fetchAlldiscipline = () => {
        http.get('/get_discipline/' + id + '/' + classe).then(res => {
            setdiscipline(res.data);
        })
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
                    <Col xl="4" lg="5" className="">
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
                                                src={"https://snigsbackend.com/avatar/" + userinfo.profile_photo_path} 
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


                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="furl">{user.langue === "en" ? (<div>Name et Surname  </div>):(<div> Nom et prénom </div>)}:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="furl"
                                            placeholder={userinfo.nom + " " + userinfo.prenom}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="furl">{user.langue === "en" ? (<div>Class </div>):(<div> Classe </div>)}:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="furl"
                                            placeholder={userinfo.other_in_user}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="furl"> {user.langue === "en" ? (<div>Delays</div>):(<div> Retards  </div>)}:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="furl"
                                            placeholder=""
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="furl">{user.langue === "en" ? (<div>Hours</div>):(<div> Heures </div>)}:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="furl"
                                            placeholder=""
                                        />
                                    </Form.Group>


                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="8" lg="7">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">{user.langue === "en" ? (<div>Details</div>):(<div> Détails </div>)}</h4>
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
                                                <th>{user.langue === "en" ? (<div>Entitled</div>):(<div> Intitulé  </div>)}</th>
                                                <th>{user.langue === "en" ? (<div>Details</div>):(<div> Détails </div>)}</th>
                                                <th>{user.langue === "en" ? (<div>Action</div>):(<div> Action </div>)}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {discipline.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.matiere_absence}</td>
                                                    <td></td>
                                                    <td>
                                                        <div className="flex align-items-center list-user-action">

                                                            <Link className="btn btn-sm btn-icon btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" to={"/Discipline/List/classes/Eleves/Info/" + item.id + "/" + classe}>
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
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DisciplineEleveInfo;
