<html>
	<head>
		<title>
			MYSQL test & Filter
		</title>
		
		<script type='text/javascript' src='./js/jquery-1.11.0.min.js'></script>
		<script type='text/javascript' src='./js/index.js'></script>
		<link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.min.css">
		<script src="./lib/bootstrap/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/index.css" type="text/css">
	</head>
	<?php
		include('./php/getemployees.php');

	?>
	<body>
	<div class='page-container'>
		<div class='page-head'>
			Fallback Employees
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
				                	<input class="nameInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				                	<input class="departmentInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				                	<input class="roleInput" type="text" class="form-control" placeholder="Filter input">
				            	</td>
				            	
				            	<td>
				            		<input class="accountInput" class="form-control bfh-number" placeholder="Filter input">
				            	</td>

				            	<td>
				            		<div class="form-group">
								      <select id="dienstSelect" class="form-control">
								        <option>All</option>
								        <option>active</option>
								        <option>inactive</option>
								      </select>
								    </div>
				            	</td>
				            </tr>

				            <div class="list-wrapper">

				            <?php
				 
				        		foreach ($a as $key => $value) {
				        			?>

				        			<tr class="description">
						                <td class="name"><?php echo $value['name' ] ?></td>
						                <td class="department"><?php echo $value['department' ] ?></td>
						                <td class="role" ><?php echo $value['role' ] ?></td>
						                <td class="accountId"><?php echo $value['id' ] ?></td>
						                <td class="employed"><?php echo $value['active' ] ? 'In dienst':'Uit dienst' ?></td>
						            	<td>
							            	<button id="delete" type="button" class="btn btn-primary btn-xs deletebtn">
							            		<span type="button" class='glyphicon glyphicon-remove'></span>
											</button>
										</td>
						            </tr>
							<?php }
				        	?>
				        	</div>
				        </tbody>
				    </table>
				</div>
			</div>
		</div>
	</body>
</html>