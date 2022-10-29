<?php
/**
 * PreviewMate plugin for Craft CMS
 *
 * CraftCMS matrix tools for Live Preview
 *
 * @link      https://github.com/nicholashamilton
 * @copyright Copyright (c) 2022 Nicholas Hamilton
 */

namespace nicholashamilton\previewmate;

use nicholashamilton\previewmate\assetbundles\previewmate\PreviewMateAsset;
use nicholashamilton\previewmate\services\PreviewMateService as PreviewMateServiceService;
use nicholashamilton\previewmate\variables\PreviewMateVariable;
use nicholashamilton\previewmate\twigextensions\PreviewMateTwigExtension;
use nicholashamilton\previewmate\models\Settings;

use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\web\UrlManager;
use craft\web\twig\variables\CraftVariable;
use craft\events\RegisterUrlRulesEvent;
use craft\web\View;
use craft\events\TemplateEvent;

use yii\base\Event;

/**
 * @author    Nicholas Hamilton
 * @package   PreviewMate
 * @since     1.0.0
 */
class PreviewMate extends Plugin
{
    // Static Properties
    // =========================================================================

    public static PreviewMate $plugin;

    // Public Properties
    // =========================================================================

    public string$schemaVersion = '1.0.0';
    public bool $hasCpSettings = false;
    public bool $hasCpSection = false;

    // Public Methods
    // =========================================================================

    public function init()
    {
        parent::init();
        self::$plugin = $this;

        if (!PreviewMate::$plugin->isInstalled) {
            return;
        }

        Craft::$app->view->registerTwigExtension(new PreviewMateTwigExtension());

        $this->loadAssetBundle();

        $this->registerSiteRoutes();

        $this->registerCpRoutes();

        $this->registerVariables();

        $this->afterInstall();

        Craft::info(
            Craft::t(
                'preview-mate',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // Protected Methods
    // =========================================================================

    protected function createSettingsModel(): ?Settings
    {
        return new Settings();
    }

    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'preview-mate/settings',
            [
                'settings' => $this->getSettings()
            ]
        );
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
                            'Error registering AssetBundle - '.$e->getMessage(),
                            __METHOD__
                        );
                    }
                }
            );
        }
    }

    protected function registerSiteRoutes()
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['preview-mate/api/get-settings'] = 'preview-mate/default/get-settings';
            }
        );
    }

    protected function registerCpRoutes()
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['cpActionTrigger1'] = 'preview-mate/default/do-something';
            }
        );
    }

    protected function registerVariables()
    {
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

    protected function afterInstall()
    {
        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                    // We were just installed
                }
            }
        );
    }
}
