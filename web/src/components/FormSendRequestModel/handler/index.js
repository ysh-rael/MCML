export function submitForm(event, { InputEmail, InptEpochst, Elements }) {
    event.preventDefault()
    const data = {
        email: InputEmail,
        epochs: InptEpochst,
        data: Elements
    }
    console.log(data)
}