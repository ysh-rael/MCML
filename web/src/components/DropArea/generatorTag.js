import { Tag } from '../Tag'

export function generatorTag({ lbl, background, tags, setTags }) {
    try {
        const idTag = Date.now() + '-' + tags.length
        const newTag = <Tag background={background} id={`Tag-${idTag}`} lbl={lbl} />
        setTags((prevElements) => [...prevElements, newTag])
        return idTag
    } catch (err) {
        console.log(err)
        return null
    }
}
