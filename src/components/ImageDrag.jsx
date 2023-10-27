import * as React from "react";
import Moveable from "react-moveable";

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    throttleDrag={1}
                    edgeDraggable={false}
                    startDragRotate={0}
                    throttleDragRotate={0}
                    scalable={true}
                    keepRatio={false}
                    throttleScale={0}
                    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                    rotatable={true}
                    throttleRotate={0}
                    rotationPosition={"top"}
                    originDraggable={true}
                    originRelative={true}
                    onDragOrigin={e => {
                        e.target.style.transformOrigin = e.transformOrigin;
                    }}
                    onRender={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}