import React, { useEffect, useState } from 'react';
import './index.css';
import { isColorLight } from '../../utils/isColorLight';

export function Tag({ background, id, lbl, quant }) {
    
    return (
        <div id={id} className={`Tag ${isColorLight(background) ? 'contraste' : ''}`} style={{ background: background }}>
            <div className='labelTag'>{lbl}</div> <div className='quantTag'>{quant}</div>
        </div>
    );
}
