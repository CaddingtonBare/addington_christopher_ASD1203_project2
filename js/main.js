// Name: Christopher Addington
// Date: 27 February, 2012
// Assignment: Project 1
// ASD Term 0312

$(function(){
    
    var tmform = $('#teamform');
    
    tmform.validate({
        invalidHandler: function(form, validator){},
        submitHandler: function(){
            var data = tmform.serializeArray();
            parseTeamForm(data);
            pushJson(data);
            console.log(json);
        }
    });

    var toggleControls = function(n){
        var displayNone = { 'display': 'none' };
        var displayInline = { 'display': 'inline' };
        var displayBlock = { 'display': 'block' };
        
        switch(n){
            case "on":
                $('#teamForm').css(displayNone)
                $('#clearData').css(displayInline)
                $('#displayData').css(displayNone)
                $('#addNew').css(displayInline)
                break;
            case "off":
                $('#teamForm').css(displayBlock)
                $('#clearData').css(displayInline)
                $('#displayData').css(displayInline)
                $('#addNew').css(displayNone)
                $('#items').css(displayNone)
                break;
            default:
                return false;
        }
    }
    var saveLocal = function(key) {
        if(!key){
           var id                  = Math.floor(Math.random()*42000000); 
        }else{
            id = key;
        }
        var item                = {};
            item.sports         = ["Sport: ", $('#selectsport').val()];
            item.teamname       = ["Name: ", $('#teamname').val()];
            item.teamsize       = ["Team Size: ", $('#teamsize').val()];
            item.availabletime  = ["Only evening games: ", $('#availabletime').val()];
            item.nextdate       = ["Next available date: ", $('#nextdate').val()];
            item.notes          = ["Notes: ", $('#notes').val()];
        //Save data into Local Storage: Use Stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Team saved!");
    }
    var getData = function(){
        toggleControls("on");
        if(localStorage.length === 0){
            autoFillData();
            alert("There is no data in storage so default data was added.");
        }
        $('body')
            .append($('<div id="items"></div>'))
        ;
        $('<ul id="itemsUl"></ul>')
            .appendTo('#items')
        ;
        $('#items').css({
            'display': 'block'
        });
        for(i = 0, j = localStorage.length; i < j; i++){
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            $('#itemsUl')
                .append('<li></li>')
            ;
            $('#itemsUl li:last')
                .append('<ul></ul>')
            getImage(obj.sports[1]);
            for (var n in obj){
                var optSubText = obj[n][0] + " " + obj[n][1];
                var subLi = $('#subLi');
                $('#itemsUl li:last ul:last')
                    .append('<li id="subLi"></li>')
                    .append('<li id="linksLi"></li>')
                ;
                subLi
                    .html(optSubText)
                ;        
            }            
            makeItemLinks(key); //Create edit/delete links for each item.
        }    
    }
    
    //Function to get a unique image for each sport.
    function getImage(catName){
        $('#itemsUl li:last ul:last')
            .append('<li><img src="images/" + catName + ".png"')
        ;        
    }
    
    //JSON OBJECT to autofill default localStorage data.
    function autoFillData(){
        //Store JSON to localStorage
        for (var n in JSON){
            var id = Math.floor(Math.random()*42000000);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    autoFillData();
    
    //makeItemLinks function
    //Incorporates edit/delete links for local storage on display.
    var makeItemLinks = function (key){
        var linksLi =   $('#itemsUl li:last ul:last li:last');
            linksLi.key = key;
        linksLi
            .append('<a id="editLink" href="#">Edit Team</a>')
            .append('<br>')
            .append('<a id="deleteLink" href="#">Delete Team</a>')
        ;
        $('#editLink').on("click", editItem);
        $('#deleteLink').on("click", deleteItem);
    }
    
    var editItem = function(){
        //Retrieve data from specified team.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //Display form
        toggleControls("off");
        
        //Populate form with local storage.
        $('#selectsport').val(item.sports[1]);
        $('#teamname').val(item.teamname[1]);
        $('#teamsize').val(item.teamsize[1]);
        $('#availabletime').val(item.availabletime[1]);
        $('#nextdate').val(item.nextdate[1]);
        $('#notes').val(item.notes[1]);
        
        //Remove listener from Add Team submission.
        $('#submit').unbind();
        //Change Add Team value to Edit Team
        $('#submit').replaceWith('<input type="submit" id="submit" value="Edit" data-icon="check" data-iconpos="left" data-iconshadow="true" data-shadow="true" data-theme="e" />');
        $('#submit').on("click", validate);
        $('#submit').key = this.key;
    }
    
    var deleteItem = function(){
        var ask = confirm("Are you sure you want to delete this team?");
        if (ask == true){
            localStorage.removeItem(this.key);
            alert("The team was deleted.");
            window.location.reload();
        }else{
            alert("Team was not deleted.");
        }
    }
    
    var clearLocal = function(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
            window.location.reload();
        }else{
            localStorage.clear();
            alert("All teams have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    var validate = function(e){
        //Define elements to validate
        var getSport = $('#selectsport');
        var getTeamName = $('#teamname');
        var getNextDate = $('#nextdate');
        
        //Reset error messages
        errMsg.html("");
        getSport.css({
            'border': '1px solid black'
        });
        getTeamName.css({
            'border': '1px solid black'
        });

        //Get error messages
        var messageAry = [];
        //Group validation
        if (getSport.val() == ""){
            var sportError = "Please choose a sport.";
            getSport.css({
                'border': '1px solid red'
            });
            messageAry.push(sportError);
        }
        //Team Name validation
        if (getTeamName.val() == ""){
            var teamNameError = "Please enter a team name."
            getTeamName.css({
                'border': '1px solid red'
            });
            messageAry.push(teamNameError);
        }
        //Next Date validation
        if (getNextDate.val() == ""){
            var nextDateError = "Please enter a date."
            getNextDate.css({
                'border': '1px solid red'
            });
            messageAry.push(nextDateError);
        }
        
        //Display errors
        if (messageAry.length >= 1){
            for( var i=0, j=messageAry.length; i<j; i++){
                $('#errors')
                    .append('<li></li>')
                ;
                $('#errors li:last')
                    .html(messageAry[i]);
            }
        return false;
        }else{
            saveLocal(this.key);
        }
    }
    
    //Retrieve JSON data
    var addJSON = function(){
        $.ajax({
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                
            },
            error: function(result){
                alert(result);
            }
        });
    }
    
    
    var errMsg = $('#errors');
    //Link/Submit Click events
    $('#displayData').on("click", getData);
    $('#clearData').on("click", clearLocal);
    $('#submit').on("click", validate);
});