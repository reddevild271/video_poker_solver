# Video Poker Solver

A browser-based video poker analysis tool. Enter any 5-card hand, configure the paytable, and get the exact EV-optimal hold instantly.

## Features

- **Exact EV solver** — evaluates all 32 hold combinations, enumerates every possible draw outcome
- **Configurable paytable** — adjust any multiplier; strategy and EV recompute automatically
- **Basic cheat sheet** — priority-ordered strategy guide, auto-tuned to your paytable
- **Advanced cheat sheet** — fine-grained strategy rows with Rep EV per play type; optional split view for individual pat hand categories
- **Exception detection** — highlights when the solver's optimal hold disagrees with chart guidance
- **PWA** — works offline, installable on mobile

## Usage

Open `index.html` directly in a browser, or serve over HTTP for PWA/offline support.

## Tests

Open `test.html` in a browser.

## Notes

- Paytable values are per-coin multipliers (e.g. Royal Flush = 800 means 800× bet returned)
- Solver checks all 32 hold options and computes exact EV via full draw enumeration (2,598,960 outcomes)
