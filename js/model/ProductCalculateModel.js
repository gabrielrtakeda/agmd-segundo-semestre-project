/**
 * Classe responsável por cuidar do cálculo dos produtos selecionados para
 * compra. Adicionando-os assim, na tabela de de cálculo no box de confirmação.
 *
 *
 */

function ProductCalculateModel(object) {

    var $object = $(object);
    var $table;
    var $box = $object.closest('.confirmation');
    this.object = object;
    this.ancestor;
    this.currencyType;

    this.setAncestor = function(ancestor) {
        this.ancestor = ancestor;
        return this;
    }

    this.setTableSelector = function(tableSelector) {
        $table = $(tableSelector);
        return this;
    }

    this.setBoxSelector = function(boxSelector) {
        $box = $(this.ancestor + ' ' + boxSelector);
        return this;
    }

    this.setCurrencyType = function(currencyType) {
        this.currencyType = currencyType;
        return this;
    }

    this.make = function() {
        var data = this.prepareData($object.serializeObject());
        this.clearTable()
            .distributeRows(data)
            .makeTableFooterRow(data.total)
            .show();
        return this;
    }

    this.clearTable = function() {
        $table.find('tbody *').remove();
        $table.find('tfoot *').remove();
        return this;
    }

    this.prepareData = function(data) {
        data['total'] = 0;
        $.each(data.products, function(productName, productData) {
            var quantity = productData.quantity > 0 ? productData.quantity : 0;
            var subtotal = (productData.price * quantity);
            data.products[productName].quantity = quantity;
            data.products[productName]['subtotal'] = subtotal;
            data['total'] += subtotal;
        });
        return data;
    }

    this.distributeRows = function(data) {
        var self = this;

        $.each(data.products, function(productName, productData) {
            productData['name'] = productName;
            var row = self.prepareTableRow(productData);
            $table.find('tbody').append(row);
        });
        return this;
    }

    this.prepareTableRow = function(rowData) {
        var name = $('<td />', {text: rowData.name});
        var price = $('<td />', {text: this.makeCurrency(rowData.price)});
        var quantity = $('<td />', {text: rowData.quantity});
        var subtotal = $('<td />', {text: this.makeCurrency(rowData.subtotal)});

        return $('<tr />')
            .append(name)
            .append(price)
            .append(quantity)
            .append(subtotal);
    }

    this.makeTableFooterRow = function(totalPrice) {
        var label = $('<td />', {
                class: 'text-right',
                text: 'Total',
                colspan: 3
            });
        var total = $('<td />', {
                text: this.makeCurrency(totalPrice, 2)
            });

        $table.find('tfoot').append(
            $('<tr />')
                .append(label)
                .append(total)
        );
        return this;
    }

    this.show = function() {
        $box.fadeIn(500);
        return this;
    }

    this.makeCurrency = function(value) {
        return this.currencyType + ' ' + $.number(value, 2, ',', '.');
    }
}
