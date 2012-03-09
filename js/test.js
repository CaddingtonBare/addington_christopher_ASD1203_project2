// Name: Christopher Addington
// Date: 27 February, 2012
// Assignment: Project 1
// ASD Term 0312

$(function(){

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
                    '<div id="team' + i + '">'+
                        '<h3><img src="images/Basketball_landing.png" />Basketball</h3>'+
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
        
$('#addXML').on("click", function(){
        $.ajax({
        url: 'xhr/data.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            $(xml).find("team").each(function(){
                var sport = $(this).find('sports').text();
                var teamname = $(this).find('teamname').text();
                var teamsize = $(this).find('teamsize').text();
                var availabletime = $(this).find('availabletime').text();
                var nextdate = $(this).find('nextdate').text();
                var notes = $(this).find('notes').text();
                $('' +
                    '<div id="team">'+
                        '<h3><img src="images/' + sport + '_10px.png" /></h3>'+
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
});