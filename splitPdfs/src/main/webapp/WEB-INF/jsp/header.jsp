<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
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
<title>Header</title>
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
</body>
</html>