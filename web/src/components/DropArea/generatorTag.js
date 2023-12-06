import { Tag } from '../Tag'
import { v4 as uuidv4 } from 'uuid';

export function generatorTag({ lbl, background, tags, setTags }) {
    try {
        const idTag = uuidv4();
        const newTag = <Tag background={background} id={`Tag-${idTag}`} lbl={lbl} />
        setTags((prevElements) => [...prevElements, newTag])
        return idTag
    } catch (err) {
        console.log(err)
        return null
    }
}
