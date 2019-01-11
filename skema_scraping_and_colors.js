var fagListObj={size:0};

chrome.storage.sync.get(['keyFagListObj'], function(result) {

    if(result.keyFagListObj){
        fagListObj = result.keyFagListObj;
    }
    
    
    $('div').each(function(){
        if($(this).hasClass("s2skemabrikcontent")){        
    	
    	   $(this).children("span").each(function(index){
        	
        	   if(index === 0 && $(this).attr("data-lectiocontextcard")){
        					
                            var fag = $(this).text();
        	                fag = fag.replace(/ /g,"_");
                   
        		        	if(!fagListObj[fag]){
        		        		//DER ER ET NYT FAG
                                var i = fagListObj["size"];
                                var r = (90+i%5*40);
                                var g = (130+i%3*60);
                                var b = (150+i%2*100);
                                var color           = "rgb("+r+","+g+","+b+")";
        		        		fagListObj[fag]     = color;
                                fagListObj["size"]  = fagListObj["size"]+1;
                                console.log(fagListObj);
        		        	}
                            
                            $( this ).parent().parent().css("background-color", fagListObj[fag]);
                            $( this ).parent().parent().css("background-image", "none");
                            $( this ).parent().css("background-color", fagListObj[fag]);
  							$( this ).parent().css("color", "black");
        	   }
        	
    	   });
        }
    });
    
    chrome.storage.sync.set({keyFagListObj: fagListObj});   
    
});