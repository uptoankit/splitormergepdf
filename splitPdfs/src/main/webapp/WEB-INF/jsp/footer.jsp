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
<nav class="navbar navbar-default navbar-fixed-bottom">
		<div class="container">
			<div class="col-md-12">
				<div class="col-md-4" style="margin-left: -11rem; color: #8b8c8d">
					Developed By Ankit Agarwal</div>
				<div class="col-md-8">
					Do you want to merge PDF? click here <a
						href="<c:url value="/merge" />">Merge PDFs</a>
				</div>
			</div>
		</div>
	</nav>
</body>
</html>