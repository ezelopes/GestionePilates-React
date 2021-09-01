import React from 'react';

const Divider = ({ half = false }) => {
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