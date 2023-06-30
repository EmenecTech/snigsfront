import React, { useState, useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import Card from '../../src/components/Card'
import Logo from '../components/partials/components/logo'
import { Link } from 'react-router-dom'

//uiKit
import Accordions from './uikit/accordion'
import Alerts from './uikit/alert'
import Badges from './uikit/badge'
import Breadcrumbs from './uikit/breadcrumb'
import Buttons from './uikit/button'
import ButtonGroups from './uikit/buttons-group'
import Calenders from './uikit/calender'
import Cards from './uikit/card'
import Carousels from './uikit/carousel'
import DropDowns from './uikit/dropdowns'
import ListGroups from './uikit/list-group'
import Modals from './uikit/modal'
import Navbars from './uikit/navbar'
import Navs from './uikit/nav'
import OffCanvass from './uikit/off-canvas'
import Paginations from './uikit/pagination'
import Popovers from './uikit/popovers'
import Scrollspys from './uikit/scrollspy'
import Spinnerss from './uikit/spinner'
import Toasts from './uikit/toast'
import Tooltips from './uikit/tooltip'
import Progresss from './uikit/progress'
//form
import DisabledForms from './uikit/disabled-form'
import AFormControls from './uikit/alternate-form-control'
import Sizings from './uikit/sizing'
import InputGroups from './uikit/input-group'
import FloatingLables from './uikit/floating-lable'
import AFloatingLables from './uikit/alternate-floating-lable'
import ToggleBtns from './uikit/toggle-btn'
import Validations from './uikit/validation'
import Overview from './uikit/form-overview'

// content
import Typographys from './uikit/typography'
import Images from './uikit/image'
import Figures from './uikit/figure'
import Tables from './uikit/table'

//img
import topImage from '../assets/images/dashboard/top-image.jpg'
import github from '../assets/images/brands/23.png'

//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'

// SliderTab
import SliderTab from '../plugins/slider-tabs'

// Import selectors & action from setting store
import * as SettingSelector from "../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";



const ComposantsFronts = () => {
  const appName = useSelector(SettingSelector.app_name);
  // collapse
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        Array.from(
          document.querySelectorAll('[data-toggle="slider-tab"]'),
          (elem) => {
            return new SliderTab(elem);
          }
        );
      }, 100);
    };
  });

  return (
    <Fragment>
      <span className="uisheet screen-darken"></span>
      <div
        className="header"
        style={{
          background: `url(${topImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          position: "relative",
        }}
      >
        <div className="main-img">
          <div className="container">
            <svg
              width="150"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="-0.423828"
                y="34.5762"
                width="50"
                height="7.14286"
                rx="3.57143"
                transform="rotate(-45 -0.423828 34.5762)"
                fill="white"
              />
              <rect
                x="14.7295"
                y="49.7266"
                width="50"
                height="7.14286"
                rx="3.57143"
                transform="rotate(-45 14.7295 49.7266)"
                fill="white"
              />
              <rect
                x="19.7432"
                y="29.4902"
                width="28.5714"
                height="7.14286"
                rx="3.57143"
                transform="rotate(45 19.7432 29.4902)"
                fill="white"
              />
              <rect
                x="19.7783"
                y="-0.779297"
                width="50"
                height="7.14286"
                rx="3.57143"
                transform="rotate(45 19.7783 -0.779297)"
                fill="white"
              />
            </svg>
            <h1 className="my-4">
              <span data-setting="app_name">{appName}</span>- Design System
            </h1>
            <h4 className="text-white mb-5">
              Production ready FREE Open Source <b>Dashboard UI Kit</b> and{" "}
              <b>Design System</b>.
            </h4>
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <Link
                  className="btn btn-light bg-white d-flex"
                  to="/dashboard"
                  target="_black"
                >
                  <svg
                    width="22"
                    height="22"
                    className="me-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  Dashboard Demo
                </Link>
              </div>
              <div className="ms-3">
                <Button bsPrefix=" btn btn-light bg-white d-flex" target="_blank" href="https://github.com/iqonic-design/hope-ui-react-dashboard">
                  <img src={github} width="24px" height="24px" alt="github" />
                  <span className="text-danger mx-2 fw-bold">STAR US</span>
                  <span>ON GITHUB</span>
                </Button>
              </div>

            </div>
          </div>
        </div>
        <Container>
          <Nav className="rounded  navbar navbar-expand-lg navbar-light top-1">
            <Container>
              <Navbar.Brand href="#" className="mx-2 d-flex align-items-center">
                <Logo color={true} />
                <h5 className="logo-title mx-3">{appName}</h5>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={() => setOpen3(!open3)}
              />
              <Navbar.Collapse id="basic-navbar-nav" in={open3}>
                <ul className="mb-2 navbar-nav ms-auto mb-lg-0 d-flex align-items-start">
                  <Nav.Item as="li">
                    <Nav.Link
                      aria-current="page"
                      href="https://templates.iqonic.design/hope-ui/documentation/react/build/"
                      target="_blank"
                    >
                      Documentation
                    </Nav.Link>
                  </Nav.Item>
                  <li className="nav-item me-3">
                    <Nav.Link
                      aria-current="page"
                      href="https://templates.iqonic.design/hope-ui/documentation/react/build/changelog"
                      target="_blank"
                    >
                      Change Log
                    </Nav.Link>
                  </li>

                </ul>
              </Navbar.Collapse>
            </Container>
          </Nav>
        </Container>
      </div>
      <div className=" body-class-1 container">
        <aside
          className="mobile-offcanvas bd-aside card iq-document-card sticky-xl-top text-muted align-self-start mb-5 mt-n5"
          id="left-side-bar"
        >
          <div className="offcanvas-header p-0">
            <button className="btn-close float-end"></button>
          </div>
          <h2 className="h6 pb-2 border-bottom">On this page</h2>
          <div className="small" id="elements-section">
            <ul className="list-unstyled mb-0">
              <li className="mt-2">
                <Button
                  variant=" d-inline-flex align-items-center "
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <i className="right-icon me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-18"
                      width="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </i>
                  Components
                </Button>
                <Collapse in={open}>
                  <ul
                    className="list-unstyled ps-3 elem-list"
                    id="components-collapse"
                    to="#components"
                  >
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#accordion"
                      >
                        Accordion
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#alerts"
                      >
                        Alerts
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#badge"
                      >
                        Badge
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#breadcrumb"
                      >
                        Breadcrumb
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#buttons"
                      >
                        Buttons
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#button-group"
                      >
                        Button Group
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#calendar"
                      >
                        Calendar
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#card"
                      >
                        Card
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#carousel"
                      >
                        Carousel
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#dropdowns"
                      >
                        Dropdowns
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#list-group"
                      >
                        List Group
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#modal"
                      >
                        Modal
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#navs"
                      >
                        Navs
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#navbar"
                      >
                        Navbar
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#off-canvas"
                      >
                        Off Canvas
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#pagination"
                      >
                        Pagination
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#popovers"
                      >
                        Popovers
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-item-center rounded"
                        href="#ribbon"
                      >
                        Ribbon
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#progress"
                      >
                        Progress
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#scrollspy"
                      >
                        Scrollspy
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#spinners"
                      >
                        Spinners
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#toasts"
                      >
                        Toasts
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#tooltips"
                      >
                        Tooltips
                      </Nav.Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li className="my-2">
                <Button
                  variant=" d-inline-flex align-items-center "
                  onClick={() => setOpen1(!open1)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open1}
                >
                  <i className="right-icon me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-18"
                      width="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </i>
                  Forms
                </Button>
                <Collapse in={open1}>
                  <ul
                    className="list-unstyled ps-3 "
                    id="forms-collapse"
                    to="#forms"
                  >
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#overview"
                      >
                        Overview
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#disabled-forms"
                      >
                        Disabled Forms
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#sizing"
                      >
                        Sizing
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#input-group"
                      >
                        Input Group
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#a-form-control"
                      >
                        Alertnate Input
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#floating-labels"
                      >
                        Floating Labels
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#a-floating-labels"
                      >
                        Alertnate Float Labels
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#toggle-btn"
                      >
                        Toggle Button
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#validation"
                      >
                        Validation
                      </Nav.Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li className="mb-2">
                <Button
                  variant=" d-inline-flex align-items-center "
                  onClick={() => setOpen2(!open2)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open2}
                >
                  <i className="right-icon me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-18"
                      width="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </i>
                  Contents
                </Button>
                <Collapse in={open2}>
                  <ul
                    className="list-unstyled ps-3 "
                    id="contents-collapse"
                    to="#content"
                  >
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#typography"
                      >
                        Typography
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#images"
                      >
                        Images
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#tables"
                      >
                        Tables
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        className="d-inline-flex align-items-center rounded"
                        href="#figures"
                      >
                        Figures
                      </Nav.Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
            </ul>
          </div>
        </aside>
        <div className="bd-cheatsheet container-fluid bg-trasprent mt-n5">
          <section id="components">
            <div className="iq-side-content sticky-xl-top">
              <Card className="">
                <Card.Body className="">
                  <h4 className="fw-bold">Components</h4>
                </Card.Body>
              </Card>
            </div>
            <Accordions />
            <Alerts />
            <Badges />
            <Breadcrumbs />
            <Buttons />
            <ButtonGroups />
            <Calenders />
            <Cards />
            <Carousels />
            <DropDowns />
            <ListGroups />
            <Modals />
            <Navs />
            <Navbars />
            <OffCanvass />
            <Paginations />
            <Popovers />
            <Progresss />
            <Scrollspys />
            <Spinnerss />
            <Toasts />
            <Tooltips />
          </section>
          <section id="forms">
            <div className="iq-side-content sticky-xl-top">
              <Card className="">
                <Card.Body className="">
                  <h4 className="fw-bold">Forms</h4>
                </Card.Body>
              </Card>
            </div>
            <Overview />
            <DisabledForms />
            <Sizings />
            <InputGroups />
            <AFormControls />
            <FloatingLables />
            <AFloatingLables />
            <ToggleBtns />
            <Validations />
          </section>
          <section id="content">
            <div className="iq-side-content sticky-xl-top">
              <Card className="">
                <Card.Body className="">
                  <h4 className="fw-bold">Contents</h4>
                </Card.Body>
              </Card>
            </div>
            <Typographys />
            <Images />
            <Tables />
            <Figures />
          </section>
        </div>
      </div>
      <div id="back-to-top" style={{ display: "none" }}>
        <Button size="xs" variant="primary  p-0 position-fixed top" href="#top">
          <svg
            width="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15.5L12 8.5L19 15.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>
      </div>
    </Fragment>
  )
}

export default ComposantsFronts;
