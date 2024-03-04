// localStorage.js

// Function to load state from local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

// Function to save state to local storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

export const resetLocalStorage = () => {
  try {
    localStorage.clear();
    console.log("Local storage cleared successfully.");
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};
