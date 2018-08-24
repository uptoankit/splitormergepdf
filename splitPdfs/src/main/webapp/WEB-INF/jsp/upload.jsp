<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="appContextUrl"
	value="${pageContext.servletContext.contextPath}/"></c:set>

<!DOCTYPE html>

<html data-ng-app="smp.main.splitpdfs">
<head>
<title>Upload page</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link
	href='<c:out value="${appContextUrl}" />resources/build/build.min.css'
	rel="stylesheet" />
<script
	src='<c:out value="${appContextUrl}" />resources/build/build.vendorsjs.min.js'></script>
<script
	src='<c:out value="${appContextUrl}" />resources/build/1.4.7/build.splitpdfs.min.js'></script>
</head>
<script type="text/javascript">
   	var _appContextUrl = '<c:out value="${appContextUrl}" />';
   	var _smpContext = '${pageContext.servletContext.contextPath}/';
 </script>
<body>
	<c:import url="header"></c:import>

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
					<br /> <br />

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
		</div>
	</div>


	<c:import url="footer"></c:import>
</body>
</html>
