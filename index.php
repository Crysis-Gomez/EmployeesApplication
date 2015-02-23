<html manifest='http://146.185.150.161:8080/html/employeesApplication/offline.appcache'>
	<meta http-equiv='cache-control' content='no-cache'>
	<meta http-equiv='expires' content='0'>
	<meta http-equiv='pragma' content='no-cache'>
	<head>
		<title>
			EmployeesApplication
		</title>
		
		<script type='text/javascript' src='./js/jquery-1.11.0.min.js'></script>
		<script type='text/javascript' src='./js/dbmanager.js'></script>
		<script type='text/javascript' src='./js/index.js'></script>
		
		<link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.min.css">
		<script src="./lib/bootstrap/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/index.css" type="text/css">
	</head>


	<body>
	<div class='page-container'>
		<div class='page-head'>
			Employees
		</div>
		<div class='page-content'>
			
			<div class="modal fade" id="warningModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <!-- <h4 class="modal-title" id="myModalLabel"></h4> -->
			      </div>
			      <div class="modal-body">
			        	Your about to delete an item and are you sure?
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default closesubmit" data-dismiss="modal">Close</button>
			          <button id="submitdelete" type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
			      </div>
			    </div>
			  </div>
			</div>	



			<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
			  Add new member
			</button>

			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="myModalLabel">New User</h4>
			      </div>
			      <div class="modal-body">
			        <form role="form"  method="post">
						<label for="name">Name:</label>
						<input class="form-control" id="name" type="text" name="name">
						<label for="Lastname">Lastname:</label>
						<input class="form-control" id="lastname" type="text" name="lastname">
						<label for="Department">Department:</label>
						<input class="form-control" id="department" type="text" name="department">
						<label for="Job">Job:</label>
						<input class="form-control" id="job" type="text" name="job">
						<br>

						<div class="form-group">
					      <select name ="active" id="modal-select" class="form-control">
					        <option>active</option>
					        <option>inactive</option>
					      </select>
					    </div>
					
					</form>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			          <button id="submit" type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
			      </div>
			    </div>
			  </div>
			</div>

			<!-- Plaats hier de tabel -->
			<div class="content">
				    <table class="table">
				        <thead>
				            <tr>
				                <th>
					                <div class="clickName">Name
					                	<div id="glyphicon" class="glyphicon glyphicon-chevron-up"></div>
					                </div>
				                </th>
				                <th>Department </th>
				                <th>Job</th>
				                <th>Account id</th>
				                <th>Active/Inactive</th>
				            </tr>
				        </thead>

				        <tbody>
				        	<tr class="containerInput">
				        		<td>
				                	<input style="width:150px" class="nameInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				                	<input style="width:150px" class="departmentInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				                	<input style="width:150px" class="roleInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				            		<input style="width:100px" class="accountInput" class="form-control bfh-number" placeholder="Filter input">
				            	</td>

				            	<td>
				            		<div class="form-group">
								      <select id="dienstSelect" class="form-control">
								        <option>all</option>
								        <option>active</option>
								        <option>inactive</option>
								      </select>
								    </div>
				            	</td>
				            </tr>

				            <div class="list-wrapper">
				         

				        	</div>
				        </tbody>
				    </table>
				</div>
			</div>
		</div>
	</body>
</html>