function ProductSelectionModel() {

    var $object;
    this.object;
    this.data;
    this.ancestor;
    this.purchaseStated = false;

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

    this.strategy = function() {
        if (this.object.checked)
            this.createBlock();
        else
            this.removeBlock();

        return this;
    }

    this.createBlock = function() {
        var defaultImageExtension = 'jpg';
        var imagePath = './images/products/%image.%ext'
            .replace('%image', this.data['product'])
            .replace('%ext', defaultImageExtension);

        var title = $('<label />', {text: this.data['product']});
        var boxImage = $('<div />', {class: 'image-group'});
        var image = $('<img />', {src: imagePath}).attr('width', '100%');
        var removal = $('<input />', {class: 'selected-removal', type: 'checkbox'});

        var inputPriceName = 'products['+this.data['product']+'][price]';
        var inputQuantityName = 'products['+this.data['product']+'][quantity]';

        var boxInline = $('<div />', {class: 'form-inline'});
        var boxPrice = $('<div />', {class: 'form-group price'});
        var boxPriceGroup = $('<div />', {class: 'input-group'});
        var boxPriceAddon = $('<div />', {class: 'input-group-addon', text: 'R$'});
        var boxPriceValue = $('<div />', {
                class: 'form-control',
                text: $.number(this.data['price'], 2, ',', '.')
            });
        var boxPriceHiddenInput = $('<input />', {
                type: 'hidden',
                name: inputPriceName,
                value: this.data['price']
            });
        var boxQuantity = $('<div />', {class: 'form-group quantity'});
        var boxQuantityGroup = boxPriceGroup.clone();
        var boxQuantityAddon = boxPriceAddon.clone().html('Qtd.');
        var boxQuantityInput = $('<input />', {
                class: 'form-control',
                type: 'number',
                value: 1,
                min: 0,
                name: inputQuantityName
            });
        boxImage
            .append(image)
            .append(removal);
        boxPrice.append(
            boxPriceGroup
                .append(boxPriceHiddenInput)
                .append(boxPriceAddon)
                .append(boxPriceValue)
        );
        boxQuantity.append(
            boxQuantityGroup
                .append(boxQuantityAddon)
                .append(boxQuantityInput)
        );
        boxInline
            .append(boxPrice)
            .append(boxQuantity);

        var block = $('<div />', {class: 'col-md-6 col-sm-6 box-product'})
            .attr('data-product', this.data['product'])
            .attr('data-price', this.data['price'])
            .append(title)
            .append(boxImage)
            .append(boxInline);

        $(this.ancestor + ' .row .selected .row').append(block);
        return this;
    }

    this.removeBlock = function() {
        var target = 'div[data-product="%product"]'
            .replace('%product', this.data['product']);

        var selector = '%ancestor .row .selected .row %target'
            .replace('%ancestor', this.ancestor)
            .replace('%target', target);

        $(selector).remove();
        return this;
    }

    this.handleSelected = function() {
        var selected = $(this.ancestor + ' .selection input[type="checkbox"]:checked');
        var count = selected.length;

        var box = $(this.ancestor + ' .row .selected');
        if (count != 0)
            box.fadeIn(500);
        else
            this.hideBoxes();

        return this;
    }

    this.hideBoxes = function() {
        $(this.ancestor + ' .row .selected').fadeOut(500);
        $(this.ancestor + ' .row .confirmation').fadeOut(500);
        return this;
    }

    this.cleanChecked = function(boxesProduct) {
        var self = this;
        $.each(boxesProduct, function(i, boxProduct) {
            var boxProduct =  $(boxProduct);
            self.getSelectionCheckbox(boxProduct.data('product'))
                .removeAttr('checked');;
        });
        return this;
    }

    this.getSelectionCheckbox = function(productName) {
        var selector = ' .row .selection input[data-product="'+productName+'"]';
        return $(this.ancestor + selector);
    }

    this.initializePurchases = function() {
        if (this.purchaseStated === false) {
            this.start();

        } else {
            this.stop();
        }

    }

    this.start = function() {
        this.purchaseStated = true;
        $('.rotate').fadeOut(1500, this.showMainContainer);
        $object.html('Encerrar compras');
        return this;
    }

    this.stop = function() {
        this.purchaseStated = false;
        $('article.main.container').slideUp(500, this.showRotate);
        $object.html('#Partiu compras!');
        return this;
    }

    this.showRotate = function() {
        var sleep = setTimeout(function() {
            $('.rotate').fadeIn(1500);
            clearTimeout(sleep);
        }, 1000);
        return this;
    }

    this.showMainContainer = function() {
        var sleep = setTimeout(function() {
            $('article.main.container').slideDown(500);
            clearTimeout(sleep);
        }, 1000);
        return this;
    }
}
