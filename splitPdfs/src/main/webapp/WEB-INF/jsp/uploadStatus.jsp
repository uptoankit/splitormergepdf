<html>
<body>
<h1>Upload Status</h1>
<h2>Status: ${statusMessage}</h2>
	<div hidden="${hideSplit}">	
		Download extracted file:    <a target="_blank" href="${pageContext.request.contextPath}/files/${downloadLinkName}.pdf" id="downloadLinkForSplit">${downloadLinkName}</a>
	</div>
	
	<div>	
		Download merged file:    <a target="_blank" href="${pageContext.request.contextPath}/files/${downloadLinkName}.pdf" id="downloadLinkForMerged">${downloadLinkName}</a>
	</div>
</body>
</html>
