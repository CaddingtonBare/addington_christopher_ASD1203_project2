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
            alert("There is no data in storage.  Please add a team.");
            window.location.reload();
            return false;
        }
        $('#displaycontent')
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
                .append('<li><h3><img src="images/' + obj.sports[1] + '_10px.png" />' + obj.sports[1] + '</h3></li')
            ;
            $('#itemsUl li:last')
                .append('<ul>' + obj.sports[1] + '</ul>')
            getImage(obj.sports[i]);
            for (var n in obj){
                var optSubText = $('<li id="subLi">' + obj[n][0] + " " + obj[n][1] + '</li');
                var subLi = $('#subLi');
                $('#itemsUl li:last ul:last')
                    .append(optSubText)
                    .append('<li id="linksLi"></li>')
                ;
            }            
            makeItemLinks(key); //Create edit/delete links for each item.
        }
    console.log(obj);
    }
    
    //Function to get a unique image for each sport.
    function getImage(catName){
        $('#itemsUl li:last ul:last')
            .append('<li><img src="images/"' + catName + '".png"')
        ;        
    }
    
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
    
    //Create eventhandler for clicking "Retrieve JSON" & populate page with the pulled data
    $('#addJSON').on("click", function(){
        $('#jsontent').empty();
        $.ajax({
            url: "xhr/data.js",
            type: "GET",
            dataType: "json",
            success: function(answer){
                alert("JSON data retrieved successfully!");
                for(var i=0, j=answer.teams.length; i<j; i++){
                    var whichTeam = answer.teams[i];
                    $(
                        '<div>'+
                            '<h3><img src="images/' + whichTeam.sports[1] + '_10px.png" />Basketball</h3>'+
                            '<div>'+
                                '<ul>'+
                                    '<li>' + whichTeam.sports[0] + ' ' + whichTeam.sports[1] + '</li>'+
                                    '<li>' + whichTeam.teamname[0] + ' ' + whichTeam.teamname[1] + '</li>'+
                                    '<li>' + whichTeam.teamsize[0] + ' ' + whichTeam.teamsize[1] + '</li>'+
                                    '<li>' + whichTeam.availabletime[0] + ' ' + whichTeam.availabletime[1] + '</li>'+
                                    '<li>' + whichTeam.nextdate[0] + ' ' + whichTeam.nextdate[1] + '</li>'+
                                    '<li>' + whichTeam.notes[0] + ' ' + whichTeam.notes[1] + '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'
                    ).appendTo('#jsontent');   
                }
            }
        });                    
    });
    
    //Create eventhandler for clicking "Retrieve XML" & populate page with the pulled data
    $('#addXML').on("click", function(){
        $('#xmlcontent').empty();
        $.ajax({
        url: 'xhr/data.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            alert("XML data retrieved successfully!");            
            $(xml).find("team").each(function(){
                var sport = $(this).find('sports').text();
                var teamname = $(this).find('teamname').text();
                var teamsize = $(this).find('teamsize').text();
                var availabletime = $(this).find('availabletime').text();
                var nextdate = $(this).find('nextdate').text();
                var notes = $(this).find('notes').text();
                $('' +
                    '<div id="team">'+
                        '<h3><img src="images/' + sport + '_10px.png" />' + sport + '</h3>'+
                        '<div>'+
                            '<ul>'+
                                '<li>Sport: ' + sport + '</li>'+
                                '<li>' + teamname + '</li>'+
                                '<li>' + teamsize + '</li>'+
                                '<li>' + availabletime + '</li>'+                
                                '<li>' + nextdate + '</li>'+                
                                '<li>' + notes + '</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>'
                ).appendTo('#xmlcontent');
            })
        }
        })
    });
    
    //Create eventhandler for clicking "Retrieve CSV" & populate page with the pulled data
    
    $('#addCSV').on("click", function(){
        $('#csvcontent').empty();
        $.ajax({
            url: 'xhr/data.csv',
            type: 'GET',
            dataType: 'text',
            success: function(csv){
                alert("CSV data retrieved successfully!");
                var teams = [];
                var pulledCSV = csv.split(/\r\n|\n/);
                var labels = pulledCSV[0].split(',');
                for(var i=2; i<pulledCSV.length; i++) {
                    var team = pulledCSV[i].split(',');
                    if (team.length == labels.length) {
                        var teamData = [];
                        for (var j=0; j<labels.length; j++){
                            teamData.push(team[j]);
                        }
                        teams.push(teamData);
                    }
                }
                for(var k=0; k<teams.length; k++){
                    var teamCat = teams[k];
                    $('' +
                        '<div id="team">'+
                            '<h3><img src="images/' + teamCat[0] + '_10px.png" />' + teamCat[0] + '</h3>'+
                            '<div>'+
                                '<ul>'+
                                    '<li>Sport: ' + teamCat[0] + '</li>'+
                                    '<li>Team Name: ' + teamCat[1] + '</li>'+
                                    '<li>Team Size: ' + teamCat[2] + '</li>'+
                                    '<li>Next available date: ' + teamCat[3] + '</li>'+
                                    '<li>Only available in the evening: ' + teamCat[4] + '</li>'+
                                    '<li>Notes: ' + teamCat[5] + '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'
                    ).appendTo('#csvcontent');
                }
            }
        })
    });
    
    var errMsg = $('#errors');
    //Link/Submit Click events
    $('#displayData').on("click", getData);
    $('#clearData').on("click", clearLocal);
    $('#submit').on("click", validate);
});