import {useEffect, useState} from "react";
import QuestionService from "../services/questionService";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, Stack, TextField} from "@mui/material";

const EditQuestionPage = () => {
    const navigate = useNavigate()
    const [question, setQuestion] = useState()
    const [user, setUser] = useState()
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [imageUrl, setImageUrl] = useState()
    const {questionId: questionId} = useParams()

    useEffect(() => {
        const getUser = () => {
            const userUnparsed = localStorage.getItem('savedUser')
            if (!userUnparsed) {
                return navigate(`/question/${questionId}`)
            }
            const user = JSON.parse(userUnparsed)
            console.log("user")
            console.log(user)
            setUser(user)
        }
        const getQuestion = () => {
            try {
                QuestionService.getQuestion(questionId).then(res => res.json().then(data => {
                    setQuestion(data)
                    console.log("question:")
                    console.log(data)
                }))
            }catch (e) {
                console.log(e)
            }
        }
        getQuestion()
        getUser()
    }, []);

    const editQuestion = (title, text, imageUrl) => {
        try {
            QuestionService.editQuestion({title, text}, user.userId).then(res => {
                res.json().then(data => {
                    console.log(data)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Stack direction="column" spacing={2} padding={3}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                </ListItemAvatar>
                <ListItemText primary={question.title} secondary={question.text}/>
            </ListItem>
            <ListItem>
                <TextField label="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <TextField label="Text" value={text} onChange={(event) => setText(event.target.value)}/>
                <TextField label="Text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                <Button onClick={editQuestion}>Edit Question</Button>
            </ListItem>
        </Stack>
    )
}

export default EditQuestionPage