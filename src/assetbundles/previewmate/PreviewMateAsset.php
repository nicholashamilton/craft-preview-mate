<?php

namespace nicholashamilton\previewmate\assetbundles\previewmate;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html
 */
class PreviewMateAsset extends AssetBundle {
    public function init() {
        $this->sourcePath = "@nicholashamilton/previewmate/assetbundles/previewmate/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/index.js',
        ];

        $this->css = [
            'css/index.css',
        ];

        parent::init();
    }
}
