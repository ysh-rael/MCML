import { Button, Icon } from "react-bulma-components";

export function Bttn({ userStatedIcon, animation, background, onClick, id }) {

    return <Button id={id} className={`Btnn ${background ? background : ''} ${animation ? 'animation__shake' : ''}`} onClick={event => onClick ? onClick(event) : false}> <Icon className={`${userStatedIcon}`}></Icon> </Button>
}