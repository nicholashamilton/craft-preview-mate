<?php
/**
 * PreviewMate plugin for Craft CMS 4.x
 *
 * CraftCMS matrix tools for Live Preview.
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate\services;

use nicholashamilton\previewmate\PreviewMate;

use Craft;
use craft\base\Component;

/**
 * PreviewMateService Service
 *
 * All of your plugin’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class PreviewMateService extends Component
{
    // Public Methods
    // =========================================================================

    public function get(): string
    {
        return "";
    }
}
