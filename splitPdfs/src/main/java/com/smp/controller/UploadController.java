package com.smp.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.StringJoiner;

import javax.servlet.http.HttpServletRequest;

import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class UploadController {

    private static String UPLOADED_FOLDER = "C:/ankit/upload/";
    
    @GetMapping("/")
    public String index() {
        return "home";
    }
    
    @GetMapping("/split")
    public String goToHome() {
        return "split";
    }
    
    @GetMapping("/uploadStatus")
    public String uploadStatus() {
        return "uploadStatus";
    }
    
    @GetMapping("/merge")
    public String goToMerge() {
        return "merge";
    }
    
	public static String split(int startPage, int endPage,String filePath,HttpServletRequest request) {
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
			PDFmerger.setDestinationFileName(filePathWithOutExtension+"-split.pdf");
			
			// Save each page as an individual PDF doc and name it incrementally
			int i = 1;
			while (iterator.hasNext()) {
				PDDocument pd = iterator.next();
				String filePathWithExtension = filePathWithOutExtension + i++ + ".pdf";
				System.out.println("fileName:::"+filePathWithExtension);
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
    
    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
    		@RequestParam(value="startPageNumber") int startPageNumber,
    		@RequestParam(value="endPageNumber") int endPageNumber,
    		RedirectAttributes redirectAttributes,
    		HttpServletRequest request) {
    	
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }
        System.out.println("User entered start page Number: :"+startPageNumber);
        System.out.println("User entered end page Number: :"+endPageNumber);
        
        try {

            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);
            System.out.println("File "+file.getOriginalFilename()+" uploaded");
            
            String filePath = UPLOADED_FOLDER + file.getOriginalFilename();
			// Loading an existing PDF document
			
            //now call the split function 
            String splitFileName = split(startPageNumber, endPageNumber, filePath, request);
            String downloadLinkName = splitFileName+"-split";
            String downloadLink = splitFileName+"-split.pdf";
            if(null != splitFileName){
            	int nameLength = downloadLinkName.length();
            	int slashFromLast = downloadLinkName.lastIndexOf("/");
            	downloadLinkName = downloadLinkName.substring(slashFromLast+1, nameLength);
            	
            	redirectAttributes.addFlashAttribute("statusMessage", "File '" + file.getOriginalFilename() + "' Splitted successfully.");
                redirectAttributes.addFlashAttribute("downloadLink", downloadLink);
                redirectAttributes.addFlashAttribute("downloadLinkName", downloadLinkName);
            }else {
            	redirectAttributes.addFlashAttribute("statusMessage", "Something Went wrong , Please try again");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "redirect:/uploadStatus";
    }

    public static String mergeFiles(String[] filePaths) throws IOException {
    	//Limiting this solution to merge only max 3 files 
    	int numberOfFiles = filePaths.length;
    	if(numberOfFiles == 0 || numberOfFiles == 1){
    		return null;
    	}else {
    		String firstFilePath = filePaths[0];
            int index = firstFilePath.indexOf(".pdf");
			String firstFilePathWithOutExtension = firstFilePath.substring(0, index);
			
    		File file1  = new File(filePaths[0]);
    		PDDocument doc1 = PDDocument.load(file1);
    		
    		File file2 = new File(filePaths[1]);
            PDDocument doc2 = PDDocument.load(file2);
            
            File file3 = null;
            PDDocument doc3 = null;
    		if(numberOfFiles == 3) {
    			file3 = new File(filePaths[2]);
                doc3 = PDDocument.load(file3);
    		}	
            //Instantiating PDFMergerUtility class
            PDFMergerUtility PDFmerger = new PDFMergerUtility();

            //Setting the destination file
            PDFmerger.setDestinationFileName(firstFilePathWithOutExtension+"-merged.pdf");

            //adding the source files
            PDFmerger.addSource(file1);
            PDFmerger.addSource(file2);
            if(numberOfFiles == 3) {
            	PDFmerger.addSource(file3);
            }
            //Merging the two documents
            PDFmerger.mergeDocuments(null);

            System.out.println("Documents merged");
            //Closing the documents
            doc1.close();
            doc2.close();
            doc3.close();
            
			
            return firstFilePathWithOutExtension;
    	}
        
     }
    
    @PostMapping("/uploadForMerge")
    public String multiFileUpload(@RequestParam("files") MultipartFile[] files,
                                  RedirectAttributes redirectAttributes) {

        StringJoiner sj = new StringJoiner(" , ");
        String[] filePaths = new String[3];
        int i=0;
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue; //next pls
            }
            try {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
                Files.write(path, bytes);
                filePaths[i] = UPLOADED_FOLDER + file.getOriginalFilename();
                sj.add(file.getOriginalFilename());
                i++;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        String uploadedFileName = sj.toString();
        if (StringUtils.isEmpty(uploadedFileName)) {
            redirectAttributes.addFlashAttribute("statusMessage", "Please select a file to upload");
        } else {
        	try {
				String firstFilePathWithOutExtension = mergeFiles(filePaths);
				String downloadLinkName = firstFilePathWithOutExtension+"-merged";
	            String downloadLink = firstFilePathWithOutExtension+"-merged.pdf";
				if(null == firstFilePathWithOutExtension) {
					redirectAttributes.addFlashAttribute("statusMessage", "Somethig went wrong , Please try again");
				}else {
					int nameLength = downloadLinkName.length();
	            	int slashFromLast = downloadLinkName.lastIndexOf("/");
	            	downloadLinkName = downloadLinkName.substring(slashFromLast+1, nameLength);
	            	
					redirectAttributes.addFlashAttribute("statusMessage", "You successfully merged the uploaded '" + uploadedFileName + "' files");
					redirectAttributes.addFlashAttribute("downloadLink", downloadLink);
	                redirectAttributes.addFlashAttribute("downloadLinkName", downloadLinkName);
				}
			} catch (IOException e) {
				redirectAttributes.addFlashAttribute("statusMessage", "Somethig went wrong , Please try again");
				e.printStackTrace();
			}
        }
        return "redirect:/uploadStatus";

    }
}