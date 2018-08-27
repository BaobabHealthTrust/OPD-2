
function recordNotification(notification_name, notification) {
                                                                            
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari  
    xmlhttp=new XMLHttpRequest();                                             
  }else{// code for IE6, IE5                                                  
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");                           
  }                                                                           
  xmlhttp.onreadystatechange=function() {                                     
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {                       
      var results = xmlhttp.responseText;                                     
      if(results == 'undefined' || results == '' || results == '"not validate"') {                           
        //log error;                                                               
      }else{                                                                  
        return;
      }                                                                       
    }                                                                         
  }                                                                           
  
  var notification_url = "/notification_tracker/track?notification_name=";
  notification_url += notification_name;
  notification_url += "&response_text=" + notification;
  xmlhttp.open("GET", notification_url, true);           
  xmlhttp.send();

}
