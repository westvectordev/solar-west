"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

const CONSENT_STORAGE_KEY = "helionest_cookie_consent_v1";
const DISMISS_STORAGE_KEY = "helionest_cookie_banner_dismissed_v1";

export type ConsentCategory = "essential" | "analytics" | "marketing" | "preferences";

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  status: "unknown" | "accepted_all" | "rejected_optional" | "custom";
  updatedAt: string | null;
};

type ConsentContextValue = {
  consent: ConsentState;
  ready: boolean;
  isBannerVisible: boolean;
  hasConsent: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  saveCustom: (partial: Pick<ConsentState, "analytics" | "marketing" | "preferences">) => void;
  closeBanner: () => void;
  reopenBanner: () => void;
};

const defaultConsent: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
  status: "unknown",
  updatedAt: null,
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

type ProviderState = {
  consent: ConsentState;
  dismissed: boolean;
  ready: boolean;
};

type ProviderAction =
  | {
      type: "hydrate";
      payload: { consent: ConsentState; dismissed: boolean };
    }
  | { type: "setConsent"; payload: ConsentState }
  | { type: "setDismissed"; payload: boolean };

const initialProviderState: ProviderState = {
  consent: defaultConsent,
  dismissed: false,
  ready: false,
};

function providerReducer(state: ProviderState, action: ProviderAction): ProviderState {
  switch (action.type) {
    case "hydrate":
      return {
        consent: action.payload.consent,
        dismissed: action.payload.dismissed,
        ready: true,
      };
    case "setConsent":
      return {
        ...state,
        consent: action.payload,
        dismissed: false,
      };
    case "setDismissed":
      return {
        ...state,
        dismissed: action.payload,
      };
    default:
      return state;
  }
}

function safeStorageGet(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage write errors
  }
}

function safeStorageRemove(key: string) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore storage remove errors
  }
}

function loadConsent(): ConsentState {
  try {
    const stored = safeStorageGet(CONSENT_STORAGE_KEY);
    if (!stored) {
      return defaultConsent;
    }
    const parsed = JSON.parse(stored) as Partial<ConsentState>;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      preferences: Boolean(parsed.preferences),
      status: parsed.status ?? "unknown",
      updatedAt: parsed.updatedAt ?? null,
    };
  } catch {
    return defaultConsent;
  }
}

function persistConsent(value: ConsentState) {
  safeStorageSet(CONSENT_STORAGE_KEY, JSON.stringify(value));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(providerReducer, initialProviderState);
  const { consent, dismissed, ready } = state;

  useEffect(() => {
    const hydratedConsent = loadConsent();
    const hydratedDismissed = safeStorageGet(DISMISS_STORAGE_KEY) === "1";
    dispatch({
      type: "hydrate",
      payload: { consent: hydratedConsent, dismissed: hydratedDismissed },
    });
  }, []);

  const updateConsent = (next: ConsentState) => {
    dispatch({ type: "setConsent", payload: next });
    persistConsent(next);
    safeStorageRemove(DISMISS_STORAGE_KEY);
  };

  const acceptAll = () => {
    updateConsent({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
      status: "accepted_all",
      updatedAt: new Date().toISOString(),
    });
  };

  const rejectOptional = () => {
    updateConsent({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
      status: "rejected_optional",
      updatedAt: new Date().toISOString(),
    });
  };

  const saveCustom = (
    partial: Pick<ConsentState, "analytics" | "marketing" | "preferences">
  ) => {
    updateConsent({
      essential: true,
      analytics: partial.analytics,
      marketing: partial.marketing,
      preferences: partial.preferences,
      status: "custom",
      updatedAt: new Date().toISOString(),
    });
  };

  const closeBanner = () => {
    safeStorageSet(DISMISS_STORAGE_KEY, "1");
    dispatch({ type: "setDismissed", payload: true });
  };

  const reopenBanner = () => {
    safeStorageRemove(DISMISS_STORAGE_KEY);
    dispatch({ type: "setDismissed", payload: false });
  };

  const hasConsent = (category: ConsentCategory) => {
    if (category === "essential") {
      return true;
    }
    return consent[category];
  };

  const isBannerVisible = ready && consent.status === "unknown" && !dismissed;

  const value: ConsentContextValue = {
    consent,
    ready,
    isBannerVisible,
    hasConsent,
    acceptAll,
    rejectOptional,
    saveCustom,
    closeBanner,
    reopenBanner,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider.");
  }
  return context;
}
