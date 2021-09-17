import React from "react";
import Masonry from "react-masonry-component";

export default class HeroesGrid extends React.Component {
    render() {
        const masonryOptions = {
            itemSelector: '.hero',
            columnWidth: 400,
            gutter: 20,
            isFitWidth: true
        }

        return(
            <Masonry className='heroes-grid' options={masonryOptions}>
                {this.props.users.map(user =>
                    <Hero key={user.id} onDelete={this.props.onUserDelete} {...user} onEdit={this.props.onUserEdit} />
                )}
            </Masonry>

        );
    }
}