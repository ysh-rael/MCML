import { isColorLight } from '../../utils/isColorLight';
import { Bttn } from '../Bttn';
import { deleteThis } from './deleteThis';
import { generatorTag } from './generatorTag';
import './index.css';
import { useEffect, useState } from 'react';

function editLabel(event) {
    console.clear();
    console.log(event);
}

const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={editLabel}></i>;
let stop = false
export function DropArea({ label, background, tags, setTags }) {
    const [id, setId] = useState(null);

    useEffect(() => {
        if (!id && stop != id) {
            const generatedId = generatorTag({ label, background, tags, setTags });
            setId(generatedId);
            stop = generatedId
        }

    }, [id, label, background, tags, setTags]);

    return (
        <div className={`DropArea`} style={{ background: background }} draggable={true} id={`DropArea-${id}`}>
            <span className={`subtitle ${isColorLight(background) ? 'contraste' : ''}`}>{iconPincel} {label}</span>
            <input type='hidden'></input>
            <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} id={id} setTags={setTags} tags={tags} onClick={() => deleteThis(id)} />
        </div>
    );
}
