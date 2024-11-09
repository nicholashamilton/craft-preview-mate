# PreviewMate Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 3.0.0 - 2024-11-09
### Fixed
- Support for Craft CMS 5
### Added
- Added `preview-block-id` attribute. This is now the default way to wire up PreviewMate to live preview (also a much cleaner approach).
### Removed
- Removed `config/PreviewMate.php`. No longer needed after adding `preview-block-id`.

## 2.0.0 - 2024-03-26
- Added support for Craft CMS 5.0 or later.

## 1.0.2 - 2024-02-07
### Fixed
- Exception when iframe content is not fully loaded on large pages.

## 1.0.1 - 2022-12-19
### Fixed
- Exclude nested editor matrix blocks from query. Edge case occured when using Matrix -> Super Table -> Matrix.

### Removed
- Craft tests

## 1.0.0 - 2022-10-31
### Added
- Initial release
- Click Preview Block and scroll to the corresponding Editor Block