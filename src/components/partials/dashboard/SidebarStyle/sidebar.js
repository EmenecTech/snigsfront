import React, { useEffect, memo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import VerticalNav from '../SidebarStyle/vertical-nav'
import { useState } from 'react'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { useCallback, useRef } from 'react'
import { Row, Col, Form, Button, Image, Card } from 'react-bootstrap'
import { createPath, useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import CustomToggle from '../../../dropdowns'

import AuthUser from '../../../AuthUser'

//scrollbar
import Scrollbar from "smooth-scrollbar";

// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import Logo from '../../components/logo';

// import SidebarDark from '../../components/settingoffcanvas'

// export const SidebarDark =() =>{

// }


const Sidebar = memo((props) => {
  const sidebarColor = useSelector(SettingSelector.sidebar_color);
  const sidebarHide = useSelector(SettingSelector.sidebar_show); // array
  const sidebarType = useSelector(SettingSelector.sidebar_type); // array
  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);
  const { user, http } = AuthUser();
  const idetab = user.etablissement;
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


  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };
  useEffect(() => {
    Scrollbar.init(document.querySelector("#my-scrollbar"));

    window.addEventListener("resize", () => {
      const tabs = document.querySelectorAll(".nav");
      const sidebarResponsive = document.querySelector(
        '[data-sidebar="responsive"]'
      );
      if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (
            !elem.classList.contains("flex-column") &&
            elem.classList.contains("nav-tabs") &&
            elem.classList.contains("nav-pills")
          ) {
            elem.classList.add("flex-column", "on-resize");
          }
          return elem.classList.add("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains("sidebar-mini")) {
            sidebarResponsive.classList.add("sidebar-mini", "on-resize");
          }
        }
      } else {
        Array.from(tabs, (elem) => {
          if (elem.classList.contains("on-resize")) {
            elem.classList.remove("flex-column", "on-resize");
          }
          return elem.classList.remove("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains("sidebar-mini") &&
            sidebarResponsive.classList.contains("on-resize")
          ) {
            sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
          }
        }
      }
    });
  });



  return (
    <Fragment>
      <aside
        className={` ${sidebarColor} ${sidebarType.join(" ")} ${sidebarMenuStyle} ${sidebarHide.join(" ") ? 'sidebar-none' : 'sidebar'}   sidebar-base  `}
        data-sidebar="responsive"
      >
        <div className="sidebar-header d-flex align-items-center justify-content-center">
          <Link to="/dashboard" className="navbar-brand">

            <Image
              className="theme-color-default-img  profile-pic rounded avatar-100"
              src={"https://snigsbackend.com/avatar/" + idetab + ".png"}
              alt="profile-pic"
              roundedCircle="yes"
              style={{ width: "10px" }}
            />

          </Link>
          <div
            className="sidebar-toggle"
            data-toggle="sidebar"
            data-active="true"
            onClick={minisidebar}
          >
            <i className="icon">
              <svg
                width="20"
                className="icon-20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2744L19.25 12.2744"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </i>
          </div>
        </div>
        <div
          className="pt-0 sidebar-body data-scrollbar"
          data-scroll="1"
          id="my-scrollbar"
        >
          {/* sidebar-list class to be added after replace css */}
          <div className="sidebar-list navbar-collapse" id="sidebar">
            <VerticalNav />
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </aside>
    </Fragment>
  )
})

export default Sidebar

