function ProductFancyboxModel(object) {

    var $object = $(object);
    var $boxProduct = $object.closest('.box-product');
    this.object = object;
    this.data = $object.closest('.box-product').data();
    this.ancestor;

    this.setAncestor = function(ancestor) {
        this.ancestor = ancestor;
        return this;
    };

    this.trigger = function() {
        var self = this;

        $.ajax({
            url: ROOT_PATH+'/templates/partials/product-description-fancybox.html',
            method: 'GET',
            dataType: 'html',
            success: function(template) {
                self.getProductsJSON(template);
            },
            error: this.error
        });
    };

    this.getProductsJSON = function(template) {
        var self = this;

        $.getJSON(ROOT_PATH+'/raw/product-description.json', function(json) {
            self.data['description'] = json[self.data['product']].description;
            $.fancybox(self.replaceVars(template, self.data), {
                fitToView: true
            });
        })
        .error(this.error)
        .fail(this.fail);
    };

    this.error = function(jqxhr, status, error) {
        console.error(
            'Error: %status, %error'
                .replace('%status', status)
                .replace('%error', error)
        );
    };

    this.fail = function(jqxhr, status, error) {
        console.error(
            'Request Failed: %status, %error'
                .replace('%status', status)
                .replace('%error', error)
        );
    };

    this.replaceVars = function(template, data) {
        return template
            .replace(new RegExp('{{product}}', 'g'), data['product'])
            .replace(new RegExp('{{extension}}', 'g'), 'jpg')
            .replace(new RegExp('{{price}}', 'g'), data['price'])
            .replace(new RegExp('{{description}}', 'g'), data['description'])
            .replace(new RegExp('{{quantity}}', 'g'),
                $boxProduct.find('.quantity input').val()
            );
    }
}
