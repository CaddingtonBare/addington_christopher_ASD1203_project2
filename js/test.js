// Name: Christopher Addington
// Date: 27 February, 2012
// Assignment: Project 1
// ASD Term 0312

$(function(){

        $.ajax({
            url: 'xhr/data.js',
            type: 'GET',
            dataType: 'json',
            success: function(json){
                for(var i=0, j=json.teams.length; i<j; i++){
                    var whichTeam = json.teams[i];
                    $(
                        '<div data-role="collapsible" data-collapsed="true" data-theme="a">'+
                            '<h3><img src="images/Basketball_landing.png" />Basketball</h3>'+
                            '<div data-role="content">'+
                                '<ul data-role="listview" data-theme="c">'+
                                    '<li>' + whichTeam.sports[0] + ' ' + whichTeam.sports[1] + '</li>'+
                                    '<li>' + whichTeam.teamname[0] + ' ' + whichTeam.teamname[1] + '</li>'+
                                    '<li>' + whichTeam.teamsize[0] + ' ' + whichTeam.teamsize[1] + '</li>'+
                                    '<li>' + whichTeam.availabletime[0] + ' ' + whichTeam.availabletime[1] + '</li>'+
                                    '<li>' + whichTeam.nextdate[0] + ' ' + whichTeam.nextdate[1] + '</li>'+
                                    '<li>' + whichTeam.notes[0] + ' ' + whichTeam.notes[1] + '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'
                    ).appendTo('#JSONpage');
                }
            },
        });
        
console.log(json.teams[0].sports[1]);
        
});