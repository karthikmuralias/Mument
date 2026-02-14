class GymDashboard {
    constructor() {
        this.currentPage = 'dashboard';
        this.members = [];
        this.attendance = [];
        this.notifications = [];
        this.payments = [];
        this.init();
    }

    init() {
        this.loadData();
        this.render();
        this.attachEventListeners();
    }

    loadData() {
        // Mock data - Replace with API calls
        this.members = [
            { id: 1, name: 'Adwaiz Khan', email: 'adwaiz@email.com', joinDate: '2026-01-15', status: 'active', attendanceCount: 15, membershipDays: 30 },
            { id: 2, name: 'John Doe', email: 'john@email.com', joinDate: '2026-01-20', status: 'active', attendanceCount: 28, membershipDays: 30 },
            { id: 3, name: 'Jane Smith', email: 'jane@email.com', joinDate: '2025-12-01', status: 'inactive', attendanceCount: 30, membershipDays: 30 },
            { id: 4, name: 'Mike Johnson', email: 'mike@email.com', joinDate: '2026-02-01', status: 'active', attendanceCount: 5, membershipDays: 30 },
        ];

        this.attendance = [
            { id: 1, memberId: 1, memberName: 'Adwaiz Khan', date: '2026-02-14', time: '06:30 AM', status: 'present' },
            { id: 2, memberId: 2, memberName: 'John Doe', date: '2026-02-14', time: '07:15 AM', status: 'present' },
            { id: 3, memberId: 4, memberName: 'Mike Johnson', date: '2026-02-14', time: '05:45 AM', status: 'present' },
        ];

        this.notifications = [
            { id: 1, type: 'membership-complete', message: 'John Doe completed 30 days of attendance', date: '2026-02-13', read: false },
            { id: 2, type: 'payment-due', message: 'Jane Smith membership renewal due', date: '2026-02-10', read: true },
        ];

        this.payments = [
            { id: 1, memberId: 1, memberName: 'Adwaiz Khan', amount: 50, date: '2026-01-15', status: 'completed' },
            { id: 2, memberId: 2, memberName: 'John Doe', amount: 50, date: '2026-01-20', status: 'completed' },
            { id: 3, memberId: 4, memberName: 'Mike Johnson', amount: 50, date: '2026-02-01', status: 'pending' },
        ];
    }

    attachEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Add member button
        document.getElementById('addMemberBtn')?.addEventListener('click', () => this.openAddMemberModal());
        document.getElementById('addPaymentBtn')?.addEventListener('click', () => this.openAddPaymentModal());

        // Search functionality
        document.getElementById('searchBox')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    navigateTo(page) {
        this.currentPage = page;
        document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        this.render();
    }

    render() {
        const app = document.getElementById('root');
        app.innerHTML = this.getDashboardHTML();
        this.attachEventListeners();
    }

    getDashboardHTML() {
        return `
            <div class="dashboard-container">
                ${this.getSidebarHTML()}
                <div class="main-content">
                    ${this.getHeaderHTML()}
                    ${this.getPageContent()}
                </div>
            </div>
        `;
    }

    getSidebarHTML() {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    💪 GymTrack
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="#" data-page="dashboard" class="active">📊 Dashboard</a></li>
                        <li><a href="#" data-page="members">👥 Members</a></li>
                        <li><a href="#" data-page="attendance">✓ Attendance</a></li>
                        <li><a href="#" data-page="payments">💳 Payments</a></li>
                        <li><a href="#" data-page="notifications">🔔 Notifications</a></li>
                        <li><a href="#" data-page="reports">📈 Reports</a></li>
                        <li><a href="#" data-page="settings">⚙️ Settings</a></li>
                    </ul>
                </nav>
            </aside>
        `;
    }

    getHeaderHTML() {
        return `
            <div class="header">
                <h1>${this.getPageTitle()}</h1>
                <div class="header-actions">
                    <input type="text" id="searchBox" class="search-box" placeholder="Search...">
                    <button class="btn btn-primary" id="actionBtn" style="display:${this.currentPage === 'dashboard' ? 'none' : 'flex'}">
                        ➕ Add New
                    </button>
                </div>
            </div>
        `;
    }

    getPageTitle() {
        const titles = {
            'dashboard': 'Dashboard',
            'members': 'Members Management',
            'attendance': 'Attendance Tracking',
            'payments': 'Payment Management',
            'notifications': 'Notifications',
            'reports': 'Reports & Analytics',
            'settings': 'Settings'
        };
        return titles[this.currentPage] || 'Dashboard';
    }

    getPageContent() {
        switch (this.currentPage) {
            case 'dashboard':
                return this.getDashboardContent();
            case 'members':
                return this.getMembersContent();
            case 'attendance':
                return this.getAttendanceContent();
            case 'payments':
                return this.getPaymentsContent();
            case 'notifications':
                return this.getNotificationsContent();
            case 'reports':
                return this.getReportsContent();
            case 'settings':
                return this.getSettingsContent();
            default:
                return this.getDashboardContent();
        }
    }

    getDashboardContent() {
        const activeMembers = this.members.filter(m => m.status === 'active').length;
        const totalAttendanceToday = this.attendance.length;
        const pendingPayments = this.payments.filter(p => p.status === 'pending').length;
        const unreadNotifications = this.notifications.filter(n => !n.read).length;

        return `
            <div class="stats-grid">
                <div class="stat-card success">
                    <div class="stat-label">Active Members</div>
                    <div class="stat-value">${activeMembers}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Today's Attendance</div>
                    <div class="stat-value">${totalAttendanceToday}</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-label">Pending Payments</div>
                    <div class="stat-value">${pendingPayments}</div>
                </div>
                <div class="stat-card danger">
                    <div class="stat-label">Notifications</div>
                    <div class="stat-value">${unreadNotifications}</div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Today's Attendance</h3>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Check-in Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.attendance.map(a => `
                                <tr>
                                    <td>${a.memberName}</td>
                                    <td>${a.time}</td>
                                    <td><span class="badge badge-success">${a.status}</span></td>
                                    <td><button class="btn btn-small btn-secondary">View</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Recent Notifications</h3>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.notifications.slice(0, 5).map(n => `
                                <tr>
                                    <td>${n.type}</td>
                                    <td>${n.message}</td>
                                    <td>${n.date}</td>
                                    <td><span class="badge ${n.read ? 'badge-info' : 'badge-warning'}">${n.read ? 'Read' : 'Unread'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getMembersContent() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>All Members</h3>
                    <button class="btn btn-primary" id="addMemberBtn">➕ Add Member</button>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Join Date</th>
                                <th>Attendance</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.members.map(m => `
                                <tr>
                                    <td>${m.name}</td>
                                    <td>${m.email}</td>
                                    <td>${m.joinDate}</td>
                                    <td>${m.attendanceCount}/${m.membershipDays} days</td>
                                    <td><span class="badge ${m.status === 'active' ? 'badge-success' : 'badge-danger'}">${m.status}</span></td>
                                    <td>
                                        <button class="btn btn-small btn-secondary">Edit</button>
                                        <button class="btn btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getAttendanceContent() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>Attendance Records</h3>
                    <input type="date" id="attendanceDateFilter" class="search-box" style="width: auto;">
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Date</th>
                                <th>Check-in Time</th>
                                <th>Attendance Count</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.attendance.map(a => {
            const member = this.members.find(m => m.id === a.memberId);
            return `
                                    <tr>
                                        <td>${a.memberName}</td>
                                        <td>${a.date}</td>
                                        <td>${a.time}</td>
                                        <td>${member?.attendanceCount || 0}/${member?.membershipDays || 30}</td>
                                        <td><span class="badge badge-success">${a.status}</span></td>
                                    </tr>
                                `;
        }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getPaymentsContent() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>Payment Records</h3>
                    <button class="btn btn-primary" id="addPaymentBtn">➕ Add Payment</button>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.payments.map(p => `
                                <tr>
                                    <td>${p.memberName}</td>
                                    <td>$${p.amount}</td>
                                    <td>${p.date}</td>
                                    <td><span class="badge ${p.status === 'completed' ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
                                    <td>
                                        <button class="btn btn-small btn-secondary">View</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getNotificationsContent() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>All Notifications</h3>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.notifications.map(n => `
                                <tr>
                                    <td>${n.type}</td>
                                    <td>${n.message}</td>
                                    <td>${n.date}</td>
                                    <td><span class="badge ${n.read ? 'badge-info' : 'badge-warning'}">${n.read ? 'Read' : 'Unread'}</span></td>
                                    <td><button class="btn btn-small btn-secondary">View</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getReportsContent() {
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Revenue</div>
                    <div class="stat-value">$${(this.payments.reduce((sum, p) => sum + p.amount, 0))}</div>
                </div>
                <div class="stat-card success">
                    <div class="stat-label">Members Completed 30 Days</div>
                    <div class="stat-value">${this.members.filter(m => m.attendanceCount === 30).length}</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-label">Average Attendance Rate</div>
                    <div class="stat-value">${Math.round(this.members.reduce((sum, m) => sum + (m.attendanceCount / m.membershipDays), 0) / this.members.length * 100)}%</div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Membership Status Report</h3>
                </div>
                <div class="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Attendance Progress</th>
                                <th>Days Remaining</th>
                                <th>Completion %</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.members.map(m => {
            const completionPercent = Math.round((m.attendanceCount / m.membershipDays) * 100);
            return `
                                    <tr>
                                        <td>${m.name}</td>
                                        <td>
                                            <div style="background: #e5e7eb; border-radius: 4px; height: 20px; overflow: hidden;">
                                                <div style="background: ${completionPercent === 100 ? '#10b981' : '#2563eb'}; height: 100%; width: ${completionPercent}%; transition: width 0.3s;"></div>
                                            </div>
                                        </td>
                                        <td>${m.membershipDays - m.attendanceCount}</td>
                                        <td>${completionPercent}%</td>
                                    </tr>
                                `;
        }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getSettingsContent() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>Gym Settings</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label>Gym Name</label>
                            <input type="text" value="FitMax Gym" placeholder="Enter gym name">
                        </div>
                        <div class="form-group">
                            <label>Monthly Fee</label>
                            <input type="number" value="50" placeholder="Enter monthly fee">
                        </div>
                        <div class="form-group">
                            <label>Membership Duration (Days)</label>
                            <input type="number" value="30" placeholder="Enter membership duration">
                        </div>
                        <div class="form-group">
                            <label>Camera Feed URL</label>
                            <input type="text" placeholder="Enter camera feed URL">
                        </div>
                        <div class="form-group">
                            <label>Notification Email</label>
                            <input type="email" placeholder="Enter notification email">
                        </div>
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                    </form>
                </div>
            </div>
        `;
    }

    openAddMemberModal() {
        // Implementation for adding members
        alert('Add Member functionality');
    }

    openAddPaymentModal() {
        // Implementation for adding payments
        alert('Add Payment functionality');
    }

    closeModal() {
        // Close modal implementation
    }

    handleSearch(query) {
        // Search implementation
        console.log('Search query:', query);
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GymDashboard();
});