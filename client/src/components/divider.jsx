import React from 'react';

const Divider = ({ half = false, single = false, double = false }) => {

    if (single) {
        return <div style={{ marginTop: '1em'}} />
    }

    if (double) {
        return <div style={{ marginTop: '2em'}} />
    }

    return (
        <>
            <div style={{ marginTop: '1em'}} />
            <div style={{ marginTop: '1em'}} />
            {!half ? (
                <>
                    <div style={{ marginTop: '1em'}} />
                    <div style={{ marginTop: '1em'}} />
                </>
              )
                : <> </>
            }
        </>
    );
}

export default Divider;