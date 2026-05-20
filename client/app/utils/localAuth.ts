"use client";

export interface LocalUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface LocalSession {
  userId: string;
  name: string;
  email: string;
}

export const usersStorageKey = "ai-code-review-users";
export const sessionStorageKey = "ai-code-review-session";
export const reviewHistoryStorageKey = "ai-code-review-history";
export const openHistoryStorageKey = "ai-code-review-open-history";

export const getLocalUsers = (): LocalUser[] => {
  try {
    const savedUsers = localStorage.getItem(usersStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch {
    localStorage.removeItem(usersStorageKey);
    return [];
  }
};

export const saveLocalUsers = (users: LocalUser[]) => {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
};

export const getLocalSession = (): LocalSession | null => {
  try {
    const savedSession = localStorage.getItem(sessionStorageKey);
    return savedSession ? JSON.parse(savedSession) : null;
  } catch {
    localStorage.removeItem(sessionStorageKey);
    return null;
  }
};

export const saveLocalSession = (session: LocalSession) => {
  localStorage.setItem(sessionStorageKey, JSON.stringify(session));
};

export const clearLocalSession = () => {
  localStorage.removeItem(sessionStorageKey);
};
