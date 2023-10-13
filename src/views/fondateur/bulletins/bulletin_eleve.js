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
    const [Info_grp_1, setInfo_grp_1] = useState([]);
    useEffect(() => {
        fetchInfo_grp_1();
    }, []);
    
    const fetchInfo_grp_1 = () => {
        http.get('/info/groupe_1/' + etab).then(res => {
        setInfo_grp_1(res.data);
      })
    };
     console.log(Info_grp_1);
     console.log(222);
    
    const [allnote_1, setAllNote_1] = useState([]);
    useEffect(() => {
        fetchAllNote_1();
    }, []);

    const fetchAllNote_1 = () => {
        http.get('/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
    
    const [sumallnote_1, setAllSumallnote_1] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_1();
    }, []);

    const fetchAllSumallnote_1 = () => {
        http.get('/sum/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_1(res.data);
      })
    };

    const [sumcoefnote_1, setAllSumcoefnote_1] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_1();
    }, []);

    const fetchAllSumcoefnote_1 = () => {
        http.get('/sum/coef/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_1(res.data);
      })
    };

    const [sumfinalnote_1, setAllSumfinalnote_1] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_1();
    }, []);

    const fetchAllSumfinalnote_1 = () => {
        http.get('/sum/final/notes_1/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_1(res.data);
      })
    };

    
    //////////////////////////////////////////////
    const [Info_grp_2, setInfo_grp_2] = useState([]);
    useEffect(() => {
        fetchInfo_grp_2();
    }, []);
     console.log(Info_grp_2);
    const fetchInfo_grp_2 = () => {
        http.get('/info/groupe_2/' + etab ).then(res => {
        setInfo_grp_2(res.data);
      })
    };
    const [allnote_2, setAllNote_2] = useState([]);
    useEffect(() => {
        fetchAllNote_2();
    }, []);

    const fetchAllNote_2 = () => {
        http.get('/all/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_2(res.data);
      })
    };
    
    const [sumallnote_2, setAllSumallnote_2] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_2();
    }, []);

    const fetchAllSumallnote_2= () => {
        http.get('/sum/all/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_2(res.data);
      })
    };

    const [sumcoefnote_2, setAllSumcoefnote_2] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_2();
    }, []);

    const fetchAllSumcoefnote_2 = () => {
        http.get('/sum/coef/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_2(res.data);
      })
    };

    const [sumfinalnote_2, setAllSumfinalnote_2] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_2();
    }, []);

    const fetchAllSumfinalnote_2 = () => {
        http.get('/sum/final/notes_2/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_2(res.data);
      })
    };
    
        
    //////////////////////////////////////////////
    const [Info_grp_3, setInfo_grp_3] = useState([]);
    useEffect(() => {
        fetchInfo_grp_3();
    }, []);
     console.log(Info_grp_3);
    const fetchInfo_grp_3 = () => {
        http.get('/info/groupe_3/' + etab).then(res => {
        setInfo_grp_3(res.data);
      })
    };
    const [allnote_3, setAllNote_3] = useState([]);
    useEffect(() => {
        fetchAllNote_3();
    }, []);

    const fetchAllNote_3 = () => {
        http.get('/all/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_3(res.data);
      })
    };
    
    const [sumallnote_3, setAllSumallnote_3] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_3();
    }, []);

    const fetchAllSumallnote_3 = () => {
        http.get('/sum/all/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_3(res.data);
      })
    };

    const [sumcoefnote_3, setAllSumcoefnote_3] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_3();
    }, []);

    const fetchAllSumcoefnote_3 = () => {
        http.get('/sum/coef/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_3(res.data);
      })
    };

    const [sumfinalnote_3, setAllSumfinalnote_3] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_3();
    }, []);

    const fetchAllSumfinalnote_3 = () => {
        http.get('/sum/final/notes_3/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_3(res.data);
      })
    };
    ///////////////////////////////////////////////
   const [Info_grp_4, setInfo_grp_4] = useState([]);
    useEffect(() => {
        fetchInfo_grp_1();
    }, []);
    
    const fetchInfo_grp_4 = () => {
        http.get('/info/groupe_4/' + etab).then(res => {
        setInfo_grp_1(res.data);
      })
    };
    
    const [allnote_4, setAllNote_4] = useState([]);
    useEffect(() => {
        fetchAllNote_4();
    }, []);

    const fetchAllNote_4 = () => {
        http.get('/all/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_4(res.data);
      })
    };
    
    const [sumallnote_4, setAllSumallnote_4] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_4();
    }, []);

    const fetchAllSumallnote_4 = () => {
        http.get('/sum/all/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_1(res.data);
      })
    };

    const [sumcoefnote_4, setAllSumcoefnote_4] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_4();
    }, []);

    const fetchAllSumcoefnote_4 = () => {
        http.get('/sum/coef/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_4(res.data);
      })
    };

    const [sumfinalnote_4, setAllSumfinalnote_4] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_4();
    }, []);

    const fetchAllSumfinalnote_4 = () => {
        http.get('/sum/final/notes_4/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_4(res.data);
      })
    }; 
    //////////////////////////////////////////////
       const [Info_grp_5, setInfo_grp_5] = useState([]);
    useEffect(() => {
        fetchInfo_grp_5();
    }, []);
    
    const fetchInfo_grp_5 = () => {
        http.get('/info/groupe_5/' + etab).then(res => {
        setInfo_grp_5(res.data);
      })
    };
    
    const [allnote_5, setAllNote_5] = useState([]);
    useEffect(() => {
        fetchAllNote_5();
    }, []);

    const fetchAllNote_5 = () => {
        http.get('/all/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_5(res.data);
      })
    };
    
    const [sumallnote_5, setAllSumallnote_5] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_5();
    }, []);

    const fetchAllSumallnote_5 = () => {
        http.get('/sum/all/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_1(res.data);
      })
    };

    const [sumcoefnote_5, setAllSumcoefnote_5] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_5();
    }, []);

    const fetchAllSumcoefnote_5 = () => {
        http.get('/sum/coef/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_5(res.data);
      })
    };

    const [sumfinalnote_5, setAllSumfinalnote_5] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_5();
    }, []);

    const fetchAllSumfinalnote_5 = () => {
        http.get('/sum/final/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_5(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_6, setInfo_grp_6] = useState([]);
    useEffect(() => {
        fetchInfo_grp_6();
    }, []);
    
    const fetchInfo_grp_6 = () => {
        http.get('/info/groupe_6/' + etab).then(res => {
        setInfo_grp_6(res.data);
      })
    };
     
    const [allnote_6, setAllNote_6] = useState([]);
    useEffect(() => {
        fetchAllNote_6();
    }, []);

    const fetchAllNote_6 = () => {
        http.get('/all/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_6(res.data);
      })
    };
    
    const [sumallnote_6, setAllSumallnote_6] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_1();
    }, []);

    const fetchAllSumallnote_6 = () => {
        http.get('/sum/all/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_6(res.data);
      })
    };
    const [sumcoefnote_6, setAllSumcoefnote_6] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_6();
    }, []);

    const fetchAllSumcoefnote_6 = () => {
        http.get('/sum/coef/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_6(res.data);
      })
    };

    const [sumfinalnote_6, setAllSumfinalnote_6] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_6();
    }, []);

    const fetchAllSumfinalnote_6 = () => {
        http.get('/sum/final/notes_6/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_6(res.data);
      })
    };   
    //////////////////////////////////////////////
     const [Info_grp_7, setInfo_grp_7] = useState([]);
    useEffect(() => {
        fetchInfo_grp_7();
    }, []);
    
    const fetchInfo_grp_7 = () => {
        http.get('/info/groupe_7/' + etab).then(res => {
        setInfo_grp_7(res.data);
      })
    };
    
    const [allnote_7, setAllNote_7] = useState([]);
    useEffect(() => {
        fetchAllNote_7();
    }, []);

    const fetchAllNote_7 = () => {
        http.get('/all/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_7(res.data);
      })
    };
    
    const [sumallnote_7, setAllSumallnote_7] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_7();
    }, []);

    const fetchAllSumallnote_7 = () => {
        http.get('/sum/all/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_7(res.data);
      })
    };
    const [sumcoefnote_7, setAllSumcoefnote_7] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_7();
    }, []);

    const fetchAllSumcoefnote_7 = () => {
        http.get('/sum/coef/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_7(res.data);
      })
    };

    const [sumfinalnote_7, setAllSumfinalnote_7] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_7();
    }, []);

    const fetchAllSumfinalnote_7 = () => {
        http.get('/sum/final/notes_7/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_7(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_8, setInfo_grp_8] = useState([]);
    useEffect(() => {
        fetchInfo_grp_8();
    }, []);
    
    const fetchInfo_grp_8 = () => {
        http.get('/info/groupe_8/' + etab).then(res => {
        setInfo_grp_8(res.data);
      })
    };
    
    const [allnote_8, setAllNote_8] = useState([]);
    useEffect(() => {
        fetchAllNote_8();
    }, []);

    const fetchAllNote_8 = () => {
        http.get('/all/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_8(res.data);
      })
    };
    
    const [sumallnote_8, setAllSumallnote_8] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_8();
    }, []);

    const fetchAllSumallnote_8 = () => {
        http.get('/sum/all/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_8(res.data);
      })
    };
    const [sumcoefnote_8, setAllSumcoefnote_8] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_5();
    }, []);

    const fetchAllSumcoefnote_8 = () => {
        http.get('/sum/coef/notes_5/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_5(res.data);
      })
    };

    const [sumfinalnote_8, setAllSumfinalnote_8] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_8();
    }, []);

    const fetchAllSumfinalnote_8 = () => {
        http.get('/sum/final/notes_8/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_8(res.data);
      })
    };   
  //////////////////////////////////////////////
       const [Info_grp_9, setInfo_grp_9] = useState([]);
    useEffect(() => {
        fetchInfo_grp_9();
    }, []);
    
    const fetchInfo_grp_9 = () => {
        http.get('/info/groupe_9/' + etab).then(res => {
        setInfo_grp_9(res.data);
      })
    };
    
    const [allnote_9, setAllNote_9] = useState([]);
    useEffect(() => {
        fetchAllNote_9();
    }, []);

    const fetchAllNote_9 = () => {
        http.get('/all/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
    
    const [sumallnote_9, setAllSumallnote_9] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_9();
    }, []);

    const fetchAllSumallnote_9 = () => {
        http.get('/sum/all/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_9(res.data);
      })
    };
    const [sumcoefnote_9, setAllSumcoefnote_9] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_9();
    }, []);

    const fetchAllSumcoefnote_9 = () => {
        http.get('/sum/coef/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_9(res.data);
      })
    };

    const [sumfinalnote_9, setAllSumfinalnote_9] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_9();
    }, []);

    const fetchAllSumfinalnote_9 = () => {
        http.get('/sum/final/notes_9/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_9(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_10, setInfo_grp_10] = useState([]);
    useEffect(() => {
        fetchInfo_grp_10();
    }, []);
    
    const fetchInfo_grp_10 = () => {
        http.get('/info/groupe_10/' + etab).then(res => {
        setInfo_grp_1(res.data);
      })
    };
    
    const [allnote_10, setAllNote_10] = useState([]);
    useEffect(() => {
        fetchAllNote_10();
    }, []);

    const fetchAllNote_10 = () => {
        http.get('/all/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_10(res.data);
      })
    };
    
    const [sumallnote_10, setAllSumallnote_10] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_10();
    }, []);

    const fetchAllSumallnote_10 = () => {
        http.get('/sum/all/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_10(res.data);
      })
    };
    const [sumcoefnote_10, setAllSumcoefnote_10] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_10();
    }, []);

    const fetchAllSumcoefnote_10 = () => {
        http.get('/sum/coef/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_10(res.data);
      })
    };

    const [sumfinalnote_10, setAllSumfinalnote_10] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_10();
    }, []);

    const fetchAllSumfinalnote_10 = () => {
        http.get('/sum/final/notes_10/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_10(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_11, setInfo_grp_11] = useState([]);
    useEffect(() => {
        fetchInfo_grp_11();
    }, []);
    
    const fetchInfo_grp_11 = () => {
        http.get('/info/groupe_11/' + etab).then(res => {
        setInfo_grp_11(res.data);
      })
    };
    
    const [allnote_11, setAllNote_11] = useState([]);
    useEffect(() => {
        fetchAllNote_11();
    }, []);

    const fetchAllNote_11 = () => {
        http.get('/all/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
    
    const [sumallnote_11, setAllSumallnote_11] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_11();
    }, []);

    const fetchAllSumallnote_11 = () => {
        http.get('/sum/all/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_11(res.data);
      })
    };
    const [sumcoefnote_11, setAllSumcoefnote_11] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_11();
    }, []);

    const fetchAllSumcoefnote_11 = () => {
        http.get('/sum/coef/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_5(res.data);
      })
    };

    const [sumfinalnote_11, setAllSumfinalnote_11] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_11();
    }, []);

    const fetchAllSumfinalnote_11 = () => {
        http.get('/sum/final/notes_11/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_11(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_12, setInfo_grp_12] = useState([]);
    useEffect(() => {
        fetchInfo_grp_12();
    }, []);
    
    const fetchInfo_grp_12 = () => {
        http.get('/info/groupe_12/' + etab).then(res => {
        setInfo_grp_1(res.data);
      })
    };
    
    const [allnote_12, setAllNote_12] = useState([]);
    useEffect(() => {
        fetchAllNote_12();
    }, []);

    const fetchAllNote_12 = () => {
        http.get('/all/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_12(res.data);
      })
    };
    
    const [sumallnote_12, setAllSumallnote_12] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_12();
    }, []);

    const fetchAllSumallnote_12 = () => {
        http.get('/sum/all/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_12(res.data);
      })
    };
    const [sumcoefnote_12, setAllSumcoefnote_12] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_12();
    }, []);

    const fetchAllSumcoefnote_12 = () => {
        http.get('/sum/coef/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_12(res.data);
      })
    };

    const [sumfinalnote_12, setAllSumfinalnote_12] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_12();
    }, []);

    const fetchAllSumfinalnote_12 = () => {
        http.get('/sum/final/notes_12/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_12(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_13, setInfo_grp_13] = useState([]);
    useEffect(() => {
        fetchInfo_grp_13();
    }, []);
    
    const fetchInfo_grp_13 = () => {
        http.get('/info/groupe_13/' + etab).then(res => {
        setInfo_grp_13(res.data);
      })
    };
    
    const [allnote_13, setAllNote_13] = useState([]);
    useEffect(() => {
        fetchAllNote_13();
    }, []);

    const fetchAllNote_13 = () => {
        http.get('/all/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_13(res.data);
      })
    };
    
    const [sumallnote_13, setAllSumallnote_13] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_13();
    }, []);

    const fetchAllSumallnote_13 = () => {
        http.get('/sum/all/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_13(res.data);
      })
    };
    const [sumcoefnote_13, setAllSumcoefnote_13] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_13();
    }, []);

    const fetchAllSumcoefnote_13 = () => {
        http.get('/sum/coef/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_13(res.data);
      })
    };

    const [sumfinalnote_13, setAllSumfinalnote_13] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_13();
    }, []);

    const fetchAllSumfinalnote_13 = () => {
        http.get('/sum/final/notes_13/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_13(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_14, setInfo_grp_14] = useState([]);
    useEffect(() => {
        fetchInfo_grp_14();
    }, []);
    
    const fetchInfo_grp_14 = () => {
        http.get('/info/groupe_14/' + etab).then(res => {
        setInfo_grp_14(res.data);
      })
    };
    
    const [allnote_14, setAllNote_14] = useState([]);
    useEffect(() => {
        fetchAllNote_14();
    }, []);

    const fetchAllNote_14 = () => {
        http.get('/all/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_14(res.data);
      })
    };
    
    const [sumallnote_14, setAllSumallnote_14] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_14();
    }, []);

    const fetchAllSumallnote_14 = () => {
        http.get('/sum/all/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_14(res.data);
      })
    };
    const [sumcoefnote_14, setAllSumcoefnote_14] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_14();
    }, []);

    const fetchAllSumcoefnote_14 = () => {
        http.get('/sum/coef/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_14(res.data);
      })
    };

    const [sumfinalnote_14, setAllSumfinalnote_14] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_14();
    }, []);

    const fetchAllSumfinalnote_14 = () => {
        http.get('/sum/final/notes_14/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_14(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_15, setInfo_grp_15] = useState([]);
    useEffect(() => {
        fetchInfo_grp_15();
    }, []);
    
    const fetchInfo_grp_15 = () => {
        http.get('/info/groupe_15/' + etab).then(res => {
        setInfo_grp_15(res.data);
      })
    };
    
    const [allnote_15, setAllNote_15] = useState([]);
    useEffect(() => {
        fetchAllNote_15();
    }, []);

    const fetchAllNote_15 = () => {
        http.get('/all/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_15(res.data);
      })
    };
    
    const [sumallnote_15, setAllSumallnote_15] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_15();
    }, []);

    const fetchAllSumallnote_15 = () => {
        http.get('/sum/all/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_15(res.data);
      })
    };
    const [sumcoefnote_15, setAllSumcoefnote_15] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_15();
    }, []);

    const fetchAllSumcoefnote_15 = () => {
        http.get('/sum/coef/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_15(res.data);
      })
    };

    const [sumfinalnote_15, setAllSumfinalnote_15] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_15();
    }, []);

    const fetchAllSumfinalnote_15 = () => {
        http.get('/sum/final/notes_15/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_15(res.data);
      })
    };   
    //////////////////////////////////////////////
       const [Info_grp_16, setInfo_grp_16] = useState([]);
    useEffect(() => {
        fetchInfo_grp_16();
    }, []);
    
    const fetchInfo_grp_16 = () => {
        http.get('/info/groupe_16/' + etab).then(res => {
        setInfo_grp_16(res.data);
      })
    };
    
    const [allnote_16, setAllNote_16] = useState([]);
    useEffect(() => {
        fetchAllNote_16();
    }, []);

    const fetchAllNote_16 = () => {
        http.get('/all/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_16(res.data);
      })
    };
    
    const [sumallnote_16, setAllSumallnote_16] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_16();
    }, []);

    const fetchAllSumallnote_16 = () => {
        http.get('/sum/all/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_16(res.data);
      })
    };
    const [sumcoefnote_16, setAllSumcoefnote_16] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_16();
    }, []);

    const fetchAllSumcoefnote_16 = () => {
        http.get('/sum/coef/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_16(res.data);
      })
    };

    const [sumfinalnote_16, setAllSumfinalnote_16] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_16();
    }, []);

    const fetchAllSumfinalnote_16 = () => {
        http.get('/sum/final/notes_16/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_16(res.data);
      })
    };   
    //////////////////////////////////////////////

       const [Info_grp_17, setInfo_grp_17] = useState([]);
    useEffect(() => {
        fetchInfo_grp_17();
    }, []);
    
    const fetchInfo_grp_17 = () => {
        http.get('/info/groupe_17/' + etab).then(res => {
        setInfo_grp_17(res.data);
      })
    };
    
    const [allnote_17, setAllNote_17] = useState([]);
    useEffect(() => {
        fetchAllNote_17();
    }, []);

    const fetchAllNote_17 = () => {
        http.get('/all/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_17(res.data);
      })
    };
    
    const [sumallnote_17, setAllSumallnote_17] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_17();
    }, []);

    const fetchAllSumallnote_17 = () => {
        http.get('/sum/all/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_17(res.data);
      })
    };
    const [sumcoefnote_17, setAllSumcoefnote_17] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_17();
    }, []);

    const fetchAllSumcoefnote_17 = () => {
        http.get('/sum/coef/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_17(res.data);
      })
    };

    const [sumfinalnote_17, setAllSumfinalnote_17] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_17();
    }, []);

    const fetchAllSumfinalnote_17 = () => {
        http.get('/sum/final/notes_17/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_17(res.data);
      })
    };   
    //////////////////////////////////////////////

       const [Info_grp_18, setInfo_grp_18] = useState([]);
    useEffect(() => {
        fetchInfo_grp_18();
    }, []);
    
    const fetchInfo_grp_18 = () => {
        http.get('/info/groupe_18/' + etab).then(res => {
        setInfo_grp_18(res.data);
      })
    };
    
    const [allnote_18, setAllNote_18] = useState([]);
    useEffect(() => {
        fetchAllNote_18();
    }, []);

    const fetchAllNote_18 = () => {
        http.get('/all/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_18(res.data);
      })
    };
    
    const [sumallnote_18, setAllSumallnote_18] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_18();
    }, []);

    const fetchAllSumallnote_18 = () => {
        http.get('/sum/all/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_18(res.data);
      })
    };
    const [sumcoefnote_18, setAllSumcoefnote_18] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_18();
    }, []);

    const fetchAllSumcoefnote_18 = () => {
        http.get('/sum/coef/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_18(res.data);
      })
    };

    const [sumfinalnote_18, setAllSumfinalnote_18] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_18();
    }, []);

    const fetchAllSumfinalnote_18 = () => {
        http.get('/sum/final/notes_18/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_18(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_19, setInfo_grp_19] = useState([]);
    useEffect(() => {
        fetchInfo_grp_19();
    }, []);
    
    const fetchInfo_grp_19 = () => {
        http.get('/info/groupe_19/' + etab).then(res => {
        setInfo_grp_19(res.data);
      })
    };
    
    const [allnote_19, setAllNote_19] = useState([]);
    useEffect(() => {
        fetchAllNote_19();
    }, []);

    const fetchAllNote_19 = () => {
        http.get('/all/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_19(res.data);
      })
    };
    
    const [sumallnote_19, setAllSumallnote_19] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_19();
    }, []);

    const fetchAllSumallnote_19 = () => {
        http.get('/sum/all/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_19(res.data);
      })
    };
    const [sumcoefnote_19, setAllSumcoefnote_19] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_19();
    }, []);

    const fetchAllSumcoefnote_19 = () => {
        http.get('/sum/coef/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_19(res.data);
      })
    };

    const [sumfinalnote_19, setAllSumfinalnote_19] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_19();
    }, []);

    const fetchAllSumfinalnote_19 = () => {
        http.get('/sum/final/notes_19/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_19(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_20, setInfo_grp_20] = useState([]);
    useEffect(() => {
        fetchInfo_grp_20();
    }, []);
    
    const fetchInfo_grp_20 = () => {
        http.get('/info/groupe_20/' + etab).then(res => {
        setInfo_grp_20(res.data);
      })
    };
    
    const [allnote_20, setAllNote_20] = useState([]);
    useEffect(() => {
        fetchAllNote_20();
    }, []);

    const fetchAllNote_20 = () => {
        http.get('/all/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_20(res.data);
      })
    };
    
    const [sumallnote_20, setAllSumallnote_20] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_20();
    }, []);

    const fetchAllSumallnote_20 = () => {
        http.get('/sum/all/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_20(res.data);
      })
    };
    const [sumcoefnote_20, setAllSumcoefnote_20] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_20();
    }, []);

    const fetchAllSumcoefnote_20 = () => {
        http.get('/sum/coef/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_20(res.data);
      })
    };

    const [sumfinalnote_20, setAllSumfinalnote_20] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_20();
    }, []);

    const fetchAllSumfinalnote_20 = () => {
        http.get('/sum/final/notes_20/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_20(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_21, setInfo_grp_21] = useState([]);
    useEffect(() => {
        fetchInfo_grp_21();
    }, []);
    
    const fetchInfo_grp_21 = () => {
        http.get('/info/groupe_21/' + etab).then(res => {
        setInfo_grp_21(res.data);
      })
    };
    
    const [allnote_21, setAllNote_21] = useState([]);
    useEffect(() => {
        fetchAllNote_21();
    }, []);

    const fetchAllNote_21 = () => {
        http.get('/all/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_21(res.data);
      })
    };
    
    const [sumallnote_21, setAllSumallnote_21] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_21();
    }, []);

    const fetchAllSumallnote_21 = () => {
        http.get('/sum/all/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_21(res.data);
      })
    };
    const [sumcoefnote_21, setAllSumcoefnote_21] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_21();
    }, []);

    const fetchAllSumcoefnote_21 = () => {
        http.get('/sum/coef/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_21(res.data);
      })
    };

    const [sumfinalnote_21, setAllSumfinalnote_21] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_21();
    }, []);

    const fetchAllSumfinalnote_21 = () => {
        http.get('/sum/final/notes_21/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_21(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_22, setInfo_grp_22] = useState([]);
    useEffect(() => {
        fetchInfo_grp_22();
    }, []);
    
    const fetchInfo_grp_22 = () => {
        http.get('/info/groupe_22/' + etab).then(res => {
        setInfo_grp_22(res.data);
      })
    };
    
    const [allnote_22, setAllNote_22] = useState([]);
    useEffect(() => {
        fetchAllNote_22();
    }, []);

    const fetchAllNote_22 = () => {
        http.get('/all/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_22(res.data);
      })
    };
    
    const [sumallnote_22, setAllSumallnote_22] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_22();
    }, []);

    const fetchAllSumallnote_22 = () => {
        http.get('/sum/all/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_22(res.data);
      })
    };
    const [sumcoefnote_22, setAllSumcoefnote_22] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_22();
    }, []);

    const fetchAllSumcoefnote_22 = () => {
        http.get('/sum/coef/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_22(res.data);
      })
    };

    const [sumfinalnote_22, setAllSumfinalnote_22] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_22();
    }, []);

    const fetchAllSumfinalnote_22 = () => {
        http.get('/sum/final/notes_22/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_22(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_23, setInfo_grp_23] = useState([]);
    useEffect(() => {
        fetchInfo_grp_23();
    }, []);
    
    const fetchInfo_grp_23 = () => {
        http.get('/info/groupe_23/' + etab).then(res => {
        setInfo_grp_23(res.data);
      })
    };
    
    const [allnote_23, setAllNote_23] = useState([]);
    useEffect(() => {
        fetchAllNote_23();
    }, []);

    const fetchAllNote_23 = () => {
        http.get('/all/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_23(res.data);
      })
    };
    
    const [sumallnote_23, setAllSumallnote_23] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_23();
    }, []);

    const fetchAllSumallnote_23 = () => {
        http.get('/sum/all/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_23(res.data);
      })
    };
    const [sumcoefnote_23, setAllSumcoefnote_23] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_23();
    }, []);

    const fetchAllSumcoefnote_23 = () => {
        http.get('/sum/coef/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_23(res.data);
      })
    };

    const [sumfinalnote_23, setAllSumfinalnote_23] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_23();
    }, []);

    const fetchAllSumfinalnote_23 = () => {
        http.get('/sum/final/notes_23/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_23(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_24, setInfo_grp_24] = useState([]);
    useEffect(() => {
        fetchInfo_grp_24();
    }, []);
    
    const fetchInfo_grp_24 = () => {
        http.get('/info/groupe_24/' + etab).then(res => {
        setInfo_grp_24(res.data);
      })
    };
    
    const [allnote_24, setAllNote_24] = useState([]);
    useEffect(() => {
        fetchAllNote_24();
    }, []);

    const fetchAllNote_24 = () => {
        http.get('/all/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_24(res.data);
      })
    };
    
    const [sumallnote_24, setAllSumallnote_24] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_24();
    }, []);

    const fetchAllSumallnote_24 = () => {
        http.get('/sum/all/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_24(res.data);
      })
    };
    const [sumcoefnote_24, setAllSumcoefnote_24] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_24();
    }, []);

    const fetchAllSumcoefnote_24 = () => {
        http.get('/sum/coef/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_24(res.data);
      })
    };

    const [sumfinalnote_24, setAllSumfinalnote_24] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_24();
    }, []);

    const fetchAllSumfinalnote_24 = () => {
        http.get('/sum/final/notes_24/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_24(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_25, setInfo_grp_25] = useState([]);
    useEffect(() => {
        fetchInfo_grp_25();
    }, []);
    
    const fetchInfo_grp_25 = () => {
        http.get('/info/groupe_25/' + etab).then(res => {
        setInfo_grp_25(res.data);
      })
    };
    
    const [allnote_25, setAllNote_25] = useState([]);
    useEffect(() => {
        fetchAllNote_25();
    }, []);

    const fetchAllNote_25 = () => {
        http.get('/all/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_25(res.data);
      })
    };
    
    const [sumallnote_25, setAllSumallnote_25] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_25();
    }, []);

    const fetchAllSumallnote_25 = () => {
        http.get('/sum/all/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_25(res.data);
      })
    };
    const [sumcoefnote_25, setAllSumcoefnote_25] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_25();
    }, []);

    const fetchAllSumcoefnote_25 = () => {
        http.get('/sum/coef/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_25(res.data);
      })
    };

    const [sumfinalnote_25, setAllSumfinalnote_25] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_25();
    }, []);

    const fetchAllSumfinalnote_25 = () => {
        http.get('/sum/final/notes_25/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_25(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_26, setInfo_grp_26] = useState([]);
    useEffect(() => {
        fetchInfo_grp_26();
    }, []);
    
    const fetchInfo_grp_26 = () => {
        http.get('/info/groupe_26/' + etab).then(res => {
        setInfo_grp_26(res.data);
      })
    };
    
    const [allnote_26, setAllNote_26] = useState([]);
    useEffect(() => {
        fetchAllNote_26();
    }, []);

    const fetchAllNote_26 = () => {
        http.get('/all/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_26(res.data);
      })
    };
    
    const [sumallnote_26, setAllSumallnote_26] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_26();
    }, []);

    const fetchAllSumallnote_26 = () => {
        http.get('/sum/all/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_26(res.data);
      })
    };
    const [sumcoefnote_26, setAllSumcoefnote_26] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_26();
    }, []);

    const fetchAllSumcoefnote_26 = () => {
        http.get('/sum/coef/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_26(res.data);
      })
    };

    const [sumfinalnote_26, setAllSumfinalnote_26] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_26();
    }, []);

    const fetchAllSumfinalnote_26 = () => {
        http.get('/sum/final/notes_26/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_26(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_27, setInfo_grp_27] = useState([]);
    useEffect(() => {
        fetchInfo_grp_27();
    }, []);
    
    const fetchInfo_grp_27 = () => {
        http.get('/info/groupe_27/' + etab).then(res => {
        setInfo_grp_27(res.data);
      })
    };
    
    const [allnote_27, setAllNote_27] = useState([]);
    useEffect(() => {
        fetchAllNote_27();
    }, []);

    const fetchAllNote_27 = () => {
        http.get('/all/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_27(res.data);
      })
    };
    
    const [sumallnote_27, setAllSumallnote_27] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_27();
    }, []);

    const fetchAllSumallnote_27 = () => {
        http.get('/sum/all/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_27(res.data);
      })
    };
    const [sumcoefnote_27, setAllSumcoefnote_27] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_27();
    }, []);

    const fetchAllSumcoefnote_27 = () => {
        http.get('/sum/coef/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_27(res.data);
      })
    };

    const [sumfinalnote_27, setAllSumfinalnote_27] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_27();
    }, []);

    const fetchAllSumfinalnote_27 = () => {
        http.get('/sum/final/notes_27/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_27(res.data);
      })
    }; 
     //////////////////////////////////////////////

       const [Info_grp_28, setInfo_grp_28] = useState([]);
    useEffect(() => {
        fetchInfo_grp_28();
    }, []);
    
    const fetchInfo_grp_28 = () => {
        http.get('/info/groupe_28/' + etab).then(res => {
        setInfo_grp_28(res.data);
      })
    };
    
    const [allnote_28, setAllNote_28] = useState([]);
    useEffect(() => {
        fetchAllNote_28();
    }, []);

    const fetchAllNote_28 = () => {
        http.get('/all/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_28(res.data);
      })
    };
    
    const [sumallnote_28, setAllSumallnote_28] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_28();
    }, []);

    const fetchAllSumallnote_28 = () => {
        http.get('/sum/all/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_28(res.data);
      })
    };
    const [sumcoefnote_28, setAllSumcoefnote_28] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_28();
    }, []);

    const fetchAllSumcoefnote_28 = () => {
        http.get('/sum/coef/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_28(res.data);
      })
    };

    const [sumfinalnote_28, setAllSumfinalnote_28] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_28();
    }, []);

    const fetchAllSumfinalnote_28 = () => {
        http.get('/sum/final/notes_28/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_28(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_29, setInfo_grp_29] = useState([]);
    useEffect(() => {
        fetchInfo_grp_29();
    }, []);
    
    const fetchInfo_grp_29 = () => {
        http.get('/info/groupe_29/' + etab).then(res => {
        setInfo_grp_29(res.data);
      })
    };
    
    const [allnote_29, setAllNote_29] = useState([]);
    useEffect(() => {
        fetchAllNote_29();
    }, []);

    const fetchAllNote_29 = () => {
        http.get('/all/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_29(res.data);
      })
    };
    
    const [sumallnote_29, setAllSumallnote_29] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_29();
    }, []);

    const fetchAllSumallnote_29 = () => {
        http.get('/sum/all/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_29(res.data);
      })
    };
    const [sumcoefnote_29, setAllSumcoefnote_29] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_29();
    }, []);

    const fetchAllSumcoefnote_29 = () => {
        http.get('/sum/coef/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_29(res.data);
      })
    };

    const [sumfinalnote_29, setAllSumfinalnote_29] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_29();
    }, []);

    const fetchAllSumfinalnote_29 = () => {
        http.get('/sum/final/notes_29/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_29(res.data);
      })
    };   
     //////////////////////////////////////////////

       const [Info_grp_30, setInfo_grp_30] = useState([]);
    useEffect(() => {
        fetchInfo_grp_30();
    }, []);
    
    const fetchInfo_grp_30 = () => {
        http.get('/info/groupe_30/' + etab).then(res => {
        setInfo_grp_30(res.data);
      })
    };
    
    const [allnote_30, setAllNote_30] = useState([]);
    useEffect(() => {
        fetchAllNote_30();
    }, []);

    const fetchAllNote_30 = () => {
        http.get('/all/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNote_30(res.data);
      })
    };
    
    const [sumallnote_30, setAllSumallnote_30] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_30();
    }, []);

    const fetchAllSumallnote_30 = () => {
        http.get('/sum/all/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumallnote_30(res.data);
      })
    };
    const [sumcoefnote_30, setAllSumcoefnote_30] = useState([]);
    useEffect(() => {
        fetchAllSumcoefnote_30();
    }, []);

    const fetchAllSumcoefnote_30 = () => {
        http.get('/sum/coef/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumcoefnote_30(res.data);
      })
    };

    const [sumfinalnote_30, setAllSumfinalnote_30] = useState([]);
    useEffect(() => {
        fetchAllSumfinalnote_30();
    }, []);

    const fetchAllSumfinalnote_30 = () => {
        http.get('/sum/final/notes_30/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllSumfinalnote_30(res.data);
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

    const [allnotespf, setAllNotespf] = useState([]);
    useEffect(() => {
        fetchAllNotespf();
    }, []);

    const fetchAllNotespf = () => {
        http.get('/all_notes_pf/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNotespf(res.data);
             
      })
    };

    const [allnotespa, setAllNotespa] = useState([]);
    useEffect(() => {
        fetchAllNotespa();
    }, []);

    const fetchAllNotespa = () => {
        http.get('/all_notes_pa/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
        setAllNotespa(res.data);
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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
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

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th>{sumcoefnote_1}</th>
                                                                        <th>{sumfinalnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
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

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th>{sumcoefnote_2}</th>
                                                                        <th>{sumfinalnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
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

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th>{sumcoefnote_3}</th>
                                                                        <th>{sumfinalnote_3}</th>
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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
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

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th>{sumcoefnote_1}</th>
                                                                        <th>{sumfinalnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
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

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th>{sumcoefnote_2}</th>
                                                                        <th>{sumfinalnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
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

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th>{sumcoefnote_3}</th>
                                                                        <th>{sumfinalnote_3}</th>
                                                                        <th></th>

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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_4.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_4.intitule_groupe}</th>
                                                                        <th>{sumallnote_4}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_5.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_5.intitule_groupe}</th>
                                                                        <th>{sumallnote_5}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_6.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_6.intitule_groupe}</th>
                                                                        <th>{sumallnote_6}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_7.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_7.intitule_groupe}</th>
                                                                        <th>{sumallnote_7}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_8.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_8.intitule_groupe}</th>
                                                                        <th>{sumallnote_8}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_9.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_9.intitule_groupe}</th>
                                                                        <th>{sumallnote_9}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_10.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_10.intitule_groupe}</th>
                                                                        <th>{sumallnote_10}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_11.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_11.intitule_groupe}</th>
                                                                        <th>{sumallnote_11}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_12.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_12.intitule_groupe}</th>
                                                                        <th>{sumallnote_12}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_13.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_13.intitule_groupe}</th>
                                                                        <th>{sumallnote_13}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_14.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_14.intitule_groupe}</th>
                                                                        <th>{sumallnote_14}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_15.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_15.intitule_groupe}</th>
                                                                        <th>{sumallnote_15}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                  <tbody>
                                                                   
                                                                {allnote_16.map((item, grp_16) => (
                                                                    <tr key={grp_16}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_16.intitule_groupe}</th>
                                                                        <th>{sumallnote_16}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                  <tbody>
                                                                   
                                                                {allnote_17.map((item, grp_17) => (
                                                                    <tr key={grp_17}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_17.intitule_groupe}</th>
                                                                        <th>{sumallnote_17}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_18.map((item, grp_18) => (
                                                                    <tr key={grp_18}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_18.intitule_groupe}</th>
                                                                        <th>{sumallnote_18}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_19.map((item, grp_19) => (
                                                                    <tr key={grp_19}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_19.intitule_groupe}</th>
                                                                        <th>{sumallnote_19}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_20.map((item, grp_20) => (
                                                                    <tr key={grp_20}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_20.intitule_groupe}</th>
                                                                        <th>{sumallnote_20}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_21.map((item, grp_21) => (
                                                                    <tr key={grp_21}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_21.intitule_groupe}</th>
                                                                        <th>{sumallnote_21}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_22.map((item, grp_22) => (
                                                                    <tr key={grp_22}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_22.intitule_groupe}</th>
                                                                        <th>{sumallnote_22}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_23.map((item, grp_23) => (
                                                                    <tr key={grp_23}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_23.intitule_groupe}</th>
                                                                        <th>{sumallnote_23}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_24.map((item, grp_24) => (
                                                                    <tr key={grp_24}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_24.intitule_groupe}</th>
                                                                        <th>{sumallnote_24}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_25.map((item, grp_25) => (
                                                                    <tr key={grp_25}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_25.intitule_groupe}</th>
                                                                        <th>{sumallnote_25}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_26.map((item, grp_26) => (
                                                                    <tr key={grp_26}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_26.intitule_groupe}</th>
                                                                        <th>{sumallnote_26}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_27.map((item, grp_27) => (
                                                                    <tr key={grp_27}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_27.intitule_groupe}</th>
                                                                        <th>{sumallnote_27}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_28.map((item, grp_28) => (
                                                                    <tr key={grp_28}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_28.intitule_groupe}</th>
                                                                        <th>{sumallnote_28}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_29.map((item, grp_29) => (
                                                                    <tr key={grp_29}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_29.intitule_groupe}</th>
                                                                        <th>{sumallnote_29}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_30.map((item, grp_30) => (
                                                                    <tr key={grp_30}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_30.intitule_groupe}</th>
                                                                        <th>{sumallnote_30}</th>
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
                                                                        <th>Evaluation</th>
                                                                        <th>Notes</th>
                                                                        <th>Appréciation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {allnotespf.map((item, pf) => (
                                                                        <tr key={pf}>
                                                                          
                                                                            <td>{item.matiere_note}</td>
                                                                            <td>{item.competence_visee_note}</td>
                                                                            <td>{item.valeur_note}</td>
                                                                            <td>{item.appreciation_note}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>

                                                          
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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_4.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_4.intitule_groupe}</th>
                                                                        <th>{sumallnote_4}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_5.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_5.intitule_groupe}</th>
                                                                        <th>{sumallnote_5}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_6.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_6.intitule_groupe}</th>
                                                                        <th>{sumallnote_6}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_7.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_7.intitule_groupe}</th>
                                                                        <th>{sumallnote_7}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_8.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_8.intitule_groupe}</th>
                                                                        <th>{sumallnote_8}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_9.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_9.intitule_groupe}</th>
                                                                        <th>{sumallnote_9}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_10.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_10.intitule_groupe}</th>
                                                                        <th>{sumallnote_10}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_11.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_11.intitule_groupe}</th>
                                                                        <th>{sumallnote_11}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_12.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_12.intitule_groupe}</th>
                                                                        <th>{sumallnote_12}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_13.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_13.intitule_groupe}</th>
                                                                        <th>{sumallnote_13}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_14.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_14.intitule_groupe}</th>
                                                                        <th>{sumallnote_14}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_15.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_15.intitule_groupe}</th>
                                                                        <th>{sumallnote_15}</th>
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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_4.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_4.intitule_groupe}</th>
                                                                        <th>{sumallnote_4}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_5.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_5.intitule_groupe}</th>
                                                                        <th>{sumallnote_5}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_6.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_6.intitule_groupe}</th>
                                                                        <th>{sumallnote_6}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_7.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_7.intitule_groupe}</th>
                                                                        <th>{sumallnote_7}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_8.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_8.intitule_groupe}</th>
                                                                        <th>{sumallnote_8}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_9.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_9.intitule_groupe}</th>
                                                                        <th>{sumallnote_9}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_10.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_10.intitule_groupe}</th>
                                                                        <th>{sumallnote_10}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_11.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_11.intitule_groupe}</th>
                                                                        <th>{sumallnote_11}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_12.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_12.intitule_groupe}</th>
                                                                        <th>{sumallnote_12}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_13.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_13.intitule_groupe}</th>
                                                                        <th>{sumallnote_13}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_14.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_14.intitule_groupe}</th>
                                                                        <th>{sumallnote_14}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_15.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_15.intitule_groupe}</th>
                                                                        <th>{sumallnote_15}</th>
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
                                                                    <th>Mark</th>
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                            <tbody>
                                                                {allnotespa.map((item, pa) => (
                                                                    <tr key={pa}>
                                                                       <td>{item.matiere_note}</td>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>

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
                                                                    <th>Evaluation</th>
                                                                    <th>Mark</th>
                                                                    <th>Appreciation</th>
                                                                </tr>
                                                                </thead>
                                                            <tbody>
                                                                {allnotespa.map((item, pa) => (
                                                                    <tr key={pa}>  
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>

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
                                                                   
                                                                {allnote_1.map((item, grp_1) => (
                                                                    <tr key={grp_1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_1.intitule_groupe}</th>
                                                                        <th>{sumallnote_1}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                   
                                                                {allnote_2.map((item, grp_2) => (
                                                                    <tr key={grp_2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_2.intitule_groupe}</th>
                                                                        <th>{sumallnote_2}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                              <tbody>
                                                                   
                                                                {allnote_3.map((item, grp_3) => (
                                                                    <tr key={grp_3}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_3.intitule_groupe}</th>
                                                                        <th>{sumallnote_3}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_4.map((item, grp_4) => (
                                                                    <tr key={grp_4}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_4.intitule_groupe}</th>
                                                                        <th>{sumallnote_4}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_5.map((item, grp_5) => (
                                                                    <tr key={grp_5}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_5.intitule_groupe}</th>
                                                                        <th>{sumallnote_5}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_6.map((item, grp_6) => (
                                                                    <tr key={grp_6}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_6.intitule_groupe}</th>
                                                                        <th>{sumallnote_6}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_7.map((item, grp_7) => (
                                                                    <tr key={grp_7}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_7.intitule_groupe}</th>
                                                                        <th>{sumallnote_7}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_8.map((item, grp_8) => (
                                                                    <tr key={grp_8}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_8.intitule_groupe}</th>
                                                                        <th>{sumallnote_8}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_9.map((item, grp_9) => (
                                                                    <tr key={grp_9}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_9.intitule_groupe}</th>
                                                                        <th>{sumallnote_9}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_10.map((item, grp_10) => (
                                                                    <tr key={grp_10}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_10.intitule_groupe}</th>
                                                                        <th>{sumallnote_10}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                   
                                                                {allnote_11.map((item, grp_11) => (
                                                                    <tr key={grp_11}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_11.intitule_groupe}</th>
                                                                        <th>{sumallnote_11}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                                     <tbody>
                                                                   
                                                                {allnote_12.map((item, grp_12) => (
                                                                    <tr key={grp_12}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_12.intitule_groupe}</th>
                                                                        <th>{sumallnote_12}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_13.map((item, grp_13) => (
                                                                    <tr key={grp_13}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_13.intitule_groupe}</th>
                                                                        <th>{sumallnote_13}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                   
                                                                {allnote_14.map((item, grp_14) => (
                                                                    <tr key={grp_14}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_14.intitule_groupe}</th>
                                                                        <th>{sumallnote_14}</th>
                                                                        <th></th>

                                                                    </tr>
                                                                </thead>
                                                             <tbody>
                                                                   
                                                                {allnote_15.map((item, grp_15) => (
                                                                    <tr key={grp_15}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{Info_grp_15.intitule_groupe}</th>
                                                                        <th>{sumallnote_15}</th>
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
                                                                    <th>Evaluation</th>
                                                                    <th>Note</th>
                                                                    <th>Appreciation</th>
                                                                    <th>/</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allnotes.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.competence_visee_note}</td>
                                                                        <td>{getEmojiForNote(item.valeur_note)}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>

                                                                
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
