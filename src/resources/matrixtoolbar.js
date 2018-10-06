(function (window) {

    if (!window.Craft || !window.jQuery) {
        return false;
    }

    Craft.MatrixToolbarPlugin = {
        settings: {
        },
        init: function (data) {
            this.data = data;
            console.log(data);

            this.render();
        },
        render: function () {
            var self = this,
                targets = [$(this.getFieldContextSelector())];

            if (this.elementEditors && Object.keys(this.elementEditors).length) {
                for (var key in this.elementEditors) {
                    targets.push(this.elementEditors[key].$form);
                }
            }

            $.each(targets, function($t, $target) {
                var $matrixFields = $('.field[data-type$="Matrix"]:not([data-matrixToolbar])', $target),
                    $matrixToolbar = $('.matrixToolbar:first'),
                    fieldData,
                    $toolbar,
                    $settings,
                    $status;

                $matrixFields.each(function () {
                    var $field = $(this);
                    $field.attr('data-matrixToolbar', true);

                    fieldData  = {
                        id: $field.attr('id')
                    };

                    $toolbar = $matrixToolbar.clone(true);
                    $settings = $('.matrixToolbar-settings', $toolbar);
                    $status = $('.matrixToolbar-status', $toolbar);

                    $toolbar.settings = $settings.menubtn().menu;
                    $toolbar.status = $status.menubtn().menu;

                    //$toolbar.settings.on('optionselect', $.proxy(this, '_handleSettingChange'));
                    //$toolbar.status.on('optionselect', $.proxy(this, '_handleStatusChange'));

                    $('.input:first .matrix', $field).before($toolbar);
                });

                $matrixToolbar.remove();
            });
        },
        _handleSettingChange: function() {
            console.log('setting change');
        },
        _handleStatusChange: function() {
            console.log('status change');
        },
        getFieldContextSelector: function () {
            if (this.isLivePreview) {
                return '.lp-editor';
            }
            return '#main';
        },
    };

} (window));
