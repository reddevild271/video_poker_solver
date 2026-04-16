const SUITS = [
    { key: "S", label: "Spades", symbol: "♠", css: "spades" },
    { key: "H", label: "Hearts", symbol: "♥", css: "hearts", red: true },
    { key: "C", label: "Clubs", symbol: "♣", css: "clubs" },
    { key: "D", label: "Diamonds", symbol: "♦", css: "diamonds", red: true }
];

const RANKS = [
    { value: 14, label: "A" },
    { value: 13, label: "K" },
    { value: 12, label: "Q" },
    { value: 11, label: "J" },
    { value: 10, label: "10" },
    { value: 9, label: "9" },
    { value: 8, label: "8" },
    { value: 7, label: "7" },
    { value: 6, label: "6" },
    { value: 5, label: "5" },
    { value: 4, label: "4" },
    { value: 3, label: "3" },
    { value: 2, label: "2" }
];

const DEFAULT_PAYTABLE = {
    royal_flush: 25,
    straight_flush: 20,
    four_kind: 15,
    full_house: 10,
    flush: 8,
    straight: 5,
    three_kind: 3,
    two_pair: 2,
    jacks_or_better: 1
};

const PAYOUT_ROWS = [
    ["Royal Flush", "royal_flush"],
    ["Straight Flush", "straight_flush"],
    ["Four of a Kind", "four_kind"],
    ["Full House", "full_house"],
    ["Flush", "flush"],
    ["Straight", "straight"],
    ["Three of a Kind", "three_kind"],
    ["Two Pair", "two_pair"],
    ["Jacks or Better", "jacks_or_better"]
];

const ADVANCED_CHEAT_ROWS = [
    ["Pat Hand", "Straight; Flush; Full House; Four of a Kind; Straight Flush; Royal Flush"],
    ["3 of a Kind", "222; 333; 444; 555; 666; 777; 888; 999; TTT; JJJ; QQQ; KKK; AAA"],
    ["2 Pair", "2233; 2244; 2255; 2266; 2277; 2288; 2299; 22TT; 22JJ; 22QQ; 22KK; 22AA; ..."],
    ["4 to a Royal Flush", "TJQA; TJQK; TJKA; TQKA; JQKA"],
    ["4 to a Straight Flush", "A234; A235; A245; A345; 2345; 2346; 2356; 2456; 3456; 3457; 3467; 3567; ..."],
    ["4 to a Flush", "2347; 2348; 2349; 234T; 234J; 234Q; 234K; 2357; 2358; 2359; 235T; 235J; ..."],
    ["1 Pair", "JJ; QQ; KK; AA"],
    ["4 to a Straight", "2345; 3456; 4567; 5678; 6789; 789T; 89TJ; 9TJQ; TJQK"],
    ["3 to a Royal Flush", "TJQ; JQK"],
    ["1 Pair", "TT"],
    ["3 to a Royal Flush", "JQA; JKA; QKA"],
    ["1 Pair", "22; 33; 44; 55; 66; 77; 88; 99"],
    ["3 to a Royal Flush", "TJA; TJK; TQA; TQK; TKA"],
    ["3 to a Straight Flush", "A23; A24; A25; A34; A35; A45; 345; 456; 567; 678; 789; 78J; 89T; 89J; ..."],
    ["4 to a Straight", "JQKA"],
    ["3 to a Flush", "2JA; 2JQ; 2JK; 2QA; 2QK; 2KA; 3JA; 3JQ; 3JK; 3QA; 3QK; 3KA; 4JA; 4JQ; ..."],
    ["4 to a Straight", "9JQK; TJQA; TJKA; TQKA"],
    ["2 to a Royal Flush", "JQ; JK"],
    ["3 to a Straight Flush", "234; 235; 245; 346; 356; 457; 467; 568; 578; 679; 689; 78T; 79T; 79J; ..."],
    ["4 to a Straight", "89JQ; 8TJQ; 9TJK"],
    ["2 to a Royal Flush", "JA; QA; QK; KA"],
    ["4 to a Straight", "9TQK"],
    ["3 to a Straight", "JQK"],
    ["3 to a Flush", "23J; 23Q; 23K; 24J; 24Q; 24K; 25J; 25Q; 25K; 26A; 26J; 26Q; 26K; 27A; ..."],
    ["3 to a Straight", "TJQ"],
    ["2 to a Straight", "JQ"],
    ["3 to a Straight Flush", "236; 246; 256; 347; 357; 367; 458; 468; 478; 569; 579; 589; 67T; 68T; 69T"],
    ["2 to a Straight", "JK; QK"],
    ["4 to a Straight", "A234; A235; A245; A345; 789J; 78TJ; 79TJ; 89TQ"],
    ["2 to a Royal Flush", "TJ"],
    ["2 to a Straight", "JA; QA; KA"],
    ["Single Card", "a Jack; a Queen; a King; an Ace"],
    ["3 to a Flush", "237; 238; 239; 23T; 247; 248; 249; 24T; 257; 258; 259; 25T; 267; 268; ..."],
    ["4 to a Straight", "2346; 2356; 2456; 3457; 3467; 3567; 4568; 4578; 4678; 5679; 5689; 5789; ..."],
    ["Garbage", "Discard everything"]
];

// Split variant: Pat Hand row exploded into 6 individual rows, rest unchanged.
const ADVANCED_CHEAT_ROWS_SPLIT = [
    ["Royal Flush", "TJQKA suited — hold all five"],
    ["Straight Flush", "Five consecutive same-suit cards — hold all five"],
    ["Four of a Kind", "All four of a rank — hold all five"],
    ["Full House", "Three of a kind + a pair — hold all five"],
    ["Flush", "Five same-suit cards — hold all five"],
    ["Straight", "Five consecutive cards — hold all five"],
    ...ADVANCED_CHEAT_ROWS.slice(1)
];

const STRATEGY_PATTERNS = [
    { label: "Royal Flush", goal: "Keep pat hand", mask: 31, cards: [{ rank: 14, suit: "S" }, { rank: 13, suit: "S" }, { rank: 12, suit: "S" }, { rank: 11, suit: "S" }, { rank: 10, suit: "S" }] },
    { label: "Straight Flush", goal: "Keep pat hand", mask: 31, cards: [{ rank: 9, suit: "S" }, { rank: 8, suit: "S" }, { rank: 7, suit: "S" }, { rank: 6, suit: "S" }, { rank: 5, suit: "S" }] },
    { label: "Four of a Kind", goal: "Keep pat hand", mask: 31, cards: [{ rank: 9, suit: "S" }, { rank: 9, suit: "H" }, { rank: 9, suit: "D" }, { rank: 9, suit: "C" }, { rank: 2, suit: "S" }] },
    { label: "4 to a Royal Flush", goal: "Royal draw", mask: 15, cards: [{ rank: 14, suit: "S" }, { rank: 13, suit: "S" }, { rank: 12, suit: "S" }, { rank: 11, suit: "S" }, { rank: 3, suit: "D" }] },
    { label: "Full House", goal: "Keep pat hand", mask: 31, cards: [{ rank: 10, suit: "S" }, { rank: 10, suit: "H" }, { rank: 10, suit: "D" }, { rank: 3, suit: "C" }, { rank: 3, suit: "S" }] },
    { label: "Flush", goal: "Keep pat hand", mask: 31, cards: [{ rank: 14, suit: "S" }, { rank: 11, suit: "S" }, { rank: 8, suit: "S" }, { rank: 5, suit: "S" }, { rank: 2, suit: "S" }] },
    { label: "Straight", goal: "Keep pat hand", mask: 31, cards: [{ rank: 9, suit: "S" }, { rank: 8, suit: "H" }, { rank: 7, suit: "D" }, { rank: 6, suit: "C" }, { rank: 5, suit: "S" }] },
    { label: "Three of a Kind", goal: "Draw for full house/quads", mask: 7, cards: [{ rank: 7, suit: "S" }, { rank: 7, suit: "H" }, { rank: 7, suit: "D" }, { rank: 13, suit: "C" }, { rank: 2, suit: "S" }] },
    { label: "4 to a Straight Flush", goal: "Straight flush draw", mask: 15, cards: [{ rank: 9, suit: "S" }, { rank: 8, suit: "S" }, { rank: 7, suit: "S" }, { rank: 5, suit: "S" }, { rank: 2, suit: "D" }] },
    { label: "Two Pair", goal: "Draw for full house", mask: 15, cards: [{ rank: 11, suit: "S" }, { rank: 11, suit: "H" }, { rank: 4, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "S" }] },
    { label: "High Pair", goal: "Guaranteed payout with upgrade chance", mask: 3, cards: [{ rank: 11, suit: "S" }, { rank: 11, suit: "H" }, { rank: 8, suit: "D" }, { rank: 5, suit: "C" }, { rank: 2, suit: "S" }] },
    { label: "3 to a Royal Flush", goal: "Royal draw", mask: 7, cards: [{ rank: 14, suit: "S" }, { rank: 13, suit: "S" }, { rank: 12, suit: "S" }, { rank: 6, suit: "D" }, { rank: 2, suit: "C" }] },
    { label: "4 to a Flush", goal: "Flush draw", mask: 15, cards: [{ rank: 14, suit: "S" }, { rank: 9, suit: "S" }, { rank: 6, suit: "S" }, { rank: 3, suit: "S" }, { rank: 2, suit: "D" }] },
    { label: "Low Pair", goal: "Trips/full house/quads draw", mask: 3, cards: [{ rank: 8, suit: "S" }, { rank: 8, suit: "H" }, { rank: 13, suit: "D" }, { rank: 5, suit: "C" }, { rank: 2, suit: "S" }] },
    { label: "4 to an Outside Straight", goal: "Open-ended straight draw", mask: 15, cards: [{ rank: 8, suit: "S" }, { rank: 7, suit: "H" }, { rank: 6, suit: "D" }, { rank: 5, suit: "C" }, { rank: 2, suit: "S" }] },
    {
        label: "2 Suited High Cards", goal: "High pair / broadway / flush potential", mask: 3, sampleCards: [
            [{ rank: 11, suit: "S" }, { rank: 12, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 11, suit: "S" }, { rank: 13, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 11, suit: "S" }, { rank: 14, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 12, suit: "S" }, { rank: 13, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 12, suit: "S" }, { rank: 14, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 13, suit: "S" }, { rank: 14, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }]
        ], cards: [{ rank: 13, suit: "S" }, { rank: 14, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }]
    },
    {
        label: "3 to a Straight Flush",
        goal: "Straight flush draw",
        mask: 7,
        cards: [{ rank: 9, suit: "S" }, { rank: 8, suit: "S" }, { rank: 7, suit: "S" }, { rank: 3, suit: "D" }, { rank: 2, suit: "C" }],
        sampleCards: [
            // Gapless
            [{ rank: 9, suit: "S" }, { rank: 8, suit: "S" }, { rank: 7, suit: "S" }, { rank: 3, suit: "D" }, { rank: 2, suit: "C" }],
            [{ rank: 14, suit: "S" }, { rank: 5, suit: "S" }, { rank: 2, suit: "S" }, { rank: 13, suit: "D" }, { rank: 7, suit: "C" }],
            // Single-gap
            [{ rank: 9, suit: "S" }, { rank: 8, suit: "S" }, { rank: 6, suit: "S" }, { rank: 13, suit: "D" }, { rank: 2, suit: "C" }],
            [{ rank: 2, suit: "S" }, { rank: 3, suit: "S" }, { rank: 5, suit: "S" }, { rank: 13, suit: "D" }, { rank: 9, suit: "C" }],
            // Two-gap
            [{ rank: 9, suit: "S" }, { rank: 7, suit: "S" }, { rank: 5, suit: "S" }, { rank: 13, suit: "D" }, { rank: 2, suit: "C" }],
            [{ rank: 2, suit: "S" }, { rank: 3, suit: "S" }, { rank: 6, suit: "S" }, { rank: 13, suit: "D" }, { rank: 9, suit: "C" }]
        ]
    },
    {
        label: "2 Unsuited High Cards", goal: "High pair potential", mask: 3, sampleCards: [
            [{ rank: 11, suit: "S" }, { rank: 12, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }],
            [{ rank: 11, suit: "S" }, { rank: 13, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }],
            [{ rank: 11, suit: "S" }, { rank: 14, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }],
            [{ rank: 12, suit: "S" }, { rank: 13, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }],
            [{ rank: 12, suit: "S" }, { rank: 14, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }],
            [{ rank: 13, suit: "S" }, { rank: 14, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "D" }]
        ], cards: [{ rank: 13, suit: "S" }, { rank: 11, suit: "H" }, { rank: 8, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "S" }]
    },
    {
        label: "Suited 10/J, 10/Q, or 10/K", goal: "High straight/royal potential", mask: 3, sampleCards: [
            [{ rank: 10, suit: "S" }, { rank: 11, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 10, suit: "S" }, { rank: 12, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 10, suit: "S" }, { rank: 13, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }]
        ], cards: [{ rank: 10, suit: "S" }, { rank: 12, suit: "S" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }]
    },
    {
        label: "One High Card", goal: "High pair potential", mask: 1, sampleCards: [
            [{ rank: 11, suit: "S" }, { rank: 9, suit: "H" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 12, suit: "S" }, { rank: 9, suit: "H" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 13, suit: "S" }, { rank: 9, suit: "H" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }],
            [{ rank: 14, suit: "S" }, { rank: 9, suit: "H" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "H" }]
        ], cards: [{ rank: 14, suit: "S" }, { rank: 9, suit: "H" }, { rank: 7, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "S" }]
    },
    { label: "Discard Everything", goal: "Fresh 5-card draw", mask: 0, cards: [{ rank: 9, suit: "S" }, { rank: 7, suit: "H" }, { rank: 5, suit: "D" }, { rank: 4, suit: "C" }, { rank: 2, suit: "S" }] }
];

const handSlotsEl = document.getElementById("handSlots");
const solveBtn = document.getElementById("solveBtn");
const clearHandBtn = document.getElementById("clearHandBtn");
const randomHandBtn = document.getElementById("randomHandBtn");
const solveStatusEl = document.getElementById("solveStatus");
const resultEl = document.getElementById("result");
const paytableEl = document.getElementById("paytable");
const cheatSheetEl = document.getElementById("cheatSheet");
const advancedCheatSheetEl = document.getElementById("advancedCheatSheet");
const cheatSheetBoxEl = document.getElementById("cheatSheetBox");
const advancedCheatSheetBoxEl = document.getElementById("advancedCheatSheetBox");
const strategyBasicBtn = document.getElementById("strategyBasicBtn");
const strategyAdvancedBtn = document.getElementById("strategyAdvancedBtn");
const splitPatHandBtn = document.getElementById("splitPatHandBtn");

const applyPaytableBtn = document.getElementById("applyPaytableBtn");
const inlinePickerEl = document.getElementById("inlinePicker");
const suitButtonsEl = document.getElementById("suitButtons");
const rankButtonsEl = document.getElementById("rankButtons");
const dialogErrorEl = document.getElementById("dialogError");
const removeCardBtn = document.getElementById("removeCardBtn");

let hand = [null, null, null, null, null];
let paytable = structuredClone(DEFAULT_PAYTABLE);
let activeSlot = null;
let pickedSuit = null;
let pickedRank = null;
let freshSuit = false;
let freshRank = false;
let pendingReset = false;
let latestBestMask = null;
let tunedStrategyOrder = [];
let latestBasicExceptionData = null;
let latestAdvancedExceptionData = null;
let cheatRefreshTimer = null;
let latestSolveResult = null;
let strategyRecommendationMode = "basic";
let advancedCheatRowEvs = [];
let splitPatHand = false;

// Lookup maps: sorted rank-key → ADVANCED_CHEAT_ROWS index.
// Defined before init() to avoid temporal dead zone if init() throws early.
const FOUR_STRAIGHT_ROW_MAP = (() => {
    const m = new Map();
    const add = (idx, combos) => combos.forEach((c) => m.set([...c].sort((a, b) => a - b).join(","), idx));
    // Row 7: open-ended draws (2345 through TJQK)
    add(7, [[2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7], [5, 6, 7, 8], [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13]]);
    // Row 14: JQKA
    add(14, [[11, 12, 13, 14]]);
    // Row 16: 9JQK; TJQA; TJKA; TQKA
    add(16, [[9, 11, 12, 13], [10, 11, 12, 14], [10, 11, 13, 14], [10, 12, 13, 14]]);
    // Row 19: 89JQ; 8TJQ; 9TJK
    add(19, [[8, 9, 11, 12], [8, 10, 11, 12], [9, 10, 11, 13]]);
    // Row 21: 9TQK
    add(21, [[9, 10, 12, 13]]);
    // Row 28: A-low draws + 789J; 78TJ; 79TJ; 89TQ
    add(28, [[2, 3, 4, 14], [2, 3, 5, 14], [2, 4, 5, 14], [3, 4, 5, 14], [7, 8, 9, 11], [7, 8, 10, 11], [7, 9, 10, 11], [8, 9, 10, 12]]);
    return m;
})();

const THREE_SF_ROW_MAP = (() => {
    const m = new Map();
    const add = (idx, combos) => combos.forEach((c) => m.set([...c].sort((a, b) => a - b).join(","), idx));
    // Row 13: A-low draws, gapless low-mid draws, high-connected draws
    add(13, [
        [2, 3, 14], [2, 4, 14], [2, 5, 14], [3, 4, 14], [3, 5, 14], [4, 5, 14],
        [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9],
        [7, 8, 11], [8, 9, 10], [8, 9, 11],
        [8, 10, 11], [8, 11, 12], [9, 10, 11], [9, 10, 12], [9, 11, 12], [9, 11, 13], [9, 12, 13]
    ]);
    // Row 18: single-gap mid draws
    add(18, [
        [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 6], [3, 5, 6], [4, 5, 7],
        [4, 6, 7], [5, 6, 8], [5, 7, 8], [6, 7, 9], [6, 8, 9],
        [7, 8, 10], [7, 9, 10], [7, 9, 11],
        [7, 10, 11], [8, 9, 12], [8, 10, 12], [9, 10, 13]
    ]);
    // Row 26: two-gap draws (complete list)
    add(26, [
        [2, 3, 6], [2, 4, 6], [2, 5, 6], [3, 4, 7], [3, 5, 7], [3, 6, 7],
        [4, 5, 8], [4, 6, 8], [4, 7, 8], [5, 6, 9], [5, 7, 9], [5, 8, 9],
        [6, 7, 10], [6, 8, 10], [6, 9, 10]
    ]);
    return m;
})();

init();

function init() {
    renderPaytableInputs();
    renderHand();
    renderPickerButtons();
    renderGeneralCheatSheet(true);
    recomputeAdvancedCheatRowEvs();
    renderAdvancedCheatSheet();
    updateCheatSheetVisibility();

    applyPaytableBtn.addEventListener("click", async () => {
        applyPaytableBtn.disabled = true;
        applyPaytableBtn.textContent = "Applying…";
        const hadResult = Boolean(latestSolveResult);
        commitPendingPick();
        closePicker();
        await new Promise((r) => setTimeout(r, 10));
        renderGeneralCheatSheet(true);
        recomputeAdvancedCheatRowEvs();
        renderAdvancedCheatSheet();
        if (hadResult || latestSolveResult) {
            await onSolve();
        }
        applyPaytableBtn.disabled = false;
        applyPaytableBtn.textContent = "Apply";
    });

    solveBtn.addEventListener("click", () => { commitPendingPick(); closePicker(); renderHand(); onSolve(); });
    clearHandBtn.addEventListener("click", clearHand);
    randomHandBtn.addEventListener("click", fillRandomHand);
    removeCardBtn.addEventListener("click", onRemoveCard);
    strategyBasicBtn.addEventListener("click", () => setStrategyMode("basic"));
    strategyAdvancedBtn.addEventListener("click", () => setStrategyMode("advanced"));

    splitPatHandBtn.addEventListener("click", () => {
        splitPatHand = !splitPatHand;
        splitPatHandBtn.textContent = splitPatHand ? "Combine Pat Hands" : "Split Pat Hands";
        splitPatHandBtn.classList.toggle("active", splitPatHand);
        advancedCheatRowEvs = [];
        recomputeAdvancedCheatRowEvs();
        renderAdvancedCheatSheet();
        if (latestSolveResult) {
            renderResult(latestSolveResult);
        }
    });

    openCardDialog(0);
}

function setStrategyMode(mode) {
    strategyRecommendationMode = mode;
    strategyBasicBtn.classList.toggle("active", mode === "basic");
    strategyAdvancedBtn.classList.toggle("active", mode === "advanced");
    updateCheatSheetVisibility();

    if (latestSolveResult) {
        renderResult(latestSolveResult);
    }
}

function updateCheatSheetVisibility() {
    if (!cheatSheetBoxEl || !advancedCheatSheetBoxEl) {
        return;
    }

    const showBasic = strategyRecommendationMode === "basic";
    cheatSheetBoxEl.hidden = !showBasic;
    advancedCheatSheetBoxEl.hidden = showBasic;

    if (showBasic) {
        cheatSheetBoxEl.open = true;
    } else {
        advancedCheatSheetBoxEl.open = true;
    }
}

function renderAdvancedCheatSheet() {
    if (!advancedCheatSheetEl) {
        return;
    }

    if (advancedCheatRowEvs.length !== activeAdvancedRows().length) {
        recomputeAdvancedCheatRowEvs();
    }

    const activeRowIndex = latestSolveResult
        ? activeAdvancedRowIndex(cardsFromMask(hand, latestSolveResult.mask))
        : -1;
    const rankedRows = activeAdvancedRows()
        .map(([type, detail], idx) => ({
            type,
            detail,
            sourceIndex: idx,
            ev: advancedCheatRowEvs[idx],
            isActive: idx === activeRowIndex
        }))
        .sort((a, b) => {
            const aEv = Number.isFinite(a.ev) ? a.ev : -Infinity;
            const bEv = Number.isFinite(b.ev) ? b.ev : -Infinity;
            if (Math.abs(aEv - bEv) > 1e-12) {
                return bEv - aEv;
            }
            return a.sourceIndex - b.sourceIndex;
        });

    // Some advanced recommendation labels do not have a direct row-name match.
    // Fall back to closest EV match so the table always highlights a best row.
    if (activeRowIndex === -1 && latestSolveResult) {
        let fallbackIdx = -1;
        let bestDiff = Infinity;
        for (let i = 0; i < rankedRows.length; i += 1) {
            const ev = rankedRows[i].ev;
            if (!Number.isFinite(ev)) {
                continue;
            }
            const diff = Math.abs(ev - latestSolveResult.ev);
            if (diff < bestDiff) {
                bestDiff = diff;
                fallbackIdx = i;
            }
        }

        if (fallbackIdx !== -1) {
            rankedRows[fallbackIdx].isActive = true;
        }
    }

    const rows = [];
    const activeExceptionData = strategyRecommendationMode === "advanced" ? latestAdvancedExceptionData : null;
    // Only float a separate exception row when the solver's hold isn't in the chart at all.
    const isUnclassified = activeRowIndex === -1 && latestSolveResult != null;
    let exceptionInserted = false;
    const fallbackRank = isUnclassified && activeExceptionData && activeExceptionData.isException
        ? getEvPlacementRank(activeExceptionData.solverEv, rankedRows.map((row) => ({ ev: Number.isFinite(row.ev) ? row.ev : -Infinity })))
        : null;

    rankedRows.forEach((row, idx) => {
        if (fallbackRank !== null && !exceptionInserted && fallbackRank === idx + 1) {
            rows.push(buildExceptionTableRow(activeExceptionData));
            exceptionInserted = true;
        }

        const ev = row.ev;
        const isExpectedRow = Boolean(
            activeExceptionData
            && activeExceptionData.isException
            && activeExceptionData.referenceSourceIndex !== null
            && activeExceptionData.referenceSourceIndex === row.sourceIndex
            && !row.isActive
        );
        const rowClasses = [row.isActive ? "advanced-active" : "", isExpectedRow ? "cheat-expected-row" : ""]
            .filter(Boolean)
            .join(" ");
        const expectedBadge = isExpectedRow ? ' <span class="exception-inline-hold"><strong>Expected by Advanced</strong></span>' : "";
        // Inline exception badge only when the solver's hold IS classified in the chart.
        const exceptionBadge = !isUnclassified && row.isActive && activeExceptionData && activeExceptionData.isException
            ? ` <span class="exception-inline-hold"><strong>Exception —</strong> chart expects ${activeExceptionData.referenceLabel} (rank #${activeExceptionData.rank ?? "-"})</span>`
            : "";

        rows.push(`
            <tr class="${rowClasses}">
                <td class="advanced-cheat-ev">${idx + 1}</td>
                <td class="advanced-cheat-type">${row.type}</td>
                <td>${row.detail}${row.isActive ? ' <span class="advanced-active-badge">Current Best Hold</span>' : ""}${exceptionBadge}${expectedBadge}</td>
                <td class="advanced-cheat-ev">${formatCheatEv(ev)}</td>
            </tr>
        `);
    });

    if (fallbackRank !== null && !exceptionInserted) {
        rows.push(buildExceptionTableRow(activeExceptionData));
    }

    advancedCheatSheetEl.innerHTML = rows.join("");
}

function formatCheatEv(ev) {
    if (!Number.isFinite(ev)) {
        return "-";
    }
    return ev.toFixed(5);
}

function recomputeAdvancedCheatRowEvs() {
    ensureTunedStrategyOrder(false);
    advancedCheatRowEvs = activeAdvancedRows().map(([type], idx) => {
        const occurrence = getAdvancedTypeOccurrence(type, idx);
        return activeAdvancedRepEv(type, occurrence);
    });
}

function getAdvancedTypeOccurrence(type, idx) {
    let count = 0;
    const rows = activeAdvancedRows();
    for (let i = 0; i <= idx; i += 1) {
        if (rows[i][0] === type) {
            count += 1;
        }
    }
    return count;
}

function computeAdvancedRepEv(type, occurrence) {
    if (type === "Pat Hand") {
        return averageEvs([
            getTunedEvByLabel("Straight"),
            getTunedEvByLabel("Flush"),
            getTunedEvByLabel("Full House"),
            getTunedEvByLabel("Four of a Kind"),
            getTunedEvByLabel("Straight Flush"),
            getTunedEvByLabel("Royal Flush")
        ]);
    }

    if (type === "3 of a Kind") {
        return getTunedEvByLabel("Three of a Kind");
    }

    if (type === "2 Pair") {
        return getTunedEvByLabel("Two Pair");
    }

    if (type === "4 to a Royal Flush") {
        return getTunedEvByLabel("4 to a Royal Flush");
    }

    if (type === "4 to a Straight Flush") {
        return getTunedEvByLabel("4 to a Straight Flush");
    }

    if (type === "4 to a Flush") {
        return getTunedEvByLabel("4 to a Flush");
    }

    if (type === "1 Pair") {
        if (occurrence === 1) {
            return getTunedEvByLabel("High Pair");
        }
        if (occurrence === 2) {
            const cards = [
                { rank: 10, suit: "S" },
                { rank: 10, suit: "H" },
                { rank: 7, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 2, suit: "S" }
            ];
            return Math.max(
                evaluateSpecificHold(cards, 3, paytable),
                evaluateSpecificHold(cards, 31, paytable)
            );
        }
        return getTunedEvByLabel("Low Pair");
    }

    if (type === "4 to a Straight") {
        if (occurrence === 1) {
            // Open-ended: 2345 through TJQK
            return getTunedEvByLabel("4 to an Outside Straight");
        }
        if (occurrence === 2) {
            // JQKA (one-sided broadway inside draw)
            return evaluateSpecificHold([
                { rank: 11, suit: "S" },
                { rank: 12, suit: "H" },
                { rank: 13, suit: "D" },
                { rank: 14, suit: "C" },
                { rank: 2, suit: "S" }
            ], 15, paytable);
        }
        if (occurrence === 3) {
            // 9JQK, TJQA, TJKA, TQKA — high-card inside draws
            return evaluateSpecificHold([
                { rank: 9, suit: "S" },
                { rank: 11, suit: "H" },
                { rank: 12, suit: "D" },
                { rank: 13, suit: "C" },
                { rank: 2, suit: "S" }
            ], 15, paytable);
        }
        if (occurrence === 4) {
            // 89JQ, 8TJQ, 9TJK — mid–high inside draws
            return evaluateSpecificHold([
                { rank: 8, suit: "S" },
                { rank: 9, suit: "H" },
                { rank: 11, suit: "D" },
                { rank: 12, suit: "C" },
                { rank: 2, suit: "S" }
            ], 15, paytable);
        }
        if (occurrence === 5) {
            // 9TQK — mid inside draw
            return evaluateSpecificHold([
                { rank: 9, suit: "S" },
                { rank: 10, suit: "H" },
                { rank: 12, suit: "D" },
                { rank: 13, suit: "C" },
                { rank: 2, suit: "S" }
            ], 15, paytable);
        }
        if (occurrence === 6) {
            // A234, A235, A245, A345, 789J, 78TJ, 79TJ, 89TQ — ace-low / mixed inside draws
            return evaluateSpecificHold([
                { rank: 14, suit: "S" },
                { rank: 2, suit: "H" },
                { rank: 3, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 9, suit: "S" }
            ], 15, paytable);
        }
        // occurrence 7+: 2346, 2356, 2456, ... — inside draws with no high-card value
        return evaluateSpecificHold([
            { rank: 2, suit: "S" },
            { rank: 3, suit: "H" },
            { rank: 4, suit: "D" },
            { rank: 6, suit: "C" },
            { rank: 9, suit: "S" }
        ], 15, paytable);
    }

    if (type === "3 to a Royal Flush") {
        return getTunedEvByLabel("3 to a Royal Flush");
    }

    if (type === "3 to a Straight Flush") {
        if (occurrence === 1) {
            // Gapless draws: A23, A24, 345, 456, 567, 678, 789, 89T, etc.
            return getTunedEvByLabel("3 to a Straight Flush");
        }
        if (occurrence === 2) {
            // Single-gap: 234, 235, 245, 346, 356, 457, 568, 578, 79T, etc.
            return evaluateSpecificHold([
                { rank: 2, suit: "S" },
                { rank: 3, suit: "S" },
                { rank: 5, suit: "S" },
                { rank: 10, suit: "D" },
                { rank: 12, suit: "C" }
            ], 7, paytable);
        }
        // occurrence 3+: Two-gap: 236, 246, 256, 347, 357, 367, 458, 569, 67T, etc.
        return evaluateSpecificHold([
            { rank: 2, suit: "S" },
            { rank: 3, suit: "S" },
            { rank: 6, suit: "S" },
            { rank: 11, suit: "D" },
            { rank: 9, suit: "C" }
        ], 7, paytable);
    }

    if (type === "3 to a Flush") {
        if (occurrence === 1) {
            // 2 high cards in suited trio: 2JA, 2JQ, 2KA, 3QK, etc.
            return evaluateSpecificHold([
                { rank: 2, suit: "S" },
                { rank: 11, suit: "S" },
                { rank: 14, suit: "S" },
                { rank: 6, suit: "D" },
                { rank: 9, suit: "C" }
            ], 7, paytable);
        }
        if (occurrence === 2) {
            // 1 high card in suited trio: 23J, 23Q, 24K, etc.
            return evaluateSpecificHold([
                { rank: 2, suit: "S" },
                { rank: 3, suit: "S" },
                { rank: 11, suit: "S" },
                { rank: 9, suit: "D" },
                { rank: 7, suit: "C" }
            ], 7, paytable);
        }
        // occurrence 3+: no high cards: 237, 238, 247, etc.
        return evaluateSpecificHold([
            { rank: 2, suit: "S" },
            { rank: 3, suit: "S" },
            { rank: 7, suit: "S" },
            { rank: 12, suit: "D" },
            { rank: 9, suit: "C" }
        ], 7, paytable);
    }

    if (type === "2 to a Royal Flush") {
        if (occurrence === 1) {
            return evaluateSpecificHold([
                { rank: 11, suit: "S" },
                { rank: 12, suit: "S" },
                { rank: 8, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 2, suit: "H" }
            ], 3, paytable);
        }
        if (occurrence === 2) {
            return evaluateSpecificHold([
                { rank: 12, suit: "S" },
                { rank: 14, suit: "S" },
                { rank: 8, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 2, suit: "H" }
            ], 3, paytable);
        }
        return evaluateSpecificHold([
            { rank: 10, suit: "S" },
            { rank: 11, suit: "S" },
            { rank: 8, suit: "D" },
            { rank: 4, suit: "C" },
            { rank: 2, suit: "H" }
        ], 3, paytable);
    }

    if (type === "3 to a Straight") {
        if (occurrence === 1) {
            return evaluateSpecificHold([
                { rank: 11, suit: "S" },
                { rank: 12, suit: "H" },
                { rank: 13, suit: "D" },
                { rank: 6, suit: "C" },
                { rank: 2, suit: "S" }
            ], 7, paytable);
        }
        return evaluateSpecificHold([
            { rank: 10, suit: "S" },
            { rank: 11, suit: "H" },
            { rank: 12, suit: "D" },
            { rank: 6, suit: "C" },
            { rank: 2, suit: "S" }
        ], 7, paytable);
    }

    if (type === "2 to a Straight") {
        if (occurrence === 1) {
            return evaluateSpecificHold([
                { rank: 11, suit: "S" },
                { rank: 12, suit: "H" },
                { rank: 8, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 2, suit: "S" }
            ], 3, paytable);
        }
        if (occurrence === 2) {
            return evaluateSpecificHold([
                { rank: 11, suit: "S" },
                { rank: 13, suit: "H" },
                { rank: 8, suit: "D" },
                { rank: 4, suit: "C" },
                { rank: 2, suit: "S" }
            ], 3, paytable);
        }
        return evaluateSpecificHold([
            { rank: 11, suit: "S" },
            { rank: 14, suit: "H" },
            { rank: 8, suit: "D" },
            { rank: 4, suit: "C" },
            { rank: 2, suit: "S" }
        ], 3, paytable);
    }

    if (type === "Single Card") {
        return getTunedEvByLabel("One High Card");
    }

    if (type === "Garbage") {
        return getTunedEvByLabel("Discard Everything");
    }

    return null;
}

// Returns the ADVANCED_CHEAT_ROWS_SPLIT index for a held hand.
// n=5: maps each pat-hand category to rows 0-5. n<5: shifts base index by +5 (past the 6 pat rows).
function findAdvancedRowIndexForHeldSplit(held) {
    if (held.length === 5) {
        const cls = classifyHand(held);
        if (cls === "royal_flush") return 0;
        if (cls === "straight_flush") return 1;
        if (cls === "four_kind") return 2;
        if (cls === "full_house") return 3;
        if (cls === "flush") return 4;
        if (cls === "straight") return 5;
        // Non-pat 5-card hold (e.g. solver keeps all five with just a pair):
        // delegate to the base classifier then offset past the 6 individual pat rows.
    }
    const base = findAdvancedRowIndexForHeld(held);
    if (base === -1) return -1;
    return base + 5;
}

// In split mode, the six individual pat-hand rows use their exact paytable value.
function computeAdvancedRepEvSplit(type, occurrence) {
    if (type === "Royal Flush") return paytable.royal_flush;
    if (type === "Straight Flush") return paytable.straight_flush;
    if (type === "Four of a Kind") return paytable.four_kind;
    if (type === "Full House") return paytable.full_house;
    if (type === "Flush") return paytable.flush;
    if (type === "Straight") return paytable.straight;
    return computeAdvancedRepEv(type, occurrence);
}

// Dispatchers — all call sites go through these so toggling splitPatHand
// automatically affects the whole UI without individual changes at each site.
function activeAdvancedRows() {
    return splitPatHand ? ADVANCED_CHEAT_ROWS_SPLIT : ADVANCED_CHEAT_ROWS;
}

function activeAdvancedRowIndex(held) {
    return splitPatHand ? findAdvancedRowIndexForHeldSplit(held) : findAdvancedRowIndexForHeld(held);
}

function activeAdvancedRepEv(type, occurrence) {
    return splitPatHand ? computeAdvancedRepEvSplit(type, occurrence) : computeAdvancedRepEv(type, occurrence);
}

function averageEvs(values) {
    const valid = values.filter((v) => Number.isFinite(v));
    if (valid.length === 0) {
        return null;
    }
    const total = valid.reduce((sum, v) => sum + v, 0);
    return total / valid.length;
}

function getTunedEvByLabel(label) {
    const row = tunedStrategyOrder.find((item) => item.label === label);
    return row ? row.ev : null;
}

/**
 * Match held cards directly to the ADVANCED_CHEAT_ROWS index they belong to.
 * Returns -1 when the hold doesn't correspond to any listed row.
 */
function findAdvancedRowIndexForHeld(held) {
    const n = held.length;

    if (n === 0) {
        return 34; // Garbage
    }

    if (n === 5) {
        const cls = classifyHand(held);
        if (cls === "straight" || cls === "flush" || cls === "full_house" ||
            cls === "four_kind" || cls === "straight_flush" || cls === "royal_flush")
            return 0;
        if (cls === "three_kind") return 1;
        if (cls === "two_pair") return 2;
        if (cls === "jacks_or_better") return 6;
        return -1;
    }

    // For n=1–4: rank-group structure (pairs/trips/quads) takes priority over any
    // draw pattern. A repeated rank always requires two different suits, so group
    // detection can never collide with suited-draw checks below.
    const rankCnt = new Map();
    held.forEach((c) => rankCnt.set(c.rank, (rankCnt.get(c.rank) || 0) + 1));
    const maxGroup = Math.max(...rankCnt.values());

    if (maxGroup >= 2) {
        const sorted = [...rankCnt.entries()].sort((a, b) => b[1] - a[1]);
        const [topRank, topCount] = sorted[0];
        if (topCount >= 4) return 0;                                        // 4 of a Kind → Pat Hand
        if (topCount === 3) return 1;                                       // 3 of a Kind
        if (sorted.filter(([, c]) => c === 2).length >= 2) return 2;      // 2 Pair
        if (topRank >= 11) return 6;                                        // 1 Pair JJ+
        if (topRank === 10) return 9;                                       // 1 Pair TT
        return 11;                                                           // 1 Pair 22–99
    }

    // All held ranks are distinct — check draw patterns.
    const ranks = held.map((c) => c.rank).sort((a, b) => a - b);
    const rankKey = ranks.join(",");
    const rankSet = new Set(ranks);
    const suited = allSameSuit(held);
    const ROYAL = new Set([10, 11, 12, 13, 14]);

    if (n === 4) {
        if (suited && held.every((c) => ROYAL.has(c.rank))) return 3;
        if (suited && isFourToStraightFlushSubset(held)) return 4;
        if (suited) return 5;
        const straightIdx = FOUR_STRAIGHT_ROW_MAP.get(rankKey);
        if (straightIdx !== undefined) return straightIdx;
        if (fitsAnyFiveCardStraight(ranks)) return 33;
        return -1;
    }

    if (n === 3) {
        if (suited && held.every((c) => ROYAL.has(c.rank))) {
            if ((rankSet.has(10) && rankSet.has(11) && rankSet.has(12)) ||
                (rankSet.has(11) && rankSet.has(12) && rankSet.has(13))) return 8;
            if (rankSet.has(14) && !rankSet.has(10)) return 10;
            return 12;
        }
        if (suited && isThreeToStraightFlushSubset(held)) return THREE_SF_ROW_MAP.get(rankKey) ?? 13;
        if (suited) {
            const highCount = held.filter((c) => c.rank >= 11).length;
            return highCount >= 2 ? 15 : (highCount === 1 ? 23 : 32);
        }
        if (rankSet.has(11) && rankSet.has(12) && rankSet.has(13)) return 22;
        if (rankSet.has(10) && rankSet.has(11) && rankSet.has(12)) return 24;
        return -1;
    }

    if (n === 2) {
        const [r0, r1] = ranks;
        if (suited && ROYAL.has(r0) && ROYAL.has(r1)) {
            if (r0 === 11 && (r1 === 12 || r1 === 13)) return 17; // JQ, JK
            if ((r1 === 14 && r0 !== 10) || (r0 === 12 && r1 === 13)) return 20; // JA, QA, QK, KA
            if (r0 === 10 && r1 === 11) return 29; // TJ only
            return -1; // TQ, TK, TA — not in advanced chart
        }
        if (r0 === 11 && r1 === 12) return 25; // unsuited JQ
        if (r1 === 13 && (r0 === 11 || r0 === 12)) return 27; // unsuited JK, QK
        if (r1 === 14 && r0 >= 11) return 30; // unsuited JA, QA, KA
        return -1;
    }

    // n === 1
    return held[0].rank >= 11 ? 31 : -1;
}

function renderPaytableInputs() {
    paytableEl.innerHTML = "";
    PAYOUT_ROWS.forEach(([label, key]) => {
        const tr = document.createElement("tr");

        const tdLabel = document.createElement("td");
        const labelEl = document.createElement("label");
        labelEl.textContent = label;
        const inputId = `pt-${key}`;
        labelEl.htmlFor = inputId;
        tdLabel.appendChild(labelEl);

        const tdVal = document.createElement("td");
        const input = document.createElement("input");
        input.id = inputId;
        input.type = "number";
        input.step = "1";
        input.value = paytable[key];
        input.addEventListener("input", () => {
            const n = Number.parseInt(input.value, 10);
            paytable[key] = Number.isFinite(n) ? n : 0;
        });

        tdVal.appendChild(input);
        tr.append(tdLabel, tdVal);
        paytableEl.appendChild(tr);
    });
}

function scheduleCheatSheetRefresh() {
    if (cheatRefreshTimer) {
        clearTimeout(cheatRefreshTimer);
    }
    cheatRefreshTimer = setTimeout(() => {
        renderGeneralCheatSheet(true);
        recomputeAdvancedCheatRowEvs();
        renderAdvancedCheatSheet();
        cheatRefreshTimer = null;
    }, 220);
}

function renderHand() {
    handSlotsEl.innerHTML = "";
    for (let i = 0; i < 5; i += 1) {
        const isActive = activeSlot === i;
        const preview = isActive && pickedSuit && pickedRank
            ? { suit: pickedSuit, rank: pickedRank }
            : isActive && pickedSuit && hand[i]
                ? { suit: pickedSuit, rank: hand[i].rank }
                : isActive && pickedRank && hand[i]
                    ? { suit: hand[i].suit, rank: pickedRank }
                    : null;
        const card = preview || hand[i];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "card-slot";

        if (!card) {
            btn.classList.add("empty");
            btn.textContent = `Card ${i + 1}`;
        } else {
            const suit = SUITS.find((s) => s.key === card.suit);
            btn.classList.add(suit.css);
            btn.textContent = `${rankLabel(card.rank)}${suit.symbol}`;
        }

        if (latestBestMask !== null && ((latestBestMask >> i) & 1) === 1) {
            btn.classList.add("recommended");
        }
        if (isActive) {
            btn.classList.add("editing");
        }

        btn.addEventListener("click", () => openCardDialog(i));
        handSlotsEl.appendChild(btn);
    }
}

function renderPickerButtons() {
    suitButtonsEl.innerHTML = "";
    rankButtonsEl.innerHTML = "";

    SUITS.forEach((suit) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `pick-btn${suit.red ? " suit-red" : ""}`;
        btn.innerHTML = `<span class="suit-symbol">${suit.symbol}</span><span class="suit-label">${suit.label}</span>`;
        btn.addEventListener("click", () => {
            maybeReset();
            pickedSuit = suit.key;
            freshSuit = true;
            dialogErrorEl.textContent = "";
            updatePickerSelectionUI();
            renderHand();
            tryCommitCard();
        });
        suitButtonsEl.appendChild(btn);
    });

    RANKS.forEach((rank) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pick-btn";
        btn.textContent = rank.label;
        btn.addEventListener("click", () => {
            maybeReset();
            pickedRank = rank.value;
            freshRank = true;
            dialogErrorEl.textContent = "";
            updatePickerSelectionUI();
            renderHand();
            tryCommitCard();
        });
        rankButtonsEl.appendChild(btn);
    });
}

function openCardDialog(slotIdx) {
    if (pendingReset) pendingReset = false;

    // Persist any partial selection on the current slot before switching away
    if (activeSlot !== null && activeSlot !== slotIdx && pickedSuit && pickedRank && (freshSuit || freshRank)) {
        const newCard = { rank: pickedRank, suit: pickedSuit };
        const isDuplicate = hand.findIndex((c, idx) => idx !== activeSlot && c && c.rank === newCard.rank && c.suit === newCard.suit) !== -1;
        if (!isDuplicate) {
            hand[activeSlot] = newCard;
            latestBestMask = null;
            latestSolveResult = null;
            solveStatusEl.textContent = "";
        }
    }

    activeSlot = slotIdx;
    const existing = hand[slotIdx];
    pickedSuit = existing ? existing.suit : null;
    pickedRank = existing ? existing.rank : null;
    freshSuit = false;
    freshRank = false;
    dialogErrorEl.textContent = "";
    updatePickerSelectionUI();
    updateRemoveBtn();
    inlinePickerEl.hidden = false;
    renderHand();
}

function updatePickerSelectionUI() {
    [...suitButtonsEl.children].forEach((el, idx) => {
        if (SUITS[idx].key === pickedSuit) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    });

    [...rankButtonsEl.children].forEach((el, idx) => {
        if (RANKS[idx].value === pickedRank) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    });
}

function tryCommitCard() {
    if (activeSlot === null || !pickedSuit || !pickedRank || !freshSuit || !freshRank) {
        return;
    }

    const newCard = { rank: pickedRank, suit: pickedSuit };
    const duplicateIndex = hand.findIndex((c, idx) => idx !== activeSlot && c && c.rank === newCard.rank && c.suit === newCard.suit);
    if (duplicateIndex !== -1) {
        dialogErrorEl.textContent = "That card is already used in another slot.";
        return;
    }

    hand[activeSlot] = newCard;
    latestBestMask = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";

    if (activeSlot === 4) {
        closePicker();
        pendingReset = true;
        renderHand();
        onSolve();
    } else {
        activeSlot = activeSlot + 1;
        const next = hand[activeSlot];
        pickedSuit = next ? next.suit : null;
        pickedRank = next ? next.rank : null;
        freshSuit = false;
        freshRank = false;
        dialogErrorEl.textContent = "";
        updatePickerSelectionUI();
        updateRemoveBtn();
        renderHand();
    }
}


function closePicker() {
    activeSlot = null;
    pickedSuit = null;
    pickedRank = null;
    freshSuit = false;
    freshRank = false;
    pendingReset = false;
    inlinePickerEl.hidden = true;
}

// Commit a partial pick (only rank OR only suit was changed) before navigating away.
// Requires the slot to already have a card (implying the existing suit/rank fills the gap).
function commitPendingPick() {
    if (activeSlot === null || !pickedSuit || !pickedRank || (!freshSuit && !freshRank)) {
        return;
    }
    const newCard = { rank: pickedRank, suit: pickedSuit };
    const isDuplicate = hand.findIndex((c, idx) => idx !== activeSlot && c && c.rank === newCard.rank && c.suit === newCard.suit) !== -1;
    if (isDuplicate) {
        return; // leave the error visible, don't commit
    }
    hand[activeSlot] = newCard;
    latestBestMask = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";
}

function maybeReset() {
    if (!pendingReset) return;
    pendingReset = false;
    hand = [null, null, null, null, null];
    latestBestMask = null;
    latestBasicExceptionData = null;
    latestAdvancedExceptionData = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";
    resultEl.innerHTML = "<p>Enter all 5 cards, then tap <strong>Find Best Hold</strong>.</p>";
    activeSlot = 0;
    pickedSuit = null;
    pickedRank = null;
    freshSuit = false;
    freshRank = false;
    dialogErrorEl.textContent = "";
    inlinePickerEl.hidden = false;
    renderHand();
}

function updateRemoveBtn() {
    removeCardBtn.disabled = activeSlot === null || hand[activeSlot] === null;
}

function onRemoveCard() {
    if (activeSlot === null) return;
    hand[activeSlot] = null;
    latestBestMask = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";
    resultEl.innerHTML = "<p>Tap <strong>Find Best Hold</strong> to recalculate.</p>";
    pickedSuit = null;
    pickedRank = null;
    dialogErrorEl.textContent = "";
    updatePickerSelectionUI();
    updateRemoveBtn();
    renderHand();
}

function clearHand() {
    closePicker();
    hand = [null, null, null, null, null];
    latestBestMask = null;
    latestBasicExceptionData = null;
    latestAdvancedExceptionData = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";
    resultEl.innerHTML = "<p>Enter all 5 cards, then tap <strong>Find Best Hold</strong>.</p>";
    renderGeneralCheatSheet(false);
    renderAdvancedCheatSheet();
    openCardDialog(0);
}

function fillRandomHand() {
    closePicker();
    const deck = makeDeck();
    shuffle(deck);
    hand = deck.slice(0, 5);
    latestBestMask = null;
    latestBasicExceptionData = null;
    latestAdvancedExceptionData = null;
    latestSolveResult = null;
    solveStatusEl.textContent = "";
    resultEl.innerHTML = "<p>Tap <strong>Find Best Hold</strong> to solve this random hand.</p>";
    renderGeneralCheatSheet(false);
    renderAdvancedCheatSheet();
    renderHand();
}

async function onSolve() {
    if (hand.some((c) => !c)) {
        solveStatusEl.textContent = "Please enter all 5 cards first.";
        return;
    }

    solveBtn.disabled = true;
    solveStatusEl.textContent = "Calculating exact EV for all hold choices...";
    try {
        await new Promise((r) => setTimeout(r, 10));

        const best = findBestHold(hand, paytable);
        latestSolveResult = best;
        latestBestMask = best.mask;
        renderHand();
        renderGeneralCheatSheet(true);
        recomputeAdvancedCheatRowEvs();
        renderAdvancedCheatSheet();
        renderResult(best);

        solveStatusEl.textContent = `Done. Evaluated ${best.totalHandsEvaluated.toLocaleString()} outcomes.`;
    } catch (error) {
        console.error(error);
        solveStatusEl.textContent = "An error occurred while solving. Please try again.";
    } finally {
        solveBtn.disabled = false;
    }
}

function renderResult(best) {
    const heldList = holdLabelFromMask(best.mask);
    const basic = getBasicSuggestionForCurrentHand();
    const basicRank = getBasicRank(basic.sourceIndex);
    const advancedSuggestion = getAdvancedSuggestionForCurrentHand(best);

    const epsilon = 1e-9;
    const basicChoice = best.allChoices.find((choice) => choice.mask === basic.mask);
    const basicEv = basicChoice ? basicChoice.ev : best.ev;
    const evGapVsBasic = best.ev - basicEv;
    const solverSourceIndex = findBasicRowIndexForHeld(cardsFromMask(hand, best.mask));
    // Suppress exception when solver and chart agree on the row type even if masks differ.
    const isBasicException = basic.mask !== best.mask && evGapVsBasic > epsilon
        && (solverSourceIndex === -1 || solverSourceIndex !== basic.sourceIndex);

    // An advanced exception means the chart's top-ranked candidate differs from the solver's best.
    const advancedChartSuggestion = advancedSuggestion ? (advancedSuggestion.chartSuggestion || advancedSuggestion) : null;
    const advancedChartMask = advancedChartSuggestion ? advancedChartSuggestion.mask : null;
    const advancedChoice = advancedChartMask != null
        ? best.allChoices.find((choice) => choice.mask === advancedChartMask)
        : null;
    const advancedEv = advancedChoice ? advancedChoice.ev : best.ev;
    const evGapVsAdvanced = best.ev - advancedEv;
    // Suppress exception when solver and chart agree on the *row type* even if
    // they differ in mask (e.g. "hold all 5 with JJ" vs "hold just JJ draw 3").
    const isAdvancedException = Boolean(
        advancedChartSuggestion
        && advancedChartSuggestion.mask !== best.mask
        && evGapVsAdvanced > epsilon
        && (!advancedSuggestion?.chartSuggestion
            || advancedSuggestion.sourceIndex !== advancedChartSuggestion.sourceIndex)
    );

    const recommendedRows = best.topChoices
        .map((choice, idx) => {
            const holdText = holdLabelFromMask(choice.mask);
            const firstRowNote = idx === 0
                ? (strategyRecommendationMode === "basic"
                    ? (isBasicException
                        ? ` <span class="exception-inline-hold"><strong>Exception:</strong> basic says ${basic.label} (rank #${basicRank ?? "-"})</span>`
                        : ` <span class="rule-match-inline"><strong>Matches Basic:</strong> ${basic.label}</span>`)
                    : (isAdvancedException
                        ? ` <span class="exception-inline-hold"><strong>Exception:</strong> advanced says ${advancedChartSuggestion.label} (rank #${advancedChartSuggestion.rank})</span>`
                        : ` <span class="rule-match-inline"><strong>Matches Advanced:</strong> ${advancedSuggestion ? advancedSuggestion.label : (activeAdvancedRows()[activeAdvancedRowIndex(cardsFromMask(hand, choice.mask))]?.[0] ?? "Unknown")}</span>`))
                : "";

            return `<p class="top-line">${idx + 1}. Hold: <strong>${holdText}</strong> (EV ${choice.ev.toFixed(5)})${firstRowNote}</p>`;
        })
        .join("");

    const nextDistinct = best.nextDistinctChoice;
    const evGap = nextDistinct ? (best.topChoices[0].ev - nextDistinct.ev) : 0;
    const topOutcomeRows = renderTopOutcomeRows(best.topChoices[0]);

    latestBasicExceptionData = {
        isException: isBasicException,
        contextName: "Basic",
        referenceLabel: basic.label,
        referenceSourceIndex: basic.sourceIndex,
        referenceEv: basicEv,
        solverEv: best.ev,
        solverHold: heldList,
        rank: basicRank,
        edgeEv: evGapVsBasic,
        solverSourceIndex,
        evGap
    };

    latestAdvancedExceptionData = {
        isException: Boolean(isAdvancedException),
        contextName: "Advanced",
        referenceLabel: advancedChartSuggestion ? advancedChartSuggestion.label : "Advanced guidance",
        referenceSourceIndex: advancedChartSuggestion ? advancedChartSuggestion.sourceIndex : null,
        referenceEv: advancedEv,
        solverEv: best.ev,
        solverHold: heldList,
        rank: advancedChartSuggestion ? advancedChartSuggestion.rank : null,
        edgeEv: evGapVsAdvanced,
        evGap
    };

    resultEl.innerHTML = `
    <p class="ev">Recommended Holds:</p>
    ${recommendedRows}
    <p class="top-line"><strong>EV edge vs next distinct play:</strong> ${evGap.toFixed(5)}</p>
    <p><strong>Top Outcomes:</strong></p>
    ${topOutcomeRows}
  `;

    renderGeneralCheatSheet(false);
    renderAdvancedCheatSheet();
}

function renderTopOutcomeRows(choice) {
    const total = choice.count || 1;
    const rows = [];

    for (const [label, key] of PAYOUT_ROWS) {
        const hits = choice.categoryCounts[key] || 0;
        if (hits === 0) {
            continue;
        }

        const probability = hits / total;
        const contribution = probability * (paytable[key] || 0);
        rows.push({ label, probability, contribution });
    }

    const noWinHits = choice.categoryCounts.nothing || 0;
    if (noWinHits > 0) {
        rows.push({ label: "No Win", probability: noWinHits / total, contribution: 0 });
    }

    rows.sort((a, b) => b.contribution - a.contribution);

    return rows
        .slice(0, 4)
        .map((row) => `<p class="top-line">${row.label}: ${(row.probability * 100).toFixed(2)}% (EV contribution ${row.contribution.toFixed(5)})</p>`)
        .join("");
}

function renderGeneralCheatSheet(recompute = false) {
    ensureTunedStrategyOrder(recompute);

    const rows = [];
    const activeExceptionData = strategyRecommendationMode === "basic" ? latestBasicExceptionData : null;
    const isUnclassified = activeExceptionData && activeExceptionData.isException
        && (activeExceptionData.solverSourceIndex == null || activeExceptionData.solverSourceIndex === -1);
    let exceptionInserted = false;
    const fallbackRank = isUnclassified
        ? getEvPlacementRank(activeExceptionData.solverEv, tunedStrategyOrder)
        : null;

    tunedStrategyOrder.forEach((row, idx) => {
        if (fallbackRank !== null && !exceptionInserted && fallbackRank === idx + 1) {
            rows.push(buildExceptionTableRow(activeExceptionData));
            exceptionInserted = true;
        }

        const isSolverRow = Boolean(
            activeExceptionData
            && activeExceptionData.solverSourceIndex != null
            && activeExceptionData.solverSourceIndex === row.sourceIndex
        );
        const isExpectedRow = Boolean(
            activeExceptionData
            && activeExceptionData.isException
            && activeExceptionData.referenceSourceIndex != null
            && activeExceptionData.referenceSourceIndex === row.sourceIndex
            && !isSolverRow
        );
        const isMatchRow = Boolean(activeExceptionData && !activeExceptionData.isException && activeExceptionData.referenceSourceIndex === row.sourceIndex);
        const rowClass = [isSolverRow ? "advanced-active" : "", isExpectedRow ? "cheat-expected-row" : ""].filter(Boolean).join(" ");
        // Inline exception badge when the solver's hold IS in the chart.
        const exceptionBadge = isSolverRow && activeExceptionData && activeExceptionData.isException && !isUnclassified
            ? ` <span class="exception-inline-hold"><strong>Exception —</strong> chart expects ${activeExceptionData.referenceLabel} (rank #${activeExceptionData.rank ?? "-"})</span>`
            : "";
        const matchBadge = isSolverRow
            ? `<span class="advanced-active-badge">Current Best Hold</span>${exceptionBadge}`
            : (isExpectedRow
                ? '<span class="exception-inline-hold"><strong>Expected by Basic</strong></span>'
                : (isMatchRow ? '<span class="advanced-active-badge">Current Basic Match</span>' : ""));

        rows.push(`
            <tr class="${rowClass}">
                <td class="advanced-cheat-ev">${idx + 1}</td>
                <td class="advanced-cheat-type">${row.label}${matchBadge}</td>
                <td>${row.goal}</td>
                <td class="advanced-cheat-ev">${row.ev.toFixed(5)}</td>
            </tr>
        `);
    });

    if (fallbackRank !== null && !exceptionInserted) {
        rows.push(buildExceptionTableRow(activeExceptionData));
    }

    cheatSheetEl.innerHTML = `
    <p class="top-line">Priority order auto-tuned to your current payout table using representative draw spots.</p>
    <p class="top-line">Treat this as a fast guide. Use the solver result for exact hand-by-hand decisions and edge cases.</p>
    <div class="advanced-cheat-wrap">
        <table class="advanced-cheat-table general-cheat-table" aria-label="General strategy priority list">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Play Type</th>
                    <th>Play Details</th>
                    <th>Rep EV</th>
                </tr>
            </thead>
            <tbody>
                ${rows.join("")}
            </tbody>
        </table>
    </div>
  `;
}

function ensureTunedStrategyOrder(recompute = false) {
    if (!recompute && tunedStrategyOrder.length > 0) {
        return;
    }

    tunedStrategyOrder = STRATEGY_PATTERNS
        .map((pattern, idx) => {
            const ev = evaluatePatternEv(pattern, paytable);
            return { ...pattern, ev, sourceIndex: idx };
        })
        .sort((a, b) => b.ev - a.ev);
}

function buildExceptionTableRow(exceptionData) {
    return `
        <tr class="cheat-exception-row">
            <td class="advanced-cheat-ev">EX</td>
            <td class="advanced-cheat-type">Exception</td>
            <td><strong>Solver:</strong> ${exceptionData.solverHold} | <strong>${exceptionData.contextName}:</strong> ${exceptionData.referenceLabel}</td>
            <td class="advanced-cheat-ev">${exceptionData.solverEv.toFixed(5)}</td>
        </tr>
    `;
}

function getAdvancedSuggestionForCurrentHand(best) {
    if (!best || !Array.isArray(best.allChoices)) {
        return null;
    }

    if (advancedCheatRowEvs.length !== activeAdvancedRows().length) {
        recomputeAdvancedCheatRowEvs();
    }

    const rankedRows = activeAdvancedRows()
        .map(([type, detail], idx) => ({
            type,
            detail,
            sourceIndex: idx,
            ev: advancedCheatRowEvs[idx]
        }))
        .sort((a, b) => {
            const aEv = Number.isFinite(a.ev) ? a.ev : -Infinity;
            const bEv = Number.isFinite(b.ev) ? b.ev : -Infinity;
            if (Math.abs(aEv - bEv) > 1e-12) {
                return bEv - aEv;
            }
            return a.sourceIndex - b.sourceIndex;
        });

    const rankBySource = new Map();
    rankedRows.forEach((row, idx) => {
        rankBySource.set(row.sourceIndex, idx + 1);
    });

    // Label the solver's best hold using the advanced chart, then check whether
    // the chart would have suggested a *different* hold (exception detection).
    const solverChoice = best.allChoices[0];
    const solverSourceIndex = activeAdvancedRowIndex(cardsFromMask(hand, solverChoice.mask));
    const solverLabel = solverSourceIndex !== -1 ? activeAdvancedRows()[solverSourceIndex][0] : null;
    const solverRank = solverSourceIndex !== -1 ? (rankBySource.get(solverSourceIndex) || 999) : 999;

    // Find the highest-ranked advanced row among all valid hold choices.
    let topChartCandidate = null;
    for (const choice of best.allChoices) {
        const sourceIndex = activeAdvancedRowIndex(cardsFromMask(hand, choice.mask));
        if (sourceIndex === -1) {
            continue;
        }
        const label = activeAdvancedRows()[sourceIndex][0];
        const rank = rankBySource.get(sourceIndex) || 999;

        if (!topChartCandidate || rank < topChartCandidate.rank || (rank === topChartCandidate.rank && choice.ev > topChartCandidate.ev)) {
            topChartCandidate = {
                mask: choice.mask,
                label,
                rank,
                ev: choice.ev,
                sourceIndex
            };
        }
    }

    // Return the solver's best hold annotated with its chart position.
    // The caller will detect an exception if topChartCandidate differs from the solver's best.
    if (solverSourceIndex !== -1) {
        return {
            mask: solverChoice.mask,
            label: solverLabel,
            rank: solverRank,
            ev: solverChoice.ev,
            sourceIndex: solverSourceIndex,
            chartSuggestion: topChartCandidate
        };
    }

    // Solver's best hold is unclassified in the chart — fall back to the best chart candidate.
    return topChartCandidate;
}

function evaluatePatternEv(pattern, table) {
    const evalCards = (cards) => {
        const drawEv = evaluateSpecificHold(cards, pattern.mask, table);
        if (pattern.mask !== 31 && classifyHand(cards) !== "nothing") {
            return Math.max(drawEv, evaluateSpecificHold(cards, 31, table));
        }
        return drawEv;
    };

    if (!pattern.sampleCards || pattern.sampleCards.length === 0) {
        return evalCards(pattern.cards);
    }

    const total = pattern.sampleCards.reduce((sum, cards) => sum + evalCards(cards), 0);
    return total / pattern.sampleCards.length;
}

function getEvPlacementRank(ev, rankedRows) {
    for (let i = 0; i < rankedRows.length; i += 1) {
        if (ev >= rankedRows[i].ev - 1e-12) {
            return i + 1;
        }
    }
    return rankedRows.length + 1;
}

function findBestHold(cards, table) {
    const deck = makeDeck();
    const usedKeys = new Set(cards.map(cardKey));
    const remaining = deck.filter((c) => !usedKeys.has(cardKey(c)));

    let bestMask = 0;
    let bestEv = -Infinity;
    let totalHandsEvaluated = 0;
    const choices = [];

    for (let mask = 0; mask < 32; mask += 1) {
        const held = cardsFromMask(cards, mask);
        const drawCount = 5 - held.length;
        const { sum, count, categoryCounts } = enumerateExpectedPayout(held, remaining, drawCount, table);
        const ev = count > 0 ? sum / count : -Infinity;

        totalHandsEvaluated += count;
        choices.push({ mask, ev, count, categoryCounts });

        if (ev > bestEv) {
            bestEv = ev;
            bestMask = mask;
        }
    }

    choices.sort((a, b) => b.ev - a.ev);

    const bestChoice = choices[0];
    const nextDistinctChoice = choices.find((choice) => Math.abs(choice.ev - bestChoice.ev) > 1e-12) || null;

    return {
        mask: bestMask,
        ev: bestEv,
        topChoices: choices.slice(0, 3),
        allChoices: choices,
        nextDistinctChoice,
        totalHandsEvaluated
    };
}

function enumerateExpectedPayout(held, remainingDeck, drawCount, table) {
    const categoryCounts = {
        royal_flush: 0,
        straight_flush: 0,
        four_kind: 0,
        full_house: 0,
        flush: 0,
        straight: 0,
        three_kind: 0,
        two_pair: 0,
        jacks_or_better: 0,
        nothing: 0
    };

    if (drawCount === 0) {
        const category = classifyHand(held);
        categoryCounts[category] += 1;
        return { sum: table[category] || 0, count: 1, categoryCounts };
    }

    let sum = 0;
    let count = 0;
    const n = remainingDeck.length;

    if (drawCount === 1) {
        for (let a = 0; a < n; a += 1) {
            const category = classifyHand([...held, remainingDeck[a]]);
            categoryCounts[category] += 1;
            sum += table[category] || 0;
            count += 1;
        }
        return { sum, count, categoryCounts };
    }

    if (drawCount === 2) {
        for (let a = 0; a < n - 1; a += 1) {
            for (let b = a + 1; b < n; b += 1) {
                const category = classifyHand([...held, remainingDeck[a], remainingDeck[b]]);
                categoryCounts[category] += 1;
                sum += table[category] || 0;
                count += 1;
            }
        }
        return { sum, count, categoryCounts };
    }

    if (drawCount === 3) {
        for (let a = 0; a < n - 2; a += 1) {
            for (let b = a + 1; b < n - 1; b += 1) {
                for (let c = b + 1; c < n; c += 1) {
                    const category = classifyHand([...held, remainingDeck[a], remainingDeck[b], remainingDeck[c]]);
                    categoryCounts[category] += 1;
                    sum += table[category] || 0;
                    count += 1;
                }
            }
        }
        return { sum, count, categoryCounts };
    }

    if (drawCount === 4) {
        for (let a = 0; a < n - 3; a += 1) {
            for (let b = a + 1; b < n - 2; b += 1) {
                for (let c = b + 1; c < n - 1; c += 1) {
                    for (let d = c + 1; d < n; d += 1) {
                        const category = classifyHand([...held, remainingDeck[a], remainingDeck[b], remainingDeck[c], remainingDeck[d]]);
                        categoryCounts[category] += 1;
                        sum += table[category] || 0;
                        count += 1;
                    }
                }
            }
        }
        return { sum, count, categoryCounts };
    }

    for (let a = 0; a < n - 4; a += 1) {
        for (let b = a + 1; b < n - 3; b += 1) {
            for (let c = b + 1; c < n - 2; c += 1) {
                for (let d = c + 1; d < n - 1; d += 1) {
                    for (let e = d + 1; e < n; e += 1) {
                        const category = classifyHand([...held, remainingDeck[a], remainingDeck[b], remainingDeck[c], remainingDeck[d], remainingDeck[e]]);
                        categoryCounts[category] += 1;
                        sum += table[category] || 0;
                        count += 1;
                    }
                }
            }
        }
    }

    return { sum, count, categoryCounts };
}

function evaluateSpecificHold(cards, mask, table) {
    const deck = makeDeck();
    const usedKeys = new Set(cards.map(cardKey));
    const remaining = deck.filter((c) => !usedKeys.has(cardKey(c)));
    const held = cardsFromMask(cards, mask);
    const drawCount = 5 - held.length;
    const { sum, count } = enumerateExpectedPayout(held, remaining, drawCount, table);
    return count > 0 ? sum / count : 0;
}

function holdLabelFromMask(mask) {
    const held = hand
        .map((card, i) => ({ card, i }))
        .filter((x) => ((mask >> x.i) & 1) === 1)
        .map((x) => cardLabel(x.card));
    return held.join(" ") || "Discard All";
}

function getBasicRank(sourceIndex) {
    if (sourceIndex == null || sourceIndex < 0) {
        return null;
    }
    const idx = tunedStrategyOrder.findIndex((row) => row.sourceIndex === sourceIndex);
    return idx === -1 ? null : idx + 1;
}

// STRATEGY_PATTERNS indices (0-based):
// 0 Royal Flush, 1 Straight Flush, 2 Four of a Kind, 3 4-to-Royal,
// 4 Full House, 5 Flush, 6 Straight, 7 Three of a Kind,
// 8 4-to-SF, 9 Two Pair, 10 High Pair, 11 3-to-Royal,
// 12 4-to-Flush, 13 Low Pair, 14 4-to-Outside-Straight,
// 15 2 Suited High Cards, 16 3-to-SF, 17 2 Unsuited High Cards,
// 18 Suited 10/J-Q-K, 19 One High Card, 20 Discard Everything
function findBasicRowIndexForHeld(held) {
    const n = held.length;

    if (n === 0) return 20;

    if (n === 5) {
        const cls = classifyHand(held);
        if (cls === "royal_flush") return 0;
        if (cls === "straight_flush") return 1;
        if (cls === "four_kind") return 2;
        if (cls === "full_house") return 4;
        if (cls === "flush") return 5;
        if (cls === "straight") return 6;
        if (cls === "three_kind") return 7;
        if (cls === "two_pair") return 9;
        if (cls === "jacks_or_better") return 10;
        return -1;
    }

    // For n=1–4: rank-group structure (pairs/trips/quads) takes priority over any
    // draw pattern. A repeated rank always requires two different suits, so group
    // detection can never collide with suited-draw checks below.
    const rankCnt = new Map();
    held.forEach((c) => rankCnt.set(c.rank, (rankCnt.get(c.rank) || 0) + 1));
    const maxGroup = Math.max(...rankCnt.values());

    if (maxGroup >= 2) {
        const sorted = [...rankCnt.entries()].sort((a, b) => b[1] - a[1]);
        const [topRank, topCount] = sorted[0];
        if (topCount >= 4) return 2;                                         // Four of a Kind
        if (topCount === 3) return 7;                                        // Three of a Kind
        if (sorted.filter(([, c]) => c === 2).length >= 2) return 9;       // Two Pair
        return topRank >= 11 ? 10 : 13;                                      // High / Low Pair
    }

    // All held ranks are distinct — check draw patterns.
    if (n === 4) {
        if (isFourToRoyalSubset(held)) return 3;
        if (isFourToStraightFlushSubset(held)) return 8;
        if (isFourToFlushSubset(held)) return 12;
        if (isOpenFourToStraightSubset(held)) return 14;
        return -1;
    }

    if (n === 3) {
        if (isThreeToRoyalSubset(held)) return 11;
        if (isThreeToStraightFlushSubset(held)) return 16;
        return -1;
    }

    if (n === 2) {
        if (isTwoSuitedHighSubset(held)) return 15;
        if (isSuitedTenBroadwaySubset(held)) return 18;
        if (isTwoUnsuitedHighSubset(held)) return 17;
        return -1;
    }

    // n === 1
    return isSingleHighSubset(held) ? 19 : -1;
}

function getBasicSuggestionForCurrentHand() {
    ensureTunedStrategyOrder(false);
    const rankBySource = new Map(tunedStrategyOrder.map((row, idx) => [row.sourceIndex, idx]));

    // Group all matching masks by their STRATEGY_PATTERNS source index.
    const bySource = new Map();
    for (let mask = 0; mask < 32; mask += 1) {
        const held = cardsFromMask(hand, mask);
        const sourceIndex = findBasicRowIndexForHeld(held);
        if (sourceIndex === -1) continue;
        if (!bySource.has(sourceIndex)) bySource.set(sourceIndex, []);
        bySource.get(sourceIndex).push(mask);
    }

    let bestMask = 0;
    let bestSourceIndex = 20;
    let bestRank = rankBySource.get(20) ?? tunedStrategyOrder.length;

    for (const [sourceIndex, masks] of bySource) {
        const rank = rankBySource.get(sourceIndex) ?? 999;
        if (rank >= bestRank) continue;
        bestRank = rank;
        bestSourceIndex = sourceIndex;
        bestMask = masks.length === 1 ? masks[0] : pickBestMaskByEv(hand, masks);
    }

    return {
        label: STRATEGY_PATTERNS[bestSourceIndex].label,
        mask: bestMask,
        sourceIndex: bestSourceIndex
    };
}

function pickBestMaskByEv(cards, masks) {
    let bestMask = masks[0];
    let bestEv = -Infinity;
    for (const mask of masks) {
        const ev = evaluateSpecificHold(cards, mask, paytable);
        if (ev > bestEv) {
            bestEv = ev;
            bestMask = mask;
        }
    }
    return bestMask;
}

function cardsFromMask(cards, mask) {
    return cards.filter((_, i) => ((mask >> i) & 1) === 1);
}

function allSameSuit(cards) {
    return cards.every((c) => c.suit === cards[0].suit);
}

function isFourToRoyalSubset(subset) {
    const target = new Set([10, 11, 12, 13, 14]);
    return subset.length === 4 && allSameSuit(subset) && subset.every((c) => target.has(c.rank));
}

function isFourToStraightFlushSubset(subset) {
    if (subset.length !== 4 || !allSameSuit(subset)) {
        return false;
    }

    const ranks = [...new Set(subset.map((c) => c.rank))];
    if (ranks.length !== 4) {
        return false;
    }

    return fitsAnyFiveCardStraight(ranks);
}

function isFourToFlushSubset(subset) {
    return subset.length === 4 && allSameSuit(subset);
}

function isOpenFourToStraightSubset(subset) {
    if (subset.length !== 4) {
        return false;
    }
    const ranks = [...new Set(subset.map((c) => c.rank))].sort((a, b) => a - b);
    if (ranks.length !== 4 || ranks[3] - ranks[0] !== 3) {
        return false;
    }

    // Outside straight must be completable at both ends.
    // Example of excluded edge case: J-Q-K-A only has one completion (10).
    // Note: 2-3-4-5 is valid — Ace completes the low end (A-2-3-4-5).
    return ranks[3] < 14;
}

function isTwoSuitedHighSubset(subset) {
    return subset.length === 2 && allSameSuit(subset) && subset.every((c) => c.rank >= 11);
}

function isThreeToRoyalSubset(subset) {
    const target = new Set([10, 11, 12, 13, 14]);
    return subset.length === 3 && allSameSuit(subset) && subset.every((c) => target.has(c.rank));
}

function isThreeToStraightFlushSubset(subset) {
    if (subset.length !== 3 || !allSameSuit(subset)) {
        return false;
    }

    const ranks = [...new Set(subset.map((c) => c.rank))];
    if (ranks.length !== 3) {
        return false;
    }

    return fitsAnyFiveCardStraight(ranks);
}

function fitsAnyFiveCardStraight(ranks) {
    const straights = [
        [14, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9],
        [6, 7, 8, 9, 10],
        [7, 8, 9, 10, 11],
        [8, 9, 10, 11, 12],
        [9, 10, 11, 12, 13],
        [10, 11, 12, 13, 14]
    ];

    return straights.some((straight) => ranks.every((rank) => straight.includes(rank)));
}

function isTwoUnsuitedHighSubset(subset) {
    return subset.length === 2 && subset[0].suit !== subset[1].suit && subset.every((c) => c.rank >= 11);
}

function isSuitedTenBroadwaySubset(subset) {
    if (subset.length !== 2 || subset[0].suit !== subset[1].suit) {
        return false;
    }

    const ranks = subset.map((c) => c.rank);
    return ranks.includes(10) && ranks.some((r) => r === 11 || r === 12 || r === 13);
}

function isSingleHighSubset(subset) {
    return subset.length === 1 && subset[0].rank >= 11;
}

function classifyHand(cards) {
    const ranks = cards.map((c) => c.rank).sort((a, b) => b - a);
    const suits = cards.map((c) => c.suit);
    const rankCounts = new Map();
    for (const rank of ranks) {
        rankCounts.set(rank, (rankCounts.get(rank) || 0) + 1);
    }

    const counts = [...rankCounts.values()].sort((a, b) => b - a);
    const uniqueRanks = [...rankCounts.keys()].sort((a, b) => a - b);
    const flush = suits.every((s) => s === suits[0]);
    const straight = isStraight(uniqueRanks);

    if (flush && straight && Math.min(...uniqueRanks) === 10) {
        return "royal_flush";
    }
    if (flush && straight) {
        return "straight_flush";
    }
    if (counts[0] === 4) {
        return "four_kind";
    }
    if (counts[0] === 3 && counts[1] === 2) {
        return "full_house";
    }
    if (flush) {
        return "flush";
    }
    if (straight) {
        return "straight";
    }
    if (counts[0] === 3) {
        return "three_kind";
    }
    if (counts[0] === 2 && counts[1] === 2) {
        return "two_pair";
    }
    if (counts[0] === 2) {
        const pairRank = [...rankCounts.entries()].find(([, c]) => c === 2)?.[0] ?? 0;
        if (pairRank >= 11) {
            return "jacks_or_better";
        }
    }

    return "nothing";
}

function isStraight(sortedUniqueAsc) {
    if (sortedUniqueAsc.length !== 5) {
        return false;
    }

    if (sortedUniqueAsc[0] === 2 && sortedUniqueAsc[1] === 3 && sortedUniqueAsc[2] === 4 && sortedUniqueAsc[3] === 5 && sortedUniqueAsc[4] === 14) {
        return true;
    }

    for (let i = 1; i < sortedUniqueAsc.length; i += 1) {
        if (sortedUniqueAsc[i] !== sortedUniqueAsc[i - 1] + 1) {
            return false;
        }
    }
    return true;
}

function makeDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({ rank: rank.value, suit: suit.key });
        }
    }
    return deck;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function rankLabel(rank) {
    const found = RANKS.find((r) => r.value === rank);
    return found ? found.label : String(rank);
}

function cardLabel(card) {
    const suit = SUITS.find((s) => s.key === card.suit);
    return `${rankLabel(card.rank)}${suit.symbol}`;
}

function cardKey(card) {
    return `${card.rank}${card.suit}`;
}
