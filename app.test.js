const { formatAstronaut } = require("../server");

test("counts astronauts", () => {
  const mock = {
    people: [{}, {}, {}]
  };

  expect(formatAstronaut(mock)).toBe(3);
});