import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import styled from 'styled-components';
import Area from '../style/Area';
import Title from '../style/Title';
import Column from '../style/Column';
import Button from '../style/Button';
import { api_url } from '../config';
import Input from '../style/Input';
import Info from '../style/Info';
import Alert from '../style/Alert';
import { InfoText } from '../style/InfoText';

const Middle = styled.div``;

const Text = styled.div`
    margin: 5px;
`;

const TextArea = styled(Area)`
    resize: vertical;
`;

function Feedback(props) {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setloading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [allFeedback, setAllFeedback] = useState([]);

    useEffect(() => {
        async function getAll() {
            console.log('Load all user feedback');
            setloading(true);
            const url = `${api_url}/feedback/all`;
            const res = await fetch(url, {
                headers: {
                    Authorization: 'Bearer  ' + props.token,
                },
            });
            console.log(res);
            const data = await res.json();
            setAllFeedback(data);
            setloading(false);
        }
        getAll();
    }, [success]);

    async function handleSend() {
        setloading(true);
        setError('');
        setSuccess('')
        if (!title) return setError('Title missing');
        if (!text) return setError('Text missing');

        const url = `${api_url}/feedback/new`;
        try {
            const data = await fetch(url, {
                headers: {
                    Authorization: 'Bearer  ' + props.token,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ text, title }),
            }).then(r => r.json());
            setSuccess(data.success);
        } catch (e) {
            setError(e.message);
        }
        setloading(false);
    }
    return (
        <Body>
            <div />
            <Middle>
                {/*<Title>Feedback from other user</Title>*/}
                {allFeedback.map(feedback => (
                    <Area>
                        <Title>{feedback.title}</Title>
                        <Text>{feedback.text}</Text>
                        <InfoText>{feedback.from.player}</InfoText>
                    </Area>
                ))}
            </Middle>
            <div>
                <Area>
                    <Column>
                        <Title>Feedback needed!</Title>
                        <InfoText>
                            Do you have some suggestions, wishes or something else? Please, let me
                            know!
                        </InfoText>
                        <Input
                            small
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <TextArea
                            as="textarea"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            rows={8}
                            placeholder={
                                'Do you have some suggestions, wishes or something else? Please, let me know!'
                            }
                        />
                        <Button onClick={handleSend}>send</Button>
                        {success && <Info>{success}</Info>}
                        {error && <Alert>{error}</Alert>}
                    </Column>
                </Area>
            </div>
        </Body>
    );
}

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Feedback);
