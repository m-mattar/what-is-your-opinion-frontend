
class LocalStorageUtils {
  public setPair(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  public getPair(key: string) {
    window.localStorage.getItem(key);
  }

  public deletePair(key: string) {
    window.localStorage.removeItem(key);
  }

  public clearStorage() {
    window.localStorage.clear();
  }
}

export const localStorageUtils = new LocalStorageUtils();