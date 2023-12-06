export function deleteThis(id) {
    try {
        console.log(id)
        if(!id) return false
        const dropArea = document.getElementById(`DropArea-${id}`)
        const tag = document.getElementById(`Tag-${id}`)

        dropArea.parentElement.removeChild(dropArea)
        console.log(tag.parentElement)
        tag.parentElement.removeChild(tag)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}