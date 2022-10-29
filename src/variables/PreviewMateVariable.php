<?php
/**
 * PreviewMate plugin for Craft CMS 4.x
 *
 * CraftCMS matrix tools for Live Preview.
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate\variables;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\helpers\Template;
use craft\elements\MatrixBlock;

/**
 * PreviewMate Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.previewMate }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class PreviewMateVariable
{
    // Public Methods
    // =========================================================================

    public function previewBlock(string $matrixHandle, ?MatrixBlock $block = null) {
        // if (Craft::$app->request->isLivePreview) {
            return Template::raw("preview-block=\"" . $matrixHandle . "\"");
        // }
        return null;
    }
}
