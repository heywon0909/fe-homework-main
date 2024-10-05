import { Fragment } from "react/jsx-runtime";
interface Props{
    value?: string;
}
export default function BasicColumn({value}:Props) {
    return <Fragment>{value}</Fragment>  
}