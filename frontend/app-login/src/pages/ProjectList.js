import { StyledTitle, StyledformArea, colors, StyledContainerProjects,  Container } from "./../components/Styles";
import { useState, useEffect } from 'react';

const ProjectList = () => {

    const [data, setData] = useState([]);
    const SERVER = 'http://localhost:5050/projects';
    
    const handleFetch = async () => {
        try {
            const response = await fetch(SERVER, {
                method: 'GET',
            });
            const newData = await response.json();
            setData(newData);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        handleFetch();
    }, []);




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
                    Project list
                </StyledTitle>
               
                {data && data.map((item) => (
                    <Container>
                        <StyledContainerProjects key={item.id}>
                        {item.projectName} &emsp; {item.finalGrade}<br></br>
                        </StyledContainerProjects>
                    </Container>
                ))}
                


                
                    
                
            </StyledformArea>
            
            

        </div>

    );
}

export default ProjectList;