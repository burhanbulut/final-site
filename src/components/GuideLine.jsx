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
                    height={30}
                    width={1200}
                    textOffset={[0, 5]}
                    font={'15px sans-serif'}
                    rulerStyle={{
                        left: "25px",
                        width: "calc(100% - 30px)",
                        height: "100%",
                    }}
                    displayDragPos={true}
                    displayGuidePos={true}
                    useResizeObserver={true}
                    unit={1}
                    zoom={96}
                    backgroundColor={'#F0FDF4'}
                    textColor={'#777F8A'}

                />
            </div>

            <div className="ruler vertical">
                <Guides
                    ref={verticalGuidesRef}
                    type="vertical"
                    height={1200}
                    width={30}
                    textOffset={[5, 0]}
                    font={'15px sans-serif'}
                    rulerStyle={{
                        top: "25px",
                        height: "calc(100% - 30px)",
                        width: "100%",
                    }}
                    displayDragPos={true}
                    displayGuidePos={true}
                    useResizeObserver={true}
                    unit={1}
                    zoom={96}
                    markColor={'#F0FDF4'}
                    backgroundColor={'#F0FDF4'}
                    textColor={'#777F8A'}
                    negativeRuler={false}

                />
            </div>
        </div>
    );
}
