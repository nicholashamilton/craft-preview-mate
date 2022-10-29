<?php
/**
 * PreviewMate plugin for Craft CMS
 *
 * CraftCMS matrix tools for Live Preview
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate\assetbundles\previewmate;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * PreviewMateAsset AssetBundle
 *
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class PreviewMateAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * Initializes the bundle.
     */
    public function init()
    {
        $this->sourcePath = "@nicholashamilton/previewmate/assetbundles/previewmate/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/PreviewMate.js',
        ];

        $this->css = [
            'css/PreviewMate.css',
        ];

        parent::init();
    }
}
