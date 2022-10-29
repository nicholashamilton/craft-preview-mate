# PreviewMate - Live Preview Plugin

##### Click Preview Block -> Scroll to Editor Block
<!-- <img src="resources/img/PreviewMate-Example.gif" width="100%" style="max-width: 800px;" /> -->
##### 🟦 Preview Blocks - Rendered Blocks on right side of Live Preview
##### 🟨 Editor Blocks - Matrix Blocks on Left side of Live Preview

## Requirements
This plugin requires Craft CMS 4 or later.

## Installation
To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project
		
2. Then tell Composer to load the plugin:

        composer require nicholashamilton/craft-preview-mate
		
3. In the Control Panel, go to Settings → Plugins and click the “Install” button for PreviewMate.

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
##### Each element rendered from a Matrix Field needs either of the two tags in order to work with Live Preview click and scroll.
##### `excludedBlocks` will be ignored and do not need `preview-block` tag
```twig
{# option 1 #}
{{ craft.previewMate.previewBlock("replaceWithMatrixFieldHandleHere") }}
```
```twig
{# option 2 #}
preview-block="replaceWithMatrixFieldHandleHere"
```

#### Example with a Matrix Field
```twig
{% set blocks = entry.pageBuilder.all() %}

{% for block in blocks %}
    <div {{ craft.previewMate.previewBlock("pageBuilder") }}>
        {{ include("_blocks/" ~ block.type.handle|kebab) }}
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