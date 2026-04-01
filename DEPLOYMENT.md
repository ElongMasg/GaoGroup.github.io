# 🚀 部署指南

本指南将帮助你将课题组网站部署到不同的平台。

## 📋 前提条件

- 网站文件完整（HTML、CSS、JavaScript）
- 现代浏览器
- 可选：GitHub 账户（用于 GitHub Pages 部署）

## 🌐 部署选项

### 选项1: GitHub Pages (推荐)

#### 步骤1: 创建 GitHub 仓库
1. 登录 GitHub 账户
2. 点击 "New repository"
3. 输入仓库名称，如：`research-group-website`
4. 选择 "Public"（公开）
5. 点击 "Create repository"

#### 步骤2: 上传文件
```bash
# 克隆仓库到本地
git clone https://github.com/yourusername/research-group-website.git
cd research-group-website

# 复制网站文件到仓库目录
cp -r /path/to/your/website/* .

# 提交并推送文件
git add .
git commit -m "Initial commit: Research group website"
git push origin main
```

#### 步骤3: 启用 GitHub Pages
1. 进入仓库设置 (Settings)
2. 找到 "Pages" 部分
3. 在 "Source" 下选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 "Save"
5. 等待几分钟，GitHub 会生成网站链接

#### 步骤4: 访问网站
- 网站地址: `https://yourusername.github.io/research-group-website`
- 可以在设置中自定义域名

### 选项2: Netlify (免费且简单)

#### 步骤1: 注册 Netlify
1. 访问 [Netlify](https://www.netlify.com/)
2. 使用 GitHub 账户登录

#### 步骤2: 部署网站
1. 点击 "New site from Git"
2. 选择 GitHub 作为 Git provider
3. 选择你的仓库
4. 配置构建设置：
   - Build command: 留空（静态网站）
   - Publish directory: `/`
5. 点击 "Deploy site"

#### 步骤3: 访问网站
- Netlify 会自动生成域名，如：`your-site-name.netlify.app`
- 可以在设置中自定义域名

### 选项3: Vercel

#### 步骤1: 注册 Vercel
1. 访问 [Vercel](https://vercel.com/)
2. 使用 GitHub 账户登录

#### 步骤2: 导入项目
1. 点击 "Add New..." → "Project"
2. 选择你的 GitHub 仓库
3. 配置项目设置：
   - Framework Preset: "Other"
   - Root Directory: `/`
4. 点击 "Deploy"

#### 步骤3: 访问网站
- Vercel 会自动生成域名
- 支持自定义域名配置

### 选项4: 传统 Web 服务器

#### Apache 服务器
```bash
# 将文件复制到 Apache 的 web 目录
sudo cp -r * /var/www/html/

# 设置正确的权限
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

#### Nginx 服务器
```nginx
# nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/research-group-website;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 🔧 自定义配置

### 自定义域名

#### GitHub Pages
1. 在项目根目录创建 `CNAME` 文件
2. 写入你的域名：`research.youruniversity.edu.cn`
3. 在域名提供商处配置 DNS：
   ```
   A记录 -> 185.199.108.153
   A记录 -> 185.199.109.153
   A记录 -> 185.199.110.153
   A记录 -> 185.199.111.153
   ```

#### Netlify/Vercel
1. 在控制台设置中点击 "Domain settings"
2. 添加自定义域名
3. 按照提示配置 DNS

### SSL 证书

- **GitHub Pages**: 自动提供 HTTPS
- **Netlify**: 自动提供 HTTPS
- **Vercel**: 自动提供 HTTPS
- **传统服务器**: 需要手动配置 Let's Encrypt

## 📱 移动端优化

### 测试不同设备
1. 使用浏览器开发者工具的设备模拟功能
2. 在真实设备上测试
3. 检查以下断点：
   - 手机: 320px - 480px
   - 平板: 768px - 1024px
   - 桌面: 1200px+

### 性能优化

#### 图片优化
```bash
# 如果有图片，使用以下工具压缩
# tinypng.com (在线工具)
# ImageOptim (Mac)
# pngquant (命令行工具)
```

#### 缓存策略
```html
<!-- 在 .htaccess 中添加缓存规则 -->
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/* "access plus 1 month"
</IfModule>
```

## 🔍 SEO 优化

### 元标签优化
确保 `index.html` 包含以下元标签：
```html
<meta name="description" content="智能计算课题组专注于人工智能、机器学习和数据科学的创新研究">
<meta name="keywords" content="人工智能, 机器学习, 深度学习, 计算机视觉, 自然语言处理">
<meta name="author" content="智能计算课题组">
```

### 结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  "name": "智能计算课题组",
  "url": "https://your-domain.com",
  "description": "专注于人工智能领域的创新研究与应用"
}
</script>
```

## 📊 网站分析

### Google Analytics
```html
<!-- 在 </head> 前添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 百度统计
```html
<!-- 在 </head> 前添加 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your_baidu_id";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

## 🔄 更新和维护

### 内容更新
1. 修改本地文件
2. 推送到 Git 仓库
3. 平台会自动重新部署

### 定期维护
- 检查链接是否有效
- 更新团队成员信息
- 添加新的研究成果
- 优化移动端体验

## 🚨 故障排除

### 常见问题

#### 网站无法访问
- 检查 DNS 配置是否正确
- 确认服务器是否正常运行
- 检查防火墙设置

#### 样式不加载
- 确认 CSS 文件路径正确
- 检查浏览器控制台错误
- 清除浏览器缓存

#### 移动端显示异常
- 检查 viewport 设置
- 验证媒体查询语法
- 测试不同设备

### 获取帮助
- 查看浏览器开发者工具控制台
- 检查网络请求状态
- 验证 HTML/CSS 语法

## 📞 技术支持

如果在部署过程中遇到问题，可以：
- 查看各平台的官方文档
- 在 GitHub Issues 中提问
- 联系网站开发团队

---

**祝你的课题组网站部署成功！** 🎉