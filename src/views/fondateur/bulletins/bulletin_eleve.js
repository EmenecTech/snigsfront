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

  

 const [allind, setAllInd] = useState([]);
    useEffect(() => {
        fetchAllInd();  
    }, []); 

    const fetchAllInd = () => {
        http.get('/get_ind_for_mat/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd(res.data);
        }); 
    };

    const [allind1, setAllInd1] = useState([]);
    useEffect(() => {
        fetchAllInd1();  
    }, []); 

    const fetchAllInd1 = () => {
        http.get('/get_ind_for_mat1/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd1(res.data);
        }); 
    };

    const [allind2, setAllInd2] = useState([]);
    useEffect(() => {
        fetchAllInd2();  
    }, []); 

    const fetchAllInd2 = () => {
        http.get('/get_ind_for_mat2/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd2(res.data);
        }); 
    };


    const [allind3, setAllInd3] = useState([]);
    useEffect(() => {
        fetchAllInd3();  
    }, []); 

    const fetchAllInd3 = () => {
        http.get('/get_ind_for_mat3/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd3(res.data);
        }); 
    };


    const [allind4, setAllInd4] = useState([]);
    useEffect(() => {
        fetchAllInd4();  
    }, []); 

    const fetchAllInd4 = () => {
        http.get('/get_ind_for_mat4/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd4(res.data);
        }); 
    };

    
    const [allind5, setAllInd5] = useState([]);
    useEffect(() => {
        fetchAllInd5();  
    }, []); 

    const fetchAllInd5 = () => {
        http.get('/get_ind_for_mat5/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd5(res.data);
        }); 
    };

    
    const [allind6, setAllInd6] = useState([]);
    useEffect(() => {
        fetchAllInd6();  
    }, []); 

    const fetchAllInd6 = () => {
        http.get('/get_ind_for_mat6/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd6(res.data);
        }); 
    };

    const [allind7, setAllInd7] = useState([]);
    useEffect(() => {
        fetchAllInd7();  
    }, []); 

    const fetchAllInd7 = () => {
        http.get('/get_ind_for_mat7/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd7(res.data);
        }); 
    };

    const [allind8, setAllInd8] = useState([]);
    useEffect(() => {
        fetchAllInd8();  
    }, []); 

    const fetchAllInd8 = () => {
        http.get('/get_ind_for_mat8/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd8(res.data);
        }); 
    };
    
    const [allind9, setAllInd9] = useState([]);
    useEffect(() => {
        fetchAllInd9();  
    }, []); 

    const fetchAllInd9 = () => {
        http.get('/get_ind_for_mat9/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd9(res.data);
        }); 
    };

    const [allind10, setAllInd10] = useState([]);
    useEffect(() => {
        fetchAllInd10();  
    }, []); 

    const fetchAllInd10 = () => {
        http.get('/get_ind_for_mat10/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd10(res.data);
        }); 
    };
    
    const [allind11, setAllInd11] = useState([]);
    useEffect(() => {
        fetchAllInd11();  
    }, []); 

    const fetchAllInd11 = () => {
        http.get('/get_ind_for_mat11/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd11(res.data);
        }); 
    };

      const [allind12, setAllInd12] = useState([]);
    useEffect(() => {
        fetchAllInd12();  
    }, []); 

    const fetchAllInd12 = () => {
        http.get('/get_ind_for_mat12/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd12(res.data);
        }); 
    };

        const [allind13, setAllInd13] = useState([]);
    useEffect(() => {
        fetchAllInd12();  
    }, []); 

    const fetchAllInd13 = () => {
        http.get('/get_ind_for_mat13/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd13(res.data);
        }); 
    };

        const [allind14, setAllInd14] = useState([]);
    useEffect(() => {
        fetchAllInd14();  
    }, []); 

    const fetchAllInd14 = () => {
        http.get('/get_ind_for_mat14/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd14(res.data);
        }); 
    };

    const [allind15, setAllInd15] = useState([]);
    useEffect(() => {
        fetchAllInd15();  
    }, []); 

    const fetchAllInd15 = () => {
        http.get('/get_ind_for_mat15/' + etab + "/" + niveau + "/" + classe).then(res => {
            setAllInd15(res.data);
        }); 
    };

     const [allnotessf, setAllNotessf] = useState([]);
    useEffect(() => {
        fetchAllNotessf();
    }, []);

    const fetchAllNotessf = () => {
        http.get('/all_notes_sf/' + etab + '/' + classe + "/" + evaluation + '/Groupe 1/' + userid).then(res => {
        setAllNotessf(res.data);
      })
    };

    


 const [allnotesgr2, setAllNotesgr2] = useState([]);
useEffect(() => {
    fetchAllNotesgr2();
}, []);

const fetchAllNotesgr2 = () => {
    http.get('/all_notes_gr2/' + etab + '/' + classe + "/" + evaluation + '/Groupe 2/' + userid).then(res => {
    setAllNotesgr2(res.data);
  })
};

 const [allnotesgr3, setAllNotesgr3] = useState([]);
useEffect(() => {
    fetchAllNotesgr3();
}, []);

const fetchAllNotesgr3 = () => {
    http.get('/all_notes_gr3/' + etab + '/' + classe + "/" + evaluation + '/Groupe 3/' + userid).then(res => {
    setAllNotesgr3(res.data);
  })
};

 const [allnotesgr4, setAllNotesgr4] = useState([]);
useEffect(() => {
    fetchInfo_grp_1();
}, []);

const fetchAllNotesgr4 = () => {
    http.get('/all_notes_gr4/' + etab + '/' + classe + "/" + evaluation + '/Groupe 4/' + userid).then(res => {
    setAllNotesgr4(res.data);
  })
};
    console.log(

const [allnotesgr5, setAllNotesgr5] = useState([]);
useEffect(() => {
    fetchAllNotesgr5();
}, []);

const fetchAllNotesgr5 = () => {
    http.get('/all_notes_gr5/' + etab + '/' + classe + "/" + evaluation + '/Groupe 5/' + userid).then(res => {
    setAllNotesgr5(res.data);
  })
};

const [allnotesgr6, setAllNotesgr6] = useState([]);
useEffect(() => {
    fetchAllNotesgr6();
}, []);

const fetchAllNotesgr6 = () => {
    http.get('/all_notes_gr6/' + etab + '/' + classe + "/" + evaluation + '/Groupe 6/' + userid).then(res => {
    setAllNotesgr6(res.data);
  })
};

const [allnotesgr7, setAllNotesgr7] = useState([]);
useEffect(() => {
    fetchAllNotesgr7();
}, []);

const fetchAllNotesgr7= () => {
    http.get('/all_notes_gr7/' + etab + '/' + classe + "/" + evaluation + '/Groupe 7/' + userid).then(res => {
    setAllNotesgr7(res.data);
  })
};


 const [allnotesgr8, setAllNotesgr8] = useState([]);
useEffect(() => {
    fetchAllNotesgr8();
}, []);

const fetchAllNotesgr8 = () => {
    http.get('/all_notes_gr8/' + etab + '/' + classe + "/" + evaluation + '/Groupe 8/' + userid).then(res => {
    setAllNotesgr8(res.data);
  })
};

 const [allnotesgr9, setAllNotesgr9] = useState([]);
useEffect(() => {
    fetchAllNotesgr9();
}, []);

const fetchAllNotesgr9 = () => {
    http.get('/all_notes_gr9/' + etab + '/' + classe + "/" + evaluation + '/Groupe 9/' + userid).then(res => {
    setAllNotesgr9(res.data);
  })
};

 const [Info_grp_10, setInfo_grp_10] = useState([]);
useEffect(() => {
    fetchInfo_grp_10();
}, []);

const fetchInfo_grp_10 = () => {
    http.get('/all_notes_gr10/' + etab + '/' + classe + "/" + evaluation + '/Groupe 10/' + userid).then(res => {
    setInfo_grp_10(res.data);
  })
};

 const [Info_grp_11, setInfo_grp_11] = useState([]);
useEffect(() => {
    fetchInfo_grp_11();
}, []);

const fetchInfo_grp_11 = () => {
    http.get('/all_notes_gr11/' + etab + '/' + classe + "/" + evaluation + '/Groupe 11/' + userid).then(res => {
    setInfo_grp_11(res.data);
  })
};

 const [Info_grp_12, setInfo_grp_12] = useState([]);
useEffect(() => {
    fetchInfo_grp_12();
}, []);

const fetchInfo_grp_12 = () => {
    http.get('/all_notes_gr12/' + etab + '/' + classe + "/" + evaluation + '/Groupe 12/' + userid).then(res => {
    setInfo_grp_12(res.data);
  })
};

 const [Info_grp_13, setInfo_grp_13] = useState([]);
useEffect(() => {
    fetchInfo_grp_13();
}, []);

const fetchInfo_grp_13 = () => {
    http.get('/all_notes_gr13/' + etab + '/' + classe + "/" + evaluation + '/Groupe 13/' + userid).then(res => {
    setInfo_grp_13(res.data);
  })
};

 const [Info_grp_14, setInfo_grp_14] = useState([]);
useEffect(() => {
    fetchInfo_grp_14();
}, []);

const fetchInfo_grp_14 = () => {
    http.get('/all_notes_gr14/' + etab + '/' + classe + "/" + evaluation + '/Groupe 14/' + userid).then(res => {
    setInfo_grp_14(res.data);
  })
};

 const [Info_grp_15, setInfo_grp_15] = useState([]);
useEffect(() => {
    fetchInfo_grp_15();
}, []);

const fetchInfo_grp_15 = () => {
    http.get('/all_notes_gr15/' + etab + '/' + classe + "/" + evaluation + '/Groupe 15/' + userid).then(res => {
    setInfo_grp_15(res.data);
  })
};

 const [Info_grp_16, setInfo_grp_16] = useState([]);
useEffect(() => {
    fetchInfo_grp_16();
}, []);

const fetchInfo_grp_16 = () => {
    http.get('/all_notes_gr16/' + etab + '/' + classe + "/" + evaluation + '/Groupe 16/' + userid).then(res => {
    setInfo_grp_16(res.data);
  })
};

 const [Info_grp_17, setInfo_grp_17] = useState([]);
useEffect(() => {
    fetchInfo_grp_17();
}, []);

const fetchInfo_grp_17 = () => {
    http.get('/all_notes_gr17/' + etab + '/' + classe + "/" + evaluation + '/Groupe 17/' + userid).then(res => {
    setInfo_grp_17(res.data);
  })
};

 const [Info_grp_18, setInfo_grp_18] = useState([]);
useEffect(() => {
    fetchInfo_grp_18();
}, []);

const fetchInfo_grp_18 = () => {
    http.get('/all_notes_gr18/' + etab + '/' + classe + "/" + evaluation + '/Groupe 18/' + userid).then(res => {
    setInfo_grp_18(res.data);
  })
};

 const [Info_grp_19, setInfo_grp_19] = useState([]);
useEffect(() => {
    fetchInfo_grp_19();
}, []);

const fetchInfo_grp_19 = () => {
    http.get('/all_notes_gr19/' + etab + '/' + classe + "/" + evaluation + '/Groupe 19/' + userid).then(res => {
    setInfo_grp_19(res.data);
  })
};

 const [allnotesgr20, setAllNotesgr20] = useState([]);
useEffect(() => {
    fetchAllNotesgr20();
}, []);

const fetchAllNotesgr20 = () => {
    http.get('/all_notes_gr20/' + etab + '/' + classe + "/" + evaluation + '/Groupe 20/' + userid).then(res => {
    setAllNotesgr20(res.data);
  })
};

const [allnotesgr21, setAllNotesgr21] = useState([]);
useEffect(() => {
    fetchAllNotesgr21();
}, []);

const fetchAllNotesgr21 = () => {
    http.get('/all_notes_gr21/' + etab + '/' + classe + "/" + evaluation + '/Groupe 21/' + userid).then(res => {
    setAllNotesgr20(res.data);
  })
};

const [allnotesgr22, setAllNotesgr22] = useState([]);
useEffect(() => {
    fetchAllNotesgr22();
}, []);

const fetchAllNotesgr22 = () => {
    http.get('/all_notes_gr22/' + etab + '/' + classe + "/" + evaluation + '/Groupe 22/' + userid).then(res => {
    setAllNotesgr21(res.data);
  })
};

const [allnotesgr23, setAllNotesgr23] = useState([]);
useEffect(() => {
    fetchAllNotesgr23();
}, []);

const fetchAllNotesgr23 = () => {
    http.get('/all_notes_gr23/' + etab + '/' + classe + "/" + evaluation + '/Groupe 23/' + userid).then(res => {
    setAllNotesgr23(res.data);
  })
};

const [allnotesgr24, setAllNotesgr24] = useState([]);
useEffect(() => {
    fetchAllNotesgr24();
}, []);

const fetchAllNotesgr24 = () => {
    http.get('/all_notes_gr24/' + etab + '/' + classe + "/" + evaluation + '/Groupe 24/' + userid).then(res => {
    setAllNotesgr20(res.data);
  })
};

const [allnotesgr25, setAllNotesgr25] = useState([]);
useEffect(() => {
    fetchAllNotesgr25();
}, []);

const fetchAllNotesgr25 = () => {
    http.get('/all_notes_gr25/' + etab + '/' + classe + "/" + evaluation + '/Groupe 25/' + userid).then(res => {
    setAllNotesgr25(res.data);
  })
};


const [allnotesgr26, setAllNotesgr26] = useState([]);
useEffect(() => {
    fetchAllNotesgr26();
}, []);

const fetchAllNotesgr26 = () => {
    http.get('/all_notes_gr26/' + etab + '/' + classe + "/" + evaluation + '/Groupe 26/' + userid).then(res => {
    setAllNotesgr26(res.data);
  })
};

const [allnotesgr27, setAllNotesgr27] = useState([]);
useEffect(() => {
    fetchAllNotesgr27();
}, []);

const fetchAllNotesgr27 = () => {
    http.get('/all_notes_gr27/' + etab + '/' + classe + "/" + evaluation + '/Groupe 27/' + userid).then(res => {
    setAllNotesgr27(res.data);
  })
};

const [allnotesgr28, setAllNotesgr28] = useState([]);
useEffect(() => {
    fetchAllNotesgr28();
}, []);

const fetchAllNotesgr28 = () => {
    http.get('/all_notes_gr28/' + etab + '/' + classe + "/" + evaluation + '/Groupe 28/' + userid).then(res => {
    setAllNotesgr28(res.data);
  })
};

const [allnotesgr29, setAllNotesgr29] = useState([]);
useEffect(() => {
    fetchAllNotesgr29();
}, []);

const fetchAllNotesgr29 = () => {
    http.get('/all_notes_gr29/' + etab + '/' + classe + "/" + evaluation + '/Groupe 29/' + userid).then(res => {
    setAllNotesgr29(res.data);
  })
};

const [allnotesgr30, setAllNotesgr30] = useState([]);
useEffect(() => {
    fetchAllNotesgr30();
}, []);

const fetchAllNotesgr30 = () => {
    http.get('/all_notes_gr30/' + etab + '/' + classe + "/" + evaluation + '/Groupe 30/' + userid).then(res => {
    setAllNotesgr30(res.data);
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
    
    



    ////////////////////////////////
    const [Info_grp_1, setInfo_grp_1] = useState([]);
    useEffect(() => {
        fetchInfo_grp_1();
    }, []);
     console.log(Info_grp_1);
    const fetchInfo_grp_1 = () => {
        http.get('/info/groupe_1/' + etab + '/Groupe 1/').then(res => {
        setInfo_grp_1(res.data);
      })
    };
    const [allnote_1, setAllNote_1] = useState([]);
    useEffect(() => {
        fetchAllNote_1();
    }, []);

    const fetchAllNote_1 = () => {
        http.get('/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/Groupe 1/' + userid).then(res => {
        setAllNote_1(res.data);
      })
    };
    
    const [sumallnote_1, setAllSumallnote_1] = useState([]);
    useEffect(() => {
        fetchAllSumallnote_1();
    }, []);

    const fetchAllSumallnote_1 = () => {
        http.get('/sum/all/notes_1/' + etab + '/' + classe + "/" + evaluation + '/Groupe 1/' + userid).then(res => {
        setAllSumallnote_1(res.data);
      })
    };
        
    //////////////////////////////////////////////

    

      const [allnotessf1, setAllNotessf1] = useState([]);
    useEffect(() => {
        fetchAllNotessf1();
    }, []);

    const fetchAllNotessf1 = () => {
        http.get('/all_notes_sf1/' + etab + '/' + classe + "/" + evaluation + '/Groupe 2/' + userid).then(res => {
        setAllNotessf1(res.data);
      })
    };

      const [allnotessf2, setAllNotessf2] = useState([]);
    useEffect(() => {
        fetchAllNotessf2();
    }, []);

    const fetchAllNotessf2 = () => {
        http.get('/all_notes_sf2/' + etab + '/' + classe + "/" + evaluation + '/Groupe 3/' + userid).then(res => {
        setAllNotessf2(res.data);
      })
    };

     const [sumnotes, setsumnotes] = useState([]);
    useEffect(() => {
        fetchAllsumnotes();
    }, []);

    const fetchAllsumnotes = () => {
        http.get('/sum/of/notes/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setsumnotes(res.data);

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

    
    {/*const [notesfg, setNotesfg] = useState([]);
    useEffect(() => {
        fetchAllNotesfg();
    }, []);

    const fetchAllNotesfg = () => {
        http.get('/notes_fristgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesfg(res.data);

        })
    }

    const [notessg, setNotessg] = useState([]);
    useEffect(() => {
        fetchAllNotessg();
    }, []);

    const fetchAllNotessg = () => {
        http.get('/notes_secondgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotessg(res.data);

        })
    }

    const [notestg, setNotestg] = useState([]);
    useEffect(() => {
        fetchAllNotestg();
    }, []);

    const fetchAllNotestg = () => {
        http.get('/notes_thirdgroupe/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotestg(res.data);

        })
    }

   

    ////primaire

    const [notesfr, setNotesfr] = useState([]);
    useEffect(() => {
        fetchAllNotesfr();
    }, []);

    const fetchAllNotesfr = () => {
        http.get('/notes_francais/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesfr(res.data);

        })
    }

    const [notesmath, setNotesmath] = useState([]);
    useEffect(() => {
        fetchAllNotesmath();
    }, []);

    const fetchAllNotesmath = () => {
        http.get('/notes_maths/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesmath(res.data);

        })
    }

    const [notesang, setNotesang] = useState([]);
    useEffect(() => {
        fetchAllNotesang();
    }, []);

    const fetchAllNotesang = () => {
        http.get('/notes_ang/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesang(res.data);

        })
    }

    const [notessee, setNotessee] = useState([]);
    useEffect(() => {
        fetchAllNotessee();
    }, []);

    const fetchAllNotessee = () => {
        http.get('/notes_see/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotessee(res.data);

        })
    }


    const [notesshs, setNotesshs] = useState([]);
    useEffect(() => {
        fetchAllNotesshs();
    }, []);

    const fetchAllNotesshs = () => {
        http.get('/notes_shs/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotesshs(res.data);

        })
    }


    const [notescg, setNotescg] = useState([]);
    useEffect(() => {
        fetchAllNotescg();
    }, []);

    const fetchAllNotescg = () => {
        http.get('/notes_cg/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotescg(res.data);

        })
    }
*/}

    ////primary
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

    console.log(moyenneleve);
     console.log(sumcoef);



    console.log(sumnotes);


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
                                                                        <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col sm="12">
                                                                    <div className="container text-center">
                                                                        <p>Nom de l'établissement
                                                                            <br />
                                                                            <smal>BP: Tel:</smal>
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
                                                                Intitulé du bulletin
                                                                <hr />
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

                                                                        <th>{Info_grp_1.num_groupe}</th>

                                                                    </tr>
                                                                </thead>
{/*       <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
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

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
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

                                                                        <th>{allind2.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead> */}

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
                                                                        <Image className="theme-color-default-img  rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-purple-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-blue-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-green-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-yellow-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                        <Image className="theme-color-pink-img rounded avatar-130 img-fluid" src={image2} alt="profile-pic" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col sm="12">
                                                                    <div className="container text-center">
                                                                        <p>Nom de l'établissement
                                                                            <br />
                                                                            <smal>BP: Tel:</smal>
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
                                                               Title :
                                                                <hr />
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
                                                                   
                                                                {allnotessf.map((item, sf) => (
                                                                    <tr key={sf}>
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

                                                                        <th>{allind.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
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

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
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

                                                                        <th>{allind2.intitule_groupe}</th>

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
                                                                   
                                                                {allnotessf.map((item, sf) => (
                                                                    <tr key={sf}>
                                                                       <td>{item.matiere_note}</td>
                                                                       <td>{item.valeur_note}</td>
                                                                       <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>    
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td> 
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind2.intitule_groupe}</th>

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
                                                                   
                                                                {allnotessf.map((item, sf) => (
                                                                    <tr key={sf}>
                                                                       <td>{item.matiere_note}</td>
                                                                       <td>{item.valeur_note}</td>
                                                                       <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
                                                                        <td>{item.matiere_note}</td>
                                                                        <td>{item.valeur_note}</td>
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
                                                                        <td>{item.matiere_note}</td>
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
                                                                   
                                                                {allnotessf.map((item, sf) => (
                                                                    <tr key={sf}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                     
                                                                       
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
                                                                        <td>{item.matiere_note}</td>
                                                                  
                                                                        <td>{item.valeur_note}</td>
                                                                      
                                                                        
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
                                                                        <td>{item.matiere_note}</td>
                                                                     
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
                                                                   
                                                                {allnotessf.map((item, sf) => (
                                                                    <tr key={sf}>
                                                                        <td>{item.matiere_note}</td>
                                                                      
                                                                        <td>{item.valeur_note}</td>
                                                                     
                                                                       
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf1.map((item, sf1) => (
                                                                    <tr key={sf1}>
                                                                        <td>{item.matiere_note}</td>
                                                                  
                                                                        <td>{item.valeur_note}</td>
                                                                      
                                                                        
                                                                        <td>{item.appreciation_note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                               <thead>
                                                                    <tr>

                                                                        <th>{allind1.intitule_groupe}</th>

                                                                    </tr>
                                                                </thead>
                                                                 <tbody>
                                                                   
                                                                {allnotessf2.map((item, sf2) => (
                                                                    <tr key={sf2}>
                                                                        <td>{item.matiere_note}</td>
                                                                     
                                                                        <td>{item.valeur_note}</td>
                                                                        
                                                                        
                                                                        <td>{item.appreciation_note}</td>
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
