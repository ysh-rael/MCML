import { findChild } from '../../utils/findChild';
import { isColorLight } from '../../utils/isColorLight';
import { Bttn } from '../Bttn';
import { generatorTag } from './generatorTag';
import { deleteThis, editLabel, hiddenInpt, nextImgIndex } from './handler';
import { useInitComponent, useLabelTag, useQuantTag } from './hooks';
import { increaseThis } from './increaseThis';
import './index.css';
import { useEffect, useRef, useState } from 'react';



let stop = false
export function DropArea({ label, background, tags, setTags, setImgIndex, ImgIndex, Imgs, setImgs }) {
    const [lbl, setLbl] = useState('');
    const [id, setId] = useState(null);
    const [quant, setQuant] = useState(0);

    const inputRef = useRef(null);
    const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={(event) => editLabel(event, lbl, setLbl)}></i>;

    useInitComponent({ setLbl, label, id, setId, stop, lbl, background, tags, setTags, quant })
    useLabelTag({ lbl, id })
    useQuantTag({ quant, id })


    function update(event) {
        nextImgIndex({ event, setImgIndex, setQuant, id })
        increaseThis(id)
    }


    return (
        <div className={`DropArea`}
            style={{ background: background }}
            draggable={false} id={`DropArea-${id}`}
            onDragOver={event => event.preventDefault()}
            onDrop={update}
        //onClick={nextImgIndex}
        >
            <input
                type='hidden'
                className='inptEditLabelDropArea input'
                value={lbl}
                ref={inputRef}
                onChange={(event) => setLbl(event.target.value)}
                onBlur={hiddenInpt}
            />
            <span className={`labelDropArea subtitle ${isColorLight(background) ? 'contraste' : ''}`}>{iconPincel} {lbl}</span>
            <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} id={id} setTags={setTags} tags={tags} onClick={() => deleteThis(id)} />
        </div>
    );
}
