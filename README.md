## What
An app that creates a stopwatch that works like Apple stopwatch on iphone

## Why
To learn TDD and testing in general.

## How
- Display a digital stopwatch in format: mins:secs:hundredth of a second
- Start and stop button
- Lap/reset button

### UI/UX

App default state:
- Timer in mins:secs:hundredth/secs
- Lap button (disabled)
- Start button

On press start:
- start button changes to stop button
- reset/disabled lap button changes to lap button (depends if default state or not)

On press lap:
- record the interval between either (i) start or (ii) last lap end
- show all laps in a list with most recent at the top

On press stop:
- lap button changes to reset
- stop button changes to start

On press reset:
- Timer reset to zero
- Any recorded laps removed
- Buttons reset to default
