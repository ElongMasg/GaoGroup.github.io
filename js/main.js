// 主应用程序逻辑
class ResearchGroupWebsite {
    constructor() {
        this.currentSection = 'home';
        this.isAdmin = false; // 管理员状态
        this.adminPassword = 'admin123'; // 管理密码（实际部署时应使用更安全的方案）
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadContent();
        this.setupNavigation();
        this.updateStats();
        this.checkAdminStatus();
    }

    bindEvents() {
        // 导航链接点击事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('href').substring(1);
                this.navigateToSection(section);
            });
        });

        // 移动端菜单
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }

        // 滚动事件
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // 人员筛选
        document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterPeople(filter);

                // 更新按钮状态
                document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 论文筛选
        document.querySelectorAll('.publications-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterPublications(filter);

                // 更新按钮状态
                document.querySelectorAll('.publications-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 管理后台导航
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.getAttribute('data-tab');
                this.switchAdminTab(tab);
            });
        });

        // 联系表单提交
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e);
            });
        }

        // 管理登录表单提交
        const adminLoginForm = document.getElementById('adminLoginForm');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAdminLogin(e);
            });
        }

        // 设置表单提交
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSettingsSubmit(e);
            });
        }
    }

    setupNavigation() {
        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleScroll() {
        // 导航栏滚动效果
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 更新活跃导航链接
        const sections = ['home', 'about', 'people', 'research', 'publications', 'news', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    this.updateActiveNavLink(section);
                    break;
                }
            }
        }
    }

    updateActiveNavLink(section) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkSection = link.getAttribute('href').substring(1);
            if (linkSection === section) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navigateToSection(section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // 关闭移动端菜单
        document.querySelector('.nav-links')?.classList.remove('show');
    }

    loadContent() {
        // 确保DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadPeople();
                this.loadPublications();
                this.loadSettings();
            });
        } else {
            this.loadPeople();
            this.loadPublications();
            this.loadSettings();
        }
    }

    loadPeople() {
        const people = dataManager.getMembers();
        const peopleGrid = document.getElementById('peopleGrid');
        const membersTableBody = document.getElementById('membersTableBody');

        if (peopleGrid) {
            if (people.length === 0) {
                peopleGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #6b7280;">暂无人员信息</div>';
            } else {
                peopleGrid.innerHTML = people.map(person => this.renderPersonCard(person)).join('');
            }
        }

        if (membersTableBody) {
            if (people.length === 0) {
                membersTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #6b7280;">暂无人员信息</td></tr>';
            } else {
                membersTableBody.innerHTML = people.map(person => this.renderMemberTableRow(person)).join('');
            }
        }
    }

    loadPublications() {
        const publications = dataManager.getPublications();
        const publicationsList = document.getElementById('publicationsList');
        const publicationsTableBody = document.getElementById('publicationsTableBody');

        if (publicationsList) {
            publicationsList.innerHTML = publications.map(pub => this.renderPublicationItem(pub)).join('');
        }

        if (publicationsTableBody) {
            publicationsTableBody.innerHTML = publications.map(pub => this.renderPublicationTableRow(pub)).join('');
        }
    }

    loadSettings() {
        const settings = dataManager.getSettings();
        document.getElementById('groupName').value = settings.groupName || '';
        document.getElementById('groupDescription').value = settings.groupDescription || '';
        document.getElementById('groupContact').value = settings.groupContact || '';
    }

    updateStats() {
        const stats = dataManager.getStats();
        const memberCountEl = document.getElementById('memberCount');
        const publicationCountEl = document.getElementById('publicationCount');
        if (memberCountEl) {
            memberCountEl.textContent = stats.memberCount;
        }
        if (publicationCountEl) {
            publicationCountEl.textContent = stats.publicationCount;
        }
    }

    checkAdminStatus() {
        // 检查URL参数中是否有admin访问
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');

        if (adminParam === 'true') {
            this.showAdminLogin();
        }

        // 根据管理员状态显示/隐藏管理后台
        this.toggleAdminSection();
    }

    toggleAdminSection() {
        const adminSection = document.getElementById('admin');
        if (adminSection) {
            if (this.isAdmin) {
                adminSection.style.display = 'block';
            } else {
                adminSection.style.display = 'none';
            }
        }
    }

    renderPersonCard(person) {
        const positionNames = {
            professor: '教授',
            phd: '博士生',
            master: '硕士生',
            postdoc: '博士后'
        };

        const researchAreas = person.research ? person.research.split(',').map(area => area.trim()) : [];

        return `
            <div class="person-card" data-position="${person.position}" onclick="window.location.href='profile.html?id=${person.id}'">
                <div class="avatar">${person.name.charAt(0)}</div>
                <h3>${person.name}</h3>
                <span class="person-role">${positionNames[person.position] || person.position}</span>
                <p>${person.bio || '暂无简介'}</p>
                <div class="person-research">
                    ${researchAreas.map(area => `<span class="research-tag">${area}</span>`).join('')}
                </div>
                <a href="mailto:${person.email}" class="person-email">
                    <i class="fas fa-envelope"></i> ${person.email}
                </a>
            </div>
        `;
    }

    renderMemberTableRow(person) {
        const positionNames = {
            professor: '教授',
            phd: '博士生',
            master: '硕士生',
            postdoc: '博士后'
        };

        return `
            <tr>
                <td><input type="checkbox" value="${person.id}" onclick="document.getElementById('selectAllMembers').checked = false;"></td>
                <td>${person.name}</td>
                <td>${positionNames[person.position] || person.position}</td>
                <td>${person.research || '暂无'}</td>
                <td>${person.email}</td>
                <td>${person.education || '暂无'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editMember('${person.id}')">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteMember('${person.id}')">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </td>
            </tr>
        `;
    }

    renderPublicationItem(publication) {
        const typeNames = {
            journal: '期刊论文',
            conference: '会议论文',
            preprint: '预印本'
        };

        return `
            <div class="publication-item" data-type="${publication.type}">
                <div class="publication-header">
                    <h3 class="publication-title">${publication.title}</h3>
                </div>
                <div class="publication-meta">
                    <span class="publication-authors">${publication.authors}</span>
                    <span class="publication-journal">${publication.journal}</span>
                    <span class="publication-year">${publication.year}</span>
                </div>
                ${publication.abstract ? `<p class="publication-abstract">${publication.abstract}</p>` : ''}
                <div class="publication-links">
                    ${publication.doi ? `<a href="https://doi.org/${publication.doi}" class="publication-link" target="_blank">
                        <i class="fas fa-link"></i> DOI
                    </a>` : ''}
                    ${publication.pdfUrl && publication.pdfUrl !== '#' ? `<a href="${publication.pdfUrl}" class="publication-link" target="_blank">
                        <i class="fas fa-file-pdf"></i> PDF
                    </a>` : ''}
                </div>
            </div>
        `;
    }

    renderPublicationTableRow(publication) {
        const typeNames = {
            journal: '期刊论文',
            conference: '会议论文',
            preprint: '预印本'
        };

        return `
            <tr>
                <td><input type="checkbox" value="${publication.id}" onclick="document.getElementById('selectAllPublications').checked = false;"></td>
                <td>${publication.title}</td>
                <td>${publication.authors}</td>
                <td>${publication.journal}</td>
                <td>${publication.year}</td>
                <td>${typeNames[publication.type] || publication.type}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editPublication('${publication.id}')">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="action-btn delete-btn" onclick="deletePublication('${publication.id}')">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </td>
            </tr>
        `;
    }

    filterPeople(filter) {
        const peopleCards = document.querySelectorAll('.person-card');
        peopleCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-position') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterPublications(filter) {
        const publicationItems = document.querySelectorAll('.publication-item');
        publicationItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-type') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    switchAdminTab(tab) {
        // 隐藏所有标签页
        document.querySelectorAll('.admin-tab').forEach(tabElement => {
            tabElement.style.display = 'none';
        });

        // 显示选中的标签页
        document.getElementById(`${tab}Tab`).style.display = 'block';

        // 更新按钮状态
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    }

    handleContactSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // 这里可以添加发送邮件的逻辑
        alert('感谢您的留言！我们会尽快回复您。');
        e.target.reset();
    }

    handleSettingsSubmit(e) {
        const formData = new FormData(e.target);
        const settings = Object.fromEntries(formData);

        dataManager.updateSettings(settings);
        alert('设置已保存！');
    }

    handleAdminLogin(e) {
        const formData = new FormData(e.target);
        const password = formData.get('adminPassword');

        if (password === this.adminPassword) {
            this.isAdmin = true;
            this.toggleAdminSection();
            closeModal('adminLoginModal');

            // 滚动到管理后台
            setTimeout(() => {
                document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
            }, 100);

            alert('登录成功！');
        } else {
            alert('密码错误，请重试！');
            e.target.reset();
        }
    }

    logoutAdmin() {
        this.isAdmin = false;
        this.toggleAdminSection();
        alert('已退出管理后台');
    }
}

// 管理登录相关函数
function showAdminLogin() {
    // 如果已经在管理页面，直接显示管理后台
    if (window.location.hash === '#admin') {
        if (app.isAdmin) {
            document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
        } else {
            showAdminLoginModal();
        }
        return;
    }

    // 跳转到主页并显示管理登录
    window.location.href = 'index.html#admin';
    window.location.search = '?admin=true';
}

function showAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    const form = document.getElementById('adminLoginForm');

    form.reset();
    modal.classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// 全局函数
function showAddMemberModal() {
    const modal = document.getElementById('memberModal');
    const form = document.getElementById('memberForm');

    document.getElementById('memberModalTitle').textContent = '添加成员';
    form.reset();
    document.getElementById('memberId').value = '';

    modal.classList.add('show');
}

function showAddPublicationModal() {
    const modal = document.getElementById('publicationModal');
    const form = document.getElementById('publicationForm');

    document.getElementById('publicationModalTitle').textContent = '添加论文';
    form.reset();
    document.getElementById('publicationId').value = '';

    modal.classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function editMember(id) {
    const member = dataManager.getMembers().find(m => m.id === id);
    if (member) {
        document.getElementById('memberModalTitle').textContent = '编辑成员';
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberPosition').value = member.position;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberResearch').value = member.research || '';
        document.getElementById('memberBio').value = member.bio || '';
        document.getElementById('memberEducation').value = member.education || '';
        document.getElementById('memberExperience').value = member.experience || '';

        document.getElementById('memberModal').classList.add('show');
    }
}

function editPublication(id) {
    const publication = dataManager.getPublications().find(p => p.id === id);
    if (publication) {
        document.getElementById('publicationModalTitle').textContent = '编辑论文';
        document.getElementById('publicationId').value = publication.id;
        document.getElementById('publicationTitle').value = publication.title;
        document.getElementById('publicationAuthors').value = publication.authors;
        document.getElementById('publicationJournal').value = publication.journal;
        document.getElementById('publicationYear').value = publication.year;
        document.getElementById('publicationType').value = publication.type;
        document.getElementById('publicationDoi').value = publication.doi || '';
        document.getElementById('publicationAbstract').value = publication.abstract || '';

        document.getElementById('publicationModal').classList.add('show');
    }
}

function deleteMember(id) {
    if (confirm('确定要删除这个成员吗？')) {
        dataManager.deleteMember(id);
        app.loadPeople();
        app.updateStats();
    }
}

function deletePublication(id) {
    if (confirm('确定要删除这篇论文吗？')) {
        dataManager.deletePublication(id);
        app.loadPublications();
        app.updateStats();
    }
}

// 批量导入相关函数
function showImportPublicationsModal() {
    const modal = document.getElementById('importPublicationsModal');
    document.getElementById('citationText').value = '';
    document.getElementById('importPreview').style.display = 'none';
    modal.classList.add('show');

    // 绑定标签切换事件
    const tabBtns = modal.querySelectorAll('.import-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');

            // 切换按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 切换内容
            document.getElementById('textTab').style.display = tab === 'text' ? 'block' : 'none';
            document.getElementById('fileTab').style.display = tab === 'file' ? 'block' : 'none';
        });
    });
}

function showImportMembersModal() {
    const modal = document.getElementById('importMembersModal');
    document.getElementById('membersText').value = '';
    document.getElementById('membersPreview').style.display = 'none';
    modal.classList.add('show');
}

function parseCitations() {
    const text = document.getElementById('citationText').value.trim();
    if (!text) {
        alert('请输入引用文献内容');
        return;
    }

    const publications = citationParser.parseCitations(text);
    if (publications.length === 0) {
        alert('未能解析任何引用文献，请检查格式是否正确');
        return;
    }

    // 显示预览
    const previewList = document.getElementById('previewList');
    const preview = publications.map((pub, index) => `
        <div style="margin-bottom: 1rem; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 5px;">
            <strong>${index + 1}. ${pub.title}</strong><br>
            <small>作者: ${pub.authors}</small><br>
            <small>期刊: ${pub.journal} (${pub.year})</small>
        </div>
    `).join('');

    previewList.innerHTML = preview;
    document.getElementById('previewCount').textContent = publications.length;
    document.getElementById('importPreview').style.display = 'block';

    // 保存解析结果到全局变量
    window.pendingPublications = publications;
}

function confirmImport() {
    if (!window.pendingPublications || window.pendingPublications.length === 0) {
        alert('没有可导入的论文');
        return;
    }

    const addedCount = dataManager.importPublications(window.pendingPublications);
    alert(`成功导入 ${addedCount} 篇论文`);

    closeModal('importPublicationsModal');
    app.loadPublications();
    app.updateStats();

    // 清理临时数据
    delete window.pendingPublications;
}

// 搜索和过滤功能
function filterMembers() {
    const searchTerm = document.getElementById('memberSearch').value.toLowerCase();
    const positionFilter = document.getElementById('memberFilter').value;
    const rows = document.querySelectorAll('#membersTableBody tr');

    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const position = row.cells[2].textContent;
        const research = row.cells[3].textContent.toLowerCase();
        const email = row.cells[4].textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm) || research.includes(searchTerm) || email.includes(searchTerm);
        const matchesFilter = positionFilter === 'all' || position.includes(getPositionName(positionFilter));

        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
}

function filterPublications() {
    const searchTerm = document.getElementById('publicationSearch').value.toLowerCase();
    const typeFilter = document.getElementById('publicationFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    const rows = document.querySelectorAll('#publicationsTableBody tr');

    rows.forEach(row => {
        const title = row.cells[1].textContent.toLowerCase();
        const authors = row.cells[2].textContent.toLowerCase();
        const journal = row.cells[3].textContent.toLowerCase();
        const year = row.cells[4].textContent;
        const type = row.cells[5].textContent;

        const matchesSearch = title.includes(searchTerm) || authors.includes(searchTerm) || journal.includes(searchTerm);
        const matchesType = typeFilter === 'all' || type.includes(getTypeName(typeFilter));
        const matchesYear = !yearFilter || year === yearFilter;

        row.style.display = matchesSearch && matchesType && matchesYear ? '' : 'none';
    });
}

function getPositionName(position) {
    const positionNames = {
        professor: '教授',
        phd: '博士生',
        master: '硕士生',
        postdoc: '博士后'
    };
    return positionNames[position] || position;
}

function getTypeName(type) {
    const typeNames = {
        journal: '期刊论文',
        conference: '会议论文',
        preprint: '预印本'
    };
    return typeNames[type] || type;
}

// 批量操作功能
function toggleSelectAllMembers() {
    const selectAll = document.getElementById('selectAllMembers').checked;
    const checkboxes = document.querySelectorAll('#membersTableBody input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = selectAll);
}

function toggleSelectAllPublications() {
    const selectAll = document.getElementById('selectAllPublications').checked;
    const checkboxes = document.querySelectorAll('#publicationsTableBody input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = selectAll);
}

function deleteSelectedMembers() {
    const selectedCheckboxes = document.querySelectorAll('#membersTableBody input[type="checkbox"]:checked');
    if (selectedCheckboxes.length === 0) {
        alert('请选择要删除的成员');
        return;
    }

    if (!confirm(`确定要删除选中的 ${selectedCheckboxes.length} 个成员吗？`)) {
        return;
    }

    const memberIds = Array.from(selectedCheckboxes).map(cb => cb.value);
    memberIds.forEach(id => dataManager.deleteMember(id));

    alert(`成功删除 ${memberIds.length} 个成员`);
    app.loadPeople();
    app.updateStats();
}

function deleteSelectedPublications() {
    const selectedCheckboxes = document.querySelectorAll('#publicationsTableBody input[type="checkbox"]:checked');
    if (selectedCheckboxes.length === 0) {
        alert('请选择要删除的论文');
        return;
    }

    if (!confirm(`确定要删除选中的 ${selectedCheckboxes.length} 篇论文吗？`)) {
        return;
    }

    const publicationIds = Array.from(selectedCheckboxes).map(cb => cb.value);
    publicationIds.forEach(id => dataManager.deletePublication(id));

    alert(`成功删除 ${publicationIds.length} 篇论文`);
    app.loadPublications();
    app.updateStats();
}

function parseMembers() {
    const text = document.getElementById('membersText').value.trim();
    if (!text) {
        alert('请输入成员信息');
        return;
    }

    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
        alert('请至少包含标题行和一个成员信息');
        return;
    }

    // 解析CSV格式
    const members = [];
    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= 3) { // 至少需要姓名、职位、邮箱
            const member = {
                name: values[0] || '',
                position: values[1] || 'phd',
                email: values[2] || '',
                research: values[3] || '',
                bio: values[4] || '',
                education: values[5] || '',
                experience: values[6] || ''
            };
            members.push(member);
        }
    }

    if (members.length === 0) {
        alert('未能解析任何成员信息');
        return;
    }

    // 显示预览
    const previewList = document.getElementById('membersPreviewList');
    const preview = members.map((member, index) => `
        <div style="margin-bottom: 1rem; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 5px;">
            <strong>${index + 1}. ${member.name}</strong> (${member.position})<br>
            <small>邮箱: ${member.email}</small><br>
            <small>研究方向: ${member.research}</small>
        </div>
    `).join('');

    previewList.innerHTML = preview;
    document.getElementById('membersPreviewCount').textContent = members.length;
    document.getElementById('membersPreview').style.display = 'block';

    // 保存解析结果到全局变量
    window.pendingMembers = members;
}

function confirmMembersImport() {
    if (!window.pendingMembers || window.pendingMembers.length === 0) {
        alert('没有可导入的成员');
        return;
    }

    const data = dataManager.getData();
    let addedCount = 0;

    window.pendingMembers.forEach(member => {
        if (member.name && member.email) {
            const newMember = {
                ...member,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                joinDate: new Date().toISOString().split('T')[0]
            };
            data.members.push(newMember);
            addedCount++;
        }
    });

    dataManager.saveData(data);
    alert(`成功导入 ${addedCount} 个成员`);

    closeModal('importMembersModal');
    app.loadPeople();
    app.updateStats();

    // 清理临时数据
    delete window.pendingMembers;
}

function handleFileUpload() {
    const fileInput = document.getElementById('citationFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('请选择文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        document.getElementById('citationText').value = content;
        parseCitations();
    };
    reader.readAsText(file);
}

// 数据管理功能
function exportData() {
    try {
        const data = dataManager.exportData();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `research_group_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('数据导出成功！');
    } catch (error) {
        console.error('导出数据时出错:', error);
        alert('导出数据时出错，请重试');
    }
}

function importData() {
    const fileInput = document.getElementById('backupFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('请选择备份文件');
        return;
    }

    if (!confirm('导入数据将覆盖当前所有数据，确定要继续吗？')) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            const success = dataManager.importFullData(backupData);

            if (success) {
                alert('数据导入成功！页面将刷新以显示新数据。');
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else {
                alert('导入失败：数据格式不正确');
            }
        } catch (error) {
            console.error('导入数据时出错:', error);
            alert('导入失败：文件格式不正确');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (!confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        return;
    }

    if (!confirm('最后确认：这将删除所有成员和论文数据，确定要继续吗？')) {
        return;
    }

    try {
        // 重新初始化数据
        localStorage.removeItem('researchGroupData');
        dataManager.init();

        alert('所有数据已清空！页面将刷新。');
        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        console.error('清空数据时出错:', error);
        alert('清空数据时出错，请重试');
    }
}

// 表单提交处理
function initializeApp() {
    // 成员表单提交
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const memberData = Object.fromEntries(formData);

            if (memberData.memberId) {
                dataManager.updateMember(memberData.memberId, memberData);
            } else {
                dataManager.addMember(memberData);
            }

            closeModal('memberModal');
            if (window.app) {
                window.app.loadPeople();
                window.app.updateStats();
            }
        });
    }

    // 论文表单提交
    const publicationForm = document.getElementById('publicationForm');
    if (publicationForm) {
        publicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const publicationData = Object.fromEntries(formData);

            if (publicationData.publicationId) {
                dataManager.updatePublication(publicationData.publicationId, publicationData);
            } else {
                dataManager.addPublication(publicationData);
            }

            closeModal('publicationModal');
            if (window.app) {
                window.app.loadPublications();
                window.app.updateStats();
            }
        });
    }

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // 管理登录表单处理
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const password = formData.get('adminPassword');

            if (window.app && password === window.app.adminPassword) {
                window.app.isAdmin = true;
                window.app.toggleAdminSection();
                closeModal('adminLoginModal');

                setTimeout(() => {
                    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
                }, 100);

                alert('登录成功！');
            } else {
                alert('密码错误，请重试！');
                e.target.reset();
            }
        });
    }

    // 初始化应用
    if (!window.app) {
        window.app = new ResearchGroupWebsite();
    }
}

// 使用DOMContentLoaded确保DOM完全加载
document.addEventListener('DOMContentLoaded', initializeApp);

// 防止点击模态框内容时关闭
document.addEventListener('click', function(e) {
    if (e.target.closest('.modal-content')) {
        e.stopPropagation();
    }
});

// 检查是否需要显示登录模态框
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');

    if (adminParam === 'true' && window.location.hash === '#admin') {
        setTimeout(() => {
            if (window.app && !window.app.isAdmin) {
                showAdminLoginModal();
            }
        }, 500);
    }
});