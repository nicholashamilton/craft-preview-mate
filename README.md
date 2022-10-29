# PreviewMate - Live Preview Plugin

## Requirements
This plugin requires Craft CMS 4 or later.

## Installation
To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project
		
2. Then tell Composer to load the plugin:

        composer require nicholashamilton/craft-preview-mate
		
3. In the Control Panel, go to Settings → Plugins and click the “Install” button for PreviewMate.

## Core Concepts
🟨 Editor Blocks - Blocks on left side in preview view
🟦 Preview Blocks - Block on right side in device preview view

## Config
##### `config/preview-mate.php`

```php
<?php

return [
    "matrixFields" => [
        [
            "handle" => "pageBuilder",
            "excludeBlocks" => [
                "rowContainer",
            ],
        ],
        [
            "handle" => "ctaBlocks",
        ],
    ],
];
```

## Template Configuration
#### Each individual matrix block needs a `preview-block="{{ matrixHandle }}"` tag (unless block is in excludeBlocks array in config)
##### `templates/_page-builder/index.twig`

```twig
{% set blocks = entry.pageBuilder.all() %}

{% for block in blocks %}
    <div {{ craft.previewMate.previewBlock("pageBuilder") }}>
        {% set blockIncludePath = "_blocks/" ~ block.type.handle|kebab %}
        {% include blockIncludePath %}
    </div>
{% endfor %}

<style>
    [preview-block] {
        position: relative;
    }
    [preview-block]::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px dashed rgba(0, 0, 0, .333);
        pointer-events: none;
        opacity: 0;
        transition: opacity 300ms ease;
    }
    [preview-block].is-hovering::after {
        opacity: 1;
    }
</style>
```