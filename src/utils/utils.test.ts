import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { displayNumbers } from "./displayNumber";
import { textTruncate } from "./textTruncate";

describe("Utility Functions", () => {
  describe("capitalizeFirstLetter", () => {
    it("capitalizes the first letter of a string", () => {
      expect(capitalizeFirstLetter("hello")).toBe("Hello");
      expect(capitalizeFirstLetter("world")).toBe("World");
    });
  });

  describe("displayNumbers", () => {
    it("formats numbers with thousands separator", () => {
      expect(displayNumbers(1000)).toBe("1,000");
      expect(displayNumbers(1234567890)).toBe("1,234,567,890");
    });
  });

  describe("textTruncate", () => {
    it("truncates text to the specified length and adds ellipsis", () => {
      expect(textTruncate("Lorem ipsum dolor sit amet", 10)).toBe("Lorem...");
      expect(textTruncate("This is a long sentence", 15)).toBe(
        "This is a long..."
      );
      expect(textTruncate("Short text", 20)).toBe("Short text");
    });

    it("returns an empty string for invalid or non-string input", () => {
      expect(textTruncate(null as any, 10)).toBe("");
      expect(textTruncate(undefined as any, 10)).toBe("");
      expect(textTruncate(123 as any, 10)).toBe("");
      expect(textTruncate({} as any, 10)).toBe("");
    });
  });
});
