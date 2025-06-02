import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each ([
    {
        input: "   hello world   ",
        expected: ["hello", "world"],
    },
    {
        input: "",
        expected: [],
    },
    {
        input: "    HAHAHA aNOtHeR tEsT   ",
        expected: ["hahaha", "another", "test"],
    },
    {
        input: "  Hello     World  ",
        expected: ["hello", "world"],
    },
    {
        input: "             ",
        expected: [],
    },
    
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: [${expected}]`, () => {
        let actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});