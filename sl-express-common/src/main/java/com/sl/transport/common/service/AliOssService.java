package com.sl.transport.common.service;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.ObjectUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Data
@AllArgsConstructor
@Slf4j
public class AliOssService {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    /**
     * 文件上传
     *
     * @param file 源文件
     * @return 文件访问路径
     */
    public String upload(MultipartFile file) {
        //获得原始文件名
        String originalFilename = file.getOriginalFilename();
        //获得文件扩展名
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = UUID.randomUUID() + extension;

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        StringBuilder stringBuilder = new StringBuilder("https://");

        try {
            // 创建PutObject请求。
            ossClient.putObject(bucketName, fileName, new ByteArrayInputStream(file.getBytes()));

            //文件访问路径规则 https://BucketName.Endpoint/ObjectName
            stringBuilder
                    .append(bucketName)
                    .append(".")
                    .append(endpoint)
                    .append("/")
                    .append(fileName);
        } catch (OSSException oe) {
            log.error("阿里OSS异常，Error Message:{}", oe.getErrorMessage());
        } catch (ClientException ce) {
            log.error("阿里OSS Client异常，Error Message:{}", ce.getMessage());
        } catch (IOException ie) {
            log.error("文件上传IO异常，Error Message:{}", ie.getMessage());
        } finally {
            if (ObjectUtil.isNotEmpty(ossClient)) {
                ossClient.shutdown();
            }
        }

        return stringBuilder.toString();
    }

    /**
     * 图片上传
     *
     * @param file 图片文件
     * @return 文件访问路径
     */
    public String uploadImage(MultipartFile file) {
        try {
            //校验是否为图片文件
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
            if (bufferedImage == null) {
                throw new SLException("上传图片大小不能超过5M，格式需为jpg、png、gif");
            }
        } catch (IOException e) {
            log.error("文件上传IO异常，Error Message:{}", e.getMessage());
        }

        //文件上传并获取访问路径
        return this.upload(file);
    }
}