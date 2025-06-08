export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    #reap() {
        for (const [key, value] of this.#cache) {
            if (value.createdAt <= Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
    add(key, val) {
        const newEntry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, newEntry);
    }
    get(key) {
        return this.#cache.get(key)?.val;
    }
}
