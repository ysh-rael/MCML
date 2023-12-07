import './index.css'
import React, { useState } from "react";
import { Bttn } from "../Bttn";
import { handlerOnClick } from "./handler/index.js";

export function BttnBar({ }) {
    const [bttnBar, setBttnBar] = useState('fa-solid fa-bars-staggered');

    return <Bttn id={'BttnBar'} userStatedIcon={bttnBar} background='is-info is-light' onClick={ event => handlerOnClick(event, bttnBar, setBttnBar) } />
} 