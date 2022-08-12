import { useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { ImageCard } from "../components/ImageCard"



export function Upload(){
    
    // Input elements
    const [disableSubmit,setDisableSubmit]     = useState(false)
    const [selectedFile, setSelectedFile]      = useState(null)
    const [processDetails,setProcessMessage]  = useState(['',''])

    // Image url strings
    const [origImageUrl,setOriginalImageUrl]   = useState('')
    const [rotatedImageUrl,setRotatedImageUrl] = useState('')
   
    

    async function submit(e:any)
    {
        e.preventDefault();
        const formData = new FormData();
        if( selectedFile != null ){
            // Include file in form data to send to backend
            formData.append("file", selectedFile);
            setProcessMessage(['Processing','warning'])

            // Set the original image 
            setOriginalImageUrl(URL.createObjectURL(selectedFile)) 
            // Pending shows loader
            setRotatedImageUrl('pending') 
            // Disable submit button
            setDisableSubmit(true) 

            // Upload to backend & Receive rotated image
            const response = await fetch('http://localhost:5000/upload',{
                method: "POST",
                body: formData,
            })
            .then(r => r.blob())
            .then((blob) => {
                // Get url from blob
                const imageUrl = URL.createObjectURL(blob)
                
                setTimeout(() => { 
                    // Wait a second before showing the image
                    // So that the user can see the loader
                    setRotatedImageUrl(imageUrl)
                    setDisableSubmit(false)
                    setProcessMessage(['Success!','success'])
                },1000)
            });

           
        }else{
            setProcessMessage(['Please upload a file!','danger'])
        }
    }


    return (<Container>
        <h1 className="mt-3">Rotate Your Image<span className="fs-5 text-muted"> by 90 degrees!</span></h1>
        
        <Form style={{outline:"none !important", boxShadow:"0 4px 2px -2px gray", paddingBottom:"10px"}}>
            <Form.Group className="mb-3" >
                <input 
                    type="File" 
                    name="imageFile" 
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                ></input>
                
            </Form.Group>

            <div className="d-flex justify-content-between align-items-baseline">
                <div>
                    <Badge bg={processDetails[1]} className="mt-1">{processDetails[0]}</Badge >
                </div>
                <Button variant="primary" type="submit" onClick={(e)=>submit(e)} disabled={disableSubmit} >
                    Submit
                </Button>
            </div>
           
        </Form>

        <Container className="mt-3">
            <Row md={2} sm={2} lg={2} xs={1}>
                
                {origImageUrl!=''?
                (
                <Col  className="mb-4">
                    <ImageCard imageUrl={origImageUrl} title="Original" highlight={false}/>
                </Col>
                ):null}
                
                { rotatedImageUrl!=''?
                (
                <Col 
                className="mb-4" 
                >
                    <ImageCard imageUrl={rotatedImageUrl} title="Rotated" highlight={true} />
                </Col>
                ):null}

            </Row>
        </Container>
    </Container>)
}