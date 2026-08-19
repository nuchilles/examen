# Pensacola Poets

A one-file instrument for timing eight daily stations. The day is drawn as
eight stopwatch faces on an engraved map. Every face is the same size; the
time is told by the numbers, not by the geometry.

## What is in this folder

| File | Purpose |
|---|---|
| `index.html` | The instrument. All code, style and markup are in this file. |
| | The map is drawn once. The discs sit on a second, transparent layer, so a running stopwatch never repaints the map. |
| `map-images/` | 22 map plates. One plate per day, in filename order. |
| `manifest.webmanifest` | Lets the tablet install the tool on the home screen. |
| `sw.js` | Service worker. Keeps the tool and the plates available offline. |
| `icon-192.png`, `icon-512.png` | Home-screen icons. |

## How to publish it

Do these steps one time.

**1. Make the repository**

- Sign in at github.com.
- Click **+** (top right) → **New repository**.
- Name: `pensacola-poets`.
- Select **Public**.
- Add no README, no .gitignore, no licence.
- Click **Create repository**.

**2. Upload the files**

- On the empty repository page, click **uploading an existing file**.
- Open this `site` folder in Finder.
- Press **Cmd+A** to select the items *inside* the folder.
- Drag those items into the browser window.
- Do not drag the `site` folder itself. The files must sit at the top level.
- Wait for all 27 files to appear, then click **Commit changes**.

**3. Turn on GitHub Pages**

- Click **Settings** → **Pages** (left menu).
- Source: **Deploy from a branch**.
- Branch: **main**, folder: **/ (root)**. Click **Save**.
- Wait two minutes. The page then shows the address.

The address is:

```
https://YOUR-USERNAME.github.io/pensacola-poets/
```

**4. Install it on the tablet**

- Open the address in Chrome on the tablet.
- Wait for the map to appear. The tool caches all 22 plates in the background.
- Open the Chrome menu → **Add to Home screen**.
- Turn on airplane mode and open the icon. The tool must still work.

## How the map works

The map is the instrument. There is no separate list to tap.

- **Tap a station** to start it. Tap it again to stop.
- A disc is **blank until you first tap it**, and never blank again. Only
  **clear** returns it to blank.
- A running station wears a **ring that breathes**, and its disc becomes a
  stopwatch: minutes, seconds and hundredths, counting from the tap.
- When you stop it, the disc **holds the instant it froze on**, hundredths
  and all, for the rest of the day.
- Every face has the same shape — `00:00.00` — from the first moment. The
  digits never jump about as the count climbs.
- Minutes are not rolled into hours. A long station carries a third digit,
  `214:39`, and the disc sets its type a little smaller to take it.
- The face is set on two lines: the figure, and the hundredths beneath it in
  smaller type.
- **Every disc is one size**, whatever the clock says. It sits lightly on the
  engraving and is wide enough to hold `00:00` in readable type.
- **Discs + / −** tunes that one size to your screen, from half to double.
  The setting is remembered, as is **Names**.
- The tap target *is* the disc — same centre, same size, never under 44 px.
- **Long-press a station** to correct its count. The strip offers −30 −10 −5
  +5 +10 +30, **clear**, and a box for typed minutes:
  **Set** makes the station read exactly what you typed, **Add** puts it on
  top of what is there. Enter means Set. Use it for a session the instrument
  never saw. It works on a running station too, which keeps running.
- Stations run together. For Nauticus, start another station first, then
  tap Nauticus. The two then run side by side.
- **Close the day** files it into the ledger and begins the next one.
- **Calibrate** still moves a station by dragging. The taps stand aside
  while you calibrate, and while a filed day is on the plate.

The Survey stays in the menu as a plain list, for the days you would rather
read the numbers than the map.

## Move the record across

The tablet keeps the ledger in the browser, and the browser keeps it per
address. The old file on disk and the new web address are different
addresses, so the record does not move by itself.

Before you change over:

1. Open the old file on the tablet.
2. Export the ledger as JSONL.
3. Open the new address.
4. Import that file.

## How to change the tool later

- Small edit: open `index.html` on github.com, click the pencil, edit, commit.
- Large edit: upload the new file the same way as step 2. The upload replaces
  the old file.
- The tablet gets the new version the next time it opens the tool online.
- If you add or remove map plates, raise `VERSION` in `sw.js` by one. This
  clears the old offline cache.

## Notes

- The map plates are WebP, about 350 KB each. The originals were PNG, about
  3 MB each. The folder is 8 MB in total, not 71 MB.
- Calibration is stored against the plate filename. The code also reads the
  old `.png` keys, so earlier calibration still applies.
- The repository is public. Anyone with the address can open the instrument.
  Your logged days are **not** in the repository. They stay in the tablet
  browser.
