export function inptSearchOnChange(target, setInptSearch, setSearchElemnts) {
    if (target.value === ' ') return
    if (target.value[target.value.length - 1] === ' ') {
        setSearchElemnts(prev => [...prev, <span className="button is-small" value={(target.value).replaceAll(' ', '')}> {(target.value).replaceAll(' ', '')} </span>])
        setInptSearch('')
    } else setInptSearch(target.value)

}

export function formOnSubmit(event, { SearchElemnts, InptToken, InptPerRequest, setRequestImg, setOptionsRequestImg }) {
    try {
        event.preventDefault()

        if (process.env.REACT_APP_DEVELOPER) {
            if (process.env.REACT_APP_EXEMPLE_REQUEST_IMG) setRequestImg(JSON.parse(process.env.REACT_APP_EXEMPLE_REQUEST_IMG))
            if (process.env.REACT_APP_EXEMPLE_REQUEST_IMG_OPTIONS) setOptionsRequestImg(JSON.parse(process.env.REACT_APP_EXEMPLE_REQUEST_IMG_OPTIONS))
            return;
        }

        let urlBase = false
        let options = {}
        const selectAPI = document.getElementById('SelectAPI')
        switch (selectAPI.value) {
            case 'PexelsAPI':
                // https://api.pexels.com/v1/search/?page=1&per_page=30&query=[nature,people]
                urlBase = 'https://api.pexels.com/v1/search?page=1'
                break
        }


        if (SearchElemnts.length) {
            urlBase += `&query=[${(SearchElemnts.map(esse => esse.props.value).join())}]`
        }

        if (InptToken) options.headers = { 'Authorization': InptToken }

        if (InptPerRequest) urlBase += `&per_page=${InptPerRequest}`

        setOptionsRequestImg(options)
        fetch(urlBase, options)
            .then(res => res.json())
            .then(res => setRequestImg(res))
            .catch(err => {
                console.log('Err en nexp_page request:')
                console.error(err)
                setRequestImg(null)
            })
    } catch (error) {
        console.error(error)
        setRequestImg(null)
    }

}