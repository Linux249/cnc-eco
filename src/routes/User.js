import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceBaseFromUrl } from '../store/actions/base';
import Base from '../components/Base.js';
import BuildingMenu from '../containers/Buildings';
import Menu from '../components/Menu';
import Body from '../style/Body';
import Row from '../style/Row';
import Button from '../style/Button';
import styled from 'styled-components';
import Input from '../style/Input';
import { api_url } from '../config/config';

const BaseS = styled.div``;
const MenuS = styled.div``;

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
        if (!_id) return this.setState({ error: 'Warum sollte man ohne id hier sein dürfen' });

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
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            this.setState({ error: data.error.message });
        }
    };

    render() {
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
                    <h5>set your name</h5>
                    <Input
                        name="name"
                        value={name}
                        onChange={e => this.changeName(e.target.value)}
                    />
                    <Button onClick={this.addPlayer}>Add player</Button>
                </Container>
            </Middle>
        );
    }
}

const mapStateToProps = state => ({
    _id: state.player._id,
});

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps)(User);
