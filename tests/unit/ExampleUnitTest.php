<?php
/**
 * PreviewMate plugin for Craft CMS 3.x
 *
 * CraftCMS matrix tools for Live Preview.
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmatetests\unit;

use Codeception\Test\Unit;
use UnitTester;
use Craft;
use nicholashamilton\previewmate\PreviewMate;

/**
 * ExampleUnitTest
 *
 *
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class ExampleUnitTest extends Unit
{
    // Properties
    // =========================================================================

    /**
     * @var UnitTester
     */
    protected $tester;

    // Public methods
    // =========================================================================

    // Tests
    // =========================================================================

    /**
     *
     */
    public function testPluginInstance()
    {
        $this->assertInstanceOf(
            PreviewMate::class,
            PreviewMate::$plugin
        );
    }

    /**
     *
     */
    public function testCraftEdition()
    {
        Craft::$app->setEdition(Craft::Pro);

        $this->assertSame(
            Craft::Pro,
            Craft::$app->getEdition()
        );
    }
}
