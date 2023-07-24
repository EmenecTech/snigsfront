import React, { useState, useEffect, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap'

import AuthUser from '../../../AuthUser';
//a

function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;


    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = memo((props) => {
    const { user, http } = AuthUser();
    const { userdetail, setUserdetail } = useState();
    const etab = user.etablissement;
    const niveau = user.fonction_user;
    const classe = user.other_in_user;


    const textpriv = "Découvrez l’ensemble des fonctionnalités des membres de l’administration"
    const textrole = "Grâce à cette fonctionnalité, vous pouvez attribuer des privilèges à vos utilisateurs  \n en fonction des différents rôles que vous créez"
    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            console.log(res.data);
        })
    }



    const [foncs, setfoncs] = useState([]);
    useEffect(() => {
        fetchAllfoncs();
    }, []);

    const fetchAllfoncs = () => {
        http.get('/get_fonctionnalites/' + etab + '/' + niveau).then(res => {
            setfoncs(res.data);
        })
    }



    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    //location


    let location = useLocation();
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Menu</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                {user.langue === "en" ? (<div>
                    
                        <li className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-item `}>
                            <Link className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard" onClick={() => { }}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Dashboard</span>
                            </Link>
                        </li>
                    
                    </div>):(<div>
                         <li className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-item `}>
                            <Link className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard" onClick={() => { }}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Tableau de bords</span>
                            </Link>
                        </li>
                    
                    </div>)}
               

                {user.role === "Super adminstrateur" ? (<div>




                    <li className={`nav-item`}>
                        <Link className={`nav-link`} aria-current="page" to="/superAdmin/list/privileges">
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span className="item-name">Privilèges</span>
                        </Link>
                    </li>
                    <li className={`nav-item`}>
                        <Link className={`nav-link`} aria-current="page" to="/utilisateurs/list/super/admin">
                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span className="item-name">Utilisateurs</span>
                        </Link>
                    </li>


                    <Accordion.Item as="li" eventKey="etablissements" bsPrefix={`nav-item ${active === 'menustyle' ? 'active' : ''} `} onClick={() => setActive('menustyle')}  >
                        <CustomToggle eventKey="etablissements" onClick={(activeKey) => setActiveMenu(activeKey)}>

                            <i className="icon">
                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span className="item-name">Etablissements</span>
                            <i className="right-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </i>
                        </CustomToggle>
                        <Accordion.Collapse eventKey="etablissements" >
                            <ul className="sub-nav">
                                <li className="nav-item">
                                    <Link className={`${location.pathname === '/etablissement/configurations/list/super/admin' ? 'active' : ''} nav-link`} to="/etablissement/configurations/list/super/admin">
                                        <i className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                <g>
                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                </g>
                                            </svg>
                                        </i>
                                        <i className="sidenav-mini-icon"> H </i>
                                        <span className="item-name"> Configurations </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/etablissement/list/super/admin">
                                        <i className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                <g>
                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                </g>
                                            </svg>
                                        </i>
                                        <i className="sidenav-mini-icon"> D </i>
                                        <span className="item-name">Etablissements</span>
                                    </Link>
                                </li>

                               


                            </ul>
                        </Accordion.Collapse>
                    </Accordion.Item>
                    

                    <li><hr className="hr-horizontal" /></li>
                    
                                                                                
                

                </div>) : (<div></div>)
                }
                {user.role === "Administration" ? (<div>

                    {foncs.map((item, idx) => (
                        <div>
                            {item.code_privilege_rp === "P-50000" ? (
                                <div>
                                    <Accordion.Item as="li" eventKey="sidebar-eleves" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                        <CustomToggle eventKey="sidebar-eleves" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                            <i className="icon">
                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="item-name">Elèves</span>
                                            <i className="right-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </i>
                                        </CustomToggle>

                                        <Accordion.Collapse eventKey="sidebar-eleves">
                                            <ul className="sub-nav">
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-profile' ? 'active' : ''} nav-link`} to="/List/princriptions/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Préinscriptions</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Accordion.Collapse>
                                    </Accordion.Item>
                                </div>) : (<div></div>)}

                            {item.code_privilege_rp === "P-60000" ? (
                                <div>
                                    <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                        <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                            <i className="icon">
                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                                    <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="item-name">Pédagogie</span>
                                            <i className="right-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </i>
                                        </CustomToggle>
                                        <Accordion.Collapse eventKey="sidebar-pedagogie">
                                            <ul className="sub-nav">
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/List/niveaux' ? 'active' : ''} nav-link`} to="/List/niveaux">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Niveaux</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/Classes/Notes/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Notes</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/filieres/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Filières</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-add' ? 'active' : ''} nav-link`} to="/List/classes/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> E </i>
                                                        <span className="item-name">Classes</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/matieres/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Matieres</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Admin/List/Classes/Cours/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Cours</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Evaluations</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/programmes/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Programmes</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Accordion.Collapse>
                                    </Accordion.Item>
                                </div>) : (<div></div>)}
                            {item.code_privilege_rp === "P-70000" ? (
                                <div>
                                    <Accordion.Item as="li" eventKey="sidebar-comptabilite" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                        <CustomToggle eventKey="sidebar-comptabilite" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                            <i className="icon">
                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                                </svg>
                                            </i>
                                            <span className="item-name">Comptabilité</span>
                                            <i className="right-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </i>
                                        </CustomToggle>

                                        <Accordion.Collapse eventKey="sidebar-comptabilite">
                                            <ul className="sub-nav">
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === "/Admin/Comptabilite/List/" ? 'active' : ''} nav-link`} to="/Admin/Comptabilite/List/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Pensions</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`${location.pathname === '/Payement/List/Niveau/' ? 'active' : ''} nav-link`} to="/Payement/List/Niveau/">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <g>
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </g>
                                                            </svg>
                                                        </i>
                                                        <i className="sidenav-mini-icon"> U </i>
                                                        <span className="item-name">Payements</span>
                                                    </Link>
                                                </li>


                                            </ul>
                                        </Accordion.Collapse>
                                    </Accordion.Item>
                                </div>) : (<div></div>)}
                        </div>
                    ))}
                </div>) : (<div></div>)}
                {
                    user.role === "Fondateur" ? (
                        <div>


                            <Accordion.Item as="li" eventKey="horizontal-menu" bsPrefix={`nav-item ${active === 'menustyle' ? 'active' : ''} `} onClick={() => setActive('menustyle')}  >
                                <CustomToggle eventKey="horizontal-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M10.0833 15.958H3.50777C2.67555 15.958 2 16.6217 2 17.4393C2 18.2559 2.67555 18.9207 3.50777 18.9207H10.0833C10.9155 18.9207 11.5911 18.2559 11.5911 17.4393C11.5911 16.6217 10.9155 15.958 10.0833 15.958Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M22.0001 6.37867C22.0001 5.56214 21.3246 4.89844 20.4934 4.89844H13.9179C13.0857 4.89844 12.4102 5.56214 12.4102 6.37867C12.4102 7.1963 13.0857 7.86 13.9179 7.86H20.4934C21.3246 7.86 22.0001 7.1963 22.0001 6.37867Z" fill="currentColor"></path>
                                            <path d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856Z" fill="currentColor"></path>
                                            <path d="M21.9998 17.3992C21.9998 19.2648 20.4609 20.7777 18.5609 20.7777C16.6621 20.7777 15.1221 19.2648 15.1221 17.3992C15.1221 15.5325 16.6621 14.0195 18.5609 14.0195C20.4609 14.0195 21.9998 15.5325 21.9998 17.3992Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name"> {user.langue === "en" ? (<div>Roles and Privileges</div>):(<div> Rôles et Privilèges </div>)}</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="horizontal-menu" >
                                    <ul className="sub-nav">
                                        <li className="nav-item" >
                                            <Link className={`${location.pathname === '/horizontal' ? 'active' : ''} nav-link`} to="Admin/list/privileges" title={textpriv}>
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> H </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Privileges</div>):(<div> Privilèges </div>)} </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/Admin/list/roles" title={textrole}>
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> D </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Roles</div>):(<div> Rôles  </div>)}</span>
                                            </Link>
                                        </li>



                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                            <li className={`nav-item `}>
                                <Link className={` nav-link `} aria-current="page" to="/Admin/list/" onClick={() => { }}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">Administration</span>
                                </Link>
                            </li>

                            <li className={` nav-item `}>
                                <Link className={` nav-link `} aria-current="page" to="/List/enseignants/" onClick={() => { }}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name"> {user.langue === "en" ? (<div>Teachers</div>):(<div> Enseignants </div>)}</span>
                                </Link>
                            </li>
                            <Accordion.Item as="li" eventKey="sidebar-eleves" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                <CustomToggle eventKey="sidebar-eleves" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                            <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                            <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">{user.langue === "en" ? (<div>Students</div>):(<div> Elèves </div>)}</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>

                                <Accordion.Collapse eventKey="sidebar-eleves">
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-profile' ? 'active' : ''} nav-link`} to="/List/princriptions/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name"> {user.langue === "en" ? (<div>Pre-registrations</div>):(<div> Préinscriptions </div>)}</span>
                                            </Link>
                                        </li>

                                        <li>
                                            {/* 21/07/2023 */}
                                            <Link className={`${location.pathname === '/List/SansClasse' ? 'active' : ''} nav-link`} to="/List/SansClasse/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">Eleves sans classe</span>
                                            </Link>
                                        </li>
                                   

                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>

                            <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                            <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name"> {user.langue === "en" ? (<div>Pédagogy</div>):(<div> Pédagogie </div>)}</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="sidebar-pedagogie">
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/List/niveaux' ? 'active' : ''} nav-link`} to="/List/niveaux">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Levels</div>):(<div> Niveaux </div>)}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/Classes/Notes/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">Notes </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/filieres/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name"> {user.langue === "en" ? (<div>Sectors</div>):(<div> Filières</div>)}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-add' ? 'active' : ''} nav-link`} to="/List/classes/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> E </i>
                                                <span className="item-name">Classes </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/matieres/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Teaching subjects</div>):(<div> Matieres </div>)}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Admin/List/Classes/Cours/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Courses</div>):(<div> Cours </div>)}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">Evaluations</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/List/programmes/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Programs</div>):(<div> Programmes  </div>)}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                             <Accordion.Item as="li" eventKey="sidebar-form-documents" bsPrefix={`nav-item ${active === 'form' ? 'active' : ''} `} onClick={() => setActive('form')}>
                                <CustomToggle eventKey="sidebar-form-documents" active={activeMenu === 'sidebar-form' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">Documents</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="sidebar-form-documents" >
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/Admin/List/Documents/Eleves/' ? 'active' : ''} nav-link`} to="/Admin/List/Documents/Eleves/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> E </i>
                                                <span className="item-name"> {user.langue === "en" ? (<div>Students</div>):(<div> Elèves </div>)}</span>
                                            </Link>
                                        </li>
                                     
                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                            <Accordion.Item as="li" eventKey="sidebar-comptabilite" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                                <CustomToggle eventKey="sidebar-comptabilite" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                            <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                            <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">{user.langue === "en" ? (<div>Accounting</div>):(<div> Comptabilité </div>)}</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>

                                <Accordion.Collapse eventKey="sidebar-comptabilite">
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === "/Admin/Comptabilite/List/" ? 'active' : ''} nav-link`} to="/Admin/Comptabilite/List/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>School pensions</div>):(<div> Pensions  </div>)}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/Payement/List/Niveau/' ? 'active' : ''} nav-link`} to="/Payement/List/Niveau/">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> U </i>
                                                <span className="item-name"> {user.langue === "en" ? (<div>Payments</div>):(<div> Payements  </div>)}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                                 <Accordion.Item as="li" eventKey="sidebar-form" bsPrefix={`nav-item ${active === 'form' ? 'active' : ''} `} onClick={() => setActive('form')}>
                                <CustomToggle eventKey="sidebar-form" active={activeMenu === 'sidebar-form' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">Discipline </span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="sidebar-form" >
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/Discipline/List/classes' ? 'active' : ''} nav-link`} to="/Discipline/List/classes">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> E </i>
                                                <span className="item-name"> {user.langue === "en" ? (<div>Students</div>):(<div> Elèves </div>)} </span>
                                            </Link>
                                        </li>


                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>

                                        
                            
                            <Accordion.Item as="li" eventKey="Ad-requetes" bsPrefix={`nav-item ${active === 'form' ? 'active' : ''} `} onClick={() => setActive('form')}>
                                <CustomToggle eventKey="Ad-requetes" active={activeMenu === 'Ad-requetes' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                                        </svg>
                                    </i>
                                    <span className="item-name">{user.langue === "en" ? (<div>Requests</div>):(<div> Requêtes  </div>)} </span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="Ad-requetes" >
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/dashboard/form/form-element' ? 'active' : ''} nav-link`} to="List/Requetes/Elèves">
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> E </i>
                                                <span className="item-name">{user.langue === "en" ? (<div>Students</div>):(<div> Elèves  </div>)} </span>
                                            </Link>
                                        </li>
                                      
                                        
                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                            <Accordion.Item as="li" eventKey="fondateur-vitrine" bsPrefix={`nav-item mb-5 ${active === 'icons' ? 'active' : ''} `} onClick={() => setActive('icons')}>
                                <CustomToggle eventKey="fondateur-vitrine" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 10.5378C8 9.43327 8.89543 8.53784 10 8.53784H11.3333C12.4379 8.53784 13.3333 9.43327 13.3333 10.5378V19.8285C13.3333 20.9331 14.2288 21.8285 15.3333 21.8285H16C16 21.8285 12.7624 23.323 10.6667 22.9361C10.1372 22.8384 9.52234 22.5913 9.01654 22.3553C8.37357 22.0553 8 21.3927 8 20.6832V10.5378Z" fill="currentColor" />
                                            <rect opacity="0.4" x="8" y="1" width="5" height="5" rx="2.5" fill="currentColor" />
                                        </svg>
                                    </i>
                                    <span className="item-name"> {user.langue === "en" ? (<div>Edit School</div>):(<div> Etablissement </div>)}</span>
                                    <i className="right-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </i>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="fondateur-vitrine">
                                    <ul className="sub-nav">
                                        <li className="nav-item">
                                            <Link className={`${location.pathname === '/etablissement/edit/super/admin' ? 'active' : ''} nav-link`} to="/etablissement/edit/super/admin" >
                                                <i className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <g>
                                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                        </g>
                                                    </svg>
                                                </i>
                                                <i className="sidenav-mini-icon"> S </i>
                                                <span className="item-name">Informations</span>
                                            </Link>
                                        </li>
                                   

                                    </ul>
                                </Accordion.Collapse>
                            </Accordion.Item>
                        </div>
                    ) : (<div></div>)
                }


                {
                    user.role === "Elève" ? (<div>

                        {user.langue === "en" ? (<div>
                        
                        
                                

                        <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Pedagogie</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-pedagogie">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Planning/' ? 'active' : ''} nav-link`} to="/Eleve/List/Planning/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Timetable</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Matieres/Cours' ? 'active' : ''} nav-link`} to="/Eleve/List/Matieres/Cours">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Courses</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Evaluations</span>
                                        </Link>
                                    </li> */}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Evaluations/Notes' ? 'active' : ''} nav-link`} to="/Eleve/List/Evaluations/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Ratings</span>
                                        </Link>
                                    </li>
                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Bulletins de notes</span>
                                        </Link>
                                </li>*/}
                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>

                           <li className="nav-item">
                            <Link
                                className={`${location.pathname === '/Discipline/Info' ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"/Discipline/Info"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Discipline</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "Eleve/Request/List/" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Eleve/Request/List/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Requests</span>
                            </Link>
                        </li>
                        <Accordion.Item as="li" eventKey="sidebar-documentscolaires" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-documentscolaires" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Documents</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-documentscolaires">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'badge' ? 'active' : ''} nav-link`} to="badge">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Badge</span>
                                        </Link>
                                    </li>

                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === 'print' ? 'active' : ''} nav-link`} to="print">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Impression</span>
                                        </Link>
                            </li>*/}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Eleve/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">documents</span>
                                        </Link>
                                    </li>


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Eleve/List/Evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Gradebook</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Eleve/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">School certificate</span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>
                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === 'Eleve/Regularite/' ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Eleve/Regularite/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Regularities</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "/" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"/Eleve/Forum/Matieres"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Forum</span>
                            </Link>
                        </li>




                        
                        </div>):(<div>




                                

                        <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Pédagogie</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-pedagogie">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Planning/' ? 'active' : ''} nav-link`} to="/Eleve/List/Planning/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Emploi du temps</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Matieres/Cours' ? 'active' : ''} nav-link`} to="/Eleve/List/Matieres/Cours">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Cours</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Evaluations</span>
                                        </Link>
                                    </li> */}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/Eleve/List/Evaluations/Notes' ? 'active' : ''} nav-link`} to="/Eleve/List/Evaluations/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Notes</span>
                                        </Link>
                                    </li>
                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Bulletins de notes</span>
                                        </Link>
                                </li>*/}
                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>

                           <li className="nav-item">
                            <Link
                                className={`${location.pathname === '/Discipline/Info' ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"/Discipline/Info"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Discipline</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "Eleve/Request/List/" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Eleve/Request/List/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Requêtes</span>
                            </Link>
                        </li>
                        <Accordion.Item as="li" eventKey="sidebar-documentscolaires" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-documentscolaires" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Documents </span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-documentscolaires">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'badge' ? 'active' : ''} nav-link`} to="badge">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Badge</span>
                                        </Link>
                                    </li>

                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === 'print' ? 'active' : ''} nav-link`} to="print">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Impression</span>
                                        </Link>
                            </li>*/}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Eleve/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">documents</span>
                                        </Link>
                                    </li>


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Eleve/List/Evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Bulletin de notes</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Eleve/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Certificat Scolaire</span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>
                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === 'Eleve/Regularite/' ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Eleve/Regularite/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Régularités</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "/" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"/Eleve/Forum/Matieres"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Forum</span>
                            </Link>
                        </li>







                        
                        
                        
                        </div>)}


                        

                    </div>) : (<div>

                    </div>)
                }



                    {
                    user.role === "Parent" ? (<div>

                        {user.langue === "en" ? (<div>
                        
                        
                                

                        <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Pedagogy</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-pedagogie">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Planning/' ? 'active' : ''} nav-link`} to="Parents/List/Planning/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Timetable</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Matieres/Cours' ? 'active' : ''} nav-link`} to="Parents/List/Matieres/Cours">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Courses</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Evaluations</span>
                                        </Link>
                                    </li> */}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Evaluations/Notes' ? 'active' : ''} nav-link`} to="Parents/List/Evaluations/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Ratings</span>
                                        </Link>
                                    </li>
                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Report cards</span>
                                        </Link>
                                </li>*/}
                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>

                          
                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "Parents/Request/List" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Parents/Request/List/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Requests</span>
                            </Link>
                        </li>
                        <Accordion.Item as="li" eventKey="sidebar-documentscolaires" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-documentscolaires" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Documents</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-documentscolaires">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'badge' ? 'active' : ''} nav-link`} to="badge">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Badge</span>
                                        </Link>
                                    </li>

                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === 'print' ? 'active' : ''} nav-link`} to="print">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Print</span>
                                        </Link>
                            </li>*/}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Parents/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">documents</span>
                                        </Link>
                                    </li>


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Parents/List/Notes/Evaluation/:evaluation">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Gradebook</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/Parents/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">School certificate</span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>
                       
                      




                        
                        </div>):(<div>




                                

                        <Accordion.Item as="li" eventKey="sidebar-pedagogie" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Pédagogie</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-pedagogie">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Planning/' ? 'active' : ''} nav-link`} to="Parents/List/Planning/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Emploi du temps</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Matieres/Cours' ? 'active' : ''} nav-link`} to="Parents/List/Matieres/Cours">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Cours</span>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Evaluations</span>
                                        </Link>
                                    </li> */}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'Parents/List/Evaluations/Notes' ? 'active' : ''} nav-link`} to="Parents/List/Evaluations/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Notes</span>
                                        </Link>
                                    </li>
                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === '/List/evaluations/' ? 'active' : ''} nav-link`} to="/List/evaluations/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Bulletins de notes</span>
                                        </Link>
                                </li>*/}
                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>

                          

                        <li className="nav-item">
                            <Link
                                className={`${location.pathname === "Parents/Request/List/" ? "active" : ""} nav-link `}
                                aria-current="page"
                                to={"Parents/Request/List/"}
                            >
                                <i className="icon">
                                    <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.4"
                                            d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                            fill="currentColor"
                                        ></path>
                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                    </svg>
                                </i>
                                <span className="item-name">Requêtes</span>
                            </Link>
                        </li>
                        <Accordion.Item as="li" eventKey="sidebar-documentscolaires" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                            <CustomToggle eventKey="sidebar-documentscolaires" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>
                                        <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Documents </span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-documentscolaires">
                                <ul className="sub-nav">


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === 'badge' ? 'active' : ''} nav-link`} to="badge">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Badge</span>
                                        </Link>
                                    </li>

                                    {/*<li className="nav-item">
                                        <Link className={`${location.pathname === 'print' ? 'active' : ''} nav-link`} to="print">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Impression</span>
                                        </Link>
                            </li>*/}

                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Parents/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">documents</span>
                                        </Link>
                                    </li>


                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Parents/List/Notes/Evaluation/:evaluation">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Bulletin de notes</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="Parents/List/Documents/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> U </i>
                                            <span className="item-name">Certificat Scolaire</span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>
                        </Accordion.Item>
                       







                        
                        
                        
                        </div>)}


                        

                    </div>) : (<div>

                    </div>)
                }




                {user.role === "Enseignant" ? (

                    <div>

                        <Accordion.Item as="li" eventKey="sidebar-enseignant-pedagogie" bsPrefix={`nav-item ${active === 'Classes' ? 'active' : ''} `} onClick={() => setActive('Classes')}  >
                            <CustomToggle eventKey="sidebar-enseignant-pedagogie" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                        <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                        <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">Pédagogie</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-enseignant-pedagogie" >
                                <ul className="sub-nav">
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard_professeur/cours_classe' ? 'active' : ''} nav-link`} to="/Enseignant/Planning/">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> G </i>
                                            <span className="item-name"> Planning </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard_professeur/cours_classe' ? 'active' : ''} nav-link`} to="/Enseignant/Matieres/Chapitres">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> G </i>
                                            <span className="item-name">{user.langue === "en" ? (<div>Pedagogical follow-up</div>):(<div> Suivi Pédagogique </div>)}</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard_professeur/list_classe' ? 'active' : ''} nav-link`} to="/Enseignant/Matieres/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> D </i>
                                            <span className="item-name"> {user.langue === "en" ? (<div>Note management</div>):(<div> Gestion des notes </div>)}</span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>


                        </Accordion.Item>
                        <li className={`${location.pathname === '/Cahier de texte' ? 'active' : ''} nav-item `}>
                            <Link className={`${location.pathname === '/Cahier de texte' ? 'active' : ''} nav-link `} aria-current="page" to={"/Enseignant/Text/Book/Matieres/"} onClick={() => { }}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">{user.langue === "en" ? (<div>Textbook</div>):(<div> Cahier de textes  </div>)}</span>
                            </Link>
                        </li>
                        <Accordion.Item as="li" eventKey="sidebar-enseignant-requetes" bsPrefix={`nav-item ${active === 'Classes' ? 'active' : ''} `} onClick={() => setActive('Classes')}  >
                            <CustomToggle eventKey="sidebar-enseignant-requetes" onClick={(activeKey) => setActiveMenu(activeKey)}>
                                <i className="icon">
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                                <span className="item-name">{user.langue === "en" ? (<div>Messaging</div>):(<div> Messagerie  </div>)}</span>
                                <i className="right-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </i>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="sidebar-enseignant-requetes" >
                                <ul className="sub-nav">
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard_professeur/cours_classe' ? 'active' : ''} nav-link`} to="/Enseignant/Matieres/Chapitres">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> G </i>
                                            <span className="item-name"> {user.langue === "en" ? (<div>Receipts</div>):(<div> Reçus  </div>)} </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname === '/dashboard_professeur/list_classe' ? 'active' : ''} nav-link`} to="/Enseignant/Matieres/Notes">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                            </i>
                                            <i className="sidenav-mini-icon"> D </i>
                                            <span className="item-name">{user.langue === "en" ? (<div>Sent</div>):(<div> Envoyés  </div>)} </span>
                                        </Link>
                                    </li>

                                </ul>
                            </Accordion.Collapse>


                        </Accordion.Item>




                    </div>) : (<div></div>)}

                <li><hr className="hr-horizontal" /></li>


            </Accordion >
        </Fragment >
    )
})

export default VerticalNav
