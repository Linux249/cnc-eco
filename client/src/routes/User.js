import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api_url } from '../config';
import { updatePlayer } from '../store/actions/player';
import { logout } from '../store/actions/auth';
import Button from '../style/Button';
import Input from '../style/Input';
import LoadingPoints from '../style/LoadingPoints';
import Title from '../style/Title';
import Label from '../style/Label';
import { InfoText } from '../style/InfoText';
import Row from '../style/Row';
import Body from '../style/Body';
import Container from '../style/Container';
import Alert from '../style/Alert';
import BodySide from '../style/BodySide';
import Info from '../style/Info';
import { Link } from 'react-router-dom';

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

        if (player.error) return this.setState({ error: player.message });
        this.props.updatePlayer(player);
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
        if (player.error) return this.setState({ error: player.message });
        this.props.updatePlayer(player);
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
        console.log(player);
        if (player.error) return this.setState({ error: player.message });
        this.props.updatePlayer(player);
        // updateWorldLists
        this.loadWorlds();
    };

    deleteUser = async () => {
        const { token, _id } = this.props;
        this.startLoading();

        const res = await fetch(api_url + '/user/' + _id, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + token,
            },
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        const result = await res.json();
        this.endLoading();
        if (!res.ok || result.error) {
            return this.setState({ error: result.error.message });
        }
        if (result.error) return this.setState({ error: result.message });

        console.log(result);
        this.props.logout();
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
        const playerAdded = !!this.props.name;
        return (
            <Body>
                <div />
                <Row wrap>
                    <Container>
                        <Label htmlFor="name">{playerAdded ? 'Change' : 'Add a '} player name</Label>
                        <Input
                            name="name"
                            value={name}
                            onChange={e => this.changeName(e.target.value)}
                            disabled={playerAdded}
                        />
                        <InfoText>you can only all 7 days change your username</InfoText>
                    </Container>
                    <Container>
                        <Title>Add a World</Title>
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
                            {!playerAdded ? 'add player' : !world ? 'add world' : 'add'}
                        </Button>
                    </Container>
                    <Container>
                        <Title>Remove a World</Title>
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
                    <Container>
                        <Title>Logout</Title>
                        <Button onClick={this.props.logout}>logout</Button>
                    </Container>
                    <Container>
                        <Title>Delete Account</Title>
                        <Alert onClick={this.deleteUser}>DELETE</Alert>
                    </Container>
                    {error && (
                        <>
                            <Alert>{error}</Alert>
                        </>
                    )}
                </Row>
                <BodySide>
                    {!playerAdded && <>
                        <Info>Add your ingame name to your account first</Info>
                        <Info>You have to install the <Link to='/scripts'> script </Link></Info>
                        <Info>Update your data from one world ingame </Info>
                    </>}
                </BodySide>
            </Body>
        );
    }
}

const mapStateToProps = state => ({
    _id: state.auth.user_id,
    name: state.player.name,
    token: state.auth.token,
    savedWorlds: state.player.worlds,
});

const mapDispatchToProps = {
    logout,
    updatePlayer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
