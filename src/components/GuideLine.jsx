import Guides from "@scena/react-guides";
import { useEffect, useRef } from "react";
import "../style/GuideLine.style.css";

export default function GuideLine() {
    const horizonalGuidesRef = useRef();
    const verticalGuidesRef = useRef();

    return (
        <div
            className="App"
            onWheel={(e) => {
                const deltaX = e.deltaX;
                const deltaY = e.deltaY;
                const scrollX = horizonalGuidesRef.current.getRulerScrollPos() + deltaX;
                const scrollY = verticalGuidesRef.current.getRulerScrollPos() + deltaY;

                horizonalGuidesRef.current.scrollGuides(scrollY);
                verticalGuidesRef.current.scrollGuides(scrollX);
                horizonalGuidesRef.current.scroll(scrollX);
                verticalGuidesRef.current.scroll(scrollY);
            }}
        >
            <div className="ruler horizontal">
                <Guides
                    ref={horizonalGuidesRef}
                    type="horizontal"
                    rulerStyle={{
                        left: "30px",
                        width: "calc(100% - 30px)",
                        height: "100%"
                    }}
                    displayDragPos={true}
                    displayGuidePos={true}
                    useResizeObserver={true}
                    unit={1}
                    zoom={96}

                />
            </div>

            <div className="ruler vertical">
                <Guides
                    ref={verticalGuidesRef}
                    type="vertical"
                    rulerStyle={{
                        top: "30px",
                        height: "calc(100% - 30px)",
                        width: "100%"
                    }}
                    displayDragPos={true}
                    displayGuidePos={true}
                    useResizeObserver={true}
                    unit={1}
                    zoom={96}
                />
            </div>
        </div>
    );
}
