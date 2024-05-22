import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button, Chip, ListItemText, Stack, TextField} from "@mui/material";
import QuestionService from "../services/questionService";
import UserService from "../services/userService";
import TagService from "../services/tagService";

const AddQuestionPage = () => {
    const navigate = useNavigate()
    const {id: userId} = useParams()
    const [author, setAuthor] = useState()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [tags, setTags] = useState([])
    const [chips, setChips] = useState([])
    const [tagName, setTagName] = useState('')

    const addQuestion = () => {
        try {
            QuestionService.addQuestion({
                question: {
                    author, title, text, imageUrl
                }, tagNames: []
            }).then(res => res.json().then(data => {
                if (data) {
                    navigate("/question")
                }
            }))
        } catch (e) {
            console.log(e)
        }
    }

    const addTag = () => {
        try {
            TagService.addTag({tagName: tagName}).then(res => res.json().then(data => {
                console.log(data)
            }))
        } catch (e) {
            console.log(e)
        }
    }

    const addChip = (tag) => {
        const newChips = [...chips, tag]
        setChips(newChips)
    }

    const getTags = () => {
        TagService.getTags().then(res => res.json().then(data => setTags(data)))
    }

    useEffect(() => {
        const getAuthor = () => {
            UserService.getUser(userId).then(res => res.json().then(data => {
                setAuthor(data)
            }))
        }
        getAuthor()
        getTags()
    }, [])

    return (
        <Box padding={2} maxWidth={300}>
            <Stack direction="column" spacing={2}>
                <TextField label="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <TextField label="Text" value={text} onChange={(event) => setText(event.target.value)}/>
                <TextField label="ImageUrl" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                <Stack direction="row" spacing={1}>
                    {tags.map(tag => (
                        <Chip
                            label={tag.tagName}
                            onClick={() => addChip(tag)}
                            variant={chips.includes(tag) ? 'contained' : 'outlined'}
                        ></Chip>
                    ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                    <TextField label="new tag" value={tagName} onChange={(event) => {
                        console.log(tagName)
                        setTagName(event.target.value)
                        console.log(event.target.value)
                        console.log(tagName)
                    }}/>
                    <Button onClick={async () => {
                        await addTag()
                        getTags()
                    }}>+</Button>
                </Stack>
                <Button onClick={addQuestion}>Add Question</Button>

            </Stack>
        </Box>
    )

}

export default AddQuestionPage