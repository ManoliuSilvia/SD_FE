import {Box, Button, Chip, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../services/userService";
import QuestionService from "../services/questionService";
import AnswerService from "../services/answerService";


const AddAnswerPage = () => {
    const navigate = useNavigate()
    const [author, setAuthor] = useState();
    const [question, setQuestion] = useState();

    const {questionId: questionId} = useParams()
    const {userId: userId} = useParams()

    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const getUser = () => {
            UserService.getUser(userId).then(res => res.json().then(data => {
                setAuthor(data)
            }))
        }
        const getQuestion = () => {
            QuestionService.getQuestion(questionId).then(res => res.json().then(data => {
                setQuestion(data)
            }))
        }
        getUser()
        getQuestion()
    }, [])

    const addAnswer = () => {
        try {
            AnswerService.addAnswer(questionId, {author, text,imageUrl})
            navigate(`/question/${question.questionId}`)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box padding={2} maxWidth={300}>
            <Stack direction="column" spacing={2}>
                <TextField label="Text" value={text} onChange={(event) => setText(event.target.value)}/>
                <TextField label="Image Url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
            </Stack>
            <Button onClick={addAnswer}>Add Answer</Button>
        </Box>
    )

}

export default AddAnswerPage