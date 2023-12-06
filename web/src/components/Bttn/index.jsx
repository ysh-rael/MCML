import { Button, Icon } from "react-bulma-components";

export function Bttn({ userStatedIcon, animation, background, onClick }) {

    return <Button className={`Btnn ${background ? background : ''} ${animation ? 'animation__shake' : ''}`} onClick={event => onClick(event)}> <Icon className={`${userStatedIcon}`}></Icon> </Button>
}