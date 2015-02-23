$( document ).ready(function() {
	
	$.ajax({
	  type: "GET",
	  dataType: "json",	  
	  url: 'http://146.185.150.161:8080/html/rwrs/php/getemployees.php',
	  success: function(res){
	  		for (var i = 0; i < res.length; i++) {
	  			var object = res[i];
	  			var html = '';

		        html += '<tr class="description">';
			  	html += '<td class="name">'+object.name+'</td>';
			  	html += '<td class="department">'+object.department+'</td>';
			  	html += '<td class="role">'+object.role+'</td>';
			  	html += '<td class="accountId">'+object.id+'</td>';

			  	var act = object.active == 1 ? 'In dienst':'Uit dienst';  
			  	html += '<td class="employed">'+act+'</td>';
			  	html += '<td><button id="delete" type="button" class="btn btn-primary btn-xs deletebtn">';
				html +=	'<span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
			  	html +='</tr>';


			  	$('.table').append(html);

	  			console.log(object)
	  		};

	  		filter.lastID = parseInt($('.accountid')[$('.accountid').length-1].innerHTML);

	  },
	});
});
