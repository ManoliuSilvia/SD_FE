import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AnswerService from "../services/answerService";
import {Avatar, Button, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import QuestionService from "../services/questionService";

const AnswerPage = () => {
    const navigate = useNavigate()
    const [answers, setAnswers] = useState([])
    const { id: questionId } = useParams()
    const [user, setUser] = useState()
    const [question, setQuestion] = useState()

    const getAnswers = () =>{
        AnswerService.getAnswers(questionId).then(res => res.json().then(data => {
            setAnswers(data)
        }))
    }

    console.log(questionId)
    useEffect(() => {
        const getQuestion = () => {
            QuestionService.getQuestion(questionId).then(res => res.json().then(data => {
                setQuestion(data)
            }))
        }
        const getUser = () => {
            const userUnparsed = localStorage.getItem('savedUser')
            if (!userUnparsed) {
                return navigate("/login")
            }
            const user = JSON.parse(userUnparsed)
            console.log(user)
            setUser(user)
        }
        getUser()
        getAnswers()
        getQuestion()
    },[])

    const handleDelete = async(answerId) =>{
        const resp = await AnswerService.deleteAnswer(answerId, user.userId)
        if(resp.ok)
            getAnswers()
        else
            console.log("not same user")
    }

    const addAnswerNavigation = (user,question) => {
        if (user?.userId && question?.questionId) {
            navigate(`/addAnswer/${user.userId}/${question.questionId}`)
        }
    }


    if (!question) {
        return (<Typography>Question loading...</Typography>)
    }

    return (
        <Stack direction="column" spacing={2} padding={3}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                </ListItemAvatar>
                <ListItemText primary={question.title} secondary={question.text}/>
            </ListItem>
            {answers.map(answer => (
                <Stack direction="row" spacing={2} padding={3}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={answer.imageUrl}/>
                        </ListItemAvatar>
                        <ListItemText primary={answer.author.username} secondary={answer.text}/>
                    </ListItem>
                    <ListItemButton style={{width:100}} onClick={() => handleDelete(answer.answerId)}>Delete Answer</ListItemButton>
                </Stack>
                )
            )}
            <Button onClick={() => addAnswerNavigation(user,question)}>Add Answer</Button>
        </Stack>
    )
}

export default AnswerPage