# 🚀 快速开始指南

## 📋 30秒快速部署

### 方法1: 直接本地运行（最快）

1. **打开网站**
   ```bash
   # 双击 index.html 文件，或在终端中运行：
   open index.html  # Mac
   start index.html # Windows
   xdg-open index.html # Linux
   ```

2. **开始使用**
   - 浏览各个页面
   - 点击"管理后台"体验编辑功能
   - 所有数据保存在浏览器本地

### 方法2: 一键部署到GitHub Pages

1. **准备工作**
   ```bash
   # 克隆或下载网站文件到本地
   git clone https://github.com/yourusername/research-group-website.git
   cd research-group-website
   ```

2. **运行部署脚本**
   ```bash
   # 给脚本添加执行权限
   chmod +x deploy.sh
   
   # 初始化并部署（替换yourusername为你的GitHub用户名）
   ./deploy.sh -i -u yourusername -d -p github
   ```

3. **完成**
   - 脚本会自动推送到GitHub
   - 在GitHub仓库设置中启用Pages
   - 网站地址：`https://yourusername.github.io/research-group-website`

## 🎯 5分钟功能体验

### 体验1: 浏览网站
1. 打开 `index.html`
2. 点击导航栏浏览不同页面
3. 查看响应式设计（调整浏览器大小）

### 体验2: 管理功能
1. 点击"管理后台"
2. 在"成员管理"中添加新成员
3. 在"论文管理"中添加新论文
4. 在"系统设置"中修改网站信息

### 体验3: 数据筛选
1. 在"团队成员"页面点击不同职位筛选
2. 在"学术成果"页面点击不同类型筛选
3. 观察动态过滤效果

## 🔧 自定义配置

### 修改课题组信息
```javascript
// 打开 js/data.js
// 修改 getInitialMembers() 中的示例数据
// 修改 getInitialPublications() 中的示例论文
```

### 修改网站标题和描述
```html
<!-- 打开 index.html -->
<!-- 修改 <title> 标签 -->
<title>你的课题组名称 | 你的副标题</title>

<!-- 修改 meta description -->
<meta name="description" content="你的课题组描述">
```

### 修改配色方案
```css
/* 打开 css/styles.css */
/* 修改主要颜色变量 */
.logo h1 {
    background: linear-gradient(135deg, #你的颜色, #你的颜色);
}
```

## 📱 移动设备测试

### 手机端测试
1. 在手机浏览器中打开网站
2. 测试导航菜单的响应式表现
3. 验证触摸操作的友好性

### 平板端测试
1. 在平板或浏览器中调整窗口大小
2. 检查网格布局的适配性
3. 测试表单输入的便利性

## 🛠️ 常见问题快速解决

### 问题1: 网站打不开
- ✅ 检查文件路径是否正确
- ✅ 确保所有文件都在同一目录
- ✅ 尝试使用本地服务器

### 问题2: 样式不显示
- ✅ 检查浏览器是否支持现代CSS
- ✅ 清除浏览器缓存
- ✅ 验证CSS文件路径

### 问题3: 管理功能不工作
- ✅ 检查JavaScript是否启用
- ✅ 查看浏览器控制台错误
- ✅ 确保在本地服务器环境下运行

### 问题4: 数据不保存
- ✅ 检查浏览器是否支持LocalStorage
- ✅ 清除浏览器数据会重置所有信息
- ✅ 使用现代浏览器（Chrome、Firefox、Safari）

## 🚀 进阶使用

### 本地开发服务器
```bash
# 使用Python启动本地服务器
python3 -m http.server 8000
# 访问 http://localhost:8000

# 或使用Node.js
npx serve .
# 访问 http://localhost:3000
```

### 版本控制
```bash
# 初始化Git仓库
git init
git add .
git commit -m "Initial commit"

# 推送到远程仓库
git remote add origin https://github.com/yourusername/research-group-website.git
git push -u origin main
```

### 自定义域名
1. 购买域名
2. 在项目根目录创建 `CNAME` 文件
3. 写入你的域名：`research.yourdomain.com`
4. 在域名提供商处配置DNS

## 📞 获取帮助

### 快速检查清单
- [ ] 所有必需文件都存在
- [ ] 浏览器支持HTML5和CSS3
- [ ] JavaScript已启用
- [ ] 文件路径正确
- [ ] 网络连接正常

### 联系支持
- 查看 `README.md` 获取详细信息
- 阅读 `DEPLOYMENT.md` 了解部署选项
- 在浏览器开发者工具中查看错误信息

## 🎉 恭喜！

你现在已经成功搭建了一个功能完整的课题组网站！

**下一步建议：**
1. ✅ 自定义网站内容和样式
2. ✅ 部署到线上环境
3. ✅ 分享给团队成员
4. ✅ 定期更新内容

---

**智能计算课题组网站** - 让科研成果展示更简单！ 🚀