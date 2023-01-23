import React from "react";

const Persons = ({ array, deletePerson }) => {
    return (
        <div>
            {array.map((x) => <div key={x.id}>{x.name} {x.number}<button onClick={() => deletePerson(x)}>delete</button> </div>)}
        </div>
    )
}

export default Persons