<?php
/**
 * Matrix Toggle plugin for Craft CMS 3.x
 *
 * Simultaneously toggle all blocks in a Matrix field on or off.
 *
 * @link      https://michaelpierce.trade/
 * @copyright Copyright (c) 2018 Mike Pierce
 */

namespace monachilada\matrixtoggle\utilities;

use monachilada\matrixtoggle\MatrixToggle;
use monachilada\matrixtoggle\assetbundles\matrixtoggleutilityutility\MatrixToggleUtilityUtilityAsset;

use Craft;
use craft\base\Utility;

/**
 * Matrix Toggle Utility
 *
 * Utility is the base class for classes representing Control Panel utilities.
 *
 * https://craftcms.com/docs/plugins/utilities
 *
 * @author    Mike Pierce
 * @package   MatrixToggle
 * @since     1.0.0
 */
class MatrixToggleUtility extends Utility
{
    // Static
    // =========================================================================

    /**
     * Returns the display name of this utility.
     *
     * @return string The display name of this utility.
     */
    public static function displayName(): string
    {
        return Craft::t('matrix-toggle', 'MatrixToggleUtility');
    }

    /**
     * Returns the utility’s unique identifier.
     *
     * The ID should be in `kebab-case`, as it will be visible in the URL (`admin/utilities/the-handle`).
     *
     * @return string
     */
    public static function id(): string
    {
        return 'matrixtoggle-matrix-toggle-utility';
    }

    /**
     * Returns the path to the utility's SVG icon.
     *
     * @return string|null The path to the utility SVG icon
     */
    public static function iconPath()
    {
        return Craft::getAlias("@monachilada/matrixtoggle/assetbundles/matrixtoggleutilityutility/dist/img/MatrixToggleUtility-icon.svg");
    }

    /**
     * Returns the number that should be shown in the utility’s nav item badge.
     *
     * If `0` is returned, no badge will be shown
     *
     * @return int
     */
    public static function badgeCount(): int
    {
        return 0;
    }

    /**
     * Returns the utility's content HTML.
     *
     * @return string
     */
    public static function contentHtml(): string
    {
        Craft::$app->getView()->registerAssetBundle(MatrixToggleUtilityUtilityAsset::class);

        $someVar = 'Have a nice day!';
        return Craft::$app->getView()->renderTemplate(
            'matrix-toggle/_components/utilities/MatrixToggleUtility_content',
            [
                'someVar' => $someVar
            ]
        );
    }
}
