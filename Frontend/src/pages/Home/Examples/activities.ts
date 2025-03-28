export const exampleActivities = [
  {
    name: "A",
    precedents: [],
    optimist: 2,
    probable: 3.5,
    pessimist: 4,
    cost: 12500000,
    acceleration: 2.5,
    acceleration_cost: 13500000,
  },
  {
    name: "B",
    precedents: [],
    optimist: 4,
    probable: 4,
    pessimist: 4,
    cost: 13870420,
    acceleration: 3,
    acceleration_cost: 14950000,
  },
  {
    name: "C",
    precedents: [],
    optimist: 3,
    probable: 3,
    pessimist: 3,
    cost: 9870000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "D",
    precedents: ["A"],
    optimist: 4,
    probable: 7,
    pessimist: 9,
    cost: 16230450,
    acceleration: 5,
    acceleration_cost: 17890000,
  },
  {
    name: "E",
    precedents: ["A"],
    optimist: 5,
    probable: 5,
    pessimist: 5,
    cost: 14230890,
    acceleration: 4,
    acceleration_cost: 15338000,
  },
  {
    name: "F",
    precedents: ["B"],
    optimist: 2,
    probable: 2,
    pessimist: 2,
    cost: 7845360,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "G",
    precedents: ["C"],
    optimist: 1,
    probable: 1,
    pessimist: 1,
    cost: 3245000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "H",
    precedents: ["C"],
    optimist: 5,
    probable: 5,
    pessimist: 5,
    cost: 13245670,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "I",
    precedents: ["D", "E"],
    optimist: 5,
    probable: 6,
    pessimist: 7,
    cost: 15220000,
    acceleration: 5,
    acceleration_cost: 16450000,
  },
  {
    name: "J",
    precedents: ["F"],
    optimist: 7,
    probable: 9,
    pessimist: 11,
    cost: 19320000,
    acceleration: 8,
    acceleration_cost: 20890000,
  },
  {
    name: "K",
    precedents: ["G", "H"],
    optimist: 7,
    probable: 7,
    pessimist: 7,
    cost: 14870000,
    acceleration: 6,
    acceleration_cost: 15450000,
  },
  {
    name: "L",
    precedents: ["I", "J", "K"],
    optimist: 8,
    probable: 8,
    pessimist: 8,
    cost: 15300000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "M",
    precedents: ["L"],
    optimist: 2,
    probable: 2,
    pessimist: 2,
    cost: 6890000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "N",
    precedents: ["L"],
    optimist: 1,
    probable: 1,
    pessimist: 1,
    cost: 1340000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "O",
    precedents: ["M"],
    optimist: 2,
    probable: 5,
    pessimist: 7,
    cost: 11230789,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "P",
    precedents: ["N"],
    optimist: 5,
    probable: 5,
    pessimist: 5,
    cost: 12120000,
    acceleration: null,
    acceleration_cost: null,
  },
  {
    name: "Q",
    precedents: ["O", "P"],
    optimist: 3,
    probable: 3,
    pessimist: 3,
    cost: 8560000,
    acceleration: null,
    acceleration_cost: null,
  },
];
