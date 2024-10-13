interface StartingArea {
    id: number;
    name: string;
    description: string;
    parent_area_id: number | null;
}

export const fetchStartingAreasFromApi = async (): Promise<StartingArea[]> => {
    const response = await fetch('http://localhost:5000/api/starting_areas');
    if (!response) {
        throw new Error('Failed to fetch starting areas');
    }
    return response.json() as Promise<StartingArea[]>;
}