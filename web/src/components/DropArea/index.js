import { findChild } from '../../utils/findChild';
import { isColorLight } from '../../utils/isColorLight';
import { Bttn } from '../Bttn';
import { deleteThis } from './deleteThis';
import { editLabel } from './editLabel';
import { generatorTag } from './generatorTag';
import { hiddenInpt } from './hiddenInpt';
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


    useEffect(() => {
        setLbl(label)
        if (!id && stop != id) {
            const generatedId = generatorTag({ lbl, background, tags, setTags, quant });
            setId(generatedId);
            stop = generatedId
        }

    }, []);

    useEffect(() => {
        const tag = document.getElementById(`Tag-${id}`)
        if (!tag) {
            console.log(`Tag was not found!`, tag)
            return;
        }
        const labelTag = findChild(tag, 'labelTag')
        if (!labelTag) {
            console.log(`labelTag was not found!`, labelTag)
            return;
        }
        labelTag.innerText = lbl

    }, [lbl]);

    useEffect(() => {
        const tag = document.getElementById(`Tag-${id}`)
        if (!tag) {
            console.log(`Tag was not found!`, tag)
            return;
        }
        const quanTag = findChild(tag, 'quantTag')
        if (!quanTag) {
            console.log(`quanTag was not found!`, quanTag)
            return;
        }
        quanTag.innerText = quant

    }, [quant]);


    function nextImgIndex(event) {
        try {
            if (event.target.id !== `DropArea-${id}`) return;

            setImgIndex((prevImgIndex) => prevImgIndex + 1);
            setQuant((prevImgIndex) => prevImgIndex + 1);
        } catch (err) {
            console.log(err);
        }
    }

    function update(event) {
        nextImgIndex(event)
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
