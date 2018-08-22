<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
			<form autocomplete="off" method="POST"
				action="${pageContext.request.contextPath}/uploadForMerge"
				enctype="multipart/form-data">
				<div class="row">						
					<div class="col-md-12">
						<div class="col-md-2">First File to merge: </div>
						<div class="col-md-10"><input type="file" name="files" /></div>
					</div><br /><br />
					<div class="col-md-12">
						<div class="col-md-2">Second File to merge: </div>
						<div class="col-md-10"><input type="file" name="files" /></div>
					</div><br /><br />
					<div class="col-md-12">
						<div class="col-md-2">Third File to merge: </div>
						<div class="col-md-10"><input type="file" name="files" /></div>
					</div><br /><br />
				</div>
				
				<div class="row">
						<div class="col-md-2"> </div>
						<div class="col-md-10">
							<input type="submit" value="Merge" />
						</div>
					</div>
			</form>
	</div>
</body>
</html>