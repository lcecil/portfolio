(function () {

  var ViewModel = {
      extend: function (props) {
        var vm = function () {
          this.el = null; // root element, $
          this.template = null; // underscore template
          this.init.apply(this, arguments);
        };

        vm.prototype.init = function (data) {
          throw new Error('init not implemented');
        };

        vm.prototype.render = function () {
          throw new Error('render not implemented');
        };

        // extend view model
        for (var p in props) {
          vm.prototype[p] = props[p];
        }

        return vm;
      }
    };

  window.ViewModel = ViewModel;

})();
