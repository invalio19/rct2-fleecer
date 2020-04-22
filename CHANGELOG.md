# Changelog

## [1.2.0](https://github.com/invalio19/rct2-fleecer/compare/v1.1.0...v1.2.0) - 2019-04-TODO

### Added

- Minimum stat requirements and corresponding rating penalties can now be viewed for rides that have them.

### Changed

- The 'upgrade ride age' button has been changed to a 'refurbish' button which resets the ride age to less than 5 months.
- When the park has an entrance fee, the 'show good value prices' checkbox is hidden rather than disabled.
- Updated the checkbox styles.
- Updated the icons to Font Awesome 5.

### Fixed

- The ride price field and ride rating labels no longer act like clickable buttons.

## [1.1.0](https://github.com/invalio19/rct2-fleecer/compare/v1.0.1...v1.1.0) - 2019-04-17

### Added

- The recommended park entrance fee field is now calculated and displayed, along with a modal explaining its logic.

## [1.0.1](https://github.com/invalio19/rct2-fleecer/compare/v1.0.0...v1.0.1) - 2019-04-11

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