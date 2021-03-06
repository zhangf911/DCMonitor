var zkHosts = new Array();
$(document).ready(function() {
    addActive($('#zk_nav'));

    $.get('/zk/hosts', function(data) {
        buildRotatTable(data, $('#zk_table'));
        buildZkHosts(data);
        zkCmd();
    });



    $('#zk_cmd').change(function(){
        zkCmd();
    });


    function buildZkHosts(data){
        for(var i in data){
            for(var j in data[i]){
                if(j == "host"){
                    zkHosts = zkHosts.concat(data[i][j]);
                      $('#zk_select').append("<option>" + data[i][j] + "</option>")
                }
            }
        }
    }

    function zkCmd(){
        $.post('/zk/cmd', { 'host' : $('#zk_select').val(), 'cmd' : $('#zk_cmd').val().trim() }, function(data){
            if(! data){
                data = "No msg output";
            }
            $('#zk_res').val(data);
        });
    }

});