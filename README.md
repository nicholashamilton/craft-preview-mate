# PreviewMate plugin for Craft CMS 4.x
CraftCMS matrix tools for Live Preview.
![Screenshot](resources/img/plugin-logo.png)

## Requirements
This plugin requires Craft CMS 4 or later.

## Installation
To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project
		
2. Then tell Composer to load the plugin:

        composer require nicholashamilton/preview-mate
		
3. In the Control Panel, go to Settings → Plugins and click the “Install” button for PreviewMate.

## Core Concepts
🟨 Editor Blocks - Blocks on left side in preview view
🟦 Preview Blocks - Block on right side in device preview view
Editor Menu - Menu on left side in preview view

## Config
##### `config/preview-mate.php`

```php
<?php

return [
    "enableEditorMenu" => true,
    "editorMenuMatrixActions" => [
        [
            "action" => "expandAll",
        ],
        [
            "action" => "collapseAll",
        ],
        [
            "action" => "enableAll",
            "prompt" => true,
        ],
        [
            "action" => "disableAll",
            "prompt" => true,
        ],
        [
            "action" => "deleteAll",
            "prompt" => true,
        ],
    ],

    "previewMatrixFields" => [
        [
            "handle" => "pageBuilder",
            "exclude" => [
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
#### Each individual matrix block needs a `preview-block="{{ matrixHandle }}"` tag (unless excluded in config)
##### `templates/blocks-builder-example.twig`

```twig
{% set blocks = entry.blocksBuilder.all() %}

{% for block in blocks %}
   <div
        preview-block="blocksBuilder"
    >
        {% set blockIncludePath = "_blocks/" ~ block.type.handle|kebab %}
        {% include blockIncludePath ignore missing %}
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

## PreviewMate Roadmap

Some things to do, and ideas for potential features:
- [x] Scroll to and highlight matrix block editor
- [x] Matrix settings menu (collapse, expand, enable, disable, delete)
- [ ] 