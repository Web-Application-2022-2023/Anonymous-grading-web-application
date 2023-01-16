import {StyledTextInput, StyledformArea, StyledFormButton, StyledLabel, StyledTitle, colors, Avatar, ButtonGroup, ExtraText, TextLink, CopyrightText } from "./../components/Styles"; 
import Logo from "./../assets/logo.png";
import { Formik, Form, useFormik } from "formik";
import { TextInput } from "./../components/FormLib";
import * as Yup from "yup";
import {FiMail, FiLock} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const Login = ({setUserJWT}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { handleChange, values } = useFormik({
        initialValues: {
            email: "",
            password: ""
        }
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const SERVER = 'http://localhost:5050/users/login';
            await fetch(SERVER, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({email: values.email, password: values.password})
            })
            .then(response => {
                if (response.status >= 400 && response.status <= 500) {
                    response.json().then(res => setError(res.message));
                }
                if (response.status >= 200 && response.status < 300) {
                    setError('');
                    response.json().then(res => { 
                        localStorage.setItem('jwt', res.token); 
                        setUserJWT(res.token);
                        navigate('/uploadProject'); 
                    });
                }
            });            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StyledformArea>
                <Avatar image={Logo}/>
                <StyledTitle color={colors.theme} size={30}>Member Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    // validationSchema={
                    //     Yup.object({
                    //         email: Yup.string().email("Invalid emailaddress").required("Required"),
                    //         password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
                    //     })
                    // }
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="cineva1@gmail.com"
                                onChange={handleChange}
                                value={values.email}
                                icon={<FiMail/>}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="********"
                                onChange = {handleChange}
                                value = {values.password}
                                icon={<FiLock/>}
                            />

                            <ButtonGroup>
                                <StyledFormButton type="submit">Login</StyledFormButton>
                               
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    New here? <TextLink to="/signup">Signup</TextLink>
                </ExtraText>
            </StyledformArea>
            <CopyrightText>All rights reserved&copy;2023</CopyrightText>
        </div>

    );
}

export default Login;