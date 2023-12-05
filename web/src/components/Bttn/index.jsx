import { Button, Icon } from "react-bulma-components";

export function Bttn({ userStatedIcon, animation, background }) {

    return <Button className={`Btnn ${background ? background : ''} ${animation ? 'animation__shake' : ''}`}> <Icon className={`${userStatedIcon}`}></Icon> </Button>
}