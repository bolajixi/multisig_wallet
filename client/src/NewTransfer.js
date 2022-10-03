import React, { useState } from 'react';

function NewTransfer({createTransfer}){
    const [transfer, setTransfer] = useState(undefined);
    const updateTransfer = (event, field) => {
        const value = event.target.value;
        setTransfer({...transfer, [field]: value });
    }
    const submit = (event) => {
        event.preventDefault();
        createTransfer(transfer);
    }

    return (
        <div>
            <h2>Create Transfer</h2>
            <form onSubmit={(e) => { submit(e)}} >
                <label htmlFor="amount">Amount</label>
                <input id='amount' type="text" onChange={e => updateTransfer(e, 'amount')} />
                <label htmlFor="amount">TO</label>
                <input id='to' type="text" onChange={e => updateTransfer(e, 'to')} />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewTransfer;