<?php
/**
 * PreviewMate plugin for Craft CMS
 *
 * CraftCMS matrix tools for Live Preview
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

/**
 * PreviewMate config.php
 */

return [
    "matrixFields" => [
        [
            "handle" => "carouselHero",
        ],
        [
            "handle" => "pageBuilder",
            "excludedBlocks" => [
                "rowContainer",
            ],
        ],
    ],
];