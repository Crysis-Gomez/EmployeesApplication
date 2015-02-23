var dbmanager = function(){
	this.db;
	this.request;
	this.existed = true;
	this.newrecordArray = [];
	this.deleterecordArray = [];

	this.loadFromindexDB = function(callback){

		var transaction = this.db.transaction(["Employees"]);
		var objectStore = transaction.objectStore("Employees");
		var items = [];

		transaction.oncomplete = function(evt){
			callback(items);
		}

		var cursorRequest = objectStore.openCursor();
		
		cursorRequest.onerror = function(error) {
			console.log(error);
		}

		cursorRequest.onsuccess = function(evt) {                   
			var cursor = evt.target.result;

			if (cursor){
				items.push(cursor.value);
				cursor.continue();
			}
		};
	}

	this.placeItems = function(data){
		for (var i = 0; i < data.length; i++) {
			var object = data[i];
			if(object.deleted == true)continue;
			var html = '';

	        html += '<tr class="description">';
		  	html += '<td class="name">'+object.name+'</td>';
		  	html += '<td class="department">'+object.department+'</td>';
		  	html += '<td class="role">'+object.job+'</td>';
		  	html += '<td class="accountId">'+object.id+'</td>';

		  	var act = object.active == 1 ? 'Active':'Inactive';  
		  	html += '<td class="employed">'+act+'</td>';
		  	html += '<td><button id="delete" type="button" class="btn btn-primary btn-xs deletebtn">';
			html +=	'<span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
		  	html +='</tr>';

		  	if(parseInt(object.id) > filter.lastID){
		  		filter.lastID = parseInt(object.id);
		  	}
		  	$('.table').append(html);
		};

		filter.setEventListeners();
	}

	this.checkExists = function(callback){
		var that = this;
		
		var r = window.indexedDB.open("Business", 2);
		
		r.onsuccess = function(event){
			callback.call(that);
		};	

		r.onupgradeneeded = function(event) {
  			that.existed = false;
		};
	}

	this.process = function(){
		this.connectToDatabase();
	}


	this.init = function(){
		this.process();
	}

	this.pushNewRecordToMYSQL = function(){

		var myJsonString = JSON.stringify(this.newrecordArray);
		var that = this;
		$.ajax({
		  type: "POST",
		  url: 'php/sendBigdata.php',
		  data: {data:myJsonString},
		  success: function(res){
		  	if(that.deleterecordArray.length > 0){
		  		that.pushDeleteRecordToMYSQL();
		  	}else that.restartDatabase();	
		  },
		});
	}

	this.pushDeleteRecordToMYSQL = function(){
		var myJsonString = JSON.stringify(this.deleterecordArray);
		var that = this;
		$.ajax({
		  type: "POST",
		  url: 'php/removeBigdata.php',
		  data: {data:myJsonString},
		  success: function(res){
		  	that.restartDatabase();	
		  },
		});
	}

	this.compareArray = function(){
		for (var i = 0; i < this.newrecordArray.length; i++) {
			 	var rec = this.newrecordArray[i];
			 	console.log(rec.id);
				for (var l = 0; l < this.deleterecordArray.length; l++) {
				 	 var del = this.deleterecordArray[l];
				 	 if(rec.id == del.id){
				 	 	this.newrecordArray.splice(i,1);
				 	 	i--;
				 	 }
				};
		};

		if(this.newrecordArray.length > 0){
			this.pushNewRecordToMYSQL();
		}else if(this.deleterecordArray.length > 0)this.pushDeleteRecordToMYSQL();

	}

	this.checkDataBase = function(){
		var transaction = this.db.transaction(["Employees"]);
		var objectStore = transaction.objectStore("Employees");
		var that = this;

		transaction.oncomplete = function(evt){
	
			if(that.newrecordArray.length == 0 && that.deleterecordArray.length == 0){
				that.restartDatabase();				
			}else{
				that.compareArray();
			}	
		}

		var cursorRequest = objectStore.openCursor();
		
		cursorRequest.onerror = function(error) {
			console.log(error);
		}

		cursorRequest.onsuccess = function(evt) {                   
			var cursor = evt.target.result;

			if (cursor){
				console.log(cursor.value.newrecord)
				if(cursor.value.newrecord == true){
					that.newrecordArray.push(cursor.value);
				}
				if(cursor.value.deleted == true){
					that.deleterecordArray.push(cursor.value);
				}
				cursor.continue();
			}
		};
	}

	this.restartDatabase = function(){
		this.db.close();
		var that = this;
		var req = indexedDB.deleteDatabase("Business");
		req.onsuccess = function () {
		    console.log("Deleted database successfully");
		    that.connectToDatabase();
		};
		req.onerror = function () {
		    console.log("Couldn't delete database");
		};
		req.onblocked = function () {
		    console.log("Couldn't delete database due to the operation being blocked");
		};
	}

	this.connectToDatabase = function(){
		// console.log("connectToDatabase");
		this.request = window.indexedDB.open("Business", 2);
		var that = this;
		this.request.onerror = function(event) {
		  // Do something with request.errorCode!
		   console.log("Database error: " + event.target.errorCode);
		};
		this.request.onsuccess = function(event) {
		  // Do something with request.result!
		  that.db = event.target.result;
		 if(that.existed && navigator.onLine){
		  	that.checkDataBase();
		  }else if(!navigator.onLine)that.loadFromindexDB(that.placeItems);
		};

		this.request.onupgradeneeded = function(event) {
  			that.db = event.target.result;
  			that.existed = false;
  			console.log("onupgradeneeded");
			var objectStore = that.db.createObjectStore("Employees", { keyPath: "id" });
			objectStore.createIndex("name", "name", { unique: false });
			objectStore.createIndex("lastname", "lastname", { unique: false });
			objectStore.createIndex("department", "department", { unique: false });
			objectStore.createIndex("job", "job", { unique: false });
			objectStore.createIndex("active", "active", { unique: false });
			objectStore.createIndex("id", "id", { unique: true });
			objectStore.createIndex("newrecord", "newrecord", { unique: false });
			objectStore.createIndex("delete", "delete", { unique: false });

			objectStore.transaction.oncomplete = function(event) {
				that.loadData();
			}	
		}
	}

	this.loadData = function(){
		var db = this.db;
		console.log("data");
		
		$.ajax({
		  type: "GET",
		  dataType: "json",
		  url: 'http://146.185.150.161:8080/html/employeesApplication/php/getemployees.php',
		  success: function(res){
		 		console.log(res)
		  		var customerObjectStore = db.transaction("Employees", "readwrite").objectStore("Employees");
		  		for (var i = 0; i < res.length; i++) {
		  			var object = res[i];
		  			var html = '';

			        html += '<tr class="description">';
				  	html += '<td class="name">'+object.name+'</td>';
				  	html += '<td class="department">'+object.department+'</td>';
				  	html += '<td class="role">'+object.role+'</td>';
				  	html += '<td class="accountId">'+object.id+'</td>';

				  	var act = object.active == 1 ? 'Active':'Inactive';  
				  	html += '<td class="employed">'+act+'<button id="delete" type="button" class="btn btn-primary btn-xs deletebtn"><span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
				  	//html += '<td><button id="delete" type="button" class="btn btn-primary btn-xs deletebtn">';
					//html +=	'<span type="button" class="glyphicon glyphicon-remove"></span></button></td>';
				  	html +='</tr>';


				  	$('.table').append(html);
				  	var object = {name:object.name,lastname:object.lastname,department:object.department,job:object.role,active:act,id:object.id,newrecord:false,deleted:false};  			
		    	 	customerObjectStore.add(object);
		  		};

		  		filter.lastID = parseInt($('.accountid')[$('.accountid').length-1].innerHTML);
		  		filter.setEventListeners();
		  	},
		});
	}
}