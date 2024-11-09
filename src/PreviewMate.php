<?php

namespace nicholashamilton\previewmate;

use Craft;
use craft\web\View;
use yii\base\Event;
use craft\base\Model;
use craft\base\Plugin;
use craft\events\TemplateEvent;
use yii\base\InvalidConfigException;
use nicholashamilton\previewmate\models\Settings;
use nicholashamilton\previewmate\assetbundles\previewmate\PreviewMateAsset;
use craft\web\twig\variables\CraftVariable;
use nicholashamilton\previewmate\variables\PreviewMateVariable;

class PreviewMate extends Plugin
{
    public string $schemaVersion = '1.0.0';
    public bool $hasCpSettings = false;

    public static function config(): array
    {
        return [
            'components' => [],
        ];
    }

    public function init(): void
    {
        parent::init();

        $this->attachEventHandlers();

        // Any code that creates an element query or loads Twig should be deferred until
        // after Craft is fully initialized, to avoid conflicts with other plugins/modules
        Craft::$app->onInit(function () {});
    }

    protected function createSettingsModel(): ?Model
    {
        return Craft::createObject(Settings::class);
    }

    protected function settingsHtml(): ?string
    {
        return Craft::$app->view->renderTemplate('craft-preview-mate/_settings.twig', [
            'plugin' => $this,
            'settings' => $this->getSettings(),
        ]);
    }

    private function attachEventHandlers(): void
    {
        // Event handlers
        // (https://craftcms.com/docs/5.x/extend/events.html)
        $this->loadAssetBundle();
        $this->registerVariables();
    }

    protected function loadAssetBundle()
    {
        if (Craft::$app->getRequest()->getIsCpRequest()) {
            Event::on(
                View::class,
                View::EVENT_BEFORE_RENDER_TEMPLATE,
                function (TemplateEvent $event) {
                    try {
                        Craft::$app->getView()->registerAssetBundle(PreviewMateAsset::class);
                    } catch (InvalidConfigException $e) {
                        Craft::error(
                            'Error registering AssetBundle - ' . $e->getMessage(),
                            __METHOD__
                        );
                    }
                }
            );
        }
    }

    protected function registerVariables() {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('previewMate', PreviewMateVariable::class);
            }
        );
    }
}
