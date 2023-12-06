export function deleteThis(id) {
    try {
        const dropArea = document.getElementById(`DropArea-${id}`)
        const tag = document.getElementById(`Tag-${id}`)

        dropArea.parentNode.removeChild(dropArea)
        console.log(tag.parentElement)
        tag.parentElement.removeChild(tag)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}