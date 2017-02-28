(function () {

  var ViewModel = {
    extend: function (props) {
      var vm = function (data) {
        this.el = null; // root element, $
        this.template = 'WARNING - no template provided';

        // TODO - extend is returning proper object.... Working HERE

        this.init = function (data) {
          throw new Error('init not implemented');
        };

        this.render = function () {
          throw new Error('render not implemented');
        };
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
