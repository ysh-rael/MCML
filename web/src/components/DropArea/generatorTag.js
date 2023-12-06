import { Tag } from '../Tag'

export function generatorTag({ label, background, tags, setTags }) {
    try {
        const idTag = Date.now() + '-' + tags.length
        const arrayTags = tags
        arrayTags.push(<Tag background={background} id={`Tag-${idTag}`} label={label} />)
        setTags(arrayTags)
        return idTag
    } catch (err) {
        console.log(err)
        return null
    }
}