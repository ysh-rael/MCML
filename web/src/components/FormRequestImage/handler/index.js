export function inptSearchOnChange(target, setInptSearch, setSearchElemnts) {
    if(target.value === ' ') return
    if (target.value[target.value.length - 1] === ' ') {
        setSearchElemnts(prev => [...prev, <span className="button is-small" value={(target.value).replaceAll(' ', '')}> {(target.value).replaceAll(' ', '')} </span>])
        setInptSearch('')
    } else setInptSearch(target.value)

}