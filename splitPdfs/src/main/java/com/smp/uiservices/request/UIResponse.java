package com.smp.uiservices.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UIResponse  implements Serializable{

		private static final long serialVersionUID = 1L;

		// This will hold messages for UI
		private String messages;

		// Status for service response.
		private String status;
		
		private byte[] fileContent;

		public String getMessages() {
			return messages;
		}

		public void setMessages(String messages) {
			this.messages = messages;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public byte[] getFileContent() {
			return fileContent;
		}

		public void setFileContent(byte[] fileContent) {
			this.fileContent = fileContent;
		}
		
		
}
