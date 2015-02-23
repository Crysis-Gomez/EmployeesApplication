var db;
function Filter(){
	this.filterObject = {"name":"","department":"","role":"","accountId":"","employed":"all"};
	this.isDescending = false;
	this.saveObjects = new Array();
	this.lastID = -1;
	
	
	var selectedId = null;
	var element  = null;



}

Filter.prototype.setEventListeners = function(){
		$(".accountInput").keypress(function (e) {
	    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	        return false;
	    }
    });

	//keyup EventListeners on specific elements
	$(".accountInput").keyup(this.filterCallback.bind(this,'accountId',"accountInput"));
	$( ".nameInput" ).keyup(this.filterCallback.bind(this,'name',"nameInput"));
	$( ".departmentInput" ).keyup(this.filterCallback.bind(this,'department',"departmentInput"));
	$( ".roleInput" ).keyup(this.filterCallback.bind(this,'role',"roleInput"));


	$( ".clickName" ).click(this.onClickCallBack.bind(this));
	$( "#dienstSelect" ).change(this.onChangeCallBack.bind(this));

	
	$( ".table" ).on("click",".deletebtn",function(){

		var description = $(this).closest('.description');
		var id = $(description).find('.accountId')[0].innerHTML;
		var name = $(description).find('.name')[0].innerHTML;
		
		selectedId = id;
		element = this;
		$('#warningModal').find('.modal-body')[0].innerHTML = "Your about to delete <b>"+name+ "</b> with id number <b>"+id+"</b> and are you sure?";
		$('#warningModal').modal('show');
	
	});


	$(".closesubmit").click(function(){
		selectedId = null;
		element = null;
	});


	$("#submitdelete").click(function(){

		if(navigator.onLine){
			var dataString = 'id='+selectedId;	
			$.ajax({
			  type: "POST",
			  url: 'php/delete.php',
			  data: dataString,
			  success: function(res){
			  		$(element).closest('.description').remove();
			  		  selectedId = null;
			  		  element = null;
			  },
			});

		}else{
			
			var objectStore = manager.db.transaction(["Employees"], "readwrite").objectStore("Employees");
			var request = objectStore.get(selectedId);
			request.onsuccess = function(event){
				var data = request.result;
				data.deleted = true;

				var requestUpdate = objectStore.put(data);
			   	requestUpdate.onerror = function(event) {
			     // Do something with the error
			   	};
			   	requestUpdate.onsuccess = function(event) {
			     // Success - the data is updated!
			     	  $(element).closest('.description').remove();
			  		  selectedId = null;
			  		  element = null;
			   	};
			}
		}
	});

	
	$( "#submit" ).click(function(){
		var name = $('#name').val();
		var lastname = $('#lastname').val();
		var job = $('#job').val();
		var department = $('#department').val();
		var active = $('#modal-select option:selected').text() == 'active' ? 1 :0;

		var dataString = 'name='+ name + '&lastname='+ lastname + '&department='+ department + '&job='+ job+'&active='+ active;	
       
        var html = '';

        html += '<tr class="description">';
	  	html += '<td class="name">'+name+'</td>';
	  	html += '<td class="department">'+department+'</td>';
	  	html += '<td class="role">'+job+'</td>';
	  	
		if(navigator.onLine){
			$.ajax({
			  type: "POST",
			  url: 'php/send.php',
			  data: dataString,
			  success: function(res){

			  	html += '<td class="accountId">'+res+'</td>';


			  	var act = active == 1 ? 'Active':'Inactive';  
				html += '<td class="employed">'+act+'<button id="delete" type="button" class="btn btn-primary btn-xs deletebtn"><span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
				html +='</tr>';

			  	$('.table').append(html);

			  },
			});
		}else{


			filter.lastID++;

			html += '<td class="accountId">'+filter.lastID+'</td>';

		  
		  	var act = active == 1 ? 'Active':'Inactive';  
			html += '<td class="employed">'+act+'<button id="delete" type="button" class="btn btn-primary btn-xs deletebtn"><span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
			html +='</tr>';

			$('.table').append(html);

			var customerObjectStore = manager.db.transaction("Employees", "readwrite").objectStore("Employees");
			var object = {name:name,lastname:lastname,department:department,job:job,active:active,id:filter.lastID,newrecord:true};
			customerObjectStore.add(object);
		}
	});
}

Filter.prototype.filterCallback = function(e){

	this.filterObject[arguments[0]] = String($( "." + arguments[1] ).val());
	this.filterTable();
}

Filter.prototype.onClickCallBack = function(e){

	//this where the list changes to ASC or DESC
	this.isDescending = this.isDescending != false ? this.isDescending = false : this.isDescending = true;
  		 
	if(this.isDescending){
	 	$( "#glyphicon" ).removeClass("glyphicon-chevron-up");
	 	$( "#glyphicon" ).addClass("glyphicon-chevron-down");

	}else{
	 	$( "#glyphicon" ).removeClass("glyphicon-chevron-down");
	 	$( "#glyphicon" ).addClass("glyphicon-chevron-up");
	}

	 this.sortName(this.isDescending);
}

Filter.prototype.onChangeCallBack = function(){
	this.filterObject.employed = $( "#dienstSelect option:selected" ).text();		
  	this.filterTable();
}

Filter.prototype.hide = function(field){
 	if($(field).is(':visible'))$(field).hide();
}

Filter.prototype.show = function(field){
 	if($(field).is(':hidden'))$(field).show();
}

Filter.prototype.filterTable = function(){

	//the main filter task are done here by checking every field in each column
	var columns = $( ".description" );
	for (var i = 0; i < columns.length; i++) {
		 var field = columns[i];
		 if(!this.filterColumn(field,this.filterObject.department,"department")){
		 	this.hide(field);
		 	continue;
		 }
		 if(!this.filterColumn(field,this.filterObject.role,"role")){
		 	this.hide(field);
		 	continue;
		 }


		 if(!this.filterActive(field,this.filterObject.employed,"employed","all")){
		 	this.hide(field);
		 	continue;
		 }
		 if(!this.filterColumn(field,this.filterObject.name,"name","")){
		 	this.hide(field);
		 	continue;
		 }
		 if(!this.filterColumn(field,this.filterObject.accountId,"accountId","")){
		 	this.hide(field);
		 	continue;
		 }

		 this.show(field);
	};
}

Filter.prototype.filterActive = function(field,fil,columnName,check){
	if(fil == check)return true;
	var element = $(field).find('.'+columnName);
	if(element.text().toUpperCase() == fil.toUpperCase())return true;
	else return false;
}

Filter.prototype.filterColumn = function(field,fil,columnName,check){

	if(fil == check || fil == " ")return true;
	
	var element = $(field).find('.'+columnName);

	//Every string are made to uppercase, so the filter would not be case sensitive and checks if string contains the value in the field
	
	return this.checkSubstring(element.text().toUpperCase(),fil.toUpperCase())
}

Filter.prototype.checkSubstring = function(str1,str2){
	if(str1.indexOf(str2) != -1){
		return true;
	}
	return false;
}

Filter.prototype.sortName = function(desc){
	//The array received from Jquery is cloned 
	var _array = $( ".description" );
	var tempArray = _array.slice(0);
	var sortArray = new Array();

	//The value names are taken from the column and are pushed into an array
	for (var i = 0; i < _array.length; i++) {
		 var field = _array[i];
		 sortArray.push($(field).find('.name').text());
	};

	//sort the array
	sortArray.sort();
	if(desc){
		sortArray.reverse();	
	}

	$( ".description" ).remove();
	
	// the elements that are saved in the cloned array are put into div element according to ASC or DESC name list
	for (var l = 0; l < sortArray.length; l++) {
		 	var name = sortArray[l];
		 	
		 	for (var i = 0; i < tempArray.length; i++) {
		 		 var c = tempArray[i];

		 		if($(c).find('.name').text() == name){
		 			$( "tbody" ).append(c);
		 			continue;		 			
		 		}
		 };
	};
}

var filter;
var manager;
$( document ).ready(function() {
	filter = new Filter();
	if(!navigator.onLine)alert("you working offline");

	function onUpdateReady() {
	  //alert('found new version!');
	}
	window.applicationCache.addEventListener('updateready', onUpdateReady);
	if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
	  onUpdateReady();
	}

	manager = new dbmanager();
	manager.init();
});
