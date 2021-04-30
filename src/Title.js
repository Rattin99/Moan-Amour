import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'

const Title = () => {
    return ( 
        <div className="title-container">
            <div className="title">
               <div className="name">
               <p className="moan">
                    moan
                </p>
                <p className="amour">
                    amour
                </p>
               </div>
                <Link to = '/Business'><FontAwesomeIcon  className="play" icon ={faPlayCircle}></FontAwesomeIcon></Link>
            </div>
           
        </div>
     );
}
 
export default Title;