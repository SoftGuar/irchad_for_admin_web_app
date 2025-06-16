import React, { createContext, useState } from 'react';

// Create context
export const ReloadContext = createContext();

// Context provider
export const ReloadProvider = ({ children }) => {
  const [reloadKey, setReloadKey] = useState(0);

  const triggerReload = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <ReloadContext.Provider value={{ reloadKey, triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};
