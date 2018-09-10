/**
 * 
 */
package com.smp.uiservices;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.glassfish.jersey.media.multipart.ContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Ankit
 *
 */
@Path("/smpaction")
public class SmpAction {

	public static String split(int startPage, int endPage, String filePath) {
		try {
			// take the user input for file Path Loading an existing PDF document

			File file = new File(filePath);
			int index = filePath.indexOf(".pdf");
			String filePathWithOutExtension = filePath.substring(0, index);
			PDDocument document = PDDocument.load(file);

			// Instantiating Splitter class from Apache library
			Splitter splitter = new Splitter();
			splitter.setStartPage(startPage);
			splitter.setEndPage(endPage);

			// split the pages of a PDF document loaded
			List<PDDocument> Pages = splitter.split(document);

			Iterator<PDDocument> iterator = Pages.listIterator();
			PDFMergerUtility PDFmerger = new PDFMergerUtility();
			PDFmerger.setDestinationFileName(filePathWithOutExtension + "-split.pdf");

			// Save each page as an individual PDF doc and name it incrementally
			int i = 1;
			while (iterator.hasNext()) {
				PDDocument pd = iterator.next();
				String filePathWithExtension = filePathWithOutExtension + i++ + ".pdf";
				System.out.println("fileName:::" + filePathWithExtension);
				pd.save(filePathWithExtension);
				File partFile = new File(filePathWithExtension);
				PDFmerger.addSource(partFile);
			}
			PDFmerger.mergeDocuments(null);
			int j = 1;
			while (iterator.hasNext()) {
				File file1 = new File(filePathWithOutExtension + j++ + ".pdf");
				PDDocument doc = PDDocument.load(file1);
				doc.close();
			}
			document.close();
			return filePathWithOutExtension;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@POST
	@Path("/split")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(MediaType.APPLICATION_JSON)
	public Response splitUploadedFile(final @Context HttpServletRequest servletRequest,
			final @Context HttpServletResponse servletResponse, final @FormDataParam("fileUpload") File uploadFile,
			final @FormDataParam("fileUpload") FormDataContentDisposition fileDetail,
			final @FormDataParam("startPageNumber") int startPageNumber,
			final @FormDataParam("endPageNumber") int endPageNumber) {
		String UPLOADED_FOLDER = System.getProperty("java.io.tmpdir");
		System.out.println("UPLOADED_FOLDER:::>>" + UPLOADED_FOLDER);

		try {
			byte[] bytes = Files.readAllBytes(uploadFile.toPath());
//        	byte[] bytes = uploadFile.getBytes();
			java.nio.file.Path path = Paths.get(UPLOADED_FOLDER + fileDetail.getFileName());
			Files.write(path, bytes);
			System.out.println("File " + fileDetail.getFileName() + " uploaded");

			String filePath = UPLOADED_FOLDER + fileDetail.getFileName();
			// Loading an existing PDF document

			// now call the split function
			String splitFileName = split(startPageNumber, endPageNumber, filePath);
			String downloadLinkName = splitFileName + "-split";
			String downloadLink = splitFileName + "-split.pdf";
			if (null != splitFileName) {
				int nameLength = downloadLinkName.length();
				int slashFromLast = -1;
				if (downloadLinkName.contains("/")) {
					slashFromLast = downloadLinkName.lastIndexOf("/");
				} else if (downloadLinkName.contains("\\")) {
					slashFromLast = downloadLinkName.lastIndexOf("\\");
				}
				downloadLinkName = downloadLinkName.substring(slashFromLast + 1, nameLength);
				System.out.println("downloadLinkName::" + downloadLinkName);
				java.nio.file.Path splitFilePath = Paths.get(downloadLink);
				final byte[] exportData = Files.readAllBytes(splitFilePath);
				final StringBuilder fileName = new StringBuilder("attachment; filename=");
				fileName.append(downloadLinkName);
				fileName.append(".pdf");
				final StreamingOutput stream = new StreamingOutput() {
					@Override
					public void write(OutputStream output) throws IOException {
						output.write(exportData);
					}
				};
				Response outputFileResponse = Response.ok(stream).header("Content-Disposition", fileName).build();
				return outputFileResponse;
			} else {
				return Response.serverError().build();
			}
		} catch (IOException e) {
			e.printStackTrace();
			return Response.serverError().build();
		}
	}

	public static String mergeFiles(String[] filePaths) throws IOException {
		// Limiting this solution to merge only max 3 files
		int numberOfFiles = filePaths.length;
		if (numberOfFiles == 0 || numberOfFiles == 1) {
			return null;
		} else {
			String firstFilePath = filePaths[0];
			int index = firstFilePath.indexOf(".pdf");
			String firstFilePathWithOutExtension = firstFilePath.substring(0, index);

			File file1 = new File(filePaths[0]);
			PDDocument doc1 = PDDocument.load(file1);

			File file2 = new File(filePaths[1]);
			PDDocument doc2 = PDDocument.load(file2);

			File file3 = null;
			PDDocument doc3 = null;
			if (numberOfFiles == 3) {
				file3 = new File(filePaths[2]);
				doc3 = PDDocument.load(file3);
			}
			// Instantiating PDFMergerUtility class
			PDFMergerUtility PDFmerger = new PDFMergerUtility();

			// Setting the destination file
			PDFmerger.setDestinationFileName(firstFilePathWithOutExtension + "-merged.pdf");

			// adding the source files
			PDFmerger.addSource(file1);
			PDFmerger.addSource(file2);
			if (numberOfFiles == 3) {
				PDFmerger.addSource(file3);
			}
			// Merging the two documents
			PDFmerger.mergeDocuments(null);

			System.out.println("Documents merged");
			// Closing the documents
			doc1.close();
			doc2.close();
			if(doc3 != null) {
				doc3.close();
			}
			
			return firstFilePathWithOutExtension;
		}
	}

	@POST
	@Path("/uploadForMerge")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadForMerge(final @Context HttpServletRequest servletRequest,
			final @Context HttpServletResponse servletResponse,
			final @FormDataParam("filesUpload") List<FormDataBodyPart> uploadedfiles,
			final @FormDataParam("filesUpload") FormDataContentDisposition fileDetail) {

		String UPLOADED_FOLDER = System.getProperty("java.io.tmpdir");
		System.out.println("UPLOADED_FOLDER for File Merge:::>>" + UPLOADED_FOLDER);
		String[] filePaths = null;
		int i = 0;
		try {
			
			if(uploadedfiles!=null) {
				int numberOfFiles = uploadedfiles.size();
				filePaths = new String [numberOfFiles];
			     for (int j = 0; j < uploadedfiles.size(); j++) {
		          if (uploadedfiles.isEmpty()) {
						continue; // next pls
					}
					try {
						FormDataBodyPart this_formDataBodyPartFile = uploadedfiles.get(i);
						ContentDisposition this_contentDispositionHeader = this_formDataBodyPartFile.getContentDisposition();
						InputStream this_fileInputStream = this_formDataBodyPartFile.getValueAs(InputStream.class);
						FormDataContentDisposition fileDetails = (FormDataContentDisposition) this_contentDispositionHeader;
						String fileName = fileDetails.getFileName();
						java.nio.file.Path path = Paths.get(UPLOADED_FOLDER + fileName);
						byte[] bytes = IOUtils.toByteArray(this_fileInputStream); 
						Files.write(path, bytes);
						filePaths[i] = UPLOADED_FOLDER + fileDetails.getFileName();
						i++;
					} catch (IOException e) {
						e.printStackTrace();
						return Response.serverError().build();
					}
			     }
			} 
			String firstFilePathWithOutExtension = mergeFiles(filePaths);
			String downloadLinkName = firstFilePathWithOutExtension + "-merged";
			String downloadLink = firstFilePathWithOutExtension + "-merged.pdf";
			if (null == firstFilePathWithOutExtension) {
				return Response.serverError().build();
			} else {
				int nameLength = downloadLinkName.length();
				int slashFromLast = -1;
				if (downloadLinkName.contains("/")) {
					slashFromLast = downloadLinkName.lastIndexOf("/");
				} else if (downloadLinkName.contains("\\")) {
					slashFromLast = downloadLinkName.lastIndexOf("\\");
				}
				downloadLinkName = downloadLinkName.substring(slashFromLast + 1, nameLength);
				java.nio.file.Path splitFilePath = Paths.get(downloadLink);
				final byte[] exportData = Files.readAllBytes(splitFilePath);
				final StringBuilder fileName = new StringBuilder("attachment; filename=");
				fileName.append(downloadLinkName);
				fileName.append(".pdf");
				final StreamingOutput stream = new StreamingOutput() {
					@Override
					public void write(OutputStream output) throws IOException {
						output.write(exportData);
					}
				};
				Response outputFileResponse = Response.ok(stream).header("Content-Disposition", fileName).build();
				return outputFileResponse;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return Response.serverError().build();
		}
	}

}
