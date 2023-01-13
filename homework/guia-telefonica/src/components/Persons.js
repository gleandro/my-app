import React from "react";

const Persons = ({ array }) => {
    return (
        <div>
            {array.map((x, i) => <div key={i}>{x.name} {x.number}</div>)}
        </div>
    )
}

export default Persons