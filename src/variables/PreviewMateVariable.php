<?php

namespace nicholashamilton\previewmate\variables;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\helpers\Template;
use craft\elements\MatrixBlock;

class PreviewMateVariable {
    public function previewBlock(string $matrixHandle, ?MatrixBlock $block = null) {
        // if (Craft::$app->request->isLivePreview) {
            return Template::raw("preview-block=\"" . $matrixHandle . "\"");
        // }
        return null;
    }
}
