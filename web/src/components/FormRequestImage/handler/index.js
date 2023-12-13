export function inptSearchOnChange(target, setInptSearch, setSearchElemnts) {
    if (target.value === ' ') return
    if (target.value[target.value.length - 1] === ' ') {
        setSearchElemnts(prev => [...prev, <span className="button is-small" value={(target.value).replaceAll(' ', '')}> {(target.value).replaceAll(' ', '')} </span>])
        setInptSearch('')
    } else setInptSearch(target.value)

}

export function formOnSubmit(event, { SearchElemnts, InptToken, InptPerRequest, setRequestImg, setOptionsRequestImg }) {
    try {
        let urlBase = false
        let options = {}
        event.preventDefault()
        const selectAPI = document.getElementById('SelectAPI')
        //  console.log(selectAPI.value)
        switch (selectAPI.value) {
            // https://api.pexels.com/v1/search/?page=1&per_page=30&query=[nature,people]
            case 'PexelsAPI':
                urlBase = 'https://api.pexels.com/v1/search?page=1'
                break
        }


        if (SearchElemnts.length) {
            urlBase += `&query=[${(SearchElemnts.map(esse => esse.props.value).join())}]`
        }

        if (InptToken) options.headers = { 'Authorization': InptToken }

        if (InptPerRequest) urlBase += `&per_page=${InptPerRequest}`

        fetch(urlBase, options)
            .then(res => res.json())
            .then(res => setRequestImg(res))
            .catch(err => {
                console.error(err)
                setRequestImg(null)
            })
    } catch (error) {
        console.error(error)
        setRequestImg(null)
    }

}