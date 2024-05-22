import {useEffect, useState} from "react";
import UserService from "../services/userService";
import {Stack} from "@mui/material";

const UserPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            UserService.getUsers().then(res => res.json().then(data => {
                setUsers(data)
            }))
        }
        fetchUsers()
    }, []);

    return (<Stack direction="column">{users.map(user => <div>{user.username}</div>)}</Stack>)
}

export default UserPage