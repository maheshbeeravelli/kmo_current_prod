$(document).ready(function(){  
//Functions 
  $("a[data-key]").click(function() {
    key=$(this).attr("data-key");
    var title=$(this).parent().siblings(".item-title").text();
    $("#modal-title").text(title);
    var link = $(this).attr("data-link");
    $("#coupon-code").text($(this).attr("data-code"));
    $('#offer_modal').modal();
    $.ajax("/offer",{
            type: 'GET',
            data: {key:key},
            success: function(data,status){
            window.setTimeout(function(){
            },3000);
            window.open(link, '_blank');
    //        coupon = (data.coupon_code=="") ?  "NO CODE": data.coupon_code;
            },
             async: false
        });
     
   });
   $(".adc label").click(function(){
     if($(this).text().indexOf("All")>0)
     {
       $(".item").show();
     }
     else if ($(this).text().indexOf("Deal")>0){
       $(".item").hide();
       $('.item[data-offer-type="Deal"]').show();
     }
     else if ($(this).text().indexOf("Coupon")>0){
       $(".item").hide();
       $('.item[data-offer-type="Coupon"]').show();
     }
    });

//DataManipulaters
  $("#all_count").text($(".item").length);
  $("#deals_count").text($('.item[data-offer-type="Deal"]').length);
  $("#coupons_count").text($('.item[data-offer-type="Coupon"]').length);
  var url = document.URL;
  if(url.indexOf("order") > -1)
  {
    $(".custom_nav li").removeClass("active");
    $(".custom_nav li:nth-child(2)").addClass("active");
  }
  $(".posted_on" ).each(function( index ) {
      // console.log( index + ": " + $( this ).text() );
      var date=$(this).text().substring(0,10);
      var posted_split = date.split("-");
      var posted_date =new Date(posted_split[0],posted_split[1]-1,posted_split[2]);
      var today=new Date();
      var timeDiff = Math.abs(today.getTime() - posted_date.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      diffDays--;
      if(diffDays>30)
      {
        if(diffDays<360){
          var months = Math.ceil(diffDays/30)-1;
        var text=" months ago";
        if(months==1)
        {
          text= " month ago";
        }
        $( this ).text(months + text);
        }
      }
      else if(diffDays>6)
      {
        weeks =diffDays/7;
        if(weeks<2){
          $( this ).text("1 week ago");
        }
        else{
          week=Math.ceil(weeks)-1;
          $( this ).text(week + " weeks ago");
        }
      }
      else if(diffDays>1)
      {
        $( this ).text(diffDays+ " days ago");
      }
      else if (diffDays==1){
        $( this ).text("Yesterday");
      }
      else{
        $( this ).text("Today");
      }
  });
  
  $( ".expires-on" ).each(function( index ) {
      var date=$.trim($(this).text());
      var expiry_split = date.split("-");
      var expiry_date =new Date(expiry_split[0],expiry_split[1]-1,expiry_split[2]);
      var today=new Date();
      var timeDiff = Math.abs(today.getTime() - expiry_date.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      diffDays;
      if(date=="1991-11-01")
      {
        $( this ).text("No Expiry Date");
      }
      else if(diffDays==7)
      {
        $( this ).text("1 week left");
      }
      else if (diffDays==1){
        $( this ).text("1 day left");
      }
      else if(diffDays==0){
        $(this).text("Today Day");
      }
      else if(diffDays<0)
      {
        $(this).text("Expired");
      }
      else{
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][expiry_date.getMonth()];
        $(this).text(month+" "+expiry_date.getDate()+","+expiry_date.getFullYear())
      }
  });
  $(".contactus").click(function(){
      $("#contactus_modal").modal();
  });
  $("#mobile-search").focus(function(){
    $("#mobile-nav li").hide();
  });
  
  $("#mobile-search").blur(function(){
    $("#mobile-nav li").show();
  });
  
  $("#contactus_send").click(function(){
    $(this).addClass("btn-primary");
    $(this).text("Sending..");
    data = {contact_us:$("#contactus_name").val(), contactus_email:$("#contactus_email").val(),contactus_desc:$("#contactus_desc").val()};
    $.post( "/contactus", data).done(function( data ) {
      $("#contactus_send").removeClass("btn-primary");
      $("#contactus_send").addClass("btn-success");
      $("#contactus_send").text("Successfully Submited");
      window.setTimeout(function(){
        $("#contactus_send").removeClass("btn-success");
        $("#contactus_send").addClass("btn-default");
        $("#contactus_modal").modal('hide');
        $("#contactus_send").text("Send");
      },3000);
    });
  });// End of Contactus_send
  });

$(window).scroll(function(){
        if  ($(window).scrollTop() == $(document).height() - $(window).height()){
          if($(".item"))
          {
            // alert("Reache the bottom of the doc");
          }
        }
});