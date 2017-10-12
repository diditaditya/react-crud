import React from 'react';

const Detail = (props) => {
    if (props.isDetailShown) {
        return (
            <div>
                <p>{props.item.address}</p>
                <p>{props.item.phone}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Detail;