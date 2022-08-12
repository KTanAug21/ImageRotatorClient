import { Card } from "react-bootstrap"
import { Loader } from "./Loader";

type ImageCardProps = {
    imageUrl:string,
    title:string,
    highlight:boolean
}

export function ImageCard({imageUrl, title, highlight=false}:ImageCardProps){

    if( imageUrl == 'pending' ){
        return <Loader />
    }else{
        return  (<Card 
            className="h-100" 
            style={
                highlight?
                {objectFit:"cover", outline:"none !important",borderColor:"#719ECE", boxShadow:"0 0 10px #719ECE"}:
                {}
            }>
            <Card.Img 
                variant="top" 
                src={imageUrl} 
                height="200px"
                style={{objectFit:"cover"}}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{title}</span>
                </Card.Title>
            </Card.Body>
        </Card>);
    }
    
}