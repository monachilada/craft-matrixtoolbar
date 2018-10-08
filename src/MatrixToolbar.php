<?php
/**
 * Matrix Toggle plugin for Craft CMS 3.x
 *
 * Expand, Collapse and modify the status of multiple blocks in a Matrix field simultaneously.
 *
 * @link      https://michaelpierce.trade/
 * @copyright Copyright (c) 2018 Mike Pierce
 */

namespace monachilada\matrixtoolbar;

use Craft;
use craft\base\Plugin;
use craft\events\RegisterTemplateRootsEvent;
use craft\services\Plugins;

use craft\web\View;
use yii\base\Event;

/**
 * Craft plugins are very much like little applications in and of themselves. We’ve made
 * it as simple as we can, but the training wheels are off. A little prior knowledge is
 * going to be required to write a plugin.
 *
 * For the purposes of the plugin docs, we’re going to assume that you know PHP and SQL,
 * as well as some semi-advanced concepts like object-oriented programming and PHP namespaces.
 *
 * https://craftcms.com/docs/plugins/introduction
 *
 * @author    Mike Pierce
 * @package   MatrixToolbar
 * @since     1.0.0
 */
class MatrixToolbar extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * MatrixToolbar::$plugin
     *
     * @var MatrixToolbar
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * To execute your plugin’s migrations, you’ll need to increase its schema version.
     *
     * @var string
     */
    public $schemaVersion = '1.0.3';

    // Public Methods
    // =========================================================================

    /**
     * Set our $plugin static property to this class so that it can be accessed via
     * MatrixToolbar::$plugin
     *
     * Called after the plugin class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        Craft::info(
            Craft::t(
                'matrixtoolbar',
                'Matrix Toolbar plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );

        $request = Craft::$app->getRequest();

        if (!$request->getIsCpRequest() || $request->getIsConsoleRequest()) {
            return false;
        }

        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots['matrixtoolbar'] = __DIR__ . '/templates';
            }
        );

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_LOAD_PLUGINS,
            function () {
                Craft::$app->getView()->registerAssetBundle(MatrixToolbarBundle::class);
                Craft::$app->getView()->registerJs('Craft.MatrixToolbarPlugin.init();');
            }
        );

        Craft::$app->view->hook('cp.entries.edit.content', function() {
            return Craft::$app->getView()->renderTemplate('matrixtoolbar/matrixtoolbar');
        });
    }
}
