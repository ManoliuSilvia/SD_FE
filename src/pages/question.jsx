import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import user from "./user";
import userService from "../services/userService";
import QuestionService from "../services/questionService";
import {
    Avatar,
    Button,
    Chip,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";

const CHIP = {
    ALL: 'all',
    BY_USER: 'by_user',
    BY_TAG: 'by_tag',
    BY_TEXT: 'by_text'
}

const QuestionPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [questions, setQuestions] = useState([])
    const [myQuestions, setMyQuestions] = useState([])
    const [selectedChip, setSelectedChip] = useState(CHIP.ALL)
    const [filterTag, setFilterTag] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState([])
    const [filterText, setFilterText] = useState("");

    const getQuestions = () => {
        QuestionService.getQuestions().then(res => res.json().then(data => {
            setQuestions(data)
        }))
    }

    useEffect(() => {
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
        getQuestions()
    }, []);

    useEffect(() => {
        const getMyQuestions = () => {
            if (user?.userId) {
                QuestionService.getMyQuestions(user.userId).then(res => res.json().then(data => {
                    setMyQuestions(data)
                }))
            }
        }
        getMyQuestions()
    }, [user?.userId]);

    const onChipClick = (value) => {
        setSelectedChip(value);
        if (value === CHIP.ALL) {
            QuestionService.getQuestions().then((res) =>
                res.json().then((data) => {
                    setQuestions(data);
                })
            );
        } else if (value === CHIP.BY_USER && user) {
            QuestionService.getMyQuestions(user.userId).then((res) =>
                res.json().then((data) => {
                    setQuestions(data);
                })
            );
        }
    };

    const handleTagSearch = (filterTag) => {
        QuestionService.getQuestionsByTag(filterTag).then((res) =>
            res.json().then((data) => {
                setFilteredQuestions(data);
            })
        );
    };

    const handleTextSearch = (filterText) => {
        QuestionService.getQuestionsByTitle(filterText).then((res) =>
            res.json().then((data) => {
                setFilteredQuestions(data);
            })
        );
    };

    const handleQuestionNavigation = (question) => {
        navigate(`/question/${question.questionId}`)
    }

    const handleEditQuestionNavigation = (question) => {
        navigate(`/editQuestion/${question.questionId}`)
    }

    const handleDelete = async(questionId) =>{
        const resp = await QuestionService.deleteQuestion(questionId, user.userId)
        if(resp.ok)
            getQuestions()
        else
            console.log("not same user")
    }


    const addQuestionNavigation = (user) => {
        if (user?.userId) {
            navigate(`/addQuestion/${user.userId}`)
        }
    }

    console.log(filteredQuestions)

    return (
        <Stack direction="column" spacing={2} padding={3}>
            <Stack direction="row" spacing={1}>
                <Chip
                    label="All"
                    variant={selectedChip === CHIP.ALL ? 'contained' : 'outlined'}
                    onClick={() => onChipClick(CHIP.ALL)}
                />
                <Chip
                    label="My questions"
                    variant={selectedChip === CHIP.BY_USER ? 'contained' : 'outlined'}
                    onClick={() => onChipClick(CHIP.BY_USER)}
                />
                <Chip
                    label="Filter by tag"
                    variant={selectedChip === CHIP.BY_TAG ? 'contained' : 'outlined'}
                    onClick={() => onChipClick(CHIP.BY_TAG)}
                />
                <Chip
                    label="Filter by text"
                    variant={selectedChip === CHIP.BY_TEXT ? 'contained' : 'outlined'}
                    onClick={() => onChipClick(CHIP.BY_TEXT)}
                />
            </Stack>
            {selectedChip === CHIP.ALL && (<List sx={{width: '100%', maxWidth: 660, bgcolor: 'background.paper'}}>
                {questions.map(question => (
                        <ListItem style={{width:800}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                            </ListItemAvatar>
                            <ListItemText primary={question.title} secondary={question.text}/>
                            <ListItemButton style={{width:100}} onClick={() => handleQuestionNavigation(question)}>See answers</ListItemButton>
                            <ListItemButton style={{width:100}} onClick={() => handleEditQuestionNavigation(question)}>Edit Question</ListItemButton>
                            <ListItemButton style={{width:100}} onClick={() => handleDelete(question.questionId)}>Delete Question</ListItemButton>
                        </ListItem>
                    )
                )}

            </List>)}
            {selectedChip === CHIP.BY_USER && (<List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {myQuestions.map(question => (
                        <ListItem style={{width:800}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                            </ListItemAvatar>
                            <ListItemText primary={question.title} secondary={question.text}/>
                            <ListItemButton style={{width:100}} onClick={() => handleQuestionNavigation(question)}>See answers</ListItemButton>
                            <ListItemButton style={{width:100}} onClick={() => handleEditQuestionNavigation(question)}>Edit Question</ListItemButton>
                            <ListItemButton style={{width:100}} onClick={() => handleDelete(question.questionId)}>Delete Question</ListItemButton>
                        </ListItem>
                    )
                )}
            </List>)}
            {selectedChip === CHIP.BY_TAG && (
                <Stack direction="column">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                            label="Tag"
                            variant="outlined"
                            value={filterTag}
                            onChange={(e) => setFilterTag(e.target.value)}
                        />
                        <Button variant="contained" onClick={() => handleTagSearch(filterTag)}>
                            Search
                        </Button>
                    </Stack>
                    {selectedChip === CHIP.BY_TAG && (
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {filteredQuestions.map(question => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={question.title} secondary={question.text}/>
                                        <ListItemButton onClick={() => handleQuestionNavigation(question)}>See answers</ListItemButton>
                                        <ListItemButton style={{width:100}} onClick={() => handleEditQuestionNavigation(question)}>Edit Question</ListItemButton>
                                        <ListItemButton style={{width:100}} onClick={() => handleDelete(question.questionId)}>Delete Question</ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>)}
                </Stack>
            )}

            {selectedChip === CHIP.BY_TEXT && (
                <Stack direction="column">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                            label="Text"
                            variant="outlined"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                        <Button variant="contained" onClick={() => handleTextSearch(filterText)}>
                            Search
                        </Button>
                    </Stack>
                    {
                        selectedChip === CHIP.BY_TEXT && (
                            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                                {filteredQuestions.map(question => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={question.imageUrl}/>
                                            </ListItemAvatar>
                                            <ListItemText primary={question.title} secondary={question.text}/>
                                            <ListItemButton onClick={() => handleQuestionNavigation(question)}>See answers</ListItemButton>
                                            <ListItemButton style={{width:100}} onClick={() => handleEditQuestionNavigation(question)}>Edit Question</ListItemButton>
                                            <ListItemButton style={{width:100}} onClick={() => handleDelete(question.questionId)}>Delete Question</ListItemButton>
                                        </ListItem>
                                    )
                                )}
                            </List>)
                    }
                </Stack>
            )
            }
            <Button onClick={() => addQuestionNavigation(user)}>Add Question</Button>
        </Stack>)
}

export default QuestionPage