import { isColorLight } from '../../utils/isColorLight';
import { Bttn } from '../Bttn';
import { deleteThis } from './deleteThis';
import { editLabel } from './editLabel';
import { generatorTag } from './generatorTag';
import './index.css';
import { useEffect, useRef, useState } from 'react';



let stop = false
export function DropArea({ label, background, tags, setTags }) {
    const [lbl, setLbl] = useState('');
    const [id, setId] = useState(null);

    const inputRef = useRef(null);

    const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={(event, lbl, setLbl) => editLabel(event, lbl, setLbl)}></i>;

    useEffect(() => {
        setLbl(label)
        if (!id && stop != id) {
            const generatedId = generatorTag({ lbl: inputRef, background, tags, setTags });
            setId(generatedId);
            stop = generatedId
        }

    }, [id, label, background, tags, setTags]);

    return (
        <div className={`DropArea`} style={{ background: background }} draggable={true} id={`DropArea-${id}`}>
            <input
                type='hidden'
                className='inptEditLabelDropArea input'
                value={lbl}
                ref={inputRef}
                onChange={(event) => setLbl(event.target.value)}
            />
            <span className={`labelDropArea subtitle ${isColorLight(background) ? 'contraste' : ''}`}>{iconPincel} {lbl}</span>
            <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} id={id} setTags={setTags} tags={tags} onClick={() => deleteThis(id)} />
        </div>
    );
}
