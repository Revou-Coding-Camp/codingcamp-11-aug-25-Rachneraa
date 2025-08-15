// Modal Headquarters
function openModal(city) {
    document.getElementById(`modal-${city}`).style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(city) {
    document.getElementById(`modal-${city}`).style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

 // Check if user is logged in
        let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        
        // Show login modal if not logged in
        function checkLogin() {
            if (!isLoggedIn) {
                document.body.classList.add('blur');
                document.getElementById('loginModal').style.display = 'flex';
                document.getElementById('welcomeUser').textContent = '';
            } else {
                document.body.classList.remove('blur');
                document.getElementById('loginModal').style.display = 'none';
                // Display saved username if exists
                const savedUsername = sessionStorage.getItem('username');
                if (savedUsername) {
                    document.getElementById('welcomeUser').textContent = savedUsername;
                }
            }
        }

        // Toggle between login and register forms
        function toggleForm(formType) {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            if (formType === 'register') {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            } else {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            }
        }

        // Handle register form submission
        function handleRegister(event) {
            event.preventDefault();
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Store user data in localStorage
            const userData = {
                username,
                email,
                password
            };

            localStorage.setItem(username, JSON.stringify(userData));
            alert('Registration successful! Please login.');
            toggleForm('login');
        }

        // Handle login form submission
        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('loginPassword').value;

            // Check if user exists in localStorage
            const userData = localStorage.getItem(username);
            if (userData) {
                const user = JSON.parse(userData);
                if (user.password === password) {
                    isLoggedIn = true;
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('username', username);
                    document.getElementById('welcomeUser').textContent = username;
                    document.body.classList.remove('blur');
                    document.getElementById('loginModal').style.display = 'none';
                    return;
                }
            }

            // Fallback for admin account
            if (username === 'admin' && password === 'password') {
                isLoggedIn = true;
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                document.getElementById('welcomeUser').textContent = username;
                document.body.classList.remove('blur');
                document.getElementById('loginModal').style.display = 'none';
                return;
            }

            alert('Invalid username or password!');
        }

        // Check login status when page loads
        document.addEventListener('DOMContentLoaded', checkLogin);

        // Fungsi untuk menangani submit form
        document.getElementById('studentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Ambil username yang sedang login
            const loggedInUsername = sessionStorage.getItem('username');
            if (!loggedInUsername) {
                alert('Anda harus login terlebih dahulu!');
                return;
            }

            // Ambil nilai dari form
            const tanggalLahir = document.getElementById('tanggalLahir').value;
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
            const pesan = document.getElementById('pesan').value;

            // Hapus pesan "Belum ada data"
            const emptyRow = document.querySelector('.empty-state');
            if (emptyRow) {
                emptyRow.parentElement.remove();
            }

            // Tambahkan data ke tabel
            const tableBody = document.getElementById('tableBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${loggedInUsername}</td>
                <td>${tanggalLahir}</td>
                <td>${jenisKelamin}</td>
                <td>${pesan}</td>
                <td>
                    <a href="#" class="profile-link" onclick="showProfile('${loggedInUsername}', '${tanggalLahir}', '${jenisKelamin}', '${pesan}')">
                        Lihat Profile
                    </a>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteRow(this)">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(newRow);

            // Reset form
            event.target.reset();
        });

        // Fungsi untuk menghapus baris
        function deleteRow(btn) {
            const row = btn.parentElement.parentElement;
            row.remove();

            // Cek apakah tabel kosong
            const tableBody = document.getElementById('tableBody');
            if (tableBody.children.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="empty-state">Belum ada data yang dimasukkan</td>
                    </tr>
                `;
            }
        }

        // Update fungsi showProfile
        function showProfile(nama, tanggalLahir, jenisKelamin, pesan) {
            const profileDetails = document.getElementById('profileDetails');
            profileDetails.innerHTML = `
                <div class="profile-item">
                    <span class="profile-label">Nama:</span>
                    <span class="profile-value">${nama}</span>
                </div>
                <div class="profile-item">
                    <span class="profile-label">Tanggal Lahir:</span>
                    <span class="profile-value">${tanggalLahir}</span>
                </div>
                <div class="profile-item">
                    <span class="profile-label">Jenis Kelamin:</span>
                    <span class="profile-value">${jenisKelamin}</span>
                </div>
                <div class="profile-item">
                    <span class="profile-label">Pesan:</span>
                    <span class="profile-value">${pesan}</span>
                </div>
            `;
    
            document.getElementById('profileModal').classList.add('show');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('show');
}

// Close modal when clicking outside
document.getElementById('profileModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeProfileModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProfileModal();
    }
});

        // Set nama otomatis saat form dibuka
        document.addEventListener('DOMContentLoaded', function() {
            const loggedInUsername = sessionStorage.getItem('username');
            if (loggedInUsername) {
                document.getElementById('nama').value = loggedInUsername;
                document.getElementById('nama').readOnly = true; // Membuat field nama tidak bisa diubah
            }
        });

        // Hamburger menu functionality
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    navMenu.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Close menu when clicking links
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});