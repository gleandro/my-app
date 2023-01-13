import React from "react";

const Filter = ({ filter, filterPhone }) => {
    return <div>filter Phones <input value={filter} onChange={filterPhone} /> </div>
}

export default Filter