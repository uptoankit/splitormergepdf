<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form autocomplete="off" method="POST"
				action="${pageContext.request.contextPath}/uploadForMerge"
				enctype="multipart/form-data">
		<input type="file" name="files" /><br /><br />
		<input type="file" name="files" /><br /><br />
    	<input type="file" name="files" /><br/><br/>
		<input type="submit" value="Submit" />
	</form>
</body>
</html>