<?php
/**
 * PreviewMate plugin for Craft CMS 4.x
 *
 * CraftCMS matrix tools for Live Preview.
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate\models;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\base\Model;

/**
 * PreviewMate Settings Model
 *
 * This is a model used to define the plugin's settings.
 *
 * Models are containers for data. Just about every time information is passed
 * between services, controllers, and templates in Craft, it’s passed via a model.
 *
 * https://craftcms.com/docs/plugins/models
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class Settings extends Model
{
    // Public Properties
    // =========================================================================

    public array $matrixFields = [];
}
