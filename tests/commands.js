/* eslint-env mocha */
const assert = require("chai").assert;

const orangered = require("@snooful/orangered-parser");
orangered.registerDirectory("./src/commands");

// Non-aliases, to prevent clogging
const registry = orangered.getCommandRegistry().filter(({ name, originalName }) => {
	return name === originalName;
});

describe("commands", () => {
	it("have categories", () => {
		registry.forEach(({ category, name }) => {
			assert.isString(category, `${name} does not have a category`);
		});
	});
	it("have short descriptions", () => {
		registry.forEach(({ description, name }) => {
			assert.isString(description, `${name} does not have a description`);

			// Length
			assert(description.length < 50, `${name}'s description is too long`);
			assert(description.length > 8, `${name}'s description is too short`);

			// Capital letter
			const firstLetter = description[0];
			assert.strictEqual(firstLetter.toUpperCase(), firstLetter, `${name}'s description doesn't start with a capital letter`);

			// Period at end
			assert(description.endsWith("."), `${name}'s description doesn't end with a period`);
		});
	});
});