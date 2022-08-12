import { Spinner } from "react-bootstrap";

export function Loader()
{
    return (
        <div style={{alignItems:"center",margin:"auto",width:"50%",padding:"70px 0"}}>
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
        </div>
    )
}