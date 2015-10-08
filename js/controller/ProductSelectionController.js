var dependencies = [
    'ProductSelectionModel',
    'ProductFancyboxModel',
    'ProductCalculateModel',
    'ProductRemoveSelectionModel'
];
if (new DependencyCheckerHelper(dependencies).check().getPassed()) {
    ancestor = 'section.product-selection';

    jQuery(function($) {

        var productSelectionModel = new ProductSelectionModel()
            .setAncestor(ancestor);

        var productRemoveSelectionModel = new ProductRemoveSelectionModel()
            .setAncestor(ancestor);

        $('#go-purchases').click(function(e) {
            e.preventDefault();
            productSelectionModel
                .setObject(this)
                .initializePurchases();
        });

        $(ancestor + ' .selection input[type="checkbox"]').change(function(e) {
            productSelectionModel
                .setObject(this)
                .handleSelected()
                .strategy();
        });

        $(ancestor + ' .selected').on('click',
            '.box-product img, .box-product label', function(e) {
                e.preventDefault();
                new ProductFancyboxModel(this)
                    .setAncestor(ancestor)
                    .trigger();
            }
        );

        $('#form-calculate').on('submit', function(e) {
            e.preventDefault();
            new ProductCalculateModel(this)
                .setAncestor(ancestor)
                .setTableSelector('#table-consolidated-data')
                .setBoxSelector('.row .confirmation')
                .setCurrencyType('R$')
                .make();
        });

        $('#calculate-values').on('change', '.selected-removal', function(e) {
            productRemoveSelectionModel
                .setObject(this)
                .handleSelected();
        });

        $('.remove-selected').on('click', function(e) {
            e.preventDefault();
            productRemoveSelectionModel
                .setObject(this)
                .remove();
        });

        $('.select-all').on('click', function(e) {
            e.preventDefault();
            productRemoveSelectionModel
                .setObject(this)
                .selectAll()
                .handleSelected();
        });
    });
}
