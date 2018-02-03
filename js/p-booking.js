$( function() {


    var pageNav = generateMenu(document.querySelector('.page-header__nav'));
    if (pageNav) {
      pageNav.init();
      pageNav.fixTop();
    }

  var dateFormat = "dd/mm/yy",
    from = $( "#fromDate" )
      .datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
      }),
    to = $( "#toDate" ).datepicker({
      dateFormat: "dd/mm/yy",
      minDate: "+1D",
      changeMonth: true,
      numberOfMonths: 1
    })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
} );