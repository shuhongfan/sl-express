# 1、Jenkins介绍
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672210026851-5c09d3ce-bb7e-4140-9aef-b0c2278011c6.png#averageHue=%23e2dedd&clientId=ud7981093-2aea-4&from=paste&height=139&id=u46b4991d&name=image.png&originHeight=209&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=76590&status=done&style=shadow&taskId=ub4f7b119-5aff-4c71-a258-4bbaff7ac74&title=&width=476)
Jenkins 是一款流行的开源持续集成（Continuous Integration）工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。官网： [http://jenkins-ci.org/](http://jenkins-ci.org/)。
Jenkins的特征：

- 开源的 Java语言开发持续集成工具，支持持续集成，持续部署。
- 易于安装部署配置：可通过 yum安装,或下载war包以及通过docker容器等快速实现安装部署，可方便web界面配置管理。
- 消息通知及测试报告：集成 RSS/E-mail通过RSS发布构建结果或当构建完成时通过e-mail通知，生成JUnit/TestNG测试报告。
- 分布式构建：支持 Jenkins能够让多台计算机一起构建/测试。
- 文件识别： Jenkins能够跟踪哪次构建生成哪些jar，哪次构建使用哪个版本的jar等。
- 丰富的插件支持：支持扩展插件，你可以开发适合自己团队使用的工具，如 git，svn，maven，docker等。

Jenkins安装和持续集成环境配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672210072295-617c5616-0a60-476a-9205-2c69b2f04586.png#averageHue=%237eb60e&clientId=ud7981093-2aea-4&from=paste&height=278&id=u8147f98e&name=image.png&originHeight=417&originWidth=1208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162737&status=done&style=shadow&taskId=u0771606d-da9a-46bc-b5fa-5fcfca47b97&title=&width=805.3333333333334)

- 首先，开发人员每天进行代码提交，提交到Git仓库
- 然后，Jenkins作为持续集成工具，使用Git工具到Git仓库拉取代码到集成服务器，再配合JDK，Maven等软件完成代码编译，代码测试与审查，测试，打包等工作，在这个过程中每一步出错，都重新再执行一次整个流程。
- 最后，Jenkins把生成的jar或war包分发到测试服务器或者生产服务器，测试人员或用户就可以访问应用。
# 2、部署安装
在神领物流项目中采用Docker方式部署Jenkins，部署脚本如下：
```shell
docker run -d \
-p 8090:8080 \
-p 50000:50000 \
-v /usr/local/src/jenkins:/var/jenkins_home \
-v  /maven:/maven \
-v /etc/localtime:/etc/localtime \
-v /usr/bin/docker:/usr/bin/docker \
-v /var/run/docker.sock:/var/run/docker.sock \
--privileged \
--name jenkins \
-e TZ=Asia/Shanghai \
--restart=always \
--add-host=git.sl-express.com:192.168.150.101 \
--add-host=maven.sl-express.com:192.168.150.101 \
jenkins/jenkins:lts-jdk11
```
在部署脚本中指定了时区、hosts并且将宿主机的docker服务映射到容器内部。
访问地址：[http://jenkins.sl-express.com/](http://jenkins.sl-express.com/)  用户名密码为：root/123
# 3、系统配置
Jenkins安装完成后，需要进行一些配置才能正常使用。
## 3.1、配置Maven
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672212699428-a143ccc0-ecda-4bac-8b83-12db7ba3dced.png#averageHue=%23f8f8f8&clientId=ud7981093-2aea-4&from=paste&height=395&id=udbab59f3&name=image.png&originHeight=593&originWidth=531&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36748&status=done&style=shadow&taskId=u21724aff-16e9-4514-99e3-1942402a38a&title=&width=354)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672212719033-637cef91-7ee6-42d3-81fc-fa6d4b7e150b.png#averageHue=%23fefefe&clientId=ud7981093-2aea-4&from=paste&height=330&id=u4e59c18f&name=image.png&originHeight=495&originWidth=1316&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82675&status=done&style=shadow&taskId=uad33a848-6c47-4ff2-ae40-f1eb67b9d51&title=&width=877.3333333333334)
在【系统管理】中的【全局工具配置】中进行配置。
指定Maven配置文件：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672212787844-163d592f-82ed-44f2-8bdd-892f08cf67a1.png#averageHue=%23fefefe&clientId=ud7981093-2aea-4&from=paste&height=507&id=u25e50645&name=image.png&originHeight=761&originWidth=1343&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44366&status=done&style=shadow&taskId=u91749df2-8d57-404a-81ba-af9e150f624&title=&width=895.3333333333334)
配置文件内容如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings
    xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    
   <localRepository>/maven/repository</localRepository>

    <pluginGroups></pluginGroups>
    <proxies></proxies>

    <servers>
        <server>
            <id>sl-releases</id>
            <username>deployment</username>
            <password>deployment123</password>
        </server>
        <server>
            <id>sl-snapshots</id>
            <username>deployment</username>
            <password>deployment123</password>
        </server>
    </servers>
    
	<mirrors>
        <mirror>
            <id>mirror</id>
            <mirrorOf>central,jcenter,!sl-releases,!sl-snapshots</mirrorOf>
            <name>mirror</name>
            <url>https://maven.aliyun.com/nexus/content/groups/public</url>
        </mirror>
    </mirrors>
    
	<profiles>
        <profile>
            <id>sl</id>
            <properties>
                <altReleaseDeploymentRepository>
					sl-releases::default::http://maven.sl-express.com/nexus/content/repositories/releases/
				</altReleaseDeploymentRepository>
                <altSnapshotDeploymentRepository>
					sl-snapshots::default::http://maven.sl-express.com/nexus/content/repositories/snapshots/
				</altSnapshotDeploymentRepository>
            </properties>
        </profile>
    </profiles>
    
	<activeProfiles>
        <activeProfile>sl</activeProfile>
    </activeProfiles>

</settings>

```
## 3.2、配置Git
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672213032095-b513d947-5df4-498a-b3d4-111655e7f542.png#averageHue=%23fefefe&clientId=ud7981093-2aea-4&from=paste&height=479&id=u6e470d56&name=image.png&originHeight=718&originWidth=1280&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34645&status=done&style=shadow&taskId=u516af3c7-a91a-4a4a-91dd-775da67d72f&title=&width=853.3333333333334)
## 3.3、安装Gogs插件
我们使用的Git管理工具是Gogs，需要在用户提交代码之后触发自动构建，需要安装Gogs插件。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672213224083-014a2152-bf8e-40db-88c0-4b9bd847702a.png#averageHue=%23fefefe&clientId=ud7981093-2aea-4&from=paste&height=324&id=u5ecc49ce&name=image.png&originHeight=486&originWidth=1302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84071&status=done&style=shadow&taskId=ue5cb6581-cc8c-48b8-a8b9-bf6b752545c&title=&width=868)
搜索Gogs安装即可。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672213308896-2b56b7e1-b32d-4289-9f2f-ac16daae5cfd.png#averageHue=%23fafafa&clientId=ud7981093-2aea-4&from=paste&height=88&id=ucb5da071&name=image.png&originHeight=132&originWidth=955&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13304&status=done&style=shadow&taskId=u853e087c-7028-4b02-96cd-8ace3fe3fda&title=&width=636.6666666666666)
在Gogs中的仓库设置钩子，例如：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672216872852-e3210595-d8e7-42df-a760-b407e15d4958.png#averageHue=%23fafafa&clientId=ud7981093-2aea-4&from=paste&height=312&id=u5d94e61c&name=image.png&originHeight=468&originWidth=1135&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33439&status=done&style=shadow&taskId=u23f5be5b-a325-4d6d-88b8-1adbd330b65&title=&width=756.6666666666666)
格式：`http://jenkins.sl-express.com/gogs-webhook/?job=xxxx`
# 4、构建任务
在提供的虚拟机环境中虽然已经创建好了构建任务，如果不满足需求，可以执行创建任务，可以通过复制的方式完成。
首先点击【新建任务】：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672217494669-37bdb4af-0619-4a61-9a42-3898853da928.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=377&id=u851ce08a&name=image.png&originHeight=566&originWidth=463&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35714&status=done&style=shadow&taskId=uacc5ff77-1078-4123-b7bb-c483ae31ed5&title=&width=308.6666666666667)
输入任务的名称，建议名称就是微服务的名字。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223285357-27f76741-9473-4e8b-b9bb-e1a42d12264c.png#averageHue=%23c3ccd1&clientId=u3d3a2c4b-3da3-4&from=paste&height=160&id=ua1445f76&name=image.png&originHeight=240&originWidth=791&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20265&status=done&style=shadow&taskId=ua084654a-c081-45d0-b31f-a82643cebe7&title=&width=527.3333333333334)
选择已有的构建任务：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223317069-8c6b59ff-c8e7-41db-ab74-f99b69910e3f.png#averageHue=%23f2f5ef&clientId=u3d3a2c4b-3da3-4&from=paste&height=333&id=ufad289b6&name=image.png&originHeight=499&originWidth=907&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50324&status=done&style=shadow&taskId=u9d8cd9b0-2d2c-423b-bff2-fbd966556ff&title=&width=604.6666666666666)
输入任务的名称：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223360964-ab5618bd-4ea4-463d-ba05-f6a5332c7bdf.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=275&id=uae90fbfe&name=image.png&originHeight=413&originWidth=1323&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18586&status=done&style=shadow&taskId=uff336f37-4d0a-48dd-846a-83d6a52f95f&title=&width=882)
设置Gogs钩子：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223417593-c9b31c2b-f992-4450-8172-c4dac017e558.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=285&id=uee8250bc&name=image.png&originHeight=428&originWidth=1318&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36563&status=done&style=shadow&taskId=u50881726-afe5-4c04-a9e2-dec95c9770e&title=&width=878.6666666666666)
设置构建参数，主要用于构建时的脚本使用：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223459770-ce14e0e4-340b-4693-a760-e2f275f2b29e.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=463&id=ue6bbfc6a&name=image.png&originHeight=694&originWidth=1286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39656&status=done&style=shadow&taskId=u88fcdc74-2ca1-4a21-9f54-cfe2805fc21&title=&width=857.3333333333334)
设置git地址，每个项目都不一样，一定要修改！
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223518390-c7dcce43-1370-43a3-a2b5-0d7c5b027a6b.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=530&id=u984b134f&name=image.png&originHeight=795&originWidth=1302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45846&status=done&style=shadow&taskId=u60cf4056-2002-4cc1-a3a5-81c117e4357&title=&width=868)
设置构建开始前将workspace删除，确保没有之前编译产物的干扰：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672223565505-b93b653f-ad2e-4314-a729-9d209a779b12.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=426&id=uf9fd108f&name=image.png&originHeight=639&originWidth=931&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42250&status=done&style=shadow&taskId=u7e22de1d-a4ab-46f2-835b-f12a76a21da&title=&width=620.6666666666666)
设置ssh执行命令，主要是宿主机安装的docker服务具备权限，可以在容器内执行：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672224209134-2f2c031e-0c2e-434d-9fae-ee946a064439.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=475&id=u28ed19e9&name=image.png&originHeight=712&originWidth=1282&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41479&status=done&style=shadow&taskId=u40103788-709e-4071-ba68-04a054aa9eb&title=&width=854.6666666666666)
设置maven打包命令：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672224358557-000ee2c1-392b-4a41-8273-c21203d3843b.png#averageHue=%23fefefe&clientId=u3d3a2c4b-3da3-4&from=paste&height=305&id=u092b8f47&name=image.png&originHeight=458&originWidth=1248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27920&status=done&style=shadow&taskId=u6c90488b-8fe8-4660-9038-b3c27ff7777&title=&width=832)
设置部署的ssh脚本，主要是完成微服务打包成docker镜像进行部署：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672224408294-2b9a586f-bdb6-4a21-a69c-1325b87cda7a.png#averageHue=%23fdfdfd&clientId=u3d3a2c4b-3da3-4&from=paste&height=528&id=ue2e7604e&name=image.png&originHeight=792&originWidth=1248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58046&status=done&style=shadow&taskId=uf5611e41-6683-4342-bf71-37af47c3b4f&title=&width=832)
执行命令如下：
```shell
#!/bin/bash
# 微服务名称
SERVER_NAME=${serverName}

# 服务版本
SERVER_VERSION=${version}

# 服务版本
SERVER_PORT=${port}

# 源jar名称，mvn打包之后，target目录下的jar包名称
JAR_NAME=$SERVER_NAME-$SERVER_VERSION

# jenkins下的目录
JENKINS_HOME=/var/jenkins_home/workspace/$SERVER_NAME

cd $JENKINS_HOME

# 修改文件权限
chmod 755 target/$JAR_NAME.jar

docker -v

echo "---------停止容器（$SERVER_NAME）---------"
docker stop $SERVER_NAME

echo "---------删除容器（$SERVER_NAME）---------"
docker rm $SERVER_NAME

echo "---------删除镜像（$SERVER_NAME:$SERVER_VERSION）---------"
docker rmi $SERVER_NAME:$SERVER_VERSION

echo "---------打包镜像（$SERVER_NAME:$SERVER_VERSION）---------"
docker build -t $SERVER_NAME:$SERVER_VERSION .

echo "---------运行服务---------"
docker run -d -p $SERVER_PORT:8080 --name $SERVER_NAME -e SERVER_PORT=8080 -e SPRING_CLOUD_NACOS_DISCOVERY_IP=${SPRING_CLOUD_NACOS_DISCOVERY_IP} -e  SPRING_CLOUD_NACOS_DISCOVERY_PORT=${port} -e SPRING_PROFILES_ACTIVE=stu $SERVER_NAME:$SERVER_VERSION
```
最后，保存即可。
