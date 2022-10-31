# PreviewMate

##### Click Preview Block -> Scroll to Editor Block
<img src="resources/img/PreviewMate-min.gif" width="100%" style="max-width: 800px;" />

##### 🟦 Editor Blocks on Left - 🟨 Preview Blocks on Right

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
            "excludedBlocks" => [
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
##### Each block/ element rendered from a Matrix Field needs either of the two tags in order to work with Live Preview click and scroll.
##### `excludedBlocks` will be ignored and do not need `preview-block` tag.
```twig
{# option 1 #}
{{ craft.previewMate.previewBlock("replaceWithMatrixFieldHandleHere") }}
```
```twig
{# option 2 #}
preview-block="replaceWithMatrixFieldHandleHere"
```

##### Twig example with a Matrix Field
```twig
{% set matrixHandle = "pageBuilder" %}
{% set blocks = entry[matrixHandle].all() %}

{% for block in blocks %}
    <div {{ craft.previewMate.previewBlock(matrixHandle) }}>
        {{ include("_blocks/" ~ block.type.handle|kebab) }}
    </div>
{% endfor %}
```
##### Optional: CSS for Dashed Border when hovering Preview Blocks
```css
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
```

##### [Example](https://github.com/nicholashamilton/craft-preview-mate/tree/main/example/templates)

## Caveats

##### - PreviewMate has only been tested with Server Side Rendered Matrix Blocks
##### - Nesting `preview-blocks` is not supported currently, use `excludedBlocks` to disable blocks
