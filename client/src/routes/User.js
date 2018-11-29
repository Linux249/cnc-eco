import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import styled from 'styled-components';
import Input from '../style/Input';
import { api_url } from '../config';
import { updatePlayer } from '../store/actions/player';
import Area from '../style/Area';

const Middle = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100rem;
`;

const Error = styled.div`
    font-size: 1rem;
    color: darkred;
`;

class User extends Component {
    constructor(props) {
        super();
        this.state = {
            world: '',
            name: props.playerName,
            error: null,
            worlds: [],
            loading: 0,
        };
    }

    startLoading = () => this.setState(l => ({ loading: l + 1 }));

    endLoading = () => this.setState(l => ({ loading: l - 1 }));

    cleanError = () => this.setState({ error: null });

    changeWorld = world => this.setState({ world });

    changeName = name => this.setState({ name });

    addPlayer = async () => {
        this.cleanError();
        const { world, name } = this.state;
        const { token } = this.props;
        if (!name) return this.setState({ error: 'Ingame name missing' });
        if (!world) return this.setState({ error: 'Select a world' });
        this.startLoading();

        const body = {
            name,
            worldId: world,
        };

        const res = await fetch(api_url + '/user/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + token,
            },
            body: JSON.stringify(body),
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        const player = await res.json();
        this.endLoading();
        if (!res.ok || player.error) {
            return this.setState({ error: player.error.message });
        }

        this.props.dispatch(updatePlayer(player));
    };

    addWorld = async () => {
        this.cleanError();
        const { world } = this.state;
        const { playerName: name, token } = this.props;
        if (!world) return this.setState({ error: 'Bitte Welt angeben' });
        this.startLoading();

        const body = {
            name: name,
            worldId: world,
        };

        const res = await fetch(api_url + '/user/addWorld', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + token,
            },
            body: JSON.stringify(body),
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        const player = await res.json();
        this.endLoading();
        if (!res.ok || player.error) {
            return this.setState({ error: player.error.message });
        }
        this.props.dispatch(updatePlayer(player));
    };

    loadWorlds = async () => {
        // TODO add try catch and proper array handling
        const { token, savedWorlds } = this.props;
        const { name } = this.state;
        if (!name) return this.setState({ error: 'Ingame name missing' });
        this.startLoading();
        const url = `${api_url}/worlds?name=${name}`;
        const data = await fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        }).then(res => res.json());

        const worlds = data.worlds.filter(e => !savedWorlds.some(w => +w.worldId === +e.worldId));
        this.setState({ worlds });
        this.endLoading();
    };

    componentDidUpdate(prevProps) {
        if (this.props.playerName !== prevProps.playerName) {
            this.setState({ name: this.props.playerName });
        }
    }

    componentDidMount() {
        this.props.name && this.loadWorlds();
    }

    render() {
        const { world, error, name, worlds, loading } = this.state;

        return (
            <Middle>
                <Container>
                    <h3>add player (ingame) name to your account</h3>
                    <h2>What is your ingame name?</h2>
                    <Error>{error}</Error>
                    <Input
                        name="name"
                        value={name}
                        onChange={e => this.changeName(e.target.value)}
                    />
                    <h5>you can only all 7 days change your username</h5>
                    <h2>Select a World</h2>
                    <Area>
                        {loading ? (
                            <h5>loading...</h5>
                        ) : (
                            worlds.map(w => (
                                <Button
                                    onClick={() => this.changeWorld(w.worldId)}
                                    active={world === w.worldId}
                                >
                                    {w.worldName}
                                </Button>
                            ))
                        )}
                        <Button onClick={this.loadWorlds}>reload worlds</Button>
                    </Area>

                    <Button onClick={!name ? this.addPlayer : this.addWorld}>
                        {!name ? 'Add player' : 'Add world'}
                    </Button>
                </Container>
            </Middle>
        );
    }
}

const mapStateToProps = state => ({
    _id: state.auth.user_id,
    playerName: state.player.name,
    token: state.auth.token,
    savedWorlds: state.player.worlds,
});

export default connect(mapStateToProps)(User);
