package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;

@CrossOrigin(origins="http://localhost:3000",allowedHeaders="*")
@RestController
@RequestMapping(value="/api/test")
public class SpeedTestController {
	
	@GetMapping("/")
	public String ping() {
		return("hello");
	}
	
	 @GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
	    public void downloadImage(
	            @PathVariable("imageName") String imageName,
	            HttpServletResponse response
	    ) throws IOException {

	        InputStream resource = this.fileService.getResource(path, imageName);
	        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
	        StreamUtils.copy(resource,response.getOutputStream())   ;

	    }
	
	

}
