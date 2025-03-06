export function getFromLocalStorage<T>(key: string): T | null {
    try {
        const storedData = localStorage.getItem(key);
        return storedData ? (JSON.parse(storedData) as T) : null;
    } catch (error) {
        console.error(`Error getting ${key} from localStorage`, error);
        return null;
    }
}

export function setToLocalStorage<T>(key: string, value: T): void {
    try {
        const valueToStore = JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    } catch (error) {
        console.error(`Error setting ${key} to localStorage`, error);
    }
}

export function removeFromLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from localStorage`, error);
    }
}
