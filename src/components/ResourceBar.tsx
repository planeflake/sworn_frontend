import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/store';  // Import the useAppDispatch hook
import { fetchResources, selectResources, selectResourcesStatus } from '../features/resources/resourcesSlice';
import { CharacterResource } from '../types/types';
const ResourceBar: React.FC = () => {
  const dispatch = useAppDispatch();  // Use the custom hook to get the dispatch function

  const resources = useSelector(selectResources);
  const status = useSelector(selectResourcesStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResources());
    }
  }, [dispatch, status]);

  console.log("Resources: ",resources);

  return (
    <div className="resource-bar">
      <h2>Resources</h2>
      {status === 'loading' && <p>Loading resources...</p>}
      {status === 'failed' && <p>Failed to load resources.</p>}
      <ul>
        {resources && resources.length > 0 ? (
          resources.map((resource: CharacterResource) => (
            <li key={resource.resource_id}>
              {resource.name}: {resource.quantity}
            </li>
          ))
        ) : (
          <li>No resources available.</li>
        )}
      </ul>
    </div>
  );
};

export default ResourceBar;
