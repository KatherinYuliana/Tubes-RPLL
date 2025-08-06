import { mount } from '@vue/test-utils';
import SearchComponent from './SearchComponent.vue';
import { describe, it, expect, vi } from 'vitest';

describe('SearchComponent', () => {

  // Test untuk Path 1 dengan input yang relevan
  it('menampilkan alert ketika handleSearch dipanggil dengan query produk plastik', async () => {
    // Persiapan
    const wrapper = mount(SearchComponent);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Aksi: Mengisi data dengan produk plastik dan memanggil method
    await wrapper.setData({ searchQuery: 'Wadah makanan' }); // <-- DIUBAH MENJADI PRODUK PLASTIK
    await wrapper.vm.handleSearch();

    // Verifikasi
    expect(alertSpy).toHaveBeenCalledWith('Mencari untuk: Wadah makanan'); // <-- Verifikasi output yang sesuai

    alertSpy.mockRestore();
  });

  // Test untuk Path 2 (tetap sama karena menguji input kosong)
  it('tidak menampilkan alert ketika handleSearch dipanggil dengan query kosong', async () => {
    // ... (kode test ini tidak perlu diubah)
  });
});
