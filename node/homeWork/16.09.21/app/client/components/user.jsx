import React from "react";
import Masonry from "react-masonry-component";

class UserEditor extends React.Component {
    state = {
        address: "",
        name: "",
        age: "",
    }

    componentDidMount() {
        this.updateUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.updateUser();
        }
    }

    updateUser = () => {
        const {heroId} = this.props;
        if (!heroId) {
            return;
        }
        const users = UserStore.getUsers();
        const user = heroes.find(hero => hero.id === heroId);

        this.setState({
            ...user
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.getAttribute('id')]: event.target.value});
    }

    handleUserAdd = () => {
        const user = {
            address: this.state.address,
            name: this.state.name,
            age: this.state.age,
        };

        this.props.onUserAdd(user);
        this.setState({address: '', name: '', age: ''});
    }

    handleUserUpdate = () => {
        const user = {
            address: this.state.address,
            name: this.state.name,
            age: this.state.age,
        };

        this.props.onUserUpdate(user);
        this.setState({address: '', name: '', age: ''});
    }

    handleCancel = () => {
        this.setState({address: '', name: '', age: ''});
        this.props.handleCancelEdit();
    }

    render() {
        return (
            <div className='user-editor'>
                <input
                    id='address'
                    type='text' className='form-input' placeholder='address'
                    value={this.state.address} onChange={this.handleChange}/>
                <input
                    id='name'
                    type='text' className='form-input' placeholder='name'
                    value={this.state.name} onChange={this.handleChange}/>
                <input
                    id='age'
                    type='number' className='form-input' placeholder='age'
                    value={this.state.age} onChange={this.handleChange}/>
                    {
                        this.props.userId ?
                            <div className='updating-buttons'>
                                <button
                                    className='user-editor-buttons cancel-button' disabled={!this.state.address}
                                    onClick={this.handleCancel}>
                                    Cancel
                                </button>
                                <button
                                    className='user-editor-buttons update-button' disabled={!this.state.address}
                                    onClick={this.handleUserUpdate}>
                                    Update hero
                                </button>
                            </div> :
                            <button
                                className='user-editor-buttons add-button' disabled={!this.state.address}
                                onClick={this.handleUserAdd}>
                                Add hero
                            </button>
                    }
                </div>
        );
    }
}

export default HeroEditor;