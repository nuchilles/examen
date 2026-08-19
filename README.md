# Examen

A one-file instrument for timing eight daily stations. The day is drawn as
eight stopwatch faces on an engraved map. Every face is the same size; the
time is told by the numbers, not by the geometry.

Live at **https://nuchilles.github.io/examen/**

## What is in this folder

| File | Purpose |
|---|---|
| `index.html` | The instrument. All code, style and markup are in this one file. The map is drawn once; the discs sit on a second, transparent layer, so a running stopwatch never repaints the map. |
| `map-images/` | 22 map plates, one per day, in filename order. |
| `manifest.webmanifest` | Lets the tablet install the tool on the home screen. |
| `sw.js` | Service worker. Keeps the tool and the plates available offline. |
| `icon-192.png`, `icon-512.png` | Home-screen icons. |

Seven items in Finder; 28 files once GitHub unpacks `map-images`.

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
  +5 +10 +30, **clear**, and a box for typed minutes: **Set** makes the
  station read exactly what you typed, **Add** puts it on top of what is
  there. Enter means Set. Use it for a session the instrument never saw. It
  works on a running station too, which keeps running.
- Stations run together. For Nauticus, start another station first, then tap
  Nauticus. The two then run side by side.
- **Close the day** files it into the ledger and begins the next one.
- **Calibrate** moves a station by dragging, and is saved per map plate. The
  taps stand aside while you calibrate, and while a filed day is on the plate.

The Survey stays in the menu as a plain list, for the days you would rather
read the numbers than the map.

## The stations

| On the map | Reads | Note |
|---|---|---|
| Mater Christi | rosary, little office, prayer | |
| Recollectio | silence, wordless | |
| Hypomnema | dossier read, journal written | |
| Ingenium | making and selling | |
| Nauticus | on the water | Start another station first, then this one. |
| Agōn | deliberate training | |
| Eukinēsía | mobility, fascia, stretching | |
| Kinesis | Zone 1 movement | |

The name on the map and the key beneath it are separate. Renaming a station
in `STATIONS` changes only what you read; the `id` is what every filed day
and every calibration is written under, so leave the `id` alone.

## The plates

The background rotates daily through `map-images/`, one plate per day, in
filename order. `MAPS.epoch` in `index.html` is the date on which plate 1 is
shown — currently **2026-08-15**. The cycle comes round every 22 days.

To add plates: drop them in the folder with the same naming pattern, raise
`MAPS.count`, and raise `VERSION` in `sw.js` by one.

## Install it on the tablet

1. Open https://nuchilles.github.io/examen/ in Chrome.
2. Wait for the map. The tool caches all 22 plates in the background.
3. Chrome menu → **Add to Home screen**.
4. Turn on airplane mode and open the icon. It must still work.

## Move the record across

The browser keeps the ledger per address, so the old file on disk and this
address are strangers to each other. Before you change over: open the old
file, export the ledger as JSONL, open this address, import that file.

## How to change the tool later

- Small edit: open the file on github.com, click the pencil, edit, commit.
- Large edit: upload the new file the way you did the first time. The upload
  replaces what is there.
- The tablet takes the new version the next time it opens the tool online.
- If you add or remove plates, raise `VERSION` in `sw.js` by one. That clears
  the old offline cache.

## Notes

- The plates are WebP, about 350 KB each. The originals were PNG at about
  3 MB. The folder is 8.8 MB in total, not 71 MB.
- Calibration is keyed by plate filename, and also reads the old `.png` keys,
  so calibration done before the WebP conversion still applies.
- The repository is public. Anyone with the address can open the instrument.
  Your logged days are **not** in it. They stay in the tablet's browser.
