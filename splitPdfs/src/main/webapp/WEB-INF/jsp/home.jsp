<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="appContextUrl"
	value="${pageContext.servletContext.contextPath}/"></c:set>

<!DOCTYPE html>

<html data-ng-app="smp.main.splitmergepdfs">
<head>
<title>Upload page</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link
	href='<c:out value="${appContextUrl}" />ui-resources/build/build.prod.min.css'
	rel="stylesheet" />
<script
	src='<c:out value="${appContextUrl}" />ui-resources/build/build.vendorsjs.min.js'></script>
<script
	src='<c:out value="${appContextUrl}" />ui-resources/build/build.splitpdfs.js'></script>
</head>
<script type="text/javascript">
   	var _appContextUrl = '<c:out value="${appContextUrl}" />';
 </script>
<body>
	<div ui-view="header" class="ng-cloak"></div>
	<div ui-view="container" class="ng-cloak"></div>
	<div ui-view="footer" class="ng-cloak"></div>
</body>
</html>
