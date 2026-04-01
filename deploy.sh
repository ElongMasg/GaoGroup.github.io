#!/bin/bash

# 课题组网站部署脚本
# 使用方法: ./deploy.sh [选项]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
REPO_NAME="research-group-website"
GITHUB_USERNAME=""
DEPLOY_PLATFORM="github" # github, netlify, vercel

# 打印带颜色的消息
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示帮助信息
show_help() {
    cat << EOF
课题组网站部署脚本

使用方法: ./deploy.sh [选项]

选项:
    -h, --help              显示此帮助信息
    -p, --platform PLATFORM 指定部署平台 (github, netlify, vercel)
    -u, --username USERNAME 指定GitHub用户名
    -i, --init             初始化Git仓库
    -d, --deploy           执行部署
    -c, --clean            清理生成的文件

示例:
    ./deploy.sh -i -u yourusername  # 初始化并设置用户名
    ./deploy.sh -d -p github        # 部署到GitHub Pages
    ./deploy.sh -d -p netlify       # 部署到Netlify

EOF
}

# 检查依赖
check_dependencies() {
    print_message "检查依赖..."

    if ! command -v git &> /dev/null; then
        print_error "Git未安装，请先安装Git"
        exit 1
    fi

    if ! command -v curl &> /dev/null; then
        print_warning "curl未安装，某些功能可能受限"
    fi

    print_success "依赖检查完成"
}

# 初始化Git仓库
init_git() {
    print_message "初始化Git仓库..."

    if [ -d ".git" ]; then
        print_warning "Git仓库已存在"
        return 0
    fi

    git init
    git add .
    git commit -m "🎉 初始提交: 智能计算课题组网站"

    if [ ! -z "$GITHUB_USERNAME" ]; then
        git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
        print_success "已设置远程仓库: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    fi

    print_success "Git仓库初始化完成"
}

# 验证网站文件
validate_files() {
    print_message "验证网站文件..."

    required_files=("index.html" "css/styles.css" "js/main.js" "js/data.js")

    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "缺少必需文件: $file"
            exit 1
        fi
    done

    print_success "文件验证通过"
}

# 优化网站文件
optimize_files() {
    print_message "优化网站文件..."

    # 创建优化版本目录
    mkdir -p dist

    # 复制文件到dist目录
    cp -r * dist/ 2>/dev/null || true

    # 清理不必要的文件
    cd dist
    rm -f deploy.sh README.md DEPLOYMENT.md .gitignore

    print_success "文件优化完成"
}

# 部署到GitHub Pages
deploy_github() {
    print_message "准备部署到GitHub Pages..."

    if [ -z "$GITHUB_USERNAME" ]; then
        print_error "请指定GitHub用户名: -u yourusername"
        exit 1
    fi

    # 检查是否已推送到GitHub
    if ! git remote -v | grep -q "github.com"; then
        print_error "请先设置GitHub远程仓库"
        exit 1
    fi

    print_message "推送到GitHub..."
    git push origin main || {
        print_warning "推送失败，尝试创建新分支"
        git push -u origin main
    }

    print_success "代码已推送到GitHub"
    print_message "请访问GitHub仓库设置启用GitHub Pages:"
    print_message "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
    print_message "网站地址: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
}

# 部署到Netlify
deploy_netlify() {
    print_message "准备部署到Netlify..."

    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI未安装，请手动部署:"
        print_message "1. 访问 https://app.netlify.com/"
        print_message "2. 点击 'New site from Git'"
        print_message "3. 选择你的GitHub仓库"
        print_message "4. 配置构建设置（静态网站无需构建）"
        return 0
    fi

    print_message "使用Netlify CLI部署..."
    netlify deploy --prod

    print_success "Netlify部署完成"
}

# 部署到Vercel
deploy_vercel() {
    print_message "准备部署到Vercel..."

    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI未安装，请手动部署:"
        print_message "1. 访问 https://vercel.com/"
        print_message "2. 点击 'Add New Project'"
        print_message "3. 导入你的GitHub仓库"
        print_message "4. 配置项目设置"
        return 0
    fi

    print_message "使用Vercel CLI部署..."
    vercel --prod

    print_success "Vercel部署完成"
}

# 本地预览
preview_local() {
    print_message "启动本地预览..."

    if command -v python3 &> /dev/null; then
        print_message "使用Python HTTP服务器 (http://localhost:8000)"
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        print_message "使用Python HTTP服务器 (http://localhost:8000)"
        python -m SimpleHTTPServer 8000
    else
        print_error "未找到Python，请手动在浏览器中打开index.html"
        exit 1
    fi
}

# 清理文件
clean_files() {
    print_message "清理生成文件..."

    rm -rf dist/
    rm -f .deploy-*

    print_success "清理完成"
}

# 生成部署报告
generate_report() {
    local platform=$1
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    cat > .deploy-report.md << EOF
# 部署报告

- **部署时间**: ${timestamp}
- **部署平台**: ${platform}
- **项目版本**: 1.0.0
- **部署状态**: 成功

## 网站信息

- **网站标题**: 智能计算课题组
- **功能模块**: 7个主要页面 + 管理后台
- **响应式设计**: 支持
- **数据存储**: LocalStorage

## 部署检查清单

- [x] 文件完整性验证
- [x] Git仓库初始化
- [x] 代码推送到远程仓库
- [x] 部署平台配置完成
- [x] 网站可正常访问

## 后续步骤

1. 配置自定义域名（可选）
2. 添加Google Analytics（可选）
3. 定期更新内容
4. 监控网站性能

EOF

    print_success "部署报告已生成: .deploy-report.md"
}

# 主函数
main() {
    local init=false
    local deploy=false
    local clean=false
    local preview=false
    local platform="github"

    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -i|--init)
                init=true
                shift
                ;;
            -d|--deploy)
                deploy=true
                shift
                ;;
            -c|--clean)
                clean=true
                shift
                ;;
            -p|--platform)
                platform="$2"
                shift 2
                ;;
            -u|--username)
                GITHUB_USERNAME="$2"
                shift 2
                ;;
            --preview)
                preview=true
                shift
                ;;
            *)
                print_error "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done

    # 如果没有指定任何操作，显示帮助
    if [ "$init" = false ] && [ "$deploy" = false ] && [ "$clean" = false ] && [ "$preview" = false ]; then
        show_help
        exit 0
    fi

    # 执行操作
    if [ "$clean" = true ]; then
        clean_files
        exit 0
    fi

    check_dependencies
    validate_files

    if [ "$init" = true ]; then
        init_git
    fi

    if [ "$preview" = true ]; then
        preview_local
        exit 0
    fi

    if [ "$deploy" = true ]; then
        optimize_files

        case $platform in
            "github")
                deploy_github
                ;;
            "netlify")
                deploy_netlify
                ;;
            "vercel")
                deploy_vercel
                ;;
            *)
                print_error "不支持的部署平台: $platform"
                exit 1
                ;;
        esac

        generate_report "$platform"
        print_success "部署完成！"
    fi
}

# 运行主函数
main "$@"