import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a union type for all possible visible component names
// This ensures type safety when referencing component names throughout the slice
type VisibleComponentName = 'skillsPanel' | 'inventoryPanel' | 'mapPanel' | 'mainBarTop';

// Define the shape of our UI state
interface UiState {
  // The current theme of the application
  theme: 'light' | 'dark';
  
  // An object containing the visibility state of each component
  // We use the VisibleComponentName type to ensure all components are accounted for
  visibleComponents: {
    [K in VisibleComponentName]: boolean;
  };
}

// Define the initial state of our UI
const initialState: UiState = {
  theme: 'light',
  visibleComponents: {
    skillsPanel: true,
    inventoryPanel: false,
    mapPanel: false,
    mainBarTop: true,
  },
};

// Create the slice
const uiSlice = createSlice({
  // The name of this slice. This will be used as a prefix for the generated action types
  name: 'ui',
  
  // The initial state of this slice
  initialState,
  
  // Define the reducers. These are functions that specify how the state should change
  // in response to actions
  reducers: {
    // Reducer to set the theme
    // It takes the current state and an action with a payload of 'light' or 'dark'
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      // Update the theme in the state to the value provided in the action payload
      state.theme = action.payload;
    },
    
    // Reducer to toggle the visibility of a component
    // It takes the current state and an action with a payload of type VisibleComponentName
    toggleComponent: (state, action: PayloadAction<VisibleComponentName>) => {
      // Toggle the boolean value for the specified component
      state.visibleComponents[action.payload] = !state.visibleComponents[action.payload];
    },
    
    // Reducer to set the visibility of a component to a specific value
    // It takes the current state and an action with a payload containing the component name and desired visibility
    setComponentVisibility: (
      state,
      action: PayloadAction<{ component: VisibleComponentName; isVisible: boolean }>
    ) => {
      // Set the visibility of the specified component to the provided value
      state.visibleComponents[action.payload.component] = action.payload.isVisible;
    },
  },
});

// Export the action creators
// These will be used to dispatch actions from our components
export const { setTheme, toggleComponent, setComponentVisibility } = uiSlice.actions;

// Export the reducer
// This will be used in our store configuration
export default uiSlice.reducer;