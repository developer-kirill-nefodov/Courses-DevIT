import React from "react";

import HeroEditor from "./app/client/components/user.jsx";
import HeroesGrid from "./app/client/components/grid.jsx";


class App extends React.Component {
    state = {
        editUserId: '',
    }

    componentWillMount() {
        // UserActions.loadUsers();
    }

    componentDidMount() {
        // UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        // UserStore.removeChangeListener(this._onChange);
    }

    handleUserAdd(data) {
        // UserActions.createUser(data);
    }

    handleUserUpdate = (data) => {
        // UserActions.updateUser(this.state.editHeroId, data);
        this.setState({
            editHeroId: ''
        });
    }

    handleUserDelete(id) {
        // UserActions.deleteHero(id);
    }

    handleEditUser = (editUserId) => {
        this.setState({
            editUserId
        });
    }

    handleCancelEdit = () => {
        this.setState({
            editUserId: ''
        });
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            User
                        </a>
                    </div>
                </nav>
                <HeroEditor
                    onHeroAdd={this.handleUserAdd}
                    heroId={this.state.editUserId}
                    handleCancelEdit={this.handleCancelEdit}
                    onHeroUpdate={this.handleUserUpdate}
                />
                {/*<HeroesGrid heroes={this.state.users} onHeroDelete={this.handleUserDelete} onHeroEdit={this.handleEditUser}/>*/}
            </div>
        );
    }

    _onChange = () => {
        // this.setState(getStateFromFlux());
    }
}

export default App;