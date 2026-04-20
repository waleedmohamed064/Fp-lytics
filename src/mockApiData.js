"use strict";

const mockApiData = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    price: 14.0,
    expectedPoints: 8.4,
    totalPoints: 224,
    nextFixture: "Chelsea (A)",
    imageUrl: "https://via.placeholder.com/120x120?text=Haaland",
  },
  {
    id: 2,
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Midfielder",
    price: 13.2,
    expectedPoints: 7.8,
    totalPoints: 210,
    nextFixture: "Brighton (H)",
    imageUrl: "https://via.placeholder.com/120x120?text=Salah",
  },
  {
    id: 3,
    name: "Cole Palmer",
    team: "Chelsea",
    position: "Midfielder",
    price: 10.8,
    expectedPoints: 6.9,
    totalPoints: 198,
    nextFixture: "Manchester City (H)",
    imageUrl: "https://via.placeholder.com/120x120?text=Palmer",
  },
  {
    id: 4,
    name: "Bukayo Saka",
    team: "Arsenal",
    position: "Midfielder",
    price: 10.1,
    expectedPoints: 6.5,
    totalPoints: 186,
    nextFixture: "Tottenham (A)",
    imageUrl: "https://via.placeholder.com/120x120?text=Saka",
  },
];

export default mockApiData;
