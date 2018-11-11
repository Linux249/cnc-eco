import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import styled from 'styled-components';
import Input from '../style/Input';
import { api_url } from '../config/config';
import { updatePlayer } from '../store/actions/player';


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

class User extends Component {
    constructor() {
        super();
        this.state = {
            world: '373',
            name: 'linux249',
            error: null,
        };
    }

    changeWorld = world => this.setState({ world });

    changeName = name => this.setState({ name });

    addPlayer = async () => {
        const { world, name } = this.state;
        const { _id } = this.props;
        if (!world) return this.setState({ error: 'Bitte Welt angeben' });
        if (!name) return this.setState({ error: 'Bitte Spieler angeben' });
        if (!_id)
            return this.setState({
                error: 'Warum sollte man ohne id hier sein dürfen außer bei missing login',
            });

        const body = {
            name,
            worldId: world,
            _id,
        };

        const res = await fetch(api_url + '/user/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        console.log(res);
        const player = await res.json();
        console.log({ player });
        if (!res.ok || player.error) {
            return this.setState({ error: player.error.message });
        }

        this.props.dispatch(updatePlayer(player));
    };


    addWorld = async () => {
        const { world } = this.state;
        const { _id, playerName } = this.props;
        if (!world) return this.setState({ error: 'Bitte Welt angeben' });
        if (!_id)
            return this.setState({
                error: 'Warum sollte man ohne id hier sein dürfen außer bei missing login',
            });

        const body = {
            name: playerName,
            worldId: world,
            _id,
        };

        const res = await fetch(api_url + '/user/addWorld', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        console.log(res);
        const player = await res.json();
        console.log({ player });
        if (!res.ok || player.error) {
            return this.setState({ error: player.error.message });
        }
        this.props.dispatch(updatePlayer(player));
    };

    render() {
        const { playerName } = this.props
        const { world, error, name } = this.state;

        return (
            <Middle>
                <Container>
                    <h3>add player (ingame) name to your account</h3>
                    <h3>{error}</h3>
                    <h5>Bitte Welt id eingeben</h5>
                    <Input
                        name="world"
                        value={world}
                        onChange={e => this.changeWorld(e.target.value)}
                        type="number"
                        size="3"
                        max="999"
                    />
                    {!playerName && (
                        <>
                            <h5>set your name</h5>
                            <Input
                                name="name"
                                value={name}
                                onChange={e => this.changeName(e.target.value)}
                            />
                        </>
                    )}
                    <Button onClick={!playerName ? this.addPlayer : this.addWorld}>{!playerName ? 'Add player' : 'Add world'}</Button>
                </Container>
            </Middle>
        );
    }
}

const mapStateToProps = state => ({
    _id: state.auth.user_id,
    playerName: state.player.name,
});

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps)(User);
