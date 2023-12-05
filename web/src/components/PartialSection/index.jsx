import './index.css'
export function PartialSection(params) {
    return <div className="PartialSection">
        {params.children}
    </div>
}