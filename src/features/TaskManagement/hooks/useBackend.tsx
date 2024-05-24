import { useContext } from "react";
import { BackendContext, BackendContextType } from "../stores/BackendContext";


export const useBackend = (): BackendContextType => {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend must be used within a BackendProvider');
  }
  return context;
};