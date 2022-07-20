import React from 'react';
import { Progress } from 'dw-mx';

export default function Cricle(props) {
    const { percent, percentColor, strokeColor, text, cricleName } = props;
    // FB8E78
    return (
        <>
            <div style={{ marginTop: '0.25rem', marginLeft: 'calc( (100% -  360px)/2 )' }}>
                <Progress type={'circle'} percent={percent} format={(percent) => {
                    return <div>
                        <div style={{ fontSize: '0.3rem', fontWeight: 700, color: percentColor }}>
                            {percent}%
                        </div>
                        <div style={{ color: '#666666', fontSize: '0.16rem', marginTop: '0.22rem' }}>{text}</div>
                    </div>;
                }} strokeColor={strokeColor} width={160} />
            </div>
            <div style={{
                fontSize: '0.16rem',
                display: 'block',
                textAlign: 'center',
                marginTop: '0.2rem'
            }}>{cricleName}</div>
        </>
    );
}