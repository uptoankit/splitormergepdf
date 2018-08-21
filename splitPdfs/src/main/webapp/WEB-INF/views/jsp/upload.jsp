<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">


</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
  	<nav class="navbar navbar-light bg-light">
	  <a class="navbar-brand" href="#">
	    <img src="${pageContext.request.contextPath}/webapp/WEB-INF/images/split.png" width="30" height="30" alt="">
	  </a>
	</nav>
    <div class="navbar-header">                                   
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="navbar-toggler-icon"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Split or Merge PDF</a>
    </div>
     <div class="navbar-collapse collapse">  
       <ul class="nav navbar-nav">
         <li class="active"><a href="<c:url value="/" />">Home</a></li>
         <li><a href="<c:url value="/getstarted" />">Get started</a></li>
         <li><a href="<c:url value="/errors-validations" />">Errors &amp; Validations</a></li>
         <li><a href="<c:url value="/form" />">Forms</a></li>
         <li><a href="<c:url value="/fileupload" />">File Upload</a></li>
         <li><a href="<c:url value="/misc" />">Misc</a></li>
       </ul>
     </div>   
     
     		<div class="row">
		
		<div class="col-md-12"><h3>Extract the pages from PDF you want!! Max File Size to upload is 20MB
		</h3></div>	
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
  </div>
</div>

	
</body>
</html>