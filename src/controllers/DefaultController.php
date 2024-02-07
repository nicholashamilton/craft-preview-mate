<?php

namespace nicholashamilton\previewmate\controllers;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\web\Controller;

/**
 * https://craftcms.com/docs/plugins/controllers
 */
class DefaultController extends Controller {

    protected array|int|bool $allowAnonymous = ['get-settings'];

    public function actionGetSettings() {
        $this->requireLogin();
        return json_encode(PreviewMate::$plugin->getSettings());
    }
}
