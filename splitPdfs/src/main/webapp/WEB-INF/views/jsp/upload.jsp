<html>

<body>
	<div class="row">
		<h2>Extract the pages from PDF you want!! Max File Size to upload is 20MB</h2>
			
		<div class="col-md-12">
		
			<form autocomplete="off" method="POST"
				action="${pageContext.request.contextPath}/upload"
				enctype="multipart/form-data">
				
				<input type="file" name="file" /><br />
				<br />
				<h3>Enter Page Number</h3>

				<div>
					start Page Number : <input type="text" name="startPageNumber" value="" />
				</div>
				<br />
				<br />

				<div>
					End Page Number : <input type="text" name="endPageNumber" value="" />
				</div>

				<br />
				<br /> <input type="submit" name="split" value="Split" />
			</form>
		</div>
		<div class="col-md-6">
			<form autocomplete="off" method="GET" action="${pageContext.request.contextPath}/merge">
				Do you want to merge PDF? click here <input type="submit"
					name="Merge" value="Merge" />
			</form>
		</div>


	</div>
</body>
</html>