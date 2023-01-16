import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledformArea, colors } from "./../components/Styles";

import Logo from "./../assets/logo.png";

const Dashboard = () => {
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
                <Avatar image={Logo}/>
            </div>
            <StyledformArea bg={colors.dark2}>
                <StyledTitle size={65}>
                    Welcome, User
                </StyledTitle>


                <ButtonGroup>
                    <StyledButton to="/">Logout</StyledButton>
                </ButtonGroup>
            </StyledformArea>
            
            

        </div>
    );
}

export default Dashboard;