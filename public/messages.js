var xhr = new XMLHttpRequest();

var last_update = "";
window.onload = update_area;
setInterval(update_area, 1000);

var sitdown_callback = function(){
   if( xhr.readyState == 4 ){
        if(xhr.status == 200){
            console.log(xhr.responseXML);
        }
        else{
            alert(xhr.statusText);
        }
    }
}

function update_area(){
    
    xhr.onreadystatechange = update_callback;
    
    xhr.open("GET", "/seats.xml?"+new Date());
    xhr.send(null);
    
    return false;
}

var update_callback = function(){
    if( xhr.readyState == 4 ){
        if(xhr.status == 200){
            parse_xml(xhr.responseXML);
        }
        else{
            alert(xhr.statusText);
        }
    }
}

var parse_xml = function(seats_xml){
    
    if(seats_xml == null){
        return;
    }
    var i = 0,
        j = -1,
        seats = seats_xml.firstChild.getElementsByTagName("seat"),
        len = seats.length,
        seat,
        updated,
        who;
        
        
        
    for(; i< len; i=i+1){
        seat = seats[i];
        
        if( i % 8 == 0 ){
            j = j + 1;
        }
        
        updated = seat.getElementsByTagName("updated-at")[0].firstChild.nodeValue;
        who = seat.getElementsByTagName("who")[0].firstChild;
        //if( updated > last_update ){
         
            if( who == null){
               who = "";
            }
            else{
              who = who.nodeValue; 
            }
            
        //}
        update_dom(i % 8, j, who);
    }
    
    last_update = updated;
}

var update_dom = function(i, j, who){
   var a = 0,
       b = 0,
       offset_a = 3,
       offset_b = 4,
       seating_area = document.getElementById("seating_area"),
       seat_table = seating_area.lastChild,
       text_node,
       td;
       
   for(; a < 4; a = a + 1){
      
      for(; b < 8; b = b + 1){
         
         if(b == i && a == j){

            if(seat_table.childNodes[a*offset_a].childNodes[b*offset_b].firstChild == null){
               td = document.createElement("td");
               seat_table.childNodes[a*offset_a].childNodes[b*offset_b].appendChild(td);
               text_node = document.createTextNode(who);
               seat_table.childNodes[a*offset_a].childNodes[b*offset_b].firstChild.appendChild(text_node);
            }
            else{
               seat_table.childNodes[a*offset_a].childNodes[b*offset_b].removeChild(seat_table.childNodes[a*offset_a].childNodes[b*offset_b].firstChild);
               text_node = document.createTextNode(who);
               seat_table.childNodes[a*offset_a].childNodes[b*offset_b].appendChild(text_node);
            }
         }
      }
      b = 0;
   }
}