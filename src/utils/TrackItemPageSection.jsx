import React, { useEffect } from "react";
import { useViewTime } from "./awesomeHooks";

export default function TrackItemPageSection({ id, setSectionTimingData, children }) {
    const { elementRef, isVisible, totalViewTime, maxViewTime } = useViewTime();
    
    useEffect(() => {
        setSectionTimingData((prev) => ({ ...prev, [id]: { isVisible, totalViewTime, maxViewTime } }))
    }, [isVisible, totalViewTime, maxViewTime]);
    
    return (
        <div ref={elementRef}>
            { children }
        </div>
    );
};
