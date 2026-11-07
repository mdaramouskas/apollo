"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe localStorage access. The server snapshot is always `null`, so
 * the first client render matches the server HTML; the real value arrives right
 * after hydration. `writeStorage` notifies every subscriber in this tab.
 */
const EVENT = "local-storage-change";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / blocked — in-memory only */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useStorageValue(key: string): string | null {
  return useSyncExternalStore(subscribe, () => readStorage(key), () => null);
}

/** `false` on the server and during hydration, `true` afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}
