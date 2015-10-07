function ProductRemoveSelectionModel() {

    var $object;
    this.object;
    this.data;
    this.ancestor;
    this.selectedAll = false;

    this.setObject = function(object) {
        this.object = object;
        $object = $(object);
        this.data = $object.data()
        return this;
    }

    this.setAncestor = function(ancestor) {
        this.ancestor = ancestor;
        return this;
    }

    this.handleSelected = function() {
        var selected = $(this.ancestor + ' .selected .selected-removal:checked');
        if (selected.length != 0)
            this.enableRemoveProductsControl(true);
        else
            this.enableRemoveProductsControl(false);

        return this;
    }

    this.remove = function() {
        var selected = $(this.ancestor + ' .selected .selected-removal:checked');
        this.removeBehaviour(selected);
        return this;
    }

    this.removeBehaviour = function(selected) {
        var boxesProduct = selected.closest('.box-product');

        var productSelectionModel = new ProductSelectionModel()
        productSelectionModel
            .setAncestor(this.ancestor)
            .cleanChecked(boxesProduct);

        boxesProduct.remove();

        var boxProduct = $(this.ancestor + ' .selected .box-product');
        if (boxProduct.length === 0) {
            productSelectionModel.hideBoxes();
            this.resetControls();
        }
        return this;
    }

    this.selectAll = function() {
        if (this.selectedAll === false) {
            this.selectedAll = true;
            this.changeSelectAllControlText('Desmarcar todos');
            $(this.ancestor + ' .selected .selected-removal')
                .prop('checked', true);

        } else {
            this.selectedAll = false;
            this.changeSelectAllControlText('Marcar todos');
            $(this.ancestor + ' .selected .selected-removal')
                .prop('checked', false);
        }
        return this;
    }

    this.changeSelectAllControlText = function(text) {
        $(this.ancestor + ' .row .selected .select-all').text(text);
        return this;
    }

    this.enableRemoveProductsControl = function(enable) {
        var button = $(this.ancestor + ' .remove-selected');
        if (enable === true)
            button.prop('disabled', false);
        else
            button.prop('disabled', true);
    }

    this.resetControls = function() {
        this.selectedAll = false;
        this.changeSelectAllControlText('Marcar todos');
        this.enableRemoveProductsControl(false);
        return this;
    }
}
