
<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel='stylesheet'
	href='${pageContext.request.contextPath}/webjars/bootstrap/3.3.7/css/bootstrap.min.css'>
<script
	src="${pageContext.request.contextPath}/webjars/jquery/3.0.0/jquery.min.js"></script>
<link rel='stylesheet'
	href='${pageContext.request.contextPath}/webjars/bootstrap/3.3.7/js/bootstrap.min.js'>
</head>
<body>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="/splitPdfs">SMP</a>
			</div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="/splitPdfs">Home</a></li>
				<li><a href="<c:url value="/merge" />">Merge PDFs</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#"><span class="glyphicon glyphicon-user"></span>
						Sign Up</a></li>
				<li><a href="#"><span class="glyphicon glyphicon-log-in"></span>
						Login</a></li>
			</ul>
		</div>
	</nav>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3>Extract the pages from PDF you want!! Max File Size to
					upload is 20MB</h3>
			</div>
			<div class="col-md-12">
				<form autocomplete="off" method="POST"
					action="${pageContext.request.contextPath}/upload"
					enctype="multipart/form-data">

					<div class="col-md-12">
						<div class="col-md-2">
							<label>Upload the file to split: </label>
						</div>
						<div class="col-md-10">
							<input type="file" name="file" />
						</div>
					</div>
					<br /> <br />

					<div class="col-md-12">
						<label>Enter Page Number </label>
					</div>
					<br />
					<br />

					<div class="col-md-12">
						<div class="col-md-2">
							<label>start Page Number : </label>
						</div>
						<div class="col-md-10">
							<input type="text" name="startPageNumber" value="" />
						</div>
					</div>
					<br /> <br />

					<div class="col-md-12">
						<div class="col-md-2">
							<label>End Page Number : </label>
						</div>
						<div class="col-md-10">
							<input type="text" name="endPageNumber" value="" />
						</div>
					</div>

					<div></div>

					<br /> <br /> <input type="submit" name="split" value="Split" />
				</form>
			</div>
			<br /> <br />

			
		</div>
	</div>


<nav class="navbar navbar-default navbar-fixed-bottom">
  <div class="container">
    <div class="col-md-12">
    	<div class="col-md-4" style="margin-left: -11rem;color:#8b8c8d">
    		Developed By Ankit Agarwal
    	</div>
		<div class="col-md-8">
			Do you want to merge PDF? click here 
			<a href="<c:url value="/merge" />">Merge PDFs</a>
		</div>
			</div>
  </div>
</nav>

</body>
</html>