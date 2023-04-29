import React from "react";

interface BuilderProps {
    options: {
        setItems: (items: object[]) => {}
    },
    items: object[],
}
const Builder = (props: BuilderProps) => {
    return <div className='builder'>

    </div>
}

export default Builder