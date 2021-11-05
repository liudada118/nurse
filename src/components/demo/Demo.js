import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

export default function Demo() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            {/* <ComponentToPrint ref={componentRef} /> */}
            <div ref={componentRef} style={{color : 'red'}}>111</div>
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
};