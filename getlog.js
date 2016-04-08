var key;

getAuthKey(function(authkey) {
    key = authkey;
});

function getlogs() {
    $(function() {
        $.get(
            "/log",
            function(log) {
                $("#log").val(log.split("\n").slice(-500).join("\n"));
                var textarea = document.getElementById('log');
                textarea.scrollTop = textarea.scrollHeight;
            });
        $.get(
            "/serverup",
            function(bol) {
                if (bol == "no") {
                    $('#stop').hide();
                    $('#start').show();
                }
            });
    });
}
setInterval(getlogs, 1000);

$(document).ready(function() {
    var $form = $('form');
    $form.submit(function() {
        var command = $("#command").val();
        console.log(command);
        $.post($(this).attr('action'), {
            command: command,
            key: key
        }, function(response) {}, 'json');
        $('#command').val('');
        return false;
    });
});