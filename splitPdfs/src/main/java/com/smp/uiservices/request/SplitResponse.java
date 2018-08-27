/**
 * 
 */
package com.smp.uiservices.request;

import javax.ws.rs.core.Response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author anagarw3
 *
 */
@SuppressWarnings("serial")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SplitResponse extends UIResponse {
	private String downloadLink;
	private String downloadLinkName;
	private Response outputFileResponse;
	
	public Response getOutputFileResponse() {
		return outputFileResponse;
	}
	public void setOutputFileResponse(Response outputFileResponse) {
		this.outputFileResponse = outputFileResponse;
	}
	public String getDownloadLink() {
		return downloadLink;
	}
	public void setDownloadLink(String downloadLink) {
		this.downloadLink = downloadLink;
	}
	public String getDownloadLinkName() {
		return downloadLinkName;
	}
	public void setDownloadLinkName(String downloadLinkName) {
		this.downloadLinkName = downloadLinkName;
	}
	
}
