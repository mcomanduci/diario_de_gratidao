"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface PrivacyContextType {
  isPrivateMode: boolean;
  togglePrivateMode: () => void;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [isPrivateMode, setIsPrivateMode] = useState(false);

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem("private-mode");
    if (saved) {
      setIsPrivateMode(JSON.parse(saved));
    }
  }, []);

  const togglePrivateMode = () => {
    setIsPrivateMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("private-mode", JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <PrivacyContext.Provider value={{ isPrivateMode, togglePrivateMode }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error("usePrivacy must be used within a PrivacyProvider");
  }
  return context;
}
