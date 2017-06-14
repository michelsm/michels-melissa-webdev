(function() {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable($routeParams, $http) {
        function sortWidget(scope, element) {

            var start, end;
            var pageId = $routeParams['pageId'];

            //$(element).sortable({
              //  axis: "y",
               // update: function(event, ui) {
                //    end = ui.item.index();
                  //  $http.put('/api/assignment/page/'+pageId+'/widget?initial='+start+"&final="+end)
                    //    .then(function(response) {
                      //      return response.data;
                        //});

                //},
                //start: function(event, ui) {
                  //  start = ui.item.index();
               // }
           // });
        }

        return {
            link: sortWidget
        };
    }

})();