<?php
/**
 * PreviewMate plugin for Craft CMS
 *
 * CraftCMS matrix tools for Live Preview
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
