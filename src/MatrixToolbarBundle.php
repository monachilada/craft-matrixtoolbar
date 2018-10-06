<?php
namespace monachilada\matrixtoolbar;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MatrixToolbarBundle extends AssetBundle
{
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = '@monachilada/matrixtoolbar/resources';

        // define the dependencies
        $this->depends = [
            CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'matrixtoolbar.js',
        ];

        $this->css = [
            'matrixtoolbar.css',
        ];

        parent::init();
    }
}