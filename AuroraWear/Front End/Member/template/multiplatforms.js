document.addEventListener('DOMContentLoaded', function() {
            // Mengambil elemen-elemen yang diperlukan
            const downloadAppBtn = document.getElementById('downloadAppBtn');
            const downloadModal = document.getElementById('downloadModal');
            const closeModalBtn = document.getElementById('closeModalBtn');

            // Fungsi untuk menampilkan modal
            const showModal = () => {
                downloadModal.classList.add('visible');
            };

            // Fungsi untuk menyembunyikan modal
            const hideModal = () => {
                downloadModal.classList.remove('visible');
            };

            // Event listener untuk tombol pemicu
            downloadAppBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Mencegah link berpindah halaman
                showModal();
            });

            // Event listener untuk tombol tutup (X)
            closeModalBtn.addEventListener('click', hideModal);

            // Event listener untuk menutup modal saat mengklik area gelap
            downloadModal.addEventListener('click', (event) => {
                if (event.target === downloadModal) {
                    hideModal();
                }
            });
        });