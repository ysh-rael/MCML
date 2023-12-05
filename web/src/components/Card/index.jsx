import './index.css'
export function Card({ principal }) {
    return <div className={`Card ${principal ? 'principal' : ''}`} draggable={principal}>
       <i className="fa-solid fa-spinner fa-pulse"></i>
    </div>
}