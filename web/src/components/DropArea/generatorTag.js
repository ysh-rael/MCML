import { Tag } from '../Tag'

export function generatorTag({ lbl, background, tags, setTags, quant, id }) {
    try {
        const newTag = <Tag background={background} id={`Tag-${id}`} lbl={lbl} quant={quant} />
        setTags((prevElements) => [...prevElements, newTag])
        return id
    } catch (err) {
        console.log('err generatorTag')
        console.log(err)
        return null
    }
}
