import { findChild } from '../../utils/findChild';
import { isColorLight } from '../../utils/isColorLight';
import { Bttn } from '../Bttn';
import { generatorTag } from './generatorTag';
import { blur, deleteThis, editLabel, hiddenInpt, nextImgIndex, update } from './handler';
import { useInitComponent, useLabelTag, useQuantTag } from './hooks';
import './index.css';
import { useEffect, useRef, useState } from 'react';



export function DropArea({ label, background, tags, setTags, setImgIndex, ImgIndex, Imgs, setImgs, Elements, setElements, Designs, setDesigns, DropsArea, setDropsArea, id, setContainsTheObject }) {
    const [lbl, setLbl] = useState('');
    const [quant, setQuant] = useState(0);

    const inputRef = useRef(null);
    const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={(event) => editLabel(event, lbl, setLbl)}></i>;

    useInitComponent({ setLbl, label, id, lbl, background, tags, setTags, quant, setElements })
    useLabelTag({ lbl, id })
    useQuantTag({ quant, id })

    return (
        <div className={`DropArea`}
            style={{ background: background }}
            draggable={false}
            id={`DropArea-${id}`}
            onDragOver={event => event.preventDefault()}
            onDrop={event => update({ event, setImgIndex, setQuant, id, Imgs, setImgs, ImgIndex, lbl, Elements, setElements, Designs, setDesigns, setContainsTheObject })}
        //onClick={nextImgIndex}
        >
            <input
                type='hidden'
                className='inptEditLabelDropArea input'
                value={lbl}
                ref={inputRef}
                onChange={(event) => { setLbl(event.target.value) }}
                onBlur={event => blur({ event, setElements, id, lbl })}
            />
            <span className={`labelDropArea subtitle ${isColorLight(background) ? 'contraste' : ''}`}>{iconPincel} {lbl}</span>
            <Bttn
                background={'is-danger'}
                userStatedIcon={'fa-solid fa-trash-can'}
                id={id}
                setTags={setTags}
                tags={tags}
                onClick={() => deleteThis({ id, setDropsArea, DropsArea, Elements, setElements })}
            />
        </div>
    );
}
