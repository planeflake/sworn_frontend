import React from "react";  
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const MainStatsBar:React.FC = () => {

    const baseCharacterInfo = useSelector((state: RootState) => state.character);
    console.log("baseCharacterInfo: ", baseCharacterInfo);
    return (
        <div>
            <h1>{baseCharacterInfo.name}</h1>
            <h2>{baseCharacterInfo.level}</h2>
            <h2>{baseCharacterInfo.health} / {baseCharacterInfo.max_health}</h2>
        </div>
    );
};

export { MainStatsBar };