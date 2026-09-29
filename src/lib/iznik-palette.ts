export const IZNIK_WAYS = {
  classical: {
    id: "classical",
    name: "Classical",
    years: "1550–1600",
    note: "Kara Memi polychrome — cobalt, turquoise, bole red, emerald on white slip.",
    slip: "#F4EFE4",
    cobalt: "#1A4A8C",
    cobaltDeep: "#123463",
    turquoise: "#2A8F8A",
    turquoiseLight: "#4EADA6",
    bole: "#C13B2F",
    boleDeep: "#9A2E24",
    emerald: "#2F6A4A",
    ink: "#1A2332",
  },
  cobalt: {
    id: "cobalt",
    name: "Baba Nakkaş",
    years: "1480–1520",
    note: "Early İznik blue-and-white, before the red bole was fired.",
    slip: "#F7F3E8",
    cobalt: "#1B4E8C",
    cobaltDeep: "#0F3260",
    turquoise: "#5C8FBF",
    turquoiseLight: "#8AB0D4",
    bole: "#1B4E8C",
    boleDeep: "#0F3260",
    emerald: "#2A5A86",
    ink: "#16304F",
  },
  turquoise: {
    id: "turquoise",
    name: "Damascus",
    years: "1530–1550",
    note: "Sage, turquoise and cobalt — the palette before relief red.",
    slip: "#F3F0E6",
    cobalt: "#1A4A7A",
    cobaltDeep: "#123352",
    turquoise: "#2A9B94",
    turquoiseLight: "#5BC4BB",
    bole: "#3D7A5A",
    boleDeep: "#2A5A42",
    emerald: "#3D7A5A",
    ink: "#1A2E32",
  },
} as const;

export type IznikWayId = keyof typeof IZNIK_WAYS;
export type IznikWay = (typeof IZNIK_WAYS)[IznikWayId];

export const IZNIK_LAYERS = [
  { id: "rim", label: "Pearl rim", hint: "Cobalt bands and white-slip pearls" },
  { id: "band", label: "Cloud band", hint: "Chinese-inspired rumi wave" },
  { id: "wreath", label: "Floral wreath", hint: "Tulip, carnation, saz and çintemani" },
  { id: "star", label: "Star ring", hint: "Eight-fold khatam" },
  { id: "rosette", label: "Hatayi rosette", hint: "Central shamsa" },
] as const;

export type IznikLayerId = (typeof IZNIK_LAYERS)[number]["id"];

export const IZNIK_MOTIFS = [
  {
    id: "tulip",
    name: "Lale",
    latin: "Tulip",
    copy: "The Ottoman flower. A slender three-lobed profile, often bole red, bending like a flame toward the rim.",
  },
  {
    id: "carnation",
    name: "Karanfil",
    latin: "Carnation",
    copy: "A compact, toothed crown rising from a green calyx — the wreath’s counterpoint to the tulip.",
  },
  {
    id: "saz",
    name: "Saz",
    latin: "Serrated leaf",
    copy: "The long, saw-edged leaf of the saz style. It weaves behind the blossoms and sets the wreath in motion.",
  },
  {
    id: "hyacinth",
    name: "Sümbül",
    latin: "Hyacinth",
    copy: "An arching spray of small bells. In İznik it is almost always cobalt, counted along a single curved stem.",
  },
  {
    id: "hatayi",
    name: "Hatayi",
    latin: "Rosette",
    copy: "A stylized lotus seen from above — the shamsa at the heart of the mark, sixteen petals around a bole disc.",
  },
  {
    id: "palmette",
    name: "Rumi",
    latin: "Palmette",
    copy: "Split-leaf arabesque inherited from Seljuk rumi. It studs the cloud band and the star ring.",
  },
] as const;
