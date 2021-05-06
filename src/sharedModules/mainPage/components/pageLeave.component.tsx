import React from "react";

// window.onbeforeunload = () => true

// export default function PageLeave({children}:{children:any}) {
//     const [unsavedChanges, setUnsavedChanges] = useState(false);
//     console.log(unsavedChanges,'unsavedChanges');
//     return <React.Fragment>
//         {/*{unsavedChanges && <Prompt/>}*/}
//         {React.cloneElement(children,{setUnsavedChanges})}
//     </React.Fragment>;
// }

function setUnsavedChanges(hasChanges:boolean):void{
    console.log(`setUnsavedChanges`, hasChanges)
    window.onbeforeunload = hasChanges && (()=>true);
}

export default function PageLeave({children}:{children:any}) {
    return <React.Fragment>
        {React.cloneElement(children,{setUnsavedChanges})}
    </React.Fragment>;
}