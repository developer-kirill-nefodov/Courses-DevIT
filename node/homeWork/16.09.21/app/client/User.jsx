import React from "react";

require("./user.css");

export default class Hero extends React.Component {
    render() {
        const {id, address, name, age} = this.props;

        return (
            <div className="user">
                <div className='header'>
                    <span className='delete-icon' onClick={() => {
                        onDelete(id);
                    }}>
                        &times;
                    </span>


                </div>
                <img src='./user.png'  className="bi bi-pencil-square change" width="16" height="16"  onClick={() => {onEdit(id)}}/>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='hero-logo'>
                            <a>refactor</a>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        {address && <p className='hero-field'>nickname: {address}</p>}
                        {name && <p className='hero-field'>real_name: {name}</p>}
                        {age && <p className='hero-field'>origin_description: {age}</p>}
                    </div>
                </div>

            </div>
        );
    }
}