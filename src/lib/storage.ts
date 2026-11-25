import { AIPackageOption, BookingRequest } from "@/types";

const SAVED_PACKAGES_KEY = "yatra_vista_saved_packages";
const BOOKINGS_KEY = "yatra_vista_bookings";

export function getSavedPackages(): AIPackageOption[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(SAVED_PACKAGES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading saved packages", e);
    return [];
  }
}

export function savePackage(pkg: AIPackageOption): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getSavedPackages();
    const updated = [pkg, ...existing.filter((p) => p.id !== pkg.id)];
    localStorage.setItem(SAVED_PACKAGES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Error saving package", e);
    return false;
  }
}

export function removeSavedPackage(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getSavedPackages();
    const updated = existing.filter((p) => p.id !== id);
    localStorage.setItem(SAVED_PACKAGES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Error removing package", e);
    return false;
  }
}

export function getBookings(): BookingRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading bookings", e);
    return [];
  }
}

export function saveBooking(booking: BookingRequest): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getBookings();
    const updated = [booking, ...existing];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Error saving booking", e);
    return false;
  }
}
