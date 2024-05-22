import {Box, Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../services/userService";

const LoginPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        try {
            UserService.login({username, password}).then(res => res.json().then(data => {
                if (data && data.userId) {
                    localStorage.setItem('savedUser', JSON.stringify(data))
                    navigate("/question")
                }
            }))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box padding={2} maxWidth={300}>
            <Stack direction="column" spacing={2}>
                <TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField label="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Button onClick={login}>Log in</Button>
            </Stack>
        </Box>
    )
}

export default LoginPage