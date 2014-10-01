(function($) {
    "use strict";

    //var tipPercent = 15.0;
    var tipPercents = new Array(10.0,15.0,20.0);
    var _billAmt = 0.0;

    var calcTip = function() {
        _billAmt = Number($('#billAmount').val());
        //Remove rows from result table
        $('#resultTable tr').not(function () { if ($(this).has('th').length) { return true } }).remove();
        //Calc for each percent in array
        tipPercents.forEach(calcTip2);

    };

    var calcTip2 = function(element, index, array) {
        //console.log('a[' + index + '] = ' + element);
        var tipPercent = element;
        var billAmt = _billAmt; Number($('#billAmount').val());
        var tipAmt = billAmt * tipPercent / 100;
        var totalAmt = billAmt + tipAmt;
        //Add row to table
        $('#resultTable > tbody:last').append('<tr><td>' + tipPercent.toFixed(0) + '%</td><td>$' + tipAmt.formatMoney(2) + '</td><td>$' + totalAmt.formatMoney(2) + '</td></tr>');
    }

    var saveSettings = function() {
        var val = $('#tipPercentages').val();

        //alert('Save packed:' + val);
        //Unpack into array
        tipPercents = UnPackPercentages(val);
        var packedVals = PackPercentages(tipPercents);
        localStorage.setItem('tipPercentage', packedVals);
        //Put back on screen
        $('#tipPercentages').val(packedVals)
        window.history.back();
    };

    var UnPackPercentages = function (packedVal) {
        //debugger;
        var ret = new Array();
        var vals = new Array();
        var index;
        vals = packedVal.split(',');
        if (vals) {
            for (index in vals) {
                try
                {
                    var fltVal = parseFloat(vals[index]);
                }
                catch (err) {
                    //ignore badly formatted entries
                }
                if (fltVal) {
                        ret.push(fltVal);
                    }
            }
        }
        return (ret);
    };

    var PackPercentages = function (val) {
        return (val.join(','));
    };

    var onMenuKeyDown = function ()
    {
        // Handle the back button
        $.mobile.pageContainer.pagecontainer("change", "#settingsPage");
    }

    $( document ).on( "ready", function(){
        $('#calcTip').on('click', calcTip);
        $('#saveSettings').on('click', saveSettings);

        var tipPercentSetting = localStorage.getItem('tipPercentage');
        if (tipPercentSetting) {
            tipPercents = UnPackPercentages(tipPercentSetting);
        }
        $('#tipPercentages').val(PackPercentages(tipPercents));

        //Add event handlers
        document.addEventListener("menubutton", onMenuKeyDown, false);
    });



    $( document ).on( "deviceready", function(){
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByName("gray");
    });
}
)(jQuery);

