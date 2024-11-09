<?php

namespace nicholashamilton\previewmate\variables;

use Craft;
use craft\helpers\Template;
use craft\elements\Entry;

class PreviewMateVariable
{
    public function previewBlock(Entry $entry) {
        static $isLivePreview = null;

        if ($isLivePreview === null) {
            $url = Craft::$app->request->url;
            $isLivePreview = strpos($url, 'x-craft-live-preview') !== false; // TODO: investigate why Craft::$app->request->isLivePreview is not true when previewing entries
        }

        return $isLivePreview ? Template::raw("preview-block-id=\"" . $entry->id . "\"") : '';
    }
}
