package com.sl.ms.web.driver.controller;

import com.sl.transport.common.service.AliOssService;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * 文件上传服务
 */
@RestController
@RequestMapping("/files")
@Api(value = "File", tags = "文件上传相关接口")
public class FileUploadController {

    @Resource
    private AliOssService aliOssService;

    @ApiOperation(value = "文件上传")
    @PostMapping("/upload")
    public R<String> upload(@RequestPart("file") MultipartFile file) {
        return R.success(aliOssService.upload(file));
    }

    @ApiOperation(value = "图片上传")
    @PostMapping("/imageUpload")
    public R<String> imageUpload(@RequestPart("file") MultipartFile file) {
        return R.success(aliOssService.uploadImage(file));
    }
}
