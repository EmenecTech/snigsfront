import React, { useState, useEffect, memo, Fragment, useCallback, useRef } from "react";
import { Row, Col, Dropdown, Modal, Button, Table, Form, Image } from "react-bootstrap";
import { createPath, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthUser from "../../../components/AuthUser.js";
import Axios from "axios";
import QRCode from "react-qr-code";

import http from "../../../http.js";

//circular
import Circularprogressbar from "../../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../../node_modules/aos/dist/aos";
import "../../../../node_modules/aos/dist/aos.css";
//apexcharts 
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../../components/progress.js";

//img
import shapes1 from "../../../assets/images/shapes/01.png";
import shapes2 from "../../../assets/images/shapes/02.png";
import shapes3 from "../../../assets/images/shapes/03.png";
import shapes4 from "../../../assets/images/shapes/04.png";
import shapes5 from "../../../assets/images/shapes/05.png";

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

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
import Card from "../../../components/Card.js";

import { useReactToPrint } from "react-to-print";


// install Swiper modules
SwiperCore.use([Navigation]); 




const BulletinByEleve = memo((props) => {

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "employee data",
        onafterprint: () => alert("print success"),
    });

    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { evaluation, niveau,  classe, userid } = useParams();
    const etab = user.etablissement;
   



    const [info_etab, setinfo_etab] = useState([]);

    useEffect(() => {
        fetchAllinfo_etab()
    }, []);

    const fetchAllinfo_etab = () => {
        http.get('/get_name_logo/' + etab).then((res) => {
            setinfo_etab(res.data);
        });
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
            "/avatar/images/" + etab + ".png",

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
    const [matiereslevel, setmatiereslevel] = useState([]);
    useEffect(() => {
        fetchAllmatiereslevel();
    }, []);

    const fetchAllmatiereslevel = () => {
        http.get('/get_matieres_niveau_planning/' + niveau + '/' + etab).then(res => {
            setmatiereslevel(res.data);
        })
    }

    const [classes, setclasses] = useState([]);
    useEffect(() => {
        fetchAllclasses();
    }, []);

    const fetchAllclasses = () => {
        http.get('/classe_bull/' + classe + '/' + etab).then(res => {
            setclasses(res.data);
        })
    }
    
   const [enseign, setenseign] = useState();
    useEffect(() => {
       fetchAllenseign();
    }, []);

    const fetchAllenseign = () => {
        http.get('/get_ens_prim/' + etab + '/' + classe).then(res => {
             setenseign(res.data);
        })
    }

     const [elevesinclass, setelevesinclass] = useState();
    useEffect(() => {
       fetchAllelevesinclass();
    }, []);

    const fetchAllelevesinclass = () => {
        http.get('/get_eleve_in_class/' + etab + '/' + classe + '/' + userid).then(res => {
             setelevesinclass(res.data);
        })
    };


    ////////////////////////////////
   
    const [allnote_1, setAllNote_1] = useState({});
    useEffect(() => {
        fetchAllNote_1();
    }, []);

    const fetchAllNote_1 = () => {
        http.get('/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
    
     const [allnoteprim_1, setAllNoteprim_1] = useState({});
    useEffect(() => {
        fetchAllNoteprim_1();
    }, []);

    const fetchAllNoteprim_1 = () => {
        http.get('/all/prim/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_1(res.data);
      })
    };
    
    
    //////////////////////////////////////////////
   
    const [allnote_2, setAllNote_2] = useState([]);
    useEffect(() => {
        fetchAllNote_2();
    }, []);

    const fetchAllNote_2 = () => {
        http.get('/all/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_2(res.data);
      })
    };
     const [allnoteprim_2, setAllNoteprim_2] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_2();
    }, []);

    const fetchAllNoteprim_2 = () => {
        http.get('/all/prim/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_2(res.data);
      })
    };
    
   
    //////////////////////////////////////////////
  
    const [allnote_3, setAllNote_3] = useState([]);
    useEffect(() => {
        fetchAllNote_3();
    }, []);

    const fetchAllNote_3 = () => {
        http.get('/all/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_3(res.data);
      })
    };
    
    const [allnoteprim_3, setAllNoteprim_3] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_3();
    }, []);

    const fetchAllNoteprim_3 = () => {
        http.get('/all/prim/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_3(res.data);
      })
    };
    
   
    ///////////////////////////////////////////////
 
    const [allnote_4, setAllNote_4] = useState([]);
    useEffect(() => {
        fetchAllNote_4();
    }, []);

    const fetchAllNote_4 = () => {
        http.get('/all/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_4(res.data);
      })
    };
  const [allnoteprim_4, setAllNoteprim_4] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_4();
    }, []);

    const fetchAllNoteprim_4 = () => {
        http.get('/all/prim/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_4(res.data);
      })
    };
  
   
    //////////////////////////////////////////////
     
    const [allnote_5, setAllNote_5] = useState([]);
    useEffect(() => {
        fetchAllNote_5();
    }, []);

    const fetchAllNote_5 = () => {
        http.get('/all/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_5(res.data);
      })
    };
     const [allnoteprim_5, setAllNoteprim_5] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_5();
    }, []);

    const fetchAllNoteprim_5 = () => {
        http.get('/all/prim/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_5(res.data);
      })
    };
   
    //////////////////////////////////////////////
   
    const [allnote_6, setAllNote_6] = useState([]);
    useEffect(() => {
        fetchAllNote_6();
    }, []);

    const fetchAllNote_6 = () => {
        http.get('/all/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_6(res.data);
      })
    };
    const [allnoteprim_6, setAllNoteprim_6] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_6();
    }, []);

    const fetchAllNoteprim_6 = () => {
        http.get('/all/prim/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_6(res.data);
      })
    };
    
    //////////////////////////////////////////////
   
    const [allnote_7, setAllNote_7] = useState([]);
    useEffect(() => {
        fetchAllNote_7();
    }, []);

    const fetchAllNote_7 = () => {
        http.get('/all/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_7(res.data);
      })
    };
    const [allnoteprim_7, setAllNoteprim_7] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_7();
    }, []);

    const fetchAllNoteprim_7 = () => {
        http.get('/all/prim/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_7(res.data);
      })
    };
    
   
    
    //////////////////////////////////////////////
    const [allnote_8, setAllNote_8] = useState([]);
    useEffect(() => {
        fetchAllNote_8();
    }, []);

    const fetchAllNote_8 = () => {
        http.get('/all/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_8(res.data);
      })
    };
    const [allnoteprim_8, setAllNoteprim_8] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_8();
    }, []);

    const fetchAllNoteprim_8 = () => {
        http.get('/all/prim/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_8(res.data);
      })
    };
     
  
  //////////////////////////////////////////////
    
    
    const [allnote_9, setAllNote_9] = useState([]);
    useEffect(() => {
        fetchAllNote_9();
    }, []);

    const fetchAllNote_9 = () => {
        http.get('/all/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
     const [allnoteprim_9, setAllNoteprim_9] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_9();
    }, []);

    const fetchAllNoteprim_9 = () => {
        http.get('/all/prim/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_1(res.data);
      })
    };
    
    //////////////////////////////////////////////
   
    const [allnote_10, setAllNote_10] = useState([]);
    useEffect(() => {
        fetchAllNote_10();
    }, []);

    const fetchAllNote_10 = () => {
        http.get('/all/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_10(res.data);
      })
    };
     const [allnoteprim_10, setAllNoteprim_10] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_10();
    }, []);

    const fetchAllNoteprim_10 = () => {
        http.get('/all/prim/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_10(res.data);
      })
    };
    
     console.log(allnote_1.existgrp);
     console.log(allnote_10.existgrp);
    
    //////////////////////////////////////////////
    
    
    const [allnote_11, setAllNote_11] = useState([]);
    useEffect(() => {
        fetchAllNote_11();
    }, []);

    const fetchAllNote_11 = () => {
        http.get('/all/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
     const [allnoteprim_11, setAllNoteprim_11] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_11();
    }, []);

    const fetchAllNoteprim_11 = () => {
        http.get('/all/prim/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_1(res.data);
      })
    };
    
    
    //////////////////////////////////////////////
  
    const [allnote_12, setAllNote_12] = useState([]);
    useEffect(() => {
        fetchAllNote_12();
    }, []);

    const fetchAllNote_12 = () => {
        http.get('/all/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_12(res.data);
      })
    };
     const [allnoteprim_12, setAllNoteprim_12] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_12();
    }, []);

    const fetchAllNoteprim_12 = () => {
        http.get('/all/prim/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_12(res.data);
      })
    };

    //////////////////////////////////////////////
   
    const [allnote_13, setAllNote_13] = useState([]);
    useEffect(() => {
        fetchAllNote_13();
    }, []);

    const fetchAllNote_13 = () => {
        http.get('/all/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_13(res.data);
      })
    };
     const [allnoteprim_13, setAllNoteprim_13] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_13();
    }, []);

    const fetchAllNoteprim_13 = () => {
        http.get('/all/prim/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_13(res.data);
      })
    };
 
    //////////////////////////////////////////////
  
    const [allnote_14, setAllNote_14] = useState([]);
    useEffect(() => {
        fetchAllNote_14();
    }, []);

    const fetchAllNote_14 = () => {
        http.get('/all/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_14(res.data);
      })
    };
      const [allnoteprim_14, setAllNoteprim_14] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_14();
    }, []);

    const fetchAllNoteprim_14 = () => {
        http.get('/all/prim/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_14(res.data);
      })
    };
   
    //////////////////////////////////////////////
   
    
    const [allnote_15, setAllNote_15] = useState([]);
    useEffect(() => {
        fetchAllNote_15();
    }, []);

    const fetchAllNote_15 = () => {
        http.get('/all/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_15(res.data);
      })
    };
      
    const [allnoteprim_15, setAllNoteprim_15] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_15();
    }, []);

    const fetchAllNoteprim_15 = () => {
        http.get('/all/prim/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_15(res.data);
      })
    };
  
    //////////////////////////////////////////////
   
    
    const [allnote_16, setAllNote_16] = useState([]);
    useEffect(() => {
        fetchAllNote_16();
    }, []);

    const fetchAllNote_16 = () => {
        http.get('/all/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_16(res.data);
      })
    };
    const [allnoteprim_16, setAllNoteprim_16] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_16();
    }, []);

    const fetchAllNoteprim_16 = () => {
        http.get('/all/prim/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_16(res.data);
      })
    };
 
    //////////////////////////////////////////////

      
    const [allnote_17, setAllNote_17] = useState([]);
    useEffect(() => {
        fetchAllNote_17();
    }, []);

    const fetchAllNote_17 = () => {
        http.get('/all/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_17(res.data);
      })
    };
    const [allnoteprim_17, setAllNoteprim_17] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_17();
    }, []);

    const fetchAllNoteprim_17 = () => {
        http.get('/all/prim/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_17(res.data);
      })
    };
    
  
    //////////////////////////////////////////////

      
    
    const [allnote_18, setAllNote_18] = useState([]);
    useEffect(() => {
        fetchAllNote_18();
    }, []);

    const fetchAllNote_18 = () => {
        http.get('/all/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_18(res.data);
      })
    };
    const [allnoteprim_18, setAllNoteprim_18] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_18();
    }, []);

    const fetchAllNoteprim_18 = () => {
        http.get('/all/prim/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_18(res.data);
      })
    };
  
     //////////////////////////////////////////////

     
    const [allnote_19, setAllNote_19] = useState([]);
    useEffect(() => {
        fetchAllNote_19();
    }, []);

    const fetchAllNote_19 = () => {
        http.get('/all/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_19(res.data);
      })
    };
     const [allnoteprim_19, setAllNoteprim_19] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_19();
    }, []);

    const fetchAllNoteprim_19 = () => {
        http.get('/all/prim/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_19(res.data);
      })
    };
    
     //////////////////////////////////////////////
    
    const [allnote_20, setAllNote_20] = useState([]);
    useEffect(() => {
        fetchAllNote_20();
    }, []);

    const fetchAllNote_20 = () => {
        http.get('/all/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_20(res.data);
      })
    };
    const [allnoteprim_20, setAllNoteprim_20] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_20();
    }, []);

    const fetchAllNoteprim_20 = () => {
        http.get('/all/prim/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_20(res.data);
      })
    };
   
     //////////////////////////////////////////////

    const [allnote_21, setAllNote_21] = useState([]);
    useEffect(() => {
        fetchAllNote_21();
    }, []);

    const fetchAllNote_21 = () => {
        http.get('/all/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_21(res.data);
      })
    };
    
    const [allnoteprim_21, setAllNoteprim_21] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_21();
    }, []);

    const fetchAllNoteprim_21 = () => {
        http.get('/all/prim/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_21(res.data);
      })
    };
    
     //////////////////////////////////////////////

    const [allnote_22, setAllNote_22] = useState([]);
    useEffect(() => {
        fetchAllNote_22();
    }, []);

    const fetchAllNote_22 = () => {
        http.get('/all/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_22(res.data);
      })
    };
      const [allnoteprim_22, setAllNoteprim_22] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_22();
    }, []);

    const fetchAllNoteprim_22 = () => {
        http.get('/all/prim/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_22(res.data);
      })
    };
   
     //////////////////////////////////////////////
    
    const [allnote_23, setAllNote_23] = useState([]);
    useEffect(() => {
        fetchAllNote_23();
    }, []);

    const fetchAllNote_23 = () => {
        http.get('/all/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_23(res.data);
      })
    };
     const [allnoteprim_23, setAllNoteprim_23] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_23();
    }, []);

    const fetchAllNoteprim_23 = () => {
        http.get('/all/prim/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_23(res.data);
      })
    };
  
     //////////////////////////////////////////////

    const [allnote_24, setAllNote_24] = useState([]);
    useEffect(() => {
        fetchAllNote_24();
    }, []);

    const fetchAllNote_24 = () => {
        http.get('/all/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_24(res.data);
      })
    };
    const [allnoteprim_24, setAllNoteprim_24] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_24();
    }, []);

    const fetchAllNoteprim_24 = () => {
        http.get('/all/prim/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_24(res.data);
      })
    };
   
     //////////////////////////////////////////////
    
    const [allnote_25, setAllNote_25] = useState([]);
    useEffect(() => {
        fetchAllNote_25();
    }, []);

    const fetchAllNote_25 = () => {
        http.get('/all/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_25(res.data);
      })
    };
     const [allnoteprim_25, setAllNoteprim_25] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_25();
    }, []);

    const fetchAllNoteprim_25 = () => {
        http.get('/all/prim/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_25(res.data);
      })
    };
    
   
     //////////////////////////////////////////////

    const [allnote_26, setAllNote_26] = useState([]);
    useEffect(() => {
        fetchAllNote_26();
    }, []);

    const fetchAllNote_26 = () => {
        http.get('/all/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_26(res.data);
      })
    };
    const [allnoteprim_26, setAllNoteprim_26] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_26();
    }, []);

    const fetchAllNoteprim_26 = () => {
        http.get('/all/prim/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_26(res.data);
      })
    };
    
     //////////////////////////////////////////////
    
    const [allnote_27, setAllNote_27] = useState([]);
    useEffect(() => {
        fetchAllNote_27();
    }, []);

    const fetchAllNote_27 = () => {
        http.get('/all/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_27(res.data);
      })
    };
     const [allnoteprim_27, setAllNoteprim_27] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_27();
    }, []);

    const fetchAllNoteprim_27 = () => {
        http.get('/all/prim/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_27(res.data);
      })
    };
     //////////////////////////////////////////////
    
    const [allnote_28, setAllNote_28] = useState([]);
    useEffect(() => {
        fetchAllNote_28();
    }, []);

    const fetchAllNote_28 = () => {
        http.get('/all/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_28(res.data);
      })
    };
     const [allnoteprim_28, setAllNoteprim_28] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_28();
    }, []);

    const fetchAllNoteprim_28 = () => {
        http.get('/all/prim/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_28(res.data);
      })
    };
  
     //////////////////////////////////////////////
    
    const [allnote_29, setAllNote_29] = useState([]);
    useEffect(() => {
        fetchAllNote_29();
    }, []);

    const fetchAllNote_29 = () => {
        http.get('/all/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_29(res.data);
      })
    };
     const [allnoteprim_29, setAllNoteprim_29] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_29();
    }, []);

    const fetchAllNoteprim_29 = () => {
        http.get('/all/prim/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_29(res.data);
      })
    };
    
  
     //////////////////////////////////////////////
    
    const [allnote_30, setAllNote_30] = useState([]);
    useEffect(() => {
        fetchAllNote_30();
    }, []);

    const fetchAllNote_30 = () => {
        http.get('/all/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_30(res.data);
      })
    };
    const [allnoteprim_30, setAllNoteprim_30] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_30();
    }, []);

    const fetchAllNoteprim_30 = () => {
        http.get('/all/prim/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNoteprim_30(res.data);
      })
    };
   
    ////////////////////////////////////////////
    
   const [allnotes, setAllNotes] = useState([]);
    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = () => {
        http.get('/all_notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNotes(res.data);
      })
    };

    
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

    /////Somme des notes et moyenne
     const [sumnotes, setsumnotes] = useState([]);
    useEffect(() => {
        fetchAllsumnotes();
    }, []);

    const fetchAllsumnotes = () => {
        http.get('/sum/of/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setsumnotes(res.data);
        })
    }

    const [sumcoef, setsumcoef] = useState([]);
    useEffect(() => {
        fetchAllsumcoef();
    }, []);

    const fetchAllsumcoef = () => {
        http.get('/sum/of/coef/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setsumcoef(res.data);

        })
    }
    const [sumnotesfinale, setsumnotesfinale] = useState([]);
    useEffect(() => {
        fetchAllsumnotesfinale();
    }, []);

    const fetchAllsumnotesfinale = () => {
        http.get('/sum/of/final/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setsumnotesfinale(res.data);

        })
    }
    const [moyenneleve, setmoyenneleve] = useState([]);
    useEffect(() => {
        fetchAllmoyenneleve();
    }, []);

    const fetchAllmoyenneleve = () => {
        http.get('/moyenne/eleve/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setmoyenneleve(res.data);

        })
    }
  /////////////////////////////////////////////

    
    useSelector(SettingSelector.theme_color);

    const getVariableColor = () => {
        let prefix =
            getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
        if (prefix) {
            prefix = prefix.trim();
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary`
        );
        const color2 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}info`
        );
        const color3 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary-tint-20`
        );
        const color4 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}warning`
        );
        return {
            primary: color1.trim(),
            info: color2.trim(),
            warning: color4.trim(),
            primary_light: color3.trim(),
        };
    };
    const variableColors = getVariableColor();

    const colors = [variableColors.primary, variableColors.info];
    useEffect(() => {
        return () => colors;
    });

    useEffect(() => {
        AOS.init({
            startEvent: "DOMContentLoaded",
            disable: function () {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10,
        });
    });
    const chart1 = {
        options: {
            chart: {
                fontFamily:
                    '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: false,
                },
            },
            colors: colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    minWidth: 19,
                    maxWidth: 19,
                    style: {
                        colors: "#8A92A6",
                    },
                    offsetX: -5,
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                labels: {
                    minHeight: 22,
                    maxHeight: 22,
                    show: true,
                    style: {
                        colors: "#8A92A6",
                    },
                },
                lines: {
                    show: false, //or just here to disable only x axis grids
                },
                categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
            },
            grid: {
                show: false,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    shadeIntensity: 0,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 50, 80],
                    colors: colors,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        series: [
            {
                name: "total",
                data: [94, 80, 94, 80, 94, 80, 94],
            },
            {
                name: "pipline",
                data: [72, 60, 84, 60, 74, 60, 78],
            },
        ],
    };

    //chart2
    const chart2 = {
        options: {
            colors: colors,
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 10,
                        size: "50%",
                    },
                    track: {
                        margin: 10,
                        strokeWidth: "50%",
                    },
                    dataLabels: {
                        show: false,
                    },
                },
            },
            labels: ["Apples", "Oranges"],
        },
        series: [55, 75],
    };
    const chart3 = {
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "28%",
                    endingShape: "rounded",
                    borderRadius: 5,
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
                labels: {
                    minHeight: 20,
                    maxHeight: 20,
                    style: {
                        colors: "#8A92A6",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "",
                },
                labels: {
                    minWidth: 19,
                    maxWidth: 19,
                    style: {
                        colors: "#8A92A6",
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands";
                    },
                },
            },
        },
        series: [
            {
                name: "Successful deals",
                data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
            },
            {
                name: "Failed deals",
                data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
            },
        ],
    };










    return (
        <Fragment>
        {classes.cycle_niveau === 'Secondaire' || classes.cycle_niveau === 'Secondary' ? <div>
  
   {classes.section_niveau === 'Francophone' ? <div>

    {/* Bulletin du secondaire francophone */}
          <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    <Row>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIQUE DU CAMEROUN <br />
                                                                Paix - Travail - Patrie <br />
                                                                MINISTERE DES ENSEIGNEMENTS SECONDAIRES <br />

                                                            </p>


                                                        </Col>
                                                        <Col sm="4" >
                                                            <Row>
                                                                <Col sm="12" lg="12" className="d-flex justify-content-center">
                                                                    <div className="user-profile">
                                                                        <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col sm="12">
                                                                    <div className="container text-center">
                                                                         <p> <strong style={{ fontSize: "18px" }}> {info_etab.nom_etablissement} </strong>
                                                                        
                                                                        <br/>
                                                                        <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal>
                                                                    </p>

                                                                    </div>
                                                                </Col>
                                                            </Row>



                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                Peace - Work - Fatherland <br />
                                                                MINISTRY OF SECONDARY EDUCATION <br />

                                                            </p>


                                                        </Col>

                                                    </Row>
                                                    <Row className="mt-2">
                                                        <Col sm="4" lg="4">


                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">
                                                              <span style={{ fontSize: "15px" }}> Bulletin De Notes {evaluation}</span>
                                                                <br/>
                                                                2022 - 2023
                                                            </p>


                                                        </Col>
                                                        <Col sm="4" lg="4">


                                                        </Col>

                                                    </Row>
                                                    <Row>
                                               <Col sm="12" lg="12">
                                                    <Row style={{ fontSize: "10px" }}>
                                                      <Col sm="4" lg="4">
                                                        <div className="mt-2">
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Nom et Prénom : {elevesinclass} </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Né(e) Le : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Sexe : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Matricule : </p>
                                                        </div>
                                                      </Col>
                                                      <Col sm="4" lg="4">
                                                        <div className="mt-2">
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Classe : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Redoublant(e) : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Professeur principal :</p>
                                                        </div>
                                                      </Col>
                                                            <Col sm="4" lg="4">
                                                            <div className="bd-example">
                                                                <figure className="figure">
                                                                    <Image
                                                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                        src={image}
                                                                        alt="profile-pic"
                                                                        style={{ width: "100px" }}
                                                                    />
                                                                </figure>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                                    <Row>
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

                                                                        <th><p>
                                                                            Disciplines 
                                                                        </p></th>
                                                                        
                                                                        <th>Note</th>
                                                                        <th>Coef</th>
                                                                        <th>NxC</th>
                                                                       
                                                                        <th>Appreciation</th>
                                                                    </tr>
                                                                    </thead>

                                                                        <tbody>
                                                                            {allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                                <tr key={grp_1}>
                                                                                    <td>{item.matiere_note}</td>
                                                                                    <td>{item.valeur_note}</td>
                                                                                    <td>{item.coefficient_note}</td>
                                                                                    <td>{item.note_finale}</td>
                                                                                    <td>{item.appreciation_note}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>{allnote_1.groupe}</th>
                                                                                <th>{allnote_1.sumnote}</th>
                                                                                <th>{allnote_1.sumcoef}</th>
                                                                                <th>{allnote_1.sumfinalnotes}</th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead> 
                                                
                                                             <tbody>
                                                                    {allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.coefficient_note}</td>
                                                                        <td>{item.note_finale}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                         ))}
                                                    
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th>{allnote_2.sumcoef}</th>
                                                                        <th>{allnote_2.sumfinalnotes}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            
                                                               
                                                              <tbody>
                                                                   
                                                                {allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.coefficient_note}</td>
                                                                        <td>{item.note_finale}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                   ))}
                                                          
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                         <th>{allnote_3.sumnote}</th>
                                                                        <th>{allnote_3.sumcoef}</th>
                                                                        <th>{allnote_3.sumfinalnotes}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                          
                                                                    
                                                                <tbody>

                                                                    <tr>
                                                                       <td>RECAPITULATIFS</td>
                                                                       
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>APPRECIATION DU TRAVAIL</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE: {moyenneleve}</p>
                                                                        </div>
                                                                            <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANG:</p>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">MENTION:</p>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                    Abscences non justifiées :
                                                                                    <br />
                                                                                    Abscences justifiées:
                                                                                    <br />
                                                                                    Avertissement conduite:
                                                                                    <br />
                                                                                    Blame conduite:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Tableau d'honneur:
                                                                                    <br />
                                                                                    Encouragement:
                                                                                    <br />
                                                                                    Félicitations:
                                                                                    <br />
                                                                                    Prime:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Moyenne de la classe:
                                                                                    <br />
                                                                                    Moyenne du premier:
                                                                                    <br />
                                                                                    Moyenne du dernier:

                                                                                </p>

                                                                            </div>
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>


                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

   </div> : <div> 
    
    {/* Bulletin du secondaire anglophone  */}

          <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Print
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    <Row>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIQUE DU CAMEROUN<br />
                                                                Paix - Travail - Patrie <br />
                                                                MINISTERE DES ENSEIGNEMENTS SECONDAIRES <br />

                                                            </p>


                                                        </Col>
                                                        <Col sm="4" >
                                                            <Row>
                                                                <Col sm="12" lg="12" className="d-flex justify-content-center">
                                                                    <div className="user-profile">
                                                                        <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                        <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="profile-pic" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col sm="12">
                                                                    <div className="container text-center">
                                                                         <p> <strong style={{ fontSize: "18px" }}> {info_etab.nom_etablissement} </strong>
                                                                        
                                                                        <br/>
                                                                        <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal>
                                                                    </p>

                                                                    </div>
                                                                </Col>
                                                            </Row>



                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                            <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                Peace - Work - Fatherland <br />
                                                                MINISTRY OF SECONDARY EDUCATION <br />

                                                            </p>


                                                        </Col>

                                                    </Row>
                                                    <Row className="mt-2">
                                                        <Col sm="4" lg="4">


                                                        </Col>
                                                        <Col sm="4" lg="4">
                                                           <p className="text-center">
                                                              <span style={{ fontSize: "15px" }}> Gradebook - {evaluation}</span>
                                                                <br/>
                                                                2022 - 2023
                                                            </p>



                                                        </Col>
                                                        <Col sm="4" lg="4">


                                                        </Col>

                                                    </Row>
                                                    <Row>
                                               <Col sm="12" lg="12">
                                                    <Row style={{ fontSize: "10px" }}>
                                                      <Col sm="4" lg="4">
                                                        <div className="mt-2">
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Nom et Prénom : {elevesinclass} </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Né(e) Le : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Sexe : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-1">Matricule : </p>
                                                        </div>
                                                      </Col>
                                                      <Col sm="4" lg="4">
                                                        <div className="mt-2">
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Classe : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Redoublant(e) : </p>
                                                          <p style={{ fontSize: "10px" }} className="mb-0">Professeur principal :</p>
                                                        </div>
                                                      </Col>
                                                            <Col sm="4" lg="4">
                                                            <div className="bd-example">
                                                                <figure className="figure">
                                                                    <Image
                                                                        className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                        src={image}
                                                                        alt="profile-pic"
                                                                        style={{ width: "100px" }}
                                                                    />
                                                                </figure>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                                    <Row>
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

                                                                        <th><p>
                                                                            Disciplines 
                                                                        </p></th>
                                                                    
                                                                        <th>Note</th>
                                                                        <th>Cote</th>
                                                                        <th>NxC</th>
                                                                       
                                                                        <th>Appreciation</th>
                                                                    </tr>
                                                               </thead>
                                                
                                                         <tbody>
                                                                   
                                                                {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.coefficient_note}</td>
                                                                        <td>{item.note_finale}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_1.groupe}</th>
                                                                         <th>{allnote_1.sumnote}</th>
                                                                        <th>{allnote_1.sumcoef}</th>
                                                                        <th>{allnote_1.sumfinalnotes}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                 
                                                        <tbody>
                                                                   
                                                                {allnote_2.listnotes  && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.coefficient_note}</td>
                                                                        <td>{item.note_finale}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th>{allnote_2.sumcoef}</th>
                                                                        <th>{allnote_2.sumfinalnotes}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                       
                                                         <tbody>
                                                                   
                                                                {allnote_3.listnotes  && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.coefficient_note}</td>
                                                                        <td>{item.note_finale}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th>{allnote_3.sumcoef}</th>
                                                                        <th>{allnote_3.sumfinalnotes}</th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>

                                                                    <tr>
                                                                       <td>SUMMARY</td>
                                                                       
                                                                        <td>{sumnotes}</td>
                                                                        <td>{sumcoef}</td>
                                                                        <td>{sumnotesfinale}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>WORK APPRECIATION</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve}</p>
                                                                        </div>
                                                                            <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">MENTION:</p>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                    Unjustified absences :
                                                                                    <br />
                                                                                    Justified absences:
                                                                                    <br />
                                                                                    Worn:
                                                                                    <br />
                                                                                    Blame:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Roll of honor:
                                                                                    <br />
                                                                                    Encouragment:
                                                                                    <br />
                                                                                   Congratulations:
                                                                                    <br />
                                                                                    Prime:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Class average:
                                                                                    <br />
                                                                                    Average of the first:
                                                                                    <br />
                                                                                    Average of the last:

                                                                                </p>

                                                                            </div>
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>


                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

    </div>}

</div> : <div>

    {classes.cycle_niveau === 'Primaire' ? <div>
          
          {etab === 24 ? <div>

            {/* Bulletin du primaire francophone des petits intelligents */}

            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                           <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Nom de l'enseignant: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom :{elevesinclass}  </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
                                                        <div className="table-responsive border-bottom my-3">
                                             {allnote_1.existgrp === "No" || allnote_1.existgrp ? null : (
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                 <thead>
                                                                    <tr>
                                                                        <th><p>Disciplines</p></th>
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                </thead>
                                                    
                                                                 <tbody>
                                                                        
                                                                   {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                   
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnote_1.groupe}</th>
                                                                         <th>{allnote_1.sumnote}</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                       </Table>
                                                                    ) }   
                                                                
                                                         
                                                               
                                                         <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                 <thead>
                                                                    <tr>
                                                                        <th><p>Disciplines</p></th>
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                </thead>   
                                                        <tbody>
                                                                   
                                                                {allnote_2.listnotes && allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                    
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        <tbody>
                                                                   
                                                                {allnote_3.listnotes && allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                      
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                      
                                                         <tbody>
                                                            {allnote_4.listnotes && allnote_4.listnotes && allnote_4.listnotes.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_4.groupe}</th>
                                                                        <th>{allnote_4.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                        <tbody>
                                                             {allnote_5.listnotes && allnote_5.listnotes && allnote_5.listnotes.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_5.groupe}</th>
                                                                        <th>{allnote_5.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                   
                                                            <tbody>
                                                                    {allnote_6.listnotes && allnote_6.listnotes && allnote_6.listnotes.map((item, grp_6) => (
                                                                        <tr key={grp_6}>
                                                                                
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_6.groupe}</th>
                                                                            <th>{allnote_6.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                        <tbody>
                                                          {allnote_7.listnotes && allnote_7.listnotes && allnote_7.listnotes.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                         <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnote_7.groupe}</th>
                                                                        <th>{allnote_7.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_8.listnotes && allnote_8.listnotes && allnote_8.listnotes.map((item, grp_8) => (
                                                                        <tr key={grp_8}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_8.groupe}</th>
                                                                            <th>{allnote_8.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                             <tbody>
                                                                       
                                                                    {allnote_9.listnotes && allnote_9.listnotes && allnote_9.listnotes.map((item, grp_9) => (
                                                                        <tr key={grp_9}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_9.groupe}</th>
                                                                            <th>{allnote_9.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                            <tbody>
                                                                       
                                                                    {allnote_10.listnotes && allnote_10.listnotes && allnote_10.listnotes.map((item, grp_10) => (
                                                                        <tr key={grp_10}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_10.groupe}</th>
                                                                            <th>{allnote_10.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                         <tbody>
                                                                   
                                                                {allnote_11.listnotes && allnote_11.listnotes && allnote_11.listnotes.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_11.groupe}</th>
                                                                        <th>{allnote_11.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                               {allnote_12.listnotes && allnote_12.listnotes && allnote_12.listnotes.map((item, grp_12) => (
                                                                        <tr key={grp_12}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_12.groupe}</th>
                                                                            <th>{allnote_12.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                            <tbody>
                                                               {allnote_13.listnotes && allnote_13.listnotes && allnote_13.listnotes.map((item, grp_13) => (
                                                                        <tr key={grp_13}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_13.groupe}</th>
                                                                            <th>{allnote_13.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_14.listnotes && allnote_14.listnotes && allnote_14.listnotes.map((item, grp_14) => (
                                                                        <tr key={grp_14}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_14.groupe}</th>
                                                                            <th>{allnote_14.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                                   <tbody>
                                                                   
                                                                {allnote_15.listnotes && allnote_15.listnotes && allnote_15.listnotes.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_15.groupe}</th>
                                                                        <th>{allnote_15.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_16.listnotes && allnote_16.listnotes && allnote_16.listnotes.map((item, grp_16) => (
                                                                        <tr key={grp_16}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_16.groupe}</th>
                                                                            <th>{allnote_16.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_17.listnotes && allnote_17.listnotes && allnote_17.listnotes.map((item, grp_17) => (
                                                                        <tr key={grp_17}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_17.groupe}</th>
                                                                            <th>{allnote_17.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_18.listnotes && allnote_18.listnotes && allnote_18.listnotes.map((item, grp_18) => (
                                                                        <tr key={grp_18}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_18.groupe}</th>
                                                                            <th>{allnote_18.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_19.listnotes && allnote_19.listnotes && allnote_19.listnotes.map((item, grp_19) => (
                                                                        <tr key={grp_19}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_19.groupe}</th>
                                                                            <th>{allnote_19.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_20.listnotes && allnote_20.listnotes && allnote_20.listnotes.map((item, grp_20) => (
                                                                        <tr key={grp_20}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_20.groupe}</th>
                                                                            <th>{allnote_20.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_21.listnotes && allnote_21.listnotes && allnote_21.listnotes.map((item, grp_21) => (
                                                                        <tr key={grp_21}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_21.groupe}</th>
                                                                            <th>{allnote_21.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_22.listnotes && allnote_22.listnotes && allnote_22.listnotes.map((item, grp_22) => (
                                                                        <tr key={grp_22}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_22.groupe}</th>
                                                                            <th>{allnote_22.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                             <tbody>
                                                                       
                                                                    {allnote_23.listnotes && allnote_23.listnotes && allnote_23.listnotes.map((item, grp_23) => (
                                                                        <tr key={grp_23}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_23.groupe}</th>
                                                                            <th>{allnote_23.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_24.listnotes && allnote_24.listnotes && allnote_24.listnotes.map((item, grp_24) => (
                                                                        <tr key={grp_24}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_24.groupe}</th>
                                                                            <th></th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                              {allnote_25.listnotes && allnote_25.listnotes && allnote_25.listnotes.map((item, grp_25) => (
                                                                    <tr key={grp_25}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_25.groupe}</th>
                                                                        <th>{allnote_25.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                                <tbody>
                                                                       
                                                                    {allnote_26.listnotes && allnote_26.listnotes && allnote_26.listnotes.map((item, grp_26) => (
                                                                        <tr key={grp_26}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_26.groupe}</th>
                                                                            <th>{allnote_26.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>   
                                                        
                                                                 <tbody>
                                                                           
                                                                        {allnote_27.listnotes && allnote_27.listnotes && allnote_27.listnotes.map((item, grp_27) => (
                                                                            <tr key={grp_27}>
                                                                                <td>{item.matiere_note}</td>
                                                                                <td>{item.valeur_note}</td>
                                                                                <td>{item.appreciation_note}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                       <thead>
                                                                            <tr>
        
                                                                                <th>{allnote_27.groupe}</th>
                                                                                <th>{allnote_27.sumnote}</th>
                                                                                <th></th>
        
                                                                            </tr>
                                                                        </thead>
                                                         
                                                            <tbody>
                                                                       
                                                                    {allnote_28.listnotes && allnote_28.listnotes && allnote_28.listnotes.map((item, grp_28) => (
                                                                        <tr key={grp_28}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_28.groupe}</th>
                                                                            <th>{allnote_28.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_29.listnotes && allnote_29.listnotes && allnote_29.listnotes.map((item, grp_29) => (
                                                                        <tr key={grp_29}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_29.groupe}</th>
                                                                            <th>{allnote_29.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_30.listnotes && allnote_30.listnotes && allnote_30.listnotes.map((item, grp_30) => (
                                                                        <tr key={grp_30}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_30.groupe}</th>
                                                                            <th>{allnote_30.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                                <tbody> 

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td></td>
                                                                        <td>{sumnotes}</td>
                                                                        <td></td>
                                                                      
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>APPRECIATION DU TRAVAIL</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE GENERALE DE LA CLASSE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANG:</p>
                                                                        </div>
                                                                       </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                    Avertissement travail:
                                                                                    <br />
                                                                                    Blame travail:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Tableau d'honneur:
                                                                                    <br />
                                                                                    Encouragement:
                                                                                    <br />
                                                                                    Félicitations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>REMARQUES GENERALES</th>
                                                                        <th>ENSEIGNANT(E)</th>
                                                                        <th>DIRECTRICE(TEUR)</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    
                                                                    <tr>
                                                                        <td> / </td>
                                                                        <td> /  </td>
                                                                        <td> / </td>
                                                                        <td> / </td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
          </div> : <div>
            
            {/* Bulletin du primaire francophone général */}

           <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                           <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Nom de l'enseignant: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant:</p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom : {elevesinclass} </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
                                                        <div className="table-responsive border-bottom my-3">
                                                         {allnoteprim_1.groupe === "No" || allnoteprim_1.groupe ?  null : (<div>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                 <thead>
                                                                    <tr> 
                                                                        <th><p>Disciplines</p></th> 
                                                                        
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                </thead>
                                                                    
                                                                <tbody>
                                                                   
                                                              {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                                <tr key={grp_1}>
                                                               
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_1.groupe}</th>
                                                                     <th>{allnoteprim_1.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            </Table> 
                                    
                                                        </div>)}
                                                            
                                                                

                                                        {allnoteprim_2.existgrp === 0 || allnoteprim_2.existgrp ? null : (
                                                             <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                 <thead>
                                                                    <tr> 
                                                                        <th><p>Disciplines</p></th> 
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                               
                                                            {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                                <tr key={grp_2}>
                                                                
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td> 
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_2.groupe}</th>
                                                                    <th>{allnoteprim_2.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                         </Table> )}

                                                                  <Table>
                                                                  <thead>
                                                                    <tr> 
                                                                        <th><p>Disciplines</p></th> 
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                  </thead>
                                                                  <tbody>
                                                               
                                                            {allnoteprim_3.listnotes  && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                                <tr key={grp_3}>
                                                                  
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_3.groupe}</th>
                                                                    <th>{allnoteprim_3.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                                <tr key={grp_4}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_4.groupe}</th>
                                                                    <th>{allnoteprim_4.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_5.listnotes  && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                                <tr key={grp_5}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_5.groupe}</th>
                                                                    <th>{allnoteprim_5.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                                {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                       <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnoteprim_6.groupe}</th>
                                                                        <th>{allnoteprim_6.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_7.listnotes  && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                                <tr key={grp_7}>
                                                                  <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_7.groupe}</th>
                                                                    <th>{allnoteprim_7.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_8.groupe}</th>
                                                                        <th>{allnoteprim_8.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnoteprim_9.groupe}</th>
                                                                        <th>{allnoteprim_9.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_10.groupe}</th>
                                                                        <th>{allnoteprim_10.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                               
                                                            {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                                <tr key={grp_11}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_11.groupe}</th>
                                                                    <th>{allnoteprim_11.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_12.listnotes  && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_12.groupe}</th>
                                                                        <th>{allnoteprim_12.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_13.listnotes  && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_13.groupe}</th>
                                                                        <th>{allnoteprim_13.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_14.listnotes  && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_14.groupe}</th>
                                                                        <th>{allnoteprim_14.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                               <tbody>
                                                               
                                                            {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                                <tr key={grp_15}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_15.groupe}</th>
                                                                    <th>{allnoteprim_15.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                                    <tr key={grp_16}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_16.groupe}</th>
                                                                        <th>{allnoteprim_16.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                                    <tr key={grp_17}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnoteprim_17.groupe}</th>
                                                                        <th>{allnoteprim_17.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_18.listnotes  && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                                    <tr key={grp_18}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_18.groupe}</th>
                                                                        <th>{allnoteprim_18.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_19.listnotes  && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                                    <tr key={grp_19}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_19.groupe}</th>
                                                                        <th>{allnoteprim_19.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                                    <tr key={grp_20}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_20.groupe}</th>
                                                                        <th>{allnoteprim_20.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_21.listnotes  && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                                    <tr key={grp_21}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_21.groupe}</th>
                                                                        <th>{allnoteprim_21.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_22.listnotes  && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                                    <tr key={grp_22}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_22.groupe}</th>
                                                                        <th>{allnoteprim_22.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_23.listnotes  && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                                    <tr key={grp_23}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_23.groupe}</th>
                                                                        <th>{allnoteprim_23.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_24.listnotes  && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                                    <tr key={grp_24}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_24.groupe}</th>
                                                                        <th></th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                            {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                                <tr key={grp_25}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                            
                                                                    <th>{allnoteprim_25.groupe}</th>
                                                                    <th>{allnoteprim_25.sumnote}</th>
                                                                    <th></th>
                                                            
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                                    <tr key={grp_26}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_26.groupe}</th>
                                                                        <th>{allnoteprim_26.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>   
                                                            
                                                             <tbody>
                                                                       
                                                                    {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                        <tr key={grp_27}>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                            
                                                                            <th>{allnoteprim_27.groupe}</th>
                                                                            <th>{allnoteprim_27.sumnote}</th>
                                                                            <th></th>
                                                            
                                                                        </tr>
                                                                    </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_28.listnotes  && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                                    <tr key={grp_28}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_28.groupe}</th>
                                                                        <th>{allnoteprim_28.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                                    <tr key={grp_29}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_29.groupe}</th>
                                                                        <th>{allnoteprim_29.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                            
                                                            <tbody>
                                                                   
                                                                {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                                    <tr key={grp_30}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                            
                                                                        <th>{allnoteprim_30.groupe}</th>
                                                                        <th>{allnoteprim_30.sumnote}</th>
                                                                        <th></th>
                                                            
                                                                    </tr>
                                                                </thead>
                                                        
                                                                <tbody> 

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                      
                                                                    </tr>
                                                                </tbody>

                                                            </Table>
                                                                    
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>APPRECIATION DU TRAVAIL</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">MOYENNE GENERALE DE LA CLASSE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANG:</p>
                                                                        </div>
                                                                              
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                    Avertissement travail:
                                                                                    <br />
                                                                                    Blame travail:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Tableau d'honneur:
                                                                                    <br />
                                                                                    Encouragement:
                                                                                    <br />
                                                                                    Félicitations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>REMARQUES GENERALES</th>
                                                                        <th>ENSEIGNANT(E)</th>
                                                                        <th>DIRECTRICE(TEUR)</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    
                                                                    <tr>
                                                                        <td> / </td>
                                                                        <td> /  </td>
                                                                        <td> / </td>
                                                                        <td> / </td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

          </div>}

    </div> : <div>
        
    {classes.cycle_niveau === 'Primary' ? <div>

          {etab === 24 ? <div>

            {niveau === 'PRE NURSERY' || niveau === 'NURSERY ONE' || niveau === 'NURSERY TWO' ? <div>

                    {/* Bulletin de la maternelle anglophone des petits intelligents */}

            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Teacher's name: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Repeater:</p>
                                                                
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Name : {elevesinclass} </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                  
                                                                    <th>Disciplines</th>
                                                                     <th>Mark</th>
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_1.groupe}</th>
                                                                        <th>{allnote_1.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.listnotes && allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.listnotes && allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_4.listnotes && allnote_4.listnotes && allnote_4.listnotes.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_4.groupe}</th>
                                                                        <th>{allnote_4.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_5.listnotes && allnote_5.listnotes && allnote_5.listnotes.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_5.groupe}</th>
                                                                        <th>{allnote_5.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_6.listnotes && allnote_6.listnotes && allnote_6.listnotes.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_6.groupe}</th>
                                                                        <th>{allnote_6.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_7.listnotes && allnote_7.listnotes && allnote_7.listnotes.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_7.groupe}</th>
                                                                        <th>{allnote_7.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_8.listnotes && allnote_8.listnotes && allnote_8.listnotes.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_8.groupe}</th>
                                                                        <th>{allnote_8.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_9.listnotes && allnote_9.listnotes && allnote_9.listnotes.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_9.groupe}</th>
                                                                        <th>{allnote_9.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_10.listnotes && allnote_10.listnotes && allnote_10.listnotes.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_10.groupe}</th>
                                                                        <th>{allnote_10.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_11.listnotes && allnote_11.listnotes && allnote_11.listnotes.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_11.groupe}</th>
                                                                        <th>{allnote_11.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_12.listnotes && allnote_12.listnotes && allnote_12.listnotes.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_12.groupe}</th>
                                                                        <th>{allnote_12.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_13.listnotes && allnote_13.listnotes && allnote_13.listnotes.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_13.groupe}</th>
                                                                        <th>{allnote_13.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_14.listnotes && allnote_14.listnotes && allnote_14.listnotes.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_14.groupe}</th>
                                                                        <th>{allnote_14.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_15.listnotes && allnote_15.listnotes && allnote_15.listnotes.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_15.groupe}</th>
                                                                        <th>{allnote_15.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>SUMMARY</td>
                                                                        <td></td>
                                                                        <td>{sumnotes}</td>
                                                                        <td></td>
                                                                       
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>WORK APPRECIATION</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">CLASS AVERAGE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                        </div>
                                                                              
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                   Work warning:
                                                                                    <br />
                                                                                   Blame work:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Roll of honor:
                                                                                    <br />
                                                                                    Encouragment:
                                                                                    <br />
                                                                                    congratulations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>GENERAL REMARKS</th>
                                                                        <th>TEACHER</th>
                                                                        <th>DIRECTOR</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div> : <div>
                    
                    {/* Bulletin du primaire anglophone des petits intelligents */}

            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Teacher's name: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Repeater:</p>
                                                                
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Name :{elevesinclass}  </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                  
                                                                    <th>Disciplines</th>
                                                                   
                                                                    <th>Mark</th>
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                             <tbody>
                                                                    
                                                                {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                   
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_1.groupe}</th>
                                                                         <th>{allnote_1.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                    
                                                        <tbody>
                                                                   
                                                                {allnote_2.listnotes && allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                    
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        <tbody>
                                                                   
                                                                {allnote_3.listnotes && allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                      
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                      
                                                         <tbody>
                                                            {allnote_4.listnotes && allnote_4.listnotes && allnote_4.listnotes.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_4.groupe}</th>
                                                                        <th>{allnote_4.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                        <tbody>
                                                             {allnote_5.listnotes && allnote_5.listnotes && allnote_5.listnotes.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_5.groupe}</th>
                                                                        <th>{allnote_5.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                   
                                                            <tbody>
                                                                    {allnote_6.listnotes && allnote_6.listnotes && allnote_6.listnotes.map((item, grp_6) => (
                                                                        <tr key={grp_6}>
                                                                                
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_6.groupe}</th>
                                                                            <th>{allnote_6.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                        <tbody>
                                                          {allnote_7.listnotes && allnote_7.listnotes && allnote_7.listnotes.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                         <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnote_7.groupe}</th>
                                                                        <th>{allnote_7.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_8.listnotes && allnote_8.listnotes && allnote_8.listnotes.map((item, grp_8) => (
                                                                        <tr key={grp_8}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_8.groupe}</th>
                                                                            <th>{allnote_8.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                             <tbody>
                                                                       
                                                                    {allnote_9.listnotes && allnote_9.listnotes && allnote_9.listnotes.map((item, grp_9) => (
                                                                        <tr key={grp_9}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_9.groupe}</th>
                                                                            <th>{allnote_9.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                            <tbody>
                                                                       
                                                                    {allnote_10.listnotes && allnote_10.listnotes && allnote_10.listnotes.map((item, grp_10) => (
                                                                        <tr key={grp_10}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_10.groupe}</th>
                                                                            <th>{allnote_10.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                         <tbody>
                                                                   
                                                                {allnote_11.listnotes && allnote_11.listnotes && allnote_11.listnotes.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_11.groupe}</th>
                                                                        <th>{allnote_11.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                               {allnote_12.listnotes && allnote_12.listnotes && allnote_12.listnotes.map((item, grp_12) => (
                                                                        <tr key={grp_12}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_12.groupe}</th>
                                                                            <th>{allnote_12.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                            <tbody>
                                                               {allnote_13.listnotes && allnote_13.listnotes && allnote_13.listnotes.map((item, grp_13) => (
                                                                        <tr key={grp_13}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_13.groupe}</th>
                                                                            <th>{allnote_13.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_14.listnotes && allnote_14.listnotes && allnote_14.listnotes.map((item, grp_14) => (
                                                                        <tr key={grp_14}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_14.groupe}</th>
                                                                            <th>{allnote_14.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                                   <tbody>
                                                                   
                                                                {allnote_15.listnotes && allnote_15.listnotes && allnote_15.listnotes.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_15.groupe}</th>
                                                                        <th>{allnote_15.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_16.listnotes && allnote_16.listnotes && allnote_16.listnotes.map((item, grp_16) => (
                                                                        <tr key={grp_16}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_16.groupe}</th>
                                                                            <th>{allnote_16.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_17.listnotes && allnote_17.listnotes && allnote_17.listnotes.map((item, grp_17) => (
                                                                        <tr key={grp_17}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_17.groupe}</th>
                                                                            <th>{allnote_17.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_18.listnotes && allnote_18.listnotes && allnote_18.listnotes.map((item, grp_18) => (
                                                                        <tr key={grp_18}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_18.groupe}</th>
                                                                            <th>{allnote_18.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_19.listnotes && allnote_19.listnotes && allnote_19.listnotes.map((item, grp_19) => (
                                                                        <tr key={grp_19}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_19.groupe}</th>
                                                                            <th>{allnote_19.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_20.listnotes && allnote_20.listnotes && allnote_20.listnotes.map((item, grp_20) => (
                                                                        <tr key={grp_20}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_20.groupe}</th>
                                                                            <th>{allnote_20.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_21.listnotes && allnote_21.listnotes && allnote_21.listnotes.map((item, grp_21) => (
                                                                        <tr key={grp_21}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_21.groupe}</th>
                                                                            <th>{allnote_21.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_22.listnotes && allnote_22.listnotes && allnote_22.listnotes.map((item, grp_22) => (
                                                                        <tr key={grp_22}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_22.groupe}</th>
                                                                            <th>{allnote_22.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                             <tbody>
                                                                       
                                                                    {allnote_23.listnotes && allnote_23.listnotes && allnote_23.listnotes.map((item, grp_23) => (
                                                                        <tr key={grp_23}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_23.groupe}</th>
                                                                            <th>{allnote_23.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_24.listnotes && allnote_24.listnotes && allnote_24.listnotes.map((item, grp_24) => (
                                                                        <tr key={grp_24}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_24.groupe}</th>
                                                                            <th></th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                              {allnote_25.listnotes && allnote_25.listnotes && allnote_25.listnotes.map((item, grp_25) => (
                                                                    <tr key={grp_25}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_25.groupe}</th>
                                                                        <th>{allnote_25.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                                <tbody>
                                                                       
                                                                    {allnote_26.listnotes && allnote_26.listnotes && allnote_26.listnotes.map((item, grp_26) => (
                                                                        <tr key={grp_26}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_26.groupe}</th>
                                                                            <th>{allnote_26.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>   
                                                        
                                                                 <tbody>
                                                                           
                                                                        {allnote_27.listnotes && allnote_27.listnotes && allnote_27.listnotes.map((item, grp_27) => (
                                                                            <tr key={grp_27}>
                                                                                <td>{item.matiere_note}</td>
                                                                                <td>{item.valeur_note}</td>
                                                                                <td>{item.appreciation_note}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                       <thead>
                                                                            <tr>
        
                                                                                <th>{allnote_27.groupe}</th>
                                                                                <th>{allnote_27.sumnote}</th>
                                                                                <th></th>
        
                                                                            </tr>
                                                                        </thead>
                                                         
                                                            <tbody>
                                                                       
                                                                    {allnote_28.listnotes && allnote_28.listnotes && allnote_28.listnotes.map((item, grp_28) => (
                                                                        <tr key={grp_28}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_28.groupe}</th>
                                                                            <th>{allnote_28.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_29.listnotes && allnote_29.listnotes && allnote_29.listnotes.map((item, grp_29) => (
                                                                        <tr key={grp_29}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_29.groupe}</th>
                                                                            <th>{allnote_29.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_30.listnotes && allnote_30.listnotes && allnote_30.listnotes.map((item, grp_30) => (
                                                                        <tr key={grp_30}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_30.groupe}</th>
                                                                            <th>{allnote_30.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>SUMMARY</td>
                                                                        <td></td>
                                                                        <td>{sumnotes}</td>
                                                                        <td></td>
                                                                       
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>WORK APPRECIATION</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">CLASS AVERAGE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                        </div>
                                                                              
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                   Work warning:
                                                                                    <br />
                                                                                   Blame work:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Roll of honor:
                                                                                    <br />
                                                                                    Encouragment:
                                                                                    <br />
                                                                                    congratulations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>GENERAL REMARKS</th>
                                                                        <th>TEACHER</th>
                                                                        <th>DIRECTOR</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div>}

          </div> : <div>
            
             {niveau === 'PRE NURSERY' || niveau === 'NURSERY ONE' || niveau === 'NURSERY TWO' ? <div>

                    {/* Bulletin de la maternelle anglophone général */}



             <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Print
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Teacher's name: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Repeater:</p>
                                                                
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Name : {elevesinclass} </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                  
                                                                    <th>Disciplines</th>
                                                                    <th>Evaluation</th>
                                                                    
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                        {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                            <tr key={grp_1}>
                                                           
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_1.groupe}</th>
                                                                 <th>{allnoteprim_1.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        
                                                        
                                                        <tbody>
                                                           
                                                        {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                            <tr key={grp_2}>
                                                            
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td> 
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_2.groupe}</th>
                                                                <th>{allnoteprim_2.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                           
                                                        {allnoteprim_3.listnotes  && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                            <tr key={grp_3}>
                                                              
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_3.groupe}</th>
                                                                <th>{allnoteprim_3.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                            <tr key={grp_4}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_4.groupe}</th>
                                                                <th>{allnoteprim_4.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_5.listnotes  && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                            <tr key={grp_5}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_5.groupe}</th>
                                                                <th>{allnoteprim_5.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                            {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                <tr key={grp_6}>
                                                                   <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_6.groupe}</th>
                                                                    <th>{allnoteprim_6.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_7.listnotes  && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                            <tr key={grp_7}>
                                                              <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                                <th>{allnoteprim_7.groupe}</th>
                                                                <th>{allnoteprim_7.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                <tr key={grp_8}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_8.groupe}</th>
                                                                    <th>{allnoteprim_8.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                <tr key={grp_9}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_9.groupe}</th>
                                                                    <th>{allnoteprim_9.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                <tr key={grp_10}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                    <th>{allnoteprim_10.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                           
                                                        {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                            <tr key={grp_11}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_11.groupe}</th>
                                                                <th>{allnoteprim_11.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_12.listnotes  && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                <tr key={grp_12}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                    <th>{allnoteprim_12.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_13.listnotes  && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                <tr key={grp_13}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                    <th>{allnoteprim_13.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_14.listnotes  && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                <tr key={grp_14}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_14.groupe}</th>
                                                                    <th>{allnoteprim_14.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                           <tbody>
                                                           
                                                        {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                            <tr key={grp_15}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_15.groupe}</th>
                                                                <th>{allnoteprim_15.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                                <tr key={grp_16}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_16.groupe}</th>
                                                                    <th>{allnoteprim_16.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                                <tr key={grp_17}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_17.groupe}</th>
                                                                    <th>{allnoteprim_17.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_18.listnotes  && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                                <tr key={grp_18}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_18.groupe}</th>
                                                                    <th>{allnoteprim_18.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_19.listnotes  && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                                <tr key={grp_19}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_19.groupe}</th>
                                                                    <th>{allnoteprim_19.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                                <tr key={grp_20}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_20.groupe}</th>
                                                                    <th>{allnoteprim_20.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_21.listnotes  && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                                <tr key={grp_21}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_21.groupe}</th>
                                                                    <th>{allnoteprim_21.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_22.listnotes  && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                                <tr key={grp_22}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_22.groupe}</th>
                                                                    <th>{allnoteprim_22.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_23.listnotes  && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                                <tr key={grp_23}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_23.groupe}</th>
                                                                    <th>{allnoteprim_23.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_24.listnotes  && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                                <tr key={grp_24}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_24.groupe}</th>
                                                                    <th></th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                            <tr key={grp_25}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_25.groupe}</th>
                                                                <th>{allnoteprim_25.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                                <tr key={grp_26}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_26.groupe}</th>
                                                                    <th>{allnoteprim_26.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>   
                                                        
                                                         <tbody>
                                                                   
                                                                {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                    <tr key={grp_27}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                        
                                                                        <th>{allnoteprim_27.groupe}</th>
                                                                        <th>{allnoteprim_27.sumnote}</th>
                                                                        <th></th>
                                                        
                                                                    </tr>
                                                                </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_28.listnotes  && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                                <tr key={grp_28}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_28.groupe}</th>
                                                                    <th>{allnoteprim_28.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                                <tr key={grp_29}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_29.groupe}</th>
                                                                    <th>{allnoteprim_29.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                                <tr key={grp_30}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_30.groupe}</th>
                                                                    <th>{allnoteprim_30.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>


                                                                <tbody>

                                                                    <tr>
                                                                        <td>SUMMARY</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                       
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>WORK APPRECIATION</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">CLASS AVERAGE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                        </div>
                                                                              
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                   Work warning:
                                                                                    <br />
                                                                                   Blame work:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Roll of honor:
                                                                                    <br />
                                                                                    Encouragment:
                                                                                    <br />
                                                                                    congratulations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>GENERAL REMARKS</th>
                                                                        <th>TEACHER</th>
                                                                        <th>DIRECTOR</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div> : <div>
                    
                    {/* Bulletin du primaire anglophone général */}

            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                             <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Teacher's name: {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Repeater:</p>
                                                                
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Name : {elevesinclass} </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                  
                                                                    <th>Disciplines</th>
                                                                    
                                                                    <th>Mark</th>
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                       <tbody>
                                                                   
                                                    {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                        <tr key={grp_1}>
                                                       
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_1.groupe}</th>
                                                             <th>{allnoteprim_1.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    
                                                    
                                                    <tbody>
                                                       
                                                    {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                        <tr key={grp_2}>
                                                        
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td> 
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_2.groupe}</th>
                                                            <th>{allnoteprim_2.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       
                                                    {allnoteprim_3.listnotes  && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                        <tr key={grp_3}>
                                                          
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_3.groupe}</th>
                                                            <th>{allnoteprim_3.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                        <tr key={grp_4}>
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_4.groupe}</th>
                                                            <th>{allnoteprim_4.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_5.listnotes  && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                        <tr key={grp_5}>
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_5.groupe}</th>
                                                            <th>{allnoteprim_5.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                        {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                            <tr key={grp_6}>
                                                               <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                                <th>{allnoteprim_6.groupe}</th>
                                                                <th>{allnoteprim_6.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_7.listnotes  && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                        <tr key={grp_7}>
                                                          <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th>{allnoteprim_7.groupe}</th>
                                                            <th>{allnoteprim_7.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                            <tr key={grp_8}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_8.groupe}</th>
                                                                <th>{allnoteprim_8.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                            <tr key={grp_9}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                                <th>{allnoteprim_9.groupe}</th>
                                                                <th>{allnoteprim_9.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                            <tr key={grp_10}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_10.groupe}</th>
                                                                <th>{allnoteprim_10.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                       
                                                    {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                        <tr key={grp_11}>
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_11.groupe}</th>
                                                            <th>{allnoteprim_11.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_12.listnotes  && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                            <tr key={grp_12}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_12.groupe}</th>
                                                                <th>{allnoteprim_12.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_13.listnotes  && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                            <tr key={grp_13}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_13.groupe}</th>
                                                                <th>{allnoteprim_13.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_14.listnotes  && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                            <tr key={grp_14}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_14.groupe}</th>
                                                                <th>{allnoteprim_14.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                       <tbody>
                                                       
                                                    {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                        <tr key={grp_15}>
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_15.groupe}</th>
                                                            <th>{allnoteprim_15.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                            <tr key={grp_16}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_16.groupe}</th>
                                                                <th>{allnoteprim_16.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                            <tr key={grp_17}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                                <th>{allnoteprim_17.groupe}</th>
                                                                <th>{allnoteprim_17.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_18.listnotes  && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                            <tr key={grp_18}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_18.groupe}</th>
                                                                <th>{allnoteprim_18.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_19.listnotes  && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                            <tr key={grp_19}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_19.groupe}</th>
                                                                <th>{allnoteprim_19.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                            <tr key={grp_20}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_20.groupe}</th>
                                                                <th>{allnoteprim_20.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_21.listnotes  && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                            <tr key={grp_21}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_21.groupe}</th>
                                                                <th>{allnoteprim_21.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_22.listnotes  && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                            <tr key={grp_22}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_22.groupe}</th>
                                                                <th>{allnoteprim_22.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_23.listnotes  && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                            <tr key={grp_23}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_23.groupe}</th>
                                                                <th>{allnoteprim_23.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_24.listnotes  && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                            <tr key={grp_24}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_24.groupe}</th>
                                                                <th></th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                    {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                        <tr key={grp_25}>
                                                            <td>{item.competence_visee_note}</td>
                                                            <td>{item.valeur_note}</td>
                                                            <td>{item.appreciation_note}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                    
                                                            <th>{allnoteprim_25.groupe}</th>
                                                            <th>{allnoteprim_25.sumnote}</th>
                                                            <th></th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                            <tr key={grp_26}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_26.groupe}</th>
                                                                <th>{allnoteprim_26.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>   
                                                    
                                                     <tbody>
                                                               
                                                            {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                <tr key={grp_27}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{item.valeur_note}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                    
                                                                    <th>{allnoteprim_27.groupe}</th>
                                                                    <th>{allnoteprim_27.sumnote}</th>
                                                                    <th></th>
                                                    
                                                                </tr>
                                                            </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_28.listnotes  && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                            <tr key={grp_28}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_28.groupe}</th>
                                                                <th>{allnoteprim_28.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                            <tr key={grp_29}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_29.groupe}</th>
                                                                <th>{allnoteprim_29.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    
                                                    <tbody>
                                                           
                                                        {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                            <tr key={grp_30}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{item.valeur_note}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                       <thead>
                                                            <tr>
                                                    
                                                                <th>{allnoteprim_30.groupe}</th>
                                                                <th>{allnoteprim_30.sumnote}</th>
                                                                <th></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                              <tbody>

                                                                    <tr>
                                                                        <td>SUMMARY</td>
                                                                        <td>{sumnotes}</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                       
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>DISCIPLINE</th>
                                                                        <th>WORK APPRECIATION</th>
                                                                        <th><div className="mt-2">
                                                                            <p tyle={{ fontSize: "10px" }} className="mb-0">AVERAGE: {moyenneleve} </p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">CLASS AVERAGE:</p>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">RANK:</p>
                                                                        </div>
                                                                              
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>

                                                                                   Work warning:
                                                                                    <br />
                                                                                   Blame work:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mt-1">
                                                                                <p>Roll of honor:
                                                                                    <br />
                                                                                    Encouragment:
                                                                                    <br />
                                                                                    congratulations:
                                                                                </p>

                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                        
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                                    <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>GENERAL REMARKS</th>
                                                                        <th>TEACHER</th>
                                                                        <th>DIRECTOR</th>
                                                                        <th>PARENT</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                        <td>/</td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>


                                </Row>



                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div>}

          </div>}

    </div> : <div>
        
        {classes.cycle_niveau === 'Maternelle' ? <div>

                {etab === 24 ? <div>

                    {/* Bulletin de la maternelle francophone des petits intelligents  */}

                    <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Nom de l'enseignant:  {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant: </p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom : {elevesinclass}  </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                    <th><p>Compétences</p></th>
                                                                  
                                                                    <th>Note</th>
                                                                    <th>Appréciation</th>
                                                                    <th>/</th>
                                                                </tr>
                                                            </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_1.listnotes && allnote_1.listnotes && allnote_1.listnotes.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                   
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_1.groupe}</th>
                                                                         <th>{allnote_1.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                         
                                                               
                                                            
                                                        <tbody>
                                                                   
                                                                {allnote_2.listnotes && allnote_2.listnotes && allnote_2.listnotes.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                    
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_2.groupe}</th>
                                                                        <th>{allnote_2.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        <tbody>
                                                                   
                                                                {allnote_3.listnotes && allnote_3.listnotes && allnote_3.listnotes.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                      
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_3.groupe}</th>
                                                                        <th>{allnote_3.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                      
                                                         <tbody>
                                                            {allnote_4.listnotes && allnote_4.listnotes && allnote_4.listnotes.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_4.groupe}</th>
                                                                        <th>{allnote_4.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                        <tbody>
                                                             {allnote_5.listnotes && allnote_5.listnotes && allnote_5.listnotes.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_5.groupe}</th>
                                                                        <th>{allnote_5.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                   
                                                            <tbody>
                                                                    {allnote_6.listnotes && allnote_6.listnotes && allnote_6.listnotes.map((item, grp_6) => (
                                                                        <tr key={grp_6}>
                                                                                
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_6.groupe}</th>
                                                                            <th>{allnote_6.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                        <tbody>
                                                          {allnote_7.listnotes && allnote_7.listnotes && allnote_7.listnotes.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                         <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                                        <th>{allnote_7.groupe}</th>
                                                                        <th>{allnote_7.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_8.listnotes && allnote_8.listnotes && allnote_8.listnotes.map((item, grp_8) => (
                                                                        <tr key={grp_8}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_8.groupe}</th>
                                                                            <th>{allnote_8.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                             <tbody>
                                                                       
                                                                    {allnote_9.listnotes && allnote_9.listnotes && allnote_9.listnotes.map((item, grp_9) => (
                                                                        <tr key={grp_9}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_9.groupe}</th>
                                                                            <th>{allnote_9.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                            <tbody>
                                                                       
                                                                    {allnote_10.listnotes && allnote_10.listnotes && allnote_10.listnotes.map((item, grp_10) => (
                                                                        <tr key={grp_10}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_10.groupe}</th>
                                                                            <th>{allnote_10.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                         <tbody>
                                                                   
                                                                {allnote_11.listnotes && allnote_11.listnotes && allnote_11.listnotes.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_11.groupe}</th>
                                                                        <th>{allnote_11.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                               {allnote_12.listnotes && allnote_12.listnotes && allnote_12.listnotes.map((item, grp_12) => (
                                                                        <tr key={grp_12}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_12.groupe}</th>
                                                                            <th>{allnote_12.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                            <tbody>
                                                               {allnote_13.listnotes && allnote_13.listnotes && allnote_13.listnotes.map((item, grp_13) => (
                                                                        <tr key={grp_13}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_13.groupe}</th>
                                                                            <th>{allnote_13.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_14.listnotes && allnote_14.listnotes && allnote_14.listnotes.map((item, grp_14) => (
                                                                        <tr key={grp_14}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_14.groupe}</th>
                                                                            <th>{allnote_14.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                      
                                                                   <tbody>
                                                                   
                                                                {allnote_15.listnotes && allnote_15.listnotes && allnote_15.listnotes.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_15.groupe}</th>
                                                                        <th>{allnote_15.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_16.listnotes && allnote_16.listnotes && allnote_16.listnotes.map((item, grp_16) => (
                                                                        <tr key={grp_16}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_16.groupe}</th>
                                                                            <th>{allnote_16.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_17.listnotes && allnote_17.listnotes && allnote_17.listnotes.map((item, grp_17) => (
                                                                        <tr key={grp_17}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
                                                                            <th>{allnote_17.groupe}</th>
                                                                            <th>{allnote_17.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_18.listnotes && allnote_18.listnotes && allnote_18.listnotes.map((item, grp_18) => (
                                                                        <tr key={grp_18}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_18.groupe}</th>
                                                                            <th>{allnote_18.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_19.listnotes && allnote_19.listnotes && allnote_19.listnotes.map((item, grp_19) => (
                                                                        <tr key={grp_19}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_19.groupe}</th>
                                                                            <th>{allnote_19.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_20.listnotes && allnote_20.listnotes && allnote_20.listnotes.map((item, grp_20) => (
                                                                        <tr key={grp_20}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_20.groupe}</th>
                                                                            <th>{allnote_20.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_21.listnotes && allnote_21.listnotes && allnote_21.listnotes.map((item, grp_21) => (
                                                                        <tr key={grp_21}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_21.groupe}</th>
                                                                            <th>{allnote_21.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                        
                                                            <tbody>
                                                                       
                                                                    {allnote_22.listnotes && allnote_22.listnotes && allnote_22.listnotes.map((item, grp_22) => (
                                                                        <tr key={grp_22}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_22.groupe}</th>
                                                                            <th>{allnote_22.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                    
                                                             <tbody>
                                                                       
                                                                    {allnote_23.listnotes && allnote_23.listnotes && allnote_23.listnotes.map((item, grp_23) => (
                                                                        <tr key={grp_23}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_23.groupe}</th>
                                                                            <th>{allnote_23.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                            <tbody>
                                                                       
                                                                    {allnote_24.listnotes && allnote_24.listnotes && allnote_24.listnotes.map((item, grp_24) => (
                                                                        <tr key={grp_24}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_24.groupe}</th>
                                                                            <th></th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                              {allnote_25.listnotes && allnote_25.listnotes && allnote_25.listnotes.map((item, grp_25) => (
                                                                    <tr key={grp_25}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allnote_25.groupe}</th>
                                                                        <th>{allnote_25.sumnote}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                        
                                                                <tbody>
                                                                       
                                                                    {allnote_26.listnotes && allnote_26.listnotes && allnote_26.listnotes.map((item, grp_26) => (
                                                                        <tr key={grp_26}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_26.groupe}</th>
                                                                            <th>{allnote_26.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>   
                                                        
                                                                 <tbody>
                                                                           
                                                                        {allnote_27.listnotes && allnote_27.listnotes && allnote_27.listnotes.map((item, grp_27) => (
                                                                            <tr key={grp_27}>
                                                                                <td>{item.matiere_note}</td>
                                                                                <td>{item.valeur_note}</td>
                                                                                <td>{item.appreciation_note}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                       <thead>
                                                                            <tr>
        
                                                                                <th>{allnote_27.groupe}</th>
                                                                                <th>{allnote_27.sumnote}</th>
                                                                                <th></th>
        
                                                                            </tr>
                                                                        </thead>
                                                         
                                                            <tbody>
                                                                       
                                                                    {allnote_28.listnotes && allnote_28.listnotes && allnote_28.listnotes.map((item, grp_28) => (
                                                                        <tr key={grp_28}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_28.groupe}</th>
                                                                            <th>{allnote_28.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                       
                                                            <tbody>
                                                                       
                                                                    {allnote_29.listnotes && allnote_29.listnotes && allnote_29.listnotes.map((item, grp_29) => (
                                                                        <tr key={grp_29}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_29.groupe}</th>
                                                                            <th>{allnote_29.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                     
                                                             <tbody>
                                                                       
                                                                    {allnote_30.listnotes && allnote_30.listnotes && allnote_30.listnotes.map((item, grp_30) => (
                                                                        <tr key={grp_30}>
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                                   <thead>
                                                                        <tr>
    
                                                                            <th>{allnote_30.groupe}</th>
                                                                            <th>{allnote_30.sumnote}</th>
                                                                            <th></th>
    
                                                                        </tr>
                                                                    </thead>
                                                                
                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>     
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>ENSEIGNANT(E)</th>
                                                                        <th>DIRECTRICE(TEUR)</th>
                                                                        <th>PARENT</th>
                                                                        <th>REMARQUES GENERALES</th>
                                                                       
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                    
                                                                        <td>    
                                                                        </td>
                                                                    
                                                                        <td>
                                                                        </td>
                                                                    
                                                                        <td>  
                                                                        </td>
                                                                    
                                                                        <td>  
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>


                                                        </div>


                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>


                                </Row>



                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div> : <div>
                    
                    {/* Bulletin de la maternelle francophone général */}

                    <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title"></h4>
                            </div>


                            <Button variant="primary mt-2" onClick={printData}>
                                <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6pm-6 0p" />
                                    </svg>
                                </span>
                                Imprimer
                            </Button>

                            {/* <!-- Modal --> */}

                        </Card.Header>
                        <Card.Body>

                            <div ref={componentRef}
                                style={{ width: "100%", fontSize: "10px", height: window.innerHeight }}>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">

                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>

                                                    <Row>

                                                        <Col sm="12" lg="12">
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Evaluation: {evaluation} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Nom de l'enseignant:  {enseign} </p>

                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0">Redoublant: </p>
                                                                <p>Repeater</p>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p tyle={{ fontSize: "10px" }} className="mb-0"><strong>Nom : {elevesinclass} </strong> </p>

                                                            </div>



                                                        </Col>


                                                    </Row>
                                                    <Row>
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
                                                                    <th><p>Compétences</p></th>
                                                                  
                                                                    <th>Note</th>
                                                                    <th>Appreciation</th>
                                                                    <th>/</th>
                                                                </tr>
                                                            </thead>
                                                    <tbody>
                                                                                                                           
                                                        {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                            <tr key={grp_1}>
                                                           
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_1.groupe}</th>
                                                                 <th>{allnoteprim_1.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        
                                                        
                                                        <tbody>
                                                           
                                                        {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                            <tr key={grp_2}>
                                                            
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td> 
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_2.groupe}</th>
                                                                <th>{allnoteprim_2.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                           
                                                        {allnoteprim_3.listnotes  && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                            <tr key={grp_3}>
                                                              
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_3.groupe}</th>
                                                                <th>{allnoteprim_3.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                            <tr key={grp_4}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_4.groupe}</th>
                                                                <th>{allnoteprim_4.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_5.listnotes  && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                            <tr key={grp_5}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_5.groupe}</th>
                                                                <th>{allnoteprim_5.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                            {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                <tr key={grp_6}>
                                                                   <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_6.groupe}</th>
                                                                    <th>{allnoteprim_6.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_7.listnotes  && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                            <tr key={grp_7}>
                                                              <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                                <th>{allnoteprim_7.groupe}</th>
                                                                <th>{allnoteprim_7.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                <tr key={grp_8}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_8.groupe}</th>
                                                                    <th>{allnoteprim_8.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                <tr key={grp_9}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_9.groupe}</th>
                                                                    <th>{allnoteprim_9.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                <tr key={grp_10}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                    <th>{allnoteprim_10.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                           
                                                        {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                            <tr key={grp_11}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_11.groupe}</th>
                                                                <th>{allnoteprim_11.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_12.listnotes  && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                <tr key={grp_12}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                    <th>{allnoteprim_12.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_13.listnotes  && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                <tr key={grp_13}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                    <th>{allnoteprim_13.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_14.listnotes  && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                <tr key={grp_14}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_14.groupe}</th>
                                                                    <th>{allnoteprim_14.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                           <tbody>
                                                           
                                                        {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                            <tr key={grp_15}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_15.groupe}</th>
                                                                <th>{allnoteprim_15.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                                <tr key={grp_16}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_16.groupe}</th>
                                                                    <th>{allnoteprim_16.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                                <tr key={grp_17}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                                    <th>{allnoteprim_17.groupe}</th>
                                                                    <th>{allnoteprim_17.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_18.listnotes  && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                                <tr key={grp_18}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_18.groupe}</th>
                                                                    <th>{allnoteprim_18.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_19.listnotes  && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                                <tr key={grp_19}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_19.groupe}</th>
                                                                    <th>{allnoteprim_19.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                                <tr key={grp_20}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_20.groupe}</th>
                                                                    <th>{allnoteprim_20.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_21.listnotes  && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                                <tr key={grp_21}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_21.groupe}</th>
                                                                    <th>{allnoteprim_21.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_22.listnotes  && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                                <tr key={grp_22}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_22.groupe}</th>
                                                                    <th>{allnoteprim_22.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_23.listnotes  && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                                <tr key={grp_23}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_23.groupe}</th>
                                                                    <th>{allnoteprim_23.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_24.listnotes  && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                                <tr key={grp_24}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_24.groupe}</th>
                                                                    <th></th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                        {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                            <tr key={grp_25}>
                                                                <td>{item.competence_visee_note}</td>
                                                                <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                <td>{item.appreciation_note}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                        
                                                                <th>{allnoteprim_25.groupe}</th>
                                                                <th>{allnoteprim_25.sumnote}</th>
                                                                <th></th>
                                                        
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                                <tr key={grp_26}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_26.groupe}</th>
                                                                    <th>{allnoteprim_26.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>   
                                                        
                                                         <tbody>
                                                                   
                                                                {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                    <tr key={grp_27}>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>
                                                        
                                                                        <th>{allnoteprim_27.groupe}</th>
                                                                        <th>{allnoteprim_27.sumnote}</th>
                                                                        <th></th>
                                                        
                                                                    </tr>
                                                                </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_28.listnotes  && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                                <tr key={grp_28}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_28.groupe}</th>
                                                                    <th>{allnoteprim_28.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                                <tr key={grp_29}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_29.groupe}</th>
                                                                    <th>{allnoteprim_29.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        
                                                        <tbody>
                                                               
                                                            {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                                <tr key={grp_30}>
                                                                    <td>{item.competence_visee_note}</td>
                                                                    <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                    <td>{item.appreciation_note}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                           <thead>
                                                                <tr>
                                                        
                                                                    <th>{allnoteprim_30.groupe}</th>
                                                                    <th>{allnoteprim_30.sumnote}</th>
                                                                    <th></th>
                                                        
                                                                </tr>
                                                            </thead>
                                                        

                                                                <tbody>

                                                                    <tr>
                                                                        <td>RECAPITULATIFS</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>     
                                                                    </tr>
                                                                </tbody>


                                                                <tfoot>

                                                                </tfoot>
                                                            </Table>
                                                            <Table
                                                                responsive
                                                                striped
                                                                id="datatable"
                                                                className=""
                                                                data-toggle="data-table"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>ENSEIGNANT(E)</th>
                                                                        <th>DIRECTRICE(TEUR)</th>
                                                                        <th>PARENT</th>
                                                                        <th>REMARQUES GENERALES</th>
                                                                       
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <td>
                                                                            <Col sm="2">
                                                                                <div>
                                                                                    <QRCode value={user.nom} size={50} />
                                                                                </div>
                                                                            </Col>

                                                                        </td>
                                                                    
                                                                        <td>    
                                                                        </td>
                                                                    
                                                                        <td>
                                                                        </td>
                                                                    
                                                                        <td>  
                                                                        </td>
                                                                    
                                                                        <td>  
                                                                        </td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>


                                                        </div>
                                                                    
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

                </div>}


            </div> : <div>
                
                   Relevé de notes d'école superieur ! A venir
                
            </div>}
 
    </div>}

    </div>}
    
</div>}
       
        </Fragment>
    );
})

export default BulletinByEleve
