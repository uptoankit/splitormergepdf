<html>

<body>
<h1>Spring MVC file upload example</h1>

<form method="POST" action="${pageContext.request.contextPath}/upload" enctype="multipart/form-data">
    <input type="file" name="file" /><br/><br/>
    <h3>Enter Page Number</h3>
    <div>
    start Page Number : <input type="text" name="startPageNumber" value=""/>
    </div>
    <br/><br/>
    <div>
    End Page Number : <input type="text" name="endPageNumber" value=""/>
    </div>
    <input type="submit" name="split"value="Split" />
</form>


</body>
</html>