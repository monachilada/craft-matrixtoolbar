<?php
/**
 * Matrix Toggle plugin for Craft CMS 3.x
 *
 * Simultaneously toggle all blocks in a Matrix field on or off.
 *
 * @link      https://michaelpierce.trade/
 * @copyright Copyright (c) 2018 Mike Pierce
 */

namespace monachilada\matrixtoggle\variables;

use monachilada\matrixtoggle\MatrixToggle;

use Craft;

/**
 * Matrix Toggle Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.matrixToggle }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Mike Pierce
 * @package   MatrixToggle
 * @since     1.0.0
 */
class MatrixToggleVariable
{
    // Public Methods
    // =========================================================================

    /**
     * Whatever you want to output to a Twig template can go into a Variable method.
     * You can have as many variable functions as you want.  From any Twig template,
     * call it like this:
     *
     *     {{ craft.matrixToggle.exampleVariable }}
     *
     * Or, if your variable requires parameters from Twig:
     *
     *     {{ craft.matrixToggle.exampleVariable(twigValue) }}
     *
     * @param null $optional
     * @return string
     */
    public function exampleVariable($optional = null)
    {
        $result = "And away we go to the Twig template...";
        if ($optional) {
            $result = "I'm feeling optional today...";
        }
        return $result;
    }
}
