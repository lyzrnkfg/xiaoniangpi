// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require bootstrap-datepicker
//= require iziToast.min
//= require message_alert
//= require blob.js
//= require FileSaver.min.js
//= require tableexport.min.js
//= require xlsx.core.min.js
//= require turbolinks
//= require_tree .

$(document).on('ready page:load', function() {

    $('.datepicker').datepicker({
        'format': 'yyyy/mm/dd',
        'language': 'ja',
        'minDate': 'today',
        'autoclose': true
    });

    $('.clearButton').click(function(e) {
        $('input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $('select').find('option:first').prop('selected', 'selected');
    });

    $("input[data-loading-text]").click(function() {
        $(this).button('loading');
    });

});


function ajaxRequest(param) {
    if (param.before) {
        param.before();
    }
    return $.ajax({
        cache: param.cache ? param.cache : true,
        async: param.async ? param.async : true,
        type: param.type ? param.type : 'GET',
        url: param.url,
        data: param.data ? param.data : '',
        dataType: param.dataType ? param.dataType : 'html'
    }).done(function(data, status, xhr) {
        if (param.done) {
            return param.done(data, status, xhr);
        }
    }).fail(function(xhr, error, status) {
        if (xhr.status === 422 && param.invalidRecord) {
            return param.invalidRecord(xhr.responseText, status, xhr);
        } else {
            if (param.fail) {
                return param.fail(xhr, error, status);
            }
        }
    }).always(function(data, status, xhr) {
        if (param.always) {
            return param.always(data, status, xhr);
        }
    });
};

this.ajaxFormSubmit = function(param) {
    return param.form.submit(function(event) {
        var dataType, type, url;
        event.preventDefault();
        url = param.form.attr('action');
        if (param.url) {
            url = param.url;
        }
        dataType = 'html';
        if (param.dataType) {
            dataType = param.dataType;
        }
        type = param.form.attr('method');
        if (param.type) {
            type = param.type;
        }
        return ajaxRequest({
            cache: true,
            async: true,
            type: type,
            url: url,
            data: param.form.serialize(),
            dataType: dataType,
            before: param.before,
            done: param.done,
            fail: param.fail,
            invalidRecord: param.invalidRecord,
            always: param.always
        });
    });
};

