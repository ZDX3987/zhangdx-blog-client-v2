export function setStorageItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeStorageItem(key) {
  localStorage.removeItem(key);
}

export function getStorageItem(key) {
  return localStorage.getItem(key);
}

export function getAuthorization() {
    return getStorageItem('Authorization');
}

export function removeAuthorization() {
    removeStorageItem('Authorization');
}
