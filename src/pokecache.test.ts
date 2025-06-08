import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
  {
    key: "https://example.com/10000",
    val: "long_wait_test_data",
    interval: 10000, // 10 seconds
  },
  {
    key: "https://example.com/object",
    val: { property1: "heh", property2: "hah", },
    interval: 3000, // 3 seconds
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval/2));
  const reaped1 = cache.get(key);
  expect(reaped1).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval/2 + 100));
  const reaped2 = cache.get(key);
  expect(reaped2).toBe(undefined);

  cache.stopReapLoop();
}, 20000);