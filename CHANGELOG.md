# Changelog

## [1.1.0](https://github.com/invalio19/rct2-fleecer/compare/v1.0.1...v1.1.0) - 2019-04-17

### Added

- The recommended park entrance fee field is now calculated and displayed, along with a modal explaining its logic.
- Added a lot more tests.

### Changed

- Did a little refactoring in some places.

## [1.0.1](https://github.com/invalio19/rct2-fleecer/compare/v1.0.0...v1.0.1) - 2019-04-11

### Added

- Made a start on getting unit tests up and running.

### Fixed

- 'Delete all rides' no longer prevents auto-saving from working until the page is refreshed.
- 'Delete all rides' no longer resets options such as game version to their default value.

## [1.0.0](https://github.com/invalio19/rct2-fleecer/releases/tag/v1.0.0) - 2019-04-09

### Added

- Build up a list of rides and get the maximum price you can charge for them—or the 'good value' price—based on its ratings.
- Automatic duplicate ride type detection (having more than one ride of the same type decreases its value by about 25%).
- Data is auto-saved to the browser whenever any details are changed, and persists even when the page is closed.
- Compatible with RCT2, RCT Classic and OpenRCT2.
- Manually sort the order of rides.
- Designed to work well on mobile.
