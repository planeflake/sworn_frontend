import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CharacterResource } from "../types/types";

const ResourceBar: React.FC = () => {
    const { t } = useTranslation('common');
    
    // Correct the useSelector to match the state structure
    const resources = useSelector((state: RootState) => state.character.resources) as CharacterResource[];

    return (
        <div className="resource-bar">
            <h2>{t('resources')}</h2>
            <ul>
                {resources.map((resource) => (
                    <li key={resource.id}>
                        {resource.name}: {resource.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResourceBar;
