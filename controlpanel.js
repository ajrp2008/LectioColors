var fagListObj={size:0};

chrome.storage.sync.get(['keyFagListObj'], function(result) {

    if(result.keyFagListObj){
        fagListObj = result.keyFagListObj;
    }
    
        let i = 1;
        for(prop in fagListObj){
            if(prop != "size"){
                var p = "<p id='p"+i+"' style='width:200px; padding : 0; margin : 0;' hidden></p>";
                var ind= "<input type='text' value='color' id='in"+i+"' hidden>";
                var ch= "<input type='checkbox'>";
                $(document.body).append(p +ind+ch);

                
                let inputElement = document.getElementById('in'+i); 
                inputElement.value = fagListObj[prop];
                inputElement.removeAttribute("hidden");
                inputElement.border = fagListObj[prop];
                $("#in"+i).css("border", "10px solid "+fagListObj[prop]);
                $("#in"+i).css("width", "180px");
                
                let pElement = document.getElementById('p'+i);
                pElement.innerHTML = prop;
                pElement.style.backgroundColor = fagListObj[prop];
                pElement.removeAttribute("hidden");

                let j = i;
                let thisProp = prop;

                $("#in" + j).keyup(function(event) {
                    if (event.keyCode === 13) {
                        fagListObj[thisProp] = $(this).val();
                        $("#in"+j).css("border", "10px solid "+fagListObj[thisProp]);
                        pElement.style.backgroundColor = fagListObj[thisProp];
                        chrome.storage.sync.set({keyFagListObj: fagListObj}, function() {
                            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.executeScript(tabs[0].id, {file: 'skema_scraping_and_colors.js'});
                        });});
                    }
                });

                i++;
            }
        }
});