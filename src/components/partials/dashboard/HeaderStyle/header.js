import React, { useEffect, Fragment, memo, useState } from 'react'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { useCallback, useRef } from 'react'
import { Row, Col, Form, Button, Image, Card } from 'react-bootstrap'
import { createPath, useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import { Link } from 'react-router-dom'
import CustomToggle from '../../../dropdowns'

import AuthUser from '../../../AuthUser'

//img
import flag1 from '../../../../assets/images/Flag/flag001.png'
import flag2 from '../../../../assets/images/Flag/flag-02.png'
import flag3 from '../../../../assets/images/Flag/flag-03.png'
import flag4 from '../../../../assets/images/Flag/flag-04.png'
import flag5 from '../../../../assets/images/Flag/flag-05.png'
import flag6 from '../../../../assets/images/Flag/flag-06.png'
import shapes1 from '../../../../assets/images/shapes/01.png'
import shapes2 from '../../../../assets/images/shapes/02.png'
import shapes3 from '../../../../assets/images/shapes/03.png'
import shapes4 from '../../../../assets/images/shapes/04.png'
import shapes5 from '../../../../assets/images/shapes/05.png'
import avatars1 from '../../../../assets/images/avatars/01.png'
import avatars2 from '../../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../../assets/images/avatars/avtar_5.png'
// logo
import Logo from '../../components/logo'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

const Header = memo((props) => {
    const { user, http } = AuthUser();
    const { userdetail, setUserdetail } = useState();

    const idetab = user.etablissement;

    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            console.log(res.data);
        })
    }

    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    useEffect(() => {
        // navbarstylemode
        if (headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass') {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add('menu-sticky')
                } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                }
            }
        }

    })
    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    const [image2, setImage2] = useState("");
    const imageRef2 = useRef(null);

    const fetchProductImage2 = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef2.current) {
            imageRef2.current.cancel();
        }
        // créer un token d'annulation
        imageRef2.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + user.profile_photo_path,
            {
                cancelToken: imageRef2.current.token,
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
                setImage2(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage2();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef2.current = null;
        };
    }, [fetchProductImage2]);



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

       const update_lang = (id, lang) => {
        http.get('/update_langue/' + id + '/' + lang).then(res => {
                window.location.reload(false);
        })
    }


    return (
        <Fragment>
            <Navbar expand="lg" variant="light" className={`nav iq-navbar ${headerNavbar} ${navbarHide.join(" ")}`}>
                <Container fluid className="navbar-inner">
                    <Link to="/dashboard" className="navbar-brand">


                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon">
                            <svg width="20px" height="20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>
                    <div className="input-group search-input">

                    </div>
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="mt-2 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">

                            {user.langue === "en" ? (<div>
    

                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant="search-toggle nav-link">
                                    <img src={flag1} className="img-fluid rounded-circle" alt="user" style={{ height: "30px", minWidth: "30px", width: "30px", }} />
                                    <span className="bg-primary"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end">
                                    <div className="m-0 border-0 shadow-none card">
                                        <div className="p-0 ">
                                            <ul className="list-group list-group-flush">
                                                <li className="iq-sub-card list-group-item"><Link className="p-0" onClick={() => { update_lang(user.id, "fr") }}><img src={flag4} alt="img-flaf" className="img-fluid me-2" style={{ width: "15px", height: "15px", minWidth: "15px", }} />English</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
    
                            </div>):(<div>
    
    
                                <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant="search-toggle nav-link">
                                    <img src={flag4} className="img-fluid rounded-circle" alt="user" style={{ height: "30px", minWidth: "30px", width: "30px", }} />
                                    <span className="bg-primary"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end">
                                    <div className="m-0 border-0 shadow-none card">
                                        <div className="p-0 ">
                                            <ul className="list-group list-group-flush">
                                                <li className="iq-sub-card list-group-item"><Link className="p-0" onClick={() => { update_lang(user.id, "en") }}><img src={flag1} alt="img-flaf" className="img-fluid me-2" style={{ width: "15px", height: "15px", minWidth: "15px", }} />English</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>)}
                            
                        
                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path}  alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path}  alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path}  alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path} alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/avatar/" + user.profile_photo_path}  alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <div className="caption ms-3 d-none d-md-block ">
                                        <h6 className="mb-0 caption-title">{user.nom}</h6>
                                        <p className="mb-0 caption-sub-title">{user.role}</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <Dropdown.Item href={"/Eleve/Edit/Profil/" + user.id}>Profil</Dropdown.Item>
                                   
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logoutUser}>Déconnexion</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
})

export default Header
