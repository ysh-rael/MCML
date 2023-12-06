import { Tag } from '../Tag'

export function generatorTag({ label, background, tags, setTags }) {
    try {
        const idTag = Date.now() + '-' + tags.length
        const newTag = <Tag background={background} id={`Tag-${idTag}`} label={label} />
        setTags((prevElements) => [...prevElements, newTag])
        return idTag
    } catch (err) {
        console.log(err)
        return null
    }
}
