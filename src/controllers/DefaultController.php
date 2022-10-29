<?php
/**
 * PreviewMate plugin for Craft CMS
 *
 * CraftCMS matrix tools for Live Preview
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate\controllers;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\web\Controller;

/**
 * Default Controller
 *
 * https://craftcms.com/docs/plugins/controllers
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    protected array|int|bool $allowAnonymous = ['get-settings'];

    // Public Methods
    // =========================================================================

    public function actionGetSettings()
    {
        $this->requireLogin();
        return json_encode(PreviewMate::$plugin->getSettings());
    }
}
