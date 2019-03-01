import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import styled from 'styled-components';
import Input from '../style/Input';
import { api_url } from '../config';
import { updatePlayer } from '../store/actions/player';
import Area from '../style/Area';
import LoadingPoints from '../style/LoadingPoints';
import Label from '../style/Label';
import Error from '../style/Error';

const Middle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    //max-width: 100rem;
`;

const InfoText = styled.div`
    font-size: 0.5rem;
    color: lightgrey;
`;

class User extends Component {
    constructor(props) {
        super();
        this.state = {
            world: '',
            name: props.name,
            error: null,
            worlds: [],
            loading: 0,
        };
    }

    startLoading = () => this.setState(({ loading: l }) => ({ loading: l + 1, error: null }));

    endLoading = () => this.setState(({ loading: l }) => ({ loading: l - 1 }));

    changeWorld = world => this.setState({ world, error: null });

    changeName = name => this.setState({ name, error: null });

    addPlayer = async () => {
        const { world, name } = this.state;
        const { token } = this.props;
        if (!name) return this.setState({ error: 'please enter a ingame name' });
        if (!world) return this.setState({ error: 'please select a world' });
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
            this.setState({ error: e.message });
        });
        const player = await res.json();
        this.endLoading();
        if (!res.ok || player.error) {
            return this.setState({ error: player.error.message });
        }

        this.props.dispatch(updatePlayer(player));
        // update world lists
        this.loadWorlds();
    };

    addWorld = async () => {
        const { world, worlds } = this.state;
        const { name, token } = this.props;
        if (!world) return this.setState({ error: 'please select a world' });
        if (!worlds.some(e => +e.worldId === +world))
            return this.setState({ error: 'select a valid world' });
        this.startLoading();

        const body = {
            name,
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
        // updateWorldLists
        this.loadWorlds();
    };

    deleteWorld = async () => {
        const { world } = this.state;
        const { token, savedWorlds } = this.props;
        if (!world) return this.setState({ error: 'please select a world' });
        if (!savedWorlds.some(e => +e.worldId === +world))
            return this.setState({ error: 'select a valid world' });
        this.startLoading();

        const body = {
            worldId: world,
        };

        const player = await fetch(api_url + '/user/removeWorld', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + token,
            },
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .catch(e => {
                console.warn('catched error');
                console.error(e);
                this.endLoading();
                return this.setState({ error: e.message });
            });
        this.endLoading();
        this.props.dispatch(updatePlayer(player));
        // updateWorldLists
        this.loadWorlds();
    };

    loadWorlds = async () => {
        // TODO add try catch and proper array handling
        const { token, savedWorlds } = this.props;
        const { name } = this.state;
        this.setState({ worlds: [] });
        if (!name) return this.setState({ error: 'Ingame name missing' });
        this.startLoading();
        const url = `${api_url}/worlds?name=${name}`;
        const data = await fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        }).then(res => res.json());

        const worlds = data.worlds.filter(e => !savedWorlds.some(w => +w.worldId === +e.worldId));
        this.setState({ worlds, error: worlds.length ? null : 'No Worlds found' });
        this.endLoading();
    };

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.setState({ name: this.props.name });
        }
    }

    componentDidMount() {
        this.props.name && this.loadWorlds();
    }

    render() {
        const { world, error, name, worlds, loading } = this.state;
        const { savedWorlds } = this.props;
        const playerAdded = !!this.props.name
        return (
            <Middle>
                <div>
                    <Area>
                        <Container>
                            <div>
                                <Label>Player name</Label>
                                <InfoText>add your ingame name to your account please</InfoText>
                                <Input
                                    name="name"
                                    value={name}
                                    onChange={e => this.changeName(e.target.value)}
                                    disabled={playerAdded}
                                />
                                <InfoText>you can only all 7 days change your username</InfoText>
                            </div>
                        </Container>
                    </Area>
                    <Area>
                        <Label>Select a World</Label>
                        <Container>
                            <LoadingPoints loading={loading} />
                            {worlds.length !== 0 &&
                                worlds.map(w => (
                                    <Button
                                        key={w.worldId}
                                        onClick={() => this.changeWorld(w.worldId)}
                                        active={world === w.worldId}
                                    >
                                        {w.worldName}
                                    </Button>
                                ))}
                            <Button onClick={this.loadWorlds}>load</Button>

                            <Button onClick={!this.props.name ? this.addPlayer : this.addWorld}>
                                {!playerAdded ? 'add player' : !world ? 'select world' : 'add'}
                            </Button>
                        </Container>
                    </Area>

                    <Area>
                        <Label>Remove a World</Label>
                        <Container>
                            {savedWorlds.map(w => (
                                <Button
                                    key={w.worldId * 100}
                                    onClick={() => this.changeWorld(w.worldId)}
                                    active={world === w.worldId}
                                >
                                    {w.worldName}
                                </Button>
                            ))}
                            <Button onClick={this.deleteWorld}>delete</Button>
                        </Container>
                    </Area>
                    <Error>{error}</Error>
                </div>
            </Middle>
        );
    }
}

const mapStateToProps = state => ({
    _id: state.auth.user_id,
    name: state.player.name,
    token: state.auth.token,
    savedWorlds: state.player.worlds,
});

export default connect(mapStateToProps)(User);
