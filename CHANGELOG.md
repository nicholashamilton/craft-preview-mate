# PreviewMate Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 4.1.0 - 2024-11-19
### Added
- Added automatic tab selection in live preview when clicking preview blocks that belong to different tabs.

## 4.0.0 - 2024-11-13
> [!NOTE]
> The attribute name for tracking preview blocks has been changed from `preview-block-id` to `data-preview-block-id`

### Breaking Changes
- Changed the attribute name for tracking preview blocks from `preview-block-id` to `data-preview-block-id`. Update your template code accordingly.
- `craft.previewMate.previewBlock` twig variable now returns the HTML attribute with `data-` prefixed to match the new `data-preview-block-id` attribute.

## 3.0.2 - 2024-11-13
### Updated
- `craft.previewMate.previewBlock` twig variable now uses `Craft::$app->request->isPreview` internally to check if the current request is a preview request.

## 3.0.1 - 2024-11-11
### Removed
- Remove CP Settings

## 3.0.0 - 2024-11-11
### Fixed
- Support for Craft CMS 5.
### Added
- Added documentation for Craft CMS 5 usage.
- Added `preview-block-id` HTML attribute. This is now the default way to connect live preview blocks to editor blocks (also a much cleaner approach).
### Changed
- Twig variable `craft.previewMate.previewBlock` now requires an `\craft\elements\Entry` argument which will add the `preview-block-id` attribute to the HTML element.
### Removed
- Removed `config/preview-mate.php`. No longer needed after adding `preview-block-id`.

## 2.0.0 - 2024-03-26
- Added support for Craft CMS 4.x

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
