export function increaseThis(id) {
    try {
        console.log(id)
        if(!id) return false
        const dropArea = document.getElementById(`DropArea-${id}`)
        const tag = document.getElementById(`Tag-${id}`)
        console.log(tag)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}