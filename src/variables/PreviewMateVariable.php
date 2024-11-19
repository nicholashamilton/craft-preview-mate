<?php

namespace nicholashamilton\previewmate\variables;

use Craft;
use craft\helpers\Template;
use craft\elements\Entry;

class PreviewMateVariable
{
    public function previewBlock(Entry $entry) {
        static $isPreview = null;

        if ($isPreview === null) {
            $isPreview = Craft::$app->request->isPreview ?? false;
        }

        return $isPreview ? Template::raw("data-preview-block-id=\"" . $entry->id . "\"") : '';
    }
}
