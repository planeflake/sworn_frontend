import React from "react";  
import ResourceBar from "./ResourceBar";
import { MainStatsBar } from "./MainStatsBar";

const MainBar:React.FC = () => {
    return (
        <div>
            <MainStatsBar />
            <ResourceBar />
        </div>
    );
};

export { MainBar };