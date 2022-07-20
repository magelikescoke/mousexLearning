import React from 'react';

export default function NumberNav(props) {
    const { title, number } = props;
    return (
        <>
            <div style={{textAlign:'center'}}>
                <div style={{fontSize:'0.25rem',color:'rgb(23,81,254)',fontWeight:700}}>
                    {number}
                </div>
                <div style={{fontSize:'0.1rem'}}>
                    {title}
                </div>
            </div>
        </>
    )
}