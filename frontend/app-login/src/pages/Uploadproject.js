import { StyledTitle, StyledformArea, colors, StyledAddButton,  Container } from "./../components/Styles";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const UploadProject = (props) => {
    

    const [name,setName]=useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const studName = "gigi";
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const SERVER = 'http://localhost:5050/projects' ;
            await fetch(SERVER, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({projectName: name,studentName: studName })
            })
            .then(response => {
                if (response.status >= 400 && response.status <= 500) {

                    response.json().then(res => setError(res.message));
                    
                }
                if (response.status >= 200 && response.status < 300) {
                    setError('');
                    navigate('/gradingProject'); 

                    response.json().then(res => { 
                        localStorage.setItem('jwt', res.token); 
                    });
                }
                else{

                }
            });            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}>
            </div>
            <StyledformArea bg={colors.peach}>
                <StyledTitle size={65} color="#3A3845">
                    Upload project
                </StyledTitle>
                <Container>
                <input type='text' placeholder='name' onChange={(evt)=>setName(evt.target.value)}/>
                </Container>
                <StyledAddButton type="submit" onClick={handleSubmit}>ADD</StyledAddButton>
            </StyledformArea>
        </div>
    );
}


export default UploadProject;