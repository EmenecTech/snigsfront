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




const BulletinPrimaire = memo((props) => {

    const componentRef = useRef();
    const printData = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Bulletin",
        onafterprint: () => alert("print success"),
    });

    const [show, setShow] = useState(false);
    const { user, http } = AuthUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { evaluation, niveau, classe, userid } = useParams();
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

     const [info_eleve, setinfo_eleve] = useState([]);

    useEffect(() => {
        fetchAllinfo_eleve()
    }, []);

    const fetchAllinfo_eleve = () => {
        http.get('/info_eleve/' + userid).then((res) => {
            setinfo_eleve(res.data);
        });
    }

    const [rang_eleve, setrang_eleve] = useState([]);

    useEffect(() => {
        fetchrang_eleve()
    }, []);

    const fetchrang_eleve = () => {
        http.get('/get_moyenrang/' + etab + '/' + classe + '/' + evaluation + '/' + userid).then((res) => {
            setrang_eleve(res.data);
        });
    }
     const [total_eleves, settotal_eleves] = useState([]);
    useEffect(() => {
        fetchAlltotal_eleves();
    }, []);
    const fetchAlltotal_eleves = () => {
        http.get("/nbreleves_classe/" + etab + '/' + classe).then((res) => {
            settotal_eleves(res.data);
        });
    };

    console.log(rang_eleve)

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

   

    const [allnoteprim_1, setAllNoteprim_1] = useState({});
    useEffect(() => {
        fetchAllNoteprim_1();
    }, []);

    const fetchAllNoteprim_1 = () => {
        http.get('/all/prim/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_1(res.data);
        })
    };


     ////////////////////////////////////////////
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


   
    const [allnoteprim_9, setAllNoteprim_9] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_9();
    }, []);

    const fetchAllNoteprim_9 = () => {
        http.get('/all/prim/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_9(res.data);
        })
    };

    //////////////////////////////////////////////

 
    const [allnoteprim_10, setAllNoteprim_10] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_10();
    }, []);

    const fetchAllNoteprim_10 = () => {
        http.get('/all/prim/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_10(res.data);
        })
    };

    //////////////////////////////////////////////


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
   
    const [allnoteprim_31, setAllNoteprim_31] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_31();
    }, []);

    const fetchAllNoteprim_31 = () => {
        http.get('/all/prim/notes_31/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_31(res.data);
        })
    };

    ////////////////////////////////////////////
 
    const [allnoteprim_32, setAllNoteprim_32] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_32();
    }, []);

    const fetchAllNoteprim_32 = () => {
        http.get('/all/prim/notes_32/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_32(res.data);
        })
    };

    ////////////////////////////////////////////

    const [allnoteprim_33, setAllNoteprim_33] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_33();
    }, []);

    const fetchAllNoteprim_33 = () => {
        http.get('/all/prim/notes_33/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_33(res.data);
        })
    };

    ////////////////////////////////////////////

    const [allnoteprim_34, setAllNoteprim_34] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_34();
    }, []);

    const fetchAllNoteprim_34 = () => {
        http.get('/all/prim/notes_34/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_34(res.data);
        })
    };

    ////////////////////////////////////////////
    
    const [allnoteprim_35, setAllNoteprim_35] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_35();
    }, []);

    const fetchAllNoteprim_35 = () => {
        http.get('/all/prim/notes_35/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_35(res.data);
        })
    };

    ////////////////////////////////////////////

    const [allnoteprim_36, setAllNoteprim_36] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_36();
    }, []);

    const fetchAllNoteprim_36 = () => {
        http.get('/all/prim/notes_36/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_36(res.data);
        })
    };

    ////////////////////////////////////////////
    const [allnoteprim_37, setAllNoteprim_37] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_37();
    }, []);

    const fetchAllNoteprim_37 = () => {
        http.get('/all/prim/notes_37/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_37(res.data);
        })
    };

    ////////////////////////////////////////////
    const [allnoteprim_38, setAllNoteprim_38] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_38();
    }, []);

    const fetchAllNoteprim_38 = () => {
        http.get('/all/prim/notes_38/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_38(res.data);
        })
    };

    ////////////////////////////////////////////
    const [allnoteprim_39, setAllNoteprim_39] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_39();
    }, []);

    const fetchAllNoteprim_39 = () => {
        http.get('/all/prim/notes_39/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_39(res.data);
        })
    };

    ////////////////////////////////////////////
    const [allnoteprim_40, setAllNoteprim_40] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_40();
    }, []);

    const fetchAllNoteprim_40 = () => {
        http.get('/all/prim/notes_40/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_40(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_41, setAllNoteprim_41] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_41();
    }, []);

    const fetchAllNoteprim_41 = () => {
        http.get('/all/prim/notes_41/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_41(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_42, setAllNoteprim_42] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_42();
    }, []);

    const fetchAllNoteprim_42 = () => {
        http.get('/all/prim/notes_42/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_42(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_43, setAllNoteprim_43] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_43();
    }, []);

    const fetchAllNoteprim_43 = () => {
        http.get('/all/prim/notes_43/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_43(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_44, setAllNoteprim_44] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_44();
    }, []);

    const fetchAllNoteprim_44 = () => {
        http.get('/all/prim/notes_44/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_44(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_45, setAllNoteprim_45] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_45();
    }, []);

    const fetchAllNoteprim_45 = () => {
        http.get('/all/prim/notes_45/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_45(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_46, setAllNoteprim_46] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_46();
    }, []);

    const fetchAllNoteprim_46 = () => {
        http.get('/all/prim/notes_46/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_46(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_47, setAllNoteprim_47] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_47();
    }, []);

    const fetchAllNoteprim_47 = () => {
        http.get('/all/prim/notes_47/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_47(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_48, setAllNoteprim_48] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_48();
    }, []);

    const fetchAllNoteprim_48 = () => {
        http.get('/all/prim/notes_48/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_48(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_49, setAllNoteprim_49] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_49();
    }, []);

    const fetchAllNoteprim_49 = () => {
        http.get('/all/prim/notes_49/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_49(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_50, setAllNoteprim_50] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_50();
    }, []);

    const fetchAllNoteprim_50 = () => {
        http.get('/all/prim/notes_50/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_50(res.data);
        })
    };

    ////////////////////////////////////////////
     const [allnoteprim_51, setAllNoteprim_51] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_51();
    }, []);

    const fetchAllNoteprim_51 = () => {
        http.get('/all/prim/notes_51/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_51(res.data);
        })
    };
     //////////////////////////////////////////// ici
     const [allnoteprim_52, setAllNoteprim_52] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_52();
    }, []);

    const fetchAllNoteprim_52 = () => {
        http.get('/all/prim/notes_52/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_52(res.data);
        })
    };
     ////////////////////////////////////////////
     const [allnoteprim_53, setAllNoteprim_53] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_53();
    }, []);

    const fetchAllNoteprim_53 = () => {
        http.get('/all/prim/notes_53/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_53(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_54, setAllNoteprim_54] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_54();
    }, []);

    const fetchAllNoteprim_54 = () => {
        http.get('/all/prim/notes_54/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_54(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_55, setAllNoteprim_55] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_55();
    }, []);

    const fetchAllNoteprim_55 = () => {
        http.get('/all/prim/notes_55/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_55(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_56, setAllNoteprim_56] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_56();
    }, []);

    const fetchAllNoteprim_56 = () => {
        http.get('/all/prim/notes_56/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_56(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_57, setAllNoteprim_57] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_57();
    }, []);

    const fetchAllNoteprim_57 = () => {
        http.get('/all/prim/notes_57/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_57(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_58, setAllNoteprim_58] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_58();
    }, []);

    const fetchAllNoteprim_58 = () => {
        http.get('/all/prim/notes_58/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_58(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_59, setAllNoteprim_59] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_59();
    }, []);

    const fetchAllNoteprim_59 = () => {
        http.get('/all/prim/notes_59/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_59(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_60, setAllNoteprim_60] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_60();
    }, []);

    const fetchAllNoteprim_60 = () => {
        http.get('/all/prim/notes_60/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_60(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_61, setAllNoteprim_61] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_61();
    }, []);

    const fetchAllNoteprim_61 = () => {
        http.get('/all/prim/notes_61/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_61(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_62, setAllNoteprim_62] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_62();
    }, []);

    const fetchAllNoteprim_62 = () => {
        http.get('/all/prim/notes_62/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_62(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_63, setAllNoteprim_63] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_63();
    }, []);

    const fetchAllNoteprim_63 = () => {
        http.get('/all/prim/notes_63/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_63(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_64, setAllNoteprim_64] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_64();
    }, []);

    const fetchAllNoteprim_64 = () => {
        http.get('/all/prim/notes_64/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_64(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_65, setAllNoteprim_65] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_65();
    }, []);

    const fetchAllNoteprim_65 = () => {
        http.get('/all/prim/notes_65/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_65(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_66, setAllNoteprim_66] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_66();
    }, []);

    const fetchAllNoteprim_66 = () => {
        http.get('/all/prim/notes_66/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_66(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_67, setAllNoteprim_67] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_67();
    }, []);

    const fetchAllNoteprim_67 = () => {
        http.get('/all/prim/notes_67/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_67(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_68, setAllNoteprim_68] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_68();
    }, []);

    const fetchAllNoteprim_68 = () => {
        http.get('/all/prim/notes_68/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_68(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_69, setAllNoteprim_69] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_69();
    }, []);

    const fetchAllNoteprim_69 = () => {
        http.get('/all/prim/notes_69/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_69(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_70, setAllNoteprim_70] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_70();
    }, []);

    const fetchAllNoteprim_70 = () => {
        http.get('/all/prim/notes_70/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_70(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_71, setAllNoteprim_71] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_71();
    }, []);

    const fetchAllNoteprim_71 = () => {
        http.get('/all/prim/notes_71/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_71(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_72, setAllNoteprim_72] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_72();
    }, []);

    const fetchAllNoteprim_72 = () => {
        http.get('/all/prim/notes_72/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_72(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_73, setAllNoteprim_73] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_73();
    }, []);

    const fetchAllNoteprim_73 = () => {
        http.get('/all/prim/notes_73/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_73(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_74, setAllNoteprim_74] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_74();
    }, []);

    const fetchAllNoteprim_74 = () => {
        http.get('/all/prim/notes_74/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_74(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_75, setAllNoteprim_75] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_75();
    }, []);

    const fetchAllNoteprim_75 = () => {
        http.get('/all/prim/notes_75/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_75(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_76, setAllNoteprim_76] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_76();
    }, []);

    const fetchAllNoteprim_76 = () => {
        http.get('/all/prim/notes_76/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_76(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_77, setAllNoteprim_77] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_77();
    }, []);

    const fetchAllNoteprim_77 = () => {
        http.get('/all/prim/notes_77/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_77(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_78, setAllNoteprim_78] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_78();
    }, []);

    const fetchAllNoteprim_78 = () => {
        http.get('/all/prim/notes_78/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_78(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_79, setAllNoteprim_79] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_79();
    }, []);

    const fetchAllNoteprim_79 = () => {
        http.get('/all/prim/notes_79/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_79(res.data);
        })
    };
 ////////////////////////////////////////////
     const [allnoteprim_80, setAllNoteprim_80] = useState([]);
    useEffect(() => {
        fetchAllNoteprim_80();
    }, []);

    const fetchAllNoteprim_80 = () => {
        http.get('/all/prim/notes_80/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNoteprim_80(res.data);
        })
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
    const [allnotes, setAllNotes] = useState([]);
    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = () => {
        http.get('/all_notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setAllNotes(res.data);
        })
    };

 



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

    return(
        <Fragment>
              {classes.cycle_niveau === 'Primaire'? <div>

                 {/* Bulletin standard du primaire francophone  */}
               
              <Row>
                            <Col sm="12">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title"></h4>
                                        </div>


                                        <Button variant="primary mt-2" onClick={printData}>
                                            <span className="btn-inner">
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
                                                                            MINISTERE DE L'EDUCATION DE BASE<br />
                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
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
                                            



                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                            Peace - Work - Fatherland <br />
                                                                            MINISTRY OF BASIC EDUCATION<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
                                                                        </p>


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mt-1">
                                                                    <Col sm="4" lg="4">


                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">
                                                                            <span style={{ fontSize: "10px" }}> Bulletin De Notes {evaluation}</span>
                                                                            <br />
                                                                            2022 - 2023
                                                                        </p>


                                                                    </Col>
                                                                    <Col sm="4" lg="4">


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mb-1">

                                                                    <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                              Nom et Prénom : {elevesinclass.name}<br />
                                                                              Date et Lieu de naissance : {elevesinclass.datenaiss} à {elevesinclass.lieunaiss} <br />
                                                                              Sexe :  {elevesinclass.sexe}<br />
                                                                             
                                                                        </div>
                                                                    </Col>
                                                                     <Col sm="4" lg="4">
                                                                         <div className="mt-1">
                                                                            <p>Nom de l'enseignant: {enseign} <br />
                                                                            Classe : {classe} 
                                                                            </p>
                                                                        </div>
                                                                    </Col>

                                                                     <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Matricule :  {elevesinclass.matricule}<br />
                                                                            Redoublant : <br />
                                                                            </p>
                                                                        </div>

                                                                    </Col>
                                                                </Row>
                                                                <Row>

                                                                    <Table
                                                                        responsive
                                                                       
                                                                         id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th >Disciplines</th>
                                                                                <th >Notes</th>
                                                                                <th >Appréciation</th>
                                                                            </tr>
                                                                        </thead>
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                                                    <tr key={grp_1}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_1.groupe}</th>
                                                                                    <th>{allnoteprim_1.sumnote}/{allnoteprim_1.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                                                    <tr key={grp_2}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_2.groupe} </th>
                                                                                    <th>{allnoteprim_2.sumnote}/{allnoteprim_2.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_3.listnotes && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                                                    <tr key={grp_3}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_3.groupe} </th>
                                                                                    <th>{allnoteprim_3.sumnote}/{allnoteprim_3.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_4.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                                                    <tr key={grp_4}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_4.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_4.groupe}  </th>
                                                                                    <th>{allnoteprim_4.sumnote}/{allnoteprim_4.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_5.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_5.listnotes && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                                                    <tr key={grp_5}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_5.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_5.groupe}  </th>
                                                                                    <th>{allnoteprim_5.sumnote}/{allnoteprim_5.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>
                                                                        )}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                                    <tr key={grp_6}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_6.groupe} </th>
                                                                                    <th>{allnoteprim_6.sumnote}/{allnoteprim_6.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_7.listnotes && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                                                    <tr key={grp_7}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_7.groupe} </th>
                                                                                    <th>{allnoteprim_7.sumnote}/{allnoteprim_7.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                                    <tr key={grp_8}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_8.groupe} </th>
                                                                                    <th>{allnoteprim_8.sumnote}/{allnoteprim_8.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                                    <tr key={grp_9}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_9.groupe} </th>
                                                                                    <th>{allnoteprim_9.sumnote}/{allnoteprim_9.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                                    <tr key={grp_10}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                                    <th>{allnoteprim_10.sumnote} /{allnoteprim_10.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                                                    <tr key={grp_11}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_11.groupe} </th>
                                                                                    <th>{allnoteprim_11.sumnote} /{allnoteprim_11.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_12.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_12.listnotes && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                                    <tr key={grp_12}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_12.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                                    <th>{allnoteprim_12.sumnote} /{allnoteprim_12.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_13.listnotes && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                                    <tr key={grp_13}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                                    <th>{allnoteprim_13.sumnote} /{allnoteprim_13.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <tbody>

                                                                                {allnoteprim_14.listnotes && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                                    <tr key={grp_14}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_14.groupe}  </th>
                                                                                    <th>{allnoteprim_14.sumnote}/{allnoteprim_14.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                                                    <tr key={grp_15}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_15.groupe} </th>
                                                                                    <th>{allnoteprim_15.sumnote} /{allnoteprim_15.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_16.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                                                    <tr key={grp_16}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_16.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_16.groupe}</th>
                                                                                    <th>{allnoteprim_16.sumnote} /{allnoteprim_16.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_17.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                                                    <tr key={grp_17}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_17.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_17.groupe} </th>
                                                                                    <th>{allnoteprim_17.sumnote}/{allnoteprim_17.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_18.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_18.listnotes && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                                                    <tr key={grp_18}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_18.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_18.groupe} </th>
                                                                                    <th>{allnoteprim_18.sumnote}/{allnoteprim_18.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_19.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_19.listnotes && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                                                    <tr key={grp_19}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_19.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_19.groupe} </th>
                                                                                    <th>{allnoteprim_19.sumnote}/{allnoteprim_19.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_20.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                                                    <tr key={grp_20}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_20.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_20.groupe} </th>
                                                                                    <th>{allnoteprim_20.sumnote}/{allnoteprim_20.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_21.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_21.listnotes && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                                                    <tr key={grp_21}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_21.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_21.groupe} </th>
                                                                                    <th>{allnoteprim_21.sumnote} /{allnoteprim_21.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_22.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_22.listnotes && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                                                    <tr key={grp_22}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_22.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_22.groupe} </th>
                                                                                    <th>{allnoteprim_22.sumnote} /{allnoteprim_22.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_23.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_23.listnotes && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                                                    <tr key={grp_23}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_23.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_23.groupe} </th>
                                                                                    <th>{allnoteprim_23.sumnote} /{allnoteprim_23.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_24.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_24.listnotes && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                                                    <tr key={grp_24}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_24.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_24.groupe}  </th>
                                                                                    <th>{allnoteprim_24.sumnote}/{allnoteprim_24.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_25.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                                                    <tr key={grp_25}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_25.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_25.groupe}  </th>
                                                                                    <th>{allnoteprim_25.sumnote}/{allnoteprim_25.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_26.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                                                    <tr key={grp_26}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_26.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_26.groupe}  </th>
                                                                                    <th>{allnoteprim_26.sumnote}/{allnoteprim_26.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_27.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                                    <tr key={grp_27}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_27.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_27.groupe}  </th>
                                                                                    <th>{allnoteprim_27.sumnote}/{allnoteprim_27.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_28.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_28.listnotes && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                                                    <tr key={grp_28}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_28.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_28.groupe} </th>
                                                                                    <th>{allnoteprim_28.sumnote}/{allnoteprim_28.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_29.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                                                    <tr key={grp_29}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_29.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_29.groupe} </th>
                                                                                    <th>{allnoteprim_29.sumnote}/{allnoteprim_29.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_30.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                                                    <tr key={grp_30}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_30.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_30.groupe}</th>
                                                                                    <th>{allnoteprim_30.sumnote} /{allnoteprim_30.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_31.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_31.listnotes && allnoteprim_31.listnotes.map((item, grp_31) => (
                                                                                    <tr key={grp_31}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_31.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_31.groupe} </th>
                                                                                    <th>{allnoteprim_31.sumnote}/{allnoteprim_31.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_32.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_32.listnotes && allnoteprim_32.listnotes.map((item, grp_32) => (
                                                                                    <tr key={grp_32}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_32.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_32.groupe} </th>
                                                                                    <th>{allnoteprim_32.sumnote} /{allnoteprim_32.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_33.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_33.listnotes && allnoteprim_33.listnotes.map((item, grp_33) => (
                                                                                    <tr key={grp_33}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_33.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_33.groupe} </th>
                                                                                    <th>{allnoteprim_33.sumnote} /{allnoteprim_33.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_34.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_34.listnotes && allnoteprim_34.listnotes.map((item, grp_34) => (
                                                                                    <tr key={grp_34}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_34.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_34.groupe} </th>
                                                                                    <th>{allnoteprim_34.sumnote}/{allnoteprim_34.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                         {allnoteprim_35.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_35.listnotes && allnoteprim_35.listnotes.map((item, grp_35) => (
                                                                                    <tr key={grp_35}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_35.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_35.groupe}</th>
                                                                                    <th>{allnoteprim_35.sumnote} /{allnoteprim_35.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_36.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_36.listnotes && allnoteprim_36.listnotes.map((item, grp_36) => (
                                                                                    <tr key={grp_36}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_36.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_36.groupe}  </th>
                                                                                    <th>{allnoteprim_36.sumnote}/{allnoteprim_36.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_37.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_37.listnotes && allnoteprim_37.listnotes.map((item, grp_37) => (
                                                                                    <tr key={grp_37}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_37.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_37.groupe} </th>
                                                                                    <th>{allnoteprim_37.sumnote}/{allnoteprim_37.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_38.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_38.listnotes && allnoteprim_38.listnotes.map((item, grp_38) => (
                                                                                    <tr key={grp_38}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_38.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_38.groupe}  </th>
                                                                                    <th>{allnoteprim_38.sumnote}/{allnoteprim_38.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                             {allnoteprim_39.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_39.listnotes && allnoteprim_39.listnotes.map((item, grp_39) => (
                                                                                    <tr key={grp_39}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_39.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_39.groupe}</th>
                                                                                    <th>{allnoteprim_39.sumnote} /{allnoteprim_39.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_40.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_40.listnotes && allnoteprim_40.listnotes.map((item, grp_40) => (
                                                                                    <tr key={grp_40}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_40.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_40.groupe} </th>
                                                                                    <th>{allnoteprim_40.sumnote} /{allnoteprim_40.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_41.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_41.listnotes && allnoteprim_41.listnotes.map((item, grp_41) => (
                                                                                    <tr key={grp_41}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_41.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_41.groupe} </th>
                                                                                    <th>{allnoteprim_41.sumnote}/{allnoteprim_41.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_42.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_42.listnotes && allnoteprim_42.listnotes.map((item, grp_42) => (
                                                                                    <tr key={grp_42}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_42.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_42.groupe} </th>
                                                                                    <th>{allnoteprim_42.sumnote} /{allnoteprim_42.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_43.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_43.listnotes && allnoteprim_43.listnotes.map((item, grp_43) => (
                                                                                    <tr key={grp_43}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_43.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_43.groupe}  </th>
                                                                                    <th>{allnoteprim_43.sumnote}/{allnoteprim_43.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_44.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_44.listnotes && allnoteprim_44.listnotes.map((item, grp_44) => (
                                                                                    <tr key={grp_44}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_44.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_44.groupe}</th>
                                                                                    <th>{allnoteprim_44.sumnote} /{allnoteprim_44.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_45.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_45.listnotes && allnoteprim_45.listnotes.map((item, grp_45) => (
                                                                                    <tr key={grp_45}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_45.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_45.groupe} </th>
                                                                                    <th>{allnoteprim_45.sumnote}/{allnoteprim_45.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_46.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_46.listnotes && allnoteprim_46.listnotes.map((item, grp_46) => (
                                                                                    <tr key={grp_46}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_46.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_46.groupe}  </th>
                                                                                    <th>{allnoteprim_46.sumnote}/{allnoteprim_46.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_47.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_47.listnotes && allnoteprim_47.listnotes.map((item, grp_47) => (
                                                                                    <tr key={grp_47}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_47.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_47.groupe}</th>
                                                                                    <th>{allnoteprim_47.sumnote} /{allnoteprim_47.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_48.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_48.listnotes && allnoteprim_48.listnotes.map((item, grp_48) => (
                                                                                    <tr key={grp_48}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_48.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_48.groupe}  </th>
                                                                                    <th>{allnoteprim_48.sumnote}/{allnoteprim_48.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_49.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_49.listnotes && allnoteprim_49.listnotes.map((item, grp_49) => (
                                                                                    <tr key={grp_49}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_49.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_49.groupe} </th>
                                                                                    <th>{allnoteprim_49.sumnote} /{allnoteprim_49.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_50.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_50.listnotes && allnoteprim_50.listnotes.map((item, grp_50) => (
                                                                                    <tr key={grp_50}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_50.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_50.groupe}  </th>
                                                                                    <th>{allnoteprim_50.sumnote}/{allnoteprim_50.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_51.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_51.listnotes && allnoteprim_51.listnotes.map((item, grp_51) => (
                                                                                    <tr key={grp_51}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_51.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_51.groupe} </th>
                                                                                    <th>{allnoteprim_51.sumnote}/{allnoteprim_51.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}   

                                                                            {allnoteprim_52.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_52.listnotes && allnoteprim_52.listnotes.map((item, grp_52) => (
                                                                                    <tr key={grp_52}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_52.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_52.groupe}  </th>
                                                                                    <th>{allnoteprim_52.sumnote}/{allnoteprim_52.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_53.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_53.listnotes && allnoteprim_53.listnotes.map((item, grp_53) => (
                                                                                    <tr key={grp_53}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_53.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_53.groupe}  </th>
                                                                                    <th>{allnoteprim_53.sumnote}/{allnoteprim_53.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_54.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_54.listnotes && allnoteprim_54.listnotes.map((item, grp_54) => (
                                                                                    <tr key={grp_54}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_54.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_54.groupe} </th>
                                                                                    <th>{allnoteprim_54.sumnote} /{allnoteprim_54.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_55.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_55.listnotes && allnoteprim_55.listnotes.map((item, grp_55) => (
                                                                                    <tr key={grp_55}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_55.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_55.groupe}  </th>
                                                                                    <th>{allnoteprim_55.sumnote}/{allnoteprim_55.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_56.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_56.listnotes && allnoteprim_56.listnotes.map((item, grp_56) => (
                                                                                    <tr key={grp_56}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_56.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_56.groupe}  </th>
                                                                                    <th>{allnoteprim_56.sumnote}/{allnoteprim_56.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_57.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_57.listnotes && allnoteprim_57.listnotes.map((item, grp_57) => (
                                                                                    <tr key={grp_57}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_57.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_57.groupe} </th>
                                                                                    <th>{allnoteprim_57.sumnote}/{allnoteprim_57.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_58.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_58.listnotes && allnoteprim_58.listnotes.map((item, grp_58) => (
                                                                                    <tr key={grp_58}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_58.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_58.groupe}  </th>
                                                                                    <th>{allnoteprim_58.sumnote}/{allnoteprim_58.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_59.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_59.listnotes && allnoteprim_59.listnotes.map((item, grp_59) => (
                                                                                    <tr key={grp_59}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_59.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_59.groupe} </th>
                                                                                    <th>{allnoteprim_59.sumnote} /{allnoteprim_59.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_60.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_60.listnotes && allnoteprim_60.listnotes.map((item, grp_60) => (
                                                                                    <tr key={grp_60}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_60.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_60.groupe}  </th>
                                                                                    <th>{allnoteprim_60.sumnote}/{allnoteprim_60.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_61.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_61.listnotes && allnoteprim_61.listnotes.map((item, grp_61) => (
                                                                                    <tr key={grp_61}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_61.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_61.groupe}  </th>
                                                                                    <th>{allnoteprim_61.sumnote}/{allnoteprim_61.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_62.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_62.listnotes && allnoteprim_62.listnotes.map((item, grp_62) => (
                                                                                    <tr key={grp_62}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_62.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_62.groupe}  </th>
                                                                                    <th>{allnoteprim_62.sumnote}/{allnoteprim_62.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_63.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_63.listnotes && allnoteprim_63.listnotes.map((item, grp_63) => (
                                                                                    <tr key={grp_63}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_63.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_63.groupe}  </th>
                                                                                    <th>{allnoteprim_63.sumnote}/{allnoteprim_63.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_64.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_64.listnotes && allnoteprim_64.listnotes.map((item, grp_64) => (
                                                                                    <tr key={grp_64}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_64.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_64.groupe} </th>
                                                                                    <th>{allnoteprim_64.sumnote} /{allnoteprim_64.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_65.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_65.listnotes && allnoteprim_65.listnotes.map((item, grp_65) => (
                                                                                    <tr key={grp_65}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_65.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_65.groupe}  </th>
                                                                                    <th>{allnoteprim_65.sumnote}/{allnoteprim_65.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_66.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_66.listnotes && allnoteprim_66.listnotes.map((item, grp_66) => (
                                                                                    <tr key={grp_66}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_66.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_66.groupe} </th>
                                                                                    <th>{allnoteprim_66.sumnote} /{allnoteprim_66.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_67.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_67.listnotes && allnoteprim_67.listnotes.map((item, grp_67) => (
                                                                                    <tr key={grp_67}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_67.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_67.groupe}  </th>
                                                                                    <th>{allnoteprim_67.sumnote}/{allnoteprim_67.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_68.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_68.listnotes && allnoteprim_68.listnotes.map((item, grp_68) => (
                                                                                    <tr key={grp_68}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_68.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_68.groupe} </th>
                                                                                    <th>{allnoteprim_68.sumnote} /{allnoteprim_68.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_69.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_69.listnotes && allnoteprim_69.listnotes.map((item, grp_69) => (
                                                                                    <tr key={grp_69}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_69.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_69.groupe}  </th>
                                                                                    <th>{allnoteprim_69.sumnote}/{allnoteprim_69.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_70.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_70.listnotes && allnoteprim_70.listnotes.map((item, grp_70) => (
                                                                                    <tr key={grp_70}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_70.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_70.groupe}  </th>
                                                                                    <th>{allnoteprim_70.sumnote}/{allnoteprim_70.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_71.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_71.listnotes && allnoteprim_71.listnotes.map((item, grp_71) => (
                                                                                    <tr key={grp_71}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_71.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_71.groupe} </th>
                                                                                    <th>{allnoteprim_71.sumnote} /{allnoteprim_71.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_72.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_72.listnotes && allnoteprim_72.listnotes.map((item, grp_72) => (
                                                                                    <tr key={grp_72}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_72.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_72.groupe} </th>
                                                                                    <th>{allnoteprim_72.sumnote} /{allnoteprim_72.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_73.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_73.listnotes && allnoteprim_73.listnotes.map((item, grp_73) => (
                                                                                    <tr key={grp_73}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_73.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_73.groupe}  </th>
                                                                                    <th>{allnoteprim_73.sumnote}/{allnoteprim_73.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_74.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_74.listnotes && allnoteprim_74.listnotes.map((item, grp_74) => (
                                                                                    <tr key={grp_74}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_74.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_74.groupe} </th>
                                                                                    <th>{allnoteprim_74.sumnote} /{allnoteprim_74.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_75.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_75.listnotes && allnoteprim_75.listnotes.map((item, grp_75) => (
                                                                                    <tr key={grp_75}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_75.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_75.groupe} </th>
                                                                                    <th>{allnoteprim_75.sumnote}/{allnoteprim_75.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_76.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_76.listnotes && allnoteprim_76.listnotes.map((item, grp_76) => (
                                                                                    <tr key={grp_76}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_76.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_76.groupe}  </th>
                                                                                    <th>{allnoteprim_76.sumnote}/{allnoteprim_76.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_77.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_77.listnotes && allnoteprim_77.listnotes.map((item, grp_77) => (
                                                                                    <tr key={grp_77}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_77.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_77.groupe} </th>
                                                                                    <th>{allnoteprim_77.sumnote}/{allnoteprim_77.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_78.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_78.listnotes && allnoteprim_78.listnotes.map((item, grp_78) => (
                                                                                    <tr key={grp_78}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_78.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_78.groupe}  </th>
                                                                                    <th>{allnoteprim_78.sumnote}/{allnoteprim_78.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_79.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_79.listnotes && allnoteprim_79.listnotes.map((item, grp_79) => (
                                                                                    <tr key={grp_79}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_79.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_79.groupe} </th>
                                                                                    <th>{allnoteprim_79.sumnote} /{allnoteprim_79.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_80.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_80.listnotes && allnoteprim_80.listnotes.map((item, grp_80) => (
                                                                                    <tr key={grp_80}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_80.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_80.groupe} </th>
                                                                                    <th>{allnoteprim_80.sumnote} /{allnoteprim_80.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

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
                                                                       
                                                                        id="datatable"
                                                                        className=""
                                                                        data-toggle="data-table"
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>DISCIPLINE</th>
                                                                                <th>APPRECIATION DU TRAVAIL</th>
                                                                                <th>MOYENNE: {rang_eleve.moyen} </th>
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
                                                                                <div className="mt-1">
                                                                                          <p> Rang:{rang_eleve.rang}
                                                                                          <br />M.Gle:
                                                                                          <br />Effectif: {total_eleves.Total_eleveclasse}
                                                                                          </p>
                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        </tbody>
                                                                    </Table>
                                                                    <Table
                                                                        responsive
                                                                       
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
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                                <td style={{ height: '20px' }}></td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </Table>


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

            </div> : <div></div>}

            {classes.cycle_niveau === 'Primary' ? <div>

                {/* Bulletin standard du primaire anglophone  */}
  
               <Row>
                                    <Col sm="12">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title"></h4>
                                                </div>


                                                <Button variant="primary mt-2" onClick={printData}>
                                                    <span className="btn-inner">
                                            
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
                                                                            MINISTERE DE L'EDUCATION DE BASE<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
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

                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">REPUBLIC OF CAMEROON <br />
                                                                            Peace - Work - Fatherland <br />
                                                                            MINISTRY OF BASIC EDUCATION<br />

                                                                        </p>
                                                                        <p className="text-center"><strong style={{ fontSize: "10px" }}> {info_etab.nom_etablissement} </strong><br />
                                                                          <smal>BP:{info_etab.bp_etablissement} Tel:{info_etab.telephone}</smal> <br />
                                                                        </p>


                                                                    </Col>

                                                                </Row>
                                                                <Row className="mt-2">
                                                                    <Col sm="4" lg="4">


                                                                    </Col>
                                                                    <Col sm="4" lg="4">
                                                                        <p className="text-center">
                                                                            <span style={{ fontSize: "15px" }}> Report Card {evaluation}</span>
                                                                            <br />
                                                                            2022 - 2023
                                                                        </p>


                                                                    </Col>
                                                                    <Col sm="4" lg="4">


                                                                    </Col>

                                                                </Row>
                                                                        <Row>

                                                                        <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Name : {elevesinclass.name}<br />
                                                                                Date and place of birth :  {elevesinclass.datenaiss} at  {elevesinclass.lieunaiss} <br />
                                                                                Sex :  {elevesinclass.sexe} <br />
                                                                              </p>
                                                                        </div>
                                                                    </Col>
                                                                     <Col sm="4" lg="4">
                                                                         <div className="mt-1">
                                                                            <p>Teacher's name: {enseign} <br />
                                                                            Class : {classe} 
                                                                            </p>
                                                                        </div>
                                                                    </Col>

                                                                     <Col sm="4" lg="4">
                                                                        <div className="mt-1">
                                                                            <p >Registration number:  {elevesinclass.matricule}<br />
                                                                                Repeating : <br />
                                                                            </p>
                                                                        </div>

                                                                    </Col>


                                                                        </Row>
                                                                        <Row>
                                                                            <div className="table-responsive border-bottom my-3">
                                                                                <Table
                                                                                    responsive
                                                                                   
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
                                                                                    {allnoteprim_1.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_1.listnotes && allnoteprim_1.listnotes.map((item, grp_1) => (
                                                                                    <tr key={grp_1}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_1.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_1.groupe}</th>
                                                                                    <th>{allnoteprim_1.sumnote}/{allnoteprim_1.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_2.listnotes && allnoteprim_2.listnotes.map((item, grp_2) => (
                                                                                    <tr key={grp_2}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_2.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_2.groupe} </th>
                                                                                    <th>{allnoteprim_2.sumnote}/{allnoteprim_2.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_3.listnotes && allnoteprim_3.listnotes.map((item, grp_3) => (
                                                                                    <tr key={grp_3}>

                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}

                                                                        {allnoteprim_3.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_3.groupe} </th>
                                                                                    <th>{allnoteprim_3.sumnote}/{allnoteprim_3.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_4.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_4.listnotes && allnoteprim_4.listnotes.map((item, grp_4) => (
                                                                                    <tr key={grp_4}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_4.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_4.groupe}  </th>
                                                                                    <th>{allnoteprim_4.sumnote}/{allnoteprim_4.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_5.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_5.listnotes && allnoteprim_5.listnotes.map((item, grp_5) => (
                                                                                    <tr key={grp_5}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_5.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>{allnoteprim_5.groupe}  </th>
                                                                                    <th>{allnoteprim_5.sumnote}/{allnoteprim_5.max_groupe}</th>
                                                                                    <th></th>

                                                                                </tr>
                                                                            </thead>
                                                                        )}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_6.listnotes && allnoteprim_6.listnotes.map((item, grp_6) => (
                                                                                    <tr key={grp_6}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_6.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_6.groupe} </th>
                                                                                    <th>{allnoteprim_6.sumnote}/{allnoteprim_6.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_7.listnotes && allnoteprim_7.listnotes.map((item, grp_7) => (
                                                                                    <tr key={grp_7}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_7.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_7.groupe} </th>
                                                                                    <th>{allnoteprim_7.sumnote}/{allnoteprim_7.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_8.listnotes && allnoteprim_8.listnotes.map((item, grp_8) => (
                                                                                    <tr key={grp_8}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_8.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_8.groupe} </th>
                                                                                    <th>{allnoteprim_8.sumnote}/{allnoteprim_8.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_9.listnotes && allnoteprim_9.listnotes.map((item, grp_9) => (
                                                                                    <tr key={grp_9}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_9.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_9.groupe} </th>
                                                                                    <th>{allnoteprim_9.sumnote} /{allnoteprim_9.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_10.listnotes && allnoteprim_10.listnotes.map((item, grp_10) => (
                                                                                    <tr key={grp_10}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_10.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_10.groupe}</th>
                                                                                    <th>{allnoteprim_10.sumnote} /{allnoteprim_10.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_11.listnotes && allnoteprim_11.listnotes.map((item, grp_11) => (
                                                                                    <tr key={grp_11}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_11.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_11.groupe} </th>
                                                                                    <th>{allnoteprim_11.sumnote} /{allnoteprim_11.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_12.existgrp > 0 && (

                                                                            <tbody>
                                                                                {allnoteprim_12.listnotes && allnoteprim_12.listnotes.map((item, grp_12) => (
                                                                                    <tr key={grp_12}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_12.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_12.groupe}</th>
                                                                                    <th>{allnoteprim_12.sumnote} /{allnoteprim_12.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_13.listnotes && allnoteprim_13.listnotes.map((item, grp_13) => (
                                                                                    <tr key={grp_13}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_13.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_13.groupe}</th>
                                                                                    <th>{allnoteprim_13.sumnote} /{allnoteprim_13.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <tbody>

                                                                                {allnoteprim_14.listnotes && allnoteprim_14.listnotes.map((item, grp_14) => (
                                                                                    <tr key={grp_14}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_14.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_14.groupe}  </th>
                                                                                    <th>{allnoteprim_14.sumnote}/{allnoteprim_14.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_15.listnotes && allnoteprim_15.listnotes.map((item, grp_15) => (
                                                                                    <tr key={grp_15}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_15.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_15.groupe} </th>
                                                                                    <th>{allnoteprim_15.sumnote} /{allnoteprim_15.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                        {allnoteprim_16.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_16.listnotes && allnoteprim_16.listnotes.map((item, grp_16) => (
                                                                                    <tr key={grp_16}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_16.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_16.groupe}</th>
                                                                                    <th>{allnoteprim_16.sumnote} /{allnoteprim_16.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_17.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_17.listnotes && allnoteprim_17.listnotes.map((item, grp_17) => (
                                                                                    <tr key={grp_17}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_17.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_17.groupe} </th>
                                                                                    <th>{allnoteprim_17.sumnote}/{allnoteprim_17.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}


                                                                        {allnoteprim_18.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_18.listnotes && allnoteprim_18.listnotes.map((item, grp_18) => (
                                                                                    <tr key={grp_18}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_18.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_18.groupe} </th>
                                                                                    <th>{allnoteprim_18.sumnote}/{allnoteprim_18.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_19.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_19.listnotes && allnoteprim_19.listnotes.map((item, grp_19) => (
                                                                                    <tr key={grp_19}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_19.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_19.groupe} </th>
                                                                                    <th>{allnoteprim_19.sumnote}/{allnoteprim_19.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_20.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_20.listnotes && allnoteprim_20.listnotes.map((item, grp_20) => (
                                                                                    <tr key={grp_20}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_20.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_20.groupe} </th>
                                                                                    <th>{allnoteprim_20.sumnote}/{allnoteprim_20.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_21.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_21.listnotes && allnoteprim_21.listnotes.map((item, grp_21) => (
                                                                                    <tr key={grp_21}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_21.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_21.groupe} </th>
                                                                                    <th>{allnoteprim_21.sumnote} /{allnoteprim_21.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_22.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_22.listnotes && allnoteprim_22.listnotes.map((item, grp_22) => (
                                                                                    <tr key={grp_22}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_22.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_22.groupe} </th>
                                                                                    <th>{allnoteprim_22.sumnote} /{allnoteprim_22.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_23.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_23.listnotes && allnoteprim_23.listnotes.map((item, grp_23) => (
                                                                                    <tr key={grp_23}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_23.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_23.groupe} </th>
                                                                                    <th>{allnoteprim_23.sumnote} /{allnoteprim_23.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_24.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_24.listnotes && allnoteprim_24.listnotes.map((item, grp_24) => (
                                                                                    <tr key={grp_24}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_24.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_24.groupe}  </th>
                                                                                    <th>{allnoteprim_24.sumnote}/{allnoteprim_24.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_25.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_25.listnotes && allnoteprim_25.listnotes.map((item, grp_25) => (
                                                                                    <tr key={grp_25}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_25.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_25.groupe}  </th>
                                                                                    <th>{allnoteprim_25.sumnote}/{allnoteprim_25.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_26.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_26.listnotes && allnoteprim_26.listnotes.map((item, grp_26) => (
                                                                                    <tr key={grp_26}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_26.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_26.groupe}  </th>
                                                                                    <th>{allnoteprim_26.sumnote}/{allnoteprim_26.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_27.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_27.listnotes && allnoteprim_27.listnotes.map((item, grp_27) => (
                                                                                    <tr key={grp_27}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_27.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_27.groupe}  </th>
                                                                                    <th>{allnoteprim_27.sumnote}/{allnoteprim_27.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_28.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_28.listnotes && allnoteprim_28.listnotes.map((item, grp_28) => (
                                                                                    <tr key={grp_28}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_28.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_28.groupe} </th>
                                                                                    <th>{allnoteprim_28.sumnote}/{allnoteprim_28.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_29.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_29.listnotes && allnoteprim_29.listnotes.map((item, grp_29) => (
                                                                                    <tr key={grp_29}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_29.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_29.groupe} </th>
                                                                                    <th>{allnoteprim_29.sumnote}/{allnoteprim_29.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                        {allnoteprim_30.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_30.listnotes && allnoteprim_30.listnotes.map((item, grp_30) => (
                                                                                    <tr key={grp_30}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_30.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_30.groupe}</th>
                                                                                    <th>{allnoteprim_30.sumnote} /{allnoteprim_30.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_31.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_31.listnotes && allnoteprim_31.listnotes.map((item, grp_31) => (
                                                                                    <tr key={grp_31}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_31.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_31.groupe} </th>
                                                                                    <th>{allnoteprim_31.sumnote}/{allnoteprim_31.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_32.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_32.listnotes && allnoteprim_32.listnotes.map((item, grp_32) => (
                                                                                    <tr key={grp_32}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_32.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_32.groupe} </th>
                                                                                    <th>{allnoteprim_32.sumnote} /{allnoteprim_32.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_33.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_33.listnotes && allnoteprim_33.listnotes.map((item, grp_33) => (
                                                                                    <tr key={grp_33}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_33.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_33.groupe} </th>
                                                                                    <th>{allnoteprim_33.sumnote} /{allnoteprim_33.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_34.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_34.listnotes && allnoteprim_34.listnotes.map((item, grp_34) => (
                                                                                    <tr key={grp_34}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_34.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_34.groupe} </th>
                                                                                    <th>{allnoteprim_34.sumnote}/{allnoteprim_34.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                         {allnoteprim_35.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_35.listnotes && allnoteprim_35.listnotes.map((item, grp_35) => (
                                                                                    <tr key={grp_35}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_35.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_35.groupe}</th>
                                                                                    <th>{allnoteprim_35.sumnote} /{allnoteprim_35.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_36.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_36.listnotes && allnoteprim_36.listnotes.map((item, grp_36) => (
                                                                                    <tr key={grp_36}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_36.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_36.groupe}  </th>
                                                                                    <th>{allnoteprim_36.sumnote}/{allnoteprim_36.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_37.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_37.listnotes && allnoteprim_37.listnotes.map((item, grp_37) => (
                                                                                    <tr key={grp_37}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_37.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_37.groupe} </th>
                                                                                    <th>{allnoteprim_37.sumnote}/{allnoteprim_37.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_38.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_38.listnotes && allnoteprim_38.listnotes.map((item, grp_38) => (
                                                                                    <tr key={grp_38}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_38.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_38.groupe}  </th>
                                                                                    <th>{allnoteprim_38.sumnote}/{allnoteprim_38.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                             {allnoteprim_39.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_39.listnotes && allnoteprim_39.listnotes.map((item, grp_39) => (
                                                                                    <tr key={grp_39}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_39.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_39.groupe}</th>
                                                                                    <th>{allnoteprim_39.sumnote} /{allnoteprim_39.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                             {allnoteprim_40.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_40.listnotes && allnoteprim_40.listnotes.map((item, grp_40) => (
                                                                                    <tr key={grp_40}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_40.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_40.groupe} </th>
                                                                                    <th>{allnoteprim_40.sumnote} /{allnoteprim_40.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_41.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_41.listnotes && allnoteprim_41.listnotes.map((item, grp_41) => (
                                                                                    <tr key={grp_41}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_41.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_41.groupe} </th>
                                                                                    <th>{allnoteprim_41.sumnote}/{allnoteprim_41.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_42.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_42.listnotes && allnoteprim_42.listnotes.map((item, grp_42) => (
                                                                                    <tr key={grp_42}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_42.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_42.groupe} </th>
                                                                                    <th>{allnoteprim_42.sumnote} /{allnoteprim_42.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_43.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_43.listnotes && allnoteprim_43.listnotes.map((item, grp_43) => (
                                                                                    <tr key={grp_43}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_43.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_43.groupe}  </th>
                                                                                    <th>{allnoteprim_43.sumnote}/{allnoteprim_43.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_44.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_44.listnotes && allnoteprim_44.listnotes.map((item, grp_44) => (
                                                                                    <tr key={grp_44}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_44.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_44.groupe}</th>
                                                                                    <th>{allnoteprim_44.sumnote} /{allnoteprim_44.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_45.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_45.listnotes && allnoteprim_45.listnotes.map((item, grp_45) => (
                                                                                    <tr key={grp_45}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_45.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_45.groupe} </th>
                                                                                    <th>{allnoteprim_45.sumnote}/{allnoteprim_45.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_46.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_46.listnotes && allnoteprim_46.listnotes.map((item, grp_46) => (
                                                                                    <tr key={grp_46}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_46.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_46.groupe}  </th>
                                                                                    <th>{allnoteprim_46.sumnote}/{allnoteprim_46.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_47.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_47.listnotes && allnoteprim_47.listnotes.map((item, grp_47) => (
                                                                                    <tr key={grp_47}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_47.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_47.groupe}</th>
                                                                                    <th>{allnoteprim_47.sumnote} /{allnoteprim_47.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_48.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_48.listnotes && allnoteprim_48.listnotes.map((item, grp_48) => (
                                                                                    <tr key={grp_48}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_48.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_48.groupe}  </th>
                                                                                    <th>{allnoteprim_48.sumnote}/{allnoteprim_48.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_49.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_49.listnotes && allnoteprim_49.listnotes.map((item, grp_49) => (
                                                                                    <tr key={grp_49}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_49.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_49.groupe} </th>
                                                                                    <th>{allnoteprim_49.sumnote} /{allnoteprim_49.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_50.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_50.listnotes && allnoteprim_50.listnotes.map((item, grp_50) => (
                                                                                    <tr key={grp_50}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_50.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_50.groupe}  </th>
                                                                                    <th>{allnoteprim_50.sumnote}/{allnoteprim_50.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_51.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_51.listnotes && allnoteprim_51.listnotes.map((item, grp_51) => (
                                                                                    <tr key={grp_51}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_51.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_51.groupe} </th>
                                                                                    <th>{allnoteprim_51.sumnote}/{allnoteprim_51.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}   

                                                                            {allnoteprim_52.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_52.listnotes && allnoteprim_52.listnotes.map((item, grp_52) => (
                                                                                    <tr key={grp_52}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_52.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_52.groupe}  </th>
                                                                                    <th>{allnoteprim_52.sumnote}/{allnoteprim_52.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_53.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_53.listnotes && allnoteprim_53.listnotes.map((item, grp_53) => (
                                                                                    <tr key={grp_53}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_53.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_53.groupe}  </th>
                                                                                    <th>{allnoteprim_53.sumnote}/{allnoteprim_53.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_54.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_54.listnotes && allnoteprim_54.listnotes.map((item, grp_54) => (
                                                                                    <tr key={grp_54}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_54.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_54.groupe} </th>
                                                                                    <th>{allnoteprim_54.sumnote} /{allnoteprim_54.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_55.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_55.listnotes && allnoteprim_55.listnotes.map((item, grp_55) => (
                                                                                    <tr key={grp_55}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_55.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_55.groupe}  </th>
                                                                                    <th>{allnoteprim_55.sumnote}/{allnoteprim_55.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_56.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_56.listnotes && allnoteprim_56.listnotes.map((item, grp_56) => (
                                                                                    <tr key={grp_56}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_56.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_56.groupe}  </th>
                                                                                    <th>{allnoteprim_56.sumnote}/{allnoteprim_56.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_57.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_57.listnotes && allnoteprim_57.listnotes.map((item, grp_57) => (
                                                                                    <tr key={grp_57}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_57.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_57.groupe} </th>
                                                                                    <th>{allnoteprim_57.sumnote}/{allnoteprim_57.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_58.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_58.listnotes && allnoteprim_58.listnotes.map((item, grp_58) => (
                                                                                    <tr key={grp_58}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_58.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_58.groupe}  </th>
                                                                                    <th>{allnoteprim_58.sumnote}/{allnoteprim_58.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_59.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_59.listnotes && allnoteprim_59.listnotes.map((item, grp_59) => (
                                                                                    <tr key={grp_59}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_59.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_59.groupe} </th>
                                                                                    <th>{allnoteprim_59.sumnote} /{allnoteprim_59.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_60.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_60.listnotes && allnoteprim_60.listnotes.map((item, grp_60) => (
                                                                                    <tr key={grp_60}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_60.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_60.groupe}  </th>
                                                                                    <th>{allnoteprim_60.sumnote}/{allnoteprim_60.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_61.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_61.listnotes && allnoteprim_61.listnotes.map((item, grp_61) => (
                                                                                    <tr key={grp_61}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_61.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_61.groupe}  </th>
                                                                                    <th>{allnoteprim_61.sumnote}/{allnoteprim_61.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_62.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_62.listnotes && allnoteprim_62.listnotes.map((item, grp_62) => (
                                                                                    <tr key={grp_62}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_62.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_62.groupe}  </th>
                                                                                    <th>{allnoteprim_62.sumnote}/{allnoteprim_62.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_63.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_63.listnotes && allnoteprim_63.listnotes.map((item, grp_63) => (
                                                                                    <tr key={grp_63}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_63.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_63.groupe}  </th>
                                                                                    <th>{allnoteprim_63.sumnote}/{allnoteprim_63.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_64.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_64.listnotes && allnoteprim_64.listnotes.map((item, grp_64) => (
                                                                                    <tr key={grp_64}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_64.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_64.groupe} </th>
                                                                                    <th>{allnoteprim_64.sumnote} /{allnoteprim_64.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_65.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_65.listnotes && allnoteprim_65.listnotes.map((item, grp_65) => (
                                                                                    <tr key={grp_65}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_65.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_65.groupe}  </th>
                                                                                    <th>{allnoteprim_65.sumnote}/{allnoteprim_65.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_66.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_66.listnotes && allnoteprim_66.listnotes.map((item, grp_66) => (
                                                                                    <tr key={grp_66}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_66.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_66.groupe} </th>
                                                                                    <th>{allnoteprim_66.sumnote} /{allnoteprim_66.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_67.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_67.listnotes && allnoteprim_67.listnotes.map((item, grp_67) => (
                                                                                    <tr key={grp_67}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_67.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_67.groupe}  </th>
                                                                                    <th>{allnoteprim_67.sumnote}/{allnoteprim_67.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_68.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_68.listnotes && allnoteprim_68.listnotes.map((item, grp_68) => (
                                                                                    <tr key={grp_68}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_68.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_68.groupe} </th>
                                                                                    <th>{allnoteprim_68.sumnote} /{allnoteprim_68.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_69.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_69.listnotes && allnoteprim_69.listnotes.map((item, grp_69) => (
                                                                                    <tr key={grp_69}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_69.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_69.groupe}  </th>
                                                                                    <th>{allnoteprim_69.sumnote}/{allnoteprim_69.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_70.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_70.listnotes && allnoteprim_70.listnotes.map((item, grp_70) => (
                                                                                    <tr key={grp_70}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_70.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_70.groupe}  </th>
                                                                                    <th>{allnoteprim_70.sumnote}/{allnoteprim_70.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_71.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_71.listnotes && allnoteprim_71.listnotes.map((item, grp_71) => (
                                                                                    <tr key={grp_71}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_71.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_71.groupe} </th>
                                                                                    <th>{allnoteprim_71.sumnote} /{allnoteprim_71.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_72.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_72.listnotes && allnoteprim_72.listnotes.map((item, grp_72) => (
                                                                                    <tr key={grp_72}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_72.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_72.groupe} </th>
                                                                                    <th>{allnoteprim_72.sumnote} /{allnoteprim_72.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_73.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_73.listnotes && allnoteprim_73.listnotes.map((item, grp_73) => (
                                                                                    <tr key={grp_73}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_73.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_73.groupe}  </th>
                                                                                    <th>{allnoteprim_73.sumnote}/{allnoteprim_73.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_74.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_74.listnotes && allnoteprim_74.listnotes.map((item, grp_74) => (
                                                                                    <tr key={grp_74}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_74.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_74.groupe} </th>
                                                                                    <th>{allnoteprim_74.sumnote} /{allnoteprim_74.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_75.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_75.listnotes && allnoteprim_75.listnotes.map((item, grp_75) => (
                                                                                    <tr key={grp_75}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_75.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_75.groupe} </th>
                                                                                    <th>{allnoteprim_75.sumnote}/{allnoteprim_75.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_76.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_76.listnotes && allnoteprim_76.listnotes.map((item, grp_76) => (
                                                                                    <tr key={grp_76}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_76.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_76.groupe}  </th>
                                                                                    <th>{allnoteprim_76.sumnote}/{allnoteprim_76.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_77.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_77.listnotes && allnoteprim_77.listnotes.map((item, grp_77) => (
                                                                                    <tr key={grp_77}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_77.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_77.groupe} </th>
                                                                                    <th>{allnoteprim_77.sumnote}/{allnoteprim_77.max_groupe} </th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_78.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_78.listnotes && allnoteprim_78.listnotes.map((item, grp_78) => (
                                                                                    <tr key={grp_78}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_78.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_78.groupe}  </th>
                                                                                    <th>{allnoteprim_78.sumnote}/{allnoteprim_78.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_79.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_79.listnotes && allnoteprim_79.listnotes.map((item, grp_79) => (
                                                                                    <tr key={grp_79}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_79.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_79.groupe} </th>
                                                                                    <th>{allnoteprim_79.sumnote} /{allnoteprim_79.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}

                                                                            {allnoteprim_80.existgrp > 0 && (
                                                                            <tbody>
                                                                                {allnoteprim_80.listnotes && allnoteprim_80.listnotes.map((item, grp_80) => (
                                                                                    <tr key={grp_80}>
                                                                                        <td >{item.competence_visee_note}</td>
                                                                                        <td >{item.valeur_note}</td>
                                                                                        <td >{item.appreciation_note}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>)}
                                                                        {allnoteprim_80.existgrp > 0 && (
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>{allnoteprim_80.groupe} </th>
                                                                                    <th>{allnoteprim_80.sumnote} /{allnoteprim_80.max_groupe}</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>)}
                                                                                    <tbody>

                                                                                        <tr>
                                                                                            <td>SUMMARY</td>
                                                                                            <td>{sumnotes}</td>
                                                                                            <td></td>
                                                                                            <td></td>

                                                                                        </tr>
                                                                                    </tbody>

                                                                                </Table>
                                                                                <Table
                                                                                    responsive
                                                                                   
                                                                                    id="datatable"
                                                                                    className=""
                                                                                    data-toggle="data-table"
                                                                                >
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th></th>
                                                                                            <th>DISCIPLINE</th>
                                                                                            <th>WORK APPRECIATION</th>
                                                                                            <th>AVERAGE: {moyenneleve}   </th>
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
                                                                                            <div className="mt-1">
                                                                                                    <p> Rank:{rang_eleve.rang}</p>
                                                                                                    <br />G.Average:
                                                                                                    <br />Effective: {total_eleves.Total_eleveclasse}
                                                                                                </div>
                                                                                </td>
                                                                                        </tr>

                                                                                    </tbody>
                                                                                </Table>
                                                                                <Table
                                                                                    responsive
                                                                                   
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
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
                                                                                            <td style={{ height: '20px' }}></td>
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


        </div> : <div></div>}

        </Fragment>

        );
    })
    
    export default BulletinPrimaire
