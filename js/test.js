// Name: Christopher Addington
// Date: 27 February, 2012
// Assignment: Project 1
// ASD Term 0312

$(function(){

    var getJSON = function(){
        $.ajax({
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success: function(json){
                /*
                <div data-role="collapsible" data-collapsed="true" data-theme="a">
		    <h3><img src="images/Basketball_landing.png" />Basketball</h3>
                    <div data-role="content">
			<ul data-role="listview" data-theme="c">
			    <li><a href="#bball1">json</a></li>
			    <li><a href="#bball2">Charity</a></li>
			    <li><a href="#bball3">20-somethings</a></li>
			    <li><a href="#bball4">Half-court dunkers</a></li>
			</ul>
		    </div>
		</div>
                */
                
            },
        });
    };
    
console.log(json.team);

});