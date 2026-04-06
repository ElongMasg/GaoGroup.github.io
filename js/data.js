// 数据存储和管理
class DataManager {
    constructor() {
        this.storageKey = 'researchGroupData';
        this.init();
    }

    init() {
        try {
            if (!localStorage.getItem(this.storageKey)) {
                const initialData = {
                    members: this.getInitialMembers(),
                    publications: this.getInitialPublications(),
                    settings: {
                        groupName: '智能计算课题组11',
                        groupDescription: '探索人工智能前沿，推动科技创新发展',
                        groupContact: 'contact@intellab.edu.cn'
                    }
                };
                this.saveData(initialData);
            }
        } catch (e) {
            console.error('localStorage not available, using in-memory data:', e);
            // Fallback to in-memory data if localStorage is not available
            this.inMemoryData = {
                members: this.getInitialMembers(),
                publications: this.getInitialPublications(),
                settings: {
                    groupName: '溥渊未来技术学院电化学储能研究团队',
                    groupDescription: '专注于下一代电化学储能技术的研究，包括固态锂金属电池、锂空气电池、多价态离子电池等前沿领域',
                    groupContact: 'xiangwen.gao@sjtu.edu.cn'
                }
            };
        }
    }

    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) {
                // 如果没有数据，初始化数据
                this.init();
                const newData = localStorage.getItem(this.storageKey);
                return newData ? JSON.parse(newData) : this.inMemoryData;
            }
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('数据解析错误:', e);
                // 如果解析失败，重新初始化
                this.init();
                const newData = localStorage.getItem(this.storageKey);
                return newData ? JSON.parse(newData) : this.inMemoryData;
            }
        } catch (e) {
            // localStorage not available, use in-memory data
            if (!this.inMemoryData) {
                this.init();
            }
            return this.inMemoryData;
        }
    }

    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            // localStorage not available, save to in-memory data
            console.warn('localStorage not available, saving to in-memory data:', e);
            this.inMemoryData = data;
        }
    }

    getInitialMembers() {
        return [
            {
                id: '1',
                name: '杲祥文',
                position: 'professor',
                email: 'xiangwen.gao@sjtu.edu.cn',
                research: '固态锂金属电池, 锂空气电池, 多价态离子电池, 电化学储能系统',
                bio: '杲祥文，上海交通大学溥渊未来技术学院长聘教轨副教授。专注于固态锂金属电池、锂空气电池、多价态离子电池等电化学储能系统的研究。曾获2018年度美国电化学协会K.M. Abraham奖和2018年度国家优秀自费留学生奖。',
                joinDate: '2023-01-01',
                education: '博士，英国牛津大学材料系（2013-2018）\n学士，复旦大学化学系（2009-2013）',
                experience: '2023年-至今，上海交通大学溥渊未来技术学院，长聘教轨副教授\n2020年-2022年，英国牛津大学材料系，博士后\n2018年-2020年，美国德克萨斯大学奥斯汀分校，博士后'
            },
            {
                id: '2',
                name: '李明',
                position: 'phd',
                email: 'liming@stu.university.edu.cn',
                research: '自然语言处理, 文本挖掘',
                bio: '专注于自然语言处理和文本挖掘技术的研究，已发表多篇高水平论文。研究方向包括机器翻译、情感分析和知识图谱构建。',
                joinDate: '2021-09-01',
                education: '北京大学计算机科学硕士',
                experience: '2021至今 清华大学博士生'
            },
            {
                id: '3',
                name: 'Ender',
                position: 'master',
                email: 'wangxh@stu.university.edu.cn',
                research: '计算机视觉, 图像处理',
                bio: '研究兴趣包括计算机视觉和图像处理，参与多个重要项目的研究工作。在目标检测和图像分割方面有深入研究。',
                joinDate: '2022-09-01',
                education: '北京理工大学计算机科学学士',
                experience: '2022至今 清华大学硕士生'
            },
            {
                id: '4',
                name: '陈博士',
                position: 'postdoc',
                email: 'chenboshi@university.edu.cn',
                research: '强化学习, 智能决策',
                bio: '博士后研究员，专注于强化学习和智能决策系统的研究。在深度强化学习和多智能体系统方面有突出贡献。',
                joinDate: '2023-03-01',
                education: '香港科技大学计算机科学博士',
                experience: '2023至今 清华大学博士后\n2019-2023 香港科技大学博士'
            },
            {
                id: '5',
                name: '刘芳',
                position: 'master',
                email: 'liufang@stu.university.edu.cn',
                research: '机器学习, 数据挖掘',
                bio: '硕士研究生，研究方向为机器学习和数据挖掘技术。在推荐系统和用户行为分析方面有深入研究。',
                joinDate: '2023-09-01',
                education: '华中科技大学计算机科学学士',
                experience: '2023至今 清华大学硕士生'
            },
            {
                id: '6',
                name: '赵强',
                position: 'phd',
                email: 'zhaoqiang@stu.university.edu.cn',
                research: '深度学习, 神经网络',
                bio: '博士研究生，专注于深度学习和神经网络架构的研究。在神经网络结构搜索和模型压缩方面有重要成果。',
                joinDate: '2020-09-01',
                education: '上海交通大学计算机科学硕士',
                experience: '2020至今 清华大学博士生'
            }
        ];
    }

    getInitialPublications() {
        return [
            {
                id: '1',
                title: 'Solid-state lithium battery cathodes operating at low pressures',
                authors: 'Xiangwen Gao, Boyang Liu, Bingkun Hu, Ziyang Ning, Dominic Spencer Jolly, Shengming Zhang, Johann Perera, Junfu Bu, Junliang Liu, C, Armstrong, Patrick S. Grant, Peter G. Bruce',
                journal: 'Joule',
                year: 2022,
                type: 'journal',
                doi: '10.1016/j.joule.2022.02.002',
                abstract: '研究了固态锂电池正极在低压条件下的操作机制，为固态电池的实际应用提供了新的思路。',
                pdfUrl: '#'
            },
            {
                id: '2',
                title: 'Achieving Ultimate Efficiency in Aqueous Zinc Battery Anodes via Selective Electroplating for Aqueous Zinc Battery Anodes',
                authors: 'Shengda D. Pu, Chen Gong, Yuanbo T Tang, Ziyang Ning, Junliang Liu, Shengming Zhang, Yi Yuan, Dominic Melvin, Sixie Yang, Liquan Pi, Joh, Zixuan Li, Boyang Liu, SC Edman Tsang, T. James Marrow, Roger C. Reed, Xiangwen Gao, Peter G. Bruce, Alex W. Robertson',
                journal: 'Advanced Materials',
                year: 2022,
                type: 'journal',
                doi: '10.1002/adma.202202552',
                abstract: '通过选择性电沉积实现了水系锌电池阳极的终极效率，为水系电池的发展提供了新的方向。',
                pdfUrl: '#'
            },
            {
                id: '3',
                title: 'Facilitating Li+ Transportation by Ion-Selective COFs Composite Nanowire for Li-S Batteries',
                authors: 'Wenqi Yan, Xiangwen Gao, Jin-Lin Yang, Xiaosong Xiong, Shuang Xia, Wen Huang, Yuhui Chen, Lijun Fu, Yusong Zhu, Yuping Wu',
                journal: 'Small',
                year: 2022,
                type: 'journal',
                doi: '10.1002/smll.202106679',
                abstract: '通过离子选择性COFs复合纳米线促进Li+传输，显著提高了锂硫电池的性能。',
                pdfUrl: '#'
            },
            {
                id: '4',
                title: 'Singlet oxygen and dioxetane formation in lithium-oxygen battery',
                authors: 'Shanmu Dong, Sixie Yang, Yuhui Chen, Christian Kuss, Guanglei Cui, Lee R. Johnson, Xiangwen Gao, Peter G. Bruce',
                journal: 'Joule',
                year: 2022,
                type: 'journal',
                doi: '10.1016/j.joule.2021.12.003',
                abstract: '研究了锂氧气电池中单线态氧和二氧杂环丁烷的形成机制，为理解电池反应机理提供了重要见解。',
                pdfUrl: '#'
            },
            {
                id: '5',
                title: 'High Performance through the Chlorine Respiration Mechanism',
                authors: 'Xiaotong Fan, Kai Huang, Long Chen, Haipeng You, Menglei Yao, Hao Jiang, Ling Zhang, Cheng Lian, Xiangwen Gao, Chunzhong Li',
                journal: 'Angewandte Chemie International Edition',
                year: 2023,
                type: 'journal',
                doi: '10.1002/anie.202215342',
                abstract: '通过氯呼吸机制实现了高性能电池，为新型电池设计提供了创新思路。',
                pdfUrl: '#'
            }
        ];
    }

    // 成员管理
    getMembers() {
        const data = this.getData();
        return data ? data.members : [];
    }

    addMember(member) {
        const data = this.getData();
        const newMember = {
            ...member,
            id: Date.now().toString(),
            joinDate: new Date().toISOString().split('T')[0]
        };
        data.members.push(newMember);
        this.saveData(data);
        return newMember;
    }

    updateMember(id, updatedMember) {
        const data = this.getData();
        const index = data.members.findIndex(m => m.id === id);
        if (index !== -1) {
            data.members[index] = { ...data.members[index], ...updatedMember };
            this.saveData(data);
            return data.members[index];
        }
        return null;
    }

    deleteMember(id) {
        const data = this.getData();
        data.members = data.members.filter(m => m.id !== id);
        this.saveData(data);
    }

    // 论文管理
    getPublications() {
        const data = this.getData();
        return data ? data.publications : [];
    }

    addPublication(publication) {
        const data = this.getData();
        const newPublication = {
            ...publication,
            id: Date.now().toString()
        };
        data.publications.push(newPublication);
        this.saveData(data);
        return newPublication;
    }

    updatePublication(id, updatedPublication) {
        const data = this.getData();
        const index = data.publications.findIndex(p => p.id === id);
        if (index !== -1) {
            data.publications[index] = { ...data.publications[index], ...updatedPublication };
            this.saveData(data);
            return data.publications[index];
        }
        return null;
    }

    deletePublication(id) {
        const data = this.getData();
        data.publications = data.publications.filter(p => p.id !== id);
        this.saveData(data);
    }

    // 设置管理
    getSettings() {
        const data = this.getData();
        return data ? data.settings : {};
    }

    updateSettings(settings) {
        const data = this.getData();
        data.settings = { ...data.settings, ...settings };
        this.saveData(data);
    }

    // 统计信息
    getStats() {
        const data = this.getData();
        return {
            memberCount: data.members.length,
            publicationCount: data.publications.length,
            researchAreas: 5
        };
    }

    // 批量导入论文
    importPublications(publications) {
        const data = this.getData();
        let addedCount = 0;

        publications.forEach(pub => {
            if (pub.title && pub.authors && pub.journal && pub.year) {
                const newPublication = {
                    ...pub,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
                };
                data.publications.push(newPublication);
                addedCount++;
            }
        });

        this.saveData(data);
        return addedCount;
    }

    // 导出数据
    exportData() {
        const data = this.getData();
        return {
            members: data.members,
            publications: data.publications,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    // 导入完整数据（备份恢复）
    importFullData(backupData) {
        if (backupData.members && backupData.publications) {
            this.saveData({
                members: backupData.members,
                publications: backupData.publications,
                settings: this.getData().settings // 保留当前设置
            });
            return true;
        }
        return false;
    }
}

// 引用格式解析器
class CitationParser {
    constructor() {
        this.parsers = [
            this.parseBibTeX.bind(this),
            this.parseAPA.bind(this),
            this.parseNumbered.bind(this)
        ];
    }

    // 解析多种格式的引用
    parseCitations(text) {
        const publications = [];
        const lines = text.split('\n').filter(line => line.trim());

        for (const line of lines) {
            const pub = this.parseSingleCitation(line.trim());
            if (pub) {
                publications.push(pub);
            }
        }

        return publications;
    }

    // 解析单个引用
    parseSingleCitation(text) {
        for (const parser of this.parsers) {
            const result = parser(text);
            if (result) {
                return result;
            }
        }
        return null;
    }

    // BibTeX格式解析
    parseBibTeX(text) {
        // 匹配 @article{key, title={...}, author={...}, journal={...}, year={...}}
        const bibtexPattern = /@\w+\s*\{[^,]+,\s*title\s*=\s*\{([^}]+)\},\s*author\s*=\s*\{([^}]+)\},\s*journal\s*=\s*\{([^}]+)\},\s*year\s*=\s*\{([^}]+)\}?/i;
        const match = text.match(bibtexPattern);

        if (match) {
            return {
                title: match[1].trim(),
                authors: match[2].trim(),
                journal: match[3].trim(),
                year: parseInt(match[4]),
                type: 'journal',
                doi: '',
                abstract: ''
            };
        }
        return null;
    }

    // APA格式解析
    parseAPA(text) {
        // 匹配: Author, A. A., & Author, B. B. (Year). Title of article. Title of Journal, Volume(Issue), pages.
        const apaPattern = /^([^(]+)\s*\((\d{4})\)\.\s*([^.]+)\.\s*([^,]+(?:,\s*[^,]+)*)?(?:,\s*\d+|,\s*\d+\s*\(\d+\))?/;
        const match = text.match(apaPattern);

        if (match) {
            return {
                title: match[3].trim(),
                authors: match[1].trim(),
                journal: match[4] ? match[4].trim() : '',
                year: parseInt(match[2]),
                type: 'journal',
                doi: '',
                abstract: ''
            };
        }
        return null;
    }

    // 编号格式解析
    parseNumbered(text) {
        // 匹配: [1] Author. "Title." Journal, vol., no., pp., year.
        const numberedPattern = /\[\d+\]\s*([^.]+)\.\s*"([^"]+)"\.\s*([^,]+),\s*(?:\d+\.)?\s*(?:\d+\.)?\s*(?:\d+\.)?\s*(\d{4})/;
        const match = text.match(numberedPattern);

        if (match) {
            return {
                title: match[2].trim(),
                authors: match[1].trim(),
                journal: match[3].trim(),
                year: parseInt(match[4]),
                type: 'journal',
                doi: '',
                abstract: ''
            };
        }
        return null;
    }
}

// 全局引用解析器实例
const citationParser = new CitationParser();

// 全局数据管理器实例
const dataManager = new DataManager();