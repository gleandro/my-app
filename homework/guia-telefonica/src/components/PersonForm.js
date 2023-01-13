import React from "react";

const PersonForm = ({ addPhone, newName, newNumber,changeNewName, changeNewNumber}) => {
    return (
        <form onSubmit={addPhone}>
            <div>name: <input value={newName} onChange={changeNewName} /> </div>
            <div>number: <input value={newNumber} onChange={changeNewNumber} /> </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm