(function (window) {

    if (!window.Craft || !window.jQuery) {
        return false;
    }

    Craft.MatrixToolbarPlugin = {
        init: function () {
            var self = this,
                $target = $(this.getFieldContextSelector()),
                $matrixFields = $('.field[data-type$="Matrix"]:not([data-matrixToolbar])', $target),
                $matrixToolbar = $('.matrixToolbar:last');;
						
            if($matrixToolbar.length) {
                $matrixFields.each(function() {
                    var $field = $(this),
                        $toolbar = $matrixToolbar.clone(true),
                        $blocks = $('.input:first .matrix .blocks', $field),
                        $checkbox = $('.matrixToolbar-checkbox:first', $toolbar),
                        $settings = $('.matrixToolbar-settings:first', $toolbar),
                        $status = $('.matrixToolbar-status:first', $toolbar);
                    
                    $field.attr('data-matrixToolbar', true);
                    $toolbar.data('matrixToolbar-blocks', $blocks);
                    
                    $checkbox = $('.matrixToolbar-checkbox:first', $toolbar).data('matrixToolbar', $toolbar);
                    $settings = $('.matrixToolbar-settings:first', $toolbar).data('matrixToolbar', $toolbar);
                    $status = $('.matrixToolbar-status:first', $toolbar).data('matrixToolbar', $toolbar);
                    
                    $toolbar.$checkbox = $checkbox;
                    $toolbar.settings = $settings.menubtn().data('menubtn').menu;
                    $toolbar.status = $status.menubtn().data('menubtn').menu;
                    
                    $toolbar.$checkbox.on('click', $.proxy(self, '_handleCheckboxClick'));
                    $toolbar.$checkbox.on('checkboxchange', $.proxy(self, '_handleCheckboxChange'));
                    $toolbar.settings.on('optionselect', $.proxy(self, '_handleSettingChange'));
                    $toolbar.status.on('optionselect', $.proxy(self, '_handleStatusChange'));
                    
                    $blocks.data('matrixToolbar-toolbar', $toolbar).before($toolbar);
                });
                
                self.initMatrixEvents();
                $matrixToolbar.remove();
            }
        },
        initMatrixEvents: function() {
            Garnish.$doc
                .on('click', '.matrixblock', this._handleSelectedChanged.bind(this))
                .on('click', '.matrix .buttons .btn[data-type]', this._handleBlockAdded.bind(this));
        },
        getFieldContextSelector: function () {
            if (this.isLivePreview) {
                return '.lp-editor';
            }
            return '#main';
        },
        _handleSelectedChanged: function(ev) {
            var $matrix = $(ev.currentTarget).parents('.matrix'),
                $blocks = $('.blocks', $matrix),
                select = $blocks.data('select'),
                container = select.$container,
                $toolbar = container.data('matrixToolbar-toolbar'),
                $checkbox = $toolbar.$checkbox;
            
            $checkbox.removeClass('checked', (select.getTotalSelected() === select.$items.length)).trigger('checkboxchange');
        },
        _handleBlockAdded: function(ev) {
            var $matrix = $(ev.currentTarget).parents('.matrix'),
                $blocks = $('.blocks', $matrix),
                select = $blocks.data('select'),
                container = select.$container,
                $toolbar = container.data('matrixToolbar-toolbar'),
                $checkbox = $toolbar.$checkbox;
            
            $checkbox.removeClass('checked'); //.trigger('checkboxchange');
        },
        _handleCheckboxClick: function(ev) {
            var $checkbox = $(ev.currentTarget),
                $toolbar = $checkbox.data('matrixToolbar'),
                select = $toolbar.data('matrixToolbar-blocks').data('select');
            
            if (select.getTotalSelected() === 0) {
                select.selectAll();
            } else {
                select.deselectAll();
            }
            
            $checkbox.trigger('checkboxchange');
        },
        _handleCheckboxChange: function(ev) {
            var $checkbox = $(ev.currentTarget),
                $toolbar = $checkbox.data('matrixToolbar'),
                $blocks = $toolbar.data('matrixToolbar-blocks'),
                $toggle = $('.matrixToolbar-toggle', $toolbar).add('.matrixToolbar-toggle', $toolbar.settings.$container),
                $untoggle = $('.matrixToolbar-untoggle', $toolbar).add('.matrixToolbar-untoggle', $toolbar.settings.$container),
                select = $toolbar.data('matrixToolbar-blocks').data('select');
            
            $checkbox.toggleClass('checked', (select.$items.length > 0 && select.getTotalSelected() === select.$items.length));
            $toggle.toggleClass('hidden', !(select.getTotalSelected() > 0));
            $untoggle.toggleClass('hidden', (select.getTotalSelected() > 0));
        },
        _handleSettingChange: function(ev) {
            var $toolbar = ev.target.$anchor.data('matrixToolbar'),
                $checkbox = $toolbar.$checkbox,
                $option = $(ev.selectedOption),
                action = $option.data('action');
                $blocks = $toolbar.data('matrixToolbar-blocks'),
                select = $blocks.data('select'),
                $selectedItems = {},
                target = '',
                after = function() {};
            
            if(action == 'collapseAll') {
                select.selectAll();
                target = 'a[role="option"][data-action="collapse"]',
                after = function() { select.deselectAll(); };
            } else if(action == 'expandAll') {
                select.selectAll();
                target = 'a[role="option"][data-action="expand"]',
                after = function() { select.deselectAll(); }
            } else if(action == 'collapse') {
                target = 'a[role="option"][data-action="collapse"]';
            } else if(action == 'expand') {
                target = 'a[role="option"][data-action="expand"]';
            } else if(action == 'delete') {
                target = 'a[role="option"][data-action="delete"]',
                $selectedItems = select.$selectedItems.first();
            }
            
            $selectedItems = ($selectedItems.length)? $selectedItems: select.$selectedItems;
            
            $selectedItems.each(function() {
                var $item = $(this),
                    $actionMenu = $item.data('block').$actionMenu,
                    $action = $(target, $actionMenu);

                $action.trigger('click');
            });
            
            after();
            $checkbox.trigger('checkboxchange');
        },
        _handleStatusChange: function(ev) {
            var $toolbar = ev.target.$anchor.data('matrixToolbar'),
                $checkbox = $toolbar.$checkbox,
                $option = $(ev.selectedOption),
                action = $option.data('action');
                $blocks = $toolbar.data('matrixToolbar-blocks'),
                select = $blocks.data('select'),
                $selectedItems = select.$selectedItems,
                target = '';
            
            if(action == 'enable') {
                target = 'a[role="option"][data-action="enable"]';
            } else if(action == 'disable') {
                target = 'a[role="option"][data-action="disable"]';
            }
            
            $selectedItems.each(function() {
                var $item = $(this),
                    $actionMenu = $item.data('block').$actionMenu,
                    $action = $(target, $actionMenu);

                $action.trigger('click');
            });
            
            $checkbox.trigger('checkboxchange');
        }
    };

} (window));
