import * as React from "react";
import Moveable, { MoveableManagerInterface, Renderer } from "react-moveable";



export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <div className="target" ref={targetRef}>Target</div>
        <Moveable
            target={targetRef}
            ables={[DimensionViewable]}
            draggable={true}
            resizable={true}
            rotatable={true}
            props={{
                dimensionViewable: true,
            }}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
            onResize={e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }}
            onRotate={e => {
                e.target.style.transform = e.drag.transform;
            }}
        />
    </div>;
}